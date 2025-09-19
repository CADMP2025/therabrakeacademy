import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TheraBrake Academy™</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">
                Courses
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Pause, Process, Progress
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Professional CE Credits & Personal Transformation Courses
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              Browse Courses
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Texas LPC Approved</h3>
            <p className="text-gray-600">CE courses approved by Texas State Board</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✂️</div>
            <h3 className="text-xl font-bold mb-2">Cut & Paste Builder</h3>
            <p className="text-gray-600">Create courses instantly from Word docs</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Learn Anywhere</h3>
            <p className="text-gray-600">Mobile app with offline downloads</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">📧 info@therabrake.academy | 📞 (346) 298-2988</p>
          <p className="text-gray-400">
            6120 College St. Suite D185, Beaumont, TX 77707
          </p>
          <p className="mt-4 text-sm text-gray-500">
            © 2024 TheraBrake Academy™. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
