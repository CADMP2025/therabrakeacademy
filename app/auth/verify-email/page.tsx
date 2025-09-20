import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-dark mb-2">Verify Your Email</h1>
        <p className="text-neutral-medium mb-6">
          We've sent a verification link to your email address. 
          Please check your inbox and click the link to activate your account.
        </p>
        <p className="text-sm text-neutral-medium mb-4">
          Didn't receive the email? Check your spam folder or
        </p>
        <button className="text-primary hover:underline font-medium">
          Resend verification email
        </button>
        <div className="mt-6">
          <Link href="/login" className="text-sm text-neutral-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
