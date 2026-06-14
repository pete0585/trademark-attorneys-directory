import Link from 'next/link'
import { MapPin, Phone, Globe, CheckCircle, Star, Users } from 'lucide-react'
import type { TrademarkAttorney } from '@/lib/types'
import { formatPhone } from '@/lib/utils'

interface ListingCardProps {
  attorney: TrademarkAttorney
}

export default function ListingCard({ attorney }: ListingCardProps) {
  const isFeatured = attorney.plan_tier === 'featured'
  const isVerified = attorney.plan_tier === 'verified' || isFeatured
  const displayName = attorney.firm_name || attorney.name

  return (
    <Link
      href={`/listings/${attorney.slug}`}
      className={`block bg-white rounded-2xl border transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group ${
        isFeatured
          ? 'border-gold-400 shadow-card ring-1 ring-gold-200'
          : 'border-slate-200 shadow-soft'
      }`}
    >
      <div className="p-5">
        {isFeatured && (
          <div className="flex items-center gap-1 text-xs font-semibold text-gold-600 mb-2">
            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            Featured Attorney
          </div>
        )}

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center">
            {attorney.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={attorney.photo_url}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-navy-600 font-bold text-lg">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-navy-800 group-hover:text-navy-600 truncate">
              {displayName}
            </h3>
            {attorney.firm_name && attorney.name !== attorney.firm_name && (
              <p className="text-sm text-slate-500 truncate">{attorney.name}</p>
            )}
            {isVerified && (
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-500 fill-gold-100" />
                <span className="text-xs text-gold-600 font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-1.5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{attorney.city}, {attorney.state}</span>
          </div>
          {attorney.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{formatPhone(attorney.phone)}</span>
            </div>
          )}
          {attorney.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate text-navy-600">
                {attorney.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
              </span>
            </div>
          )}
        </div>

        {attorney.specialties && attorney.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {attorney.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-xs bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full border border-navy-100"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {attorney.accepting_new_clients && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
            <Users className="w-3.5 h-3.5" />
            <span>Accepting new clients</span>
          </div>
        )}
      </div>
    </Link>
  )
}
