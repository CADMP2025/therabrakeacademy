// src/app/page.js
import Link from 'next/link';

export default function HomePage() {
  const featuredCourses = [
    {
      id: 1,
      title: 'Ethics for Professional Counselors',
      type: 'CE',
      ceHours: 6,
      price: 99,
      description: 'Comprehensive ethical training for Texas LPCs',
      icon: '⚖️',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      title: 'Building a Trauma-Informed Practice',
      type: 'CE',
      ceHours: 6,
      price: 99,
      description: 'Evidence-based approaches to trauma care',
      icon: '🌱',
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 3,
      title: 'Telehealth in Counseling',
      type: 'CE',
      ceHours: 3,
      price: 79,
      description: 'Master virtual counseling delivery',
      icon: '💻',
      color: 'from-blue-400 to-gray-600'
    },
    {
      id: 4,
      title: 'LEAP AND LAUNCH!',
      type: 'Professional',
      price: 149,
      description: 'Build your private practice from scratch',
      icon: '🚀',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      title: 'Healing Forward',
      type: 'Personal',
      price: 49,
      description: 'Relationship recovery and personal reclamation',
      icon: '❤️',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 6,
      title: 'The So What Mindset',
      type: 'Personal',
      price: 39,
      description: 'Transform your thinking, transform your life',
      icon: '🧠',
      color: 'from-purple-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="text-8xl mb-6 animate-pulse">🧠</div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">TheraBrake Academy™</span>
            </h1>
            <p className="text-3xl font-light text-cyan-100 mb-4">
              Pause, Process, Progress
            </p>
            <p className="text-xl mb-10 leading-relaxed">
              Professional development and continuing education for mental health professionals.
              Build your practice, expand your skills, and transform lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link 
                href="/courses" 
                className="px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Browse All Courses
              </Link>
              <Link 
                href="/auth/register" 
                className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
              >
                Start Learning Today
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-300 mr-2">✓</span>
                Texas LPC Approved
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-300 mr-2">✓</span>
                NBCC Provider #87569
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-300 mr-2">✓</span>
                Instant Certificates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Mental Health Professionals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                For Mental Health Professionals
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Earn accredited <span className="font-bold text-blue-600">Continuing Education Units (CEUs)</span> while 
                mastering real-world skills that elevate your career and protect your clients.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                From <span className="font-semibold">Ethics and HIPAA Compliance</span> to{' '}
                <span className="font-semibold">Trauma-Informed Care</span> and{' '}
                <span className="font-semibold">Telehealth Mastery</span>, our courses are built to keep you 
                compliant, confident, and competitive.
              </p>
              <Link 
                href="/courses?type=CE" 
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore CE Courses →
              </Link>
              <p className="mt-6 text-gray-600 italic">
                See why clinicians trust TheraBrake Academy to meet state requirements 
                and deliver practical tools you can use tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-bold">Ethics</h3>
                <p className="text-sm text-gray-600">6 CE Hours</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="font-bold">Trauma Care</h3>
                <p className="text-sm text-gray-600">6 CE Hours</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-bold">Telehealth</h3>
                <p className="text-sm text-gray-600">3 CE Hours</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-orange-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold">Cultural</h3>
                <p className="text-sm text-gray-600">3 CE Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Personal Growth */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">💔➡️❤️</div>
                <h3 className="font-bold">Healing</h3>
                <p className="text-sm text-gray-600">Relationships</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-yellow-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="font-bold">Finance</h3>
                <p className="text-sm text-gray-600">Credit & Wealth</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-amber-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">🌉</div>
                <h3 className="font-bold">Rebuilding</h3>
                <p className="text-sm text-gray-600">After Betrayal</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-orange-100 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">🧠⚡</div>
                <h3 className="font-bold">Mindset</h3>
                <p className="text-sm text-gray-600">Transform</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                For Personal Growth & Healing
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Life happens. Betrayal, financial setbacks, relationship struggles, even health crises. 
                But your story isn't over.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                With courses like <span className="font-semibold">Healing Forward</span>,{' '}
                <span className="font-semibold">Rebuilding After Betrayal</span>,{' '}
                <span className="font-semibold">Finding the Perfect Match</span>, and{' '}
                <span className="font-semibold">The So What Mindset</span>, you'll discover 
                powerful frameworks to help you pause, process, and progress toward a stronger you.
              </p>
              <Link 
                href="/courses?type=Personal" 
                className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Visit Personal Development →
              </Link>
              <p className="mt-6 text-gray-600 italic">
                Begin your journey to healing and empowerment today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Start your learning journey today</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <span className="text-5xl">{course.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-semibold">
                        {course.type}
                      </span>
                      {course.ceHours && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {course.ceHours} CE Hours
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold text-orange-500">
                      ${course.price}
                    </span>
                  </div>
                  <Link 
                    href={`/courses/${course.id}`}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/courses" 
              className="inline-block px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
            >
              View All 14 Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose TheraBrake Academy?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: '📋', title: 'Cut & Paste Creation', desc: 'Create courses without coding' },
              { icon: '📚', title: 'Interactive Learning', desc: 'Quizzes, workbooks, videos' },
              { icon: '🏆', title: 'Instant Certificates', desc: 'Get certified immediately' },
              { icon: '🎓', title: 'Accredited', desc: 'Texas LPC & NBCC approved' },
              { icon: '💡', title: 'Practical Skills', desc: 'Real-world applications' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of mental health professionals advancing their careers with TheraBrake Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Free
            </Link>
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all"
            >
              View Course Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}