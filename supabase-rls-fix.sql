-- ============================================================================
-- SECURITY FIX — run this once against the LIVE Supabase project (SQL Editor)
-- ============================================================================
--
-- Problem: the original "*_service" policies were written as
--     CREATE POLICY ... FOR ALL USING (true) WITH CHECK (true);
-- with no "TO service_role" clause, so Postgres applied them to the PUBLIC role
-- (which includes the public `anon` key shipped to browsers). That granted
-- anyone with the anon key full read/write on every table — including reading
-- admin password hashes from deskon_admins and all customer PII in
-- deskon_inquiries / deskon_quotes.
--
-- Fix: drop those policies. The app talks to the database exclusively through
-- the service_role key (in API routes), which BYPASSES RLS, so dropping them
-- does not break any app functionality. After this runs:
--   - products / notices / faqs / banners : public SELECT (active rows) only
--   - inquiries / quotes                   : public INSERT only
--   - admins                               : no public access at all
-- ============================================================================

DROP POLICY IF EXISTS "deskon_products_service"  ON deskon_products;
DROP POLICY IF EXISTS "deskon_inquiries_service" ON deskon_inquiries;
DROP POLICY IF EXISTS "deskon_quotes_service"    ON deskon_quotes;
DROP POLICY IF EXISTS "deskon_notices_service"   ON deskon_notices;
DROP POLICY IF EXISTS "deskon_faqs_service"      ON deskon_faqs;
DROP POLICY IF EXISTS "deskon_banners_service"   ON deskon_banners;
DROP POLICY IF EXISTS "deskon_admins_service"    ON deskon_admins;

-- Safety net: make sure RLS is actually enabled on every table.
ALTER TABLE deskon_products  ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_quotes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_notices   ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_faqs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_banners   ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_admins    ENABLE ROW LEVEL SECURITY;

-- ── Verify after running (optional) ────────────────────────────────────────
-- Expect: NO rows named *_service, and deskon_admins should have 0 policies.
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE tablename LIKE 'deskon_%'
-- ORDER BY tablename, policyname;
