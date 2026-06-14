import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Globe, Phone, CheckCircle, Star, Briefcase, Laptop } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PRACTICE_AREAS, CREATOR_TYPES, cn } from '@/lib/utils'

interface Props {
  listing: Listing
  horizontal?: boolean
}

export default function ListingCard({ listing, horizontal }: Props) {
  const isPaid = listing.plan_tier === 'verified' || listing.plan_tier === 'featured'
  const isFeatured = listing.plan_tier === 'featured'

  if (horizontal) {
    return (
      <Link
        href={`/listings/${listing.slug}`}
        className={cn(
          'card block p-4 hover:border-brand-indigo/40 hover:shadow-sm transition-all',
          isFeatured && 'border-brand-amber/40 bg-amber-50/30'
        )}
      >
        <div className="flex gap-4">
          {listing.photo_url ? (
            <Image
              src={listing.photo_url}
              alt={listing.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-brand-indigo/10 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-brand-indigo">
                {listing.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 hover:text-brand-indigo text-sm sm:text-base">
                    {listing.name}
                  </h3>
                  {isFeatured && <span className="badge-featured">Featured</span>}
                  {!isFeatured && isPaid && <span className="badge-verified"><CheckCircle className="w-3 h-3" aria-label="Verified" /> Verified</span>}
                </div>
                {listing.firm_name && (
                  <p className="text-sm text-gray-500 mt-0.5">{listing.firm_name}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" aria-label="Location" />
                {listing.city}, {listing.state}
              </span>
              {listing.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" aria-label="Website" />
                  Website
                </span>
              )}
              {listing.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" aria-label="Phone" />
                  {listing.phone}
                </span>
              )}
              {listing.free_consultation && (
                <span className="flex items-center gap-1 text-brand-sage font-medium">
                  <Star className="w-3.5 h-3.5" aria-label="Flat fee" />
                  Flat Fee
                </span>
              )}
              {listing.accepting_new_clients && (
                <span className="flex items-center gap-1 text-brand-indigo font-medium">
                  <Laptop className="w-3.5 h-3.5" aria-label="Virtual" />
                  Virtual
                </span>
              )}
            </div>

            {listing.practice_areas.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {listing.practice_areas.slice(0, 3).map((area) => (
                  <span key={area} className="text-xs bg-brand-indigo/5 text-brand-indigo px-2 py-0.5 rounded-full">
                    {PRACTICE_AREAS[area] ?? area}
                  </span>
                ))}
              </div>
            )}

            {listing.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {listing.specialties.slice(0, 2).map((ct) => (
                  <span key={ct} className="text-xs bg-brand-amber/5 text-brand-amber-dark px-2 py-0.5 rounded-full">
                    <Briefcase className="w-3 h-3 inline mr-0.5" aria-label="Creator type" />
                    {CREATOR_TYPES[ct] ?? ct}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={cn(
        'card block p-4 hover:border-brand-indigo/40 hover:shadow-sm transition-all',
        isFeatured && 'border-brand-amber/40 bg-amber-50/30'
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        {listing.photo_url ? (
          <Image
            src={listing.photo_url}
            alt={listing.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-brand-indigo/10 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-brand-indigo">
              {listing.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            {isFeatured && <span className="badge-featured">Featured</span>}
            {!isFeatured && isPaid && <span className="badge-verified"><CheckCircle className="w-3 h-3" aria-label="Verified" /> Verified</span>}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{listing.name}</h3>
          {listing.firm_name && (
            <p className="text-xs text-gray-500">{listing.firm_name}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
        <MapPin className="w-3.5 h-3.5" aria-label="Location" />
        {listing.city}, {listing.state}
        {listing.free_consultation && (
          <span className="ml-auto text-brand-sage font-medium flex items-center gap-0.5">
            <Star className="w-3 h-3" aria-label="Flat fee" /> Flat Fee
          </span>
        )}
      </div>

      {listing.practice_areas.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {listing.practice_areas.slice(0, 2).map((area) => (
            <span key={area} className="text-xs bg-brand-indigo/5 text-brand-indigo px-2 py-0.5 rounded-full">
              {PRACTICE_AREAS[area] ?? area}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
