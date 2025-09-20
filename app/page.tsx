import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Brain, Users, Clock, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Texas LPC Approved",
      description: "All CE courses approved by Texas State Board of Professional Counselors"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Cut & Paste Builder",
      description: "Create courses instantly by pasting from Word or Google Docs"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dual-Stream Learning",
      description: "Professional CEUs & Personal Development in one platform"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Learn Anywhere",
      description: "Mobile app with offline downloads for learning on the go"
    }
  ]

  const courses = [
    {
      title: "Ethics for Professional Counselors",
      ceHours: 6,
      price: 197,
      category: "Professional Development"
    },
    {
      title: "Trauma-Informed Care",
      ceHours: 6,
      price: 197,
      category: "Clinical Skills"
    },
    {
      title: "The So What Mindset™",
      ceHours: 0,
      price: 247,
      category: "Personal Growth"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-dark">
              Pause, Process, Progress
            </h1>
            <p className="text-xl md:text-2xl text-neutral-medium max-w-3xl mx-auto">
              Professional CE Credits & Personal Transformation Courses for Mental Health Professionals
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link href="/courses" className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                Browse Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-secondary hover:bg-secondary-light text-white rounded-lg font-medium transition-all duration-200">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose TheraBrake Academy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-neutral-light hover:shadow-xl transition-shadow duration-200">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <div className="bg-gradient-to-br from-primary to-primary-hover h-32"></div>
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{course.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      {course.ceHours > 0 && (
                        <span className="bg-accent/20 text-accent-hover px-3 py-1 rounded-full text-sm font-medium">
                          {course.ceHours} CE Hours
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${course.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center justify-center px-8 py-3 bg-action hover:bg-action-light text-white rounded-lg font-medium transition-all duration-200">
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of mental health professionals advancing their careers with TheraBrake Academy
          </p>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary hover:bg-neutral-light rounded-lg font-medium transition-all duration-200 shadow-lg">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
