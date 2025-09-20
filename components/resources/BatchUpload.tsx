'use client'

import { useState } from 'react'
import { FileUpload } from './FileUpload'
import { Button } from '@/components/ui/button'
import { FolderUp, Download, FileArchive } from 'lucide-react'
import JSZip from 'jszip'

interface BatchUploadProps {
  courseId: string
  moduleId?: string
}

export function BatchUpload({ courseId, moduleId }: BatchUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [compressing, setCompressing] = useState(false)

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(prev => [...prev, ...files])
  }

  const downloadAllAsZip = async () => {
    if (uploadedFiles.length === 0) return
    
    setCompressing(true)
    const zip = new JSZip()
    
    // Add files to ZIP
    for (const file of uploadedFiles) {
      try {
        const response = await fetch(file.url)
        const blob = await response.blob()
        zip.file(file.name, blob)
      } catch (error) {
        console.error(`Failed to add ${file.name} to ZIP:`, error)
      }
    }
    
    // Generate and download ZIP
    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `course-${courseId}-resources.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setCompressing(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-action/20 rounded-lg">
              <FolderUp className="w-6 h-6 text-action" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-dark">Batch Upload Resources</h2>
              <p className="text-sm text-neutral-medium">
                Upload multiple files at once for this {moduleId ? 'module' : 'course'}
              </p>
            </div>
          </div>
          
          {uploadedFiles.length > 0 && (
            <Button
              onClick={downloadAllAsZip}
              variant="secondary"
              size="sm"
              disabled={compressing}
              className="gap-2"
            >
              {compressing ? (
                <>
                  <FileArchive className="w-4 h-4 animate-pulse" />
                  Compressing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download All ({uploadedFiles.length})
                </>
              )}
            </Button>
          )}
        </div>
        
        <FileUpload
          courseId={courseId}
          moduleId={moduleId}
          onUploadComplete={handleFilesUploaded}
          maxFiles={20}
        />
      </div>
    </div>
  )
}
