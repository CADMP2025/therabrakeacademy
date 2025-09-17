#!/bin/bash
echo "🚀 Completing Therabrake Academy setup..."

cd apps/web

# Install Next.js dependencies
npm install next@14.1.0 react@18.2.0 react-dom@18.2.0
npm install -D typescript @types/react @types/react-dom
npm install @supabase/supabase-js @stripe/stripe-js

# Create basic app structure
mkdir -p app
cat > app/layout.tsx << 'LAYOUT'
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
LAYOUT

cat > app/page.tsx << 'PAGE'
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
PAGE

cat > app/globals.css << 'STYLES'
@tailwind base;
@tailwind components;
@tailwind utilities;
STYLES

echo "✅ Setup complete! Starting dev server..."
cd ../..
npm run dev
