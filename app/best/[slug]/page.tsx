import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { getListingsByCity } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'

interface Props {
  params: Promise<{ slug: string }>
}

interface BestOfPage {
  city: string
  state: string
  stateAbbr: string
  intro: string
  whyMatters: string
  criteria: string[]
}

const BEST_OF_PAGES: Record<string, BestOfPage> = {
  'trademark-attorneys-new-york-ny': {
    city: 'New York',
    state: 'New York',
    stateAbbr: 'NY',
    intro:
      'New York City is one of the most competitive brand markets in the world. Fashion labels, media companies, content empires, and thousands of startups all converge here — and all need their brand identity protected. These are the top-rated trademark attorneys in New York listed on FindTrademarkAttorney.com, based on listing completeness, verified status, and creator-focused specialization.',
    whyMatters:
      'In New York\'s crowded market, brand identity is business identity. The city\'s legal community includes some of the most experienced trademark attorneys in the country, many of whom specialize in the industries New York is known for: fashion, media, entertainment, finance, and tech.',
    criteria: [
      'USPTO-registered practitioners with verified profiles',
      'Featured or Verified listing tier — attorneys who\'ve invested in their profile',
      'Specialized in creator-economy clients, e-commerce, or startup IP',
      'Demonstrated practice focus in trademark and brand protection',
    ],
  },
  'trademark-attorneys-los-angeles-ca': {
    city: 'Los Angeles',
    state: 'California',
    stateAbbr: 'CA',
    intro:
      'Los Angeles is the entertainment and creator capital of the world. YouTube channels, fashion brands, music labels, D2C product companies, and Hollywood entertainment IP all need trademark protection in a city where brand identity is currency. These are the top-rated trademark attorneys in Los Angeles on FindTrademarkAttorney.com.',
    whyMatters:
      'LA trademark attorneys understand the creator economy at a depth that attorneys in other markets often don\'t. From merchandise licensing to platform-specific IP disputes, the best Los Angeles trademark attorneys have seen it all in one of the most brand-dense cities in America.',
    criteria: [
      'USPTO-registered practitioners with verified profiles',
      'Featured or Verified listing tier on FindTrademarkAttorney.com',
      'Experience with creator economy, entertainment, or e-commerce clients',
      'Active trademark practice with a focus on brand protection',
    ],
  },
  'trademark-attorneys-austin-tx': {
    city: 'Austin',
    state: 'Texas',
    stateAbbr: 'TX',
    intro:
      'Austin\'s transformation into a major tech and creator hub has made trademark protection a business priority for its founders and entrepreneurs. From SaaS startups to content creators to CPG brands, Austin\'s brand ecosystem is one of the fastest-growing in the country. These are the top-rated trademark attorneys in Austin listed on FindTrademarkAttorney.com.',
    whyMatters:
      'Austin\'s startup scene demands trademark attorneys who understand early-stage IP strategy — not just form filing. The best Austin trademark attorneys help founders protect their brand before someone else beats them to it, and structure IP strategy that scales with their business.',
    criteria: [
      'USPTO-registered practitioners with verified profiles',
      'Featured or Verified listing tier on FindTrademarkAttorney.com',
      'Experience working with startups, creators, or tech companies',
      'Proactive IP strategy alongside standard registration services',
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(BEST_OF_PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = BEST_OF_PAGES[slug]
  if (!page) return {}

  return {
    title: `Best Trademark Attorneys in ${page.city}, ${page.state} | FindTrademarkAttorney.com`,
    description: `Top USPTO-registered trademark attorneys in ${page.city}, ${page.state}. Specialized in creators, e-commerce brands, and small business IP.`,
    alternates: {
      canonical: `https://www.findtrademarkattorney.com/best/${slug}`,
    },
  }
}

export const revalidate = 3600

export default async function BestOfPage({ params }: Props) {
  const { slug } = await params
  const page = BEST_OF_PAGES[slug]
  if (!page) notFound()

  const { city, state, stateAbbr, intro, whyMatters, criteria } = page
  const listings = await getListingsByCity(city, stateAbbr)

  const featured = listings.filter((l) => l.plan_tier === 'featured')
  const verified = listings.filter((l) => l.plan_tier === 'verified')
  const displayListings = featured.length > 0 ? [...featured, ...verified].slice(0, 9) : listings.slice(0, 9)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-indigo transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-brand-indigo transition-colors">
          Attorneys
        </Link>
        <span>/</span>
        <span className="text-gray-900">
          Best in {city}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-brand-amber text-sm font-semibold mb-2">
          <Star className="w-4 h-4 fill-brand-amber" aria-label="Best of" />
          Top-Rated Attorneys
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Best Trademark Attorneys in {city}, {state}
        </h1>
        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">{intro}</p>
      </div>

      {/* Selection Criteria */}
      <div className="bg-brand-indigo/5 border border-brand-indigo/20 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-3">How We Select These Attorneys</h2>
        <ul className="space-y-2">
          {criteria.map((criterion, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-indigo shrink-0" />
              {criterion}
            </li>
          ))}
        </ul>
      </div>

      {/* Listings */}
      {displayListings.length === 0 ? (
        <div className="bg-white border border-surface-border rounded-xl p-10 text-center mb-10">
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" aria-label="Location" />
          <p className="text-gray-600 font-medium mb-2">
            No featured attorneys listed yet in {city}
          </p>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Trademark attorneys can serve clients nationwide. Browse all attorneys or add your
            {city} practice profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="btn-primary">
              Browse All Attorneys
            </Link>
            <Link href="/submit" className="btn-outline">
              Add Your Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-4">
            {displayListings.length} attorney{displayListings.length !== 1 ? 's' : ''} in{' '}
            {city}, {state}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="mt-6">
            <Link href={`/trademark-attorneys/${city.toLowerCase().replace(/ /g, '-')}-${stateAbbr.toLowerCase()}`} className="btn-outline">
              View all trademark attorneys in {city}
            </Link>
          </div>
        </div>
      )}

      {/* Why It Matters */}
      <section className="bg-white border border-surface-border rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Why Trademark Protection Matters in {city}
        </h2>
        <p className="text-gray-600 leading-relaxed">{whyMatters}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/guides/what-is-trademark-registration" className="btn-outline text-sm">
            What is trademark registration?
          </Link>
          <Link href="/guides/how-to-choose-a-trademark-attorney" className="btn-outline text-sm">
            How to choose an attorney
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-brand-indigo rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-2">
            Are you a trademark attorney in {city}?
          </h2>
          <p className="text-blue-200 text-sm max-w-lg">
            Get your practice in front of creators and businesses actively looking for trademark
            help in {city}. Claim your free listing or add your profile today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link href="/submit" className="btn-primary whitespace-nowrap">
            Add Your Listing
          </Link>
          <Link
            href="/listings"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm text-center whitespace-nowrap"
          >
            Find Your Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
