export default function CoursesPage() {
  const courses = [
    { 
      id: 1, 
      title: "Ethics for Professional Counselors", 
      category: "CE", 
      ce_hours: 6, 
      price: 199,
      icon: "⚖️",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #fbbf24 100%)",
      description: "Professional Standards"
    },
    { 
      id: 2, 
      title: "Trauma & Resilience", 
      category: "CE", 
      ce_hours: 6, 
      price: 189,
      icon: "🌱",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #10b981 100%)",
      description: "Healing & Growth"
    },
    { 
      id: 3, 
      title: "Telehealth in Counseling", 
      category: "CE", 
      ce_hours: 3, 
      price: 129,
      icon: "💻",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #9ca3af 100%)",
      description: "Virtual Counseling"
    },
    { 
      id: 4, 
      title: "Cultural Diversity in Texas", 
      category: "CE", 
      ce_hours: 3, 
      price: 149,
      icon: "🌍",
      gradient: "linear-gradient(135deg, #f97316 0%, #a855f7 50%, #3b82f6 100%)",
      description: "Diversity & Unity"
    },
    { 
      id: 5, 
      title: "Risk Management", 
      category: "CE", 
      ce_hours: 2, 
      price: 99,
      icon: "🛡️",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #6b7280 100%)",
      description: "Practice Protection"
    },
    { 
      id: 6, 
      title: "Regulating the Storm", 
      category: "CE", 
      ce_hours: 6, 
      price: 189,
      icon: "⛈️",
      secondaryIcon: "☀️",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #facc15 100%)",
      description: "Trauma & Anger"
    },
    { 
      id: 7, 
      title: "LEAP AND LAUNCH", 
      category: "Professional", 
      ce_hours: 0, 
      price: 299,
      icon: "🚀",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #f97316 100%)",
      description: "Private Practice Success"
    },
    { 
      id: 8, 
      title: "Healing Forward", 
      category: "Personal", 
      ce_hours: 0, 
      price: 149,
      icon: "💔",
      secondaryIcon: "❤️",
      arrowIcon: "➡️",
      gradient: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
      description: "Relationship Recovery"
    },
    { 
      id: 9, 
      title: "Rebuilding After Betrayal", 
      category: "Personal", 
      ce_hours: 0, 
      price: 199,
      icon: "🌉",
      gradient: "linear-gradient(135deg, #6b7280 0%, #fbbf24 100%)",
      description: "After Betrayal"
    },
    { 
      id: 10, 
      title: "Finding Perfect Match", 
      category: "Personal", 
      ce_hours: 0, 
      price: 129,
      icon: "❤️",
      secondaryIcon: "🔍",
      gradient: "linear-gradient(135deg, #ef4444 0%, #f9a8d4 100%)",
      description: "Finding True Love"
    },
    { 
      id: 11, 
      title: "Cancer Journey", 
      category: "Health", 
      ce_hours: 0, 
      price: 149,
      icon: "🌅",
      gradient: "linear-gradient(to top, #374151 0%, #fbbf24 100%)",
      description: "New Beginning"
    },
    { 
      id: 12, 
      title: "Credit Building", 
      category: "Financial", 
      ce_hours: 0, 
      price: 99,
      icon: "💳",
      gradient: "linear-gradient(135deg, #10b981 0%, #fbbf24 100%)",
      description: "Financial Health"
    },
    { 
      id: 13, 
      title: "Financial Literacy", 
      category: "Financial", 
      ce_hours: 0, 
      price: 199,
      icon: "💰",
      secondaryIcon: "📈",
      gradient: "linear-gradient(135deg, #10b981 0%, #fbbf24 100%)",
      description: "Wealth Building"
    },
    { 
      id: 14, 
      title: "The So What Mindset", 
      category: "Mindset", 
      ce_hours: 0, 
      price: 249,
      icon: "🧠",
      secondaryIcon: "⚡",
      gradient: "linear-gradient(135deg, #a855f7 0%, #f97316 100%)",
      description: "Transformational Thinking"
    }
  ];

  const categoryColors = {
    CE: "#3B82F6",
    Professional: "#10B981", 
    Personal: "#EC4899",
    Health: "#FACC15",
    Financial: "#10B981",
    Mindset: "#A855F7"
  };

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
              <a href="/courses" className="hover:text-blue-200 font-semibold border-b-2 border-white pb-1">Courses</a>
              <a href="/about" className="hover:text-blue-200 transition">About</a>
              <a href="/contact" className="hover:text-blue-200 transition">Contact</a>
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition">
                Login
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Professional Development & Training
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            14 Comprehensive Courses • 26 CE Hours Available
          </p>
          
          <div className="inline-flex items-center gap-3 p-4 bg-green-100 rounded-xl">
            <span className="text-2xl">✅</span>
            <span className="text-green-800 font-semibold">
              Texas LPC Approved • NBCC Provider #87569
            </span>
          </div>
        </div>
      </div>

      {/* Course Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-wrap justify-center gap-2">
          {['All Courses', 'CE Courses', 'Professional', 'Personal', 'Health', 'Financial', 'Mindset'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                tab === 'All Courses' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Course Icon Header */}
              <div 
                className="h-32 flex items-center justify-center relative"
                style={{ background: course.gradient }}
              >
                <div className="text-5xl">
                  {course.icon}
                  {course.arrowIcon && (
                    <span className="text-3xl mx-1">{course.arrowIcon}</span>
                  )}
                  {course.secondaryIcon && (
                    <span className={course.arrowIcon ? "text-5xl" : "text-4xl ml-1"}>
                      {course.secondaryIcon}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Course Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                    style={{ backgroundColor: categoryColors[course.category] }}
                  >
                    {course.category}
                  </span>
                  {course.ce_hours > 0 && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                      {course.ce_hours} CE Hours
                    </span>
                  )}
                </div>
                
                {/* Price and CTA */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-3xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      one-time
                    </span>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who have transformed their practice
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
              Browse All Courses
            </button>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}