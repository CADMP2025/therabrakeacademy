import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section - adjusted padding for fixed header */}
      <section className="bg-gradient-to-br from-blue-100 via-white to-green-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to TheraBrake Academy<span className="text-4xl md:text-5xl align-super">™</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-blue-600 mb-8">
              Pause, Process, Progress.
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At <strong>TheraBrake Academy™</strong>, learning isn't just about earning credits or 
              ticking boxes—it's about transformation. Whether you're a licensed professional ready to 
              grow your practice or an individual ready to reclaim your life, you'll find a course 
              here designed for you.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Development Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🎓</span>
                <h2 className="text-3xl font-bold">For Mental Health Professionals</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Earn accredited <strong>Continuing Education Units (CEUs)</strong> while mastering 
                real-world skills that elevate your career and protect your clients. From 
                <strong> Ethics and HIPAA Compliance</strong> to <strong>Trauma-Informed Care</strong> and 
                <strong> Telehealth Mastery</strong>, our courses are built to keep you compliant, 
                confident, and competitive.
              </p>
              <Link 
                href="/courses#professional" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg"
              >
                Explore Professional Development Catalog
                <span className="ml-2">→</span>
              </Link>
              <p className="text-sm text-gray-600 mt-3">
                See why clinicians trust TheraBrake Academy™ to meet state requirements 
                <em> and</em> deliver practical tools you can use tomorrow.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">CE Course Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>Texas LPC Board Approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>6 CE Hours per Course</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>Instant Certificate Generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span>Lifetime Access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Growth Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Personal Development Programs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Healing Forward</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Rebuilding After Betrayal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Finding the Perfect Match</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>The So What Mindset™</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🧠</span>
                <h2 className="text-3xl font-bold">For Personal Growth & Healing</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Life happens. Betrayal, financial setbacks, relationship struggles, even health crises. 
                But your story isn't over. With courses like <strong>Healing Forward</strong>, 
                <strong> Rebuilding After Betrayal</strong>, <strong>Finding the Perfect Match</strong>, 
                and <strong>Cancer Diagnosis: It's Not the End…</strong>, you'll discover powerful 
                frameworks to help you pause, process, and progress toward a stronger you.
              </p>
              <Link 
                href="/courses#personal" 
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-lg"
              >
                Visit Personal Development Catalog
                <span className="ml-2">→</span>
              </Link>
              <p className="text-sm text-gray-600 mt-3">
                Begin your journey to healing and empowerment today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the homepage content remains the same... */}
      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose TheraBrake Academy™?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Dual-Stream Learning</h3>
              <p className="text-gray-600">Professional CEUs + Personal Development</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Trusted & Accredited</h3>
              <p className="text-gray-600">Courses that meet state and national requirements</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Practical & Transformational</h3>
              <p className="text-gray-600">Step-by-step guidance you can actually apply</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Learn Your Way</h3>
              <p className="text-gray-600">Self-paced video lessons, interactive quizzes, and downloadable workbooks</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Certificates You Can Share</h3>
              <p className="text-gray-600">Celebrate your progress and add credibility to your career</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">Learn from experienced professionals in their fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Your Next Step Starts Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-5xl mb-3">📚</div>
              <h3 className="font-bold text-xl mb-2">Browse Our Courses</h3>
              <p>Find the right program for your needs.</p>
            </div>
            <div>
              <div className="text-5xl mb-3">💻</div>
              <h3 className="font-bold text-xl mb-2">Enroll Today</h3>
              <p>Gain instant access to your learning dashboard.</p>
            </div>
            <div>
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="font-bold text-xl mb-2">Transform Tomorrow</h3>
              <p>Apply what you learn for real, lasting change.</p>
            </div>
          </div>
          <p className="text-xl mb-8">
            <strong>TheraBrake Academy™</strong> isn't just another online school—it's where education meets empowerment.
          </p>
          <Link 
            href="/courses" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg"
          >
            Start Your Journey Today
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
