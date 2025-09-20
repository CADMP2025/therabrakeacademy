'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <nav style={{ backgroundColor: '#3B82F6' }} className="shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/images/logo/logo.png"
                alt="TheraBrake Academy Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white text-xl font-bold hover:text-[#FACC15] transition-colors">
              TheraBrake Academy<sup className="text-xs">™</sup>
            </span>
          </Link>

          {/* Desktop Navigation - White text */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#FACC15]' // Yellow for active
                    : 'text-white hover:text-[#FACC15]' // White with yellow hover
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-white"
              style={{ backgroundColor: '#F97316' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FB923C'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F97316'}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button - White */}
          <button
            className="md:hidden text-white hover:text-[#FACC15]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: '#3B82F6', borderTopColor: '#60A5FA', borderTopWidth: '1px' }}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#60A5FA] text-[#FACC15]'
                    : 'text-white hover:bg-[#60A5FA] hover:text-[#FACC15]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="block w-full text-center text-white px-3 py-2 rounded-md font-medium transition-all duration-200"
              style={{ backgroundColor: '#F97316' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
