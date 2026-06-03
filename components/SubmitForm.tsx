'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { PRACTICE_AREAS, CREATOR_TYPES, STATE_NAMES } from '@/lib/utils'

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  law_firm_name: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  website: z.string().url('Must be a valid URL (include https://)').optional().or(z.literal('')),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Select a state'),
  bio: z.string().max(1000, 'Bio must be 1000 characters or less').optional(),
  uspto_registration_number: z.string().optional(),
  practice_areas: z.array(z.string()).optional(),
  creator_types: z.array(z.string()).optional(),
  flat_fee_filings: z.boolean().optional(),
  virtual_consult: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      practice_areas: [],
      creator_types: [],
      flat_fee_filings: false,
      virtual_consult: false,
    },
  })

  async function onSubmit(data: FormData) {
    setError(null)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const j = await res.json()
        throw new Error(j.error ?? 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle className="w-12 h-12 text-brand-sage mx-auto mb-4" aria-label="Success" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Submitted!</h2>
        <p className="text-gray-600">
          Your listing is pending review and will be live within 24 hours. We&apos;ll email you at your provided address when it&apos;s approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('full_name')}
            type="text"
            placeholder="Jane Smith"
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Law Firm Name</label>
          <input
            {...register('law_firm_name')}
            type="text"
            placeholder="Smith IP Law"
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@smithiplaw.com"
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="(555) 555-5555"
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input
          {...register('website')}
          type="url"
          placeholder="https://smithiplaw.com"
          className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
        />
        {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register('city')}
            type="text"
            placeholder="Los Angeles"
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <select
            {...register('state')}
            className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo bg-white"
          >
            <option value="">Select state</option>
            {Object.entries(STATE_NAMES).map(([abbr, name]) => (
              <option key={abbr} value={abbr}>{name}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">USPTO Registration Number</label>
        <input
          {...register('uspto_registration_number')}
          type="text"
          placeholder="12345"
          className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo"
        />
        <p className="text-xs text-gray-500 mt-1">Find yours at oedci.uspto.gov</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio (optional)</label>
        <textarea
          {...register('bio')}
          rows={4}
          placeholder="Tell creators and small businesses about your practice and experience..."
          className="w-full px-3 py-2.5 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo resize-none"
        />
        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Areas</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PRACTICE_AREAS).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                value={key}
                {...register('practice_areas')}
                className="w-4 h-4 rounded border-surface-border text-brand-indigo focus:ring-brand-indigo"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">I Specialize in Clients Who Are...</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(CREATOR_TYPES).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                value={key}
                {...register('creator_types')}
                className="w-4 h-4 rounded border-surface-border text-brand-amber focus:ring-brand-amber"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('flat_fee_filings')}
            className="w-4 h-4 rounded border-surface-border text-brand-sage focus:ring-brand-sage"
          />
          <span className="text-sm text-gray-700">I offer flat-fee trademark filing packages</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('virtual_consult')}
            className="w-4 h-4 rounded border-surface-border text-brand-indigo focus:ring-brand-indigo"
          />
          <span className="text-sm text-gray-700">I offer virtual consultations</span>
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Free Listing'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Free listings are reviewed within 24 hours. Upgrade to Verified after approval.
      </p>
    </form>
  )
}
