import { createClient } from '@/lib/supabase/server'
import type { Listing, SearchFilters } from '@/lib/types'

const PAGE_SIZE = 20
const TABLE = 'trademark_attorneys_listings'

export async function getListings(filters: SearchFilters = {}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  const { q, state, practice_area, creator_type, flat_fee, virtual, tier, page = 1 } = filters
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .order('name', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  if (q) {
    query = query.or(`name.ilike.%${q}%,firm_name.ilike.%${q}%,city.ilike.%${q}%`)
  }
  if (state) {
    query = query.eq('state', state.toUpperCase())
  }
  if (practice_area) {
    query = query.contains('practice_areas', [practice_area])
  }
  if (creator_type) {
    query = query.contains('specialties', [creator_type])
  }
  if (flat_fee) {
    query = query.eq('free_consultation', true)
  }
  if (virtual) {
    query = query.eq('accepting_new_clients', true)
  }
  if (tier) {
    query = query.eq('plan_tier', tier)
  }

  const { data, count, error } = await query

  if (error) throw error

  return { listings: (data as Listing[]) ?? [], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error) return null
  return data as Listing
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Listing
}

export async function getListingsByState(state: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('state', state.toUpperCase())
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .order('name', { ascending: true })
    .limit(50)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getListingsByCreatorType(creatorType: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .contains('specialties', [creatorType])
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .limit(50)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getFeaturedListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('plan_tier', 'featured')
    .eq('status', 'active')
    .order('name', { ascending: true })
    .limit(6)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getRecentListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getTotalCount(): Promise<number> {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  if (error) return 0
  return count ?? 0
}

export async function getStateCounts(): Promise<{ state: string; count: number }[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('state')
    .eq('status', 'active')

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
    .from(TABLE)
    .select('slug')
    .eq('status', 'active')

  if (error) return []
  return data?.map((r) => r.slug) ?? []
}

export async function getListingsByCity(city: string, state: string): Promise<Listing[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .limit(30)

  if (error) return []
  return (data as Listing[]) ?? []
}

export async function getCityCount(): Promise<number> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('city, state')
    .eq('status', 'active')

  if (error || !data) return 0
  const unique = new Set(data.map((r) => `${r.city}-${r.state}`))
  return unique.size
}

export async function getCitiesByState(state: string): Promise<{ city: string; count: number }[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('city')
    .eq('state', state.toUpperCase())
    .eq('status', 'active')

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
