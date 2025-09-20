'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Save, Eye, Plus, Trash2, GripVertical, Upload, 
  Video, FileText, Image as ImageIcon, Link2, 
  Settings, ChevronDown, ChevronUp, Copy, ClipboardPaste,
  Brain, BookOpen, Award, Clock, Users
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function CourseBuilderPage() {
  const router = useRouter()
  const supabase = createClient()
  const [course, setCourse] = useState({
    id: '',
    title: '',
    description: '',
    category: 'Professional Development',
    price: 0,
    ce_hours: 0,
    modules: []
  })
  const [activeModule, setActiveModule] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')

  const saveCourse = async () => {
    setAutoSaveStatus('saving')
    try {
      const { data: user } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('courses')
        .upsert({
          ...course,
          instructor_id: user?.user?.id
        })
      
      if (!error) {
        setAutoSaveStatus('saved')
      }
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  const publishCourse = async () => {
    await saveCourse()
    toast.success('Course published successfully!')
    router.push('/instructor/courses')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (course.title && autoSaveStatus === 'typing') {
        saveCourse()
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [course])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-blue-600">
                TheraBrake Academy™
              </span>
              <span className="text-gray-500">|</span>
              <span className="text-lg font-semibold text-gray-900">
                Course Builder
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${
                autoSaveStatus === 'saved' ? 'text-green-600' : 
                autoSaveStatus === 'saving' ? 'text-yellow-600' : 'text-gray-500'
              }`}>
                {autoSaveStatus === 'saved' ? '✓ All changes saved' :
                 autoSaveStatus === 'saving' ? 'Saving...' : 'Editing...'}
              </span>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={publishCourse}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Publish Course
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <CourseSettings 
            course={course} 
            setCourse={setCourse}
            setAutoSaveStatus={setAutoSaveStatus}
          />
          <ModulesList 
            modules={course.modules} 
            setCourse={setCourse}
            course={course}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <ContentEditor 
            module={activeModule}
            course={course}
            setCourse={setCourse}
            setActiveModule={setActiveModule}
          />
        </div>

        {showPreview && (
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <CoursePreview course={course} module={activeModule} />
          </div>
        )}
      </div>
    </div>
  )
}

function CourseSettings({ course, setCourse, setAutoSaveStatus }) {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Course Settings
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Title *
        </label>
        <input
          type="text"
          value={course.title}
          onChange={(e) => {
            setCourse({...course, title: e.target.value})
            setAutoSaveStatus('typing')
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ethics for Professional Counselors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={course.description}
          onChange={(e) => {
            setCourse({...course, description: e.target.value})
            setAutoSaveStatus('typing')
          }}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Comprehensive ethics course covering..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CE Hours
          </label>
          <input
            type="number"
            value={course.ce_hours}
            onChange={(e) => {
              setCourse({...course, ce_hours: parseFloat(e.target.value) || 0})
              setAutoSaveStatus('typing')
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            value={course.price}
            onChange={(e) => {
              setCourse({...course, price: parseFloat(e.target.value) || 0})
              setAutoSaveStatus('typing')
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="197"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
        <Award className="w-5 h-5 text-yellow-600" />
        <span className="text-sm text-gray-700">
          Texas LPC CE Approved
        </span>
      </div>
    </div>
  )
}

function ModulesList({ modules, setCourse, course, activeModule, setActiveModule }) {
  const addModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      title: `Module ${modules.length + 1}`,
      description: '',
      content: '',
      resources: [],
      position: modules.length
    }
    setCourse({...course, modules: [...modules, newModule]})
    setActiveModule(newModule)
  }

  const deleteModule = (moduleId) => {
    setCourse({...course, modules: modules.filter(m => m.id !== moduleId)})
    if (activeModule?.id === moduleId) {
      setActiveModule(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Course Modules
        </h3>
        <button
          onClick={addModule}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Module
        </button>
      </div>
      
      <div className="space-y-2">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              activeModule?.id === module.id
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-300 hover:border-blue-400'
            }`}
            onClick={() => setActiveModule(module)}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {module.title}
                </h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteModule(module.id)
                }}
                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {modules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No modules yet</p>
          <p className="text-sm">Click "Add Module" to get started</p>
        </div>
      )}
    </div>
  )
}

function ContentEditor({ module, course, setCourse, setActiveModule }) {
  const [isPasting, setIsPasting] = useState(false)
  const editorRef = useRef(null)

  const handlePaste = async (e) => {
    e.preventDefault()
    setIsPasting(true)
    
    const pastedText = e.clipboardData.getData('text/plain')
    const processedContent = await processContent(pastedText)
    
    if (module) {
      const updatedModule = {
        ...module,
        content: module.content + '\n' + processedContent.formatted
      }
      const updatedModules = course.modules.map(m => 
        m.id === module.id ? updatedModule : m
      )
      setCourse({...course, modules: updatedModules})
      setActiveModule(updatedModule)
    }
    
    setIsPasting(false)
    toast.success('Content processed and formatted!')
  }

  const processContent = async (content) => {
    const response = await fetch('/api/courses/process-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    return await response.json()
  }

  const handleContentChange = (e) => {
    if (module) {
      const updatedModule = {
        ...module,
        content: e.target.innerHTML
      }
      const updatedModules = course.modules.map(m => 
        m.id === module.id ? updatedModule : m
      )
      setCourse({...course, modules: updatedModules})
      setActiveModule(updatedModule)
    }
  }

  if (!module) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ClipboardPaste className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select or Create a Module
          </h3>
          <p className="text-gray-500 max-w-md">
            Choose a module from the left panel or create a new one to start building your course content.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-gray-700">
          <strong>💡 Pro Tip:</strong> Simply paste your content from Word, Google Docs, or any text editor. 
          Our intelligent processor will automatically format headings, lists, and paragraphs!
        </p>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onPaste={handlePaste}
        onInput={handleContentChange}
        className={`min-h-[400px] p-4 border-2 border-dashed ${
          isPasting ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:border-blue-500 transition-all`}
        dangerouslySetInnerHTML={{ __html: module.content || '<p class="text-gray-400">Start typing or paste your content here...</p>' }}
      />

      <div className="mt-4 flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
          <Video className="w-4 h-4" />
          Add Video
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
          <FileText className="w-4 h-4" />
          Add PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
          <ImageIcon className="w-4 h-4" />
          Add Image
        </button>
      </div>
    </div>
  )
}

function CoursePreview({ course, module }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5" />
        Live Preview
      </h3>
      
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 mb-4">
        <h4 className="text-2xl font-bold text-gray-900 mb-2">
          {course.title || 'Course Title'}
        </h4>
        <p className="text-gray-600 mb-4">
          {course.description || 'Course description will appear here...'}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-blue-600">
            <Clock className="w-4 h-4" />
            <span>{course.ce_hours || 0} CE Hours</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Award className="w-4 h-4" />
            <span>Certificate Included</span>
          </div>
          <div className="flex items-center gap-1 text-orange-500">
            <Users className="w-4 h-4" />
            <span>${course.price || 0}</span>
          </div>
        </div>
      </div>
      
      {module && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h5 className="font-semibold text-gray-900 mb-2">
            {module.title}
          </h5>
          {module.content ? (
            <div 
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: module.content }}
            />
          ) : (
            <p className="text-gray-400 text-sm">
              Module content will appear here as you type...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
