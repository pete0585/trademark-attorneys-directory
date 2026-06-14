import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Globe, Phone, Mail, CheckCircle, Star, Laptop, Briefcase, ArrowLeft, Shield } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PRACTICE_AREAS, CREATOR_TYPES, formatPhone } from '@/lib/utils'

interface Props {
  listing: Listing
}

export default function ListingDetail({ listing }: Props) {
  const isPaid = listing.plan_tier === 'verified' || listing.plan_tier === 'featured'
  const isFeatured = listing.plan_tier === 'featured'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-indigo">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-brand-indigo">Attorneys</Link>
        <span>/</span>
        <Link href={`/listings?state=${listing.state}`} className="hover:text-brand-indigo">{listing.state}</Link>
        <span>/</span>
        <span className="text-gray-900">{listing.name}</span>
      </div>

      <Link href="/listings" className="inline-flex items-center gap-1 text-sm text-brand-indigo hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" aria-label="Back" /> Back to Results
      </Link>

      {/* Header Card */}
      <div className={`card p-6 mb-6 ${isFeatured ? 'border-brand-amber/40' : ''}`}>
        <div className="flex flex-col sm:flex-row gap-5">
          {listing.photo_url ? (
            <Image
              src={listing.photo_url}
              alt={listing.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-brand-indigo/10 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-brand-indigo">
                {listing.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {isFeatured && <span className="badge-featured">Featured</span>}
              {!isFeatured && isPaid && (
                <span className="badge-verified">
                  <CheckCircle className="w-3 h-3" aria-label="Verified" /> Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{listing.name}</h1>
            {listing.firm_name && (
              <p className="text-gray-600 mt-0.5">{listing.firm_name}</p>
            )}

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-indigo" aria-label="Location" />
                {listing.city}, {listing.state}
              </span>
              {listing.free_consultation && (
                <span className="flex items-center gap-1.5 text-brand-sage font-medium">
                  <Star className="w-4 h-4" aria-label="Flat fee" />
                  Flat-Fee Filings Available
                </span>
              )}
              {listing.accepting_new_clients && (
                <span className="flex items-center gap-1.5 text-brand-indigo font-medium">
                  <Laptop className="w-4 h-4" aria-label="Virtual" />
                  Virtual Consultations
                </span>
              )}
            </div>

            {listing.bar_number && (
              <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-brand-indigo" aria-label="USPTO" />
                USPTO Registration #{listing.bar_number}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {listing.bio && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{listing.bio}</p>
            </div>
          )}

          {listing.practice_areas.length > 0 && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Practice Areas</h2>
              <div className="flex flex-wrap gap-2">
                {listing.practice_areas.map((area) => (
                  <Link
                    key={area}
                    href={`/listings?practice_area=${area}`}
                    className="text-sm bg-brand-indigo/5 hover:bg-brand-indigo/10 text-brand-indigo px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    {PRACTICE_AREAS[area] ?? area}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {listing.specialties.length > 0 && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Specializes in Clients Who Are...</h2>
              <div className="flex flex-wrap gap-2">
                {listing.specialties.map((ct) => (
                  <Link
                    key={ct}
                    href={`/categories/${ct}`}
                    className="flex items-center gap-1.5 text-sm bg-brand-amber/5 hover:bg-brand-amber/10 text-brand-amber-dark px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    <Briefcase className="w-3.5 h-3.5" aria-label="Creator type" />
                    {CREATOR_TYPES[ct] ?? ct}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!listing.claimed_at && (
            <div className="card p-5 border-dashed">
              <p className="text-sm text-gray-500 mb-3">
                Are you <strong>{listing.name}</strong>? Claim this listing to add your photo, bio, specializations, and contact form.
              </p>
              <Link href={`/claim/${listing.id}`} className="btn-outline text-sm">
                Claim This Listing
              </Link>
            </div>
          )}
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Contact</h2>

            {(listing.phone || listing.email || listing.website) ? (
              <div className="space-y-3">
                {listing.phone && (
                  <a
                    href={`tel:${listing.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-indigo transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-indigo shrink-0" aria-label="Phone" />
                    {formatPhone(listing.phone)}
                  </a>
                )}
                {listing.email && (
                  <a
                    href={`mailto:${listing.email}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-indigo transition-colors"
                  >
                    <Mail className="w-4 h-4 text-brand-indigo shrink-0" aria-label="Email" />
                    {listing.email}
                  </a>
                )}
                {listing.website && (
                  <a
                    href={listing.website.startsWith('http') ? listing.website : `https://${listing.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-indigo transition-colors"
                  >
                    <Globe className="w-4 h-4 text-brand-indigo shrink-0" aria-label="Website" />
                    Visit Website
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Contact info not yet provided. <Link href={`/claim/${listing.id}`} className="text-brand-indigo hover:underline">Claim this listing</Link> to add it.</p>
            )}

            {listing.plan_tier === 'free' && (
              <div className="mt-4 pt-4 border-t border-surface-border">
                <a
                  href={`/api/upgrade?listing_id=${listing.id}&tier=verified`}
                  className="btn-primary w-full text-center block text-sm"
                >
                  Upgrade to Verified — $99/yr
                </a>
              </div>
            )}
          </div>

          {listing.languages.length > 0 && (
            <div className="card p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-2">Languages</h3>
              <div className="flex flex-wrap gap-1.5">
                {listing.languages.map((lang) => (
                  <span key={lang} className="text-xs bg-surface text-gray-600 px-2 py-0.5 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card p-4 bg-brand-indigo/5 border-brand-indigo/20">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Disclaimer:</strong> This directory is for informational purposes only. Listings are sourced from the USPTO OED public database. Verify credentials before retaining any attorney. This is not legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
