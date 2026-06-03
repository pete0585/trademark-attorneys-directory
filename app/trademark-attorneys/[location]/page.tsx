import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { getListingsByCity } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'

interface Props {
  params: Promise<{ location: string }>
}

function parseCitySlug(slug: string): { city: string; stateAbbr: string } | null {
  const parts = slug.split('-')
  if (parts.length < 2) return null
  const stateAbbr = parts[parts.length - 1].toUpperCase()
  const city = parts
    .slice(0, -1)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
  if (!STATE_NAMES[stateAbbr]) return null
  return { city, stateAbbr }
}

const CITY_SLUGS = [
  'new-york-ny',
  'los-angeles-ca',
  'chicago-il',
  'houston-tx',
  'san-francisco-ca',
  'austin-tx',
  'miami-fl',
  'seattle-wa',
  'boston-ma',
  'atlanta-ga',
  'denver-co',
  'dallas-tx',
  'nashville-tn',
  'philadelphia-pa',
  'phoenix-az',
  'portland-or',
  'san-diego-ca',
  'orlando-fl',
  'charlotte-nc',
  'washington-dc',
]

export async function generateStaticParams() {
  return CITY_SLUGS.map((location) => ({ location }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params
  const parsed = parseCitySlug(location)
  if (!parsed) return {}
  const { city, stateAbbr } = parsed
  const stateName = STATE_NAMES[stateAbbr] ?? stateAbbr

  return {
    title: `Trademark Attorneys in ${city}, ${stateName} | FindTrademarkAttorney.com`,
    description: `Find USPTO-registered trademark attorneys in ${city}, ${stateName}. Compare by specialty, creator type, and flat-fee pricing. Free to search.`,
    alternates: {
      canonical: `https://www.findtrademarkattorney.com/trademark-attorneys/${location}`,
    },
  }
}

export const revalidate = 3600

export default async function CityPage({ params }: Props) {
  const { location } = await params
  const parsed = parseCitySlug(location)
  if (!parsed) notFound()

  const { city, stateAbbr } = parsed
  const stateName = STATE_NAMES[stateAbbr] ?? stateAbbr
  const listings = await getListingsByCity(city, stateAbbr)

  const cityContext: Record<string, string> = {
    'new-york-ny':
      'New York City is home to one of the largest concentrations of trademark attorneys in the country. The city\'s thriving creator economy, fashion industry, and tech startup scene make IP protection essential for any brand operating here.',
    'los-angeles-ca':
      'Los Angeles is the entertainment and creator capital of the world. Whether you\'re building a media brand, launching a product line, or growing a digital presence, LA trademark attorneys understand the IP landscape for creators and consumer brands.',
    'chicago-il':
      'Chicago\'s diverse business ecosystem spans consumer goods, fintech, healthcare, and a rapidly growing creator economy. Trademark attorneys here work with everyone from restaurant brands to app developers and content creators.',
    'houston-tx':
      'Houston is a business hub with a booming startup scene, energy sector, and strong e-commerce community. Trademark registration protects Houston brands in competitive national and international markets.',
    'san-francisco-ca':
      'San Francisco and the greater Bay Area is ground zero for tech startups and SaaS companies. Trademark attorneys here specialize in software IP, brand protection for funded startups, and the unique needs of tech founders.',
    'austin-tx':
      'Austin\'s explosive growth as a tech and creator hub has made trademark protection a priority for its founders and entrepreneurs. Austin attorneys are well-versed in startup IP strategy, personal branding, and digital creator needs.',
    'miami-fl':
      'Miami\'s position as a gateway to Latin America and a hub for fashion, music, and crypto makes it a hotspot for creator-economy brands. Local trademark attorneys understand multilingual brand protection and international considerations.',
    'seattle-wa':
      'Seattle\'s tech-driven economy, led by major players and thousands of startups, creates constant demand for trademark protection. Seattle attorneys frequently work with software companies, e-commerce brands, and independent creators.',
    'boston-ma':
      'Boston\'s world-class universities and biotech ecosystem feed a steady pipeline of startups and innovative brands. Trademark attorneys here often specialize in early-stage company IP strategy alongside established business brand protection.',
    'atlanta-ga':
      'Atlanta is a fast-growing hub for entertainment, media, and tech startups. Its booming creator economy and strong Black-owned business community make trademark protection increasingly critical for emerging brands.',
    'denver-co':
      'Denver\'s outdoor, wellness, and tech industries have created a vibrant entrepreneurial community. Trademark attorneys here work with outdoor brands, health and wellness companies, and Colorado\'s growing startup sector.',
    'dallas-tx':
      'Dallas is home to major corporations and a thriving SMB community across retail, real estate, and technology. Trademark protection is a foundation for any Dallas brand looking to scale.',
    'nashville-tn':
      'Nashville\'s entertainment industry and rapid business growth make it a priority market for trademark registration. Whether you\'re in music, hospitality, or e-commerce, Nashville attorneys understand brand protection in a competitive creative landscape.',
    'philadelphia-pa':
      'Philadelphia\'s economy spans healthcare, education, food and beverage, and a growing tech sector. Trademark attorneys here help brands from local startups to established businesses protect their identity in national markets.',
    'phoenix-az':
      'Phoenix is one of the fastest-growing cities in the US, with a booming real estate, tech, and entrepreneurial community. Trademark registration is essential for Phoenix brands competing in rapidly expanding markets.',
    'portland-or':
      'Portland\'s culture of independent brands, craft businesses, and creative entrepreneurs makes IP protection a core business need. Attorneys here specialize in the unique trademark needs of artisan brands, small businesses, and content creators.',
    'san-diego-ca':
      'San Diego\'s biotech, military, and tourism industries sit alongside a thriving startup and e-commerce ecosystem. Trademark attorneys here handle everything from product brand protection to software and creator IP.',
    'orlando-fl':
      'Orlando\'s entertainment industry, tourism brands, and growing tech sector make it a competitive market where brand identity matters. Trademark registration protects Orlando businesses from infringement in one of Florida\'s most active commercial cities.',
    'charlotte-nc':
      'Charlotte\'s financial services industry and rapidly diversifying economy include a growing number of startups and consumer brands. Trademark protection helps Charlotte businesses establish and defend their identity in national markets.',
    'washington-dc':
      'Washington D.C.\'s unique economy includes government contractors, nonprofits, media companies, and a growing tech startup scene. DC-area trademark attorneys are familiar with both commercial brand protection and the unique IP needs of organizations operating in and around the capital.',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I find a trademark attorney in ${city}, ${stateName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Search FindTrademarkAttorney.com and filter by location to find USPTO-registered trademark attorneys in ${city}. You can further filter by creator type, practice area, or flat-fee pricing to narrow results.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do I need a trademark attorney physically located in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No. Trademark attorneys file with the USPTO federally, so location doesn't restrict who can represent you. That said, many ${city} businesses prefer local attorneys for in-person meetings. Many also offer virtual consultations nationwide.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much does a trademark attorney cost in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Attorney fees in ${city} for a standard trademark registration typically run $500–$1,500, plus the USPTO filing fee of $250–$350 per class. Many offer flat-fee packages. Always confirm whether the quoted fee includes a clearance search and office action response.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How long does trademark registration take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The USPTO currently takes 8–12 months to process a standard application. If your application receives an office action (a rejection or request for clarification), the timeline can extend by another 3–6 months.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            {city}, {stateName}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-indigo text-sm font-semibold mb-2">
            <MapPin className="w-4 h-4" aria-label="Location" />
            {stateName}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Find a Trademark Attorney in {city}, {stateName}
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
            {cityContext[location] ??
              `Browse USPTO-registered trademark attorneys serving ${city} and the surrounding ${stateName} area. Filter by creator type, specialty, or flat-fee pricing to find the right fit for your brand.`}
          </p>
        </div>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="bg-white border border-surface-border rounded-xl p-10 text-center mb-10">
            <Briefcase
              className="w-10 h-10 text-gray-300 mx-auto mb-4"
              aria-label="No listings"
            />
            <p className="text-gray-600 font-medium mb-1">
              No attorneys listed yet in {city}
            </p>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              Trademark attorneys can serve clients nationwide — browse all attorneys or add
              your profile.
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
              {listings.length} attorney{listings.length !== 1 ? 's' : ''} in {city},{' '}
              {stateName}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/listings?state=${stateAbbr}`} className="btn-outline">
                All {stateName} attorneys
                <ArrowRight className="w-4 h-4" aria-label="Arrow" />
              </Link>
              <Link href="/listings" className="btn-outline">
                Browse all states
              </Link>
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="bg-white border border-surface-border rounded-xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {city} Trademark Attorney — Common Questions
          </h2>
          <div className="space-y-6 divide-y divide-surface-border">
            <div className="pt-0">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I find a trademark attorney in {city}, {stateName}?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Search FindTrademarkAttorney.com and filter by location. You can narrow results
                by creator type (content creator, e-commerce, SaaS, small business), practice
                area, or flat-fee pricing. All attorneys listed are USPTO-registered
                practitioners.
              </p>
            </div>
            <div className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do I need a trademark attorney physically located in {city}?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No. USPTO trademark filings are handled federally, so any registered attorney
                can represent you regardless of where they or you are located. Many {city}{' '}
                attorneys also offer virtual consultations, and some specialize in working with
                clients nationwide.
              </p>
            </div>
            <div className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How much does a trademark attorney in {city} cost?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Attorney fees for a standard trademark registration in {city} typically range
                from $500–$1,500, plus the USPTO filing fee ($250–$350 per class). Many
                attorneys offer flat-fee packages — ask upfront whether the fee includes a
                clearance search and office action response coverage.
              </p>
            </div>
            <div className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does trademark registration take?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The USPTO currently takes 8–12 months to process a trademark application. If
                an office action is issued (a rejection or clarification request), the timeline
                can extend by another 3–6 months. Working with an experienced attorney reduces
                the chance of delays.
              </p>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/guides/how-to-choose-a-trademark-attorney"
              className="p-4 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 transition-colors group"
            >
              <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-indigo mb-1">
                How to Choose a Trademark Attorney
              </p>
              <p className="text-xs text-gray-500">
                What to look for, questions to ask, and red flags to avoid.
              </p>
            </Link>
            <Link
              href="/guides/trademark-vs-copyright"
              className="p-4 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 transition-colors group"
            >
              <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-indigo mb-1">
                Trademark vs. Copyright
              </p>
              <p className="text-xs text-gray-500">
                What each protects and which one your brand needs.
              </p>
            </Link>
            <Link
              href="/guides/what-is-trademark-registration"
              className="p-4 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 transition-colors group"
            >
              <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-indigo mb-1">
                What Is Trademark Registration?
              </p>
              <p className="text-xs text-gray-500">
                A plain-English guide for creators and business owners.
              </p>
            </Link>
            <Link
              href="/guides/questions-to-ask-trademark-attorney"
              className="p-4 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 transition-colors group"
            >
              <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-indigo mb-1">
                10 Questions to Ask Before Hiring
              </p>
              <p className="text-xs text-gray-500">
                Vet any trademark attorney before you write a check.
              </p>
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
              Your profile may already be in our directory. Claim it for free and start
              connecting with creators and small businesses searching for trademark help in{' '}
              {city}.
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
    </>
  )
}
