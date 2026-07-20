export interface DivisionOffering {
  name: string;
  nameEn: string;
  detail: string;
}

export interface DivisionValue {
  title: string;
  description: string;
}

export interface DivisionStep {
  title: string;
  description: string;
}

export interface Division {
  /** Index number rendered on the site, e.g. "01" */
  no: string;
  slug: "subscribe" | "sharing" | "rental" | "recycle" | "buyback";
  /** Internal intro page route */
  href: string;
  nameKo: string;
  nameFull: string;
  nameEn: string;
  tagline: string;
  description: string;
  /** Short keywords used in menus / marquee / list previews */
  keywords: string[];
  offerings: DivisionOffering[];
  values: DivisionValue[];
  /** 도입 진행 과정 — 문의부터 회수까지 */
  process: DivisionStep[];
  /** 이 분야의 인증·검증 요소 (없으면 미표기) */
  certifications?: string[];
  /** Image shown in the home division index panel (portrait crop) */
  image: string;
  /** Large editorial image on the division intro page */
  heroImage: string;
  imageAlt: string;
  /**
   * 계열사(전문) 사이트 URL. null이면 아직 오픈 전 —
   * CTA가 "오픈 준비중 · 문의하기"로 대체됩니다.
   */
  siteUrl: string | null;
  stat: { value: string; suffix: string; label: string };
}

