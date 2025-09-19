import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md p-6 ${hover ? 'hover:shadow-xl transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '' }) => (
  <div className={`pb-4 ${className}`}>{children}</div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)
