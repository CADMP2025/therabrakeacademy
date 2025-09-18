import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-8xl inline-block mb-6">🧠</span>
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">TheraBrake Academy™</span>
            </h1>
            <p className="text-2xl lg:text-3xl font-light text-cyan-100 mb-6">
              Pause, Process, Progress
            </p>
            <p className="text-xl max-w-3xl mx-auto text-gray-100 mb-8">
              Professional development and continuing education for mental health professionals.
              Build your practice, expand your skills, and transform lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses" 
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Browse All Courses
              </Link>
              <Link 
                href="/auth/register" 
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Learning Today
              </Link>
            </div>
            <div className="mt-8 flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                Texas LPC Approved
              </div>
              <div className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                NBCC Provider #87569
              </div>
              <div className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                Instant Certificates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Professionals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">For Mental Health Professionals</h2>
              <p className="text-lg text-gray-700 mb-6">
                Earn accredited <span className="font-bold text-blue-600">Continuing Education Units (CEUs)</span> while 
                mastering real-world skills that elevate your career and protect your clients. 
                From <span className="font-semibold">Ethics and HIPAA Compliance</span> to <span className="font-semibold">Trauma-Informed Care</span> and 
                <span className="font-semibold"> Telehealth Mastery</span>, our courses are built to keep you compliant, confident, and competitive.
              </p>
              <Link 
                href="/courses?type=CE" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                Explore Professional Development Catalog →
              </Link>
              <p className="mt-4 text-gray-600 italic">
                See why clinicians trust TheraBrake Academy™ to meet state requirements and deliver practical tools you can use tomorrow.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">⚖️</span>
                  <p className="font-semibold mt-2">Ethics</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">🌱</span>
                  <p className="font-semibold mt-2">Trauma Care</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">💻</span>
                  <p className="font-semibold mt-2">Telehealth</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">🌍</span>
                  <p className="font-semibold mt-2">Cultural</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Personal Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">💔➡️❤️</span>
                  <p className="font-semibold mt-2">Healing</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">💳</span>
                  <p className="font-semibold mt-2">Finance</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">🌉</span>
                  <p className="font-semibold mt-2">Rebuilding</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <span className="text-2xl">🧠⚡</span>
                  <p className="font-semibold mt-2">Mindset</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">For Personal Growth & Healing</h2>
              <p className="text-lg text-gray-700 mb-6">
                Life happens. Betrayal, financial setbacks, relationship struggles, even health crises. 
                But your story isn't over. With courses like <span className="font-semibold">Healing Forward</span>, 
                <span className="font-semibold"> Rebuilding After Betrayal</span>, <span className="font-semibold">Finding the Perfect Match</span>, 
                and <span className="font-semibold"> Cancer Diagnosis: It's Not the End…</span>, you'll discover powerful 
                frameworks to help you pause, process, and progress toward a stronger you.
              </p>
              <Link 
                href="/courses?type=Personal" 
                className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all"
              >
                Visit Personal Development Catalog →
              </Link>
              <p className="mt-4 text-gray-600 italic">
                Begin your journey to healing and empowerment today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose TheraBrake Academy™?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="font-bold mb-2">Dual-Stream Learning</h3>
              <p className="text-sm text-gray-600">Professional CEUs + Personal Development</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="font-bold mb-2">Trusted & Accredited</h3>
              <p className="text-sm text-gray-600">Meets state and national requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="font-bold mb-2">Practical & Transformational</h3>
              <p className="text-sm text-gray-600">Step-by-step guidance you can apply</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="font-bold mb-2">Learn Your Way</h3>
              <p className="text-sm text-gray-600">Self-paced lessons and workbooks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="font-bold mb-2">Shareable Certificates</h3>
              <p className="text-sm text-gray-600">Celebrate your achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl mb-8">
            TheraBrake Academy™ isn't just another online school—it's where education meets empowerment.
          </p>
          <Link 
            href="/courses" 
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Browse Our Courses
          </Link>
          <div className="mt-12 text-sm">
            <p>6120 College St. Suite D185, Beaumont, TX 77707</p>
            <p>(346) 298-2988 | courses@therabrake.academy</p>
          </div>
        </div>
      </section>
    </div>
  );
}
