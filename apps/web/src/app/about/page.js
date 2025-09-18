export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About TheraBrake Academy™</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          At <span className="font-bold">TheraBrake Academy™</span>, we believe growth happens when you take 
          a moment to pause, process, and progress. That's why we've built a learning platform that serves 
          both <span className="font-bold">mental health professionals</span> and{' '}
          <span className="font-bold">individuals seeking personal transformation</span>.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Our academy offers a dual catalog of courses:</h2>
          
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="text-2xl mr-4">🎓</span>
              <div>
                <span className="font-bold">Professional CEU & Development Programs</span> – 
                Accredited continuing education for licensed clinicians, plus practice-building programs 
                like <span className="italic">Leap & Launch!</span> to help professionals grow their 
                careers with confidence and compliance.
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="text-2xl mr-4">🌱</span>
              <div>
                <span className="font-bold">Personal Growth & Empowerment Courses</span> – 
                Transformational programs designed to support healing, resilience, and financial 
                empowerment, covering everything from <span className="italic">Rebuilding After Betrayal</span>{' '}
                to <span className="italic">Financial Literacy & Independence</span>.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Every course is designed to be <span className="font-bold">practical, accessible, and impactful</span>, 
          blending expert instruction with real-world tools. Learners can expect interactive lessons, 
          downloadable workbooks, quizzes, and certificates they can proudly share.
        </p>

        <div className="bg-blue-50 p-8 rounded-xl mb-8">
          <p className="text-xl text-gray-800 mb-4">
            Our mission is simple: <span className="font-bold">to empower professionals and the public 
            with education that creates lasting change</span>—in careers, relationships, health, and 
            personal fulfillment.
          </p>
        </div>

        <p className="text-xl text-gray-900 font-bold text-center">
          At TheraBrake Academy™, you don't just complete courses. You unlock progress.
        </p>

        <div className="mt-12 text-center">
          <a 
            href="/courses" 
            className="inline-block px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all"
          >
            Explore Our Courses
          </a>
        </div>
      </div>
    </div>
  );
}