export const divisions: Division[] = [
  {
    no: "01",
    slug: "subscribe",
    href: "/subscribe",
    nameKo: "구독",
    nameFull: "구독서비스",
    nameEn: "Subscription",
    tagline: "쓸 때만 비용, 멈추면 0원.",
    description:
      "매달 정액으로 필요한 장비를 운영하고, 사용이 멈추면 비용도 멈춥니다. 프리미엄 오피스 체어부터 롤테이너, 주방집기까지 — 3개월 주기 정기 점검과 부품 교체가 모두 포함된 종량형 구독입니다.",
    keywords: ["체어", "롤테이너", "파랫트", "주방집기", "냉난방기"],
    offerings: [
      { name: "체어", nameEn: "Chair", detail: "프리미엄 오피스 체어, 월 15,000원부터" },
      { name: "롤테이너", nameEn: "Roll Tainer", detail: "기본료 + 쓴 날만 과금하는 종량제" },
      { name: "파랫트", nameEn: "Pallet", detail: "목재·플라스틱·철제, 파손 시 무상 교체" },
      { name: "인테이너", nameEn: "Intainer", detail: "소형부터 대형까지 월정액 운영" },
      { name: "이사바구니", nameEn: "Moving Box", detail: "월 기본료 3,000원의 가벼운 구독" },
      { name: "주방집기", nameEn: "Kitchen", detail: "업소용 화구·튀김기·인덕션 종량 구독" },
      { name: "냉난방기", nameEn: "HVAC", detail: "계절 장비를 필요한 계절에만" },
    ],
    values: [
      { title: "초기 비용 ZERO", description: "대량 구매 비용 없이 월정액으로 바로 현장에 투입합니다." },
      { title: "멈추면 0원", description: "자리가 비면, 굴러가지 않으면 — 사용이 멈춘 날은 비용도 멈춥니다." },
      { title: "정기 점검 포함", description: "3개월 주기 전문 코디네이터 방문 점검과 부품 교체가 기본입니다." },
    ],
    process: [
      { title: "문의 · 상담", description: "품목과 수량, 사용 환경을 알려주세요" },
      { title: "맞춤 견적", description: "24시간 내 월 구독료 견적을 보내드립니다" },
      { title: "현장 배치", description: "세척·점검을 마친 장비를 신속히 배송합니다" },
      { title: "정기 관리", description: "3개월 주기 점검, 파손 시 즉시 교체합니다" },
    ],
    certifications: ["세르타(Serta) 인증 체어", "3개월 주기 정기 점검"],
    image: "/images/aovo-banner3.webp",
    heroImage: "/images/aovo-banner1.webp",
    imageAlt: "스포트라이트 아래의 프리미엄 오피스 체어",
    siteUrl: null,
    stat: { value: "2,500", suffix: "+", label: "구독 기업" },
  },
  {
    no: "02",
    slug: "sharing",
    href: "/sharing",
    nameKo: "공유",
    nameFull: "공유서비스",
    nameEn: "Sharing",
    tagline: "스캔 한 번으로, 3초 만에.",
    description:
      "에이플로우(A-flow) 앱으로 QR 코드를 스캔하면 전국 스테이션 어디서든 물류장비를 빌리고 반납할 수 있습니다. 서류도 보증금도 없는 후불 자동 정산, 24시간 무인 운영의 장비 공유 플랫폼입니다.",
    keywords: ["롤테이너", "카트", "공항카트", "스테커", "행사장장비"],
    offerings: [
      { name: "롤테이너", nameEn: "Roll Tainer", detail: "시간당 1,000원부터" },
      { name: "카트", nameEn: "Cart", detail: "시간당 500원부터" },
      { name: "공항카트", nameEn: "Airport Cart", detail: "시간당 1,000원부터" },
      { name: "계단카트", nameEn: "Stair Cart", detail: "최대 300kg, 시간당 2,000원부터" },
      { name: "스테커", nameEn: "Stacker", detail: "KC 인증, 최대 5m 적재" },
      { name: "행사장장비", nameEn: "Event Equipment", detail: "일 10,000원부터" },
    ],
    values: [
      { title: "3초 대여", description: "QR 스캔 한 번이면 끝. 서류도, 보증금도 필요 없습니다." },
      { title: "후불 자동 정산", description: "사용한 시간만큼만 지불합니다. 숨겨진 비용이 없습니다." },
      { title: "24/7 무인 스테이션", description: "전국 30개 이상의 스테이션에서 언제든 대여하고 반납합니다." },
    ],
    process: [
      { title: "앱 설치", description: "에이플로우(A-flow) 앱을 설치하고 가입합니다" },
      { title: "QR 스캔", description: "장비에 부착된 QR 코드를 스캔합니다" },
      { title: "이용", description: "시간 단위 과금으로 필요한 만큼 사용합니다" },
      { title: "반납 · 정산", description: "가까운 스테이션에 반납하면 자동 정산됩니다" },
    ],
    certifications: ["KC 안전 인증 스테커", "정상 운영률 99.2%"],
    image: "/images/subscribe/rolltainer.webp",
    heroImage: "/images/logistics/service-concept.webp",
    imageAlt: "물류 현장에서 롤테이너를 운반하는 모습",
    siteUrl: null,
    stat: { value: "15,000", suffix: "+", label: "누적 대여" },
  },
  {
    no: "03",
    slug: "rental",
    href: "/rental",
    nameKo: "렌탈",
    nameFull: "렌탈서비스",
    nameEn: "Rental",
    tagline: "필요한 기간만큼, 맞춤으로.",
    description:
      "프로젝트, 시즌, 행사에 맞춰 1개월부터 36개월까지 자유롭게 계약합니다. 공간 설계와 설치부터 유지보수, 회수까지 — 장비 운영의 전 과정을 아오보 그룹이 책임집니다.",
    keywords: ["사무가구", "IT기기", "의료장비", "행사집기", "물류장비"],
    offerings: [
      { name: "사무가구·기기", nameEn: "Office", detail: "책상·의자·파티션·복합기, 공간 설계 무료" },
      { name: "주방집기", nameEn: "Kitchen", detail: "HACCP 기준, 24시간 내 긴급 교체" },
      { name: "행사집기", nameEn: "Event", detail: "행사장 원스톱 세팅, 당일 배송" },
      { name: "IT기기·로봇", nameEn: "IT & Robotics", detail: "노트북·키오스크·서빙로봇, 데이터 완전 삭제 보장" },
      { name: "의료장비", nameEn: "Medical", detail: "병원침대·휠체어, 멸균 소독 후 납품" },
      { name: "이동식에어컨", nameEn: "Portable AC", detail: "배관 공사 없이, 1일부터" },
      { name: "산업용제습기", nameEn: "Dehumidifier", detail: "하루 최대 150L, 실시간 습도 모니터링" },
      { name: "물류장비", nameEn: "Logistics", detail: "현장 규모에 맞춘 중장기 렌탈" },
    ],
    values: [
      { title: "1–36개월 자유 계약", description: "필요한 기간을 정하면 계약 기간과 조건을 현장에 맞춥니다." },
      { title: "전 과정 관리", description: "설치, 유지보수, 회수까지 담당 매니저가 원스톱으로 관리합니다." },
      { title: "초기 비용 90% 절감", description: "구매 대비 초기 투자를 대폭 줄이고 현금 흐름을 지킵니다." },
    ],
    process: [
      { title: "문의 · 상담", description: "프로젝트 기간과 현장 조건을 상담합니다" },
      { title: "견적 · 계약", description: "기간·수량 맞춤 견적으로 계약을 확정합니다" },
      { title: "설치", description: "전문팀이 일정에 맞춰 설치를 완료합니다" },
      { title: "운영 관리", description: "유지보수와 긴급 교체를 책임집니다" },
      { title: "회수", description: "계약 종료 시 현장에서 바로 회수합니다" },
    ],
    certifications: ["식약처 의료기기 인증", "DoD 기준 데이터 완전 삭제", "HACCP 위생 기준"],
    image: "/images/logistics/hero-alt.webp",
    heroImage: "/images/logistics/cover.webp",
    imageAlt: "노을빛이 드는 물류창고의 롤테이너",
    siteUrl: null,
    stat: { value: "50,000", suffix: "+", label: "운영 장비" },
  },
  {
    no: "04",
    slug: "recycle",
    href: "/recycle",
    nameKo: "자산연대",
    nameFull: "자산연대서비스",
    nameEn: "Renewal",
    tagline: "새것처럼, 다시.",
    description:
      "입고 검수, 전문 재정비, 3단계 품질 인증을 거친 장비를 신품 대비 최대 60% 합리적인 가격에 제공합니다. 비용 절감과 ESG 경영을 동시에 실현하는 순환 자산 프로그램입니다.",
    keywords: ["세르타 체어", "물류장비", "사무가구", "주방집기", "특수집기"],
    offerings: [
      { name: "체어 · 세르타", nameEn: "Serta Chair", detail: "세르타 인증 기준, 신품 대비 40–60% 절감" },
      { name: "물류장비", nameEn: "Logistics", detail: "롤테이너·파랫트, 최대 50% 절감" },
      { name: "사무가구·기기", nameEn: "Office", detail: "3단계 검수 통과 장비만 공급" },
      { name: "주방집기", nameEn: "Kitchen", detail: "고온고압 스팀세척·UV 살균, HACCP 기준" },
      { name: "이동식에어컨", nameEn: "Portable AC", detail: "최대 60% 절감" },
      { name: "계절상품", nameEn: "Seasonal", detail: "선풍기·온풍기 등 사계절 장비" },
      { name: "산업용제습기", nameEn: "Dehumidifier", detail: "정비 이력 완전 추적" },
      { name: "특수집기", nameEn: "Special", detail: "실험실·클린룸·ESD 방지 랙" },
    ],
    values: [
      { title: "3단계 품질 인증", description: "외관, 기능, 안전 검수를 통과한 장비만 자산연대 인증을 받습니다." },
      { title: "최대 60% 절감", description: "검증된 품질의 장비를 신품 대비 절반 이하의 비용으로 운영합니다." },
      { title: "ESG 실현", description: "연간 320톤의 폐기물을 줄이고, ESG 인증서 발급을 지원합니다." },
    ],
    process: [
      { title: "입고 검수", description: "회수된 장비의 상태를 정밀 진단합니다" },
      { title: "전문 재정비", description: "부품 교체와 세척·살균으로 되살립니다" },
      { title: "품질 인증", description: "외관·기능·안전 3단계 검수를 통과시킵니다" },
      { title: "합리적 제공", description: "신품 대비 최대 60% 절감된 가격으로 공급합니다" },
    ],
    certifications: ["세르타(Serta) 인증 기준", "3단계 품질 검수", "ESG 인증서 발급 지원"],
    image: "/images/aovo-banner4.webp",
    heroImage: "/images/aovo-banner4.webp",
    imageAlt: "재정비를 마친 가죽 체어와 순환 아이콘",
    siteUrl: null,
    stat: { value: "320", suffix: "톤", label: "연간 폐기물 감축" },
  },
  {
    no: "05",
    slug: "buyback",
    href: "/buyback",
    nameKo: "유통",
    nameFull: "유통서비스",
    nameEn: "Trade",
    tagline: "자산의 마지막까지, 가치 있게.",
    description:
      "사무실 이전, 리모델링, 폐업으로 처분이 필요한 장비를 전문 감정 기반의 투명한 가격으로 매입하고 유통합니다. 전국 무료 방문 수거로 자산 회수와 공간 정리를 한 번에 해결합니다.",
    keywords: ["사무가구", "물류장비", "행사집기", "업소용집기"],
    offerings: [
      { name: "사무가구", nameEn: "Office Furniture", detail: "책상·의자·파티션·캐비넷·소파" },
      { name: "물류장비", nameEn: "Logistics", detail: "롤테이너·파렛트·스테커, 대량 일괄 유통" },
      { name: "행사집기", nameEn: "Event", detail: "연회 테이블·조명·음향장비" },
      { name: "업소용집기", nameEn: "Commercial", detail: "냉장고·세척기·인덕션, 매장 일괄 정리" },
    ],
    values: [
      { title: "무료 방문 수거", description: "전국 어디든 전문팀이 직접 방문합니다. 운반 비용이 없습니다." },
      { title: "투명한 감정가", description: "전문 감정을 근거로 산정한 유통가를 그대로 제시합니다." },
      { title: "원스톱 정리", description: "문의, 방문 견적, 수거, 정산까지 4단계로 끝냅니다." },
    ],
    process: [
      { title: "문의", description: "전화·카카오·웹으로 처분 품목을 알려주세요" },
      { title: "방문 견적", description: "전문 감정사가 방문해 유통가를 제안합니다" },
      { title: "수거", description: "합의된 일정에 전문팀이 무료로 수거합니다" },
      { title: "정산", description: "수거 완료 후 대금을 신속히 정산합니다" },
    ],
    image: "/images/splash/furniture.webp",
    heroImage: "/images/aovo-spider-hero.webp",
    imageAlt: "매입·유통되는 프리미엄 오피스 체어",
    siteUrl: null,
    stat: { value: "10", suffix: "년+", label: "유통 업력" },
  },
];

/** 전국 물류거점 네트워크 — Stats 섹션 하단에 표기 */
export const network = {
  regions: ["수도권", "충청권", "영남권", "호남권", "강원 · 제주"],
  sla: "수도권 당일 · 전국 익일 배송",
};

export const groupStats = [
  { value: 2500, suffix: "+", label: "누적 거래 기업", labelEn: "Partner Companies" },
  { value: 50000, suffix: "+", label: "운영 장비", labelEn: "Assets in Operation" },
  { value: 98, suffix: "%", label: "고객 만족도", labelEn: "Customer Satisfaction" },
  { value: 8, suffix: "+", label: "전국 물류 거점", labelEn: "Logistics Hubs" },
];

export function getDivision(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}
