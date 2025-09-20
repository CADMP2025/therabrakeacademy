'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
  courseId: string
  moduleId?: string
  onUploadComplete: (files: UploadedFile[]) => void
  acceptedFormats?: string[]
  maxSize?: number // in MB
  maxFiles?: number
}

interface UploadedFile {
  id: string
  name: string
  url: string
  size: number
  type: string
}

export function FileUpload({
  courseId,
  moduleId,
  onUploadComplete,
  acceptedFormats = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
  maxSize = 50, // 50MB default
  maxFiles = 10
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const supabase = createClient()

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setErrors([])
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errorMessages = rejectedFiles.map(({ file, errors }) => {
        const errorMessage = errors.map((e: any) => e.message).join(', ')
        return `${file.name}: ${errorMessage}`
      })
      setErrors(errorMessages)
      return
    }

    setUploading(true)
    setUploadProgress(0)
    
    const uploaded: UploadedFile[] = []
    const totalFiles = acceptedFiles.length

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      
      try {
        // Virus scanning simulation (in production, use actual service)
        await simulateVirusScan(file)
        
        // Generate unique file path
        const fileExt = file.name.split('.').pop()
        const fileName = `${courseId}/${moduleId || 'resources'}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('course-materials')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) throw error

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('course-materials')
          .getPublicUrl(fileName)

        // Save file metadata to database
        const { data: fileRecord, error: dbError } = await supabase
          .from('resources')
          .insert({
            course_id: courseId,
            module_id: moduleId,
            title: file.name,
            file_url: publicUrl,
            file_type: file.type,
            file_size: file.size,
            is_downloadable: true
          })
          .select()
          .single()

        if (dbError) throw dbError

        uploaded.push({
          id: fileRecord.id,
          name: file.name,
          url: publicUrl,
          size: file.size,
          type: file.type
        })

        setUploadProgress(((i + 1) / totalFiles) * 100)
      } catch (error) {
        console.error('Upload error:', error)
        setErrors(prev => [...prev, `Failed to upload ${file.name}`])
      }
    }

    setUploadedFiles(prev => [...prev, ...uploaded])
    onUploadComplete(uploaded)
    setUploading(false)
    setUploadProgress(0)
  }, [courseId, moduleId, onUploadComplete, supabase])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      acc[`application/${format.replace('.', '')}`] = [format]
      return acc
    }, {} as Record<string, string[]>),
    maxSize: maxSize * 1024 * 1024,
    maxFiles,
    disabled: uploading
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const simulateVirusScan = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500) // Simulate scan time
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone with TheraBrake colors */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? 'border-primary bg-primary/10' 
            : 'border-neutral-light hover:border-secondary bg-white'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-3">
          <div className={`p-3 rounded-full ${isDragActive ? 'bg-primary/20' : 'bg-secondary/10'}`}>
            <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-secondary'}`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-neutral-dark">
              {isDragActive 
                ? 'Drop files here...' 
                : 'Drag & drop files here, or click to browse'
              }
            </p>
            <p className="text-sm text-neutral-medium mt-1">
              Supports: {acceptedFormats.join(', ')} (Max {maxSize}MB per file)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Uploading...</span>
            <span className="text-sm text-neutral-medium">{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-alert/10 border border-alert/20 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-alert mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-alert">Upload Errors</p>
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-neutral-dark">{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-dark">Uploaded Files</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div 
                key={file.id}
                className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-secondary/20"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-neutral-dark">{file.name}</p>
                    <p className="text-xs text-neutral-medium">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-alert/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-medium hover:text-alert" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
