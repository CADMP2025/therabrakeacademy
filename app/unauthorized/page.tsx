import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-dark mb-2">Access Denied</h1>
        <p className="text-neutral-medium mb-8">
          You don't have permission to access this page.
        </p>
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
