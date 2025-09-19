import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TheraBrake Academy™ - Professional CE Credits & Personal Growth',
  description: 'Pause, Process, Progress. Professional continuing education for mental health professionals and transformational personal development courses.',
  keywords: 'CE credits, Texas LPC, mental health education, counseling courses, continuing education, therapy training',
  authors: [{ name: 'TheraBrake Academy' }],
  creator: 'TheraBrake Academy',
  publisher: 'TheraBrake Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TheraBrake Academy™',
    description: 'Professional CE Credits & Personal Growth Courses',
    url: 'https://therabrake.academy',
    siteName: 'TheraBrake Academy',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheraBrake Academy - Pause, Process, Progress',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheraBrake Academy™',
    description: 'Professional CE Credits & Personal Growth Courses',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
