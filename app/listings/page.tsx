import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getListings } from '@/lib/data'
import { STATE_NAMES, PRACTICE_AREAS, CREATOR_TYPES } from '@/lib/utils'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'

interface Props {
  searchParams: Promise<{
    q?: string
    state?: string
    practice_area?: string
    creator_type?: string
    flat_fee?: string
    virtual?: string
    tier?: string
    page?: string
  }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const state = params.state ? STATE_NAMES[params.state.toUpperCase()] : null
  const creatorType = params.creator_type ? CREATOR_TYPES[params.creator_type] : null

  const title = [
    'Trademark Attorneys',
    creatorType ? `for ${creatorType}` : null,
    state ? `in ${state}` : null,
  ].filter(Boolean).join(' ')

  return {
    title: `${title} | FindTrademarkAttorney.com`,
    description: `Search USPTO-registered trademark attorneys${state ? ` in ${state}` : ''}${creatorType ? ` specializing in ${creatorType}` : ''}. Filter by specialty, flat-fee options, and virtual consultations.`,
  }
}

async function ListingsResults({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1')
  const filters = {
    q: params.q,
    state: params.state,
    practice_area: params.practice_area,
    creator_type: params.creator_type,
    flat_fee: params.flat_fee === 'true',
    virtual: params.virtual === 'true',
    tier: params.tier,
    page,
  }

  const { listings, total } = await getListings(filters)
  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{total.toLocaleString()}</span> attorneys found
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-surface-border">
          <p className="text-gray-500 text-lg mb-2">No attorneys found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} horizontal />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => {
            const sp = new URLSearchParams()
            if (params.q) sp.set('q', params.q)
            if (params.state) sp.set('state', params.state)
            if (params.practice_area) sp.set('practice_area', params.practice_area)
            if (params.creator_type) sp.set('creator_type', params.creator_type)
            if (params.flat_fee) sp.set('flat_fee', params.flat_fee)
            if (params.virtual) sp.set('virtual', params.virtual)
            if (params.tier) sp.set('tier', params.tier)
            sp.set('page', String(p))
            return (
              <a
                key={p}
                href={`/listings?${sp.toString()}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-brand-indigo text-white'
                    : 'bg-white border border-surface-border text-gray-700 hover:border-brand-indigo hover:text-brand-indigo'
                }`}
              >
                {p}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default async function ListingsPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Find a Trademark Attorney</h1>
        <Suspense fallback={null}>
          <SearchBar className="max-w-2xl" />
        </Suspense>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <FilterSidebar
            selectedState={params.state}
            selectedPracticeArea={params.practice_area}
            selectedCreatorType={params.creator_type}
            flatFee={params.flat_fee === 'true'}
            virtual={params.virtual === 'true'}
          />
        </div>

        <div className="flex-1 min-w-0">
          <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading attorneys...</div>}>
            <ListingsResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
