'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { BookOpen, Award, Clock, TrendingUp, Calendar } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    }
    getUser()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = [
    { icon: <BookOpen />, label: 'Enrolled Courses', value: '0', color: 'bg-primary' },
    { icon: <Award />, label: 'CE Credits Earned', value: '0', color: 'bg-secondary' },
    { icon: <Clock />, label: 'Hours Completed', value: '0', color: 'bg-accent' },
    { icon: <TrendingUp />, label: 'Average Score', value: 'N/A', color: 'bg-action' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'Student'}!
            </h1>
            <p className="text-neutral-medium">
              Continue your learning journey with TheraBrake Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className={`inline-flex p-3 rounded-lg ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-neutral-dark">{stat.value}</div>
                <div className="text-sm text-neutral-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-neutral-dark">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <p className="text-neutral-medium text-center py-8">
                    No recent activity. Start by enrolling in a course!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-neutral-dark flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Deadlines
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-neutral-medium text-center py-8">
                    No upcoming deadlines
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow mt-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-neutral-dark">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <button
                    onClick={() => router.push('/courses')}
                    className="w-full text-left px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary font-medium transition-colors"
                  >
                    Browse Courses →
                  </button>
                  <button
                    onClick={() => router.push('/profile')}
                    className="w-full text-left px-4 py-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-secondary font-medium transition-colors"
                  >
                    Complete Profile →
                  </button>
                  <button
                    onClick={() => router.push('/certificates')}
                    className="w-full text-left px-4 py-3 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent-hover font-medium transition-colors"
                  >
                    View Certificates →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
