export interface Listing {
  id: string
  slug: string
  full_name: string
  law_firm_name: string | null
  uspto_registration_number: string | null
  registration_date: string | null
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  practice_areas: string[]
  creator_types: string[]
  flat_fee_filings: boolean
  virtual_consult: boolean
  languages: string[]
  listing_tier: 'free' | 'verified' | 'featured'
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null
  claimed_at: string | null
  claimed_by: string | null
  outreach_step: number
  outreach_sent_at: string | null
  source: string | null
  do_not_email: boolean
  email_source: string | null
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
