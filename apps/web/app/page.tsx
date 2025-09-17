export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600">Therabrake Academy</h1>
      <p className="mt-4 text-xl">Professional Development & Training</p>
      <div className="mt-8 space-x-4">
        <a href="/courses" className="bg-orange-500 text-white px-6 py-3 rounded-lg">Browse Courses</a>
        <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</a>
      </div>
    </main>
  )
}
