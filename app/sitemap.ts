import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/data'
import { SITE_URL, CATEGORY_SLUGS, GUIDE_SLUGS, STATE_SLUGS } from '@/lib/site'

function page(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs()

  const staticPages: MetadataRoute.Sitemap = [
    page('/', 'daily', 1),
    page('/listings', 'daily', 0.9),
    page('/claim', 'monthly', 0.6),
    page('/guides', 'weekly', 0.8),
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) =>
    page(`/categories/${slug}`, 'weekly', 0.7),
  )

  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) =>
    page(`/guides/${slug}`, 'monthly', 0.6),
  )

  const statePages: MetadataRoute.Sitemap = STATE_SLUGS.map((state) =>
    page(`/states/${state}`, 'weekly', 0.8),
  )

  const listingPages: MetadataRoute.Sitemap = slugs.map((slug) =>
    page(`/listings/${slug}`, 'weekly', 0.7),
  )

  return [...staticPages, ...categoryPages, ...guidePages, ...statePages, ...listingPages]
}
