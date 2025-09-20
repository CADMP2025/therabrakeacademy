import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
