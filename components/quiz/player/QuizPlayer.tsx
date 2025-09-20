'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Clock, ChevronLeft, ChevronRight, Flag, Send, AlertCircle } from 'lucide-react'
import { Quiz, QuizQuestion, QuizAttempt } from '@/types/quiz'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface QuizPlayerProps {
  quiz: Quiz
  userId: string
  enrollmentId: string
  onComplete?: (attempt: QuizAttempt) => void
}

export function QuizPlayer({ quiz, userId, enrollmentId, onComplete }: QuizPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : 0)
  const [startTime] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  // Timer countdown
  useEffect(() => {
    if (!quiz.timeLimit || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, quiz.timeLimit])

  // Auto-save answers
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem(`quiz_${quiz.id}_answers`, JSON.stringify(answers))
    }, 30000) // Save every 30 seconds

    return () => clearInterval(saveInterval)
  }, [answers, quiz.id])

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle answer selection
  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  // Toggle flag
  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion)
      } else {
        newSet.add(currentQuestion)
      }
      return newSet
    })
  }

  // Submit quiz
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Calculate score
      let correctCount = 0
      let totalPoints = 0
      let earnedPoints = 0

      quiz.questions.forEach(question => {
        totalPoints += question.points
        const userAnswer = answers[question.id]
        
        if (question.type === 'multiple_select') {
          const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer : []
          const user = Array.isArray(userAnswer) ? userAnswer : []
          if (JSON.stringify(correct.sort()) === JSON.stringify(user.sort())) {
            correctCount++
            earnedPoints += question.points
          }
        } else {
          if (userAnswer === question.correctAnswer) {
            correctCount++
            earnedPoints += question.points
          }
        }
      })

      const score = (earnedPoints / totalPoints) * 100
      const passed = score >= quiz.passingScore

      // Save attempt to database
      const attempt: QuizAttempt = {
        id: '',
        quizId: quiz.id,
        userId,
        answers,
        score,
        passed,
        startedAt: startTime,
        completedAt: new Date(),
        timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
        attemptNumber: 1, // Would need to fetch actual attempt number
      }

      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          quiz_id: quiz.id,
          user_id: userId,
          enrollment_id: enrollmentId,
          score,
          passed,
          time_spent: attempt.timeSpent,
          answers
        })
        .select()
        .single()

      if (error) throw error

      // If passed and CE validation, trigger certificate
      if (passed && quiz.ceValidation) {
        await triggerCertificate(enrollmentId)
      }

      toast.success(passed ? '🎉 Quiz passed!' : 'Quiz completed')
      
      if (onComplete) {
        onComplete({ ...attempt, id: data.id })
      } else {
        router.push(`/quiz/results/${data.id}`)
      }

    } catch (error) {
      console.error('Error submitting quiz:', error)
      toast.error('Failed to submit quiz')
    } finally {
      setIsSubmitting(false)
      setShowConfirmSubmit(false)
    }
  }

  // Trigger certificate generation
  const triggerCertificate = async (enrollmentId: string) => {
    try {
      const response = await fetch('/api/certificates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId })
      })
      
      if (!response.ok) throw new Error('Certificate generation failed')
      
      toast.success('🏆 Certificate earned!')
    } catch (error) {
      console.error('Certificate generation error:', error)
    }
  }

  const question = quiz.questions[currentQuestion]
  const isAnswered = !!answers[question?.id]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-neutral-dark">{quiz.title}</h1>
            {quiz.timeLimit && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                timeRemaining < 60 ? 'bg-alert/10 text-alert' : 'bg-primary/10 text-primary'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-neutral-light rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white p-4 border-x">
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                  index === currentQuestion 
                    ? 'bg-primary text-white' 
                    : answers[q.id]
                    ? 'bg-secondary text-white'
                    : 'bg-neutral-light text-neutral-dark hover:bg-neutral-medium'
                } ${flaggedQuestions.has(index) ? 'ring-2 ring-accent' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-white p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm font-medium text-primary">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <h2 className="text-lg font-medium text-neutral-dark mt-2">
                  {question?.question}
                </h2>
              </div>
              <button
                onClick={toggleFlag}
                className={`p-2 rounded-lg transition-colors ${
                  flaggedQuestions.has(currentQuestion)
                    ? 'bg-accent text-white'
                    : 'bg-neutral-light text-neutral-medium hover:bg-accent/20'
                }`}
                title="Flag for review"
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {question?.type === 'multiple_choice' && question.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[question.id] === option
                      ? 'border-primary bg-primary/5'
                      : 'border-neutral-light hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="flex-1 text-neutral-dark">{option}</span>
                </label>
              ))}

              {question?.type === 'true_false' && (
                <div className="grid grid-cols-2 gap-4">
                  {['True', 'False'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={`p-4 rounded-lg border-2 font-medium transition-all ${
                        answers[question.id] === option
                          ? 'border-primary bg-primary text-white'
                          : 'border-neutral-light hover:border-primary/50 text-neutral-dark'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {question?.type === 'multiple_select' && question.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    (answers[question.id] as string[] || []).includes(option)
                      ? 'border-secondary bg-secondary/5'
                      : 'border-neutral-light hover:border-secondary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={(answers[question.id] as string[] || []).includes(option)}
                    onChange={(e) => {
                      const current = (answers[question.id] as string[]) || []
                      if (e.target.checked) {
                        handleAnswer(question.id, [...current, option])
                      } else {
                        handleAnswer(question.id, current.filter(o => o !== option))
                      }
                    }}
                    className="text-secondary focus:ring-secondary"
                  />
                  <span className="flex-1 text-neutral-dark">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white rounded-b-xl shadow-sm p-4 border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-medium">
                {Object.keys(answers).length} of {quiz.questions.length} answered
              </span>
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirmSubmit(true)}
                className="bg-action hover:bg-action-light text-white flex items-center gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-neutral-dark">Ready to Submit?</h3>
            </div>
            
            <p className="text-neutral-medium mb-4">
              You have answered {Object.keys(answers).length} out of {quiz.questions.length} questions.
              {flaggedQuestions.size > 0 && (
                <span className="block mt-2 text-accent">
                  You have {flaggedQuestions.size} flagged question(s) for review.
                </span>
              )}
            </p>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1"
              >
                Review Answers
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-action hover:bg-action-light text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizPlayer
