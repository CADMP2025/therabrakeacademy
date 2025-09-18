// TheraBrake Academy - Simple QuizBuilder Component
'use client';

import React, { useState } from 'react';

export default function QuizBuilder({ initialQuiz = null, onSave, onCancel }) {
  const [quiz, setQuiz] = useState(initialQuiz || {
    title: 'Module Quiz',
    questions: []
  });

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quiz Builder</h2>
      <p className="text-gray-600">Quiz functionality coming soon!</p>
      <div className="mt-4 flex gap-2">
        {onCancel && (
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
        {onSave && (
          <button onClick={() => onSave(quiz)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save Quiz
          </button>
        )}
      </div>
    </div>
  );
}
