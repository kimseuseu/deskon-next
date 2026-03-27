-- ============================================
-- DESKON Tables (prefix: deskon_)
-- 기존 앱 테이블에 영향 없음
-- ============================================

-- 상품
CREATE TABLE IF NOT EXISTS deskon_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  price INTEGER DEFAULT 0,
  price_unit TEXT DEFAULT '월',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  specs JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 문의
CREATE TABLE IF NOT EXISTS deskon_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  inquiry_type TEXT DEFAULT '일반문의',
  service_category TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 견적 요청
CREATE TABLE IF NOT EXISTS deskon_quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  delivery_date TEXT,
  message TEXT,
  items JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 공지사항
CREATE TABLE IF NOT EXISTS deskon_notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT '일반',
  is_pinned BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ
CREATE TABLE IF NOT EXISTS deskon_faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT '일반',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 배너
CREATE TABLE IF NOT EXISTS deskon_banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 어드민 유저
CREATE TABLE IF NOT EXISTS deskon_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS (Row Level Security) Policies
-- ============================================

ALTER TABLE deskon_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE deskon_admins ENABLE ROW LEVEL SECURITY;

-- Public read for products, notices, faqs, banners
CREATE POLICY "deskon_products_public_read" ON deskon_products FOR SELECT USING (is_active = true);
CREATE POLICY "deskon_notices_public_read" ON deskon_notices FOR SELECT USING (true);
CREATE POLICY "deskon_faqs_public_read" ON deskon_faqs FOR SELECT USING (is_active = true);
CREATE POLICY "deskon_banners_public_read" ON deskon_banners FOR SELECT USING (is_active = true);

-- Public insert for inquiries and quotes
CREATE POLICY "deskon_inquiries_public_insert" ON deskon_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "deskon_quotes_public_insert" ON deskon_quotes FOR INSERT WITH CHECK (true);

-- Service role has full access (via API routes with service_role key)
CREATE POLICY "deskon_products_service" ON deskon_products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_inquiries_service" ON deskon_inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_quotes_service" ON deskon_quotes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_notices_service" ON deskon_notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_faqs_service" ON deskon_faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_banners_service" ON deskon_banners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "deskon_admins_service" ON deskon_admins FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Seed Data
-- ============================================

-- 샘플 공지사항
INSERT INTO deskon_notices (title, content, category, is_pinned) VALUES
('2026년 상반기 신규 서비스 안내', '2026년 상반기부터 산업용 제습기 구독 서비스를 새롭게 시작합니다. 기존 렌탈 서비스와 함께 더욱 유연한 운영이 가능합니다.', '서비스', true),
('설 연휴 배송 일정 안내', '설 연휴 기간(1/27~1/30) 배송이 중단됩니다. 1/31부터 정상 운영되오니 참고 부탁드립니다.', '배송', false),
('AOVO 파트너 계약 혜택 확대', '파트너 기업 대상 추가 할인 및 우선 배정 혜택이 확대되었습니다. 자세한 내용은 파트너 계약 페이지를 확인해주세요.', '일반', false),
('홈페이지 리뉴얼 안내', '더 나은 서비스를 위해 홈페이지가 새롭게 개편되었습니다. 불편사항이 있으시면 문의해 주세요.', '일반', true);

-- 샘플 FAQ
INSERT INTO deskon_faqs (question, answer, category, sort_order) VALUES
('구독 서비스와 렌탈 서비스의 차이점은 무엇인가요?', '구독 서비스는 월 단위로 장비를 이용하며 언제든 수량 조절이 가능합니다. 렌탈 서비스는 일정 기간 계약 후 장비를 이용하는 방식으로, 장기 이용 시 더 유리한 조건을 제공합니다.', '서비스', 1),
('최소 계약 기간이 있나요?', '구독 서비스는 최소 1개월, 렌탈 서비스는 최소 3개월부터 이용 가능합니다. 단기 행사용 장비는 1일 단위 대여도 가능합니다.', '계약', 2),
('장비에 문제가 생기면 어떻게 하나요?', '장비 하자 발생 시 24시간 이내 교체 또는 수리를 진행합니다. 고객센터(02-2683-4459) 또는 카카오톡 채널로 연락 주시면 즉시 대응합니다.', 'AS', 3),
('배송 지역에 제한이 있나요?', '수도권(서울, 경기, 인천) 전 지역 당일 배송이 가능하며, 그 외 지역은 익일 배송됩니다. 도서산간 지역은 별도 문의 바랍니다.', '배송', 4),
('견적은 어떻게 받을 수 있나요?', '홈페이지 문의 폼, 카카오톡 채널, 또는 전화(02-2683-4459)로 문의하시면 24시간 내 맞춤 견적서를 발송해 드립니다.', '견적', 5),
('기존 보유 장비의 순환(매입)도 가능한가요?', '네, 사용하던 물류장비, 사무가구, 주방집기 등의 매입 및 재활용 서비스를 제공합니다. 장비 상태 확인 후 적정 매입가를 제안드립니다.', '순환', 6);

-- 어드민 계정 (비밀번호: aovo2025! 의 bcrypt 해시)
INSERT INTO deskon_admins (email, password_hash, name) VALUES
('admin@aovo.kr', '$2b$10$8K1p/a0dL/TQq3h4WwN5YeYQZ5Y5h5Y5h5Y5h5Y5h5Y5h5Y5h5Y5h', '관리자');
