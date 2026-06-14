# TrademarksearchDirectory.com

A Next.js 14 App Router directory site for trademark attorneys in the United States.

- **Live site:** https://trademarksearchdirectory.com
- **Supabase table:** `trademark_attorney_listings` (project: fbuqrnzofktepkzyfmhy)
- **Vercel project:** trademark-attorneys-directory
- **Listings:** 1,150+ trademark attorneys across all 50 states

## Stack

- Next.js 14 (App Router)
- Supabase (PostgreSQL + @supabase/ssr)
- Tailwind CSS (navy + gold theme)
- Vercel (hosting + analytics)

## Stripe Status — BLOCKED

Stripe webhook setup is skipped. The Stripe account is at the 16/16 webhook endpoint limit.
Placeholder env vars are set in `.env.example`.

**Manual action required before enabling payments:**
1. Delete unused Stripe webhooks in the dashboard to free up slots
2. Create a new webhook endpoint pointing to `https://trademarksearchdirectory.com/api/stripe-webhook`
3. Create Stripe products/prices for Verified ($149/year) and Featured ($349/year) tiers
4. Update `STRIPE_VERIFIED_PRICE_ID` and `STRIPE_FEATURED_PRICE_ID` env vars in Vercel

## Environment Variables (set in Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://fbuqrnzofktepkzyfmhy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
NEXT_PUBLIC_SITE_URL=https://trademarksearchdirectory.com
```

## Development

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with real values
npm run dev
```

## Directory Structure

```
app/
  layout.tsx          # Root layout with Navbar, Footer, Analytics
  page.tsx            # Homepage with hero, featured attorneys, browse
  listings/
    page.tsx          # Searchable attorney grid with pagination
    [slug]/page.tsx   # Individual attorney profile page
  claim/page.tsx      # Claim listing / pricing page
  robots.ts
  sitemap.ts
components/
  Navbar.tsx
  Footer.tsx
  ListingCard.tsx
  SearchBar.tsx
lib/
  data.ts             # Supabase query functions
  types.ts            # TypeScript types
  utils.ts            # Helpers
  supabase/
    server.ts
    client.ts
```
