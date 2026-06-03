import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Shield, CheckCircle, ArrowRight, Briefcase, Search, Star, FileText, Globe, Users } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getTotalCount } from '@/lib/data'
import { CREATOR_TYPES, TOP_STATES, STATE_NAMES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Find a Trademark Attorney for Creators & Small Business | FindTrademarkAttorney.com',
  description: 'Find a USPTO-registered trademark attorney who specializes in content creators, e-commerce brands, SaaS apps, and small business. Compare attorneys by state, specialty, and creator type.',
  alternates: { canonical: 'https://www.findtrademarkattorney.com' },
}

export const revalidate = 3600

async function HeroStats() {
  const total = await getTotalCount()
  return (
    <span className="text-4xl sm:text-5xl font-bold text-brand-amber">
      {total.toLocaleString()}+
    </span>
  )
}

async function FeaturedSection() {
  const featured = await getFeaturedListings()
  if (featured.length === 0) return null
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Featured Attorneys</h2>
        <Link href="/listings?tier=featured" className="text-sm text-brand-indigo hover:underline font-medium flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" aria-label="Arrow" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </section>
  )
}

const creatorHighlights = [
  {
    key: 'content_creator',
    icon: <Globe className="w-5 h-5 text-brand-indigo" aria-label="Content creators" />,
    title: 'Content Creators',
    desc: 'YouTube channels, TikTok brands, Instagram handles — protect your online identity',
  },
  {
    key: 'ecommerce',
    icon: <Briefcase className="w-5 h-5 text-brand-indigo" aria-label="E-commerce" />,
    title: 'E-commerce Brands',
    desc: 'Etsy sellers, Shopify stores, Amazon FBA — lock down your product brand name',
  },
  {
    key: 'saas_app',
    icon: <FileText className="w-5 h-5 text-brand-indigo" aria-label="SaaS" />,
    title: 'SaaS & App Builders',
    desc: 'Protect your product name from copycats and clone competitors',
  },
  {
    key: 'podcaster',
    icon: <Star className="w-5 h-5 text-brand-indigo" aria-label="Podcasters" />,
    title: 'Podcasters',
    desc: 'Secure your show name before a bigger network takes it',
  },
  {
    key: 'author_coach',
    icon: <Search className="w-5 h-5 text-brand-indigo" aria-label="Authors and coaches" />,
    title: 'Authors & Coaches',
    desc: 'Protect your methodology, course name, and personal brand',
  },
  {
    key: 'small_business',
    icon: <Users className="w-5 h-5 text-brand-indigo" aria-label="Small business" />,
    title: 'Small Business',
    desc: 'Restaurants, salons, service businesses — your name is your reputation',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-indigo relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo-dark/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-amber text-sm font-semibold uppercase tracking-wider">USPTO-Registered Attorneys Only</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Find a Trademark Attorney<br />
              <span className="text-brand-amber">Who Gets Your World.</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Don&apos;t let someone else trademark your brand. Search 20,000+ USPTO-registered attorneys
              by specialty, creator type, and location — for free.
            </p>

            <Suspense fallback={null}>
              <SearchBar large className="max-w-2xl" />
            </Suspense>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                USPTO-registered practitioners only
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                Filter by creator type & specialty
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                Free to search, always
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="text-center">
              <Suspense fallback={<span className="text-4xl font-bold text-brand-amber">20,000+</span>}>
                <HeroStats />
              </Suspense>
              <p className="text-blue-200 text-sm mt-1">USPTO-Registered Attorneys</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-brand-amber">50</span>
              <p className="text-blue-200 text-sm mt-1">States Covered</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-brand-amber">$0</span>
              <p className="text-blue-200 text-sm mt-1">Cost to Search</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need a Trademark Attorney */}
      <section className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why a Trademark Attorney vs. DIY?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A $99 filing fee becomes a $5,000 mess if you trademark the wrong class or miss a rejection.
              An attorney who knows your world files it right the first time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4 p-5 rounded-xl bg-surface border border-surface-border">
              <div className="shrink-0 w-10 h-10 bg-brand-indigo/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-indigo" aria-label="Protection" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Right Classes, Right Protection</h3>
                <p className="text-sm text-gray-600">60-70% of DIY filers choose the wrong trademark class. Wrong class = zero protection in your actual market.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-surface border border-surface-border">
              <div className="shrink-0 w-10 h-10 bg-brand-indigo/10 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-brand-indigo" aria-label="Search" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Conflict Search Before You File</h3>
                <p className="text-sm text-gray-600">A clearance search catches conflicting marks before you spend $350 on a USPTO filing that gets rejected.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-xl bg-surface border border-surface-border">
              <div className="shrink-0 w-10 h-10 bg-brand-indigo/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-indigo" aria-label="Response" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office Action Response</h3>
                <p className="text-sm text-gray-600">40% of applications receive a USPTO office action. Without an attorney, most creators abandon the application.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Creator Type */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Find an Attorney for Your Type of Business</h2>
          <Link href="/listings" className="text-sm text-brand-indigo hover:underline font-medium flex items-center gap-1">
            All attorneys <ArrowRight className="w-4 h-4" aria-label="Arrow" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creatorHighlights.map((ct) => (
            <Link
              key={ct.key}
              href={`/categories/${ct.key}`}
              className="flex items-start gap-4 p-4 bg-white rounded-xl border border-surface-border hover:border-brand-indigo/40 hover:shadow-sm transition-all group"
            >
              <div className="shrink-0 w-10 h-10 bg-brand-indigo/5 group-hover:bg-brand-indigo/10 rounded-lg flex items-center justify-center transition-colors">
                {ct.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-indigo text-sm transition-colors">{ct.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{ct.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <Suspense fallback={null}>
        <FeaturedSection />
      </Suspense>

      {/* Browse by State */}
      <section className="bg-white border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {TOP_STATES.map((abbr) => (
              <Link
                key={abbr}
                href={`/listings?state=${abbr}`}
                className="flex items-center justify-between px-4 py-3 bg-surface border border-surface-border rounded-lg hover:border-brand-indigo/40 hover:bg-brand-indigo/5 transition-all text-sm font-medium text-gray-700 hover:text-brand-indigo group"
              >
                <span>{STATE_NAMES[abbr]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-indigo transition-colors" aria-label="Arrow" />
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/listings" className="text-sm text-brand-indigo hover:underline font-medium">
              View all 50 states →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA for Attorneys */}
      <section className="bg-brand-indigo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-brand-amber" aria-label="Attorneys" />
              <span className="text-brand-amber text-sm font-semibold uppercase tracking-wider">For Trademark Attorneys</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your profile is already in our directory.</h2>
            <p className="text-blue-200 max-w-xl">
              Claim your free listing and start reaching creators and small businesses who are actively
              searching for an attorney with your specialization.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/submit"
              className="bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors whitespace-nowrap"
            >
              Add Your Listing
            </Link>
            <Link
              href="/listings"
              className="border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg text-center transition-colors whitespace-nowrap"
            >
              Find Your Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
