import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/contexts/AuthContext'

export function useRequireAuth(requiredRole?: UserRole) {
  const { user, role, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (requiredRole && role !== requiredRole) {
        router.push('/unauthorized')
      }
    }
  }, [user, role, loading, requiredRole, router])

  return { user, role, loading }
}
