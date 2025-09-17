import './globals.css'

export const metadata = {
  title: 'Therabrake Academy',
  description: 'Professional Development & Training',
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
