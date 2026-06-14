'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

const SPECIALTIES = [
  'Trademark Registration',
  'Trademark Enforcement',
  'Trademark Opposition',
  'Trade Dress',
  'Copyright',
  'IP Litigation',
  'Brand Protection',
  'USPTO Filing',
]

interface SearchBarProps {
  defaultSearch?: string
  defaultState?: string
  defaultSpecialty?: string
  compact?: boolean
}

export default function SearchBar({
  defaultSearch = '',
  defaultState = '',
  defaultSpecialty = '',
  compact = false,
}: SearchBarProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [search, setSearch] = useState(defaultSearch)
  const [state, setState] = useState(defaultState)
  const [specialty, setSpecialty] = useState(defaultSpecialty)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (state) params.set('state', state)
    if (specialty) params.set('specialty', specialty)
    startTransition(() => {
      router.push(`/listings?${params.toString()}`)
    })
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search attorneys..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400"
          />
        </div>
        <button
          type="submit"
          className="bg-navy-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-500 transition-colors"
        >
          Search
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-card border border-slate-100 p-4 md:p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, firm, or city..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-navy-400 bg-white"
          >
            <option value="">All States</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-navy-400 bg-white"
          >
            <option value="">All Specialties</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-3 w-full bg-navy-600 hover:bg-navy-500 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Search Trademark Attorneys
      </button>
    </form>
  )
}
