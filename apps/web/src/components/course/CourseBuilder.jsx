// TheraBrake Academy - Simple CourseBuilder Component
'use client';

import React, { useState } from 'react';

export default function CourseBuilder({ 
  instructorId,
  instructorName,
  initialCourse = null,
  onSave,
  onPublish,
  onFileUpload,
  isSaving = false
}) {
  const [course, setCourse] = useState(initialCourse || {
    title: '',
    description: '',
    type: 'CE',
    price: 0,
    ceHours: 0,
    modules: []
  });

  const handleSave = async () => {
    if (onSave) {
      await onSave(course, 'draft');
    }
  };

  const handlePublish = async () => {
    if (onPublish) {
      await onPublish(course);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Course Builder</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse({...course, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Description
              </label>
              <textarea
                value={course.description}
                onChange={(e) => setCourse({...course, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Describe your course"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={course.type}
                  onChange={(e) => setCourse({...course, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="CE">CE Course</option>
                  <option value="Personal">Personal Development</option>
                  <option value="Professional">Professional Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={course.price}
                  onChange={(e) => setCourse({...course, price: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min="0"
                  step="0.01"
                />
              </div>

              {course.type === 'CE' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CE Hours
                  </label>
                  <input
                    type="number"
                    value={course.ceHours}
                    onChange={(e) => setCourse({...course, ceHours: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                    step="0.5"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Content
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500 mb-2">📋 Paste your course content here</p>
                <textarea
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="Simply paste content from Word, Google Docs, or any text editor..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Publish Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
