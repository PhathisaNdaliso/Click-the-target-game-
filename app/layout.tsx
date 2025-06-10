import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Click the Target Game',
  description: 'A fun, browser-based reaction game where players click on moving targets to score points against a countdown timer.',
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