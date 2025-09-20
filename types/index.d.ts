// Type declarations for TheraBrake Academy LMS

export interface User {
  id: string
  email: string
  full_name?: string
  role?: 'student' | 'instructor' | 'admin'
  created_at?: string
  updated_at?: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor_id: string
  price: number
  ce_hours?: number
  category: string
  status: 'draft' | 'published' | 'archived'
  created_at?: string
  updated_at?: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  enrolled_at: string
  completed_at?: string
  progress?: number
}

export interface Module {
  id: string
  course_id: string
  title: string
  description?: string
  position: number
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  description?: string
  content?: string
  video_url?: string
  position: number
  completed?: boolean
}

export interface Quiz {
  id: string
  course_id: string
  module_id?: string
  title: string
  description?: string
  questions: QuizQuestion[]
  passing_score: number
  max_attempts: number
}

export interface QuizQuestion {
  id: string
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'multiple_select'
  answers: QuizAnswer[]
  points: number
}

export interface QuizAnswer {
  id: string
  answer_text: string
  is_correct: boolean
  feedback?: string
}

export interface Certificate {
  id: string
  user_id: string
  course_id: string
  certificate_number: string
  issued_at: string
  ce_hours?: number
  pdf_url?: string
}
