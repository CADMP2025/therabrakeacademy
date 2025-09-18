import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-400 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-8xl mb-6">🧠</div>
          <h1 className="text-5xl font-bold mb-4">
            Welcome to TheraBrake Academy™
          </h1>
          <p className="text-2xl mb-8">Pause, Process, Progress</p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
              Browse Courses
            </Link>
            <Link href="/auth/register" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the homepage content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Development & Personal Growth
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4 text-center">📚</div>
              <h3 className="text-xl font-bold mb-2">CE Courses</h3>
              <p className="text-gray-600">Texas LPC Approved • NBCC Provider #87569</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4 text-center">🏆</div>
              <h3 className="text-xl font-bold mb-2">Instant Certificates</h3>
              <p className="text-gray-600">Get certified immediately upon completion</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4 text-center">💡</div>
              <h3 className="text-xl font-bold mb-2">Easy Learning</h3>
              <p className="text-gray-600">Cut & paste course creation for instructors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
