'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trophy, XCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function QuizResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [attempt, setAttempt] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchResults()
  }, [params.id])

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*, quizzes(*)')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setAttempt(data)
    } catch (error) {
      console.error('Error fetching results:', error)
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

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-medium mb-4">Results not found</p>
          <Link href="/student/quiz" className="text-primary hover:text-primary-hover">
            Back to Quizzes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-6">
      <div className="max-w-2xl mx-auto">
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${
          attempt.passed ? 'border-t-4 border-secondary' : 'border-t-4 border-alert'
        }`}>
          {/* Results Header */}
          <div className={`p-8 text-center ${
            attempt.passed 
              ? 'bg-gradient-to-b from-secondary/10 to-white' 
              : 'bg-gradient-to-b from-alert/10 to-white'
          }`}>
            {attempt.passed ? (
              <>
                <Trophy className="w-20 h-20 text-accent mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-neutral-dark mb-2">
                  Congratulations! 🎉
                </h1>
                <p className="text-xl text-neutral-medium">You passed the quiz!</p>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 text-alert mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-neutral-dark mb-2">
                  Keep Trying!
                </h1>
                <p className="text-xl text-neutral-medium">You didn't pass this time</p>
              </>
            )}
          </div>

          {/* Score Details */}
          <div className="p-8">
            <div className="bg-neutral-light/20 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-primary mb-2">
                  {attempt.score.toFixed(1)}%
                </p>
                <p className="text-neutral-medium">
                  Passing Score: {attempt.quizzes?.passing_score || 70}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-neutral-dark">
                    {Math.floor(attempt.time_spent / 60)}:{(attempt.time_spent % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-sm text-neutral-medium">Time Taken</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-dark">
                    Attempt #{attempt.attempt_number}
                  </p>
                  <p className="text-sm text-neutral-medium">Attempt Number</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link 
                href="/student/quiz"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Quizzes
              </Link>
              
              {!attempt.passed && attempt.attempt_number < (attempt.quizzes?.max_attempts || 3) && (
                <button
                  onClick={() => router.push('/student/quiz')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-secondary-light text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
              )}
            </div>

            {attempt.passed && attempt.quizzes?.ce_validation && (
              <div className="mt-6 p-4 bg-accent/10 rounded-lg text-center">
                <p className="text-sm font-medium text-neutral-dark">
                  🏆 Your CE certificate has been generated and will be available in your dashboard!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
