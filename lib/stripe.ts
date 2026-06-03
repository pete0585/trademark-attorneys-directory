import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const VERIFIED_PRICE_ID = process.env.STRIPE_VERIFIED_PRICE_ID!
export const FEATURED_PRICE_ID = process.env.STRIPE_FEATURED_PRICE_ID!
