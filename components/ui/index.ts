// Core Components
export { Button } from './button'
export { default as Navigation } from './Navigation'
export type { NavigationProps } from './Navigation'

// Cards
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from './Card'

// Course Components
export { CourseCard, CourseCardSkeleton } from './CourseCard'
export type { CourseCardProps } from './CourseCard'

// Badges
export { Badge, CEBadge, StatusBadge } from './Badge'
export type { BadgeProps } from './Badge'

// Progress
export { ProgressBar, CourseProgress, StepProgress } from './ProgressBar'
export type { ProgressBarProps } from './ProgressBar'

// Forms
export { Input, Textarea, Select, Checkbox, Radio } from './forms'
export type { InputProps, TextareaProps, SelectProps } from './forms'

// Modals
export { Modal, AlertDialog } from './Modal'
export type { ModalProps } from './Modal'

// Toast
export { ToastProvider, useToast } from './Toast'

// Loading
export { Spinner, LoadingOverlay, Skeleton } from './Spinner'
export type { SpinnerProps } from './Spinner'

// Layout Components
export { default as Header } from '@/components/layout/Header'
export { default as Footer } from '@/components/layout/Footer'
