import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    full_name,
    law_firm_name,
    email,
    phone,
    website,
    city,
    state,
    bio,
    practice_areas,
    creator_types,
    flat_fee_filings,
    virtual_consult,
    uspto_registration_number,
  } = body

  if (!full_name || !city || !state) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const baseSlug = slugify(`${full_name}-trademark-attorney-${city}-${state}`)
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

  const { data, error } = await supabase
    .from('tm_listings')
    .insert({
      slug,
      full_name,
      law_firm_name: law_firm_name || null,
      email: email || null,
      phone: phone || null,
      website: website || null,
      city,
      state: state.toUpperCase(),
      bio: bio || null,
      practice_areas: practice_areas ?? [],
      creator_types: creator_types ?? [],
      flat_fee_filings: flat_fee_filings ?? false,
      virtual_consult: virtual_consult ?? false,
      uspto_registration_number: uspto_registration_number || null,
      listing_tier: 'free',
      is_active: true,
      is_approved: false,
      source: 'self_submit',
    })
    .select('id, slug')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id, slug: data.slug })
}
