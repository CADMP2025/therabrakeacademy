// therabrakeacademy/apps/web/src/components/quiz/QuizBuilder.jsx
// TheraBrake Academy - Quiz Builder Component

'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Check, X, HelpCircle, ChevronDown, ChevronUp, Save, Copy } from 'lucide-react';

export default function QuizBuilder({ initialQuiz = null, onSave, onCancel }) {
  const [quiz, setQuiz] = useState(initialQuiz || {
    title: 'Module Assessment',
    instructions: 'Please answer all questions to the best of your ability.',
    passingScore: 70,
    attemptsAllowed: 3,
    timeLimitMinutes: 30,
    questions: []
  });

  const [expandedQuestions, setExpandedQuestions] = useState({});

  // TheraBrake color scheme
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#FACC15',
    action: '#F97316',
    alert: '#EF4444'
  };

  const questionTypes = [
    { id: 'multiple-choice', label: 'Multiple Choice', icon: '🔘' },
    { id: 'true-false', label: 'True/False', icon: '✓✗' },
    { id: 'multiple-select', label: 'Multiple Select', icon: '☑️' }
  ];

  // Add a new question
  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      question: '',
      options: type === 'true-false' ? ['True', 'False'] : ['', '', '', ''],
      correctAnswer: type === 'multiple-select' ? [] : type === 'true-false' ? 'True' : 0,
      explanation: '',
      points: 1
    };

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    // Auto-expand new question
    setExpandedQuestions(prev => ({ ...prev, [newQuestion.id]: true }));
  };

  // Delete a question
  const deleteQuestion = (questionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  // Update question content
  const updateQuestion = (questionId, field, value) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  // Update option text
  const updateOption = (questionId, optionIndex, value) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              )
            }
          : q
      )
    }));
  };

  // Toggle question expansion
  const toggleQuestionExpansion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Calculate total points
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div>
      {/* Quiz Settings */}
      <div className="bg-white rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4">Quiz Settings</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title
            </label>
            <input
              type="text"
              value={quiz.title}
              onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Score (%)
            </label>
            <input
              type="number"
              value={quiz.passingScore}
              onChange={(e) => setQuiz(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 0 }))}
              min="0"
              max="100"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions
          </label>
          <textarea
            value={quiz.instructions}
            onChange={(e) => setQuiz(prev => ({ ...prev, instructions: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] resize-vertical"
          />
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Questions ({quiz.questions.length})
          </h3>
          <div className="text-sm font-medium text-gray-600">
            Total Points: {totalPoints}
          </div>
        </div>

        {/* Add Question Buttons */}
        <div className="flex gap-2 mb-4">
          {questionTypes.map(type => (
            <button
              key={type.id}
              onClick={() => addQuestion(type.id)}
              className="px-3 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#34D399] flex items-center gap-2 text-sm"
            >
              <span>{type.icon}</span>
              <Plus size={16} />
              {type.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="border border-gray-300 rounded-lg mb-3 overflow-hidden"
          >
            {/* Question Header */}
            <div
              className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer"
              onClick={() => toggleQuestionExpansion(question.id)}
            >
              <div className="flex items-center gap-3">
                <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-sm font-bold">
                  Q{index + 1}
                </span>
                <span className="font-medium">
                  {question.question || 'New Question'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteQuestion(question.id);
                  }}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
                {expandedQuestions[question.id] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {/* Question Content (Expanded) */}
            {expandedQuestions[question.id] && (
              <div className="p-4">
                {/* Question Text */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <textarea
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6]"
                    placeholder="Enter your question..."
                  />
                </div>

                {/* Answer Options */}
                {question.type !== 'true-false' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer Options
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2 mb-2">
                        <input
                          type={question.type === 'multiple-select' ? 'checkbox' : 'radio'}
                          checked={
                            question.type === 'multiple-select'
                              ? question.correctAnswer.includes(optionIndex)
                              : question.correctAnswer === optionIndex
                          }
                          onChange={() => {
                            if (question.type === 'multiple-select') {
                              const newCorrect = question.correctAnswer.includes(optionIndex)
                                ? question.correctAnswer.filter(i => i !== optionIndex)
                                : [...question.correctAnswer, optionIndex];
                              updateQuestion(question.id, 'correctAnswer', newCorrect);
                            } else {
                              updateQuestion(question.id, 'correctAnswer', optionIndex);
                            }
                          }}
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False Options */}
                {question.type === 'true-false' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correct Answer
                    </label>
                    <div className="flex gap-4">
                      {['True', 'False'].map(value => (
                        <label key={value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={question.correctAnswer === value}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', value)}
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {quiz.questions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <HelpCircle size={48} className="mx-auto mb-3" />
            <p>No questions yet. Add your first question using the buttons above.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(quiz)}
          className="px-4 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] flex items-center gap-2"
        >
          <Save size={20} />
          Save Quiz
        </button>
      </div>
    </div>
  );
}