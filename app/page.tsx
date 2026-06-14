import Link from 'next/link'
import { Scale, Shield, CheckCircle, Star, ArrowRight, MapPin, Gavel, BookOpen } from 'lucide-react'
import { getTotalCount, getFeaturedListings, getListings } from '@/lib/data'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'

export const revalidate = 3600

const TOP_STATES = [
  { abbr: 'CA', name: 'California' },
  { abbr: 'NY', name: 'New York' },
  { abbr: 'TX', name: 'Texas' },
  { abbr: 'FL', name: 'Florida' },
  { abbr: 'IL', name: 'Illinois' },
  { abbr: 'WA', name: 'Washington' },
  { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'GA', name: 'Georgia' },
]

const SPECIALTIES = [
  { label: 'Trademark Registration', icon: BookOpen, desc: 'USPTO filing & prosecution' },
  { label: 'Trademark Enforcement', icon: Shield, desc: 'Cease & desist, litigation' },
  { label: 'Trade Dress', icon: Scale, desc: 'Product appearance protection' },
  { label: 'IP Litigation', icon: Gavel, desc: 'Federal court representation' },
]

export default async function HomePage() {
  const [totalCount, featured, { listings: recent }] = await Promise.all([
    getTotalCount(),
    getFeaturedListings(3),
    getListings({ page: 1, pageSize: 6 }),
  ])

  const displayCount = totalCount > 0 ? totalCount : 1151

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Scale className="w-4 h-4" />
              {displayCount.toLocaleString()}+ Trademark Attorneys Listed
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find a Trademark Attorney<br />
              <span className="text-gold-300">Near You</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Search USPTO-registered intellectual property lawyers by city, state, and specialty.
              Protect your brand with the right legal expert.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-300">
            {TOP_STATES.map((s) => (
              <Link
                key={s.abbr}
                href={`/listings?state=${s.abbr}`}
                className="hover:text-gold-300 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-navy-700">{displayCount.toLocaleString()}+</p>
              <p className="text-sm text-slate-500">Attorneys Listed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">50</p>
              <p className="text-sm text-slate-500">States Covered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">Free</p>
              <p className="text-sm text-slate-500">To Search</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-700">USPTO</p>
              <p className="text-sm text-slate-500">Registered Attorneys</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured attorneys */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-800">Featured Attorneys</h2>
              <p className="text-slate-500 text-sm mt-1">Verified trademark specialists</p>
            </div>
            <Link
              href="/listings"
              className="text-navy-600 hover:text-navy-500 text-sm font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((a) => (
              <ListingCard key={a.id} attorney={a} />
            ))}
          </div>
        </section>
      )}

      {/* Specialty areas */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-navy-800 text-center mb-2">Browse by Specialty</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Find the right trademark expert for your needs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALTIES.map(({ label, icon: Icon, desc }) => (
              <Link
                key={label}
                href={`/listings?specialty=${encodeURIComponent(label)}`}
                className="bg-slate-50 hover:bg-navy-50 border border-slate-200 hover:border-navy-200 rounded-2xl p-5 text-center group transition-all"
              >
                <div className="w-10 h-10 bg-navy-100 group-hover:bg-navy-200 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-800 text-sm mb-1">{label}</h3>
                <p className="text-xs text-slate-500">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-navy-800">Browse Attorneys</h2>
          <Link
            href="/listings"
            className="text-navy-600 hover:text-navy-500 text-sm font-medium flex items-center gap-1"
          >
            View all {displayCount.toLocaleString()} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((a) => (
            <ListingCard key={a.id} attorney={a} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Search All {displayCount.toLocaleString()} Attorneys
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Browse by state */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-navy-800 text-center mb-2">Browse by State</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Find trademark attorneys in your state</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TOP_STATES.map((s) => (
              <Link
                key={s.abbr}
                href={`/listings?state=${s.abbr}`}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-navy-50 border border-slate-200 hover:border-navy-300 text-navy-700 text-sm font-medium px-4 py-2 rounded-lg transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for attorneys */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-navy-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <Star className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-3">Are You a Trademark Attorney?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-6">
            Claim your free listing, get verified, and connect with clients searching for your expertise.
            Featured placements available for maximum visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/claim"
              className="bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Claim Your Free Listing
            </Link>
            <Link
              href="/listings"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Browse the Directory
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Free basic listing</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Verified badge</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Featured placement</span>
          </div>
        </div>
      </section>
    </>
  )
}
