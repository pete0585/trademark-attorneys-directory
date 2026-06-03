import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { getListingsByState, getCitiesByState } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'

interface Props {
  params: Promise<{ state: string }>
}

interface StatePageData {
  abbr: string
  name: string
  description: string
  majorCities: string[]
  keyIndustries: string[]
}

const STATE_PAGES: Record<string, StatePageData> = {
  california: {
    abbr: 'CA',
    name: 'California',
    description:
      'California is home to Silicon Valley, Hollywood, and one of the most brand-dense startup ecosystems in the world. From SaaS companies in San Francisco to content creators in Los Angeles and DTC brands throughout the state, California businesses face intense brand competition that makes trademark registration a baseline business requirement — not an afterthought.',
    majorCities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Oakland', 'Fresno', 'Long Beach'],
    keyIndustries: ['Tech & SaaS', 'Entertainment & Media', 'E-commerce & DTC Brands', 'Fashion & Apparel', 'Food & Beverage', 'Content Creation'],
  },
  'new-york': {
    abbr: 'NY',
    name: 'New York',
    description:
      'New York is the financial, fashion, and media capital of the country — and a globally recognized brand battleground. Whether you\'re a creator building a brand in Brooklyn, a fashion label in Manhattan, or a fintech startup in Midtown, New York\'s competitive market makes trademark protection essential from day one.',
    majorCities: ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse', 'White Plains', 'Brooklyn', 'Queens'],
    keyIndustries: ['Finance & Fintech', 'Fashion & Luxury', 'Media & Entertainment', 'Food & Hospitality', 'Tech Startups', 'E-commerce'],
  },
  texas: {
    abbr: 'TX',
    name: 'Texas',
    description:
      'Texas has become one of the fastest-growing markets for startups, creators, and consumer brands. Austin\'s tech boom, Houston\'s energy and healthcare sectors, Dallas\'s corporate headquarters, and San Antonio\'s military and healthcare communities all drive demand for trademark attorneys who understand diverse industries and a rapidly evolving business landscape.',
    majorCities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi'],
    keyIndustries: ['Tech & SaaS (Austin)', 'Energy & Industrial', 'Healthcare & Medical', 'Retail & CPG', 'Real Estate', 'Content Creation'],
  },
  florida: {
    abbr: 'FL',
    name: 'Florida',
    description:
      'Florida\'s no-income-tax, business-friendly environment has made it a destination for entrepreneurs, remote-first creators, and growing consumer brands. Miami\'s Latin American business connections, Orlando\'s hospitality and tourism brands, and Tampa\'s growing tech scene all create distinct IP protection needs across industries.',
    majorCities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Fort Lauderdale', 'Tallahassee'],
    keyIndustries: ['Tourism & Hospitality', 'Real Estate', 'Healthcare & Wellness', 'E-commerce & DTC', 'Latin American Market Brands', 'Tech & Software'],
  },
  illinois: {
    abbr: 'IL',
    name: 'Illinois',
    description:
      'Illinois — and Chicago in particular — has a deep commercial tradition spanning food and beverage, manufacturing, finance, and a growing tech and creator economy. The state\'s diverse industries create demand for trademark attorneys across a wide range of classes and specializations.',
    majorCities: ['Chicago', 'Aurora', 'Joliet', 'Naperville', 'Rockford', 'Springfield', 'Elgin', 'Peoria'],
    keyIndustries: ['Food & Beverage', 'Manufacturing & Industrial', 'Financial Services', 'Healthcare', 'Tech & Software', 'Consumer Brands'],
  },
}

