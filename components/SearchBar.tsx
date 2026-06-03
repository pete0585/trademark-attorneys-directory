'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  large?: boolean
  className?: string
}

export default function SearchBar({ large, className }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [q, setQ] = useState(searchParams.get('q') ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (q.trim()) {
      params.set('q', q.trim())
    } else {
      params.delete('q')
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/listings?${params.toString()}`)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative', className)}
    >
      <div className={cn(
        'flex items-center bg-white border border-surface-border rounded-xl shadow-sm overflow-hidden',
        large && 'shadow-lg'
      )}>
        <Search className={cn('shrink-0 text-gray-400 ml-4', large ? 'w-5 h-5' : 'w-4 h-4')} aria-label="Search" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, firm, or city..."
          className={cn(
            'flex-1 px-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400',
            large ? 'py-3.5 text-base' : 'py-2.5 text-sm'
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'shrink-0 bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold transition-colors mr-1.5 rounded-lg',
            large ? 'px-5 py-2.5 my-1.5 text-sm' : 'px-4 py-2 my-1 text-xs'
          )}
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}
