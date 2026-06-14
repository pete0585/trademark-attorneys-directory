import { createClient } from './supabase/server'
import type { TrademarkAttorney } from '@/lib/types'

const TABLE = 'trademark_attorney_listings'

export async function getTotalCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)
  return count ?? 0
}

export async function getListings({
  state,
  city,
  specialty,
  search,
  page = 1,
  pageSize = 24,
}: {
  state?: string
  city?: string
  specialty?: string
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ listings: TrademarkAttorney[]; total: number }> {
  const supabase = await createClient()
  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .order('full_name', { ascending: true })

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (specialty) query = query.contains('specialties', [specialty])
  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,firm_name.ilike.%${search}%,city.ilike.%${search}%,state.ilike.%${search}%`,
    )
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, count } = await query
  return { listings: data ?? [], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<TrademarkAttorney | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data
}

export async function getFeaturedListings(limit = 6): Promise<TrademarkAttorney[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .in('plan_tier', ['verified', 'featured'])
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getListingsByState(
  state: string,
  limit = 20,
): Promise<TrademarkAttorney[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('state', state)
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getActiveStates(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)
  const states = Array.from(
    new Set((data ?? []).map((r: { state: string }) => r.state).filter(Boolean)),
  ).sort()
  return states as string[]
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('slug')
    .eq('is_active', true)
    .eq('is_approved', true)
  return (data ?? []).map((r: { slug: string }) => r.slug)
}
