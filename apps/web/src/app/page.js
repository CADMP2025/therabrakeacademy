export default function HomePage() {
  return (
    <div>
      {/* Test if basic styling works */}
      <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
          🧠 TheraBrake Academy™
        </h1>
        <p style={{ fontSize: '24px', marginBottom: '10px' }}>
          Pause, Process, Progress
        </p>
        <p style={{ fontSize: '16px', marginBottom: '40px' }}>
          If you can see this styled correctly, the page is working!
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a 
            href="/courses" 
            style={{
              padding: '15px 30px',
              backgroundColor: 'white',
              color: '#3B82F6',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Browse Courses
          </a>
          <a 
            href="/auth/register" 
            style={{
              padding: '15px 30px',
              backgroundColor: '#F97316',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Test if Tailwind classes work */}
      <div className="bg-blue-600 text-white p-8 text-center">
        <p className="text-2xl">If this has a blue background, Tailwind is working!</p>
      </div>

      {/* Inline styled content */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Featured Courses
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Course Card 1 */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚖️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Ethics for Professional Counselors
            </h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>6 CE Hours • Texas LPC Approved</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F97316' }}>$99</p>
          </div>

          {/* Course Card 2 */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌱</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              Trauma-Informed Practice
            </h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>6 CE Hours • NBCC Approved</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F97316' }}>$99</p>
          </div>

          {/* Course Card 3 */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🚀</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
              LEAP AND LAUNCH!
            </h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>Build Your Private Practice</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F97316' }}>$149</p>
          </div>
        </div>
      </div>
    </div>
  );
}
