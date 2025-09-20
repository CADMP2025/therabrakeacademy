'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        />
        <div className={cn(
          'relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all',
          className
        )}>
          {title && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
}

export function AlertDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default'
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  // Build modal props conditionally to handle optional description
  const modalProps: ModalProps = {
    isOpen,
    onClose,
    title,
    children: (
      <div className="flex justify-end gap-2 mt-6">
        <Button
          onClick={onClose}
          variant="ghost"
          type="button"
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant={variant === 'danger' ? 'danger' : 'primary'}
          type="button"
        >
          {confirmText}
        </Button>
      </div>
    )
  }
  
  // Only add description if it exists
  if (description) {
    modalProps.description = description
  }

  return <Modal {...modalProps} />
}
