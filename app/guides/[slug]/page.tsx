import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'

interface Guide {
  title: string
  metaDescription: string
  intro: string
  keyPoints: string[]
  conclusion: string
}

const GUIDES: Record<string, Guide> = {
  "what-is-trademark-registration": {
    title: "What Is Trademark Registration? A Guide for Creators & Business Owners",
    metaDescription: "Understand what trademark registration protects, why it matters for creators and small businesses, and how the USPTO application process works.",
    intro: "Trademark registration gives you the legal right to exclusively use your brand name, logo, or slogan in commerce. For business owners, it is the difference between a brand you own and one that can be copied.",
    keyPoints: [
      "A trademark protects brand identifiers — your business name, logo, tagline — not the underlying product or creative work.",
      "Federal registration gives you nationwide priority from the date of filing.",
      "Without registration, your rights are limited to the geographic area where you actually use the mark.",
      "Trademarks are filed by class — there are 45 USPTO trademark classes covering different industries.",
      "The ® symbol can only be used after federal registration. Using TM marks your claim before registration.",
      "An experienced trademark attorney can conduct clearance searches, file your application, and respond to office actions.",
    ],
    conclusion: "Trademark registration is one of the most valuable legal steps a growing business can take. An experienced trademark attorney can guide you through the process and help you avoid common mistakes.",
  },
  "how-to-find-trademark-attorney": {
    title: "How to Find the Right Trademark Attorney",
    metaDescription: "Learn how to find and evaluate trademark attorneys for USPTO filing, enforcement, and brand protection.",
    intro: "Finding the right trademark attorney is critical for protecting your brand. The right attorney has experience with USPTO prosecution, understands your industry, and can respond to office actions effectively.",
    keyPoints: [
      "Look for attorneys who specialize in trademark law, not general practitioners who do it occasionally.",
      "Ask about their experience with USPTO office actions and opposition proceedings.",
      "Verify their bar admission and check their USPTO registration number.",
      "Get a clear fee structure upfront — USPTO fees, attorney fees, and costs for potential office actions.",
      "Experience in your specific industry matters — a tech trademark differs from a consumer goods trademark.",
      "A good trademark attorney will conduct a thorough clearance search before filing.",
    ],
    conclusion: "Use our directory to find trademark attorneys in your state who specialize in USPTO registration, enforcement, and brand protection.",
  },
  "trademark-registration-cost": {
    title: "How Much Does Trademark Registration Cost?",
    metaDescription: "Understand the real costs of trademark registration, including USPTO fees, attorney fees, and what to expect during the process.",
    intro: "Trademark registration costs vary depending on how many classes you file in, which application type you use, and whether you need an attorney. Here is a realistic breakdown.",
    keyPoints: [
      "USPTO filing fees: $250-$350 per class for TEAS Plus or TEAS Standard.",
      "Attorney fees typically range from $500-$1,500 per class for a standard filing.",
      "Office action responses can add $300-$1,000 or more if issues arise.",
      "The process takes 8-12 months on average if there are no objections.",
      "International registration (Madrid Protocol) adds $250+ per country per class.",
      "Maintenance fees are due between years 5-6 and at the 10-year renewal mark.",
    ],
    conclusion: "While DIY filing is possible, working with an experienced trademark attorney reduces the risk of rejection and saves money in the long run. Search our directory to find an attorney who fits your budget.",
  },
}

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = GUIDES[params.slug]
  if (!guide) return { title: "Guide Not Found" }
  return {
    title: guide.title,
    description: guide.metaDescription,
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES[params.slug]
  if (!guide) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/listings"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Find a Trademark Attorney
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-8">
        <div className="flex items-center gap-2 text-gold-600 text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Trademark Guide
        </div>

        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-4">{guide.title}</h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">{guide.intro}</p>

        <div className="bg-navy-50 rounded-xl border border-navy-100 p-6 mb-8">
          <h2 className="font-semibold text-navy-800 mb-4">Key Points</h2>
          <ul className="space-y-3">
            {guide.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 text-gold-700 text-xs flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-slate-600 leading-relaxed">{guide.conclusion}</p>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Find a Trademark Attorney
          </Link>
        </div>
      </div>
    </div>
  )
}
