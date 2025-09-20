'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react'

export default function StudentDashboard() {
  const { profile } = useAuth()

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name}!</h1>
            <p className="mt-2">Continue your learning journey</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Enrolled Courses</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">CE Credits Earned</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Award className="w-8 h-8 text-secondary" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Study Time</p>
                  <p className="text-2xl font-bold">0h</p>
                </div>
                <Clock className="w-8 h-8 text-action" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Progress</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          {/* Course sections will be added in later phases */}
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Ready to start learning?</h2>
            <p className="text-neutral-medium mb-6">
              Browse our course catalog to find the perfect course for you
            </p>
            <a href="/courses" className="btn-primary">
              Browse Courses
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
