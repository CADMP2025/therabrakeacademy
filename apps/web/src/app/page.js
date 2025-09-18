export default function HomePage() {
  return (
    <main style={{ padding: '50px', textAlign: 'center', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '48px', color: 'blue', marginBottom: '20px' }}>
        🧠 DEPLOYMENT TEST SUCCESSFUL!
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '10px' }}>
        The old page.tsx has been removed
      </p>
      <p style={{ fontSize: '18px', color: 'green', marginBottom: '30px' }}>
        This is the NEW page.js file
      </p>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Deployment Time: {new Date().toLocaleString()}
      </p>
      <div style={{ marginTop: '40px' }}>
        <a href="/courses" style={{ 
          padding: '15px 30px', 
          backgroundColor: '#3B82F6', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px',
          fontSize: '18px'
        }}>
          View Courses
        </a>
      </div>
    </main>
  );
}
