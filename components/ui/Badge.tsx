import React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'solid'
  className?: string
  removable?: boolean
  onRemove?: () => void
}

export function Badge({ 
  children, 
  variant = 'default', 
  className,
  removable,
  onRemove
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    solid: 'bg-primary text-white'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-75"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}

export function CEBadge({ hours }: { hours: number }) {
  return (
    <Badge variant="primary" className="font-semibold">
      {hours} CE Hours
    </Badge>
  )
}

export function StatusBadge({ status }: { status: 'active' | 'completed' | 'pending' }) {
  const variants = {
    active: 'success',
    completed: 'primary',
    pending: 'warning'
  } as const

  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
