import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
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
                className="hover:text-[#FACC15] transition font-medium"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="hover:text-[#FACC15] transition font-medium border-b-2 border-[#FACC15] pb-1"
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
            Contact Us
          </h1>
          <p className="text-xl text-[#FACC15] font-semibold">
            We're Here to Support Your Journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-[#1F2937] font-semibold mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-[#9CA3AF] rounded-lg focus:outline-none focus:border-[#3B82F6] transition"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#1F2937] font-semibold mb-2" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-[#9CA3AF] rounded-lg focus:outline-none focus:border-[#3B82F6] transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[#1F2937] font-semibold mb-2" htmlFor="subject">
                  Subject *
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-[#9CA3AF] rounded-lg focus:outline-none focus:border-[#3B82F6] transition"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="enrollment">Course Enrollment</option>
                  <option value="technical">Technical Support</option>
                  <option value="ceu">CEU Questions</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1F2937] font-semibold mb-2" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-[#9CA3AF] rounded-lg focus:outline-none focus:border-[#3B82F6] transition resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            {/* Direct Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6">Direct Contact</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#3B82F6] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Email Us</h4>
                    <p className="text-[#9CA3AF]">General Inquiries:</p>
                    <a href="mailto:info@therabrake.academy" className="text-[#3B82F6] hover:underline">
                      info@therabrake.academy
                    </a>
                    <p className="text-[#9CA3AF] mt-2">Course Support:</p>
                    <a href="mailto:courses@therabrake.academy" className="text-[#3B82F6] hover:underline">
                      courses@therabrake.academy
                    </a>
                    <p className="text-[#9CA3AF] mt-2">Administrative:</p>
                    <a href="mailto:admin@therabrake.academy" className="text-[#3B82F6] hover:underline">
                      admin@therabrake.academy
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#10B981] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Call Us</h4>
                    <p className="text-[#3B82F6] font-semibold">(346) 298-2988</p>
                    <p className="text-[#9CA3AF]">Monday - Friday: 9:00 AM - 5:00 PM CST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#F97316] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2937]">Visit Us</h4>
                    <p className="text-[#9CA3AF]">
                      6120 College St. Suite D185<br />
                      Beaumont, TX 77707
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#F3F4F6] rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/courses" className="text-[#3B82F6] hover:underline flex items-center">
                    <span className="mr-2">→</span> Browse All Courses
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-[#3B82F6] hover:underline flex items-center">
                    <span className="mr-2">→</span> Student Login
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-[#3B82F6] hover:underline flex items-center">
                    <span className="mr-2">→</span> Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-[#3B82F6] hover:underline flex items-center">
                    <span className="mr-2">→</span> Technical Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-lg p-6 text-white text-center mt-12">
          <p className="text-lg font-semibold mb-2">
            We Value Your Communication
          </p>
          <p className="opacity-90">
            Our support team typically responds within 24-48 business hours. 
            For urgent matters, please call us directly during business hours.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#9CA3AF] bg-[#F3F4F6]">
        <p className="font-semibold text-[#1F2937] mb-2">TheraBrake Academy™</p>
        <p>Pause. Process. Progress.</p>
      </div>
    </main>
  )
}