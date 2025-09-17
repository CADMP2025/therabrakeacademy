import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
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
              <Link href="/about" className="hover:text-[#FACC15] transition font-medium text-[#FACC15]">
                About
              </Link>
              <Link href="/contact" className="hover:text-[#FACC15] transition font-medium">
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
          <h1 className="text-4xl font-bold">About TheraBrake Academy™</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-[#1F2937] mb-6 leading-relaxed">
            At <strong>TheraBrake Academy™</strong>, we believe growth happens when you take a moment to pause, process, and progress. 
            That's why we've built a learning platform that serves both <strong>mental health professionals</strong> and 
            <strong> individuals seeking personal transformation</strong>.
          </p>

          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Our Dual Catalog</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <span className="text-2xl mr-4">🎓</span>
              <div>
                <h3 className="font-bold text-[#1F2937] mb-2">Professional CEU & Development Programs</h3>
                <p className="text-[#1F2937]">
                  Accredited continuing education for licensed clinicians, plus practice-building programs like 
                  <em> Leap & Launch!</em> to help professionals grow their careers with confidence and compliance.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">🌱</span>
              <div>
                <h3 className="font-bold text-[#1F2937] mb-2">Personal Growth & Empowerment Courses</h3>
                <p className="text-[#1F2937]">
                  Transformational programs designed to support healing, resilience, and financial empowerment, 
                  covering everything from <em>Rebuilding After Betrayal</em> to <em>Financial Literacy & Independence</em>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F3F4F6] rounded-lg p-6 mb-8">
            <p className="text-[#1F2937] mb-4">
              Every course is designed to be <strong>practical, accessible, and impactful</strong>, blending expert 
              instruction with real-world tools. Learners can expect interactive lessons, downloadable workbooks, 
              quizzes, and certificates they can proudly share.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-lg">
              <strong>To empower professionals and the public with education that creates lasting change</strong>—in 
              careers, relationships, health, and personal fulfillment.
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl text-[#1F2937] font-semibold mb-6">
              At TheraBrake Academy™, you don't just complete courses. <strong>You unlock progress.</strong>
            </p>
            
            <Link 
              href="/courses" 
              className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 text-[#9CA3AF]">
          <p>6120 College St. Suite D185, Beaumont, TX 77707</p>
          <p>(346) 298-2988 | courses@therabrake.academy</p>
        </div>
      </div>
    </main>
  )
}
