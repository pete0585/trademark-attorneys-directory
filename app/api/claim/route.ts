import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const listingId = formData.get('listing_id') as string
  const email = formData.get('email') as string

  if (!listingId || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('trademark_attorneys_listings')
    .select('id, name, slug')
    .eq('id', listingId)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  await supabase.from('trademark_attorneys_claims').insert({
    listing_id: listingId,
    email,
    token,
    verified: false,
    expires_at: expiresAt,
  })

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/claim/${listingId}?token=${token}&action=verify`

  const emailBody = JSON.stringify({
    from: 'FindTrademarkAttorney.com <noreply@findtrademarkattorney.com>',
    to: [email],
    subject: `Verify your claim for ${listing.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #2C3E7A;">Verify Your Listing Claim</h2>
        <p>You requested to claim the listing for <strong>${listing.name}</strong> on FindTrademarkAttorney.com.</p>
        <p>Click the button below to verify your ownership. This link expires in 72 hours.</p>
        <a href="${verifyUrl}" style="display:inline-block; background:#2C3E7A; color:white; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:600; margin:16px 0;">
          Verify My Listing
        </a>
        <p style="color:#666; font-size:13px;">If you didn&apos;t request this, ignore this email.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
        <p style="color:#999; font-size:12px;">FindTrademarkAttorney.com — The Trademark Attorney Directory for Creators &amp; Small Business</p>
      </div>
    `,
  })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: emailBody,
    })
  } catch {
    // Email failure is non-fatal — token is in DB
  }

  return NextResponse.redirect(
    new URL(`/claim/${listingId}?sent=true`, req.url)
  )
}
