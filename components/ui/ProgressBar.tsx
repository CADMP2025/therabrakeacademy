'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'primary',
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', variants[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

interface Module {
  id: string
  title: string
  completed?: boolean
  lessons: {
    id: string
    title: string
    completed: boolean
  }[]
}

export interface CourseProgressProps {
  modules: Module[]
  showDetails?: boolean
}

export function CourseProgress({ modules, showDetails = false }: CourseProgressProps) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.completed).length, 
    0
  )
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="space-y-4">
      <ProgressBar value={percentage} label="Overall Progress" />
      {showDetails && (
        <div className="space-y-2">
          {modules.map((module) => {
            const moduleCompleted = module.lessons.filter(l => l.completed).length
            const moduleTotal = module.lessons.length
            return (
              <div key={module.id} className="text-sm">
                <span className="font-medium">{module.title}</span>
                <span className="text-gray-500 ml-2">
                  {moduleCompleted}/{moduleTotal} lessons
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface Step {
  id: string
  title: string
  description?: string
}

export interface StepProgressProps {
  steps: Step[]
  currentStep: number
  variant?: 'linear' | 'circular'
}

export function StepProgress({ steps, currentStep, variant = 'linear' }: StepProgressProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
              index < currentStep
                ? 'bg-primary text-white'
                : index === currentStep
                ? 'bg-primary/20 text-primary border-2 border-primary'
                : 'bg-gray-200 text-gray-500'
            )}
          >
            {index < currentStep ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{step.title}</p>
            {step.description && (
              <p className="text-xs text-gray-500">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
