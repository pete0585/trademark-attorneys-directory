import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/data'

const SITE_URL = 'https://trademarksearchdirectory.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/claim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const listingPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...listingPages]
}
