import type { Division } from "./divisions";

export interface BrandSpecialty {
  name: string;
  nameEn: string;
  detail: string;
}

export interface BrandValue {
  title: string;
  description: string;
}

export interface Brand {
  /** Index number rendered on the site, e.g. "01" */
  no: string;
  slug: "iden" | "dkorea" | "dcall" | "coverix" | "topworks" | "gratop";
  /** Internal intro page route */
  href: string;
  /** 상호(브랜드명) — 로마자 표기 그대로 사용 */
  name: string;
  nameKo: string;
  /** 담당 분야 한 줄 (회장님 지시 기준) */
  domain: string;
  domainEn: string;
  tagline: string;
  description: string;
  specialties: BrandSpecialty[];
  values: BrandValue[];
  /** 이 브랜드가 움직이는 아오보 서비스 */
  services: Division["slug"][];
  /** 페이지 히어로 이미지 — 없으면 타이포그래픽 밴드로 대체 */
  heroImage: string | null;
  imageAlt: string;
  /** 브랜드 로고 이미지 — 없으면 텍스트 락업으로 표기 */
  logo: string | null;
  /** 공식 사이트 — null이면 "오픈 준비중" CTA */
  siteUrl: string | null;
}

export const brands: Brand[] = [
  {
    no: "01",
    slug: "iden",
    href: "/iden",
    name: "IDEN",
    nameKo: "아이덴",
    domain: "기업 인사총무 · 사무환경",
    domainEn: "Corporate & Office Environment",
    tagline: "일하는 공간의 기준.",
    description:
      "기업 인사·총무 부서가 찾는 사무환경의 모든 것. 사무가구와 OA기기의 판매와 유통부터 렌탈, 구독까지 — 오피스 자산의 도입과 운영을 IDEN이 책임집니다.",
    specialties: [
      { name: "사무가구 판매", nameEn: "Sales", detail: "책상·의자·파티션, 기업 규모에 맞는 공급" },
      { name: "기업 유통", nameEn: "Distribution", detail: "B2B 대량 납품과 오피스 셋업" },
      { name: "사무환경 렌탈", nameEn: "Rental", detail: "필요한 기간만큼, 설치부터 회수까지" },
      { name: "오피스 구독", nameEn: "Subscription", detail: "월정액으로 운영하는 사무환경" },
    ],
    values: [
      { title: "원스톱 운영", description: "구매 견적부터 구독 전환까지 — 도입 방식을 자유롭게 오갈 수 있습니다." },
      { title: "기업 맞춤 납품", description: "인원과 공간, 예산에 맞춘 구성으로 총무 업무의 짐을 덜어드립니다." },
      { title: "검증된 품질", description: "아오보 그룹이 현장에서 검증한 제품만 공급합니다." },
    ],
    services: ["subscribe", "rental", "buyback"],
    heroImage: "/images/aovo-living.webp",
    imageAlt: "정돈된 사무 공간",
    logo: null,
    siteUrl: null,
  },
  {
    no: "02",
    slug: "dkorea",
    href: "/dkorea",
    name: "DKOREA",
    nameKo: "디코리아",
    domain: "물류센터 · 택배유통 · 3PL",
    domainEn: "Logistics & 3PL",
    tagline: "물류장비의 모든 순간.",
    description:
      "디코리아는 물류운반장비 중고 전문 쇼핑몰입니다. 롤테이너와 파랫트, 메쉬파랫트부터 도크, 스테커까지 — 물류센터와 택배유통, 3PL 현장에 필요한 장비의 매입과 판매, 당일 렌탈을 한곳에서 해결합니다.",
    specialties: [
      { name: "롤테이너", nameEn: "Roll Tainer", detail: "양문형·접이식 철제 롤테이너, 렌탈과 판매 모두" },
      { name: "파랫트", nameEn: "Pallet", detail: "목재·플라스틱·철제 파랫트 매입과 판매" },
      { name: "메쉬파랫트", nameEn: "Mesh Pallet", detail: "적재와 보관을 한 번에, 접이식 메쉬파랫트" },
      { name: "도크", nameEn: "Dock", detail: "신품 도크를 합리적인 가격으로" },
      { name: "스테커", nameEn: "Stacker", detail: "적재·하역용 스테커, 단기 렌탈 가능" },
      { name: "운반카트", nameEn: "Cart", detail: "현장 규모에 맞는 운반 카트 일체" },
    ],
    values: [
      { title: "중고 전문 감정", description: "현장에서 검증된 중고 물류장비를 전문 감정을 거쳐 합리적인 가격에 제공합니다." },
      { title: "당일 · 단기 렌탈", description: "명절 성수기 하루 렌탈부터 단기 프로젝트까지, 필요한 날만 빌려 쓸 수 있습니다." },
      { title: "매일 업데이트", description: "렌탈 가능 품목과 신규 입고 소식이 매일 갱신됩니다. 오늘 필요한 장비를 바로 확인하세요." },
    ],
    services: ["sharing", "rental", "recycle", "buyback"],
    heroImage: "/images/logistics/hero-alt.webp",
    imageAlt: "물류창고의 롤테이너",
    logo: "/images/dkorea/dkorea-logo.png",
    siteUrl: "https://dkorea.co.kr",
  },
  {
    no: "03",
    slug: "dcall",
    href: "/dcall",
    name: "달려콜",
    nameKo: "Dallyeocall",
    domain: "긴급 현장 인력 · 시간 단위 투입",
    domainEn: "On-demand Field Crew",
    tagline: "전국 30분 이내 도착.",
    description:
      "사람 하나가 비어서 일이 멈춘 그날 거는 전화입니다. 상하차와 행사 설치, 이사 정리부터 전기 · 배관 기술자까지 작업에 맞는 사람을 시간 단위로 보내고, 요청한 시간과 인원만 정산합니다. 물류센터, 행사장, 사무실, 집까지 창구는 하나입니다.",
    specialties: [
      { name: "이동 · 설치", nameEn: "Move & Set", detail: "가구 · 가전 옮기기, 설치 보조" },
      { name: "상하차", nameEn: "Loading", detail: "물품 싣고 내리기, 창고 정리" },
      { name: "정리 · 반출", nameEn: "Clear-out", detail: "폐기물 정리, 사무실 이사 정리" },
      { name: "행사 설치 · 철거", nameEn: "Event Crew", detail: "부스 설치, 의자 · 테이블 배치" },
      { name: "기술자", nameEn: "Licensed", detail: "전기, 배관 · 수도, 설비 수리, 목공, 미장 · 도배" },
    ],
    values: [
      { title: "펑크 난 자리를 그날 메웁니다", description: "결원 연락을 받은 날 사람이 갑니다. 내일 아침이 아니라 오늘 그 현장으로." },
      { title: "고정 인건비가 사라집니다", description: "채용도, 대기 시간도 계산하지 않습니다. 요청한 시간과 인원만 정산합니다." },
      { title: "중간에 사람이 바뀌지 않습니다", description: "세 시간이 필요하면 그 세 시간을 통째로 비울 수 있는 사람만 보냅니다." },
    ],
    services: ["sharing", "rental"],
    heroImage: "/images/brands/dcall-hero.webp",
    imageAlt: "행사장에서 전화로 인력을 부르는 담당자",
    logo: "/images/brands/dcall-logo.webp",
    siteUrl: "https://www.timecall.kr",
  },
  {
    no: "04",
    slug: "coverix",
    href: "/coverix",
    name: "COVERIX",
    nameKo: "커버릭스",
    domain: "이동식 장비 맞춤 커버 · 점검 · 자산관리 구독",
    domainEn: "Equipment Covers & Asset Care",
    tagline: "덮고, 살피고, 오래 씁니다.",
    description:
      "롤테이너를 비롯한 이동식 장비의 맞춤 커버를 만들고, 전국을 순회하며 무료 점검과 용접 · 바퀴 수리를 합니다. 그 둘을 월 단위로 묶은 자산관리 구독까지, 장비가 오래 일하게 하는 일을 COVERIX가 맡습니다.",
    specialties: [
      { name: "롤테이너 맞춤 커버", nameEn: "Custom Cover", detail: "표준 규격에 맞춰 재단, 로고 인쇄" },
      { name: "정기 점검 · 수리", nameEn: "Inspection", detail: "전국 순회 점검, 용접부 · 바퀴 · 잠금장치 수리" },
      { name: "자산관리 구독", nameEn: "Subscription", detail: "점검 · 수리 · 커버 교체를 월 단위로" },
      { name: "업종별 사양", nameEn: "Industry Spec", detail: "병원 · 공항 · 출장뷔페 · 호텔 세탁물 · 식품공장" },
    ],
    values: [
      { title: "현장 사양대로 재단", description: "병원, 공항, 식품처럼 현장이 요구하는 원단과 마감으로 만듭니다." },
      { title: "그 자리에서 수리", description: "점검하러 간 자리에서 용접부와 바퀴, 잠금장치를 바로 손봅니다." },
      { title: "상태가 리포트로 남습니다", description: "어느 장비가 어떤 상태인지 관리 리포트로 남겨 교체 시기를 놓치지 않습니다." },
    ],
    services: ["subscribe", "sharing"],
    heroImage: "/images/brands/coverix-hero.webp",
    imageAlt: "커버를 씌운 롤테이너가 줄지어 선 물류창고",
    logo: "/images/brands/coverix-logo.webp",
    siteUrl: "https://www.coverix.kr",
  },
  {
    no: "05",
    slug: "topworks",
    href: "/topworks",
    name: "TOPWORKS",
    nameKo: "탑웍스",
    domain: "마차 · 포장마차 · 업소용 특수집기 주문제작",
    domainEn: "Custom Fabrication",
    tagline: "상상이 현실이 되는 곳.",
    description:
      "시중에 없는 상업용 · 전시 · 행사용 특수집기를 주문제작합니다. 이동식 마차와 포장마차, 깡통테이블, 통닭기계, 업소용 스테인리스 집기까지 자체 공장에서 만들어 설치하고, 필요할 때만 쓰실 거면 단기임대로 드립니다.",
    specialties: [
      { name: "마차 · 포장마차", nameEn: "Food Cart", detail: "바퀴, 차양, 조명, 동선을 자리에 맞춰" },
      { name: "깡통테이블", nameEn: "Drum Table", detail: "지름 · 높이 · 상판 재질을 좌석에 맞춰" },
      { name: "통닭기계", nameEn: "Roaster", detail: "회전기, 튀김기, 배기까지 한 세트" },
      { name: "업소용 맞춤 집기", nameEn: "Stainless Custom", detail: "작업대, 진열대, 카운터, 선반" },
      { name: "단기임대", nameEn: "Rental", detail: "행사 · 팝업처럼 기간이 정해진 일" },
    ],
    values: [
      { title: "최소 수량 1대", description: "공장이 안 받아 주는 수량도 받습니다. 시험 제작도 됩니다." },
      { title: "로고 인쇄 무료, 전국 설치", description: "브랜드 로고와 맞춤 디자인을 넣고, 전국 어디든 설치까지 끝냅니다." },
      { title: "설치 뒤에도 손봅니다", description: "쓰시는 동안 고장이 나거나 바꾸고 싶은 곳이 생기면 고치는 것까지 저희 일입니다." },
    ],
    services: ["rental", "buyback"],
    heroImage: "/images/brands/topworks-hero.webp",
    imageAlt: "주황 천막을 올린 이동식 포장마차",
    logo: "/images/brands/topworks-mark.svg",
    siteUrl: "https://topworks.kr",
  },
  {
    no: "06",
    slug: "gratop",
    href: "/gratop",
    name: "GRATOP",
    nameKo: "그라탑",
    domain: "바닥보양재 · 매트 도매 · 소매 · 임대 · 주문제작",
    domainEn: "Floor Protection & Mats",
    tagline: "밟히는 바닥은 전부 덮습니다.",
    description:
      "행사장, 공사장, 전시장. 사람과 장비가 지나는 바닥을 자재로 지킵니다. 바닥보양재, 고무롤매트, 인조잔디, 야자매트를 필요한 면적만큼 주문제작하고, 소매로 팔고, 기간만큼 임대합니다.",
    specialties: [
      { name: "바닥보양재", nameEn: "Ground Mat", detail: "트랙 · 잔디 · 흙바닥 위로 차량과 사람이 지나는 동안" },
      { name: "고무롤매트", nameEn: "Rubber Roll", detail: "장비 동선, 미끄럼 방지, 충격 흡수" },
      { name: "인조잔디", nameEn: "Turf", detail: "행사장과 전시장 바닥 연출" },
      { name: "야자매트", nameEn: "Coir Mat", detail: "야외 동선과 공사장 출입구" },
      { name: "임대 · 주문제작", nameEn: "Rental & Custom", detail: "날짜와 면적만 알려주시면 깔고 걷습니다" },
    ],
    values: [
      { title: "며칠만 쓰는 바닥은 빌립니다", description: "행사장과 전시장은 사지 않아도 됩니다. 가져다 깔고, 끝나면 걷어 갑니다." },
      { title: "치수에 맞춰 만듭니다", description: "폭과 길이, 두께, 색을 현장에 맞춰 만들고 로고 인쇄도 됩니다." },
      { title: "깔고 걷는 것까지", description: "배송, 시공, 사용, 회수. 현장의 바닥은 처음부터 끝까지 저희가 맡습니다." },
    ],
    services: ["rental", "buyback"],
    heroImage: "/images/brands/gratop-hero.webp",
    imageAlt: "바닥보양재를 깐 야외 행사장",
    logo: null,
    siteUrl: "https://gratop.kr",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** 해당 서비스(사업분야)를 움직이는 브랜드 목록 */
export function brandsForDivision(divisionSlug: Division["slug"]): Brand[] {
  return brands.filter((b) => b.services.includes(divisionSlug));
}
