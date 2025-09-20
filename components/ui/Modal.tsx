import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className={cn(
          'relative bg-white rounded-lg shadow-xl max-w-md w-full p-6',
          className
        )}>
          {title && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
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
}: any) {
  if (!isOpen) return null

  const variants = {
    default: 'bg-primary hover:bg-primary-hover',
    danger: 'bg-red-500 hover:bg-red-600'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description={description}>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm()
            onClose()
          }}
          className={cn(
            'px-4 py-2 text-sm font-medium text-white rounded-lg',
            variants[variant]
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}
