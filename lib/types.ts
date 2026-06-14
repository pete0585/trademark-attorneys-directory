export interface TrademarkAttorney {
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
  lat: number | null
  lng: number | null
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

export interface SearchParams {
  state?: string
  city?: string
  specialty?: string
  search?: string
  page?: number
  pageSize?: number
}

export type Listing = TrademarkAttorney
