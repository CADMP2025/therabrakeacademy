'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [router, supabase])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">TheraBrake Academy Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Button onClick={handleSignOut} variant="ghost">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">My Courses</h3>
                <p className="text-gray-600">0 courses enrolled</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">CE Credits</h3>
                <p className="text-gray-600">0 credits earned</p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Certificates</h3>
                <p className="text-gray-600">0 certificates</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
