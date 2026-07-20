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
  slug: "iden" | "vetix" | "indrix" | "dkorea";
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
    slug: "vetix",
    href: "/vetix",
    name: "VETIX",
    nameKo: "베틱스",
    domain: "전기시설 · 데이터센터 · UPS/산업용 배터리",
    domainEn: "Power & Data Center",
    tagline: "멈추지 않는 전원의 조건.",
    description:
      "데이터센터와 전기시설의 심장, UPS와 산업용 배터리를 다룹니다. 중고 매입과 검증 판매, 정밀 성능테스트, 그리고 구독형 전원 운영까지 — 전원이 멈추지 않도록 VETIX가 지킵니다.",
    specialties: [
      { name: "중고 매입", nameEn: "Buyback", detail: "UPS·산업용 배터리를 전문 감정 후 매입" },
      { name: "검증 판매", nameEn: "Sales", detail: "성능테스트를 통과한 장비만 판매" },
      { name: "성능테스트", nameEn: "Testing", detail: "용량·방전 정밀 진단으로 수명을 검증" },
      { name: "구독서비스", nameEn: "Subscription", detail: "전원 설비를 월정액으로 운영" },
    ],
    values: [
      { title: "정밀 성능테스트", description: "용량과 방전 특성을 계측 장비로 진단해 데이터로 증명합니다." },
      { title: "안전한 중고 거래", description: "산업용 배터리의 상태를 투명하게 공개하고 합리적인 가격을 제시합니다." },
      { title: "무정전을 위한 운영", description: "교체 주기 관리와 정기 점검으로 다운타임을 예방합니다." },
    ],
    services: ["subscribe", "recycle", "buyback"],
    heroImage: null,
    imageAlt: "데이터센터 전원 설비",
    logo: null,
    siteUrl: null,
  },
  {
    no: "03",
    slug: "indrix",
    href: "/indrix",
    name: "INDRIX",
    nameKo: "인드릭스",
    domain: "공장 · 설비 · 생산기술",
    domainEn: "Industrial Facilities",
    tagline: "생산 라인의 컨디션.",
    description:
      "공장과 생산 현장의 핵심 설비를 공급하고 운영합니다. 칠러와 냉각탑, 집진기, 산업용 공기청정기까지 — 생산기술의 눈으로 설비를 고르고, 현장에 맞게 운영하는 INDRIX입니다.",
    specialties: [
      { name: "칠러", nameEn: "Chiller", detail: "공정 냉각의 기준, 현장 맞춤 용량 설계" },
      { name: "냉각탑", nameEn: "Cooling Tower", detail: "설치부터 유지보수까지 원스톱" },
      { name: "집진기", nameEn: "Dust Collector", detail: "작업 환경 기준을 맞추는 분진 관리" },
      { name: "산업용 공기청정기", nameEn: "Air Purifier", detail: "생산 현장의 공기질 운영" },
    ],
    values: [
      { title: "설비 진단과 제안", description: "생산기술 관점에서 현장을 진단하고 최적 용량을 제안합니다." },
      { title: "신속한 설치", description: "가동 중단을 최소화하는 일정으로 설치와 교체를 진행합니다." },
      { title: "라인 맞춤 운영", description: "공정 특성에 맞춘 유지보수 주기로 설비 수명을 관리합니다." },
    ],
    services: ["subscribe", "rental"],
    heroImage: null,
    imageAlt: "산업 설비 현장",
    logo: null,
    siteUrl: null,
  },
  {
    no: "04",
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
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** 해당 서비스(사업분야)를 움직이는 브랜드 목록 */
export function brandsForDivision(divisionSlug: Division["slug"]): Brand[] {
  return brands.filter((b) => b.services.includes(divisionSlug));
}
