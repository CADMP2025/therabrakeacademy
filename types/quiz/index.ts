export type QuestionType = 'multiple_choice' | 'true_false' | 'multiple_select'

export interface QuizQuestion {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
  position: number
  required?: boolean
}

export interface Quiz {
  id: string
  courseId: string
  moduleId?: string
  title: string
  description?: string
  questions: QuizQuestion[]
  passingScore: number
  maxAttempts: number
  timeLimit?: number // in minutes
  showFeedback: boolean
  randomizeQuestions?: boolean
  randomizeAnswers?: boolean
  ceValidation?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  answers: Record<string, string | string[]>
  score: number
  passed: boolean
  startedAt: Date
  completedAt?: Date
  timeSpent?: number // in seconds
  attemptNumber: number
}

export interface QuizAnalytics {
  quizId: string
  totalAttempts: number
  averageScore: number
  passRate: number
  averageTime: number
  questionAnalytics: QuestionAnalytics[]
}

export interface QuestionAnalytics {
  questionId: string
  correctRate: number
  averageTime: number
  commonWrongAnswers: string[]
}
