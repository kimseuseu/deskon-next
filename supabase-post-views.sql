-- ============================================================================
-- 현장 노트 조회 통계 — 운영 Supabase SQL Editor 에서 한 번 실행합니다.
-- (supabase-posts.sql 을 먼저 실행한 뒤여야 합니다. 여러 번 실행해도 안전합니다.)
-- ============================================================================
--
-- 글 페이지(/blog/<slug>)를 열면 브라우저가 /api/blog/view 를 한 번 부르고,
-- 그 API 가 서비스롤 키로 deskon_record_post_view() 를 호출해 하루 · 유입 경로별 숫자를 올립니다.
-- 관리자 글 목록(/admin/posts)은 deskon_post_view_stats() 로 합계를 읽습니다.
--
-- 방문자 개인을 식별하는 값(IP, 쿠키, 기기 정보)은 저장하지 않습니다. 숫자만 셉니다.
-- anon 키로는 읽기도 쓰기도 안 됩니다(RLS 켜고 정책 없음, 함수 실행 권한 회수).

CREATE TABLE IF NOT EXISTS deskon_post_views (
  post_id  UUID    NOT NULL REFERENCES deskon_posts(id) ON DELETE CASCADE,
  day      DATE    NOT NULL,                 -- 한국 시간 기준 날짜
  source   TEXT    NOT NULL DEFAULT 'direct' -- 유입 경로
           CHECK (source IN ('naver', 'google', 'daum', 'kakao', 'site', 'direct', 'other')),
  views    INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
  PRIMARY KEY (post_id, day, source)
);

CREATE INDEX IF NOT EXISTS deskon_post_views_day_idx ON deskon_post_views (day);

-- RLS: 정책을 두지 않습니다. 서비스롤만 RLS 를 우회해 읽고 씁니다.
ALTER TABLE deskon_post_views ENABLE ROW LEVEL SECURITY;

-- ── 조회 한 번 기록 ─────────────────────────────────────────────────────────
-- 발행된 글의 슬러그일 때만 오늘(한국 시간) 줄의 숫자를 1 올립니다. 없는 글이면 false.
CREATE OR REPLACE FUNCTION deskon_record_post_view(p_slug TEXT, p_source TEXT DEFAULT 'direct')
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_post_id UUID;
  v_source  TEXT := COALESCE(p_source, 'direct');
BEGIN
  IF v_source NOT IN ('naver', 'google', 'daum', 'kakao', 'site', 'direct', 'other') THEN
    v_source := 'other';
  END IF;

  SELECT id INTO v_post_id
  FROM deskon_posts
  WHERE slug = p_slug AND status = 'published' AND published_at <= now();

  IF v_post_id IS NULL THEN
    RETURN FALSE;
  END IF;

  INSERT INTO deskon_post_views (post_id, day, source, views)
  VALUES (v_post_id, (now() AT TIME ZONE 'Asia/Seoul')::date, v_source, 1)
  ON CONFLICT (post_id, day, source)
  DO UPDATE SET views = deskon_post_views.views + 1;

  RETURN TRUE;
END;
$$;

-- ── 관리자용 합계 ───────────────────────────────────────────────────────────
-- 글별 누적, 최근 p_days 일의 날짜별 · 유입 경로별 합계를 한 번에 돌려줍니다.
-- (줄 수가 늘어도 한 번의 호출로 끝나도록 합계는 DB 에서 냅니다.)
CREATE OR REPLACE FUNCTION deskon_post_view_stats(p_days INTEGER DEFAULT 30)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH bounds AS (
    SELECT (now() AT TIME ZONE 'Asia/Seoul')::date AS today,
           GREATEST(LEAST(COALESCE(p_days, 30), 365), 1) AS days
  ),
  recent AS (
    SELECT v.post_id, v.day, v.source, v.views
    FROM deskon_post_views v
    CROSS JOIN bounds b
    WHERE v.day > b.today - b.days AND v.day <= b.today
  )
  SELECT jsonb_build_object(
    'today', (SELECT to_char(today, 'YYYY-MM-DD') FROM bounds),
    'days',  (SELECT days FROM bounds),
    'totals', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('postId', t.post_id, 'views', t.views))
      FROM (SELECT post_id, SUM(views)::int AS views FROM deskon_post_views GROUP BY post_id) t
    ), '[]'::jsonb),
    'daily', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('postId', d.post_id, 'day', to_char(d.day, 'YYYY-MM-DD'), 'views', d.views))
      FROM (SELECT post_id, day, SUM(views)::int AS views FROM recent GROUP BY post_id, day) d
    ), '[]'::jsonb),
    'sources', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('postId', s.post_id, 'source', s.source, 'views', s.views))
      FROM (SELECT post_id, source, SUM(views)::int AS views FROM recent GROUP BY post_id, source) s
    ), '[]'::jsonb)
  );
$$;

-- 두 함수는 서비스롤만 실행합니다(브라우저의 anon 키로는 직접 부를 수 없습니다).
REVOKE ALL ON FUNCTION deskon_record_post_view(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION deskon_post_view_stats(INTEGER)     FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION deskon_record_post_view(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION deskon_post_view_stats(INTEGER)     TO service_role;

-- ── 실행 후 확인 ────────────────────────────────────────────────────────────
-- SELECT deskon_post_view_stats(30);
-- → {"today": "2026-11-16", "days": 30, "totals": [], "daily": [], "sources": []} 처럼 나오면 정상입니다.
-- SELECT policyname FROM pg_policies WHERE tablename = 'deskon_post_views';
-- → 한 줄도 없어야 정상입니다.
