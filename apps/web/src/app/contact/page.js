'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Let's Connect & Move Forward Together ✨</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            At <span className="font-bold">TheraBrake Academy™</span>, every question, every story, 
            and every step forward matters. Whether you're a professional seeking guidance on CEU courses, 
            an individual starting your journey of healing, or simply curious about how we can support 
            your growth—<span className="font-bold">we're here to listen and respond with care</span>.
          </p>
          
          <p className="text-xl text-gray-700">
            �� Reach out to us anytime. Your message isn't just an inquiry—it's the beginning of progress.
          </p>
          
          <p className="text-lg text-gray-600 mt-6">
            Together, let's turn challenges into opportunities and take the next step toward your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">📧 Email</h3>
                <a href="mailto:info@therabrake.academy" className="text-blue-600 hover:underline">
                  info@therabrake.academy
                </a>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-2">📞 Phone</h3>
                <p className="text-gray-600">(346) 298-2988</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-2">📍 Address</h3>
                <p className="text-gray-600">
                  6120 College St. Suite D185<br />
                  Beaumont, TX 77707
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Office Hours:</span><br />
                Monday - Friday: 9:00 AM - 5:00 PM CST<br />
                We respond to emails within 24-48 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
