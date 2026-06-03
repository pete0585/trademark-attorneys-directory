import type { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Add Your Trademark Attorney Listing | FindTrademarkAttorney.com',
  description: 'Add your free listing to FindTrademarkAttorney.com. Reach creators and small business owners actively searching for a trademark attorney with your specialization.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Add Your Listing</h1>
        <p className="text-gray-600">
          Free listing for all USPTO-registered trademark attorneys. Upgrade to Verified ($99/yr)
          or Featured ($199/yr) to reach creators and small business owners searching for your exact
          specialization.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-surface-border rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Free Listing</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Name, firm, city, state</li>
            <li>✓ USPTO registration number</li>
            <li>✓ Phone and website</li>
          </ul>
        </div>
        <div className="bg-brand-indigo/5 border border-brand-indigo/20 rounded-xl p-4">
          <div className="text-sm font-semibold text-brand-indigo mb-1">Verified ($99/yr)</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Everything in Free</li>
            <li>✓ Photo, bio, specializations</li>
            <li>✓ Contact form to your inbox</li>
            <li>✓ Creator type tags</li>
            <li>✓ Flat-fee & virtual badges</li>
            <li>✓ Priority placement</li>
          </ul>
        </div>
      </div>

      <SubmitForm />
    </div>
  )
}
