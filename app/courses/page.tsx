import Link from 'next/link'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  ceHours?: number
  price: number
  icon: string
  category: string
}

const professionalCourses: Course[] = [
  {
    id: 'ethics',
    title: 'Ethics for Professional Counselors',
    subtitle: 'Navigate Complex Ethical Challenges with Clarity and Confidence',
    description: "Ethical dilemmas don't announce themselves—they emerge in the gray areas of practice where textbook answers fall short.",
    ceHours: 6,
    price: 197,
    icon: '⚖️',
    category: 'Professional Development'
  },
  {
    id: 'trauma-telehealth',
    title: 'Building a Trauma-Informed Practice & Telehealth in Counseling',
    subtitle: 'Transform Your Practice for the Modern Era',
    description: "Understanding trauma's pervasive impact while mastering digital delivery methods for effective client service.",
    ceHours: 6,
    price: 197,
    icon: '🌱',
    category: 'Professional Development'
  },
  {
    id: 'telehealth',
    title: 'Telehealth in Counseling',
    subtitle: 'Build a Thriving Virtual Practice That Connects and Heals',
    description: "Telehealth isn't just video calls—it's a fundamental shift in how mental health care is delivered.",
    ceHours: 3,
    price: 127,
    icon: '💻',
    category: 'Professional Development'
  },
  {
    id: 'cultural-diversity',
    title: 'Cultural Diversity in Texas Counseling Practice',
    subtitle: 'Serve Every Texan with Cultural Competence and Confidence',
    description: "Texas's rich cultural tapestry demands counselors who can bridge differences with skill and sensitivity.",
    ceHours: 3,
    price: 127,
    icon: '🌍',
    category: 'Professional Development'
  },
  {
    id: 'regulating-storm',
    title: 'Regulating the Storm: Trauma, Anger, and the Brain',
    subtitle: 'Master the Neuroscience of Emotional Dysregulation',
    description: "When trauma hijacks the brain's alarm system, anger becomes a survival response stuck on repeat.",
    ceHours: 6,
    price: 197,
    icon: '🌱',
    category: 'Clinical Skills'
  },
  {
    id: 'risk-management',
    title: 'Risk Management in Counseling',
    subtitle: 'Protect Your Practice, Serve with Peace of Mind',
    description: 'One lawsuit can end a career. Learn to identify and mitigate hidden risks in counseling practice.',
    ceHours: 2,
    price: 97,
    icon: '🧩',
    category: 'Professional Development'
  },
  {
    id: 'business-ethics',
    title: 'Business Ethics for Mental Health Professionals',
    subtitle: 'Where Clinical Ethics Meets Business Reality',
    description: 'Running an ethical practice requires business ethics that align with your therapeutic values.',
    ceHours: 2,
    price: 97,
    icon: '👥💡',
    category: 'Professional Development'
  }
]

const personalCourses: Course[] = [
  {
    id: 'leap-launch',
    title: 'Leap & Launch! - Flagship Business Development Program',
    subtitle: 'Transform Your Counseling Passion into a Thriving Private Practice',
    description: "Stop dreaming about private practice and start building it with our proven roadmap.",
    price: 497,
    icon: '🚀',
    category: 'Practice Development'
  },
  {
    id: 'credit-building',
    title: 'Credit Building & Debt Management',
    subtitle: 'Your Friendly Guide to Financial Freedom',
    description: 'Bad credit feels like wearing a scarlet letter. This judgment-free course helps you rebuild.',
    price: 147,
    icon: '💳',
    category: 'Financial Wellness'
  },
  {
    id: 'healing-forward',
    title: 'Healing Forward - Relationship Recovery and Personal Reclamation',
    subtitle: 'Reclaim Your Life After Relationship Trauma',
    description: "When a relationship ends, you don't just lose a partner; you lose the future you imagined.",
    price: 197,
    icon: '💔➡️❤️',
    category: 'Personal Growth'
  },
  {
    id: 'rebuilding-betrayal',
    title: 'Rebuilding After Betrayal - Structured 4-Phase Recovery Framework',
    subtitle: "Transform Betrayal's Devastation into Post-Traumatic Growth",
    description: "Betrayal shatters more than trust—it destroys your sense of reality. Find your path to recovery.",
    price: 247,
    icon: '🌉',
    category: 'Personal Growth'
  },
  {
    id: 'perfect-match',
    title: 'Finding the Perfect Match - A Self-Guided Journey to Authentic Love',
    subtitle: 'Stop Settling, Start Selecting Your Ideal Partner',
    description: "True love isn't about finding someone perfect—it's about finding someone perfect for YOU.",
    price: 197,
    icon: '❤️🔍',
    category: 'Relationships'
  },
  {
    id: 'cancer-journey',
    title: "Cancer Diagnosis: It's Not the End... It's Just the Beginning!",
    subtitle: 'Navigate Your Cancer Journey with Hope, Humor, and Healing',
    description: "A cancer diagnosis changes everything—but it doesn't have to define everything.",
    price: 197,
    icon: '🌅',
    category: 'Health & Wellness'
  },
  {
    id: 'so-what-mindset',
    title: 'The So What Mindset™ - Transformational Thinking and Resilience Training',
    subtitle: 'Transform Obstacles into Opportunities',
    description: 'Life will knock you down—the So What Mindset teaches you to bounce back stronger.',
    price: 247,
    icon: '🧠⚡',
    category: 'Personal Growth'
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy & Independence',
    subtitle: 'Master Money Management for Lifelong Security',
    description: "Financial independence isn't about being rich—it's about having choices.",
    price: 197,
    icon: '💰📈',
    category: 'Financial Wellness'
  }
]

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden group">
      <div className="h-32 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 flex items-center justify-center">
        <span className="text-6xl">{course.icon}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#3B82F6]">{course.category}</span>
          {course.ceHours && (
            <span className="text-sm bg-[#FACC15]/20 text-[#1F2937] px-2 py-1 rounded font-medium">
              {course.ceHours} CE Hours
            </span>
          )}
        </div>
        <h3 className="font-bold text-lg mb-2 text-[#1F2937]">{course.title}</h3>
        <p className="text-sm text-[#3B82F6] font-medium mb-3">{course.subtitle}</p>
        <p className="text-sm text-[#9CA3AF] line-clamp-3 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#1F2937]">${course.price}</span>
          <Link 
            href={`/course/${course.id}`}
            className="text-[#F97316] hover:text-[#FB923C] font-medium transition-colors"
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F3F4F6]">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1F2937]">Course Catalog</h1>
          <p className="text-xl text-[#9CA3AF]">Pause, Process, Progress</p>
        </div>
      </section>

      {/* Professional Development Courses */}
      <section id="professional" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🎓</span>
            <h2 className="text-3xl font-bold text-[#1F2937]">Professional Development & CEU Courses</h2>
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
            <h2 className="text-3xl font-bold text-[#1F2937]">Personal Development Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg">
            <em>Each course includes comprehensive workbooks, practical exercises, and lifetime access to materials. 
            Texas counselors earn CE credits approved by the Texas LPC Board. Join TheraBrake Academy and start 
            your journey of professional and personal transformation today.</em>
          </p>
        </div>
      </section>
    </div>
  )
}
