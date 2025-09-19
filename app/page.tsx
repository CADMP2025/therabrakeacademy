import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">TheraBrake Academy™</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/courses" className="text-neutral-dark hover:text-primary transition-colors">
                Courses
              </Link>
              <Link href="/pricing" className="text-neutral-dark hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-neutral-dark hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-neutral-dark hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="container-custom text-center">
          <div className="mb-8">
            <span className="badge-primary">Texas LPC Approved CE Provider</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-dark mb-4">
            Pause. Process. Progress.
          </h2>
          <p className="text-xl text-neutral-medium mb-8 max-w-3xl mx-auto">
            Professional CE Credits & Personal Transformation Courses for Mental Health Professionals
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/courses" className="btn-primary">
              Browse Courses
            </Link>
            <Link href="/register" className="btn-secondary">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose TheraBrake Academy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h4 className="text-xl font-bold mb-2">Texas LPC Approved</h4>
              <p className="text-neutral-medium">
                All CE courses approved by Texas State Board of Professional Counselors
              </p>
            </div>
            <div className="card-hover text-center">
              <div className="text-5xl mb-4">✂️</div>
              <h4 className="text-xl font-bold mb-2">Cut & Paste Builder™</h4>
              <p className="text-neutral-medium">
                Create courses instantly by pasting from Word or Google Docs
              </p>
            </div>
            <div className="card-hover text-center">
              <div className="text-5xl mb-4">📱</div>
              <h4 className="text-xl font-bold mb-2">Learn Anywhere</h4>
              <p className="text-neutral-medium">
                Mobile app with offline downloads for learning on the go
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-primary/5">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">Course Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-2xl">📚</span>
                </div>
                <h4 className="text-2xl font-bold">Professional CE Credits</h4>
              </div>
              <p className="text-neutral-medium mb-4">
                Earn required CE hours with courses in ethics, trauma-informed care, cultural competency, and more.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>6 CE Hour Courses - $197</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>3 CE Hour Courses - $127</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>2 CE Hour Courses - $97</span>
                </li>
              </ul>
              <Link href="/courses?category=ce" className="btn-primary w-full text-center">
                View CE Courses
              </Link>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-secondary text-2xl">🌱</span>
                </div>
                <h4 className="text-2xl font-bold">Personal Development</h4>
              </div>
              <p className="text-neutral-medium mb-4">
                Transform your life with courses on relationships, financial literacy, resilience, and healing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Relationship Recovery - $197</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Financial Empowerment - $147</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  <span>So What Mindset™ - $247</span>
                </li>
              </ul>
              <Link href="/courses?category=personal" className="btn-secondary w-full text-center">
                View Personal Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Individual Courses</h4>
              <p className="text-3xl font-bold text-primary mb-4">$97-$497</p>
              <ul className="space-y-3 text-neutral-medium">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Lifetime access
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  CE certificates included
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Downloadable workbooks
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Mobile app access
                </li>
              </ul>
              <Link href="/pricing" className="btn-ghost w-full text-center mt-6">
                View Courses
              </Link>
            </div>
            
            <div className="card border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </span>
              </div>
              <h4 className="text-xl font-bold mb-4">All-Access Pass</h4>
              <p className="text-3xl font-bold text-primary mb-4">$1,997/year</p>
              <ul className="space-y-3 text-neutral-medium">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  All 15+ courses
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  New courses included
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Monthly Q&A sessions
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Save $973 (33% off)
                </li>
              </ul>
              <Link href="/register" className="btn-primary w-full text-center mt-6">
                Get All-Access
              </Link>
            </div>
            
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Organization</h4>
              <p className="text-3xl font-bold text-primary mb-4">Custom</p>
              <ul className="space-y-3 text-neutral-medium">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Volume discounts
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Team management
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Custom reporting
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span>
                  Invoice billing
                </li>
              </ul>
              <Link href="/contact" className="btn-ghost w-full text-center mt-6">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-hover">
        <div className="container-custom text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Practice?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of mental health professionals advancing their careers with TheraBrake Academy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="bg-white text-primary hover:bg-neutral-light px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg">
              Start Free Trial
            </Link>
            <Link href="/courses" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">About</h5>
              <ul className="space-y-2 text-neutral-medium">
                <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="/instructors" className="hover:text-white transition-colors">Instructors</Link></li>
                <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Courses</h5>
              <ul className="space-y-2 text-neutral-medium">
                <li><Link href="/courses?category=ce" className="hover:text-white transition-colors">CE Credits</Link></li>
                <li><Link href="/courses?category=personal" className="hover:text-white transition-colors">Personal Development</Link></li>
                <li><Link href="/courses?category=business" className="hover:text-white transition-colors">Business Development</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-neutral-medium">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact</h5>
              <p className="text-neutral-medium mb-2">📧 info@therabrake.academy</p>
              <p className="text-neutral-medium mb-2">📧 support@therabrake.academy</p>
              <p className="text-neutral-medium mb-2">📞 (346) 298-2988</p>
              <p className="text-neutral-medium">
                6120 College St. Suite D185<br />
                Beaumont, TX 77707
              </p>
            </div>
          </div>
          
          <div className="border-t border-neutral-medium pt-8 text-center">
            <p className="text-neutral-medium mb-2">
              © 2024 TheraBrake Academy™. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/terms" className="text-neutral-medium hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-neutral-medium">•</span>
              <Link href="/privacy" className="text-neutral-medium hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-neutral-medium">•</span>
              <Link href="/cookies" className="text-neutral-medium hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
