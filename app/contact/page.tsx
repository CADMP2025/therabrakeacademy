'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect & Move Forward Together ✨</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <strong>TheraBrake Academy™</strong>, every question, every story, and every step forward matters. 
            Whether you're a professional seeking guidance on CEU courses, an individual starting your journey of 
            healing, or simply curious about how we can support your growth—<strong>we're here to listen and 
            respond with care</strong>.
          </p>
          <p className="text-lg mt-4 text-gray-800">
            📩 Reach out to us anytime. Your message isn't just an inquiry—it's the beginning of progress.
          </p>
          <p className="text-lg mt-4 text-gray-600">
            Together, let's turn challenges into opportunities and take the next step toward your goals.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:info@therabrake.academy" className="text-blue-600 hover:underline">
                        info@therabrake.academy
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a href="tel:3462982988" className="text-blue-600 hover:underline">
                        (346) 298-2988
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-gray-600">
                        6120 College St. Suite D185<br />
                        Beaumont, TX 77707
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
                  <span className="text-3xl">💬</span>
                  <h3 className="font-bold text-xl mb-2 mt-3">Office Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM CST</p>
                  <p>Saturday - Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject...</option>
                    <option value="ce-courses">CE Courses Information</option>
                    <option value="personal-development">Personal Development Programs</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="enrollment">Enrollment Questions</option>
                    <option value="corporate">Corporate Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>📤</span>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
