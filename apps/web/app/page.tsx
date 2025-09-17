import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation with Logo */}
      <nav className="bg-[#3B82F6] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
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
            Welcome to TheraBrake Academy™
          </h1>
          <p className="text-3xl font-semibold text-[#FACC15]">
            Pause, Process, Progress.
          </p>
        </div>
      </div>

      {/* Main Introduction */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-lg text-[#1F2937] leading-relaxed">
            At <strong>TheraBrake Academy™</strong>, learning isn't just about earning credits or ticking boxes—it's about transformation. 
            Whether you're a licensed professional ready to grow your practice or an individual ready to reclaim your life, 
            you'll find a course here designed for you.
          </p>
        </div>

        {/* Two-Column Layout for Professional and Personal */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Professional Development */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#10B981]">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
              For Mental Health Professionals
            </h2>
            <p className="text-[#1F2937] mb-6">
              Earn accredited <strong>Continuing Education Units (CEUs)</strong> while mastering real-world skills that 
              elevate your career and protect your clients. From <strong>Ethics and HIPAA Compliance</strong> to 
              <strong> Trauma-Informed Care</strong> and <strong>Telehealth Mastery</strong>, our courses are built 
              to keep you compliant, confident, and competitive.
            </p>
            <Link 
              href="/courses?filter=professional" 
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Professional Development Catalog
            </Link>
            <p className="text-sm text-[#9CA3AF] mt-4">
              See why clinicians trust TheraBrake Academy™ to meet state requirements <em>and</em> deliver practical tools you can use tomorrow.
            </p>
          </div>

          {/* Personal Growth */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#F97316]">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
              For Personal Growth & Healing
            </h2>
            <p className="text-[#1F2937] mb-6">
              Life happens. Betrayal, financial setbacks, relationship struggles, even health crises. But your story isn't over. 
              With courses like <strong>Healing Forward</strong>, <strong>Rebuilding After Betrayal</strong>, 
              <strong> Finding the Perfect Match</strong>, and <strong>Cancer Diagnosis: It's Not the End…</strong>, 
              you'll discover powerful frameworks to help you pause, process, and progress toward a stronger you.
            </p>
            <Link 
              href="/courses?filter=personal" 
              className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Visit Personal Development Catalog
            </Link>
            <p className="text-sm text-[#9CA3AF] mt-4">
              Begin your journey to healing and empowerment today.
            </p>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-[#F3F4F6] rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center">
            Why Choose TheraBrake Academy™?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <span className="text-[#10B981] mr-3 text-xl">✓</span>
              <div>
                <strong className="text-[#1F2937]">Dual-Stream Learning</strong>
                <p className="text-sm text-[#9CA3AF]">Professional CEUs + Personal Development</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#10B981] mr-3 text-xl">✓</span>
              <div>
                <strong className="text-[#1F2937]">Trusted & Accredited</strong>
                <p className="text-sm text-[#9CA3AF]">Courses that meet state and national requirements</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#10B981] mr-3 text-xl">✓</span>
              <div>
                <strong className="text-[#1F2937]">Practical & Transformational</strong>
                <p className="text-sm text-[#9CA3AF]">Step-by-step guidance you can actually apply</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#10B981] mr-3 text-xl">✓</span>
              <div>
                <strong className="text-[#1F2937]">Learn Your Way</strong>
                <p className="text-sm text-[#9CA3AF]">Self-paced video lessons, interactive quizzes, and downloadable workbooks</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#10B981] mr-3 text-xl">✓</span>
              <div>
                <strong className="text-[#1F2937]">Certificates You Can Share</strong>
                <p className="text-sm text-[#9CA3AF]">Celebrate your progress and add credibility to your career</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Your Next Step Starts Here</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="font-semibold mb-2 text-lg">Browse Our Courses</p>
              <p className="text-sm opacity-90">Find the right program for your needs.</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-lg">Enroll Today</p>
              <p className="text-sm opacity-90">Gain instant access to your learning dashboard.</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-lg">Transform Tomorrow</p>
              <p className="text-sm opacity-90">Apply what you learn for real, lasting change.</p>
            </div>
          </div>
          <Link 
            href="/courses" 
            className="inline-block bg-[#FACC15] hover:bg-[#FDE047] text-[#1F2937] px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
          >
            Start Your Journey Today
          </Link>
          <p className="mt-6 text-lg">
            <strong>TheraBrake Academy™</strong> isn't just another online school—it's where education meets empowerment.
          </p>
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
