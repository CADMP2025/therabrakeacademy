'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  Maximize,
  Search,
  BookmarkPlus,
  FileText,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title: string
  allowDownload?: boolean
  allowPrint?: boolean
  watermark?: string
  onPageChange?: (page: number) => void
  savedPage?: number
  isRestricted?: boolean
}

export function PDFViewer({
  url,
  title,
  allowDownload = true,
  allowPrint = true,
  watermark,
  onPageChange,
  savedPage = 1,
  isRestricted = false
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(savedPage)
  const [scale, setScale] = useState(1.0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Prevent right-click and text selection if restricted
  useEffect(() => {
    if (isRestricted) {
      const preventActions = (e: Event) => {
        e.preventDefault()
        return false
      }

      document.addEventListener('contextmenu', preventActions)
      document.addEventListener('selectstart', preventActions)
      
      return () => {
        document.removeEventListener('contextmenu', preventActions)
        document.removeEventListener('selectstart', preventActions)
      }
    }
  }, [isRestricted])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
    if (savedPage && savedPage <= numPages) {
      setPageNumber(savedPage)
    }
  }

  function onDocumentLoadError(error: any) {
    console.error('PDF load error:', error)
    setError('Failed to load PDF. Please try again.')
    setLoading(false)
  }

  const changePage = (offset: number) => {
    const newPage = pageNumber + offset
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage)
      onPageChange?.(newPage)
    }
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5))

  const toggleBookmark = () => {
    setBookmarks(prev => 
      prev.includes(pageNumber)
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber].sort((a, b) => a - b)
    )
  }

  const downloadPDF = async () => {
    if (!allowDownload || isRestricted) return
    
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `${title}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const printPDF = () => {
    if (!allowPrint || isRestricted) return
    window.print()
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* TheraBrake Themed Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-white" />
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {isRestricted && (
              <div className="flex items-center gap-1 bg-alert/20 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3 text-white" />
                <span className="text-xs text-white">Protected</span>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-32 h-8 pr-8 text-sm bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/20 rounded px-2 py-1">
              <button onClick={zoomOut} className="p-1 hover:bg-white/20 rounded">
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <span className="text-xs text-white px-2">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} className="p-1 hover:bg-white/20 rounded">
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Action Buttons */}
            <button 
              onClick={toggleBookmark}
              className={`p-2 rounded transition-colors ${
                bookmarks.includes(pageNumber) 
                  ? 'bg-accent text-white' 
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
            </button>
            
            {allowPrint && !isRestricted && (
              <button 
                onClick={printPDF}
                className="p-2 hover:bg-white/20 rounded text-white"
              >
                <Printer className="w-4 h-4" />
              </button>
            )}
            
            {allowDownload && !isRestricted && (
              <button 
                onClick={downloadPDF}
                className="p-2 hover:bg-white/20 rounded text-white"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded text-white"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Display Area */}
      <div className="relative bg-neutral-light">
        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-neutral-medium">Loading PDF...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <FileText className="w-12 h-12 text-alert mx-auto mb-4" />
              <p className="text-alert">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div 
            className="overflow-auto"
            style={{ height: isFullscreen ? '100vh' : '600px' }}
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="flex justify-center"
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                renderTextLayer={!isRestricted}
                renderAnnotationLayer={!isRestricted}
                className="shadow-lg"
                customTextRenderer={
                  watermark
                    ? () => (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="text-6xl font-bold text-primary/10 rotate-45">
                            {watermark}
                          </p>
                        </div>
                      )
                    : undefined
                }
              />
            </Document>
          </div>
        )}
      </div>

      {/* Footer with Navigation */}
      {!loading && !error && numPages && (
        <div className="bg-white border-t border-neutral-light p-3">
          <div className="flex items-center justify-between">
            {/* Bookmarks */}
            <div className="flex items-center gap-2">
              {bookmarks.length > 0 && (
                <>
                  <span className="text-xs text-neutral-medium">Bookmarks:</span>
                  <div className="flex gap-1">
                    {bookmarks.slice(0, 5).map(page => (
                      <button
                        key={page}
                        onClick={() => setPageNumber(page)}
                        className={`px-2 py-1 text-xs rounded ${
                          page === pageNumber
                            ? 'bg-primary text-white'
                            : 'bg-neutral-light hover:bg-secondary/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    {bookmarks.length > 5 && (
                      <span className="text-xs text-neutral-medium">+{bookmarks.length - 5}</span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                className="p-1 hover:bg-neutral-light rounded disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-dark" />
              </button>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={numPages}
                  value={pageNumber}
                  onChange={(e) => {
                    const page = parseInt(e.target.value)
                    if (!isNaN(page) && page >= 1 && page <= numPages) {
                      setPageNumber(page)
                      onPageChange?.(page)
                    }
                  }}
                  className="w-12 px-2 py-1 text-sm text-center border rounded"
                />
                <span className="text-sm text-neutral-medium">of {numPages}</span>
              </div>
              
              <button
                onClick={() => changePage(1)}
                disabled={pageNumber >= numPages}
                className="p-1 hover:bg-neutral-light rounded disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5 text-neutral-dark" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
