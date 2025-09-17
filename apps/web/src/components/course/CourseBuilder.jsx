// therabrakeacademy/src/components/course/CourseBuilder.jsx
// TheraBrake Academy - Reusable Course Builder Component

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Save, Plus, Trash2, Copy, Upload, Video, Image, FileText, 
  ChevronDown, ChevronUp, Eye, Settings, BookOpen, HelpCircle,
  DollarSign, Clock, Users, Award, CheckCircle, X, AlertCircle,
  Loader2, Link, Code, List, Bold, Italic
} from 'lucide-react';
import QuizBuilder from '../quiz/QuizBuilder';

export default function CourseBuilder({ 
  instructorId,
  instructorName,
  initialCourse = null,
  onSave,
  onPublish,
  onFileUpload,
  isSaving = false
}) {
  // Course State Management
  const [course, setCourse] = useState(initialCourse || {
    title: '',
    description: '',
    type: 'CE',
    price: 0,
    ceHours: 0,
    instructor: instructorName || '',
    thumbnail: '',
    status: 'draft',
    tags: [],
    prerequisites: '',
    learningObjectives: [],
    targetAudience: '',
    modules: []
  });

  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(false);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [errors, setErrors] = useState({});
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  // TheraBrake Color Scheme
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#FACC15',
    action: '#F97316',
    alert: '#EF4444'
  };

  // Auto-save functionality
  useEffect(() => {
    if (!onSave) return;

    const autoSaveTimer = setInterval(() => {
      if (course.title || course.modules.length > 0) {
        handleAutoSave();
      }
    }, 60000); // Auto-save every minute

    return () => clearInterval(autoSaveTimer);
  }, [course]);

  const handleAutoSave = async () => {
    setAutoSaveStatus('saving');
    try {
      await onSave(course, 'draft');
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus(''), 3000);
    } catch (error) {
      setAutoSaveStatus('error');
    }
  };

  // Course Information Handlers
  const updateCourseInfo = (field, value) => {
    setCourse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Module Management
  const addModule = () => {
    const newModule = {
      id: Date.now().toString(),
      title: `Module ${course.modules.length + 1}`,
      description: '',
      content: '',
      duration: 30,
      resources: [],
      quiz: null,
      order: course.modules.length
    };

    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    setActiveModule(course.modules.length);
  };

  const updateModule = (moduleIndex, field, value) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      [field]: value
    };
    setCourse(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const deleteModule = (moduleIndex) => {
    if (confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      setCourse(prev => ({
        ...prev,
        modules: prev.modules.filter((_, index) => index !== moduleIndex)
      }));
      if (activeModule >= course.modules.length - 1) {
        setActiveModule(Math.max(0, course.modules.length - 2));
      }
    }
  };

  const duplicateModule = (moduleIndex) => {
    const moduleToDuplicate = course.modules[moduleIndex];
    const newModule = {
      ...moduleToDuplicate,
      id: Date.now().toString(),
      title: `${moduleToDuplicate.title} (Copy)`,
      order: course.modules.length
    };

    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };

  const reorderModules = (fromIndex, toIndex) => {
    const updatedModules = [...course.modules];
    const [movedModule] = updatedModules.splice(fromIndex, 1);
    updatedModules.splice(toIndex, 0, movedModule);
    
    setCourse(prev => ({
      ...prev,
      modules: updatedModules.map((mod, idx) => ({ ...mod, order: idx }))
    }));
  };

  // Advanced Content Processing with AI-like formatting
  const processContent = useCallback((text) => {
    let formatted = text;

    // Smart formatting rules
    const formattingRules = [
      // Convert headers (lines that start with capital and are less than 60 chars)
      { pattern: /^([A-Z][^.!?\n]{0,60})$/gm, replacement: '## $1' },
      
      // Convert sub-headers (lines with colons)
      { pattern: /^([A-Z][^:\n]+):$/gm, replacement: '### $1:' },
      
      // Bullet points variations
      { pattern: /^[-*•]\s+/gm, replacement: '• ' },
      { pattern: /^[▪▫◦‣⁃]\s+/gm, replacement: '  ◦ ' },
      
      // Numbered lists
      { pattern: /^(\d+)[.)]\s+/gm, replacement: '$1. ' },
      { pattern: /^([a-z])[.)]\s+/gm, replacement: '   $1) ' },
      
      // Bold text
      { pattern: /\*\*(.*?)\*\*/g, replacement: '**$1**' },
      { pattern: /__(.*?)__/g, replacement: '**$1**' },
      
      // Italic text
      { pattern: /\*(.*?)\*/g, replacement: '_$1_' },
      
      // Links
      { pattern: /(https?:\/\/[^\s]+)/g, replacement: '[$1]($1)' },
      
      // Clean whitespace
      { pattern: /\n{3,}/g, replacement: '\n\n' },
      { pattern: /^\s+/gm, replacement: '' },
      { pattern: /\s+$/gm, replacement: '' }
    ];

    formattingRules.forEach(rule => {
      formatted = formatted.replace(rule.pattern, rule.replacement);
    });

    // Add section dividers for better readability
    formatted = formatted.replace(/\n(#{2,3}\s)/g, '\n---\n\n$1');

    return formatted;
  }, []);

  const handleContentPaste = (e, moduleIndex) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const formattedContent = processContent(pastedText);
    
    // Show formatting preview
    if (confirm('Content has been auto-formatted. Would you like to apply smart formatting?')) {
      updateModule(moduleIndex, 'content', formattedContent);
    } else {
      updateModule(moduleIndex, 'content', pastedText);
    }
  };

  // Resource Upload with Progress
  const handleFileUpload = async (files, moduleIndex) => {
    if (!onFileUpload) {
      console.warn('File upload handler not provided');
      return;
    }

    const module = course.modules[moduleIndex];
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        const uploadedFile = await onFileUpload(file, module.id);
        return {
          id: Date.now().toString() + Math.random(),
          ...uploadedFile
        };
      } catch (error) {
        console.error('Upload failed:', error);
        return null;
      }
    });

    const uploadedResources = await Promise.all(uploadPromises);
    const successfulUploads = uploadedResources.filter(r => r !== null);

    updateModule(moduleIndex, 'resources', [
      ...module.resources,
      ...successfulUploads
    ]);
  };

  // Quiz Management
  const handleQuizSave = (quizData) => {
    updateModule(activeModule, 'quiz', quizData);
    setShowQuizBuilder(false);
  };

  // Validation
  const validateCourse = () => {
    const newErrors = {};
    
    if (!course.title || course.title.trim() === '') {
      newErrors.title = 'Course title is required';
    }
    if (!course.description || course.description.trim() === '') {
      newErrors.description = 'Course description is required';
    }
    if (course.modules.length === 0) {
      newErrors.modules = 'At least one module is required';
    }
    if (course.type === 'CE' && (!course.ceHours || course.ceHours <= 0)) {
      newErrors.ceHours = 'CE hours required for CE courses';
    }
    
    course.modules.forEach((module, idx) => {
      if (!module.title || module.title.trim() === '') {
        newErrors[`module_${idx}_title`] = `Module ${idx + 1} title is required`;
      }
      if (!module.content || module.content.trim() === '') {
        newErrors[`module_${idx}_content`] = `Module ${idx + 1} content is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save and Publish Handlers
  const handleSave = async () => {
    if (onSave) {
      await onSave(course, 'draft');
    }
  };

  const handlePublish = async () => {
    if (validateCourse() && onPublish) {
      await onPublish(course);
    } else {
      alert('Please fix all errors before publishing');
    }
  };

  // Insert content elements
  const insertContentElement = (type, moduleIndex) => {
    const module = course.modules[moduleIndex];
    let insertText = '';

    const contentElements = {
      video: '\n\n[VIDEO: Paste YouTube/Vimeo URL here]\n\n',
      image: '\n\n[IMAGE: Upload or paste image URL]\n\n',
      download: '\n\n[DOWNLOAD: Attach file for download]\n\n',
      code: '\n\n```\n// Your code here\n```\n\n',
      quote: '\n\n> "Insert quote here"\n> — Author Name\n\n',
      callout: '\n\n---\n💡 **Important Note:**\nYour callout text here\n---\n\n',
      table: '\n\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Data 1   | Data 2   | Data 3   |\n\n'
    };

    insertText = contentElements[type] || '';
    
    const currentContent = module.content || '';
    const textarea = document.getElementById(`module-content-${moduleIndex}`);
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = currentContent.substring(0, start) + insertText + currentContent.substring(end);
      updateModule(moduleIndex, 'content', newContent);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
        textarea.focus();
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🧠</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {initialCourse ? 'Edit Course' : 'Create New Course'}
                </h1>
                <p className="text-xs text-gray-500">TheraBrake Academy™ Course Builder</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {autoSaveStatus === 'saving' && (
                <span className="text-gray-500 flex items-center text-sm">
                  <Loader2 className="animate-spin h-4 w-4 mr-1" />
                  Saving...
                </span>
              )}
              {autoSaveStatus === 'saved' && (
                <span className="text-green-600 flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Saved
                </span>
              )}
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-1" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save Draft
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="px-4 py-1.5 text-sm bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] flex items-center disabled:opacity-50"
              >
                🚀 Publish Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex h-[calc(100vh-60px)]">
        {/* Module Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 mb-2">Course Modules</h3>
            <button
              onClick={addModule}
              className="w-full py-2 px-4 bg-[#3B82F6] text-white rounded-lg hover:bg-[#60A5FA] flex items-center justify-center text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Module
            </button>
          </div>
          
          <div className="p-2">
            {course.modules.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <BookOpen className="h-12 w-12 mx-auto mb-2" />
                <p>No modules yet</p>
                <p className="text-xs">Click "Add New Module" to start</p>
              </div>
            ) : (
              course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`mb-2 p-3 rounded-lg cursor-pointer transition-all ${
                    activeModule === index 
                      ? 'bg-[#3B82F6] text-white shadow-md' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveModule(index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {module.title || `Module ${index + 1}`}
                      </p>
                      <div className={`text-xs mt-1 flex items-center ${
                        activeModule === index ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {module.duration} min
                        {module.resources.length > 0 && (
                          <>
                            <span className="mx-1">•</span>
                            <FileText className="h-3 w-3 mr-1" />
                            {module.resources.length}
                          </>
                        )}
                        {module.quiz && (
                          <>
                            <span className="mx-1">•</span>
                            <HelpCircle className="h-3 w-3" />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateModule(index);
                        }}
                        className="p-1 hover:bg-white/20 rounded"
                        title="Duplicate module"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteModule(index);
                        }}
                        className="p-1 hover:bg-red-200 rounded"
                        title="Delete module"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  {errors[`module_${index}_title`] && (
                    <p className="text-xs text-red-300 mt-1">Title required</p>
                  )}
                  {errors[`module_${index}_content`] && (
                    <p className="text-xs text-red-300">Content required</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* Course Information */}
          <div className="bg-white m-6 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Course Information</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) => updateCourseInfo('title', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Ethics for Professional Counselors"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Type
                </label>
                <select
                  value={course.type}
                  onChange={(e) => updateCourseInfo('type', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                >
                  <option value="CE">CE Course (Continuing Education)</option>
                  <option value="Personal">Personal Development</option>
                  <option value="Professional">Professional Development</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-3 w-3 inline mr-1" />
                  Price (USD)
                </label>
                <input
                  type="number"
                  value={course.price}
                  onChange={(e) => updateCourseInfo('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {course.type === 'CE' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-3 w-3 inline mr-1" />
                    CE Hours <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={course.ceHours}
                    onChange={(e) => updateCourseInfo('ceHours', parseFloat(e.target.value) || 0)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3B82F6] ${
                      errors.ceHours ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                  {errors.ceHours && (
                    <p className="text-red-500 text-xs mt-1">{errors.ceHours}</p>
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-3 w-3 inline mr-1" />
                  Max Students
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="Unlimited"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={course.description}
                onChange={(e) => updateCourseInfo('description', e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3B82F6] ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what students will learn in this course..."
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Module Editor */}
          {course.modules.length > 0 && course.modules[activeModule] && (
            <div className="bg-white m-6 rounded-lg shadow-sm">
              {/* Module Tabs */}
              <div className="border-b">
                <div className="flex space-x-1 p-4">
                  {['content', 'resources', 'quiz', 'settings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                        activeTab === tab 
                          ? 'bg-[#3B82F6] text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab === 'content' && '📝 Content'}
                      {tab === 'resources' && '📎 Resources'}
                      {tab === 'quiz' && '❓ Quiz'}
                      {tab === 'settings' && '⚙️ Settings'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Module Title */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={course.modules[activeModule]?.title || ''}
                    onChange={(e) => updateModule(activeModule, 'title', e.target.value)}
                    className="text-xl font-bold w-full px-3 py-2 border-b-2 border-transparent hover:border-gray-300 focus:border-[#3B82F6] focus:outline-none"
                    placeholder="Module Title"
                  />
                </div>

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div>
                    <div className="bg-gradient-to-r from-[#FACC15] to-[#FBBF24] p-4 rounded-lg mb-4">
                      <p className="font-semibold flex items-center text-gray-800">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Pro Tip: Smart Cut & Paste!
                      </p>
                      <p className="text-sm mt-1 text-gray-700">
                        Paste content from Word, Google Docs, or any editor. Our AI-powered formatter 
                        automatically structures it with headings, lists, and proper formatting!
                      </p>
                    </div>

                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-100 rounded-lg">
                      <button
                        onClick={() => insertContentElement('video', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Video"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </button>
                      <button
                        onClick={() => insertContentElement('image', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Image"
                      >
                        <Image className="h-4 w-4 mr-1" />
                        Image
                      </button>
                      <button
                        onClick={() => insertContentElement('download', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Download"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        File
                      </button>
                      <button
                        onClick={() => insertContentElement('code', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Code Block"
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Code
                      </button>
                      <button
                        onClick={() => insertContentElement('table', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Table"
                      >
                        <List className="h-4 w-4 mr-1" />
                        Table
                      </button>
                      <button
                        onClick={() => insertContentElement('callout', activeModule)}
                        className="px-3 py-1.5 bg-white rounded hover:bg-gray-200 flex items-center text-sm"
                        title="Insert Callout"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Callout
                      </button>
                    </div>

                    <textarea
                      id={`module-content-${activeModule}`}
                      value={course.modules[activeModule]?.content || ''}
                      onChange={(e) => updateModule(activeModule, 'content', e.target.value)}
                      onPaste={(e) => handleContentPaste(e, activeModule)}
                      className="w-full min-h-[400px] px-4 py-3 text-sm border-2 border-dashed border-gray-300 rounded-lg focus:border-[#3B82F6] focus:outline-none font-mono bg-white"
                      placeholder={`📋 Paste your module content here...

Simply paste content from:
• Microsoft Word documents
• Google Docs
• Plain text files
• Web pages
• PDFs (copy text)

Auto-formatting includes:
✓ Headers and subheaders
✓ Bullet points and numbered lists
✓ Bold and italic text
✓ Paragraphs and sections
✓ Links and references

Tips:
- Use "##" for main headings
- Use "###" for subheadings
- Use "•" or "-" for bullet points
- Use "1." for numbered lists
- Use "**text**" for bold
- Use "_text_" for italic
- Use "[text](url)" for links`}
                    />
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#3B82F6] transition-colors cursor-pointer bg-gray-50"
                      onClick={() => document.getElementById(`file-upload-${activeModule}`).click()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFileUpload(e.dataTransfer.files, activeModule);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="font-semibold mb-1">Drop PDF Workbooks & Forms Here</h3>
                      <p className="text-sm text-gray-500">or click to browse</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Supports: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                      </p>
                      <input
                        type="file"
                        id={`file-upload-${activeModule}`}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        onChange={(e) => handleFileUpload(e.target.files, activeModule)}
                      />
                    </div>

                    {/* Uploaded Resources */}
                    {course.modules[activeModule]?.resources.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Uploaded Resources</h4>
                        <div className="space-y-2">
                          {course.modules[activeModule].resources.map((resource, idx) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                              <div className="flex items-center flex-1">
                                <FileText className="h-5 w-5 mr-3 text-gray-500" />
                                <div>
                                  <p className="font-medium text-sm">{resource.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {resource.size ? `${(resource.size / 1024 / 1024).toFixed(2)} MB` : 'Size unknown'}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  const updatedResources = course.modules[activeModule].resources.filter(
                                    (r) => r.id !== resource.id
                                  );
                                  updateModule(activeModule, 'resources', updatedResources);
                                }}
                                className="p-2 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Quiz Tab */}
                {activeTab === 'quiz' && (
                  <div>
                    {course.modules[activeModule]?.quiz ? (
                      <div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="font-semibold text-green-800 mb-2">Quiz Configured</p>
                          <p className="text-sm text-green-700">
                            {course.modules[activeModule].quiz.questions?.length || 0} questions
                          </p>
                          <button
                            onClick={() => setShowQuizBuilder(true)}
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Edit Quiz
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <h3 className="font-semibold mb-1">Add Quiz Questions</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Test student knowledge with interactive quizzes
                        </p>
                        <button
                          onClick={() => setShowQuizBuilder(true)}
                          className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#34D399]"
                        >
                          <Plus className="h-4 w-4 inline mr-2" />
                          Create Quiz
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Module Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={course.modules[activeModule]?.duration || 30}
                        onChange={(e) => updateModule(activeModule, 'duration', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Module Description
                      </label>
                      <textarea
                        value={course.modules[activeModule]?.description || ''}
                        onChange={(e) => updateModule(activeModule, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                        rows={3}
                        placeholder="Brief description of what this module covers..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded text-[#3B82F6]"
                          checked={course.modules[activeModule]?.requireQuizPass || false}
                          onChange={(e) => updateModule(activeModule, 'requireQuizPass', e.target.checked)}
                        />
                        <span className="text-sm font-medium">Require quiz completion to proceed</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded text-[#3B82F6]"
                        />
                        <span className="text-sm font-medium">Enable discussion forum for this module</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded text-[#3B82F6]"
                        />
                        <span className="text-sm font-medium">Make this a preview module (free access)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {course.modules.length === 0 && (
            <div className="bg-white m-6 rounded-lg shadow-sm p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Building Your Course</h3>
              <p className="text-gray-500 mb-6">
                Add your first module to begin creating amazing course content
              </p>
              <button
                onClick={addModule}
                className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#60A5FA] flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add First Module
              </button>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-96 bg-white border-l overflow-y-auto">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="aspect-video bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🧠</span>
              </div>
              
              <h2 className="text-xl font-bold mb-2">
                {course.title || 'Untitled Course'}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.type === 'CE' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {course.ceHours} CE Hours
                  </span>
                )}
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {course.modules.length} Modules
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {course.type} Course
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 text-sm">
                {course.description || 'No description provided'}
              </p>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Course Modules</h4>
                <div className="space-y-2">
                  {course.modules.map((module, index) => (
                    <div key={module.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{module.title}</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration} min
                            {module.resources.length > 0 && (
                              <>
                                <span className="mx-1">•</span>
                                {module.resources.length} resources
                              </>
                            )}
                          </div>
                        </div>
                        {module.quiz && (
                          <span className="text-xs bg-[#10B981] text-white px-2 py-1 rounded">
                            Quiz
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {course.modules.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No modules added yet
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="text-3xl font-bold text-[#F97316]">
                  ${course.price > 0 ? course.price.toFixed(2) : 'FREE'}
                </div>
                <button className="w-full mt-4 py-3 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] font-semibold">
                  Enroll Now
                </button>
                {course.type === 'CE' && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Texas LPC Approved • NBCC Provider #87569
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Builder Modal */}
      {showQuizBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Quiz Builder</h2>
                <button
                  onClick={() => setShowQuizBuilder(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <QuizBuilder
                initialQuiz={course.modules[activeModule]?.quiz}
                onSave={handleQuizSave}
                onCancel={() => setShowQuizBuilder(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}