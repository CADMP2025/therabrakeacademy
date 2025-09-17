import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-[#3B82F6] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/assets/images/logo.svg" 
                alt="TheraBrake Academy" 
                width={180} 
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>
            
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
              <Link href="/contact" className="hover:text-[#FACC15] transition font-medium text-[#FACC15]">
                Contact
              </Link>
              <Link href="/login" className="bg-[#FACC15] text-[#1F2937] px-4 py-2 rounded-lg hover:bg-[#FDE047] transition font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#3B82F6] to-[#60A5FA] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Let's Connect & Move Forward Together ✨</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-[#1F2937] leading-relaxed mb-6">
            At <strong>TheraBrake Academy™</strong>, every question, every story, and every step forward matters. 
            Whether you're a professional seeking guidance on CEU courses, an individual starting your journey of healing, 
            or simply curious about how we can support your growth—<strong>we're here to listen and respond with care</strong>.
          </p>
          <p className="text-lg text-[#1F2937] leading-relaxed">
            📩 Reach out to us anytime. Your message isn't just an inquiry—it's the beginning of progress.
          </p>
          <p className="text-lg text-[#1F2937] font-semibold mt-4">
            Together, let's turn challenges into opportunities and take the next step toward your goals.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-[#3B82F6] text-white p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">Phone</h3>
                  <p className="text-[#9CA3AF]">(346) 298-2988</p>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex items-start">
                <div className="bg-[#10B981] text-white p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-2">Email</h3>
                  <div className="space-y-1">
                    <p className="text-[#9CA3AF]">
                      General Inquiries: <a href="mailto:info@therabrake.academy" className="text-[#3B82F6] hover:underline">info@therabrake.academy</a>
                    </p>
                    <p className="text-[#9CA3AF]">
                      Course Support: <a href="mailto:courses@therabrake.academy" className="text-[#3B82F6] hover:underline">courses@therabrake.academy</a>
                    </p>
                    <p className="text-[#9CA3AF]">
                      Administration: <a href="mailto:admin@therabrake.academy" className="text-[#3B82F6] hover:underline">admin@therabrake.academy</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="bg-[#F97316] text-white p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">Office Address</h3>
                  <p className="text-[#9CA3AF]">
                    6120 College St. Suite D185<br />
                    Beaumont, TX 77707
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Send Us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1F2937] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1F2937] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#1F2937] mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  <option>General Inquiry</option>
                  <option>CEU Course Information</option>
                  <option>Personal Development Courses</option>
                  <option>Technical Support</option>
                  <option>Partnership Opportunities</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1F2937] mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="bg-[#F3F4F6] rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-[#1F2937] mb-4">Quick Questions?</h3>
          <p className="text-[#9CA3AF] mb-6">
            For immediate assistance with course enrollment or technical issues, 
            call us at <strong>(346) 298-2988</strong> during business hours.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:courses@therabrake.academy"
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Email Course Support
            </a>
            <Link 
              href="/courses"
              className="inline-block bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
