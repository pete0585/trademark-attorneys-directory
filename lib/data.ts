import { createPublicClient } from './supabase/server'
import type { TrademarkAttorney } from '@/lib/types'

const TABLE = 'trademark_attorneys_listings'

export async function getTotalCount(): Promise<number> {
  const supabase = createPublicClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')
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
} = {}): Promise<{ listings: TrademarkAttorney[]; total: number }> {
  const supabase = createPublicClient()
  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .order('name', { ascending: true })

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (specialty) query = query.contains('specialties', [specialty])
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,firm_name.ilike.%${search}%,city.ilike.%${search}%,state.ilike.%${search}%`,
    )
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, count } = await query
  return { listings: (data as TrademarkAttorney[]) ?? [], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<TrademarkAttorney | null> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  return data as TrademarkAttorney | null
}

export async function getListingById(id: string): Promise<TrademarkAttorney | null> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  return data as TrademarkAttorney | null
}

export async function getFeaturedListings(limit = 6): Promise<TrademarkAttorney[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'active')
    .in('plan_tier', ['verified', 'featured'])
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .limit(limit)
  return (data as TrademarkAttorney[]) ?? []
}

export async function getListingsByState(
  state: string,
  limit = 20,
): Promise<TrademarkAttorney[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('state', state)
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .limit(limit)
  return (data as TrademarkAttorney[]) ?? []
}

export async function getActiveStates(): Promise<string[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('state')
    .eq('status', 'active')
  const states = Array.from(
    new Set((data ?? []).map((r: { state: string }) => r.state).filter(Boolean)),
  ).sort()
  return states as string[]
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = createPublicClient()
  const { data } = await supabase
    .from(TABLE)
    .select('slug')
    .eq('status', 'active')
  return (data ?? []).map((r: { slug: string }) => r.slug)
}

// Map creator type slugs to specialty keywords for filtering
const CREATOR_TYPE_SPECIALTIES: Record<string, string> = {
  small_business: 'Small Business',
  startup: 'Startup',
  content_creator: 'Content Creator',
  ecommerce: 'E-commerce',
  saas_app: 'Software',
  podcaster: 'Entertainment',
  author_coach: 'Copyright',
}

export async function getListingsByCreatorType(
  creatorType: string,
  limit = 24,
): Promise<TrademarkAttorney[]> {
  const supabase = createPublicClient()
  const specialty = CREATOR_TYPE_SPECIALTIES[creatorType]
  let query = supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'active')
    .order('plan_tier_rank', { ascending: false, nullsFirst: false })
    .limit(limit)

  if (specialty) {
    query = query.contains('specialties', [specialty])
  }

  const { data } = await query
  return (data as TrademarkAttorney[]) ?? []
}
