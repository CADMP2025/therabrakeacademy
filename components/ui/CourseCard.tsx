import React from 'react'
import Link from 'next/link'
import { User, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from './Card'
import { Badge, CEBadge } from './Badge'
import { ProgressBar } from './ProgressBar'

export interface CourseCardProps {
  id?: string
  title: string
  description: string
  instructor: string
  price: number
  ceHours?: number
  category: string
  enrolled?: boolean
  progress?: number
}

export function CourseCard({
  id,
  title,
  description,
  instructor,
  price,
  ceHours,
  category,
  enrolled,
  progress
}: CourseCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-primary to-primary-hover"></div>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{category}</Badge>
          {ceHours && <CEBadge hours={ceHours} />}
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          {instructor}
        </div>
        
        {enrolled && progress !== undefined && (
          <ProgressBar value={progress} label="Progress" />
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary">${price}</span>
        </div>
        <Link 
          href={`/course/${id || '#'}`}
          className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
        >
          {enrolled ? 'Continue' : 'Learn More'}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div>
          <div className="w-3/4 h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  )
}
