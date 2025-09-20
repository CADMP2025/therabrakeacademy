import Image from 'next/image'
import Link from 'next/link'
import { Clock, Award, ArrowRight, GraduationCap, Brain } from 'lucide-react'

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
    id: 'trauma-telehealth',
    title: 'Building a Trauma-Informed Practice & Telehealth in Counseling',
    subtitle: 'Transform Your Practice for the Modern Era',
    description: "In today's rapidly evolving mental health landscape, understanding trauma's pervasive impact while mastering digital delivery methods isn't optional—it's essential. This comprehensive course equips you with the dual expertise needed to serve clients effectively in both traditional and virtual settings.",
    ceHours: 6,
    price: 197,
    icon: '/images/courses/trauma.svg',
    category: 'Professional Development'
  },
  {
    id: 'cultural-diversity',
    title: 'Cultural Diversity in Texas Counseling Practice',
    subtitle: 'Serve Every Texan with Cultural Competence and Confidence',
    description: "Texas's rich cultural tapestry demands counselors who can bridge differences with skill and sensitivity. This course goes beyond surface-level diversity training to explore the unique cultural dynamics of Texas communities.",
    ceHours: 3,
    price: 127,
    icon: '/images/courses/cultural.svg',
    category: 'Professional Development'
  },
  {
    id: 'ethics',
    title: 'Ethics for Professional Counselors',
    subtitle: 'Navigate Complex Ethical Challenges with Clarity and Confidence',
    description: "Ethical dilemmas don't announce themselves—they emerge in the gray areas of practice where textbook answers fall short. This comprehensive course prepares you for real-world ethical challenges.",
    ceHours: 6,
    price: 197,
    icon: '/images/courses/ethics.svg',
    category: 'Professional Development'
  },
  {
    id: 'regulating-storm',
    title: 'Regulating the Storm: Trauma, Anger, and the Brain',
    subtitle: 'Master the Neuroscience of Emotional Dysregulation',
    description: "When trauma hijacks the brain's alarm system, anger becomes a survival response stuck on repeat. This cutting-edge course reveals the neurobiological connections between trauma and anger.",
    ceHours: 6,
    price: 197,
    icon: '/images/courses/anger.svg',
    category: 'Clinical Skills'
  },
  {
    id: 'risk-management',
    title: 'Risk Management in Counseling',
    subtitle: 'Protect Your Practice, Serve with Peace of Mind',
    description: 'One lawsuit can end a career. This essential course teaches you how to identify and mitigate the hidden risks in counseling practice before they become crises.',
    ceHours: 2,
    price: 97,
    icon: '/images/courses/risk.svg',
    category: 'Professional Development'
  },
  {
    id: 'telehealth',
    title: 'Telehealth in Counseling',
    subtitle: 'Build a Thriving Virtual Practice That Connects and Heals',
    description: "Telehealth isn't just video calls—it's a fundamental shift in how mental health care is delivered. This practical course prepares you to excel in virtual counseling.",
    ceHours: 3,
    price: 127,
    icon: '/images/courses/telehealth.svg',
    category: 'Professional Development'
  },
  {
    id: 'business-ethics',
    title: 'Business Ethics for Mental Health Professionals',
    subtitle: 'Where Clinical Ethics Meets Business Reality',
    description: 'Running an ethical practice requires more than clinical integrity—it demands business ethics that align with your therapeutic values.',
    ceHours: 2,
    price: 97,
    icon: '/images/courses/ethics.svg',
    category: 'Professional Development'
  }
]

const practiceDevCourses: Course[] = [
  {
    id: 'leap-launch',
    title: 'Leap & Launch! - Flagship Business Development Program',
    subtitle: 'Transform Your Counseling Passion into a Thriving Private Practice',
    description: "Stop dreaming about private practice and start building it. This comprehensive program takes you from employee mindset to entrepreneur reality with a proven roadmap developed specifically for mental health professionals.",
    price: 497,
    icon: '/images/courses/leap.svg',
    category: 'Practice Development'
  }
]

