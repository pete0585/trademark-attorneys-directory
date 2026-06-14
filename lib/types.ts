export interface Listing {
  id: string
  slug: string
  name: string
  firm_name: string | null
  practitioner_type: string
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  bar_number: string | null
  bar_admissions: string[]
  practice_areas: string[]
  specialties: string[]
  languages: string[]
  accepting_new_clients: boolean
  free_consultation: boolean
  years_experience: number | null
  credential_verified: boolean
  plan_tier: 'free' | 'verified' | 'featured'
  plan_tier_rank: number | null
  plan_expires_at: string | null
  claimed: boolean
  claimed_at: string | null
  stripe_customer_id: string | null
  status: string
  do_not_email: boolean
  email_source: string | null
  outreach_step: number
  outreach_last_sent_at: string | null
  upgrade_nudge_step: number
  upgrade_nudge_sent_at: string | null
  search_vector: string | null
  created_at: string
  updated_at: string
}

export interface SearchFilters {
  q?: string
  state?: string
  practice_area?: string
  creator_type?: string
  flat_fee?: boolean
  virtual?: boolean
  tier?: string
  page?: number
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at: string | null
  expires_at: string
  nudge_sent_at: string | null
  created_at: string
}

export interface Payment {
  id: string
  listing_id: string
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  amount: number | null
  tier: string | null
  status: string | null
  created_at: string
}
