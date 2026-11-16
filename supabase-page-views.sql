-- ============================================================================
-- 트래픽 통계(사이트 방문 기록) — 운영 Supabase SQL Editor 에서 한 번 실행합니다.
-- (여러 번 실행해도 안전합니다.)
-- ============================================================================
--
-- 공개 페이지를 열면 브라우저의 PageViewTracker 가 /api/track/pageview 를 한 번 부르고,
-- 그 API 가 서비스롤 키로 deskon_page_views 에 한 줄을 넣습니다.
-- 관리자 «트래픽 통계»(/admin/analytics)는 deskon_traffic_summary() 로 합계를 읽고,
-- 통합 관리자 허브 내보내기(/api/hub/export)는 deskon_page_views_daily() 로 날짜별 합계를 읽습니다.
--
-- 저장하는 것: 시각 · 경로 · 익명 방문자 번호(브라우저가 만든 무작위 값) · 세션 번호 · 유입 사이트의 호스트 이름 ·
-- 국가 코드 · 기기/브라우저/운영체제 이름 · 로봇 여부. IP 주소 · 쿠키 · 이름 같은 개인정보는 저장하지 않습니다.
-- anon 키로는 읽기도 쓰기도 안 됩니다(RLS 켜고 정책 없음, 함수 실행 권한 회수).

CREATE TABLE IF NOT EXISTS deskon_page_views (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  viewed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  path          TEXT        NOT NULL,                -- 쿼리스트링을 뺀 경로 (최대 500자)
  visitor_id    TEXT        NOT NULL,                -- 브라우저 localStorage 의 무작위 값
  session_id    TEXT        NOT NULL,                -- sessionStorage 의 무작위 값. 30분 쉬면 새 세션
  referrer_host TEXT,                                -- 바깥에서 왔을 때 그 사이트의 호스트 이름만 (같은 사이트는 NULL)
  country       TEXT,                                -- Vercel 이 알려 주는 국가 코드 (KR, US …)
  device        TEXT,                                -- desktop · mobile · tablet · smarttv
  browser       TEXT,
  os            TEXT,
  is_bot        BOOLEAN     NOT NULL DEFAULT false,  -- 검색 로봇 · 스크립트면 true (세지는 않고 분리만)
  bot_name      TEXT
);

CREATE INDEX IF NOT EXISTS deskon_page_views_viewed_idx ON deskon_page_views (viewed_at);
CREATE INDEX IF NOT EXISTS deskon_page_views_bot_viewed_idx ON deskon_page_views (is_bot, viewed_at);

-- RLS: 정책을 두지 않습니다. 서비스롤만 RLS 를 우회해 읽고 씁니다.
ALTER TABLE deskon_page_views ENABLE ROW LEVEL SECURITY;

