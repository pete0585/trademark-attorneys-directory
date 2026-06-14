import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const SITE_URL = 'https://trademarksearchdirectory.com'

export const metadata: Metadata = {
  title: {
    default: 'Find a Trademark Attorney | TrademarksearchDirectory.com',
    template: '%s | TrademarksearchDirectory.com',
  },
  description:
    'Find a trademark attorney near you. Search 1,000+ USPTO-registered IP lawyers by city, state, and specialty. Free to search. Trademark registration, enforcement, and brand protection.',
  keywords: [
    'trademark attorney',
    'trademark lawyer',
    'USPTO registration',
    'trademark registration',
    'IP attorney',
    'intellectual property lawyer',
    'trademark enforcement',
    'brand protection attorney',
    'trademark attorney near me',
  ],
  authors: [{ name: 'TrademarksearchDirectory.com' }],
  creator: 'TrademarksearchDirectory.com',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'TrademarksearchDirectory.com',
    title: 'Find a Trademark Attorney | TrademarksearchDirectory.com',
    description:
      'Find a trademark attorney near you. 1,000+ USPTO-registered IP lawyers. Free to search.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'TrademarksearchDirectory.com — Find a Trademark Attorney',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Trademark Attorney | TrademarksearchDirectory.com',
    description: 'Find a trademark attorney near you. 1,000+ USPTO-registered IP lawyers.',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
