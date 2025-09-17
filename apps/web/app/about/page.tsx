import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation with Logo - Matching Homepage */}
      <nav className="bg-[#3B82F6] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section with Text */}
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/assets/images/logo.svg" 
                alt="TheraBrake Academy" 
                width={60} 
                height={60}
                className="h-14 w-14"
                priority
              />
              <span className="text-2xl font-bold">
                Therabrake Academy™
              </span>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link 
                href="/" 
                className="hover:text-[#FACC15] transition font-medium"
              >
                Home
              </Link>
              <Link 
                href="/courses" 
                className="hover:text-[#FACC15] transition font-medium"
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="hover:text-[#FACC15] transition font-medium border-b-2 border-[#FACC15] pb-1"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-[#FACC15] transition font-medium"
              >
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

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#3B82F6] to-[#60A5FA] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            About TheraBrake Academy™
          </h1>
          <p className="text-xl text-[#FACC15] font-semibold">
            Where Education Meets Empowerment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Our Mission</h2>
          <p className="text-lg text-[#1F2937] leading-relaxed mb-4">
            At <strong>TheraBrake Academy™</strong>, we believe in the power of pausing to process life's challenges 
            and progressing toward meaningful transformation. Our mission is to provide comprehensive, accessible 
            education that serves both mental health professionals seeking continuing education and individuals 
            on their personal growth journey.
          </p>
          <p className="text-lg text-[#1F2937] leading-relaxed">
            We bridge the gap between professional development and personal healing, offering courses that don't 
            just teach—they transform.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#10B981]">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Our Story</h3>
            <p className="text-[#1F2937] mb-4">
              Founded by mental health professionals who understood the need for practical, applicable education, 
              TheraBrake Academy™ emerged from a simple observation: traditional continuing education often 
              lacks real-world application.
            </p>
            <p className="text-[#1F2937]">
              We created a platform where learning translates directly into practice, where CEUs mean more than 
              compliance, and where personal growth courses are grounded in therapeutic expertise.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#F97316]">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Our Approach</h3>
            <p className="text-[#1F2937] mb-4">
              Every course at TheraBrake Academy™ follows our core philosophy: <strong>Pause, Process, Progress.</strong>
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#10B981] mr-3 text-xl">•</span>
                <div>
                  <strong className="text-[#1F2937]">Pause:</strong>
                  <span className="text-[#1F2937]"> Take time to reflect and assess where you are</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#10B981] mr-3 text-xl">•</span>
                <div>
                  <strong className="text-[#1F2937]">Process:</strong>
                  <span className="text-[#1F2937]"> Understand and integrate new knowledge and insights</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#10B981] mr-3 text-xl">•</span>
                <div>
                  <strong className="text-[#1F2937]">Progress:</strong>
                  <span className="text-[#1F2937]"> Move forward with confidence and practical tools</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-[#F3F4F6] rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#3B82F6] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h4 className="font-bold text-[#1F2937] mb-2">Excellence in Education</h4>
              <p className="text-sm text-[#9CA3AF]">
                Accredited, evidence-based courses that exceed industry standards
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#10B981] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h4 className="font-bold text-[#1F2937] mb-2">Practical Application</h4>
              <p className="text-sm text-[#9CA3AF]">
                Real-world tools and strategies you can implement immediately
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F97316] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h4 className="font-bold text-[#1F2937] mb-2">Compassionate Support</h4>
              <p className="text-sm text-[#9CA3AF]">
                A learning community that supports your journey every step of the way
              </p>
            </div>
          </div>
        </div>

        {/* Accreditation */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Accreditation & Recognition</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="bg-[#F3F4F6] rounded-lg p-4">
              <p className="text-[#1F2937] font-semibold">Texas LPC Approved</p>
              <p className="text-sm text-[#9CA3AF]">State Board Certified</p>
            </div>
            <div className="bg-[#F3F4F6] rounded-lg p-4">
              <p className="text-[#1F2937] font-semibold">NBCC Provider #87569</p>
              <p className="text-sm text-[#9CA3AF]">National Certification</p>
            </div>
            <div className="bg-[#F3F4F6] rounded-lg p-4">
              <p className="text-[#1F2937] font-semibold">26 CE Hours Available</p>
              <p className="text-sm text-[#9CA3AF]">Professional Development</p>
            </div>
          </div>
          <p className="text-[#1F2937]">
            Our commitment to quality education has earned us recognition as a trusted provider 
            for continuing education and personal development programs.
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center py-8 text-[#9CA3AF] bg-[#F3F4F6]">
        <p>6120 College St. Suite D185, Beaumont, TX 77707</p>
        <p>(346) 298-2988 | info@therabrake.academy</p>
      </div>
    </main>
  )
}