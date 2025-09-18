import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            🌟 Welcome to TheraBrake Academy™
          </h1>
          <p className="text-3xl font-light mb-8">
            Pause, Process, Progress.
          </p>
          <p className="text-xl leading-relaxed">
            At <span className="font-bold">TheraBrake Academy™</span>, learning isn't just about earning credits 
            or ticking boxes—it's about transformation. Whether you're a licensed professional ready to grow 
            your practice or an individual ready to reclaim your life, you'll find a course here designed for you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* For Mental Health Professionals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
            🎓 For Mental Health Professionals
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Earn accredited <span className="font-bold">Continuing Education Units (CEUs)</span> while mastering 
            real-world skills that elevate your career and protect your clients. From{' '}
            <span className="font-bold">Ethics and HIPAA Compliance</span> to{' '}
            <span className="font-bold">Trauma-Informed Care</span> and{' '}
            <span className="font-bold">Telehealth Mastery</span>, our courses are built to keep you 
            compliant, confident, and competitive.
          </p>
          <p className="text-lg text-gray-700">
            👉 Explore our{' '}
            <Link href="/courses?type=CE" className="font-bold text-blue-600 hover:underline">
              Professional Development Catalog
            </Link>{' '}
            to see why clinicians trust TheraBrake Academy™ to meet state requirements{' '}
            <span className="italic">and</span> deliver practical tools you can use tomorrow.
          </p>
        </section>

        {/* For Personal Growth & Healing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
            🌱 For Personal Growth & Healing
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Life happens. Betrayal, financial setbacks, relationship struggles, even health crises. 
            But your story isn't over. With courses like <span className="font-bold">Healing Forward</span>,{' '}
            <span className="font-bold">Rebuilding After Betrayal</span>,{' '}
            <span className="font-bold">Finding the Perfect Match</span>, and{' '}
            <span className="font-bold">Cancer Diagnosis: It's Not the End…</span>, you'll discover 
            powerful frameworks to help you pause, process, and progress toward a stronger you.
          </p>
          <p className="text-lg text-gray-700">
            👉 Visit our{' '}
            <Link href="/courses?type=Personal" className="font-bold text-orange-500 hover:underline">
              Personal Development Catalog
            </Link>{' '}
            and begin your journey to healing and empowerment today.
          </p>
        </section>

        {/* Why Choose Section */}
        <section className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center">
            🚀 Why Choose TheraBrake Academy™?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3 text-green-500 text-xl">•</span>
              <div><span className="font-bold">Dual-Stream Learning</span> – Professional CEUs + Personal Development</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-500 text-xl">•</span>
              <div><span className="font-bold">Trusted & Accredited</span> – Courses that meet state and national requirements</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-500 text-xl">•</span>
              <div><span className="font-bold">Practical & Transformational</span> – Step-by-step guidance you can actually apply</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-500 text-xl">•</span>
              <div><span className="font-bold">Learn Your Way</span> – Self-paced video lessons, interactive quizzes, and downloadable workbooks</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-green-500 text-xl">•</span>
              <div><span className="font-bold">Certificates You Can Share</span> – Celebrate your progress and add credibility to your career</div>
            </li>
          </ul>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center">
            🔑 Your Next Step Starts Here
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-xl mb-2">
                📚 <span className="font-bold">Browse Our Courses →</span>
              </p>
              <p className="text-gray-600">Find the right program for your needs.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-xl mb-2">
                �� <span className="font-bold">Enroll Today →</span>
              </p>
              <p className="text-gray-600">Gain instant access to your learning dashboard.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-xl mb-2">
                🎉 <span className="font-bold">Transform Tomorrow →</span>
              </p>
              <p className="text-gray-600">Apply what you learn for real, lasting change.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
          <p className="text-2xl text-gray-900">
            ✨ <span className="font-bold">TheraBrake Academy™</span> isn't just another online school—it's where education meets empowerment.
          </p>
          <div className="mt-8 space-x-4">
            <Link 
              href="/courses" 
              className="inline-block px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-all"
            >
              Start Your Journey
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
