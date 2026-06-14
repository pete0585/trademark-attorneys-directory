'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Scale } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-navy-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-lg text-white hover:text-gold-300 transition-colors">
            <Scale className="w-5 h-5 text-gold-400" />
            <span>TrademarksearchDirectory</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/listings" className="text-slate-200 hover:text-gold-300 transition-colors">Find an Attorney</Link>
            <Link href="/listings?specialty=Trademark+Registration" className="text-slate-200 hover:text-gold-300 transition-colors">USPTO Registration</Link>
            <Link href="/listings?specialty=Trademark+Enforcement" className="text-slate-200 hover:text-gold-300 transition-colors">Enforcement</Link>
            <Link
              href="/claim"
              className="bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Claim Your Listing
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded text-slate-200 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-navy-700 border-t border-navy-500 px-4 py-4 space-y-3">
          <Link href="/listings" className="block text-slate-200 hover:text-gold-300" onClick={() => setOpen(false)}>Find an Attorney</Link>
          <Link href="/listings?specialty=Trademark+Registration" className="block text-slate-200 hover:text-gold-300" onClick={() => setOpen(false)}>USPTO Registration</Link>
          <Link href="/listings?specialty=Trademark+Enforcement" className="block text-slate-200 hover:text-gold-300" onClick={() => setOpen(false)}>Enforcement</Link>
          <Link href="/claim" className="block bg-gold-500 text-navy-700 font-semibold px-4 py-2 rounded-lg text-center" onClick={() => setOpen(false)}>Claim Your Listing</Link>
        </div>
      )}
    </nav>
  )
}
