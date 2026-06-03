'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { STATE_NAMES, PRACTICE_AREAS, CREATOR_TYPES } from '@/lib/utils'

interface Props {
  selectedState?: string
  selectedPracticeArea?: string
  selectedCreatorType?: string
  flatFee?: boolean
  virtual?: boolean
}

export default function FilterSidebar({
  selectedState,
  selectedPracticeArea,
  selectedCreatorType,
  flatFee,
  virtual,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/listings?${params.toString()}`)
    })
  }

  function toggleBoolean(key: string, current: boolean) {
    updateFilter(key, current ? null : 'true')
  }

  const hasFilters = !!(selectedState || selectedPracticeArea || selectedCreatorType || flatFee || virtual)

  return (
    <div className="space-y-5">
      {hasFilters && (
        <button
          onClick={() => {
            startTransition(() => {
              router.push('/listings')
            })
          }}
          className="text-xs text-brand-amber hover:underline font-medium"
        >
          Clear all filters
        </button>
      )}

      {/* Creator Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Client Type</h3>
        <div className="space-y-1.5">
          {Object.entries(CREATOR_TYPES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('creator_type', selectedCreatorType === key ? null : key)}
              className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${
                selectedCreatorType === key
                  ? 'bg-brand-amber/10 text-brand-amber-dark font-medium'
                  : 'text-gray-600 hover:bg-surface hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Practice Area */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Practice Area</h3>
        <div className="space-y-1.5">
          {Object.entries(PRACTICE_AREAS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('practice_area', selectedPracticeArea === key ? null : key)}
              className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${
                selectedPracticeArea === key
                  ? 'bg-brand-indigo/10 text-brand-indigo font-medium'
                  : 'text-gray-600 hover:bg-surface hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">State</h3>
        <select
          value={selectedState ?? ''}
          onChange={(e) => updateFilter('state', e.target.value || null)}
          className="w-full text-xs px-3 py-2 border border-surface-border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-indigo"
        >
          <option value="">All States</option>
          {Object.entries(STATE_NAMES).map(([abbr, name]) => (
            <option key={abbr} value={abbr}>{name}</option>
          ))}
        </select>
      </div>

      {/* Options */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!flatFee}
              onChange={() => toggleBoolean('flat_fee', !!flatFee)}
              className="w-4 h-4 rounded border-surface-border text-brand-amber focus:ring-brand-amber"
            />
            <span className="text-xs text-gray-700">Flat-Fee Filings</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!virtual}
              onChange={() => toggleBoolean('virtual', !!virtual)}
              className="w-4 h-4 rounded border-surface-border text-brand-indigo focus:ring-brand-indigo"
            />
            <span className="text-xs text-gray-700">Virtual Consultations</span>
          </label>
        </div>
      </div>
    </div>
  )
}
