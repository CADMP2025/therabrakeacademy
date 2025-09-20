import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'TheraBrake Academy™ - Professional CE Credits & Personal Growth',
  description: 'Pause, Process, Progress. Professional continuing education for mental health professionals and transformational personal development courses.',
  keywords: 'CE credits, Texas LPC, mental health education, counseling courses, continuing education',
  authors: [{ name: 'TheraBrake Academy' }],
  icons: {
    icon: [
      { url: '/logo/logo-small.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/logo-small.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/logo/android-chrome-icon.png' },
    ],
  },
  openGraph: {
    title: 'TheraBrake Academy™',
    description: 'Professional CE Credits & Personal Growth Courses',
    url: 'https://therabrake.academy',
    siteName: 'TheraBrake Academy',
    images: [
      {
        url: '/logo/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheraBrake Academy™',
    description: 'Professional CE Credits & Personal Growth Courses',
    images: ['/logo/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
