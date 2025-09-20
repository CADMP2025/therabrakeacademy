'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  FileText, 
  Video, 
  Download, 
  Search,
  Filter,
  FolderOpen,
  Clock,
  Users,
  ChevronRight,
  Grid,
  List,
  Share2,
  Lock,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { PDFViewer } from './PDFViewer'

interface Resource {
  id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  file_size: number
  category: string
  module_id?: string
  module_title?: string
  is_downloadable: boolean
  is_prerequisite: boolean
  download_count: number
  created_at: string
  updated_at: string
  version: number
}

interface ResourceLibraryProps {
  courseId: string
  studentId?: string
  showInstructorControls?: boolean
}

export function ResourceLibrary({ 
  courseId, 
  studentId,
  showInstructorControls = false 
}: ResourceLibraryProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showPDFViewer, setShowPDFViewer] = useState(false)
  const supabase = createClient()

  // Categories with TheraBrake theme colors
  const categories = [
    { value: 'all', label: 'All Resources', icon: FolderOpen, color: 'text-primary' },
    { value: 'workbook', label: 'Workbooks', icon: FileText, color: 'text-secondary' },
    { value: 'form', label: 'Forms', icon: FileText, color: 'text-action' },
    { value: 'video', label: 'Videos', icon: Video, color: 'text-accent' },
    { value: 'template', label: 'Templates', icon: FileText, color: 'text-primary' },
    { value: 'reference', label: 'References', icon: FileText, color: 'text-secondary' }
  ]

  useEffect(() => {
    loadResources()
  }, [courseId])

  useEffect(() => {
    filterResources()
  }, [searchQuery, selectedCategory, resources])

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select(`
          *,
          modules!inner(
            id,
            title
          )
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setResources(data || [])
      setFilteredResources(data || [])
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterResources = () => {
    let filtered = [...resources]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory)
    }

    setFilteredResources(filtered)
  }

  const handleDownload = async (resource: Resource) => {
    try {
      // Track download
      await supabase
        .from('resources')
        .update({ download_count: resource.download_count + 1 })
        .eq('id', resource.id)

      // Initiate download
      const response = await fetch(resource.file_url)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = resource.title
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  const handleBulkDownload = async () => {
    const downloadableResources = filteredResources.filter(r => r.is_downloadable)
    
    if (downloadableResources.length === 0) {
      alert('No downloadable resources available')
      return
    }

    // Create ZIP file (requires JSZip)
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()

    for (const resource of downloadableResources) {
      try {
        const response = await fetch(resource.file_url)
        const blob = await response.blob()
        zip.file(resource.title, blob)
      } catch (error) {
        console.error(`Failed to add ${resource.title} to ZIP:`, error)
      }
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `course-${courseId}-resources.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return FileText
    if (fileType.includes('video')) return Video
    return FileText
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-medium">Loading resources...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with TheraBrake branding */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Resource Library</h2>
              <p className="text-white/80">
                {filteredResources.length} resources available for this course
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">
                    {filteredResources.filter(r => r.is_downloadable).length} downloadable
                  </span>
                </div>
              </div>
              {filteredResources.filter(r => r.is_downloadable).length > 1 && (
                <Button
                  onClick={handleBulkDownload}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-medium" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-48"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>

            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-neutral-light rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Resources Display */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FolderOpen className="w-12 h-12 text-neutral-medium mx-auto mb-4" />
            <p className="text-neutral-medium">No resources found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDownload={handleDownload}
                onView={(r) => {
                  setSelectedResource(r)
                  setShowPDFViewer(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-light">
                <tr>
                  <th className="text-left p-3 font-medium text-neutral-dark">Resource</th>
                  <th className="text-left p-3 font-medium text-neutral-dark">Module</th>
                  <th className="text-left p-3 font-medium text-neutral-dark">Size</th>
                  <th className="text-left p-3 font-medium text-neutral-dark">Downloads</th>
                  <th className="text-left p-3 font-medium text-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map(resource => (
                  <ResourceRow
                    key={resource.id}
                    resource={resource}
                    onDownload={handleDownload}
                    onView={(r) => {
                      setSelectedResource(r)
                      setShowPDFViewer(true)
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {showPDFViewer && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">{selectedResource.title}</h3>
              <button
                onClick={() => {
                  setShowPDFViewer(false)
                  setSelectedResource(null)
                }}
                className="p-2 hover:bg-neutral-light rounded"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <PDFViewer
                url={selectedResource.file_url}
                title={selectedResource.title}
                allowDownload={selectedResource.is_downloadable}
                watermark={studentId ? `Licensed to ${studentId}` : undefined}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ResourceCard component
function ResourceCard({ 
  resource, 
  onDownload, 
  onView 
}: { 
  resource: Resource
  onDownload: (resource: Resource) => void
  onView: (resource: Resource) => void
}) {
  const Icon = getFileIcon(resource.file_type)
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-neutral-light">
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${
          resource.category === 'workbook' ? 'bg-secondary/10' :
          resource.category === 'form' ? 'bg-action/10' :
          'bg-primary/10'
        }`}>
          <Icon className={`w-6 h-6 ${
            resource.category === 'workbook' ? 'text-secondary' :
            resource.category === 'form' ? 'text-action' :
            'text-primary'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-neutral-dark line-clamp-1">{resource.title}</h3>
          {resource.description && (
            <p className="text-sm text-neutral-medium line-clamp-2 mt-1">
              {resource.description}
            </p>
          )}
          
          <div className="flex items-center gap-3 mt-3 text-xs text-neutral-medium">
            {resource.module_title && (
              <span className="flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                {resource.module_title}
              </span>
            )}
            <span>{formatFileSize(resource.file_size)}</span>
            {resource.is_prerequisite && (
              <span className="flex items-center gap-1 text-action">
                <Lock className="w-3 h-3" />
                Required
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onView(resource)}
              className="flex-1"
            >
              View
            </Button>
            {resource.is_downloadable && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDownload(resource)}
              >
                <Download className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ResourceRow component for list view
function ResourceRow({ 
  resource, 
  onDownload, 
  onView 
}: { 
  resource: Resource
  onDownload: (resource: Resource) => void
  onView: (resource: Resource) => void
}) {
  const Icon = getFileIcon(resource.file_type)
  
  return (
    <tr className="border-b hover:bg-neutral-light/50">
      <td className="p-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-neutral-medium" />
          <span className="font-medium">{resource.title}</span>
        </div>
      </td>
      <td className="p-3 text-sm text-neutral-medium">
        {resource.module_title || '-'}
      </td>
      <td className="p-3 text-sm text-neutral-medium">
        {formatFileSize(resource.file_size)}
      </td>
      <td className="p-3 text-sm text-neutral-medium">
        {resource.download_count}
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onView(resource)}
          >
            View
          </Button>
          {resource.is_downloadable && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDownload(resource)}
            >
              <Download className="w-3 h-3" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  )
}

function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) return FileText
  if (fileType.includes('video')) return Video
  return FileText
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
