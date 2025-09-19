'use client'

import React, { forwardRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AlertCircle, Check } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, helperText, leftIcon, rightIcon, ...props }, ref) => {
    const inputId = props.id || props.name

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-dark mb-1">
            {label}
            {props.required && <span className="text-alert ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2 border rounded-lg transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-alert focus:ring-alert',
              success && 'border-secondary focus:ring-secondary',
              !error && !success && 'border-neutral-light focus:ring-primary focus:border-transparent',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-medium">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-alert' : 'text-neutral-medium'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, resize = true, ...props }, ref) => {
    const textareaId = props.id || props.name

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-dark mb-1">
            {label}
            {props.required && <span className="text-alert ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error ? 'border-alert focus:ring-alert' : 'border-neutral-light focus:ring-primary focus:border-transparent',
            !resize && 'resize-none',
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-alert' : 'text-neutral-medium'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, placeholder = 'Select an option', options, ...props }, ref) => {
    const selectId = props.id || props.name

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-neutral-dark mb-1">
            {label}
            {props.required && <span className="text-alert ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-all duration-200 appearance-none bg-white',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error ? 'border-alert focus:ring-alert' : 'border-neutral-light focus:ring-primary focus:border-transparent',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-alert' : 'text-neutral-medium'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

// Checkbox Component
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const checkboxId = props.id || props.name

    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-4 w-4 rounded border-neutral-light text-primary',
            'focus:ring-2 focus:ring-primary focus:ring-offset-0',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className="ml-2 text-sm text-neutral-dark cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

// Radio Component
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    const radioId = props.id || `${props.name}-${props.value}`

    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(
            'h-4 w-4 border-neutral-light text-primary',
            'focus:ring-2 focus:ring-primary focus:ring-offset-0',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={radioId} className="ml-2 text-sm text-neutral-dark cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)
Radio.displayName = 'Radio'

// Form Field Wrapper
interface FormFieldProps {
  children: React.ReactNode
  error?: string
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({ children, error }) => {
  return (
    <div className="space-y-1">
      {children}
      {error && (
        <div className="flex items-center gap-1 text-alert text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export { Input, Textarea, Select, Checkbox, Radio, FormField }
