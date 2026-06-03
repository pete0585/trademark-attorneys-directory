import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug } from '@/lib/data'
import ListingDetail from '@/components/ListingDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return {}

  const title = listing.law_firm_name
    ? `${listing.full_name} — ${listing.law_firm_name}`
    : listing.full_name

  const desc = `${listing.full_name} is a USPTO-registered trademark attorney in ${listing.city}, ${listing.state}${listing.law_firm_name ? ` at ${listing.law_firm_name}` : ''}. Find contact info, specialties, and more.`

  return {
    title: `${title} | Trademark Attorney in ${listing.city}, ${listing.state}`,
    description: desc,
    alternates: { canonical: `https://www.findtrademarkattorney.com/listings/${slug}` },
    openGraph: {
      title: `${title} — Trademark Attorney`,
      description: desc,
      type: 'profile',
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'LegalService'],
    name: listing.full_name,
    jobTitle: 'Trademark Attorney',
    ...(listing.law_firm_name && { worksFor: { '@type': 'LegalService', name: listing.law_firm_name } }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.state,
      addressCountry: 'US',
    },
    ...(listing.phone && { telephone: listing.phone }),
    ...(listing.website && { url: listing.website }),
    ...(listing.photo_url && { image: listing.photo_url }),
    ...(listing.bio && { description: listing.bio }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetail listing={listing} />
    </>
  )
}
