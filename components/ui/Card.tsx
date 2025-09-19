'use client'

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  noPadding?: boolean
  gradient?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, noPadding = false, gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-xl shadow-md border border-neutral-light',
          hover && 'hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer',
          !noPadding && 'p-6',
          gradient && 'bg-gradient-to-br from-white to-primary/5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-medium', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

// Course Card Component
interface CourseCardProps {
  title: string
  description: string
  instructor?: string
  price?: number
  ceHours?: number
  thumbnail?: string
  category?: string
  enrolled?: boolean
  progress?: number
  onClick?: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  instructor,
  price,
  ceHours,
  thumbnail,
  category,
  enrolled,
  progress = 0,
  onClick,
}) => {
  return (
    <Card hover onClick={onClick} className="overflow-hidden">
      {thumbnail && (
        <div className="relative h-48 -m-6 mb-4">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          {category && (
            <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          )}
          {ceHours && (
            <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
              {ceHours} CE Hours
            </span>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        {instructor && <p className="text-sm text-neutral-medium">by {instructor}</p>}
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
        
        {enrolled && progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-neutral-light rounded-full h-2">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      
      {!enrolled && (
        <CardFooter className="justify-between border-t pt-4 mt-4">
          <span className="text-2xl font-bold text-primary">
            {price ? `$${price}` : 'Free'}
          </span>
          <button className="text-primary font-medium hover:underline">
            Learn More →
          </button>
        </CardFooter>
      )}
    </Card>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CourseCard }
