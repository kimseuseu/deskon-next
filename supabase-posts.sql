-- ============================================================================
-- 블로그 글 테이블 — 운영 Supabase SQL Editor 에서 한 번 실행합니다.
-- ============================================================================
--
-- www.aovo.kr/blog 의 글은 이 테이블 하나에 들어갑니다. 관리자 페이지(/admin/posts)가
-- 서비스롤 키로 읽고 쓰며, 공개 화면은 서버 컴포넌트에서 같은 키로 published 글만 읽습니다.
-- anon 키로는 published 글만 SELECT 할 수 있고, 쓰기는 전혀 안 됩니다.

CREATE TABLE IF NOT EXISTS deskon_posts (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug             TEXT        NOT NULL UNIQUE,            -- 글 주소. /blog/<slug>
  title            TEXT        NOT NULL,
  excerpt          TEXT        NOT NULL DEFAULT '',        -- 검색 결과 설명문·카드 요약 (180자 안팎)
  content_md       TEXT        NOT NULL DEFAULT '',        -- 마크다운 본문
  category         TEXT        NOT NULL DEFAULT '아오보 소식',
  cover_image_url  TEXT,                                   -- 대표 이미지 (목록 카드·OG)
  cover_image_alt  TEXT,
  author_name      TEXT        NOT NULL DEFAULT '아오보',
  status           TEXT        NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at     TIMESTAMPTZ,                            -- 발행 시각. 미래면 예약 발행
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS deskon_posts_published_idx
  ON deskon_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS deskon_posts_category_idx
  ON deskon_posts (category);

-- updated_at 자동 갱신
CREATE OR REPLACE FUNCTION deskon_posts_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS deskon_posts_touch ON deskon_posts;
CREATE TRIGGER deskon_posts_touch
  BEFORE UPDATE ON deskon_posts
  FOR EACH ROW EXECUTE FUNCTION deskon_posts_touch_updated_at();

-- RLS: anon 은 발행된 글만 읽기. 쓰기 정책은 두지 않습니다(서비스롤이 RLS 를 우회).
ALTER TABLE deskon_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "deskon_posts_public_read" ON deskon_posts;
CREATE POLICY "deskon_posts_public_read" ON deskon_posts
  FOR SELECT USING (status = 'published' AND published_at <= now());

-- ── 실행 후 확인 ────────────────────────────────────────────────────────────
-- SELECT tablename, policyname, cmd FROM pg_policies WHERE tablename = 'deskon_posts';
-- → deskon_posts_public_read / SELECT 한 줄만 보이면 정상입니다.
