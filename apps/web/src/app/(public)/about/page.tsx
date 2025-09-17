import React from 'react';

export default function AboutPage() {
  const features = [
    {
      icon: "📚",
      title: "Interactive Lessons",
      description: "Engaging content designed for real learning outcomes"
    },
    {
      icon: "📖",
      title: "Downloadable Workbooks",
      description: "Practical tools and resources you can use immediately"
    },
    {
      icon: "✅",
      title: "Knowledge Quizzes",
      description: "Test your understanding and track your progress"
    },
    {
      icon: "🏆",
      title: "Certificates",
      description: "Professional credentials you can proudly share"
    }
  ];

  const stats = [
    { number: "26+", label: "CE Hours Available" },
    { number: "14", label: "Comprehensive Courses" },
    { number: "2,000+", label: "Students Enrolled" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="text-3xl font-bold flex items-center gap-2">
                <span className="text-4xl">🧠</span>
                Therabrake Academy
              </a>
              <p className="text-blue-100 mt-1">Pause. Process. Progress.</p>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="/" className="hover:text-blue-200 transition">Home</a>
              <a href="/courses" className="hover:text-blue-200 transition">Courses</a>
              <a href="/about" className="hover:text-blue-200 font-semibold border-b-2 border-white pb-1">About</a>
              <a href="/contact" className="hover:text-blue-200 transition">Contact</a>
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition">
                Login
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section with Brain Mascot */}
      <div className="relative bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 py-20 overflow-hidden">
        <div className="absolute top-10 right-10 text-[200px] opacity-10 animate-pulse">
          🧠
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About TheraBrake Academy™
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            At <span className="font-bold text-blue-600">TheraBrake Academy™</span>, we believe growth happens when you take a moment to 
            <span className="inline-flex gap-2 mx-2">
              <span className="text-orange-500 font-bold">pause,</span>
              <span className="text-green-500 font-bold">process,</span>
              <span className="text-blue-600 font-bold">and progress.</span>
            </span>
          </p>
          <p className="text-xl text-gray-600 mt-4">
            That's why we've built a learning platform that serves both <strong>mental health professionals</strong> and <strong>individuals seeking personal transformation</strong>.
          </p>
        </div>
      </div>

      {/* Dual Catalog Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Dual Catalog Approach
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Professional Track */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-4">
                Professional CEU & Development Programs
              </h3>
              <p className="text-blue-100 mb-6">
                Accredited continuing education for licensed clinicians, plus practice-building programs like <em className="text-yellow-300">Leap & Launch!</em> to help professionals grow their careers with confidence and compliance.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>Texas LPC Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>NBCC Provider #87569</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>26+ CE Hours Available</span>
                </div>
              </div>
            </div>

            {/* Personal Growth Track */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4">
                Personal Growth & Empowerment Courses
              </h3>
              <p className="text-green-100 mb-6">
                Transformational programs designed to support healing, resilience, and financial empowerment, covering everything from <em className="text-yellow-300">Rebuilding After Betrayal</em> to <em className="text-yellow-300">Financial Literacy & Independence</em>.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>Relationship Recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>Financial Empowerment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  <span>Mindset Transformation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Every Course is Designed to Be
          </h2>
          <p className="text-xl text-center text-blue-600 font-bold mb-12">
            Practical, Accessible, and Impactful
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-2xl text-white leading-relaxed">
            <strong>To empower professionals and the public with education that creates lasting change</strong>—in careers, relationships, health, and personal fulfillment.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-green-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-4xl font-bold text-white mb-6">
            At TheraBrake Academy™, you don't just complete courses.
          </h2>
          <p className="text-3xl font-bold text-yellow-300 mb-8">
            You unlock progress.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/courses" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
              Browse Our Courses
            </a>
            <a href="/contact" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition transform hover:scale-105">
              Get Started Today
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg mb-2">📧 info@therabrake.academy</p>
          <p className="text-lg mb-2">📞 (346) 298-2988</p>
          <p className="text-lg">📍 6120 College St. Suite D185, Beaumont, TX 77707</p>
        </div>
      </div>
    </div>
  );
}