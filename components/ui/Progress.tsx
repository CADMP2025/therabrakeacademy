'use client'

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CheckCircle } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Basic Progress Bar
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  animated?: boolean
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  animated = true,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-secondary',
    warning: 'bg-accent',
    danger: 'bg-alert',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-neutral-dark">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-neutral-dark">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-neutral-light rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            colorClasses[color],
            animated && percentage > 0 && 'animate-pulse-slow'
          )}
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

// Course Progress Component
interface CourseProgressProps {
  modules: {
    id: string
    title: string
    completed: boolean
    lessons: {
      id: string
      title: string
      completed: boolean
      duration?: number
    }[]
  }[]
  showDetails?: boolean
}

const CourseProgress: React.FC<CourseProgressProps> = ({ modules, showDetails = false }) => {
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completedLessons = modules.reduce(
    (sum, module) => sum + module.lessons.filter(lesson => lesson.completed).length,
    0
  )
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Course Progress</h3>
          <span className="text-sm text-neutral-medium">
            {completedLessons} of {totalLessons} lessons completed
          </span>
        </div>
        <ProgressBar value={percentage} color={percentage === 100 ? 'success' : 'primary'} />
      </div>

      {showDetails && (
        <div className="space-y-3">
          {modules.map((module) => {
            const moduleCompleted = module.lessons.filter(l => l.completed).length
            const moduleTotal = module.lessons.length
            const modulePercentage = moduleTotal > 0 ? (moduleCompleted / moduleTotal) * 100 : 0

            return (
              <div key={module.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {module.completed ? (
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-light" />
                    )}
                    <span className="font-medium">{module.title}</span>
                  </div>
                  <span className="text-sm text-neutral-medium">
                    {moduleCompleted}/{moduleTotal}
                  </span>
                </div>
                <ProgressBar 
                  value={modulePercentage} 
                  showPercentage={false}
                  size="sm"
                  color={modulePercentage === 100 ? 'success' : 'primary'}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Multi-Step Progress
interface StepProgressProps {
  steps: {
    id: string
    title: string
    description?: string
  }[]
  currentStep: number
  variant?: 'linear' | 'circular'
}

const StepProgress: React.FC<StepProgressProps> = ({ 
  steps, 
  currentStep,
  variant = 'linear' 
}) => {
  if (variant === 'circular') {
    return (
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                    isCompleted && 'bg-secondary text-white',
                    isCurrent && 'bg-primary text-white ring-4 ring-primary/20',
                    isUpcoming && 'bg-neutral-light text-neutral-medium'
                  )}
                >
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-10 w-full h-0.5',
                      isCompleted ? 'bg-secondary' : 'bg-neutral-light'
                    )}
                    style={{ width: 'calc(100% + 40px)' }}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-primary' : 'text-neutral-dark'
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-neutral-medium mt-1">{step.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-neutral-medium">
          {steps[currentStep]?.title}
        </span>
      </div>
      <ProgressBar 
        value={currentStep + 1} 
        max={steps.length} 
        showPercentage={false}
      />
    </div>
  )
}

export { ProgressBar, CourseProgress, StepProgress }
