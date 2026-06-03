-- Trademark Attorney Directory Schema
-- Supabase project: fbuqrnzofktepkzyfmhy

-- ─── tm_listings ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tm_listings (
  id                        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                      TEXT        UNIQUE NOT NULL,
  full_name                 TEXT        NOT NULL,
  law_firm_name             TEXT,
  uspto_registration_number TEXT,
  registration_date         DATE,
  bio                       TEXT,
  photo_url                 TEXT,
  phone                     TEXT,
  email                     TEXT,
  website                   TEXT,
  address_line1             TEXT,
  city                      TEXT        NOT NULL,
  state                     TEXT        NOT NULL,
  zip                       TEXT,
  latitude                  DOUBLE PRECISION,
  longitude                 DOUBLE PRECISION,
  practice_areas            TEXT[]      DEFAULT '{}',
  creator_types             TEXT[]      DEFAULT '{}',
  flat_fee_filings          BOOLEAN     DEFAULT false,
  virtual_consult           BOOLEAN     DEFAULT false,
  languages                 TEXT[]      DEFAULT '{}',
  listing_tier              TEXT        DEFAULT 'free' CHECK (listing_tier IN ('free','verified','featured')),
  is_active                 BOOLEAN     DEFAULT true,
  is_approved               BOOLEAN     DEFAULT true,
  stripe_customer_id        TEXT,
  stripe_subscription_id    TEXT,
  subscription_expires_at   TIMESTAMPTZ,
  claimed_at                TIMESTAMPTZ,
  claimed_by                TEXT,
  outreach_step             INTEGER     NOT NULL DEFAULT 0,
  outreach_sent_at          TIMESTAMPTZ,
  source                    TEXT,
  do_not_email              BOOLEAN     DEFAULT false,
  email_source              TEXT,
  search_vector             TSVECTOR,
  created_at                TIMESTAMPTZ DEFAULT now(),
  updated_at                TIMESTAMPTZ DEFAULT now()
);

-- Full-text search vector update trigger
CREATE OR REPLACE FUNCTION tm_listings_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.law_firm_name, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'C') ||
    setweight(to_tsvector('english', array_to_string(NEW.practice_areas, ' ')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tm_listings_tsvector_update ON tm_listings;
CREATE TRIGGER tm_listings_tsvector_update
  BEFORE INSERT OR UPDATE ON tm_listings
  FOR EACH ROW EXECUTE FUNCTION tm_listings_search_vector_update();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION tm_listings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tm_listings_updated_at_trigger ON tm_listings;
CREATE TRIGGER tm_listings_updated_at_trigger
  BEFORE UPDATE ON tm_listings
  FOR EACH ROW EXECUTE FUNCTION tm_listings_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS tm_listings_state_idx            ON tm_listings(state);
CREATE INDEX IF NOT EXISTS tm_listings_city_state_idx       ON tm_listings(city, state);
CREATE INDEX IF NOT EXISTS tm_listings_tier_idx             ON tm_listings(listing_tier);
CREATE INDEX IF NOT EXISTS tm_listings_active_approved_idx  ON tm_listings(is_active, is_approved);
CREATE INDEX IF NOT EXISTS tm_listings_search_vector_idx    ON tm_listings USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS tm_listings_slug_idx             ON tm_listings(slug);
CREATE INDEX IF NOT EXISTS tm_listings_practice_areas_idx   ON tm_listings USING GIN(practice_areas);
CREATE INDEX IF NOT EXISTS tm_listings_creator_types_idx    ON tm_listings USING GIN(creator_types);
CREATE INDEX IF NOT EXISTS tm_listings_outreach_idx         ON tm_listings(outreach_step, do_not_email, claimed_at);


-- ─── tm_claims ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tm_claims (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    UUID        REFERENCES tm_listings(id),
  email         TEXT        NOT NULL,
  token         TEXT        NOT NULL UNIQUE,
  verified      BOOLEAN     DEFAULT false,
  verified_at   TIMESTAMPTZ,
  expires_at    TIMESTAMPTZ NOT NULL,
  nudge_sent_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tm_claims_listing_id_idx ON tm_claims(listing_id);
CREATE INDEX IF NOT EXISTS tm_claims_token_idx      ON tm_claims(token);


-- ─── tm_payments ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tm_payments (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id               UUID        REFERENCES tm_listings(id),
  stripe_session_id        TEXT,
  stripe_payment_intent_id TEXT,
  amount                   INTEGER,
  tier                     TEXT,
  status                   TEXT,
  created_at               TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tm_payments_listing_id_idx ON tm_payments(listing_id);


-- ─── tm_leads ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tm_leads (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name   TEXT,
  client_email  TEXT,
  client_phone  TEXT,
  brand_name    TEXT,
  creator_type  TEXT,
  state         TEXT,
  message       TEXT,
  routed_to     UUID        REFERENCES tm_listings(id),
  status        TEXT        DEFAULT 'new',
  created_at    TIMESTAMPTZ DEFAULT now()
);


-- ─── admin_users ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         UUID  PRIMARY KEY REFERENCES auth.users(id),
  role       TEXT  NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ─── Row-Level Security ───────────────────────────────────────────────────────
ALTER TABLE tm_listings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tm_claims    ENABLE ROW LEVEL SECURITY;
ALTER TABLE tm_payments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tm_leads     ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users  ENABLE ROW LEVEL SECURITY;

-- Public can read active, approved listings
CREATE POLICY "Public read active tm listings"
  ON tm_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

-- Service role bypass (used by server-side code with service role key)
CREATE POLICY "Service role full access tm_listings"
  ON tm_listings FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access tm_claims"
  ON tm_claims FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access tm_payments"
  ON tm_payments FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access tm_leads"
  ON tm_leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access admin_users"
  ON admin_users FOR ALL
  USING (auth.role() = 'service_role');
