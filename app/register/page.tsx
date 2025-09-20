'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button, Input, Select } from '@/components/ui'
import { SocialAuth } from '@/components/auth/SocialAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, AlertCircle, BadgeCheck } from 'lucide-react'
import { UserRole } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [accountType, setAccountType] = useState<UserRole>('student')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signUp } = useAuth()
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, fullName, accountType)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-dark">Join TheraBrake Academy</h1>
          <p className="text-neutral-medium mt-2">Start your learning journey today</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <Select
            label="Account Type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as UserRole)}
            required
          >
            <option value="student">Student - Learn and earn CE credits</option>
            <option value="instructor">Instructor - Create and sell courses</option>
          </Select>

          <Input
            type="text"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. Jane Smith"
            required
            leftIcon={<User className="w-5 h-5" />}
          />

          <Input
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
            leftIcon={<Mail className="w-5 h-5" />}
          />

          {accountType === 'student' && (
            <Input
              type="text"
              label="License Number (Optional)"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="LPC-12345"
              helperText="For Texas LPC professionals seeking CE credits"
              leftIcon={<BadgeCheck className="w-5 h-5" />}
            />
          )}
          
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            required
            leftIcon={<Lock className="w-5 h-5" />}
          />

          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            required
            leftIcon={<Lock className="w-5 h-5" />}
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="rounded border-gray-300 mt-1"
            />
            <label className="ml-2 text-sm text-neutral-medium">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={loading}>
            Create Account
          </Button>
        </form>

        <SocialAuth />

        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
