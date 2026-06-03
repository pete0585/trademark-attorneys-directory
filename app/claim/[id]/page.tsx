import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Shield } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase/server'
import { getListingById } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Claim Your Listing | FindTrademarkAttorney.com',
  description: 'Verify your trademark attorney listing on FindTrademarkAttorney.com.',
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; action?: string }>
}

export default async function ClaimPage({ params, searchParams }: Props) {
  const { id } = await params
  const { token, action } = await searchParams

  const listing = await getListingById(id)
  if (!listing) notFound()

  // Verification flow
  if (token && action === 'verify') {
    const supabase = await createServiceClient()

    const { data: claim, error } = await supabase
      .from('tm_claims')
      .select('*')
      .eq('listing_id', id)
      .eq('token', token)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !claim) {
      return (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" aria-label="Error" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired or Invalid</h1>
          <p className="text-gray-600 mb-6">
            This verification link has expired or is invalid. Please request a new claim link.
          </p>
          <Link href={`/listings/${listing.slug}`} className="btn-primary">
            Back to Listing
          </Link>
        </div>
      )
    }

    // Mark claim verified
    await supabase
      .from('tm_claims')
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq('id', claim.id)

    // Mark listing as claimed
    await supabase
      .from('tm_listings')
      .update({ claimed_at: new Date().toISOString(), claimed_by: claim.email })
      .eq('id', id)

    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-12 h-12 text-brand-sage mx-auto mb-4" aria-label="Success" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Claimed!</h1>
        <p className="text-gray-600 mb-6">
          You&apos;ve successfully claimed your listing for <strong>{listing.full_name}</strong>.
          Upgrade to Verified to add your photo, bio, specializations, and start receiving inquiries directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`/api/upgrade?listing_id=${listing.id}&tier=verified`}
            className="btn-primary"
          >
            Upgrade to Verified — $99/yr
          </a>
          <Link href={`/listings/${listing.slug}`} className="btn-outline">
            View My Profile
          </Link>
        </div>
      </div>
    )
  }

  // Show claim form
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Shield className="w-10 h-10 text-brand-indigo mx-auto mb-3" aria-label="Claim" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Your Listing</h1>
        <p className="text-gray-600">
          Claim your listing for <strong>{listing.full_name}</strong> to update your profile
          and start receiving inquiries from creators and small businesses.
        </p>
      </div>

      <form action="/api/claim" method="POST" className="space-y-4">
        <input type="hidden" name="listing_id" value={listing.id} />
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@lawfirm.com"
            className="w-full px-4 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll send a verification link to this address.
          </p>
        </div>
        <button type="submit" className="btn-primary w-full">
          Send Verification Email
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        By claiming this listing, you confirm you are the attorney named above or an authorized representative.
      </p>
    </div>
  )
}
