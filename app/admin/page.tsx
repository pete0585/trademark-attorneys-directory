import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'

export const metadata: Metadata = {
  title: 'Admin | FindTrademarkAttorney.com',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const [{ data: pendingListings }, { count: totalListings }, { count: claimedListings }, { count: paidListings }] = await Promise.all([
    supabase
      .from('tm_listings')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('tm_listings')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase
      .from('tm_listings')
      .select('*', { count: 'exact', head: true })
      .not('claimed_at', 'is', null),
    supabase
      .from('tm_listings')
      .select('*', { count: 'exact', head: true })
      .in('listing_tier', ['verified', 'featured']),
  ])

  const stats = [
    { label: 'Total Listings', value: totalListings ?? 0 },
    { label: 'Claimed', value: claimedListings ?? 0 },
    { label: 'Paying', value: paidListings ?? 0 },
    { label: 'Pending Approval', value: pendingListings?.length ?? 0 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-brand-indigo">{s.value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {pendingListings && pendingListings.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approval ({pendingListings.length})</h2>
          <AdminTable listings={pendingListings} />
        </section>
      )}

      {(!pendingListings || pendingListings.length === 0) && (
        <div className="text-center py-12 bg-white rounded-xl border border-surface-border">
          <p className="text-gray-500">No listings pending approval.</p>
        </div>
      )}
    </div>
  )
}
