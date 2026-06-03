import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trademark Guides for Creators & Business Owners | FindTrademarkAttorney.com',
  description:
    'Plain-English guides on trademark registration, how to choose an attorney, trademark vs. copyright, and what to ask before you hire. Written for creators and small business owners.',
  alternates: { canonical: 'https://www.findtrademarkattorney.com/guides' },
}

const guides = [
  {
    slug: 'what-is-trademark-registration',
    title: 'What Is Trademark Registration?',
    description:
      'What trademarks actually protect, why federal registration matters over common law rights, and how the USPTO application process works.',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-choose-a-trademark-attorney',
    title: 'How to Choose a Trademark Attorney (Without Getting Burned)',
    description:
      'USPTO registration requirements, specialization, flat-fee vs. hourly billing, red flags, and everything you need to vet an attorney before hiring.',
    readTime: '5 min read',
  },
  {
    slug: 'trademark-registration-process',
    title: 'How Long Does Trademark Registration Take?',
    description:
      'The full USPTO timeline from filing to certificate — what each stage takes, what causes delays, and how to keep your application moving.',
    readTime: '5 min read',
  },
  {
    slug: 'trademark-vs-copyright',
    title: 'Trademark vs. Copyright: What Creators Need to Know',
    description:
      'Two different forms of protection, two different systems. Here\'s what each covers, where they overlap, and what your brand actually needs.',
    readTime: '5 min read',
  },
  {
    slug: 'questions-to-ask-trademark-attorney',
    title: '10 Questions to Ask Before Hiring a Trademark Attorney',
    description:
      'Vet any trademark attorney before you write a check. These 10 questions reveal their qualifications, process, and whether the fee is fair.',
    readTime: '5 min read',
  },
]

export default function GuidesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-indigo transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Guides</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-brand-indigo text-sm font-semibold mb-2">
          <BookOpen className="w-4 h-4" aria-label="Guides" />
          Resource Library
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Trademark Guides for Creators & Business Owners
        </h1>
        <p className="text-gray-600 text-lg">
          Plain-English guides on trademark registration, how to choose an attorney, and how to
          protect your brand. No legal jargon.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block p-6 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-gray-900 group-hover:text-brand-indigo transition-colors mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
                <span className="inline-block mt-3 text-xs text-gray-400">{guide.readTime}</span>
              </div>
              <ArrowRight
                className="w-5 h-5 text-gray-300 group-hover:text-brand-indigo shrink-0 mt-0.5 transition-colors"
                aria-label="Read guide"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-brand-indigo rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-2">Ready to find a trademark attorney?</h2>
          <p className="text-blue-200 text-sm">
            Browse USPTO-registered attorneys who specialize in creators and small business.
          </p>
        </div>
        <Link href="/listings" className="btn-primary whitespace-nowrap">
          Browse Attorneys
        </Link>
      </div>
    </div>
  )
}
