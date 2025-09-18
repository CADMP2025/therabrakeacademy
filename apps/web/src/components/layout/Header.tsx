import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <nav className="bg-[#3B82F6] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/assets/images/logo.svg" 
              alt="TheraBrake Academy" 
              width={50} 
              height={50}
              className="h-12 w-auto"
              priority
            />
            <span className="text-2xl font-bold">TheraBrake Academy™</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="hover:text-[#FACC15] transition font-medium">
              Home
            </Link>
            <Link href="/courses" className="hover:text-[#FACC15] transition font-medium">
              Courses
            </Link>
            <Link href="/about" className="hover:text-[#FACC15] transition font-medium">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#FACC15] transition font-medium">
              Contact
            </Link>
            <Link 
              href="/login" 
              className="bg-[#FACC15] text-[#1F2937] px-4 py-2 rounded-lg hover:bg-[#FDE047] transition font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
