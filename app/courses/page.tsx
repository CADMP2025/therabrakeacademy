import Link from 'next/link'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  ceHours?: number
  price: number
  icon?: string
  category: string
}

const professionalCourses: Course[] = [
  {
    id: 'trauma-telehealth',
    title: 'Building a Trauma-Informed Practice & Telehealth in Counseling',
    subtitle: 'Transform Your Practice for the Modern Era',
    description: "In today's rapidly evolving mental health landscape, understanding trauma's pervasive impact while mastering digital delivery methods isn't optional—it's essential.",
    ceHours: 6,
    price: 197,
    category: 'Professional Development'
  },
  {
    id: 'cultural-diversity',
    title: 'Cultural Diversity in Texas Counseling Practice',
    subtitle: 'Serve Every Texan with Cultural Competence and Confidence',
    description: "Texas's rich cultural tapestry demands counselors who can bridge differences with skill and sensitivity.",
    ceHours: 3,
    price: 127,
    category: 'Professional Development'
  },
  {
    id: 'ethics',
    title: 'Ethics for Professional Counselors',
    subtitle: 'Navigate Complex Ethical Challenges with Clarity and Confidence',
    description: "Ethical dilemmas don't announce themselves—they emerge in the gray areas of practice where textbook answers fall short.",
    ceHours: 6,
    price: 197,
    category: 'Professional Development'
  },
]

const personalCourses: Course[] = [
  {
    id: 'healing-forward',
    title: 'Healing Forward - Relationship Recovery and Personal Reclamation',
    subtitle: 'Reclaim Your Life After Relationship Trauma',
    description: "When a relationship ends—whether through divorce, death, or betrayal—you don't just lose a partner; you lose the future you imagined.",
    price: 197,
    category: 'Personal Growth'
  },
  {
    id: 'so-what-mindset',
    title: 'The So What Mindset - Transformational Thinking and Resilience Training',
    subtitle: 'Transform Obstacles into Opportunities',
    description: 'Life will knock you down—the So What Mindset teaches you to bounce back stronger.',
    price: 247,
    category: 'Personal Growth'
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-blue-600">{course.category}</span>
          {course.ceHours && (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {course.ceHours} CE Hours
            </span>
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-sm text-blue-600 font-medium mb-3">{course.subtitle}</p>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${course.price}</span>
          <Link 
            href={`/course/${course.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-600">Pause, Process, Progress</p>
        </div>
      </section>

      {/* Professional Development Courses */}
      <section id="professional" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🎓</span>
            <h2 className="text-3xl font-bold">Professional Development & CEU Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Personal Development Courses */}
      <section id="personal" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🧠</span>
            <h2 className="text-3xl font-bold">Personal Development Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
