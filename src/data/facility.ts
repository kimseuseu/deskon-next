/**
 * 설비공사 랜딩 — 가스설비공사 + 급배수설비공사.
 * 카피·품목·단계는 전부 이 파일에서 파생됩니다. 수정은 여기서만.
 */

export interface FacilityPoint {
  title: string;
  description: string;
}

export interface FacilityLineupItem {
  name: string;
  /** 규격·용량·역할 등 짧은 보조 정보 */
  specs: string[];
}

export interface FacilityWork {
  id: "gas" | "water";
  /** 독립 랜딩 경로 */
  href: string;
  nameKo: string;
  nameFull: string;
  nameEn: string;
  /** 서체 액센트로 쓰이는 짧은 한 줄 */
  motto: string;
  categories: string[];
  summary: string;
  /** 사진 위 손글씨 카피 */
  caption: string;
  trust: FacilityPoint[];
  reasons: FacilityPoint[];
  lineup: { title: string; lead: string; items: FacilityLineupItem[] };
  install: { title: string; lead: string; items: string[] };
  cta: { title: string; lead: string; promises: FacilityPoint[]; slogan: string };
  image: string;
  imageAlt: string;
}

export const gas: FacilityWork = {
  id: "gas",
  href: "/gas",
  nameKo: "가스설비",
  nameFull: "아오보 가스설비공사",
  nameEn: "Gas Works",
  motto: "안전한 가스, 든든한 오늘",
  categories: ["업소용 가스기기", "행사장 가스설비", "배관공사", "안전검사 대행"],
  summary: "기기 판매부터 설치, 배관, 안전필증까지 한 번에",
  caption: "안전한 사업의 시작, 아오보가 함께합니다.",
  trust: [
    { title: "신뢰할 수 있는 전문 시공", description: "" },
    { title: "안전이 우선인 가스 설비", description: "" },
    { title: "다양한 현장 경험의 맞춤 솔루션", description: "" },
  ],
  reasons: [
    { title: "업소용 가스기기 전문", description: "다양한 업소용 가스기기를 전문적으로 취급합니다." },
    { title: "실내 · 야외 설치 가능", description: "식당, 급식소, 행사장 등 어떤 환경에서도 설치 가능합니다." },
    { title: "배관공사 및 부속 설치", description: "안전하고 정밀한 배관공사와 각종 부속 설치를 제공합니다." },
    { title: "안전검사 · 필증 대행", description: "가스 안전검사 및 안전필증 대행까지 신속하게 처리합니다." },
  ],
  lineup: {
    title: "제품 라인업",
    lead: "다양한 업소용 가스기기로 성공적인 비즈니스를 함께합니다.",
    items: [
      { name: "간택기", specs: ["600", "900", "1200", "1500", "1800"] },
      { name: "낮은렌지", specs: ["600", "1200"] },
      { name: "탕렌지", specs: ["800"] },
      { name: "중화버너", specs: ["1구 버너", "1500"] },
      { name: "회전국솥", specs: ["150인분", "350인분", "500인분"] },
      { name: "인덕션렌지", specs: ["탁상용", "낮은렌지"] },
    ],
  },
  install: {
    title: "배관공사 및 설치서비스",
    lead: "현장에 맞는 최적의 시공으로 안전하고 편리한 가스 환경을 만들어드립니다.",
    items: ["실내 설치", "야외 설치", "가스호스 연결", "안전기", "조절기", "중간밸브", "기타 부속"],
  },
  cta: {
    title: "가스설비는 전문업체에 맡기세요",
    lead: "현장 상황에 맞는 기기 선정부터 설치 · 배관 · 검사대행까지 신속하게 상담해드립니다.",
    promises: [
      { title: "빠른 상담", description: "신속한 견적 및 일정 안내" },
      { title: "맞춤 솔루션", description: "현장에 최적화된 제안" },
      { title: "안전한 시공", description: "처음부터 끝까지 책임시공" },
    ],
    slogan: "안전한 가스가 좋은 내일을 만듭니다.",
  },
  image: "/images/facility/gas-tech.webp",
  imageAlt: "업소용 주방에서 노란 가스 배관과 압력계를 점검하는 아오보 가스설비공사 기사",
};

/** 검사대행 — 가스 전용 섹션 */
export const inspection = {
  title: "검사대행",
  lead: "안전필증 대행 및 가스 안전검사 관련 업무 지원",
  document: "가스시설완성검사필증",
  items: [
    { title: "안전필증 대행", description: "복잡한 서류 절차를 대신 처리해드립니다." },
    { title: "가스 안전검사 지원", description: "정기검사, 사용검사 등 관련 업무를 지원합니다." },
    { title: "전문가의 신속한 대응", description: "풍부한 경험으로 빠르고 정확하게 진행합니다." },
  ] satisfies FacilityPoint[],
  caption: "안전한 영업의 든든한 파트너, 아오보 가스설비공사",
};

