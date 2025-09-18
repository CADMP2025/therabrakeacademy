import Link from 'next/link';

export default function HomePage() {
  const featuredCourses = [
    {
      id: 1,
      title: 'Ethics for Professional Counselors',
      type: 'CE',
      ceHours: 6,
      price: 99,
      color: 'from-blue-500 to-blue-700',
      icon: '⚖️'
    },
    {
      id: 2,
      title: 'Trauma-Informed Practice',
      type: 'CE',
      ceHours: 6,
      price: 99,
      color: 'from-teal-500 to-green-600',
      icon: '🌱'
    },
    {
      id: 3,
      title: 'LEAP AND LAUNCH!',
      type: 'Professional',
      price: 149,
      color: 'from-orange-500 to-red-600',
      icon: '🚀'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <span className="text-8xl animate-float">🧠</span>
            <h1 className="mt-6 text-5xl lg:text-6xl font-bold">
              Welcome to <span className="text-yellow-300">TheraBrake Academy™</span>
            </h1>
            <p className="mt-4 text-2xl lg:text-3xl font-light text-cyan-100">
              Pause, Process, Progress
            </p>
            <p className="mt-6 text-xl max-w-3xl mx-auto text-gray-100">
              Professional development and continuing education for mental health professionals.
              Build your practice, expand your skills, and transform lives.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-primary text-lg px-8 py-4">
                Browse All Courses
              </Link>
              <Link href="/auth/register" className="btn-accent text-lg px-8 py-4">
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
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text">Why Choose TheraBrake Academy?</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to advance your career</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">Cut & Paste Course Creation</h3>
              <p className="text-gray-600">Create courses easily without coding. Simply paste your content and we'll format it beautifully.</p>
            </div>
            
            <div className="card hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engaging quizzes, downloadable workbooks, and interactive content to enhance your learning.</p>
            </div>
            
            <div className="card hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Instant Certificates</h3>
              <p className="text-gray-600">Receive your CE certificates immediately upon course completion with verification QR codes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Featured Courses</h2>
            <p className="mt-4 text-xl text-gray-600">Start your learning journey today</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="card group">
                <div className={`h-40 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center mb-6`}>
                  <span className="text-6xl group-hover:scale-125 transition-transform">{course.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                    {course.type}
                  </span>
                  {course.ceHours && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      {course.ceHours} CE Hours
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">${course.price}</span>
                  <Link href={`/courses/${course.id}`} className="btn-primary py-2 px-4 text-sm">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses" className="btn-secondary text-lg px-8 py-4">
              View All 14 Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl mb-8">Join thousands of mental health professionals advancing their careers</p>
          <Link href="/auth/register" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
}
