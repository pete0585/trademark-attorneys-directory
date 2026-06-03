import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-surface-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-indigo">
            <Scale className="w-5 h-5 text-brand-amber" aria-label="Logo" />
            <span className="text-sm sm:text-base">FindTrademarkAttorney</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/listings"
              className="text-sm text-gray-600 hover:text-brand-indigo font-medium transition-colors hidden sm:block"
            >
              Find Attorney
            </Link>
            <Link
              href="/submit"
              className="text-sm bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Add Listing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