export const water: FacilityWork = {
  id: "water",
  href: "/water",
  nameKo: "급배수설비",
  nameFull: "아오보 급배수설비공사",
  nameEn: "Water Works",
  motto: "물이 필요한 현장, 배수가 필요한 현장",
  categories: ["급수설비", "배수설비", "오 · 폐수 처리대행", "음식물 처리대행"],
  summary: "수도계량기 인입부터 싱크대 설치, 배수 처리, 행사장 관리까지 한 번에",
  caption: "행사장의 물 흐름을 아오보가 관리합니다.",
  trust: [
    { title: "현장 맞춤 설비", description: "현장에 맞는 최적의 설비 구축" },
    { title: "빠른 설치 대응", description: "신속한 현장 대응 및 설치" },
    { title: "사이클 컨트롤 관리", description: "처음부터 끝까지 체계적 관리" },
  ],
  reasons: [
    { title: "급수 · 배수 통합관리", description: "급수부터 배수까지 하나의 시스템으로 운영합니다." },
    { title: "실내 · 야외 설치 가능", description: "실내 행사장과 야외 부스 모두 설치 가능합니다." },
    { title: "오 · 폐수 처리대행", description: "행사 종료까지 오수 · 폐수 처리 연계를 지원합니다." },
    { title: "음식물 처리대행", description: "현장 음식물류 폐기물 처리까지 함께 대응합니다." },
  ],
  lineup: {
    title: "서비스 라인업",
    lead: "행사장과 임시주방 현장에 필요한 급수 · 배수 서비스를 제공합니다.",
    items: [
      { name: "1톤 물탱크", specs: ["현장 급수 저장"] },
      { name: "1톤 5통 운용", specs: ["대량 급수 대응"] },
      { name: "부스 사용량 계산", specs: ["하루 수도사용량 관리"] },
      { name: "싱크대 설치", specs: ["급수 인입 · 배수 연결"] },
      { name: "오 · 폐수 처리", specs: ["회수 · 처리대행"] },
      { name: "음식물 처리", specs: ["현장 정리 지원"] },
    ],
  },
  install: {
    title: "급수배수 설치서비스",
    lead: "수도계량기에서 급수 인입 후 싱크대까지 연결하고, 사용 후 배수까지 안정적으로 처리합니다.",
    items: ["실내설비", "야외설비", "보온설비", "급수호스 연결", "배수호스 연결", "오 · 폐수 처리대행", "기타 부속"],
  },
  cta: {
    title: "급배수설비는 전문업체에 맡기세요",
    lead: "현장 상황에 맞는 급수 · 배수 설계부터 설치, 처리대행, 관리까지 신속하게 상담해드립니다.",
    promises: [
      { title: "빠른 상담", description: "신속한 견적 및 일정 안내" },
      { title: "맞춤 솔루션", description: "현장 조건에 최적화된 제안" },
      { title: "책임 관리", description: "설치부터 종료까지 책임 대응" },
    ],
    slogan: "물의 흐름이 성장의 완성입니다.",
  },
  image: "/images/facility/water-tech.webp",
  imageAlt: "천막 아래 물탱크와 스테인리스 싱크대에 급수 호스를 연결하는 아오보 급배수설비공사 기사",
};

/** 급수배수 사이클 컨트롤 관리 — 순서가 있는 실제 공정 */
export const cycle = {
  title: "급수배수 사이클 컨트롤 관리",
  lead: "처음부터 끝까지, 현장의 물 흐름을 체계적으로 관리합니다.",
  steps: ["급수 인입", "사용량 체크", "배수 집수", "오 · 폐수 처리", "음식물 처리", "현장 점검"],
  points: [
    { title: "부스별 사용량 관리", description: "부스 하루 수도사용량을 체계적으로 관리합니다." },
    { title: "현장 흐름 안정화", description: "급수와 배수 흐름을 균형 있게 컨트롤합니다." },
    { title: "문제 예방 대응", description: "누수, 역류, 호스 이상을 빠르게 체크합니다." },
  ] satisfies FacilityPoint[],
  slogan: "안정적인 현장이 성공적인 행사입니다.",
};

/** 호스 기름기 · 막힘 컨트롤 박스 */
export const controlBox = {
  title: "호스 기름기 · 막힘 컨트롤 박스",
  lead: "음식물 찌꺼기와 기름기로 인한 막힘을 줄이고 배수 흐름을 안정적으로 관리합니다.",
  productName: "아오보 배수 컨트롤 박스",
  features: [
    { title: "1차 찌꺼기 거름", description: "음식물 찌꺼기 1차 거름으로 막힘을 최소화합니다." },
    { title: "기름기 분리 보조", description: "기름기 분리로 배수관 오염을 줄입니다." },
    { title: "막힘 예방 관리", description: "지속적인 배수 흐름을 위한 사전 예방 관리가 가능합니다." },
  ] satisfies FacilityPoint[],
  caption: "깨끗한 배수가 더 좋은 현장을 만듭니다.",
  image: "/images/facility/control-box.webp",
  imageAlt: "배수 호스 사이에 설치된 아오보 배수 컨트롤 박스",
};

/** 두 랜딩은 서로를 가리킵니다. 맺음 장면의 «다른 설비» 링크가 씁니다. */
export const works = [gas, water] as const;
