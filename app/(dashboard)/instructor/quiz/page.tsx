'use client'

import { useState, useEffect } from 'react'
import { QuizBuilder } from '@/components/quiz/builder/QuizBuilder'
import { QuizAnalytics } from '@/components/quiz/analytics/QuizAnalytics'
import { Plus, BarChart3, Edit, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Quiz } from '@/types/quiz'

export default function InstructorQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'analytics'>('list')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('quizzes')
        .select('*, courses!inner(*)')
        .eq('courses.instructor_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuizzes(data || [])
    } catch (error) {
      console.error('Error fetching quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quizId)

      if (error) throw error
      
      setQuizzes(prev => prev.filter(q => q.id !== quizId))
    } catch (error) {
      console.error('Error deleting quiz:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 p-6">
      {/* Header with TheraBrake branding */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Quiz Management</h1>
          <p className="text-white/90">
            Create and manage assessments for your TheraBrake Academy courses
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {view === 'list' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-dark">Your Quizzes</h2>
              <button
                onClick={() => setView('create')}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-light text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Quiz
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : quizzes.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-neutral-medium mb-4">No quizzes created yet</p>
                <button
                  onClick={() => setView('create')}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg"
                >
                  Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                    <h3 className="font-bold text-lg text-neutral-dark mb-2">{quiz.title}</h3>
                    <p className="text-sm text-neutral-medium mb-4">{quiz.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-medium mb-4">
                      <span>📝 {quiz.questions?.length || 0} questions</span>
                      <span>✅ Pass: {quiz.passingScore}%</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedQuiz(quiz)
                          setView('edit')
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuiz(quiz)
                          setView('analytics')
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                      <button
                        onClick={() => deleteQuiz(quiz.id)}
                        className="px-3 py-2 bg-alert/10 text-alert rounded-lg hover:bg-alert/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'create' && (
          <>
            <button
              onClick={() => setView('list')}
              className="mb-6 text-primary hover:text-primary-hover font-medium"
            >
              ← Back to Quizzes
            </button>
            <QuizBuilder 
              courseId=""
              onSave={(quiz) => {
                setQuizzes(prev => [quiz, ...prev])
                setView('list')
              }}
            />
          </>
        )}

        {view === 'edit' && selectedQuiz && (
          <>
            <button
              onClick={() => setView('list')}
              className="mb-6 text-primary hover:text-primary-hover font-medium"
            >
              ← Back to Quizzes
            </button>
            <QuizBuilder 
              courseId={selectedQuiz.courseId}
              initialQuiz={selectedQuiz}
              onSave={(quiz) => {
                setQuizzes(prev => prev.map(q => q.id === quiz.id ? quiz : q))
                setView('list')
              }}
            />
          </>
        )}

        {view === 'analytics' && selectedQuiz && (
          <>
            <button
              onClick={() => setView('list')}
              className="mb-6 text-primary hover:text-primary-hover font-medium"
            >
              ← Back to Quizzes
            </button>
            <QuizAnalytics 
              quizId={selectedQuiz.id}
              courseId={selectedQuiz.courseId}
            />
          </>
        )}
      </div>
    </div>
  )
}
