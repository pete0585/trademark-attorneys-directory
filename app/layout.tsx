import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Find Trademark Attorney | Trademark Attorney Directory for Creators & Small Business',
    template: '%s | FindTrademarkAttorney.com',
  },
  description: 'Find a USPTO-registered trademark attorney who specializes in creators, e-commerce brands, SaaS, and small business. Search by state, specialty, and creator type.',
  metadataBase: new URL('https://www.findtrademarkattorney.com'),
  openGraph: {
    type: 'website',
    siteName: 'FindTrademarkAttorney.com',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
