import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-700 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-serif font-bold text-white text-lg mb-3">
              <Scale className="w-5 h-5 text-gold-400" />
              TrademarksearchDirectory.com
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              The most comprehensive directory of trademark attorneys in the United States.
              Find USPTO-registered IP lawyers for brand protection, trademark registration, and enforcement.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Find Attorneys</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="hover:text-gold-300 transition-colors">All Attorneys</Link></li>
              <li><Link href="/listings?specialty=Trademark+Registration" className="hover:text-gold-300 transition-colors">USPTO Registration</Link></li>
              <li><Link href="/listings?specialty=Trademark+Enforcement" className="hover:text-gold-300 transition-colors">Trademark Enforcement</Link></li>
              <li><Link href="/listings?specialty=Trade+Dress" className="hover:text-gold-300 transition-colors">Trade Dress</Link></li>
              <li><Link href="/listings?accepting_new=true" className="hover:text-gold-300 transition-colors">Accepting New Clients</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">For Attorneys</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/claim" className="hover:text-gold-300 transition-colors">Claim Your Listing</Link></li>
              <li><Link href="/claim" className="hover:text-gold-300 transition-colors">Get Verified</Link></li>
              <li><Link href="/claim" className="hover:text-gold-300 transition-colors">Featured Placement</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} TrademarksearchDirectory.com. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
