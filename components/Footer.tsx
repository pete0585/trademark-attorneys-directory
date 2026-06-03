import Link from 'next/link'
import { Scale } from 'lucide-react'
import { CREATOR_TYPES, STATE_NAMES } from '@/lib/utils'

const TOP_STATES = ['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'CO', 'TN', 'GA', 'PA']

export default function Footer() {
  return (
    <footer className="bg-brand-indigo text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-3">
              <Scale className="w-5 h-5 text-brand-amber" aria-label="Logo" />
              <span>FindTrademarkAttorney</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              The trademark attorney directory built for creators and small business. Find USPTO-registered attorneys who understand your world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-brand-amber mb-3">Browse by Type</h3>
            <ul className="space-y-2">
              {Object.entries(CREATOR_TYPES).slice(0, 5).map(([key, label]) => (
                <li key={key}>
                  <Link href={`/categories/${key}`} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-brand-amber mb-3">Top States</h3>
            <ul className="space-y-2">
              {TOP_STATES.slice(0, 5).map((abbr) => (
                <li key={abbr}>
                  <Link href={`/listings?state=${abbr}`} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {STATE_NAMES[abbr]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-brand-amber mb-3">For Attorneys</h3>
            <ul className="space-y-2">
              <li><Link href="/submit" className="text-blue-200 hover:text-white text-sm transition-colors">Add Free Listing</Link></li>
              <li><Link href="/listings" className="text-blue-200 hover:text-white text-sm transition-colors">Find Your Profile</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-xs">
            © {new Date().getFullYear()} FindTrademarkAttorney.com — USPTO practitioner data is sourced from the USPTO OED public database.
          </p>
          <p className="text-blue-300 text-xs">
            Not legal advice. Consult a licensed attorney for your specific situation.
          </p>
        </div>
      </div>
    </footer>
  )
}
