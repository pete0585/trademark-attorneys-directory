import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

interface GuideSection {
  h2: string
  paragraphs: string[]
  bullets?: string[]
}

interface FaqItem {
  question: string
  answer: string
}

interface Guide {
  title: string
  metaDescription: string
  intro: string
  sections: GuideSection[]
  faqItems: FaqItem[]
  relatedGuides: { slug: string; title: string }[]
}

const GUIDES: Record<string, Guide> = {
  'what-is-trademark-registration': {
    title: 'What Is Trademark Registration? A Guide for Creators & Business Owners',
    metaDescription:
      'Understand what trademark registration protects, why it matters for creators and small businesses, and how the USPTO application process works.',
    intro:
      'You built a brand. You named it, designed it, and put it out into the world. Trademark registration is the legal step that says: this is mine, and I can prove it. For creators and business owners, understanding what trademark registration actually does — and doesn't do — is the difference between a brand with teeth and one that can be copied the moment it gets any traction.',
    sections: [
      {
        h2: 'What a Trademark Actually Protects',
        paragraphs: [
          'A trademark protects brand identifiers — things like your business name, logo, tagline, or product name — as they apply to a specific category of goods or services. It doesn\'t protect the underlying product, the idea behind it, or creative work you\'ve produced. That\'s copyright\'s job.',
          'When you register a trademark, you\'re telling the world that in your market category, your brand identifier is yours. Nobody else can use a "confusingly similar" mark in the same space without risking infringement.',
          'Critically, trademarks are filed by class. The USPTO divides the market into 45 trademark classes — Class 25 is clothing, Class 41 is education and entertainment, Class 9 covers software. A mark registered in one class doesn\'t protect you in another. This is one of the most common DIY mistakes: entrepreneurs register in the wrong class and get zero real protection.',
        ],
      },
      {
        h2: 'Why Register Instead of Just Using the Mark?',
        paragraphs: [
          'In the US, you can establish "common law" rights to a trademark just by using it in commerce — no registration required. But common law rights are limited to the geographic area where you\'ve actually used the mark. If you operate in Florida, your unregistered mark has no legal protection in California.',
          'Federal registration changes everything. It gives you:',
        ],
        bullets: [
          'Nationwide priority from the date of filing — even if someone else starts using a similar mark later in a different city',
          'The right to use the ® symbol, which signals to competitors that your mark is protected',
          'A legal presumption that you own the mark and it\'s valid — shifts the burden to challengers',
          'The ability to sue in federal court and seek statutory damages and attorney\'s fees',
          'US Customs registration to block infringing imports',
          'Evidence of ownership that\'s useful in platform disputes (YouTube, Amazon, Etsy, Meta)',
        ],
      },
      {
        h2: 'What Can Be Registered as a Trademark?',
        paragraphs: [
          'Almost any brand identifier can be registered if it\'s "distinctive" and not likely to be confused with an existing mark. This includes:',
        ],
        bullets: [
          'Word marks — your brand name or tagline in plain text',
          'Design marks — your logo or graphic elements',
          'Combined marks — a logo that includes both text and design',
          'Slogans and taglines',
          'Product packaging or "trade dress" (in some cases)',
          'Colors, sounds, or scents (rare, but possible)',
        ],
      },
      {
        h2: 'The Registration Process in Plain English',
        paragraphs: [
          'First, you or your attorney conduct a clearance search. This means searching the USPTO database and the broader internet for marks that look or sound like yours in your target class. A conflict found before filing saves you the filing fee and the pain of rejection.',
          'Next, you file the application through the USPTO\'s TEAS (Trademark Electronic Application System). You choose between TEAS Plus ($250/class, stricter requirements) or TEAS Standard ($350/class, more flexible). Most attorneys recommend TEAS Plus for straightforward registrations.',
          'The USPTO assigns an examining attorney who reviews the application. About 40% of applications receive an "office action" — a rejection or a request for clarification. An experienced trademark attorney responds to office actions as part of the process.',
          'If approved, your mark is published in the Official Gazette for 30 days, giving third parties the chance to oppose. If no one opposes and your mark is in use, you receive your registration certificate. From filing to certificate typically takes 8–14 months.',
        ],
      },
    ],
    faqItems: [
      {
        question: 'How much does trademark registration cost?',
        answer:
          'USPTO filing fees are $250–$350 per class (TEAS Plus vs. TEAS Standard). Attorney fees for a standard registration run $500–$1,500. Total out-of-pocket for a single-class filing with an attorney: $750–$1,850.',
      },
      {
        question: 'How long does trademark registration take?',
        answer:
          'Currently 8–12 months for a standard application without issues. Add 3–6 months if an office action is issued.',
      },
      {
        question: 'Can I file for a trademark myself without an attorney?',
        answer:
          'Yes, but about 60–70% of DIY filers choose the wrong class, use the wrong specimen, or write a description of goods/services that limits their protection. An attorney pays for itself by getting it right the first time.',
      },
      {
        question: 'What happens if my trademark application is rejected?',
        answer:
          'The USPTO examiner issues an office action explaining the rejection. Your attorney has 3 months to respond (extendable to 6 months for a fee). A skilled response resolves most office actions.',
      },
    ],
    relatedGuides: [
      { slug: 'how-to-choose-a-trademark-attorney', title: 'How to Choose a Trademark Attorney' },
      { slug: 'trademark-vs-copyright', title: 'Trademark vs. Copyright' },
      { slug: 'trademark-registration-process', title: 'How Long Does Trademark Registration Take?' },
    ],
  },

  'how-to-choose-a-trademark-attorney': {
    title: 'How to Choose a Trademark Attorney (Without Getting Burned)',
    metaDescription:
      'What to look for when hiring a trademark attorney — USPTO registration requirements, specialization, red flags, fee structures, and the right questions to ask.',
    intro:
      'Not every "trademark attorney" is equally qualified — and some aren\'t qualified at all. The USPTO requires attorneys to be registered practitioners to file applications on behalf of clients. Beyond that baseline, the difference between a specialist who knows your industry and a generalist who treats trademark work as a side service can mean the difference between a bulletproof registration and an avoidable rejection.',
    sections: [
      {
        h2: 'Start With USPTO Registration',
        paragraphs: [
          'Any attorney who files trademark applications with the USPTO on behalf of clients must be a registered USPTO practitioner. You can verify registration status at the USPTO\'s OED (Office of Enrollment and Discipline) lookup tool at oedci.uspto.gov.',
          'Some legal services platforms use general attorneys or paralegals for trademark work. Ask directly: "Are you a registered USPTO practitioner?" If the answer is no, or they can\'t tell you, move on. FindTrademarkAttorney.com lists only USPTO-registered practitioners.',
        ],
      },
      {
        h2: 'Specialization Matters More Than You Think',
        paragraphs: [
          'A general practice attorney who handles divorces, traffic tickets, and "some IP work on the side" is not the same as an attorney whose practice is focused on trademark and brand protection. Trademark law has nuances — class selection, office action strategy, likelihood of confusion analysis — that generalists routinely get wrong.',
          'Beyond trademark specialization, look for an attorney who has experience in your specific world. A content creator registering a YouTube channel brand has different needs than a restaurant chain or a pharmaceutical company. Attorneys who list "creator types" they work with on FindTrademarkAttorney.com have self-selected into relevance.',
        ],
      },
      {
        h2: 'Flat Fee vs. Hourly — What\'s Better?',
        paragraphs: [
          'For straightforward trademark registration, a flat fee is almost always better. It aligns the attorney\'s interest with getting the application approved efficiently, and you know your total cost upfront.',
          'The key question is what\'s included in the flat fee:',
        ],
        bullets: [
          'Does it include a clearance search before filing?',
          'Does it include responding to one office action, or is that billed separately?',
          'Does it cover publication and registration, or just the initial filing?',
          'Does it include one class, and what\'s the per-class fee after that?',
        ],
      },
      {
        h2: 'Red Flags to Avoid',
        paragraphs: [
          'Some warning signs that should send you elsewhere:',
        ],
        bullets: [
          'Guaranteeing approval — no attorney can guarantee the USPTO will grant your mark',
          'No clearance search offered — filing without a search is negligent',
          'Very low flat fees ($99–$199 "all in") — these often mean overseas paralegals and no real attorney review',
          'No direct communication with the attorney handling your file',
          'Can\'t or won\'t answer questions about their USPTO registration number',
          'No written engagement letter outlining exactly what\'s included in the fee',
        ],
      },
    ],
    faqItems: [
      {
        question: 'How do I verify that a trademark attorney is USPTO-registered?',
        answer:
          'Search the USPTO OED practitioner database at oedci.uspto.gov using the attorney\'s name. All listed attorneys on FindTrademarkAttorney.com are USPTO-registered practitioners.',
      },
      {
        question: 'What should a flat-fee trademark package include?',
        answer:
          'At minimum: a clearance search, preparation and filing of the application, and response to one office action if issued. Some packages also include monitoring and renewal reminders.',
      },
      {
        question: 'How much should I expect to pay for trademark registration with an attorney?',
        answer:
          'Flat fees for a single-class registration typically range from $500–$1,500 in attorney fees, plus $250–$350 in USPTO filing fees. Total: $750–$1,850 per class for a straightforward filing.',
      },
    ],
    relatedGuides: [
      { slug: 'questions-to-ask-trademark-attorney', title: '10 Questions to Ask Before Hiring' },
      { slug: 'what-is-trademark-registration', title: 'What Is Trademark Registration?' },
      { slug: 'trademark-registration-process', title: 'How Long Does Registration Take?' },
    ],
  },

  'trademark-registration-process': {
    title: 'How Long Does Trademark Registration Take? (Full Timeline)',
    metaDescription:
      'The USPTO trademark registration timeline from filing to certificate — what each stage takes, what causes delays, and how an attorney can help you move faster.',
    intro:
      'The most common question trademark attorneys hear from new clients: "How long is this going to take?" The honest answer is 8–14 months for a clean application, with delays possible at multiple stages. Here\'s exactly what happens after you file, what can slow things down, and what you can do to keep your application moving.',
    sections: [
      {
        h2: 'The Standard USPTO Timeline',
        paragraphs: [
          'Here\'s the typical sequence after filing a trademark application with the USPTO:',
        ],
        bullets: [
          'Filing date assigned: immediately upon submission',
          'Initial processing: 1–2 months',
          'Assigned to examining attorney: 2–4 months after filing',
          'Examination (approval or office action): 3–4 months after assignment',
          'Publication in the Official Gazette: 1–2 months after approval',
          '30-day opposition window: starts on publication date',
          'Certificate of registration issued: 2–3 months after opposition period closes (for in-use applications)',
          'Total, clean application: 8–12 months',
        ],
      },
      {
        h2: 'What Causes Delays',
        paragraphs: [
          'The two biggest delay triggers are office actions and intent-to-use applications.',
          'An office action is a notice from the USPTO examiner raising an issue with your application. This could be a "likelihood of confusion" refusal (your mark is too similar to an existing registration), a request to clarify your description of goods/services, or a problem with the specimen you submitted as proof of use. Office actions require a written response — and your attorney has 3 months (extendable to 6 months for a fee) to respond.',
          'An intent-to-use (ITU) application — filed before your mark is in actual commercial use — adds another stage. After approval, you receive a Notice of Allowance. You then have 6 months (extendable up to 3 years in 6-month increments) to begin using the mark and file a Statement of Use. The registration isn\'t granted until the Statement of Use is accepted.',
        ],
      },
      {
        h2: 'TEAS Plus vs. TEAS Standard',
        paragraphs: [
          'The USPTO offers two application tracks. TEAS Plus costs $250 per class and requires you to select from a pre-approved identification of goods/services from the USPTO\'s ID Manual. It has a lower office action rate because the pre-approved language is familiar to examiners.',
          'TEAS Standard costs $350 per class and allows custom descriptions of goods/services. It\'s more flexible, but examiner uncertainty about custom language is a common trigger for office actions.',
          'For most straightforward registrations, most attorneys recommend TEAS Plus. Your attorney will know which is right for your situation.',
        ],
      },
      {
        h2: 'How to Speed Up the Process',
        paragraphs: [
          'You can\'t rush the USPTO\'s internal processing times, but you can reduce the chance of delays:',
        ],
        bullets: [
          'Conduct a thorough clearance search before filing — conflicts found early don\'t become office actions',
          'Use TEAS Plus with pre-approved identification language',
          'Submit a clean specimen with a strong showing of the mark in commerce',
          'Respond to office actions promptly — don\'t wait for the 3-month deadline',
          'Work with an attorney who has a track record of successful office action responses in your mark\'s class',
          'If you\'re not in use yet, file an intent-to-use application to secure your priority date now',
        ],
      },
    ],
    faqItems: [
      {
        question: 'How long does trademark registration take right now?',
        answer:
          'The USPTO is currently taking 8–12 months for a standard application without office actions. Check the USPTO\'s Processing Wait Times page (shown on their website) for the most current estimate.',
      },
      {
        question: 'Can I use the ® symbol while my application is pending?',
        answer:
          'No. The ® symbol can only be used after your mark is officially registered. While your application is pending, you can use ™ (trademark) or ℠ (service mark) to signal your claim.',
      },
      {
        question: 'What happens if someone files a similar mark while mine is pending?',
        answer:
          'Your filing date establishes your priority. A later applicant with a conflicting mark will be blocked by your earlier-filed application once the USPTO examines it — even if they file and get reviewed first.',
      },
      {
        question: 'What is an office action and how often do they happen?',
        answer:
          'An office action is a notice from the examining attorney raising an issue with your application. About 40% of applications receive at least one office action. Most are resolved with a well-prepared response from an experienced attorney.',
      },
    ],
    relatedGuides: [
      { slug: 'what-is-trademark-registration', title: 'What Is Trademark Registration?' },
      { slug: 'how-to-choose-a-trademark-attorney', title: 'How to Choose a Trademark Attorney' },
      { slug: 'questions-to-ask-trademark-attorney', title: '10 Questions to Ask Before Hiring' },
    ],
  },

  'trademark-vs-copyright': {
    title: 'Trademark vs. Copyright: What Creators & Entrepreneurs Need to Know',
    metaDescription:
      'Trademark and copyright both protect your creative output, but in completely different ways. Here\'s what each covers, where they overlap, and what your brand actually needs.',
    intro:
      'Creators and business owners mix these up constantly — and understandably so. Both are forms of intellectual property protection. Both can apply to things you create. But they protect fundamentally different things and work through completely different systems. Getting this wrong means spending money protecting the wrong asset or assuming you\'re protected when you\'re not.',
    sections: [
      {
        h2: 'What Trademark Protects: Your Brand Identity',
        paragraphs: [
          'A trademark protects brand identifiers — your business name, logo, tagline, or product name as applied to specific goods or services. The core purpose is consumer protection: trademarks prevent marketplace confusion about the source of a product or service.',
          'When your brand has a registered trademark, no one else can use a confusingly similar name, logo, or tagline in the same market space. This is why McDonald\'s can stop someone from opening "McBurgers" and why Nike can protect the Swoosh.',
          'Trademark rights come from use in commerce, not creation. You establish trademark rights by actually using the mark in the market — and federal registration strengthens and extends those rights nationwide.',
        ],
      },
      {
        h2: 'What Copyright Protects: Your Creative Works',
        paragraphs: [
          'Copyright protects original creative works — written content, music, artwork, photography, video, software code, and similar output. The moment you create something original and fix it in a tangible form (write it, record it, save it), copyright attaches automatically. You own it.',
          'Copyright registration (through the US Copyright Office, not the USPTO) is optional but creates important legal benefits: it\'s required before you can sue for infringement, and a timely registration allows you to pursue statutory damages and attorney\'s fees.',
          'Copyright protects the specific expression of an idea, not the idea itself. You can copyright your specific song, but you can\'t copyright the concept of writing a song about heartbreak.',
        ],
      },
      {
        h2: 'Where They Overlap — and Where They Don\'t',
        paragraphs: [
          'A logo is a great example of potential overlap. Your logo design is protected by copyright automatically as original creative work. But copyright only stops direct copying — it doesn\'t stop someone from creating a similar logo with a different aesthetic that still causes brand confusion.',
          'Trademark fills that gap. A registered trademark on your logo protects the brand identity function — it stops confusingly similar marks even if they aren\'t direct copies.',
          'For most brands, the practical distinction is:',
        ],
        bullets: [
          'Use copyright to protect your content: blog posts, course materials, photos, music, videos, software',
          'Use trademark to protect your brand: business name, logo, product name, tagline, slogan',
          'A business name is NOT automatically protected by copyright — it\'s too short and functional to qualify',
          'A logo is protected by both copyright (as art) and trademark (as brand identifier)',
          'Domain names are protected by neither — you need both trademark registration and domain ownership',
        ],
      },
      {
        h2: 'What Creators and Business Owners Usually Need',
        paragraphs: [
          'If you\'re building a brand — a channel, a product, a business, a personal brand — you need trademark protection for your name and logo. This is the asset that can be stolen, diluted, or copied by competitors in your market.',
          'If you\'re creating content — writing, music, courses, videos, code — your output is automatically protected by copyright. Registration with the US Copyright Office is worthwhile if you\'re actively licensing or enforcing your content rights.',
          'Most growing creator businesses need both over time. Start with trademark for your brand name the moment your brand has any market traction. Add copyright registration for high-value content pieces as your catalog grows.',
        ],
      },
    ],
    faqItems: [
      {
        question: 'Does copyright protect my business name?',
        answer:
          'No. Business names are too short and functional to qualify for copyright protection. Your business name is protected by trademark, not copyright. Use the USPTO registration process to protect your brand name.',
      },
      {
        question: 'Is my logo automatically protected by copyright?',
        answer:
          'Yes — if it\'s original creative work, copyright attaches automatically when you create it. But copyright only blocks direct copying. For full brand protection against confusingly similar logos, you need trademark registration as well.',
      },
      {
        question: 'Do I need both trademark and copyright?',
        answer:
          'Most businesses need both over time. Trademark protects your brand identity (name, logo, tagline). Copyright protects your creative content output (writing, music, video, code). They serve different purposes and can coexist on the same asset (like a logo).',
      },
      {
        question: 'Where do I register copyright vs. trademark?',
        answer:
          'Trademark registration is handled through the USPTO (United States Patent and Trademark Office) at uspto.gov. Copyright registration is handled through the US Copyright Office at copyright.gov. They are separate government agencies with separate processes.',
      },
    ],
    relatedGuides: [
      { slug: 'what-is-trademark-registration', title: 'What Is Trademark Registration?' },
      { slug: 'how-to-choose-a-trademark-attorney', title: 'How to Choose a Trademark Attorney' },
      { slug: 'trademark-registration-process', title: 'How Long Does Registration Take?' },
    ],
  },

  'questions-to-ask-trademark-attorney': {
    title: '10 Questions to Ask Before Hiring a Trademark Attorney',
    metaDescription:
      'Vet any trademark attorney before you hire them. These 10 questions reveal whether they\'re the right fit, whether they\'re qualified, and whether you\'re getting fair value.',
    intro:
      'The difference between a trademark registration that actually protects your brand and one that leaves you exposed often comes down to who files it. Before you hire a trademark attorney, ask these 10 questions. Their answers — and how they answer them — will tell you everything you need to know.',
    sections: [
      {
        h2: 'Questions About Qualifications',
        paragraphs: [
          'These three questions establish baseline qualification. Any hesitation or evasion is a red flag.',
        ],
        bullets: [
          '1. Are you a registered USPTO practitioner? Ask for their registration number. Verify it at oedci.uspto.gov. Only registered practitioners can legally represent clients before the USPTO.',
          '2. What percentage of your practice is trademark work? A specialist is not the same as someone who dabbles. You want an attorney for whom trademark is a primary focus, not an occasional service.',
          '3. How long have you been practicing trademark law? Experience matters specifically in trademark — an examiner\'s office action on a likelihood-of-confusion refusal requires nuanced argumentation that newer practitioners often handle poorly.',
        ],
      },
      {
        h2: 'Questions About Process',
        paragraphs: [
          'These questions reveal how the attorney actually works — and whether their process is likely to get your application approved.',
        ],
        bullets: [
          '4. Do you conduct a clearance search before filing, and is it included in your fee? A clearance search is the first line of defense against conflicts. An attorney who files without a thorough search is cutting corners.',
          '5. Who actually handles my file? Some firms use paralegals or offshore services for the actual work. You want a licensed attorney reviewing and signing your application.',
          '6. What\'s your office action response rate and process? About 40% of applications receive office actions. Ask how many they\'ve handled in the past year and what their success rate is. If they can\'t answer, that\'s a problem.',
        ],
      },
      {
        h2: 'Questions About Fees',
        paragraphs: [
          'These questions expose the full cost and prevent surprises down the line.',
        ],
        bullets: [
          '7. What exactly does your flat fee include? Get a specific list: clearance search, filing, office action response, publication, registration. If anything is billed separately, get the rates in writing.',
          '8. How do you charge for office actions? Some attorneys include one office action in their flat fee, others bill hourly. An unexpected $1,500 office action response fee isn\'t something you want to discover after filing.',
          '9. What\'s the USPTO filing fee on top of your attorney\'s fee? The current TEAS Plus fee is $250 per class, TEAS Standard is $350 per class. Make sure you know your total out-of-pocket.',
        ],
      },
      {
        h2: 'The Question That Reveals Everything',
        paragraphs: [
          'There\'s one final question that separates the attorneys who take your brand seriously from those who treat it as a transaction:',
          '10. Have you worked with businesses or creators in my industry, and can you share a relevant example (without naming the client)?',
          'An attorney who has represented e-commerce brands, content creators, SaaS companies, or small businesses in your space understands your trademark class, your competitive landscape, and the types of conflicts most likely to arise. A good attorney will give you a real, relevant answer. A generic one is a sign they haven\'t done enough work in your world to help you effectively.',
        ],
      },
    ],
    faqItems: [
      {
        question: 'How do I verify a trademark attorney\'s USPTO registration?',
        answer:
          'Visit oedci.uspto.gov and search by the attorney\'s name or state. Every registered USPTO practitioner has a profile in the OED database. All attorneys on FindTrademarkAttorney.com are verified USPTO practitioners.',
      },
      {
        question: 'Should I use a legal services platform like LegalZoom for trademark registration?',
        answer:
          'Legal services platforms process your paperwork but often use non-attorneys or general legal staff. For a simple mark with no complications, they may be fine. For anything complex — office actions, conflicts, unusual classes — a specialist attorney is worth the extra cost.',
      },
      {
        question: 'What if an attorney won\'t answer these questions directly?',
        answer:
          'Move on. A qualified trademark attorney will answer every one of these questions without hesitation. Evasiveness about qualifications, fees, or process is a reliable indicator of a poor fit.',
      },
    ],
    relatedGuides: [
      { slug: 'how-to-choose-a-trademark-attorney', title: 'How to Choose a Trademark Attorney' },
      { slug: 'what-is-trademark-registration', title: 'What Is Trademark Registration?' },
      { slug: 'trademark-registration-process', title: 'How Long Does Registration Take?' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) return {}

  return {
    title: `${guide.title} | FindTrademarkAttorney.com`,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://www.findtrademarkattorney.com/guides/${slug}`,
    },
  }
}

export const revalidate = 86400

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-indigo transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-brand-indigo transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{guide.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-indigo text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" aria-label="Guide" />
            Trademark Guide
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{guide.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{guide.intro}</p>
        </div>

        {/* Guide Content */}
        <article className="prose-guide mb-10 space-y-8">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.h2}</h2>
              {section.paragraphs.map((para, j) => (
                <p key={j} className="text-gray-700 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 mt-3">
                  {section.bullets.map((bullet, k) => (
                    <li key={k} className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-amber shrink-0" />
                      <span className="leading-relaxed text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* FAQ */}
        <section className="bg-white border border-surface-border rounded-xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 divide-y divide-surface-border">
            {guide.faqItems.map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-6'}>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        {guide.relatedGuides.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guide.relatedGuides.map((related) => (
                <Link
                  key={related.slug}
                  href={`/guides/${related.slug}`}
                  className="p-4 bg-white border border-surface-border rounded-xl hover:border-brand-indigo/40 transition-colors group"
                >
                  <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-indigo leading-snug">
                    {related.title}
                  </p>
                  <p className="text-xs text-brand-indigo mt-1 group-hover:underline">
                    Read guide →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-brand-indigo rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-xl font-bold mb-2">Ready to find a trademark attorney?</h2>
            <p className="text-blue-200 text-sm max-w-lg">
              Browse USPTO-registered trademark attorneys who specialize in your type of
              business — for free.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/listings" className="btn-primary whitespace-nowrap">
              Browse Attorneys
            </Link>
            <Link
              href="/submit"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm text-center whitespace-nowrap"
            >
              List Your Practice
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
