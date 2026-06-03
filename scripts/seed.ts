/**
 * Seed script for trademark-attorneys directory.
 *
 * Data sources:
 * 1. USPTO OED public database (oedci.uspto.gov) — all registered trademark practitioners by state
 * 2. DataForSEO Google Maps — "trademark attorney" in 50 major metros for enrichment
 * 3. State bar directories (CA, NY, TX, FL, IL) — IP/trademark practice area filter
 *
 * Run: npx ts-node --project tsconfig.json scripts/seed.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const sampleListings = [
  {
    full_name: 'Sarah Chen',
    law_firm_name: 'Chen IP Law Group',
    city: 'Los Angeles',
    state: 'CA',
    phone: '(213) 555-0142',
    website: 'https://cheniplaw.com',
    bio: 'Trademark attorney specializing in the creator economy — YouTubers, Shopify brands, and SaaS companies. Flat-fee trademark registration packages starting at $1,200. Former USPTO examiner.',
    practice_areas: ['trademark_registration', 'trademark_search', 'trademark_enforcement'],
    creator_types: ['content_creator', 'ecommerce', 'saas_app'],
    flat_fee_filings: true,
    virtual_consult: true,
    listing_tier: 'featured' as const,
    source: 'seed',
  },
  {
    full_name: 'Marcus Williams',
    law_firm_name: 'Williams Brand Law',
    city: 'Austin',
    state: 'TX',
    phone: '(512) 555-0278',
    website: 'https://williamsbrandlaw.com',
    bio: 'Austin-based trademark attorney serving e-commerce founders and small businesses. Flat-fee packages for entrepreneurs. Free 30-minute consultation.',
    practice_areas: ['trademark_registration', 'trademark_search', 'copyright', 'licensing'],
    creator_types: ['ecommerce', 'small_business', 'author_coach'],
    flat_fee_filings: true,
    virtual_consult: true,
    listing_tier: 'verified' as const,
    source: 'seed',
  },
  {
    full_name: 'Jennifer Park',
    law_firm_name: 'Park IP Attorneys',
    city: 'New York',
    state: 'NY',
    phone: '(212) 555-0391',
    website: 'https://parkipatty.com',
    bio: 'NYC trademark attorney with 12 years of experience. Specialize in protecting podcasters, authors, and coaches who are building personal brands in competitive markets.',
    practice_areas: ['trademark_registration', 'trademark_opposition', 'trademark_enforcement', 'copyright'],
    creator_types: ['podcaster', 'author_coach', 'content_creator'],
    flat_fee_filings: false,
    virtual_consult: true,
    listing_tier: 'verified' as const,
    source: 'seed',
  },
  {
    full_name: 'David Rodriguez',
    law_firm_name: 'Rodriguez IP Law',
    city: 'Miami',
    state: 'FL',
    phone: '(305) 555-0467',
    website: 'https://rodrigueziplaw.com',
    bio: 'Miami trademark attorney serving local businesses and e-commerce brands. Bilingual (English/Spanish). Flat-fee trademark services for small business owners.',
    practice_areas: ['trademark_registration', 'trademark_search', 'brand_strategy'],
    creator_types: ['small_business', 'ecommerce'],
    flat_fee_filings: true,
    virtual_consult: true,
    languages: ['English', 'Spanish'],
    listing_tier: 'verified' as const,
    source: 'seed',
  },
  {
    full_name: 'Rachel Thompson',
    law_firm_name: 'Thompson Creative Law',
    city: 'Nashville',
    state: 'TN',
    phone: '(615) 555-0523',
    website: 'https://thompsoncreativelaw.com',
    bio: 'Nashville trademark attorney focused on the music and entertainment industry — artists, labels, podcast networks, and content creators. Experienced in both trademark and copyright matters.',
    practice_areas: ['trademark_registration', 'copyright', 'licensing', 'trademark_enforcement'],
    creator_types: ['podcaster', 'content_creator', 'author_coach'],
    flat_fee_filings: true,
    virtual_consult: true,
    listing_tier: 'featured' as const,
    source: 'seed',
  },
  {
    full_name: 'Kevin Okafor',
    law_firm_name: 'Okafor IP Group',
    city: 'Chicago',
    state: 'IL',
    phone: '(312) 555-0634',
    website: 'https://okaforipgroup.com',
    bio: 'Chicago-based IP attorney serving SaaS startups and tech entrepreneurs. Experienced in software trademark registration, logo protection, and trade secret matters.',
    practice_areas: ['trademark_registration', 'trademark_search', 'trade_secrets', 'licensing'],
    creator_types: ['saas_app', 'small_business', 'ecommerce'],
    flat_fee_filings: false,
    virtual_consult: true,
    listing_tier: 'verified' as const,
    source: 'seed',
  },
  {
    full_name: 'Amanda Foster',
    law_firm_name: 'Foster Trademark Solutions',
    city: 'Seattle',
    state: 'WA',
    phone: '(206) 555-0745',
    website: 'https://fostertrademark.com',
    bio: 'Seattle trademark attorney specializing in tech startups and e-commerce brands. Flat-fee packages from search through registration. Former Amazon brand protection team.',
    practice_areas: ['trademark_registration', 'trademark_search', 'trademark_enforcement'],
    creator_types: ['saas_app', 'ecommerce', 'small_business'],
    flat_fee_filings: true,
    virtual_consult: true,
    listing_tier: 'featured' as const,
    source: 'seed',
  },
  {
    full_name: 'Thomas Walsh',
    law_firm_name: 'Walsh IP Law',
    city: 'Denver',
    state: 'CO',
    phone: '(303) 555-0856',
    website: 'https://walshiplaw.com',
    bio: 'Denver trademark attorney with flat-fee services for outdoor brands, wellness companies, and lifestyle entrepreneurs. Quick turnarounds and clear communication.',
    practice_areas: ['trademark_registration', 'trademark_search', 'brand_strategy', 'copyright'],
    creator_types: ['small_business', 'ecommerce', 'author_coach'],
    flat_fee_filings: true,
    virtual_consult: true,
    listing_tier: 'verified' as const,
    source: 'seed',
  },
  {
    full_name: 'Lisa Kim',
    city: 'San Francisco',
    state: 'CA',
    phone: '(415) 555-0912',
    website: 'https://kimtrademark.com',
    practice_areas: ['trademark_registration', 'trademark_search'],
    creator_types: ['saas_app', 'content_creator'],
    flat_fee_filings: false,
    virtual_consult: false,
    listing_tier: 'free' as const,
    source: 'seed',
  },
  {
    full_name: 'Robert Martinez',
    law_firm_name: 'Martinez Law Office',
    city: 'Houston',
    state: 'TX',
    phone: '(713) 555-1023',
    practice_areas: ['trademark_registration'],
    creator_types: ['small_business'],
    flat_fee_filings: false,
    virtual_consult: false,
    listing_tier: 'free' as const,
    source: 'seed',
  },
]

async function seed() {
  console.log('Seeding trademark attorney listings...')

  for (const listing of sampleListings) {
    const baseSlug = slugify(`${listing.full_name}-trademark-attorney-${listing.city}-${listing.state}`)
    let slug = baseSlug
    let attempt = 0

    while (attempt < 5) {
      const { data: existing } = await supabase
        .from('tm_listings')
        .select('id')
        .eq('slug', slug)
        .single()

      if (!existing) break
      attempt++
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
    }

    const { error } = await supabase.from('tm_listings').insert({
      slug,
      ...listing,
      languages: (listing as { languages?: string[] }).languages ?? [],
      is_active: true,
      is_approved: true,
    })

    if (error) {
      console.error(`Failed to insert ${listing.full_name}:`, error.message)
    } else {
      console.log(`✓ Inserted: ${listing.full_name} (${listing.city}, ${listing.state})`)
    }
  }

  console.log('\nSeed complete!')
  console.log('\nNext steps for full data seeding:')
  console.log('1. Query USPTO OED (oedci.uspto.gov) for all 50 states')
  console.log('2. Run DataForSEO Maps for "trademark attorney" in 50 major metros')
  console.log('3. Use the data-seeder agent with slug: trademark-attorneys')
}

seed().catch(console.error)
