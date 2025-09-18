export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Simple and Clean */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-5xl font-bold mb-4">
            TheraBrake Academy
          </h1>
          <p className="text-2xl mb-8">Pause, Process, Progress</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Professional development and continuing education for mental health professionals
          </p>
          <div className="space-x-4">
            <a href="/courses" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
              Browse Courses
            </a>
            <a href="/auth/register" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TheraBrake Academy?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">CE Courses</h3>
            <p>Texas LPC Approved • NBCC Provider #87569</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Instant Certificates</h3>
            <p>Get your certificates immediately upon completion</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-2">Easy Learning</h3>
            <p>Self-paced courses with interactive content</p>
          </div>
        </div>
      </div>

      {/* Course Types */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4">For Professionals</h3>
              <p className="mb-4">
                Earn CE credits with courses on Ethics, Trauma Care, Telehealth, and more.
              </p>
              <a href="/courses?type=CE" className="text-blue-600 font-bold hover:underline">
                View CE Courses →
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4">For Personal Growth</h3>
              <p className="mb-4">
                Transform your life with courses on relationships, finance, and mindset.
              </p>
              <a href="/courses?type=Personal" className="text-orange-500 font-bold hover:underline">
                View Personal Courses →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
