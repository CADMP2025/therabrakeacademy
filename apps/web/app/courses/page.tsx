export default function CoursesPage() {
  const courses = [
    { id: 1, title: "Ethics for Professional Counselors", category: "CE", ce_hours: 6, price: 199 },
    { id: 2, title: "Trauma & Resilience", category: "CE", ce_hours: 6, price: 189 },
    { id: 3, title: "Telehealth in Counseling", category: "CE", ce_hours: 3, price: 129 },
    { id: 4, title: "Cultural Diversity in Texas", category: "CE", ce_hours: 3, price: 149 },
    { id: 5, title: "Risk Management", category: "CE", ce_hours: 2, price: 99 },
    { id: 6, title: "Regulating the Storm", category: "CE", ce_hours: 6, price: 189 },
    { id: 7, title: "LEAP AND LAUNCH", category: "Professional", ce_hours: 0, price: 299 },
    { id: 8, title: "Healing Forward", category: "Personal", ce_hours: 0, price: 149 },
    { id: 9, title: "Rebuilding After Betrayal", category: "Personal", ce_hours: 0, price: 199 },
    { id: 10, title: "Finding Perfect Match", category: "Personal", ce_hours: 0, price: 129 },
    { id: 11, title: "Cancer Journey", category: "Health", ce_hours: 0, price: 149 },
    { id: 12, title: "Credit Building", category: "Financial", ce_hours: 0, price: 99 },
    { id: 13, title: "Financial Literacy", category: "Financial", ce_hours: 0, price: 199 },
    { id: 14, title: "The So What Mindset", category: "Mindset", ce_hours: 0, price: 249 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">Therabrake Academy</a>
          <nav className="space-x-6">
            <a href="/" className="hover:text-blue-200">Home</a>
            <a href="/courses" className="hover:text-blue-200 font-semibold">Courses</a>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Course Catalog</h1>
        <p className="text-gray-600 mb-8">14 Professional Development & CE Courses</p>
        
        <div className="mb-6 text-center p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">✓ Texas LPC Approved • 26 Total CE Hours Available</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.category}</p>
              </div>
              
              {course.ce_hours > 0 && (
                <div className="mb-3 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {course.ce_hours} CE Hours
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-3xl font-bold text-blue-600">${course.price}</p>
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
