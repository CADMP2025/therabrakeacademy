import Link from 'next/link';

export default function HomePage() {
  const featuredCourses = [
    { id: 1, title: 'Ethics for Professional Counselors', type: 'CE', ceHours: 6, price: 99, icon: '⚖️' },
    { id: 2, title: 'Trauma-Informed Practice', type: 'CE', ceHours: 6, price: 99, icon: '🌱' },
    { id: 3, title: 'Telehealth in Counseling', type: 'CE', ceHours: 3, price: 79, icon: '💻' },
    { id: 4, title: 'Cultural Diversity in Texas', type: 'CE', ceHours: 3, price: 79, icon: '🌍' },
    { id: 5, title: 'LEAP AND LAUNCH!', type: 'Professional', price: 149, icon: '🚀' },
    { id: 6, title: 'The So What Mindset', type: 'Personal', price: 39, icon: '🧠' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-7xl mb-6">🧠</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">TheraBrake Academy™</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-cyan-100 mb-6">
            Pause, Process, Progress
          </p>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Professional development and continuing education for mental health professionals.
            Build your practice, expand your skills, and transform lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all shadow-xl"
            >
              Browse All Courses
            </Link>
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all shadow-xl"
            >
              Start Learning Today
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              ✓ Texas LPC Approved
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              ✓ NBCC Provider #87569
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              ✓ Instant Certificates
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose TheraBrake Academy?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">Cut & Paste Creation</h3>
              <p className="text-gray-600">Create courses easily without coding. Simply paste your content and we format it beautifully.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engaging quizzes, downloadable PDF workbooks, and interactive content.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Instant Certificates</h3>
              <p className="text-gray-600">Receive your CE certificates immediately upon course completion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Professional Development */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                For Mental Health Professionals
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Earn accredited <span className="font-bold text-blue-600">Continuing Education Units (CEUs)</span> while 
                mastering real-world skills. Our courses cover Ethics, Trauma-Informed Care, Telehealth, 
                Cultural Competence, and more.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <p className="font-semibold">Ethics</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <p className="font-semibold">Trauma</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <p className="font-semibold">Telehealth</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="font-semibold">Cultural</p>
                </div>
              </div>
              <Link 
                href="/courses?type=CE" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Explore CE Courses →
              </Link>
            </div>

            {/* Personal Development */}
            <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                For Personal Growth & Healing
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Transform your life with courses on relationships, financial literacy, mindset, and healing. 
                From "Healing Forward" to "The So What Mindset", discover powerful frameworks for growth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">❤️</div>
                  <p className="font-semibold">Healing</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="font-semibold">Finance</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🌉</div>
                  <p className="font-semibold">Rebuilding</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <p className="font-semibold">Mindset</p>
                </div>
              </div>
              <Link 
                href="/courses?type=Personal" 
                className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
              >
                Explore Personal Development →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-center">
                  <div className="text-5xl text-white">{course.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-semibold">
                      {course.type}
                    </span>
                    {course.ceHours && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {course.ceHours} CE Hours
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">${course.price}</span>
                    <Link 
                      href={`/courses/${course.id}`}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/courses" 
              className="inline-block px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-all"
            >
              View All 14 Courses →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-10">
            Join thousands of mental health professionals advancing their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all"
            >
              Get Started Free
            </Link>
            <Link 
              href="/courses" 
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all"
            >
              Browse Courses
            </Link>
          </div>
          
          <div className="mt-16 text-sm">
            <p className="mb-2">6120 College St. Suite D185, Beaumont, TX 77707</p>
            <p>(346) 298-2988 | courses@therabrake.academy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
