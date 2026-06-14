import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const listingId = searchParams.get('listing_id')

  if (!token || !listingId) {
    return NextResponse.json({ error: 'Missing token or listing_id' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: claim, error } = await supabase
    .from('trademark_attorneys_claims')
    .select('*')
    .eq('listing_id', listingId)
    .eq('token', token)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !claim) {
    return NextResponse.redirect(new URL(`/claim/${listingId}?error=invalid`, req.url))
  }

  await supabase
    .from('trademark_attorneys_claims')
    .update({ verified: true, verified_at: new Date().toISOString() })
    .eq('id', claim.id)

  await supabase
    .from('trademark_attorneys_listings')
    .update({ claimed: true, claimed_at: new Date().toISOString() })
    .eq('id', listingId)

  return NextResponse.redirect(new URL(`/claim/${listingId}?action=verify&token=${token}`, req.url))
}
