export default function CoursesPage() {
  const courses = [
    { title: "Ethics for Professional Counselors", hours: 6, price: 149 },
    { title: "Trauma & Resilience", hours: 6, price: 129 },
    { title: "Telehealth in Counseling", hours: 3, price: 79 },
    { title: "Cultural Diversity in Texas", hours: 3, price: 89 },
    { title: "LEAP AND LAUNCH!", hours: 0, price: 299 },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Course Catalog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.title} className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            {course.hours > 0 && <p className="text-green-600 mb-2">{course.hours} CE Hours</p>}
            <p className="text-2xl font-bold">${course.price}</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
