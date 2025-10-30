import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Building Materials WhatsApp Assistant',
  description: 'Automated pricing assistant for building materials shop',
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
