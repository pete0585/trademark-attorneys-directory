import { createClient } from '@/lib/supabase/server'
import type { Listing, SearchFilters } from '@/lib/types'

const PAGE_SIZE = 20

export async function getListings(filters: SearchFilters = {}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  const { q, state, practice_area, creator_type, flat_fee, virtual, tier, page = 1 } = filters
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('tm_listings')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier', { ascending: false })
    .order('full_name', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,law_firm_name.ilike.%${q}%,city.ilike.%${q}%`)
  }
  if (state) {
    query = query.eq('state', state.toUpperCase())
  }
  if (practice_area) {
    query = query.contains('practice_areas', [practice_area])
  }
  if (creator_type) {
    query = query.contains('creator_types', [creator_type])
  }
  if (flat_fee) {
    query = query.eq('flat_fee_filings', true)
  }
  if (virtual) {
    query = query.eq('virtual_consult', true)
  }
  if (tier) {
    query = query.eq('listing_tier', tier)
  }

  const { data, count, error } = await query

  if (error) throw error

  return { listings: (data as Listing[]) ?? [], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as Listing
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Listing
}

export async function getListingsByState(state: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .eq('state', state.toUpperCase())
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier', { ascending: false })
    .order('full_name', { ascending: true })
    .limit(50)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getListingsByCreatorType(creatorType: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .contains('creator_types', [creatorType])
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier', { ascending: false })
    .limit(50)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getFeaturedListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .eq('listing_tier', 'featured')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('full_name', { ascending: true })
    .limit(6)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getRecentListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getTotalCount(): Promise<number> {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('tm_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error) return 0
  return count ?? 0
}

export async function getStateCounts(): Promise<{ state: string; count: number }[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error || !data) return []

  const counts: Record<string, number> = {}
  for (const row of data) {
    counts[row.state] = (counts[row.state] ?? 0) + 1
  }

  return Object.entries(counts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('slug')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error) return []
  return data?.map((r) => r.slug) ?? []
}

export async function getListingsByCity(city: string, state: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('*')
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier', { ascending: false })
    .limit(30)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getCityCount(): Promise<number> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error || !data) return 0
  const unique = new Set(data.map((r) => `${r.city}-${r.state}`))
  return unique.size
}

export async function getCitiesByState(state: string): Promise<{ city: string; count: number }[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tm_listings')
    .select('city')
    .eq('state', state.toUpperCase())
    .eq('is_active', true)
    .eq('is_approved', true)

  if (error || !data) return []

  const counts: Record<string, number> = {}
  for (const row of data) {
    if (row.city) counts[row.city] = (counts[row.city] ?? 0) + 1
  }

  return Object.entries(counts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
}
