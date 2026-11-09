-- ============================================================================
-- 견적 문의 상세(details) 컬럼 — 운영 Supabase SQL Editor 에서 한 번 실행합니다.
-- ============================================================================
--
-- /support/contact 의 단계형 견적 문의가 고른 분야·현장 정보·세부 옵션·명함 사진 주소를
-- deskon_inquiries.details(jsonb) 한 컬럼에 담습니다. 모양은 src/data/inquiry.ts 의
-- InquiryDetails 입니다(version 필드로 구분). 기존 컬럼(name, phone, message …)은 그대로
-- 쓰므로 옛 문의와 옛 요청 형식은 영향이 없습니다.
--
-- 이 SQL을 아직 실행하지 않았어도 /api/inquiries 는 details 없이 다시 저장하므로 문의가
-- 막히지는 않습니다. 다만 그동안의 분야·현장 정보·명함은 message 요약에만 남습니다.

ALTER TABLE deskon_inquiries
  ADD COLUMN IF NOT EXISTS details JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN deskon_inquiries.details IS
  '견적 문의 상세. {version, field, event, options, memo, businessCard, contactFromCard} — src/data/inquiry.ts InquiryDetails';

-- 관리자 목록이 최신순으로 읽습니다.
CREATE INDEX IF NOT EXISTS deskon_inquiries_created_idx
  ON deskon_inquiries (created_at DESC);

-- 분야별로 거를 때(details->'field'->>'slug')
CREATE INDEX IF NOT EXISTS deskon_inquiries_field_idx
  ON deskon_inquiries ((details -> 'field' ->> 'slug'));

-- PostgREST 스키마 캐시를 새로 읽게 합니다(없으면 «Could not find the 'details' column» 오류).
NOTIFY pgrst, 'reload schema';

-- ── 실행 후 확인 ────────────────────────────────────────────────────────────
-- SELECT column_name, data_type FROM information_schema.columns
--  WHERE table_name = 'deskon_inquiries' AND column_name = 'details';
-- → jsonb 한 줄이 보이면 정상입니다.
