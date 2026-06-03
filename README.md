# FindTrademarkAttorney.com — Trademark Attorney Directory for Creators & Small Business

The first creator-focused trademark attorney directory. Built on Next.js 15, Tailwind CSS, Supabase, and Stripe.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS — custom palette: `brand-indigo` (#2C3E7A), `brand-amber` (#E8731A), `brand-sage` (#3E9B74)
- **Database:** Supabase (shared Directories project `fbuqrnzofktepkzyfmhy`, `tm_` prefixed tables)
- **Payments:** Stripe (one-time annual payments — $99 Verified, $199 Featured)
- **Email:** Resend (claim verification, upgrade sequences — via `mail.findtrademarkattorney.com`)
- **Deployment:** Vercel

## Local Setup

```bash
# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local
# Fill in your values in .env.local

# Run dev server
npm run dev
```

## Environment Variables

See `.env.example` for all required variables. The bootstrap agent sets these in Vercel automatically.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_VERIFIED_PRICE_ID` | Stripe price ID for Verified tier ($99/yr) |
| `STRIPE_FEATURED_PRICE_ID` | Stripe price ID for Featured tier ($199/yr) |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (https://www.findtrademarkattorney.com) |
| `RESEND_API_KEY` | Resend API key for transactional email |

## Supabase Setup

1. Tables are in the shared Directories project (`fbuqrnzofktepkzyfmhy`).
2. Apply the migration:
   ```bash
   # Via Supabase MCP or dashboard SQL editor
   # Run: supabase/migrations/001_initial_schema.sql
   ```
3. Seed initial data:
   ```bash
   npx ts-node --project tsconfig.json scripts/seed.ts
   ```

## Vercel Deployment

1. The bootstrap agent creates the Vercel project and sets all env vars automatically.
2. Connect `pete0585/trademark-attorneys-directory` repo to the Vercel project.
3. Set root directory to `/` (default).
4. Deploy triggers automatically on push to `main`.

## Data Seeding (Full)

The bootstrap creates the GitHub repo. The data-seeder agent handles full seeding:
- **Primary source:** USPTO OED (`oedci.uspto.gov`) — all registered trademark practitioners by state
- **Secondary:** DataForSEO Google Maps "trademark attorney" in 50 major metros
- Expected count: 15,000-20,000 listings after full seed

## Directory Structure

```
app/
├── page.tsx                    # Homepage
├── listings/
│   ├── page.tsx                # Browse with filters
│   └── [slug]/page.tsx         # Attorney detail page
├── categories/[slug]/page.tsx  # Creator type landing pages
├── submit/page.tsx             # Submit/add listing
├── claim/[id]/page.tsx         # Claim verification
├── admin/
│   ├── layout.tsx              # Admin auth guard
│   └── page.tsx                # Admin dashboard
└── api/
    ├── webhooks/stripe/route.ts
    ├── inbound-email/route.ts
    ├── claim/route.ts
    ├── claim/verify/route.ts
    ├── submit/route.ts
    ├── checkout/route.ts
    └── upgrade/route.ts
```

## Revenue Model

- **Free:** Basic listing (name, city, state, phone, website)
- **Verified ($99/yr):** Full profile, contact form, creator type tags, flat-fee badge, priority placement
- **Featured ($199/yr):** Top placement in search, featured badge, SEO-optimized profile

## Inbound Email Webhook

Register at Resend: `https://www.findtrademarkattorney.com/api/inbound-email`
(Must use www — non-www redirects 307 and Resend doesn't follow it.)
