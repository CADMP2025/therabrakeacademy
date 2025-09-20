import { useAuth } from '@/contexts/AuthContext'

export function useRole() {
  const { role, profile } = useAuth()
  
  const isStudent = role === 'student'
  const isInstructor = role === 'instructor'
  const isAdmin = role === 'admin'
  const isAuthenticated = !!profile
  
  return {
    role,
    isStudent,
    isInstructor,
    isAdmin,
    isAuthenticated,
    canCreateCourses: isInstructor || isAdmin,
    canManageUsers: isAdmin,
    canEnrollInCourses: isStudent || isAdmin,
  }
}
