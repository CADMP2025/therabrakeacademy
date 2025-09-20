'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { BookOpen, Users, DollarSign, TrendingUp } from 'lucide-react'

export default function InstructorDashboard() {
  const { profile } = useAuth()

  return (
    <ProtectedRoute requiredRole="instructor">
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <p className="mt-2">Welcome back, {profile?.full_name}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Active Courses</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Total Students</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Revenue</p>
                  <p className="text-2xl font-bold">$0</p>
                </div>
                <DollarSign className="w-8 h-8 text-action" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-medium">Avg Rating</p>
                  <p className="text-2xl font-bold">-</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Create Your First Course</h2>
            <p className="text-neutral-medium mb-6">
              Use our innovative Cut & Paste Course Builder to create professional courses in minutes
            </p>
            <a href="/instructor/courses/create" className="btn-primary">
              Create Course
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
