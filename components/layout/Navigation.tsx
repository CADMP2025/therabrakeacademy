'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-[#3B82F6] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {/* Logo with gradient using brand colors */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#FACC15] to-[#FBBF24] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-[#1F2937] text-2xl">🧠</span>
              </div>
              {/* Brand Name */}
              <span className="text-xl font-bold text-white">
                TheraBrake Academy<span className="text-sm align-super">™</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="/" 
              className={`${
                isActive('/') ? 'text-[#FACC15] font-medium' : 'text-white hover:text-[#FACC15]'
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`${
                isActive('/courses') ? 'text-[#FACC15] font-medium' : 'text-white hover:text-[#FACC15]'
              } transition-colors duration-200`}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className={`${
                isActive('/about') ? 'text-[#FACC15] font-medium' : 'text-white hover:text-[#FACC15]'
              } transition-colors duration-200`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${
                isActive('/contact') ? 'text-[#FACC15] font-medium' : 'text-white hover:text-[#FACC15]'
              } transition-colors duration-200`}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="bg-[#F97316] hover:bg-[#FB923C] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#FACC15] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#60A5FA] border-t border-[#3B82F6]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-[#3B82F6] text-[#FACC15] font-medium' : 'text-white hover:bg-[#3B82F6]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/courses') ? 'bg-[#3B82F6] text-[#FACC15] font-medium' : 'text-white hover:bg-[#3B82F6]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/about') ? 'bg-[#3B82F6] text-[#FACC15] font-medium' : 'text-white hover:bg-[#3B82F6]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact') ? 'bg-[#3B82F6] text-[#FACC15] font-medium' : 'text-white hover:bg-[#3B82F6]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="block px-3 py-2 bg-[#F97316] text-white rounded-md font-medium hover:bg-[#FB923C]"
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
