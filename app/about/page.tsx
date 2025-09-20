import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About TheraBrake Academy™</h1>
          <p className="text-xl text-gray-600">
            Where Education Meets Transformation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <p className="text-lg leading-relaxed mb-6">
              At <strong>TheraBrake Academy™</strong>, we believe growth happens when you take a moment to 
              pause, process, and progress. That's why we've built a learning platform that serves both 
              <strong> mental health professionals</strong> and <strong>individuals seeking personal transformation</strong>.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Our Dual Catalog Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎓</span>
                  <h3 className="text-xl font-bold">Professional CEU & Development Programs</h3>
                </div>
                <p className="text-gray-600">
                  Accredited continuing education for licensed clinicians, plus practice-building programs 
                  like <em>Leap & Launch!</em> to help professionals grow their careers with confidence and compliance.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🧠</span>
                  <h3 className="text-xl font-bold">Personal Growth & Empowerment Courses</h3>
                </div>
                <p className="text-gray-600">
                  Transformational programs designed to support healing, resilience, and financial empowerment, 
                  covering everything from <em>Rebuilding After Betrayal</em> to <em>Financial Literacy & Independence</em>.
                </p>
              </div>
            </div>

            <p className="text-lg mt-8">
              Every course is designed to be <strong>practical, accessible, and impactful</strong>, blending 
              expert instruction with real-world tools. Learners can expect interactive lessons, downloadable 
              workbooks, quizzes, and certificates they can proudly share.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white text-center mb-12">
            <div className="text-3xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl">
              To empower professionals and the public with education that creates lasting change—in careers, 
              relationships, health, and personal fulfillment.
            </p>
            <p className="text-lg mt-4 font-semibold">
              At TheraBrake Academy™, you don't just complete courses. <strong>You unlock progress.</strong>
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                High-quality content from expert instructors
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Supporting learners on their journey together
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p className="text-sm text-gray-600">
                Making quality education available to all
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of learners who are transforming their lives with TheraBrake Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Browse Courses
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
