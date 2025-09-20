'use client'

import React, { useState, useCallback } from 'react'
import { Plus, Trash2, GripVertical, Copy, Save, Eye } from 'lucide-react'
import { QuizQuestion, QuestionType, Quiz } from '@/types/quiz'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface QuizBuilderProps {
  courseId: string
  moduleId?: string
  initialQuiz?: Quiz
  onSave?: (quiz: Quiz) => void
}

export function QuizBuilder({ courseId, moduleId, initialQuiz, onSave }: QuizBuilderProps) {
  const [quiz, setQuiz] = useState<Quiz>(initialQuiz || {
    id: '',
    courseId,
    moduleId,
    title: '',
    description: '',
    questions: [],
    passingScore: 70,
    maxAttempts: 3,
    timeLimit: 0,
    showFeedback: true,
    randomizeQuestions: false,
    randomizeAnswers: false,
    ceValidation: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const [isPreview, setIsPreview] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const supabase = createClient()

  // Add new question
  const addQuestion = (type: QuestionType) => {
    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}`,
      type,
      question: '',
      options: type === 'true_false' ? ['True', 'False'] : ['', '', '', ''],
      correctAnswer: type === 'multiple_select' ? [] : '',
      explanation: '',
      points: 1,
      position: quiz.questions.length,
    }

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
  }

  // Update question
  const updateQuestion = (index: number, updates: Partial<QuizQuestion>) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, ...updates } : q
      )
    }))
  }

  // Delete question
  const deleteQuestion = (index: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }))
  }

  // Duplicate question
  const duplicateQuestion = (index: number) => {
    const question = quiz.questions[index]
    const duplicated = {
      ...question,
      id: `q_${Date.now()}`,
      position: quiz.questions.length
    }
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, duplicated]
    }))
  }

  // Save quiz
  const saveQuiz = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .upsert({
          ...quiz,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Quiz saved successfully!')
      if (onSave) onSave(data)
    } catch (error) {
      console.error('Error saving quiz:', error)
      toast.error('Failed to save quiz')
    }
  }

  // Process pasted content
  const processPastedQuestions = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim())
    const questions: QuizQuestion[] = []
    let currentQuestion: Partial<QuizQuestion> | null = null
    let currentOptions: string[] = []

    lines.forEach(line => {
      // Detect question (starts with number)
      if (/^\d+[\.\)]\s/.test(line)) {
        if (currentQuestion && currentQuestion.question) {
          questions.push({
            ...currentQuestion,
            options: currentOptions.length > 0 ? currentOptions : undefined,
            id: `q_${Date.now()}_${questions.length}`,
            position: questions.length,
            points: 1,
            correctAnswer: '',
          } as QuizQuestion)
        }
        currentQuestion = {
          type: 'multiple_choice',
          question: line.replace(/^\d+[\.\)]\s/, '').trim(),
        }
        currentOptions = []
      }
      // Detect options (starts with letter)
      else if (/^[a-zA-Z][\.\)]\s/.test(line)) {
        const option = line.replace(/^[a-zA-Z][\.\)]\s/, '').trim()
        currentOptions.push(option)
      }
    })

    // Add last question
    if (currentQuestion && currentQuestion.question) {
      questions.push({
        ...currentQuestion,
        options: currentOptions.length > 0 ? currentOptions : undefined,
        id: `q_${Date.now()}_${questions.length}`,
        position: questions.length,
        points: 1,
        correctAnswer: '',
      } as QuizQuestion)
    }

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, ...questions]
    }))

    toast.success(`Added ${questions.length} questions from paste`)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header with TheraBrake branding */}
      <div className="border-b border-neutral-light pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark">Quiz Builder</h2>
            <p className="text-sm text-neutral-medium mt-1">
              Create engaging assessments for your TheraBrake Academy course
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              onClick={saveQuiz}
              className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Quiz
            </Button>
          </div>
        </div>
      </div>

      {!isPreview ? (
        <>
          {/* Quiz Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Quiz Title *
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Module 1: Ethics Assessment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Passing Score (%)
              </label>
              <input
                type="number"
                value={quiz.passingScore}
                onChange={(e) => setQuiz(prev => ({ ...prev, passingScore: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Time Limit (minutes, 0 = unlimited)
              </label>
              <input
                type="number"
                value={quiz.timeLimit || 0}
                onChange={(e) => setQuiz(prev => ({ ...prev, timeLimit: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Max Attempts
              </label>
              <input
                type="number"
                value={quiz.maxAttempts}
                onChange={(e) => setQuiz(prev => ({ ...prev, maxAttempts: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                min="1"
              />
            </div>
          </div>

          {/* Quiz Options */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-primary/5 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quiz.showFeedback}
                onChange={(e) => setQuiz(prev => ({ ...prev, showFeedback: e.target.checked }))}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-dark">Show Feedback</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quiz.randomizeQuestions}
                onChange={(e) => setQuiz(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-neutral-dark">Randomize Questions</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quiz.ceValidation}
                onChange={(e) => setQuiz(prev => ({ ...prev, ceValidation: e.target.checked }))}
                className="rounded text-accent focus:ring-accent"
              />
              <span className="text-sm font-medium text-neutral-dark">CE Credit Validation</span>
            </label>
          </div>

          {/* Paste Area */}
          <div className="mb-6 p-4 border-2 border-dashed border-secondary/30 rounded-lg bg-secondary/5">
            <p className="text-sm font-medium text-neutral-dark mb-2">
              📋 Quick Add: Paste questions from Word or Google Docs
            </p>
            <textarea
              className="w-full px-3 py-2 border border-neutral-light rounded-lg text-sm"
              rows={4}
              placeholder="Paste your questions here. Format: 
1. Question text
a. Option 1
b. Option 2
c. Option 3
d. Option 4"
              onPaste={(e) => {
                e.preventDefault()
                const text = e.clipboardData.getData('text')
                processPastedQuestions(text)
              }}
            />
          </div>

          {/* Add Question Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => addQuestion('multiple_choice')}
              className="bg-secondary hover:bg-secondary-light text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Multiple Choice
            </Button>
            <Button
              onClick={() => addQuestion('true_false')}
              className="bg-action hover:bg-action-light text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              True/False
            </Button>
            <Button
              onClick={() => addQuestion('multiple_select')}
              className="bg-accent hover:bg-accent-hover text-neutral-dark"
            >
              <Plus className="w-4 h-4 mr-2" />
              Multiple Select
            </Button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                index={index}
                onUpdate={(updates) => updateQuestion(index, updates)}
                onDelete={() => deleteQuestion(index)}
                onDuplicate={() => duplicateQuestion(index)}
              />
            ))}
          </div>

          {quiz.questions.length === 0 && (
            <div className="text-center py-12 bg-neutral-light/20 rounded-lg">
              <p className="text-neutral-medium">No questions yet. Add your first question above!</p>
            </div>
          )}
        </>
      ) : (
        <QuizPreview quiz={quiz} />
      )}
    </div>
  )
}

// Question Editor Component
function QuestionEditor({ question, index, onUpdate, onDelete, onDuplicate }: any) {
  return (
    <div className="border border-neutral-light rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-neutral-medium cursor-move" />
          <span className="text-sm font-bold text-primary">Q{index + 1}</span>
          <span className="px-2 py-1 bg-accent/20 text-accent-hover rounded text-xs font-medium">
            {question.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={onDuplicate}
            className="p-1 hover:bg-neutral-light rounded"
            title="Duplicate"
          >
            <Copy className="w-4 h-4 text-neutral-medium" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-alert/10 rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-alert" />
          </button>
        </div>
      </div>

      <input
        type="text"
        value={question.question}
        onChange={(e) => onUpdate({ question: e.target.value })}
        className="w-full px-3 py-2 border border-neutral-light rounded-lg mb-3 focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder="Enter your question..."
      />

      {/* Options based on question type */}
      {question.type === 'multiple_choice' && (
        <div className="space-y-2">
          {question.options?.map((option: string, optIndex: number) => (
            <div key={optIndex} className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct_${question.id}`}
                checked={question.correctAnswer === option}
                onChange={() => onUpdate({ correctAnswer: option })}
                className="text-secondary focus:ring-secondary"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(question.options || [])]
                  newOptions[optIndex] = e.target.value
                  onUpdate({ options: newOptions })
                }}
                className="flex-1 px-3 py-1 border border-neutral-light rounded-lg text-sm"
                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Points and Explanation */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="text-xs font-medium text-neutral-medium">Points</label>
          <input
            type="number"
            value={question.points}
            onChange={(e) => onUpdate({ points: Number(e.target.value) })}
            className="w-full px-2 py-1 border border-neutral-light rounded text-sm"
            min="1"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-medium">Explanation (optional)</label>
          <input
            type="text"
            value={question.explanation || ''}
            onChange={(e) => onUpdate({ explanation: e.target.value })}
            className="w-full px-2 py-1 border border-neutral-light rounded text-sm"
            placeholder="Why this answer?"
          />
        </div>
      </div>
    </div>
  )
}

// Quiz Preview Component
function QuizPreview({ quiz }: { quiz: Quiz }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
        <h3 className="text-2xl font-bold mb-2">{quiz.title || 'Untitled Quiz'}</h3>
        <div className="flex gap-4 text-sm">
          <span>📝 {quiz.questions.length} Questions</span>
          <span>⏱️ {quiz.timeLimit ? `${quiz.timeLimit} minutes` : 'Unlimited'}</span>
          <span>✅ Pass: {quiz.passingScore}%</span>
        </div>
      </div>

      {quiz.questions.map((question, index) => (
        <div key={question.id} className="bg-white border border-neutral-light rounded-lg p-4">
          <p className="font-medium mb-3">
            {index + 1}. {question.question || '(No question text)'}
          </p>
          {question.options && (
            <div className="space-y-2 ml-4">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-neutral-medium">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span>{option || '(Empty option)'}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 text-sm text-neutral-medium">
            Points: {question.points}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizBuilder
