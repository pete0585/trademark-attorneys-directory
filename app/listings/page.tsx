import type { Metadata } from 'next'
import { getListings } from '@/lib/data'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const revalidate = 3600

interface SearchParams {
  search?: string
  state?: string
  city?: string
  specialty?: string
  page?: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const parts: string[] = []
  if (searchParams.specialty) parts.push(searchParams.specialty)
  if (searchParams.state) parts.push(`in ${searchParams.state}`)
  if (searchParams.city) parts.push(`in ${searchParams.city}`)

  const title = parts.length > 0
    ? `Trademark Attorneys ${parts.join(' ')}`
    : 'Search Trademark Attorneys'

  return {
    title,
    description: `Find trademark attorneys ${parts.join(' ')}. Search 1,000+ USPTO-registered IP lawyers by location and specialty.`,
  }
}

const PAGE_SIZE = 24

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = parseInt(searchParams.page ?? '1', 10)
  const { listings, total } = await getListings({
    search: searchParams.search,
    state: searchParams.state,
    city: searchParams.city,
    specialty: searchParams.specialty,
    page,
    pageSize: PAGE_SIZE,
  })

  const totalPages = Math.ceil(total / PAGE_SIZE)

  function buildUrl(p: number) {
    const params = new URLSearchParams()
    if (searchParams.search) params.set('search', searchParams.search)
    if (searchParams.state) params.set('state', searchParams.state)
    if (searchParams.city) params.set('city', searchParams.city)
    if (searchParams.specialty) params.set('specialty', searchParams.specialty)
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/listings${qs ? `?${qs}` : ''}`
  }

  const hasFilters = !!(searchParams.search || searchParams.state || searchParams.city || searchParams.specialty)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-1">
          {searchParams.specialty
            ? `${searchParams.specialty} Attorneys`
            : searchParams.state
            ? `Trademark Attorneys in ${searchParams.state}`
            : 'Find a Trademark Attorney'}
        </h1>
        <p className="text-slate-500 text-sm">
          {total.toLocaleString()} attorney{total !== 1 ? 's' : ''} found
          {searchParams.state ? ` in ${searchParams.state}` : ''}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          defaultSearch={searchParams.search ?? ''}
          defaultState={searchParams.state ?? ''}
          defaultSpecialty={searchParams.specialty ?? ''}
          compact
        />
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg mb-4">No attorneys found matching your search.</p>
          {hasFilters && (
            <Link href="/listings" className="text-navy-600 hover:underline text-sm">
              Clear all filters
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((attorney) => (
              <ListingCard key={attorney.id} attorney={attorney} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={buildUrl(page - 1)}
                  className="flex items-center gap-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              )}
              <span className="text-sm text-slate-500 px-4">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={buildUrl(page + 1)}
                  className="flex items-center gap-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
