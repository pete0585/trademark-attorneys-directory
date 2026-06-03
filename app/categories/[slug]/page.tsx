import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getListingsByCreatorType } from '@/lib/data'
import { CREATOR_TYPES } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = CREATOR_TYPES[slug]
  if (!label) return {}

  return {
    title: `Trademark Attorneys for ${label} | FindTrademarkAttorney.com`,
    description: `Find USPTO-registered trademark attorneys who specialize in ${label}. Compare attorneys by location, specialty, and flat-fee options.`,
    alternates: { canonical: `https://www.findtrademarkattorney.com/categories/${slug}` },
  }
}

export async function generateStaticParams() {
  return Object.keys(CREATOR_TYPES).map((key) => ({ slug: key }))
}

export const revalidate = 3600

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const label = CREATOR_TYPES[slug]
  if (!label) notFound()

  const listings = await getListingsByCreatorType(slug)

  const categoryDescriptions: Record<string, string> = {
    content_creator: 'Trademark attorneys who work with YouTubers, TikTok creators, Instagram influencers, and digital content brands. They understand platform terms of service, merchandise licensing, and creator-specific IP issues.',
    ecommerce: 'Trademark attorneys specializing in e-commerce brands — Etsy sellers, Shopify store owners, Amazon FBA sellers, and D2C product companies. Experienced in product line protection across multiple trademark classes.',
    saas_app: 'IP attorneys who work with software companies, SaaS startups, and mobile app developers. Experienced in tech trademark registration, software copyright, and trade secret protection.',
    podcaster: 'Trademark attorneys who specialize in protecting podcast show names, brand identity, and audio content IP. They understand the nuances of entertainment IP and show format protection.',
    author_coach: 'Attorneys who help authors, coaches, consultants, and online educators protect course names, methodologies, book titles, and personal brand trademarks.',
    small_business: 'General trademark attorneys focused on small business owners — restaurants, retail stores, service businesses, and local brands looking to protect their name and logo.',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/listings" className="inline-flex items-center gap-1 text-sm text-brand-indigo hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" aria-label="Back" /> All Attorneys
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Trademark Attorneys for {label}
        </h1>
        <p className="text-gray-600 max-w-3xl">
          {categoryDescriptions[slug] ?? `Find USPTO-registered trademark attorneys who specialize in working with ${label}.`}
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-surface-border">
          <p className="text-gray-500 text-lg mb-2">No attorneys listed yet for this specialty</p>
          <p className="text-gray-400 text-sm mb-4">Be the first to add your profile.</p>
          <Link href="/submit" className="btn-primary">Add Your Listing</Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{listings.length} attorneys found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
