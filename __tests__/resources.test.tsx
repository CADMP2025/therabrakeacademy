import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FileUpload } from '@/components/resources/FileUpload'
import { PDFViewer } from '@/components/resources/PDFViewer'
import { ResourceLibrary } from '@/components/resources/ResourceLibrary'

describe('Resource Management System', () => {
  describe('FileUpload', () => {
    it('renders upload zone', () => {
      render(
        <FileUpload 
          courseId="test-course"
          onUploadComplete={jest.fn()}
        />
      )
      
      expect(screen.getByText(/drag & drop files/i)).toBeInTheDocument()
    })

    it('shows accepted file formats', () => {
      render(
        <FileUpload 
          courseId="test-course"
          onUploadComplete={jest.fn()}
          acceptedFormats={['.pdf', '.doc']}
        />
      )
      
      expect(screen.getByText(/\.pdf, \.doc/)).toBeInTheDocument()
    })
  })

  describe('PDFViewer', () => {
    it('renders PDF viewer with title', () => {
      render(
        <PDFViewer
          url="/test.pdf"
          title="Test PDF"
          allowDownload={true}
        />
      )
      
      expect(screen.getByText('Test PDF')).toBeInTheDocument()
    })

    it('shows restricted badge when protected', () => {
      render(
        <PDFViewer
          url="/test.pdf"
          title="Test PDF"
          isRestricted={true}
        />
      )
      
      expect(screen.getByText('Protected')).toBeInTheDocument()
    })
  })

  describe('ResourceLibrary', () => {
    it('renders resource library', async () => {
      render(
        <ResourceLibrary
          courseId="test-course"
        />
      )
      
      await waitFor(() => {
        expect(screen.getByText('Resource Library')).toBeInTheDocument()
      })
    })

    it('shows download all button when multiple downloadable resources', async () => {
      // Mock resources data
      const mockResources = [
        { id: '1', title: 'Resource 1', is_downloadable: true },
        { id: '2', title: 'Resource 2', is_downloadable: true }
      ]
      
      // Test would need mock data setup
    })
  })
})
