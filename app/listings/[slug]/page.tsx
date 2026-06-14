import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, Mail, CheckCircle, Star,
  Scale, ArrowLeft, Users, BookOpen
} from 'lucide-react'
import { getListingBySlug, getAllSlugs, getListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.slice(0, 500).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const attorney = await getListingBySlug(params.slug)
  if (!attorney) return { title: 'Attorney Not Found' }

  const displayName = attorney.firm_name || attorney.name
  const title = `${displayName} — Trademark Attorney in ${attorney.city}, ${attorney.state}`

  return {
    title,
    description: attorney.bio
      ? attorney.bio.slice(0, 160)
      : `${displayName} is a trademark attorney in ${attorney.city}, ${attorney.state}. Specializing in ${attorney.specialties.slice(0, 2).join(' and ')}.`,
    openGraph: { title, type: 'profile' },
  }
}

export default async function ListingDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const attorney = await getListingBySlug(params.slug)
  if (!attorney) notFound()

  const { listings: similar } = await getListings({
    state: attorney.state,
    pageSize: 3,
  })
  const otherAttorneys = similar.filter((a) => a.id !== attorney.id).slice(0, 3)

  const displayName = attorney.firm_name || attorney.name
  const isVerified = attorney.plan_tier === 'verified' || attorney.plan_tier === 'featured'
  const isFeatured = attorney.plan_tier === 'featured'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/listings"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className={`bg-white rounded-2xl border p-6 ${isFeatured ? 'border-gold-300' : 'border-slate-200'} shadow-soft`}>
            {isFeatured && (
              <div className="flex items-center gap-1.5 text-gold-600 text-sm font-medium mb-3">
                <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                Featured Attorney
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-navy-100 border-2 border-navy-200 flex items-center justify-center">
                {attorney.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={attorney.photo_url}
                    alt={displayName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-navy-600 font-bold text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-serif font-bold text-navy-800">{displayName}</h1>
                {attorney.firm_name && attorney.name !== attorney.firm_name && (
                  <p className="text-slate-600 mt-0.5">{attorney.name}</p>
                )}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {attorney.city}, {attorney.state}
                    {attorney.zip && ` ${attorney.zip}`}
                  </div>
                  {isVerified && (
                    <div className="flex items-center gap-1 text-gold-600 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 fill-gold-100" />
                      Verified
                    </div>
                  )}
                  {attorney.accepting_new_clients && (
                    <div className="flex items-center gap-1 text-emerald-600 text-sm">
                      <Users className="w-3.5 h-3.5" />
                      Accepting new clients
                    </div>
                  )}
                </div>
              </div>
            </div>

            {attorney.bio && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <h2 className="font-semibold text-navy-800 mb-2">About</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{attorney.bio}</p>
              </div>
            )}

            {attorney.specialties && attorney.specialties.length > 0 && (
              <div className="mt-5">
                <h2 className="font-semibold text-navy-800 mb-2">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {attorney.specialties.map((s) => (
                    <Link
                      key={s}
                      href={`/listings?specialty=${encodeURIComponent(s)}`}
                      className="text-sm bg-navy-50 text-navy-700 px-3 py-1 rounded-full border border-navy-100 hover:bg-navy-100 transition-colors"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {attorney.practice_areas && attorney.practice_areas.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold text-navy-800 mb-2">Practice Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {attorney.practice_areas.map((a) => (
                    <span
                      key={a}
                      className="text-sm bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bar info */}
          {attorney.bar_number && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
              <h2 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Scale className="w-4 h-4 text-navy-500" />
                USPTO Registration
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <dt className="text-slate-500 w-32 flex-shrink-0">Registration #</dt>
                  <dd className="text-slate-700 font-medium">{attorney.bar_number}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Languages */}
          {attorney.languages && attorney.languages.length > 1 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
              <h2 className="font-semibold text-navy-800 mb-3">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {attorney.languages.map((l) => (
                  <span key={l} className="text-sm bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Attorney',
                name: displayName,
                description: attorney.bio ?? `Trademark attorney in ${attorney.city}, ${attorney.state}`,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: attorney.address,
                  addressLocality: attorney.city,
                  addressRegion: attorney.state,
                  postalCode: attorney.zip,
                  addressCountry: 'US',
                },
                telephone: attorney.phone ?? undefined,
                url: attorney.website ?? undefined,
                knowsAbout: attorney.specialties,
              }),
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5 sticky top-20">
            <h2 className="font-semibold text-navy-800 mb-4">Contact Information</h2>
            <div className="space-y-3 text-sm">
              {attorney.address && (
                <div className="flex gap-3 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{attorney.address}</p>
                    <p>{attorney.city}, {attorney.state} {attorney.zip}</p>
                  </div>
                </div>
              )}
              {attorney.phone && (
                <a
                  href={`tel:${attorney.phone}`}
                  className="flex items-center gap-3 text-navy-600 hover:text-navy-500 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {formatPhone(attorney.phone)}
                </a>
              )}
              {attorney.email && (
                <a
                  href={`mailto:${attorney.email}`}
                  className="flex items-center gap-3 text-navy-600 hover:text-navy-500 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{attorney.email}</span>
                </a>
              )}
              {attorney.website && (
                <a
                  href={attorney.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-navy-600 hover:text-navy-500 transition-colors"
                >
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {attorney.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                  </span>
                </a>
              )}
            </div>

            {attorney.website && (
              <a
                href={attorney.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-navy-600 hover:bg-navy-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Visit Website
              </a>
            )}

            {!attorney.claimed && (
              <Link
                href={`/claim?slug=${attorney.slug}`}
                className="mt-2 block w-full text-center border border-gold-400 text-gold-700 hover:bg-gold-50 font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
                Claim This Listing
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Similar attorneys */}
      {otherAttorneys.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-serif font-bold text-navy-800 mb-4">
            More Trademark Attorneys in {attorney.state}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherAttorneys.map((a) => (
              <ListingCard key={a.id} attorney={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
