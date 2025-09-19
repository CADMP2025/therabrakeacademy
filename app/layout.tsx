import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TheraBrake Academy™ - Professional CE Credits & Personal Growth',
  description: 'Pause, Process, Progress. Professional continuing education for mental health professionals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
