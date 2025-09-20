'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Trophy, Users, Clock, TrendingUp, AlertCircle, Download } from 'lucide-react'
import { QuizAnalytics as QuizAnalyticsType, QuestionAnalytics } from '@/types/quiz'
import { createClient } from '@/lib/supabase/client'

interface QuizAnalyticsProps {
  quizId: string
  courseId: string
}

export function QuizAnalytics({ quizId, courseId }: QuizAnalyticsProps) {
  const [analytics, setAnalytics] = useState<QuizAnalyticsType | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // TheraBrake color palette
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#FACC15',
    action: '#F97316',
    alert: '#EF4444'
  }

  useEffect(() => {
    fetchAnalytics()
  }, [quizId])

  const fetchAnalytics = async () => {
    try {
      const { data: attempts, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('quiz_id', quizId)

      if (error) throw error

      // Calculate analytics
      if (attempts && attempts.length > 0) {
        const totalAttempts = attempts.length
        const scores = attempts.map(a => a.score)
        const averageScore = scores.reduce((a, b) => a + b, 0) / totalAttempts
        const passedCount = attempts.filter(a => a.passed).length
        const passRate = (passedCount / totalAttempts) * 100
        const times = attempts.map(a => a.time_spent).filter(t => t)
        const averageTime = times.length > 0 
          ? times.reduce((a, b) => a + b, 0) / times.length 
          : 0

        setAnalytics({
          quizId,
          totalAttempts,
          averageScore,
          passRate,
          averageTime,
          questionAnalytics: [] // Would need to calculate per-question stats
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    // Implementation for CSV export
    console.log('Exporting to CSV...')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12 bg-neutral-light/20 rounded-lg">
        <AlertCircle className="w-12 h-12 text-neutral-medium mx-auto mb-4" />
        <p className="text-neutral-medium">No analytics data available yet</p>
      </div>
    )
  }

  // Prepare chart data
  const passRateData = [
    { name: 'Passed', value: analytics.passRate, color: colors.secondary },
    { name: 'Failed', value: 100 - analytics.passRate, color: colors.alert }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-dark">Quiz Analytics</h2>
          <p className="text-sm text-neutral-medium mt-1">
            Performance insights for your assessment
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-medium">Total Attempts</p>
              <p className="text-2xl font-bold text-neutral-dark mt-1">
                {analytics.totalAttempts}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-medium">Average Score</p>
              <p className="text-2xl font-bold text-neutral-dark mt-1">
                {analytics.averageScore.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-secondary" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-medium">Pass Rate</p>
              <p className="text-2xl font-bold text-neutral-dark mt-1">
                {analytics.passRate.toFixed(1)}%
              </p>
            </div>
            <Trophy className="w-8 h-8 text-accent" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-action">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-medium">Avg. Time</p>
              <p className="text-2xl font-bold text-neutral-dark mt-1">
                {Math.floor(analytics.averageTime / 60)}m
              </p>
            </div>
            <Clock className="w-8 h-8 text-action" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pass Rate Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-neutral-dark mb-4">Pass/Fail Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={passRateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {passRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-neutral-dark mb-4">Score Distribution</h3>
          <div className="text-center py-12 text-neutral-medium">
            Score distribution chart would go here
          </div>
        </div>
      </div>

      {/* Problem Areas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-neutral-dark mb-4">Problem Areas</h3>
        <p className="text-neutral-medium mb-4">
          Questions with the lowest success rates
        </p>
        <div className="space-y-3">
          {/* This would show actual problem questions */}
          <div className="flex items-center justify-between p-3 bg-alert/5 rounded-lg">
            <span className="text-sm text-neutral-dark">Question 3: Ethics scenario</span>
            <span className="text-sm font-medium text-alert">45% correct</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
            <span className="text-sm text-neutral-dark">Question 7: Texas regulations</span>
            <span className="text-sm font-medium text-accent-hover">62% correct</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizAnalytics
