'use client'

import { useState, useEffect } from 'react'
import { QuizPlayer } from '@/components/quiz/player/QuizPlayer'
import { createClient } from '@/lib/supabase/client'
import { Quiz, QuizAttempt } from '@/types/quiz'
import { Trophy, Clock, Target, ChevronRight } from 'lucide-react'

export default function StudentQuizPage() {
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt[]>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's enrollments
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (enrollmentError) throw enrollmentError

      const courseIds = enrollments?.map(e => e.course_id) || []

      // Get quizzes for enrolled courses
      const { data: quizzes, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .in('course_id', courseIds)

      if (quizError) throw quizError

      setAvailableQuizzes(quizzes || [])

      // Get attempts
      if (quizzes && quizzes.length > 0) {
        const quizIds = quizzes.map(q => q.id)
        const { data: attemptData } = await supabase
          .from('quiz_attempts')
          .select('*')
          .in('quiz_id', quizIds)
          .eq('user_id', user.id)

        if (attemptData) {
          const attemptsByQuiz: Record<string, QuizAttempt[]> = {}
          attemptData.forEach(attempt => {
            if (!attemptsByQuiz[attempt.quiz_id]) {
              attemptsByQuiz[attempt.quiz_id] = []
            }
            attemptsByQuiz[attempt.quiz_id].push(attempt)
          })
          setAttempts(attemptsByQuiz)
        }
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (selectedQuiz) {
    return (
      <QuizPlayer
        quiz={selectedQuiz}
        userId=""
        enrollmentId=""
        onComplete={(attempt) => {
          setSelectedQuiz(null)
          fetchQuizzes()
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Quizzes</h1>
          <p className="text-white/90">
            Test your knowledge and earn CE credits
          </p>
        </div>

        {availableQuizzes.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Trophy className="w-16 h-16 text-neutral-medium mx-auto mb-4" />
            <p className="text-neutral-medium mb-4">No quizzes available</p>
            <p className="text-sm text-neutral-medium">
              Enroll in courses to access quizzes and assessments
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map((quiz) => {
              const quizAttempts = attempts[quiz.id] || []
              const bestScore = quizAttempts.length > 0
                ? Math.max(...quizAttempts.map(a => a.score))
                : null
              const hasPassed = quizAttempts.some(a => a.passed)

              return (
                <div key={quiz.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {hasPassed && (
                    <div className="bg-secondary text-white px-4 py-2 text-center text-sm font-medium">
                      ✓ Passed
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-neutral-dark mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-neutral-medium mb-4">
                      {quiz.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-medium">
                        <Target className="w-4 h-4" />
                        <span>Pass: {quiz.passingScore}%</span>
                      </div>
                      {quiz.timeLimit && (
                        <div className="flex items-center gap-2 text-sm text-neutral-medium">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.timeLimit} minutes</span>
                        </div>
                      )}
                      {bestScore !== null && (
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Trophy className="w-4 h-4" />
                          <span>Best: {bestScore.toFixed(1)}%</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-neutral-medium mb-4">
                      Attempts: {quizAttempts.length} / {quiz.maxAttempts}
                    </div>

                    <button
                      onClick={() => setSelectedQuiz(quiz)}
                      disabled={quizAttempts.length >= quiz.maxAttempts}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        quizAttempts.length >= quiz.maxAttempts
                          ? 'bg-neutral-light text-neutral-medium cursor-not-allowed'
                          : 'bg-primary hover:bg-primary-hover text-white'
                      }`}
                    >
                      {quizAttempts.length >= quiz.maxAttempts ? (
                        'Max Attempts Reached'
                      ) : (
                        <>
                          {quizAttempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
