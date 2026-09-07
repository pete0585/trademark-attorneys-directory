/**
 * Single canonical production origin for metadata, robots, and sitemap.
 *
 * Live check (2026-08-31, following redirects):
 * - trademarksearchdirectory.com — DNS NXDOMAIN (does not serve the site)
 * - findtrademarkattorney.com — HTTP 200, no redirect
 * - www.findtrademarkattorney.com — HTTP 200, no redirect
 *
 * Apex and www both serve the same Vercel deployment. Neither redirects to the
 * other, so the canonical host is the one already used by the sitemap and
 * page-level alternates.canonical tags: www.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findtrademarkattorney.com'
).replace(/\/$/, '')

/** Absolute canonical for a city landing page under /trademark-attorneys/{city}-{state}. */
export function cityPageCanonical(slug: string): string {
  return `${SITE_URL}/trademark-attorneys/${slug}`
}

/**
 * City slugs served by app/trademark-attorneys/[location].
 * Static {city}-{state} folders override this route when both exist.
 */
export const CITY_SLUGS = [
  'new-york-ny',
  'los-angeles-ca',
  'chicago-il',
  'houston-tx',
  'san-francisco-ca',
  'austin-tx',
  'miami-fl',
  'seattle-wa',
  'boston-ma',
  'atlanta-ga',
  'denver-co',
  'dallas-tx',
  'nashville-tn',
  'philadelphia-pa',
  'phoenix-az',
  'portland-or',
  'san-diego-ca',
  'orlando-fl',
  'charlotte-nc',
  'washington-dc',
] as const

/** Category pages under app/categories/[slug] (CREATOR_TYPES keys). */
export const CATEGORY_SLUGS = [
  'small_business',
  'startup',
  'content_creator',
  'ecommerce',
  'saas_app',
  'podcaster',
  'author_coach',
] as const

/** Guide articles that exist under app/guides/[slug] (GUIDES keys). */
export const GUIDE_SLUGS = [
  'what-is-trademark-registration',
  'how-to-find-trademark-attorney',
  'trademark-registration-cost',
] as const

/** State landing pages under app/states/[state] (STATE_PAGES keys). */
export const STATE_SLUGS = [
  'california',
  'new-york',
  'texas',
  'florida',
  'illinois',
] as const
