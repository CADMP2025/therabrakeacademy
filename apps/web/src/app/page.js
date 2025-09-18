export default function HomePage() {
  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', color: 'blue' }}>TEST PAGE - NEW DEPLOYMENT</h1>
      <p style={{ fontSize: '24px' }}>If you see this, the deployment worked!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </main>
  );
}
