'use client';
import React, { useState } from 'react';

export default function CourseBuilder({ 
  instructorId,
  instructorName,
  onSave,
  onPublish,
  onFileUpload,
  isSaving = false
}) {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    type: 'CE',
    price: 0,
    modules: []
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Builder</h1>
      <input 
        type="text" 
        placeholder="Course Title"
        value={course.title}
        onChange={(e) => setCourse({...course, title: e.target.value})}
        className="w-full p-2 border rounded mb-4"
      />
      <textarea 
        placeholder="Course Description"
        value={course.description}
        onChange={(e) => setCourse({...course, description: e.target.value})}
        className="w-full p-2 border rounded mb-4 h-32"
      />
      <div className="flex gap-2">
        <button 
          onClick={() => onSave && onSave(course, 'draft')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isSaving}
        >
          Save Draft
        </button>
        <button 
          onClick={() => onPublish && onPublish(course)}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={isSaving}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
