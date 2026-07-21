-- 카카오 "나에게 보내기" 알림 연동용 설정 저장소
-- 리프레시 토큰을 여기에 보관하고, 사용할 때마다 자동 갱신하여 만료를 방지합니다.
-- 실행: Supabase 대시보드 → SQL Editor 에 붙여넣고 Run

CREATE TABLE IF NOT EXISTS deskon_settings (
  key        text PRIMARY KEY,
  value      text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE deskon_settings ENABLE ROW LEVEL SECURITY;

-- 정책을 만들지 않습니다 → 익명(anon)·로그인 사용자 모두 접근 불가.
-- API 서버의 서비스 롤 키만 RLS를 우회하여 읽고 씁니다. (토큰은 절대 외부로 노출되지 않음)