-- ── 관리자 화면용 합계 ──────────────────────────────────────────────────────
-- [p_since, p_until) 구간을 한 번에 집계합니다.
--   p_bucket   : 'hour' | 'day'  — 그래프 눈금 (한국 시간 기준)
--   p_audience : 'human' | 'bot' | 'all' — 아래 timeline · 분포 · 세션은 이 대상만, totals 는 셋 다
-- 돌려주는 모양:
--   { totals: { human: {views, visitors}, bot: {…}, all: {…} },
--     sessions, bounced,
--     timeline: [{ bucket: "2026-11-16T14:00:00+09:00", views, visitors }],
--     pages | referrers | countries | devices | browsers | oses | bots: [{ key, views, visitors }] (각 상위 10개) }
CREATE OR REPLACE FUNCTION deskon_traffic_summary(
  p_since    TIMESTAMPTZ,
  p_until    TIMESTAMPTZ,
  p_bucket   TEXT DEFAULT 'day',
  p_audience TEXT DEFAULT 'human'
)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH scoped AS (
    SELECT v.*
    FROM deskon_page_views v
    WHERE v.viewed_at >= p_since AND v.viewed_at < p_until
      AND (p_audience = 'all' OR v.is_bot = (p_audience = 'bot'))
  ),
  per_session AS (
    SELECT session_id, COUNT(*) AS views FROM scoped GROUP BY session_id
  ),
  timeline AS (
    SELECT date_trunc(CASE WHEN p_bucket = 'hour' THEN 'hour' ELSE 'day' END, viewed_at AT TIME ZONE 'Asia/Seoul') AS b,
           COUNT(*)::int AS views,
           COUNT(DISTINCT visitor_id)::int AS visitors
    FROM scoped
    GROUP BY 1
  )
  SELECT jsonb_build_object(
    'totals', (
      SELECT jsonb_build_object(
        'human', jsonb_build_object('views', COUNT(*) FILTER (WHERE NOT is_bot), 'visitors', COUNT(DISTINCT visitor_id) FILTER (WHERE NOT is_bot)),
        'bot',   jsonb_build_object('views', COUNT(*) FILTER (WHERE is_bot),     'visitors', COUNT(DISTINCT visitor_id) FILTER (WHERE is_bot)),
        'all',   jsonb_build_object('views', COUNT(*),                            'visitors', COUNT(DISTINCT visitor_id))
      )
      FROM deskon_page_views
      WHERE viewed_at >= p_since AND viewed_at < p_until
    ),
    'sessions', (SELECT COUNT(*) FROM per_session),
    'bounced',  (SELECT COUNT(*) FROM per_session WHERE views = 1),
    'timeline', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('bucket', to_char(b, 'YYYY-MM-DD"T"HH24:MI:SS') || '+09:00', 'views', views, 'visitors', visitors) ORDER BY b)
      FROM timeline
    ), '[]'::jsonb),
    'pages', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT path AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped GROUP BY path ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'referrers', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT referrer_host AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped WHERE referrer_host IS NOT NULL GROUP BY referrer_host ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'countries', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT COALESCE(country, '') AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'devices', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT COALESCE(device, '') AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'browsers', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT COALESCE(browser, '') AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'oses', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT COALESCE(os, '') AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb),
    'bots', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('key', k, 'views', views, 'visitors', visitors) ORDER BY visitors DESC, views DESC)
      FROM (SELECT COALESCE(bot_name, '') AS k, COUNT(*)::int AS views, COUNT(DISTINCT visitor_id)::int AS visitors
            FROM scoped WHERE is_bot GROUP BY 1 ORDER BY visitors DESC, views DESC LIMIT 10) t
    ), '[]'::jsonb)
  );
$$;

-- ── 허브 내보내기용 날짜별 합계 ────────────────────────────────────────────
-- 최근 p_days 일(한국 날짜)의 사람 방문만. [{ day: "2026-11-16", views, visitors }] 오래된 날부터.
CREATE OR REPLACE FUNCTION deskon_page_views_daily(p_days INTEGER DEFAULT 365)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH bounds AS (
    SELECT ((now() AT TIME ZONE 'Asia/Seoul')::date - (GREATEST(LEAST(COALESCE(p_days, 365), 3650), 1) - 1))::timestamp AT TIME ZONE 'Asia/Seoul' AS since
  )
  SELECT COALESCE((
    SELECT jsonb_agg(jsonb_build_object('day', to_char(d, 'YYYY-MM-DD'), 'views', views, 'visitors', visitors) ORDER BY d)
    FROM (
      SELECT (viewed_at AT TIME ZONE 'Asia/Seoul')::date AS d,
             COUNT(*)::int AS views,
             COUNT(DISTINCT visitor_id)::int AS visitors
      FROM deskon_page_views, bounds
      WHERE NOT is_bot AND viewed_at >= bounds.since
      GROUP BY 1
    ) t
  ), '[]'::jsonb);
$$;

-- 두 함수는 서비스롤만 실행합니다(브라우저의 anon 키로는 직접 부를 수 없습니다).
REVOKE ALL ON FUNCTION deskon_traffic_summary(TIMESTAMPTZ, TIMESTAMPTZ, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION deskon_page_views_daily(INTEGER)                         FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION deskon_traffic_summary(TIMESTAMPTZ, TIMESTAMPTZ, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION deskon_page_views_daily(INTEGER)                         TO service_role;

-- ── 실행 후 확인 ────────────────────────────────────────────────────────────
-- SELECT deskon_traffic_summary(now() - interval '7 days', now(), 'day', 'human');
-- → {"totals": {...}, "sessions": 0, "bounced": 0, "timeline": [], "pages": [], ...} 처럼 나오면 정상입니다.
-- SELECT policyname FROM pg_policies WHERE tablename = 'deskon_page_views';
-- → 한 줄도 없어야 정상입니다.
