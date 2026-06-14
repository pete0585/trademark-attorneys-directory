import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, Shield, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Claim Your Attorney Listing',
  description: 'Claim your free trademark attorney listing on TrademarksearchDirectory.com. Get verified and attract new clients.',
}

const TIERS = [
  {
    name: 'Basic',
    price: 'Free',
    features: [
      'Public listing with contact info',
      'City & state search visibility',
      'Specialty tags',
    ],
    cta: 'Claim Free Listing',
    primary: false,
  },
  {
    name: 'Verified',
    price: '$149/year',
    features: [
      'Everything in Basic',
      'Verified badge',
      'Bio & photo',
      'Priority search ranking',
      'Direct contact button',
    ],
    cta: 'Get Verified',
    primary: true,
    note: 'Most popular',
  },
  {
    name: 'Featured',
    price: '$349/year',
    features: [
      'Everything in Verified',
      'Featured placement (top of results)',
      'Gold featured badge',
      'Homepage spotlight',
      'Dedicated profile page',
    ],
    cta: 'Get Featured',
    primary: false,
  },
]

export default function ClaimPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <Star className="w-8 h-8 text-gold-500 mx-auto mb-3" />
        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-2">
          Claim Your Listing
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Your firm may already be in our directory. Claim it to update your information,
          get verified, and connect with clients searching for trademark attorneys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`bg-white rounded-2xl border p-6 ${
              tier.primary
                ? 'border-navy-400 ring-2 ring-navy-200 shadow-card'
                : 'border-slate-200 shadow-soft'
            }`}
          >
            {tier.note && (
              <div className="text-xs font-semibold text-navy-600 bg-navy-50 rounded-full px-3 py-0.5 inline-block mb-3">
                {tier.note}
              </div>
            )}
            <h3 className="font-serif font-bold text-navy-800 text-xl">{tier.name}</h3>
            <p className="text-2xl font-bold text-navy-600 mt-1 mb-4">{tier.price}</p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:hello@trademarksearchdirectory.com?subject=${encodeURIComponent(`${tier.name} Listing Claim`)}`}
              className={`block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                tier.primary
                  ? 'bg-navy-600 hover:bg-navy-500 text-white'
                  : 'border border-navy-300 text-navy-700 hover:bg-navy-50'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-navy-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-semibold text-navy-800 mb-1">Ready to claim your listing?</h2>
            <p className="text-slate-500 text-sm mb-3">
              Email us with your firm name and we will get your listing set up within 24 hours.
            </p>
            <a
              href="mailto:hello@trademarksearchdirectory.com"
              className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@trademarksearchdirectory.com
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          { icon: Shield, title: 'Verified Listings', desc: 'We verify bar admissions and practice areas' },
          { icon: Star, title: 'Featured Placement', desc: 'Get top search result visibility' },
          { icon: CheckCircle, title: 'Free to Start', desc: 'Basic listing is always free' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-200 p-4">
            <Icon className="w-6 h-6 text-gold-500 mx-auto mb-2" />
            <h3 className="font-semibold text-navy-800 text-sm">{title}</h3>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/listings" className="text-navy-600 hover:underline text-sm">
          ← Back to the directory
        </Link>
      </div>
    </div>
  )
}
