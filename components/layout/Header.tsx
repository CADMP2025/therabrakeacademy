'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Menu, X, User, BookOpen, Award, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check user session
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkUser()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Don't show header on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password'
  if (isAuthPage) return null

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo/logo.png"
                alt="TheraBrake Academy"
                width={180}
                height={60}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/courses" 
              className={`text-neutral-dark hover:text-primary transition-colors ${
                pathname === '/courses' ? 'text-primary font-semibold' : ''
              }`}
            >
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Courses
              </span>
            </Link>
            
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-neutral-dark hover:text-primary transition-colors ${
                    pathname === '/dashboard' ? 'text-primary font-semibold' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/certificates" 
                  className={`text-neutral-dark hover:text-primary transition-colors ${
                    pathname === '/certificates' ? 'text-primary font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Certificates
                  </span>
                </Link>
              </>
            )}
            
            <Link 
              href="/about" 
              className={`text-neutral-dark hover:text-primary transition-colors ${
                pathname === '/about' ? 'text-primary font-semibold' : ''
              }`}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className={`text-neutral-dark hover:text-primary transition-colors ${
                pathname === '/contact' ? 'text-primary font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-neutral-dark hover:text-primary">
                  <User className="w-5 h-5" />
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="sm">
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-dark hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link 
                href="/courses" 
                className="block text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Courses
                </span>
              </Link>
              
              {user && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block text-neutral-dark hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/certificates" 
                    className="block text-neutral-dark hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      My Certificates
                    </span>
                  </Link>
                </>
              )}
              
              <Link 
                href="/about" 
                className="block text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className="block text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-full rounded"></div>
                ) : user ? (
                  <div className="space-y-2">
                    <Link 
                      href="/profile" 
                      className="block text-neutral-dark hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left text-neutral-dark hover:text-primary"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/login" 
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link 
                      href="/register" 
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
