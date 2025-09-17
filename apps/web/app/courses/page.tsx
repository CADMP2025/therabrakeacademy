export default function CoursesPage() {
  const courses = [
    { id: 1, title: "Ethics for Professional Counselors", category: "CE", ce_hours: 6, price: 199 },
    { id: 2, title: "Trauma & Resilience", category: "CE", ce_hours: 6, price: 189 },
    { id: 3, title: "Telehealth in Counseling", category: "CE", ce_hours: 3, price: 129 },
    { id: 4, title: "Cultural Diversity in Texas", category: "CE", ce_hours: 3, price: 149 },
    { id: 5, title: "Risk Management", category: "CE", ce_hours: 2, price: 99 },
    { id: 6, title: "LEAP AND LAUNCH", category: "Professional", ce_hours: 0, price: 299 },
    { id: 7, title: "Healing Forward", category: "Personal", ce_hours: 0, price: 149 },
    { id: 8, title: "The So What Mindset", category: "Mindset", ce_hours: 0, price: 249 },
    { id: 9, title: "Financial Literacy", category: "Financial", ce_hours: 0, price: 199 },
    { id: 10, title: "Credit Building", category: "Financial", ce_hours: 0, price: 99 },
    { id: 11, title: "Rebuilding After Betrayal", category: "Personal", ce_hours: 0, price: 199 },
    { id: 12, title: "Finding Perfect Match", category: "Personal", ce_hours: 0, price: 129 },
    { id: 13, title: "Cancer Journey", category: "Health", ce_hours: 0, price: 149 },
    { id: 14, title: "Regulating the Storm", category: "CE", ce_hours: 6, price: 189 }
  ]

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Course Catalog</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.category}</p>
              {course.ce_hours > 0 && (
                <p className="text-green-600 font-semibold mb-2">{course.ce_hours} CE Hours</p>
              )}
              <p className="text-2xl font-bold text-blue-600">${course.price}</p>
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