export async function generateStaticParams() {
  return Object.keys(STATE_PAGES).map((state) => ({ state }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const data = STATE_PAGES[state]
  if (!data) return {}

  return {
    title: `${data.name} Trademark Attorneys Directory | FindTrademarkAttorney.com`,
    description: `Find USPTO-registered trademark attorneys in ${data.name}. Search by city, specialty, and creator type. Free to use.`,
    alternates: {
      canonical: `https://www.findtrademarkattorney.com/states/${state}`,
    },
  }
}

export const revalidate = 3600

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const data = STATE_PAGES[state]
  if (!data) notFound()

  const { abbr, name, description, majorCities, keyIndustries } = data

  const [listings, cities] = await Promise.all([
    getListingsByState(abbr),
    getCitiesByState(abbr),
  ])

  const featured = listings.filter((l) => l.listing_tier === 'featured').slice(0, 3)
  const cityBreakdown = cities.slice(0, 10)

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
        <span className="text-gray-900">{name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-brand-indigo text-sm font-semibold mb-2">
          <MapPin className="w-4 h-4" aria-label="State" />
          {name} Directory
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {name} Trademark Attorney Directory
        </h1>
        <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">{description}</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-surface-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-brand-indigo">{listings.length}+</p>
          <p className="text-xs text-gray-500 mt-0.5">Attorneys in {name}</p>
        </div>
        <div className="bg-white border border-surface-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-brand-indigo">{cityBreakdown.length}+</p>
          <p className="text-xs text-gray-500 mt-0.5">Cities Covered</p>
        </div>
        <div className="bg-white border border-surface-border rounded-xl p-4 text-center hidden sm:block">
          <p className="text-2xl font-bold text-brand-indigo">USPTO</p>
          <p className="text-xs text-gray-500 mt-0.5">Verified Practitioners</p>
        </div>
      </div>

      {/* Featured Listings */}
      {featured.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Featured Attorneys in {name}</h2>
            <Link
              href={`/listings?state=${abbr}`}
              className="text-sm text-brand-indigo hover:underline font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" aria-label="Arrow" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* City Breakdown */}
      {cityBreakdown.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Browse by City in {name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cityBreakdown.map(({ city, count }) => {
              const citySlug = `${city.toLowerCase().replace(/ /g, '-')}-${abbr.toLowerCase()}`
              return (
                <Link
                  key={city}
                  href={`/trademark-attorneys/${citySlug}`}
                  className="flex items-center justify-between px-4 py-3 bg-white border border-surface-border rounded-lg hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-sm group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-brand-indigo">
                    {city}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{count}</span>
                </Link>
              )
            })}
          </div>
          <div className="mt-4">
            <Link href={`/listings?state=${abbr}`} className="btn-outline text-sm">
              View all {name} attorneys
            </Link>
          </div>
        </section>
      )}

      {/* No listings fallback */}
      {listings.length === 0 && (
        <div className="bg-white border border-surface-border rounded-xl p-10 text-center mb-10">
          <p className="text-gray-600 font-medium mb-2">
            No attorneys listed yet in {name}
          </p>
          <p className="text-gray-400 text-sm mb-6">
            We&apos;re growing our database. Browse all attorneys or submit your profile.
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
      )}

      {/* Major cities browsable even before listings */}
      {listings.length === 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Major {name} Cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {majorCities.map((city) => {
              const citySlug = `${city.toLowerCase().replace(/ /g, '-')}-${abbr.toLowerCase()}`
              return (
                <Link
                  key={city}
                  href={`/trademark-attorneys/${citySlug}`}
                  className="flex items-center justify-between px-4 py-3 bg-white border border-surface-border rounded-lg hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-sm group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-brand-indigo">
                    {city}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-indigo"
                    aria-label="View"
                  />
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Key Industries */}
      <section className="bg-white border border-surface-border rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Key Industries Served in {name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {name} trademark attorneys work across a range of industries. Browse attorneys by creator
          type to find the right specialist for your brand.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {keyIndustries.map((industry) => (
            <span
              key={industry}
              className="px-3 py-1 bg-brand-indigo/5 text-brand-indigo text-sm font-medium rounded-full border border-brand-indigo/10"
            >
              {industry}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/categories/content_creator" className="btn-outline text-sm">
            Content Creators
          </Link>
          <Link href="/categories/ecommerce" className="btn-outline text-sm">
            E-commerce Brands
          </Link>
          <Link href="/categories/saas_app" className="btn-outline text-sm">
            SaaS & Apps
          </Link>
          <Link href="/categories/small_business" className="btn-outline text-sm">
            Small Business
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-brand-indigo rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-2">
            Are you a trademark attorney in {name}?
          </h2>
          <p className="text-blue-200 text-sm max-w-lg">
            Reach creators and businesses in {name} actively searching for trademark help.
            Add your free profile or claim your existing listing.
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
