export interface TrademarkAttorney {
  id: string
  slug: string
  full_name: string
  firm_name: string | null
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  city: string
  state: string
  zip: string | null
  lat: number | null
  lng: number | null
  bar_number: string | null
  bar_state: string | null
  law_school: string | null
  areas_of_practice: string[]
  specialties: string[]
  languages: string[]
  telehealth: boolean
  accepting_new_clients: boolean
  practitioner_type: string
  plan_tier: 'free' | 'verified' | 'featured'
  listing_tier: 'unclaimed' | 'claimed' | 'verified' | 'featured'
  listing_tier_rank: number
  is_active: boolean
  is_approved: boolean
  claimed: boolean
  claimed_at: string | null
  stripe_customer_id: string | null
  plan_expires_at: string | null
  source: string | null
  outreach_step: number
  outreach_last_sent_at: string | null
  upgrade_nudge_step: number
  upgrade_nudge_sent_at: string | null
  do_not_email: boolean
  email_source: string | null
  search_vector: string | null
  created_at: string
  updated_at: string
}

export type Listing = TrademarkAttorney

export interface SearchParams {
  state?: string
  city?: string
  specialty?: string
  search?: string
  page?: number
}
