import { NextRequest, NextResponse } from 'next/server'
import { stripe, VERIFIED_PRICE_ID, FEATURED_PRICE_ID } from '@/lib/stripe'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const listingId = searchParams.get('listing_id')
  const tier = searchParams.get('tier') as 'verified' | 'featured' | null

  if (!listingId || !tier) {
    return NextResponse.json({ error: 'Missing listing_id or tier' }, { status: 400 })
  }

  const priceId = tier === 'featured' ? FEATURED_PRICE_ID : VERIFIED_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.findtrademarkattorney.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { listing_id: listingId, tier },
    success_url: `${siteUrl}/listings?upgraded=true`,
    cancel_url: `${siteUrl}/listings`,
  })

  return NextResponse.redirect(session.url!)
}
