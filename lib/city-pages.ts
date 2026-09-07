import { existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { CITY_SLUGS } from '@/lib/site'

const CITY_PAGES_DIR = join(process.cwd(), 'app/trademark-attorneys')

/** `{city}-{state}` folder names, e.g. seattle-wa, new-york-ny. Skips [location]. */
const CITY_STATE_FOLDER = /^[a-z0-9]+(?:-[a-z0-9]+)*-[a-z]{2}$/

/**
 * Discover static city landing pages from the App Router filesystem.
 * A folder counts when it matches {city}-{state} and contains page.tsx.
 */
export function discoverCityPageSlugs(dir = CITY_PAGES_DIR): string[] {
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        CITY_STATE_FOLDER.test(entry.name) &&
        existsSync(join(dir, entry.name, 'page.tsx')),
    )
    .map((entry) => entry.name)
}

/** All city URLs: filesystem pages plus slugs from the dynamic [location] route. */
export function getAllCityPageSlugs(): string[] {
  return Array.from(new Set([...discoverCityPageSlugs(), ...CITY_SLUGS])).sort()
}
