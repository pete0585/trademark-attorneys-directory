'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface Props {
  listings: Listing[]
}

export default function AdminTable({ listings }: Props) {
  const [rows, setRows] = useState(listings)
  const supabase = createClient()

  async function approve(id: string) {
    await supabase
      .from('tm_listings')
      .update({ is_approved: true, updated_at: new Date().toISOString() })
      .eq('id', id)
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  async function reject(id: string) {
    await supabase
      .from('tm_listings')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  if (rows.length === 0) {
    return <p className="text-sm text-gray-500">No listings in this queue.</p>
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border text-left">
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Submitted</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {rows.map((listing) => (
            <tr key={listing.id} className="hover:bg-surface/50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{listing.full_name}</div>
                {listing.law_firm_name && (
                  <div className="text-xs text-gray-500">{listing.law_firm_name}</div>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {listing.city}, {listing.state}
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">{listing.source ?? '—'}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {new Date(listing.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approve(listing.id)}
                    className="flex items-center gap-1 text-xs text-brand-sage hover:text-brand-sage-light font-medium"
                  >
                    <CheckCircle className="w-4 h-4" aria-label="Approve" />
                    Approve
                  </button>
                  <button
                    onClick={() => reject(listing.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    <XCircle className="w-4 h-4" aria-label="Reject" />
                    Reject
                  </button>
                  <a
                    href={`/listings/${listing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-indigo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-label="View" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
