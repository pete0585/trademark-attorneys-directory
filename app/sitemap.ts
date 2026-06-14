import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { CREATOR_TYPES } from '@/lib/utils'

const BASE_URL = 'https://www.findtrademarkattorney.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [{ data: slugData }, { data: stateData }] = await Promise.all([
    supabase
      .from('trademark_attorneys_listings')
      .select('slug, updated_at')
      .eq('status', 'active')
      .limit(50000),
    supabase
      .from('trademark_attorneys_listings')
      .select('state')
      .eq('status', 'active'),
  ])

  const listingUrls: MetadataRoute.Sitemap = (slugData ?? []).map((r) => ({
    url: `${BASE_URL}/listings/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const uniqueStates = [...new Set((stateData ?? []).map((r) => r.state))]
  const stateUrls: MetadataRoute.Sitemap = uniqueStates.map((state) => ({
    url: `${BASE_URL}/listings?state=${state}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = Object.keys(CREATOR_TYPES).map((key) => ({
    url: `${BASE_URL}/categories/${key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticUrls, ...categoryUrls, ...stateUrls, ...listingUrls]
}
