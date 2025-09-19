'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings,
  BookOpen,
  Award,
  Bell,
  Search
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface NavigationProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role: 'student' | 'instructor' | 'admin'
  }
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const userMenuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses' },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
      scrolled ? 'shadow-lg' : 'shadow-md'
    )}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold gradient-text hidden sm:inline">
              TheraBrake Academy™
            </span>
            <span className="text-2xl font-bold gradient-text sm:hidden">
              TheraBrake™
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-neutral-dark hover:text-primary transition-colors font-medium',
                  pathname === link.href && 'text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Search */}
            <button className="text-neutral-medium hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            {user && (
              <button className="text-neutral-medium hover:text-primary transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-alert rounded-full" />
              </button>
            )}

            {/* User Menu or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-neutral-dark hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                    ) : (
                      <span className="text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="font-medium hidden lg:inline">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-light py-2">
                    <div className="px-4 py-2 border-b border-neutral-light">
                      <p className="font-medium text-neutral-dark">{user.name}</p>
                      <p className="text-sm text-neutral-medium">{user.email}</p>
                      <span className={cn(
                        'inline-block mt-1 px-2 py-1 text-xs rounded-full',
                        user.role === 'admin' && 'bg-primary/10 text-primary',
                        user.role === 'instructor' && 'bg-secondary/10 text-secondary',
                        user.role === 'student' && 'bg-accent/10 text-accent'
                      )}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-light transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-neutral-medium" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-neutral-light mt-2 pt-2">
                      <button className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-light transition-colors w-full text-left text-alert">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-dark"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-slide-down">
            <div className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 hover:bg-neutral-light transition-colors',
                    pathname === link.href && 'bg-primary/10 text-primary font-medium'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="border-t border-neutral-light mt-4 pt-4">
                    <div className="px-4 py-2">
                      <p className="font-medium text-neutral-dark">{user.name}</p>
                      <p className="text-sm text-neutral-medium">{user.email}</p>
                    </div>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-neutral-light transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-neutral-medium" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button className="flex items-center space-x-2 px-4 py-3 hover:bg-neutral-light transition-colors w-full text-left text-alert">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-4">
                  <Link href="/login" className="btn-primary w-full text-center">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
