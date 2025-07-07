import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Website Dusun Kalibulus',
  description: 'Website resmi Dusun Kalibulus, Kalurahan Bimomartani',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}