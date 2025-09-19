'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'primary' | 'secondary' | 'white'
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className,
  color = 'primary' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
  }

  return (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )} 
    />
  )
}

// Loading Overlay
interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  blur?: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = 'Loading...',
  blur = true 
}) => {
  if (!isLoading) return null

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
      blur && 'backdrop-blur-sm'
    )}>
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 shadow-xl">
        <Spinner size="lg" />
        <p className="text-neutral-dark font-medium">{message}</p>
      </div>
    </div>
  )
}

// Skeleton Component
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave' | 'none'
  width?: string | number
  height?: string | number
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height,
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }

  return (
    <div
      className={cn(
        'bg-neutral-light',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width,
        height: height || (variant === 'text' ? '1em' : undefined),
      }}
    />
  )
}

// Course Card Skeleton
const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-light overflow-hidden">
      <Skeleton height={192} />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton height={28} />
          <Skeleton height={20} width="60%" />
        </div>
        <div className="space-y-2">
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} width="80%" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <Skeleton height={32} width={80} />
          <Skeleton height={24} width={100} />
        </div>
      </div>
    </div>
  )
}

// Table Skeleton
interface TableSkeletonProps {
  rows?: number
  columns?: number
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-light p-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} height={20} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="p-4 border-t grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={16} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Page Loading State
interface PageLoadingProps {
  message?: string
}

const PageLoading: React.FC<PageLoadingProps> = ({ message = 'Loading page...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner size="xl" />
        <p className="text-neutral-medium">{message}</p>
      </div>
    </div>
  )
}

export { 
  Spinner, 
  LoadingOverlay, 
  Skeleton, 
  CourseCardSkeleton, 
  TableSkeleton,
  PageLoading 
}
