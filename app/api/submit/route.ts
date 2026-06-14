import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    name,
    firm_name,
    email,
    phone,
    website,
    city,
    state,
    bio,
    practice_areas,
    specialties,
    free_consultation,
    accepting_new_clients,
    bar_number,
  } = body

  if (!name || !city || !state) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const baseSlug = slugify(`${name}-trademark-attorney-${city}-${state}`)
  let slug = baseSlug
  let attempt = 0

  while (attempt < 5) {
    const { data: existing } = await supabase
      .from('trademark_attorneys_listings')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!existing) break
    attempt++
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
  }

  const { data, error } = await supabase
    .from('trademark_attorneys_listings')
    .insert({
      slug,
      name,
      firm_name: firm_name || null,
      email: email || null,
      phone: phone || null,
      website: website || null,
      city,
      state: state.toUpperCase(),
      bio: bio || null,
      practice_areas: practice_areas ?? [],
      specialties: specialties ?? [],
      free_consultation: free_consultation ?? false,
      accepting_new_clients: accepting_new_clients ?? false,
      bar_number: bar_number || null,
      plan_tier: 'free',
      credential_verified: false,
      status: 'active',
    })
    .select('id, slug')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id, slug: data.slug })
}