const personalCourses: Course[] = [
  {
    id: 'healing-forward',
    title: 'Healing Forward - Relationship Recovery and Personal Reclamation',
    subtitle: 'Reclaim Your Life After Relationship Trauma',
    description: "When a relationship ends—whether through divorce, death, or betrayal—you don't just lose a partner; you lose the future you imagined. This compassionate course guides you through the journey from devastation to renewal.",
    price: 197,
    icon: '/images/courses/healing.svg',
    category: 'Personal Growth'
  },
  {
    id: 'rebuilding-betrayal',
    title: 'Rebuilding After Betrayal - Structured 4-Phase Recovery Framework',
    subtitle: "Transform Betrayal's Devastation into Post-Traumatic Growth",
    description: "Betrayal shatters more than trust—it destroys your sense of reality. This evidence-based program provides a clear pathway through betrayal's chaos using a proven 4-phase framework.",
    price: 247,
    icon: '/images/courses/betrayal.svg',
    category: 'Personal Growth'
  },
  {
    id: 'perfect-match',
    title: 'Finding the Perfect Match - A Self-Guided Journey to Authentic Love',
    subtitle: 'Stop Settling, Start Selecting Your Ideal Partner',
    description: "True love isn't about finding someone perfect—it's about finding someone perfect for YOU. This transformative course helps you break toxic relationship patterns.",
    price: 197,
    icon: '/images/courses/love.svg',
    category: 'Relationships'
  },
  {
    id: 'cancer-journey',
    title: "Cancer Diagnosis: It's Not the End... It's Just the Beginning!",
    subtitle: 'Navigate Your Cancer Journey with Hope, Humor, and Healing',
    description: "A cancer diagnosis changes everything—but it doesn't have to define everything. This unique course provides emotional and practical support for your cancer journey.",
    price: 197,
    icon: '/images/courses/cancer.svg',
    category: 'Health & Wellness'
  },
  {
    id: 'credit-building',
    title: 'Credit Building & Debt Management',
    subtitle: 'Your Friendly Guide to Financial Freedom',
    description: 'Bad credit feels like wearing a scarlet letter in a world that runs on credit scores. This judgment-free course helps you understand, repair, and build credit.',
    price: 147,
    icon: '/images/courses/credit.svg',
    category: 'Financial Wellness'
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy & Independence',
    subtitle: 'Master Money Management for Lifelong Security',
    description: "Financial independence isn't about being rich—it's about having choices. This comprehensive course builds financial literacy from the ground up.",
    price: 197,
    icon: '/images/courses/financial.svg',
    category: 'Financial Wellness'
  },
  {
    id: 'so-what-mindset',
    title: 'The So What Mindset - Transformational Thinking and Resilience Training',
    subtitle: 'Pause, Process, Progress: Transform Obstacles into Opportunities',
    description: 'Life will knock you down—the So What Mindset teaches you to bounce back stronger. This revolutionary approach to resilience combines cognitive reframing with practical problem-solving.',
    price: 247,
    icon: '/images/courses/sowhat.svg',
    category: 'Personal Growth'
  }
]

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-primary">{course.category}</span>
          {course.ceHours && (
            <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-full">
              <Award className="w-4 h-4 text-accent-hover" />
              <span className="text-sm font-medium text-accent-hover">{course.ceHours} CE Hours</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-sm text-primary font-medium mb-3">{course.subtitle}</p>
        <p className="text-sm text-neutral-medium line-clamp-3 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${course.price}</span>
          <Link 
            href={`/course/${course.id}`}
            className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-neutral-medium">Pause, Process, Progress</p>
        </div>
      </section>

      {/* Professional Development Courses */}
      <section id="professional" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Professional Development & CEU Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Practice Development */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Practice Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceDevCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Personal Development Courses */}
      <section id="personal" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold">Personal Development Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary to-secondary text-white">
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
