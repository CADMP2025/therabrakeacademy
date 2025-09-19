'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 }
    
    setToasts((prev) => [...prev, newToast])
    
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full sm:max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-secondary text-white',
    error: 'bg-alert text-white',
    warning: 'bg-accent text-neutral-dark',
    info: 'bg-primary text-white',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg shadow-lg animate-slide-up transition-all duration-300',
        colors[toast.type]
      )}
    >
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="font-semibold">{toast.title}</h4>
        {toast.message && <p className="text-sm mt-1 opacity-90">{toast.message}</p>}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Standalone toast function for non-component usage
export const toast = {
  success: (title: string, message?: string) => {
    // This would need to be connected to a global toast system
    console.log('Success:', title, message)
  },
  error: (title: string, message?: string) => {
    console.log('Error:', title, message)
  },
  warning: (title: string, message?: string) => {
    console.log('Warning:', title, message)
  },
  info: (title: string, message?: string) => {
    console.log('Info:', title, message)
  },
}

export { ToastItem }
