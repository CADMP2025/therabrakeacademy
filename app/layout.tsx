import './globals.css'
import Navigation from '@/components/layout/Navigation'

export const metadata = {
  title: 'TheraBrake Academy™ - Professional CE Credits & Personal Growth',
  description: 'Pause, Process, Progress. Professional continuing education for mental health professionals and transformational personal development courses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer className="bg-[#1F2937] text-white py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-2 text-[#F3F4F6]">📧 info@therabrake.academy | 📞 (346) 298-2988</p>
            <p className="text-[#9CA3AF]">
              6120 College St. Suite D185, Beaumont, TX 77707
            </p>
            <p className="mt-4 text-sm text-[#9CA3AF]">
              © 2024 TheraBrake Academy™. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
