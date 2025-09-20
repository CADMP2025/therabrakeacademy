'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@/lib/supabase/client'
import { 
  Upload, File, Video, Image, X, CheckCircle, 
  AlertCircle, Loader 
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface MediaUploaderProps {
  moduleId: string
  onUploadComplete: (url: string, type: string) => void
}

export function MediaUploader({ moduleId, onUploadComplete }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const supabase = createClient()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setUploading(true)
    setUploadProgress(0)

    try {
      // Validate file
      const maxSize = 100 * 1024 * 1024 // 100MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 100MB limit')
      }

      // Determine storage bucket based on file type
      let bucket = 'course-materials'
      let folder = 'general'
      
      if (file.type.startsWith('image/')) {
        folder = 'images'
      } else if (file.type.startsWith('video/')) {
        folder = 'videos'
      } else if (file.type === 'application/pdf') {
        folder = 'pdfs'
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${moduleId}/${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percentComplete = (progress.loaded / progress.total) * 100
            setUploadProgress(Math.round(percentComplete))
          }
        })

      if (error) throw error

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      onUploadComplete(urlData.publicUrl, file.type)
      toast.success('File uploaded successfully!')
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }, [moduleId, supabase, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1,
    disabled: uploading
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <Loader className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
            <div className="text-sm text-gray-600">Uploading... {uploadProgress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : isDragActive ? (
          <div className="space-y-2">
            <Upload className="w-12 h-12 mx-auto text-blue-500" />
            <p className="text-blue-600">Drop the file here...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <p className="text-gray-600 mb-1">
                Drag & drop a file here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports: Images, Videos, PDFs, Word, PowerPoint (max 100MB)
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Image className="w-4 h-4" />
                Images
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Video className="w-4 h-4" />
                Videos
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <File className="w-4 h-4" />
                Documents
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
