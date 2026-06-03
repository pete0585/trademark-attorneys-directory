import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const listingId = session.metadata?.listing_id
    const tier = session.metadata?.tier

    if (!listingId || !tier) {
      return NextResponse.json({ received: true })
    }

    await supabase
      .from('tm_listings')
      .update({
        listing_tier: tier,
        stripe_customer_id: session.customer as string ?? null,
        subscription_expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', listingId)

    await supabase.from('tm_payments').insert({
      listing_id: listingId,
      stripe_session_id: session.id,
      amount: session.amount_total,
      tier,
      status: 'paid',
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string

    await supabase
      .from('tm_listings')
      .update({
        listing_tier: 'free',
        stripe_subscription_id: null,
        subscription_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId)
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice
    const customerId = invoice.customer as string

    await supabase
      .from('tm_listings')
      .update({
        listing_tier: 'free',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId)
  }

  return NextResponse.json({ received: true })
}
