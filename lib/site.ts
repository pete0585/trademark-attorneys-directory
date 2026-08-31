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
export const SITE_URL = 'https://www.findtrademarkattorney.com'

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
