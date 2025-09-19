'use client'

import React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        success: 'bg-secondary/10 text-secondary',
        warning: 'bg-accent/10 text-accent',
        danger: 'bg-alert/10 text-alert',
        info: 'bg-primary/10 text-primary',
        outline: 'border border-neutral-light text-neutral-dark',
        solid: 'bg-primary text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean
  onRemove?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size,
    removable,
    onRemove,
    leftIcon,
    rightIcon,
    children,
    ...props 
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
        {removable && (
          <button
            onClick={onRemove}
            className="ml-1 hover:opacity-70 transition-opacity"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

// CE Hours Badge
interface CEBadgeProps {
  hours: number
  className?: string
}

const CEBadge: React.FC<CEBadgeProps> = ({ hours, className }) => {
  return (
    <Badge variant="solid" className={cn('bg-secondary', className)}>
      {hours} CE Hours
    </Badge>
  )
}

// Status Badge
interface StatusBadgeProps {
  status: 'active' | 'completed' | 'pending' | 'cancelled'
  className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    completed: { variant: 'primary' as const, label: 'Completed' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    cancelled: { variant: 'danger' as const, label: 'Cancelled' },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}

export { Badge, badgeVariants, CEBadge, StatusBadge }
