export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceData {
  category: "subscribe" | "sharing" | "rental" | "recycle" | "wholesale";
  categoryLabel: string;
  slug: string;
  title: string;
  subtitle: string;
  heroGradient: string;
  features: ServiceFeature[];
  process: ProcessStep[];
  metaDescription: string;
}

// ALL 40+ services defined here
export const services: ServiceData[] = [
  // === SUBSCRIBE (7) ===
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "rolltainer",
    title: "롤테이너 구독",
    subtitle:
      "물류 현장의 핵심 장비, 필요한 만큼만 구독하세요. 인원 변동에 따라 유연하게 수량을 조절할 수 있습니다.",
    heroGradient: "from-blue-950 to-blue-700",
    features: [
      {
        icon: "📦",
        title: "유연한 수량 조절",
        description:
          "계절별, 프로젝트별 물량 변동에 맞춰 롤테이너 수를 자유롭게 조절합니다.",
      },
      {
        icon: "🔧",
        title: "정기 점검 서비스",
        description:
          "3개월마다 전문 코디네이터가 방문하여 장비 상태를 점검하고 무상 수리합니다.",
      },
      {
        icon: "💰",
        title: "초기 비용 제로",
        description:
          "구매 대비 초기 투자 비용 없이 월 구독료만으로 바로 사용 가능합니다.",
      },
    ],
    process: [
      { step: 1, title: "문의", description: "필요 수량과 기간을 알려주세요" },
      {
        step: 2,
        title: "견적",
        description: "맞춤 견적을 24시간 내 제공합니다",
      },
      {
        step: 3,
        title: "배치",
        description: "원하는 장소로 신속하게 배송합니다",
      },
      {
        step: 4,
        title: "관리",
        description: "정기 점검과 교체를 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 롤테이너 구독 서비스 - 물류 현장에 필요한 롤테이너를 월 구독료로 유연하게 운영하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "pallet",
    title: "파랫트 구독",
    subtitle:
      "물류 보관과 운반의 기본, 파랫트를 필요한 만큼만 구독하세요.",
    heroGradient: "from-slate-900 to-slate-600",
    features: [
      {
        icon: "🏗️",
        title: "다양한 규격",
        description:
          "목재, 플라스틱, 철제 등 다양한 소재와 규격의 파랫트를 제공합니다.",
      },
      {
        icon: "♻️",
        title: "순환 관리",
        description:
          "사용 후 회수, 세척, 보수를 통해 지속 가능한 순환 시스템을 운영합니다.",
      },
      {
        icon: "📊",
        title: "자산 추적",
        description:
          "바코드 기반 자산관리로 파랫트 위치와 상태를 실시간 추적합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "문의",
        description: "필요 규격과 수량을 상담합니다",
      },
      { step: 2, title: "견적", description: "맞춤 견적을 제공합니다" },
      { step: 3, title: "배송", description: "전국 어디든 신속 배송합니다" },
      {
        step: 4,
        title: "관리",
        description: "정기 순환 및 보수를 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 파랫트 구독 서비스 - 물류 파랫트를 초기 비용 없이 월 구독으로 운영하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "intainer",
    title: "인테이너 구독",
    subtitle:
      "중량물 보관과 운반에 최적화된 인테이너를 구독 방식으로 이용하세요.",
    heroGradient: "from-cyan-950 to-cyan-700",
    features: [
      {
        icon: "🏭",
        title: "산업 특화",
        description:
          "제조, 물류, 유통 현장에 최적화된 인테이너를 제공합니다.",
      },
      {
        icon: "📐",
        title: "맞춤 규격",
        description:
          "적재 물품에 맞는 다양한 사이즈와 적재 방식을 지원합니다.",
      },
      {
        icon: "🔄",
        title: "교체 서비스",
        description:
          "파손 시 즉시 교체하여 현장 운영에 차질이 없도록 합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "사용 환경과 요구사항을 파악합니다",
      },
      {
        step: 2,
        title: "견적",
        description: "최적 구성으로 견적을 제안합니다",
      },
      { step: 3, title: "납품", description: "현장까지 안전하게 배송합니다" },
      {
        step: 4,
        title: "유지보수",
        description: "정기 점검과 교체를 보장합니다",
      },
    ],
    metaDescription:
      "AOVO 인테이너 구독 서비스 - 산업 현장에 맞는 인테이너를 유연하게 운영하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "movingbox",
    title: "이사바구니 구독",
    subtitle:
      "이사 업체와 물류 현장을 위한 이사바구니, 시즌별 수요에 맞춰 유연하게 운영하세요.",
    heroGradient: "from-amber-950 to-amber-700",
    features: [
      {
        icon: "📦",
        title: "시즌 대응",
        description:
          "이사 성수기/비수기에 맞춰 수량을 자유롭게 조절합니다.",
      },
      {
        icon: "🧹",
        title: "세척 관리",
        description:
          "사용 후 전문 세척과 소독으로 위생적인 상태를 유지합니다.",
      },
      {
        icon: "🚛",
        title: "대량 지원",
        description:
          "대규모 이사 프로젝트에도 충분한 재고를 보유하고 있습니다.",
      },
    ],
    process: [
      { step: 1, title: "문의", description: "필요 수량과 기간을 알려주세요" },
      { step: 2, title: "견적", description: "맞춤 가격을 제안합니다" },
      { step: 3, title: "배송", description: "원하는 일자에 배송합니다" },
      { step: 4, title: "회수", description: "사용 후 회수 및 세척합니다" },
    ],
    metaDescription:
      "AOVO 이사바구니 구독 - 이사 업체를 위한 이사바구니를 시즌에 맞춰 유연하게 운영하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "kitchen",
    title: "주방집기 구독",
    subtitle:
      "급식소, 식당, 구내식당에 필요한 주방 장비를 구독으로 운영하세요.",
    heroGradient: "from-orange-950 to-orange-700",
    features: [
      {
        icon: "🍳",
        title: "전문 주방장비",
        description:
          "업소용 냉장고, 식기세척기, 조리대 등 전문 장비를 제공합니다.",
      },
      {
        icon: "✨",
        title: "위생 관리",
        description: "정기 위생 점검과 소독 서비스를 포함합니다.",
      },
      {
        icon: "🔧",
        title: "즉시 수리",
        description:
          "장비 고장 시 당일 수리 또는 대체 장비를 지원합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 방문",
        description: "주방 환경을 직접 확인합니다",
      },
      {
        step: 2,
        title: "맞춤 견적",
        description: "필요 장비 목록과 비용을 산출합니다",
      },
      { step: 3, title: "설치", description: "전문가가 직접 설치합니다" },
      {
        step: 4,
        title: "관리",
        description: "정기 점검과 위생관리를 합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 구독 - 업소용 주방 장비를 초기 비용 없이 구독으로 운영하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "hvac",
    title: "냉난방기 구독",
    subtitle:
      "사무실, 매장, 공장에 필요한 냉난방기를 구매 없이 구독하세요.",
    heroGradient: "from-teal-950 to-teal-600",
    features: [
      {
        icon: "❄️",
        title: "계절별 유연 운영",
        description:
          "여름엔 냉방, 겨울엔 난방. 시즌에 맞춰 장비를 교체합니다.",
      },
      {
        icon: "🔧",
        title: "무상 A/S",
        description: "고장 시 24시간 내 출동하여 무상 수리합니다.",
      },
      {
        icon: "💡",
        title: "에너지 효율",
        description: "최신 인버터 장비로 전기료를 절감합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "공간 크기와 용도를 파악합니다",
      },
      {
        step: 2,
        title: "견적",
        description: "최적 장비와 비용을 제안합니다",
      },
      { step: 3, title: "설치", description: "전문 기사가 설치합니다" },
      {
        step: 4,
        title: "유지보수",
        description: "필터 교체, 정기 점검을 합니다",
      },
    ],
    metaDescription:
      "AOVO 냉난방기 구독 - 에어컨, 히터를 구매 없이 월 구독으로 쾌적한 환경을 유지하세요.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "chair",
    title: "체어 구독",
    subtitle:
      "프리미엄 사무용 의자를 구매 없이 구독하세요. 인원 변동에 따라 수량을 자유롭게 조절할 수 있습니다.",
    heroGradient: "from-primary to-gray-800",
    features: [
      {
        icon: "💺",
        title: "프리미엄 체어",
        description:
          "인체공학 설계의 프리미엄 사무용 의자를 제공합니다.",
      },
      {
        icon: "🔄",
        title: "자유로운 교체",
        description:
          "인원 변동 시 수량 조절, 모델 교체가 자유롭습니다.",
      },
      {
        icon: "🛡️",
        title: "무상 관리",
        description:
          "정기 점검, 부품 교체, 세척을 무상으로 지원합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "필요 수량과 모델을 상담합니다",
      },
      { step: 2, title: "체험", description: "쇼룸에서 직접 체험하세요" },
      {
        step: 3,
        title: "배치",
        description: "원하는 장소로 배송 및 설치합니다",
      },
      {
        step: 4,
        title: "관리",
        description: "3개월마다 전문 관리를 합니다",
      },
    ],
    metaDescription:
      "AOVO 체어 구독 - 프리미엄 사무용 의자를 월 구독료로 운영하세요.",
  },

  // === SHARING (6) ===
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "rolltainer",
    title: "롤테이너 공유",
    subtitle:
      "물류 성수기에만 추가로 필요한 롤테이너, 공유 풀에서 빌려 쓰세요.",
    heroGradient: "from-emerald-950 to-emerald-600",
    features: [
      {
        icon: "🤝",
        title: "공유 경제",
        description:
          "유휴 장비를 공유하여 비용을 절감하고 자원을 효율화합니다.",
      },
      {
        icon: "⚡",
        title: "즉시 이용",
        description:
          "공유 풀에서 필요 즉시 배정받아 사용할 수 있습니다.",
      },
      {
        icon: "📅",
        title: "단기 이용",
        description: "최소 1주일부터 필요한 기간만 이용 가능합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "예약",
        description: "필요 수량과 기간을 예약합니다",
      },
      {
        step: 2,
        title: "배정",
        description: "가장 가까운 공유 거점에서 배정합니다",
      },
      {
        step: 3,
        title: "이용",
        description: "필요한 기간 동안 자유롭게 사용합니다",
      },
      {
        step: 4,
        title: "반납",
        description: "사용 후 지정 거점으로 반납합니다",
      },
    ],
    metaDescription:
      "AOVO 롤테이너 공유 서비스 - 필요한 기간만 롤테이너를 빌려 쓰는 스마트한 물류 솔루션.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "cart",
    title: "카트 공유",
    subtitle:
      "물류 카트를 필요한 기간만 빌려 쓰세요. 공유 풀에서 즉시 배정됩니다.",
    heroGradient: "from-gray-900 to-gray-600",
    features: [
      {
        icon: "🛒",
        title: "다양한 카트",
        description:
          "핸드카트, 플랫폼카트, 접이식 카트 등 용도별 카트를 제공합니다.",
      },
      {
        icon: "📍",
        title: "전국 거점",
        description: "전국 주요 도시에 공유 거점을 운영합니다.",
      },
      {
        icon: "💳",
        title: "합리적 비용",
        description:
          "일 단위 과금으로 필요한 만큼만 비용을 지불합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "예약",
        description: "온라인으로 간편하게 예약합니다",
      },
      { step: 2, title: "수령", description: "가까운 거점에서 수령합니다" },
      { step: 3, title: "이용", description: "원하는 기간만큼 사용합니다" },
      { step: 4, title: "반납", description: "거점으로 반납합니다" },
    ],
    metaDescription:
      "AOVO 카트 공유 서비스 - 물류 카트를 필요한 기간만 합리적으로 이용하세요.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "airport-cart",
    title: "공항카트 공유",
    subtitle:
      "공항 및 대형 시설에 필요한 전용 카트를 공유 서비스로 운영하세요.",
    heroGradient: "from-indigo-950 to-indigo-600",
    features: [
      {
        icon: "✈️",
        title: "공항 전용",
        description:
          "공항 환경에 최적화된 전용 카트를 제공합니다.",
      },
      {
        icon: "🏢",
        title: "대형 시설",
        description:
          "컨벤션센터, 전시장 등 대형 시설에서도 이용 가능합니다.",
      },
      {
        icon: "📊",
        title: "운영 데이터",
        description: "카트 이용 현황과 동선 데이터를 제공합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "협의",
        description: "시설 규모와 필요 수량을 협의합니다",
      },
      {
        step: 2,
        title: "배치",
        description: "시설 내 최적 위치에 배치합니다",
      },
      {
        step: 3,
        title: "운영",
        description: "이용자가 자유롭게 사용합니다",
      },
      {
        step: 4,
        title: "관리",
        description: "정기 수거, 정비, 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 공항카트 공유 서비스 - 공항, 대형시설 전용 카트를 효율적으로 운영하세요.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "stair-cart",
    title: "계단카트 공유",
    subtitle:
      "계단 운반이 필요한 현장을 위한 계단카트 공유 서비스입니다.",
    heroGradient: "from-purple-950 to-purple-600",
    features: [
      {
        icon: "🪜",
        title: "계단 특화",
        description:
          "계단 주행이 가능한 전동/수동 카트를 제공합니다.",
      },
      {
        icon: "💪",
        title: "중량물 운반",
        description:
          "최대 300kg까지 안전하게 계단 운반이 가능합니다.",
      },
      {
        icon: "🔋",
        title: "전동 지원",
        description:
          "전동 계단카트로 작업자의 부담을 크게 줄입니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "문의",
        description: "운반 환경과 중량을 상담합니다",
      },
      { step: 2, title: "배정", description: "적합한 카트를 배정합니다" },
      { step: 3, title: "이용", description: "현장에서 바로 사용합니다" },
      { step: 4, title: "반납", description: "사용 후 회수합니다" },
    ],
    metaDescription:
      "AOVO 계단카트 공유 서비스 - 계단 운반이 필요한 현장을 위한 스마트 솔루션.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "stacker",
    title: "스테커 공유",
    subtitle:
      "창고와 물류센터에 필요한 스테커를 공유 방식으로 효율적으로 운영하세요.",
    heroGradient: "from-orange-900 to-orange-500",
    features: [
      {
        icon: "🏗️",
        title: "고적재 지원",
        description: "최대 5m 높이까지 안전한 적재가 가능합니다.",
      },
      {
        icon: "⚡",
        title: "전동 스테커",
        description: "전동식 스테커로 효율적인 작업이 가능합니다.",
      },
      {
        icon: "🔒",
        title: "안전 인증",
        description: "안전 인증을 받은 장비만 제공합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "적재 높이와 중량을 확인합니다",
      },
      { step: 2, title: "배정", description: "적합한 스테커를 배정합니다" },
      { step: 3, title: "이용", description: "교육 후 안전하게 사용합니다" },
      {
        step: 4,
        title: "반납",
        description: "사용 후 회수 및 정비합니다",
      },
    ],
    metaDescription:
      "AOVO 스테커 공유 서비스 - 창고, 물류센터에 필요한 스테커를 합리적으로 이용하세요.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "event",
    title: "행사장장비 공유",
    subtitle:
      "전시, 박람회, 행사에 필요한 장비를 공유 풀에서 빌려 쓰세요.",
    heroGradient: "from-rose-950 to-rose-600",
    features: [
      {
        icon: "🎪",
        title: "행사 전문",
        description:
          "테이블, 의자, 파티션, 무대장비 등 행사 전문 장비를 보유하고 있습니다.",
      },
      {
        icon: "📦",
        title: "원스톱 서비스",
        description:
          "배송, 설치, 철거까지 원스톱으로 진행합니다.",
      },
      {
        icon: "🕐",
        title: "단기 이용",
        description:
          "1일부터 이용 가능하여 행사 기간에 맞춰 운영합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "행사 규모와 필요 장비를 상담합니다",
      },
      { step: 2, title: "견적", description: "패키지 견적을 제안합니다" },
      {
        step: 3,
        title: "설치",
        description: "행사장에 직접 배송 및 설치합니다",
      },
      {
        step: 4,
        title: "철거",
        description: "행사 종료 후 철거 및 회수합니다",
      },
    ],
    metaDescription:
      "AOVO 행사장장비 공유 - 전시, 박람회, 행사에 필요한 모든 장비를 한번에 해결하세요.",
  },

  // === RENTAL (7) ===
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "furniture",
    title: "사무가구/기기 렌탈",
    subtitle:
      "사무실에 필요한 가구와 기기를 렌탈로 빠르게 구비하세요.",
    heroGradient: "from-violet-950 to-violet-600",
    features: [
      {
        icon: "🪑",
        title: "풀 세트 구성",
        description:
          "책상, 의자, 수납장 등 사무실 전체를 한번에 구성합니다.",
      },
      {
        icon: "🖨️",
        title: "사무기기 포함",
        description:
          "복합기, 프린터, 모니터 등 사무기기도 함께 렌탈합니다.",
      },
      {
        icon: "📐",
        title: "공간 설계",
        description:
          "사무 공간에 맞는 최적 배치를 제안합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 방문",
        description: "사무실 규모와 인원을 확인합니다",
      },
      {
        step: 2,
        title: "견적",
        description: "맞춤 구성과 비용을 제안합니다",
      },
      { step: 3, title: "설치", description: "배송 및 설치를 진행합니다" },
      {
        step: 4,
        title: "관리",
        description: "유지보수와 교체를 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 사무가구/기기 렌탈 - 책상, 의자, 복합기 등 사무실 전체를 렌탈로 구비하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "kitchen",
    title: "주방집기 렌탈",
    subtitle:
      "급식소, 구내식당, 카페에 필요한 주방 장비를 렌탈하세요.",
    heroGradient: "from-amber-900 to-amber-600",
    features: [
      {
        icon: "🍳",
        title: "업소용 장비",
        description:
          "업소용 냉장고, 오븐, 식기세척기 등 전문 장비를 제공합니다.",
      },
      {
        icon: "📋",
        title: "위생 인증",
        description:
          "HACCP 기준에 맞는 위생 관리 장비를 보유하고 있습니다.",
      },
      {
        icon: "⏱️",
        title: "긴급 교체",
        description:
          "장비 고장 시 24시간 내 긴급 교체를 지원합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 조사",
        description: "주방 규모와 메뉴를 파악합니다",
      },
      {
        step: 2,
        title: "장비 선정",
        description: "최적 장비를 선정하고 견적합니다",
      },
      {
        step: 3,
        title: "설치",
        description: "전문가가 설치 및 사용법을 교육합니다",
      },
      {
        step: 4,
        title: "유지보수",
        description: "정기 점검과 위생관리를 합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 렌탈 - 업소용 주방 장비를 렌탈로 초기 비용 없이 운영하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "event",
    title: "행사집기 렌탈",
    subtitle:
      "선거, 전시, 박람회, 임시 행사에 필요한 집기를 렌탈하세요.",
    heroGradient: "from-red-950 to-red-700",
    features: [
      {
        icon: "🗳️",
        title: "선거용 집기",
        description:
          "선거사무실 세팅에 필요한 모든 집기를 한번에 제공합니다.",
      },
      {
        icon: "🎪",
        title: "행사/전시",
        description:
          "전시부스, 행사장 테이블, 의자, 파티션 등을 렌탈합니다.",
      },
      {
        icon: "🚚",
        title: "당일 배송",
        description: "긴급한 행사에도 당일 배송이 가능합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "문의",
        description: "행사 유형과 규모를 알려주세요",
      },
      { step: 2, title: "견적", description: "패키지 견적을 제안합니다" },
      {
        step: 3,
        title: "배송/설치",
        description: "행사장에 배송 및 설치합니다",
      },
      {
        step: 4,
        title: "철거/회수",
        description: "행사 종료 후 철거합니다",
      },
    ],
    metaDescription:
      "AOVO 행사집기 렌탈 - 선거, 전시, 박람회 등 행사에 필요한 집기를 빠르게 렌탈하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "it",
    title: "IT기기/로봇 렌탈",
    subtitle:
      "노트북, 태블릿, 서빙로봇, 키오스크 등 IT 장비를 렌탈하세요.",
    heroGradient: "from-blue-950 to-indigo-600",
    features: [
      {
        icon: "💻",
        title: "최신 IT기기",
        description:
          "노트북, 태블릿, 모니터, 키오스크 등 최신 기기를 제공합니다.",
      },
      {
        icon: "🤖",
        title: "서빙로봇",
        description:
          "식당, 카페에서 사용하는 자율주행 서빙로봇을 렌탈합니다.",
      },
      {
        icon: "🔐",
        title: "데이터 보안",
        description: "반납 시 데이터 완전 삭제를 보장합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "필요 기기와 스펙을 상담합니다",
      },
      {
        step: 2,
        title: "세팅",
        description: "소프트웨어 설치 및 세팅을 합니다",
      },
      { step: 3, title: "배송", description: "안전 포장하여 배송합니다" },
      { step: 4, title: "회수", description: "데이터 삭제 후 회수합니다" },
    ],
    metaDescription:
      "AOVO IT기기/로봇 렌탈 - 노트북, 태블릿, 서빙로봇 등 IT 장비를 렌탈하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "medical",
    title: "의료장비 렌탈",
    subtitle:
      "병원, 요양원, 의료현장에 필요한 장비를 렌탈하세요.",
    heroGradient: "from-green-950 to-green-600",
    features: [
      {
        icon: "🏥",
        title: "의료 전문",
        description:
          "병원 침대, 휠체어, 재활장비 등 의료 전문 장비를 제공합니다.",
      },
      {
        icon: "✅",
        title: "인증 장비",
        description:
          "의료기기 인증을 받은 안전한 장비만 취급합니다.",
      },
      {
        icon: "🧼",
        title: "멸균 관리",
        description: "전문 멸균 소독 후 납품합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "필요 장비를 전문 상담합니다",
      },
      {
        step: 2,
        title: "견적",
        description: "장비 구성과 비용을 제안합니다",
      },
      {
        step: 3,
        title: "납품",
        description: "멸균 소독 후 안전 배송합니다",
      },
      {
        step: 4,
        title: "유지보수",
        description: "정기 점검과 멸균을 합니다",
      },
    ],
    metaDescription:
      "AOVO 의료장비 렌탈 - 병원, 요양원에 필요한 의료장비를 안전하게 렌탈하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "aircon",
    title: "이동식에어컨 렌탈",
    subtitle:
      "공사현장, 행사장, 임시시설에 이동식 에어컨을 렌탈하세요.",
    heroGradient: "from-sky-950 to-sky-600",
    features: [
      {
        icon: "❄️",
        title: "강력 냉방",
        description:
          "산업용 이동식 에어컨으로 넓은 공간도 시원하게 냉방합니다.",
      },
      {
        icon: "🔌",
        title: "간편 설치",
        description:
          "별도 배관 공사 없이 전원만 연결하면 바로 사용합니다.",
      },
      {
        icon: "📅",
        title: "단기 렌탈",
        description:
          "1일부터 렌탈 가능하여 행사나 공사 기간에 맞춰 운영합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "공간 크기와 용도를 파악합니다",
      },
      { step: 2, title: "배송", description: "현장으로 직접 배송합니다" },
      {
        step: 3,
        title: "설치",
        description: "전문가가 설치하고 테스트합니다",
      },
      { step: 4, title: "회수", description: "사용 종료 후 회수합니다" },
    ],
    metaDescription:
      "AOVO 이동식에어컨 렌탈 - 공사현장, 행사장에 이동식 에어컨을 빠르게 렌탈하세요.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "dehumidifier",
    title: "산업용제습기 렌탈",
    subtitle:
      "공장, 창고, 건설현장의 습도 관리를 위한 산업용 제습기를 렌탈하세요.",
    heroGradient: "from-blue-900 to-cyan-600",
    features: [
      {
        icon: "💧",
        title: "강력 제습",
        description:
          "하루 최대 150L까지 제습 가능한 산업용 제습기를 제공합니다.",
      },
      {
        icon: "🏭",
        title: "산업 현장 특화",
        description:
          "공장, 창고, 건설현장 환경에 맞는 내구성 높은 장비입니다.",
      },
      {
        icon: "📊",
        title: "습도 모니터링",
        description:
          "실시간 습도 모니터링으로 최적 환경을 유지합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 확인",
        description: "공간과 습도 환경을 확인합니다",
      },
      {
        step: 2,
        title: "장비 선정",
        description: "최적 용량의 제습기를 선정합니다",
      },
      { step: 3, title: "설치", description: "현장에 배송 및 설치합니다" },
      {
        step: 4,
        title: "관리",
        description: "정기 점검과 필터 교체를 합니다",
      },
    ],
    metaDescription:
      "AOVO 산업용제습기 렌탈 - 공장, 창고의 습도 관리를 위한 제습기를 렌탈하세요.",
  },

  // === RECYCLE (8) ===
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "logistics",
    title: "물류장비 순환",
    subtitle:
      "사용 완료된 물류장비를 수거, 정비하여 재사용합니다. 지속 가능한 자원 순환 서비스입니다.",
    heroGradient: "from-lime-950 to-lime-600",
    features: [
      {
        icon: "♻️",
        title: "자원 순환",
        description:
          "폐기 대신 수거, 정비, 재사용으로 자원을 순환합니다.",
      },
      {
        icon: "🔍",
        title: "품질 검수",
        description:
          "엄격한 품질 검수를 거쳐 기준 충족 장비만 재사용합니다.",
      },
      {
        icon: "🌱",
        title: "ESG 기여",
        description:
          "탄소 배출 절감과 폐기물 감소로 ESG 경영에 기여합니다.",
      },
    ],
    process: [
      { step: 1, title: "수거", description: "사용 완료 장비를 수거합니다" },
      {
        step: 2,
        title: "검수",
        description: "상태를 검수하고 등급을 매깁니다",
      },
      {
        step: 3,
        title: "정비",
        description: "세척, 수리, 부품 교체를 합니다",
      },
      {
        step: 4,
        title: "재배치",
        description: "필요한 곳에 다시 배치합니다",
      },
    ],
    metaDescription:
      "AOVO 물류장비 순환 서비스 - 사용 완료 물류장비의 수거, 정비, 재사용 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "chair",
    title: "체어 순환 (세르타)",
    subtitle:
      "프리미엄 의자의 수거, 정밀 검수, 복원을 통한 순환 프로그램입니다.",
    heroGradient: "from-primary to-gray-700",
    features: [
      {
        icon: "🏆",
        title: "세르타 인증",
        description:
          "세르타 인증 기준에 따라 검수된 프리미엄 리퍼비시 체어입니다.",
      },
      {
        icon: "🔧",
        title: "정밀 복원",
        description:
          "전문가가 분해, 세척, 부품 교체, 재조립하여 새 것처럼 복원합니다.",
      },
      {
        icon: "💰",
        title: "합리적 가격",
        description:
          "새 제품 대비 40-60% 저렴한 가격으로 이용 가능합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거",
        description: "기존 의자를 전국에서 수거합니다",
      },
      {
        step: 2,
        title: "검수",
        description: "프레임, 시트, 메커니즘을 정밀 검수합니다",
      },
      {
        step: 3,
        title: "복원",
        description: "세척, 부품교체, 재조립합니다",
      },
      {
        step: 4,
        title: "재배치",
        description: "품질 보증과 함께 납품합니다",
      },
    ],
    metaDescription:
      "AOVO 체어 순환 (세르타) - 프리미엄 의자를 정밀 복원하여 합리적 가격으로 제공합니다.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "furniture",
    title: "사무가구/기기 순환",
    subtitle:
      "중고 사무가구와 기기를 수거, 정비하여 다시 사용합니다.",
    heroGradient: "from-stone-900 to-stone-600",
    features: [
      {
        icon: "🪑",
        title: "가구 복원",
        description:
          "책상, 캐비닛, 파티션 등을 복원하여 재사용합니다.",
      },
      {
        icon: "🖥️",
        title: "기기 리퍼",
        description:
          "사무기기를 리퍼비시하여 합리적 가격에 제공합니다.",
      },
      {
        icon: "📦",
        title: "일괄 처리",
        description:
          "사무실 이전 시 가구/기기를 일괄 수거하여 처리합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거 신청",
        description: "수거할 가구/기기 목록을 알려주세요",
      },
      {
        step: 2,
        title: "수거",
        description: "전문 팀이 방문하여 수거합니다",
      },
      {
        step: 3,
        title: "정비",
        description: "세척, 수리, 부품교체를 합니다",
      },
      {
        step: 4,
        title: "재유통",
        description: "필요한 곳에 합리적 가격으로 제공합니다",
      },
    ],
    metaDescription:
      "AOVO 사무가구/기기 순환 - 중고 사무가구와 기기를 수거, 정비, 재사용하는 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "kitchen",
    title: "주방집기 순환",
    subtitle:
      "사용 완료된 주방 장비를 수거, 정비하여 재사용합니다.",
    heroGradient: "from-yellow-900 to-yellow-600",
    features: [
      {
        icon: "🍳",
        title: "장비 복원",
        description:
          "업소용 주방장비를 전문 정비하여 재사용합니다.",
      },
      {
        icon: "🧼",
        title: "전문 세척",
        description:
          "고온 고압 세척과 살균 소독을 진행합니다.",
      },
      {
        icon: "✅",
        title: "품질 보증",
        description:
          "정비 후 품질 테스트를 통과한 장비만 재유통합니다.",
      },
    ],
    process: [
      { step: 1, title: "수거", description: "기존 주방장비를 수거합니다" },
      {
        step: 2,
        title: "세척/소독",
        description: "전문 세척과 살균을 합니다",
      },
      {
        step: 3,
        title: "정비",
        description: "부품 교체와 성능 테스트를 합니다",
      },
      {
        step: 4,
        title: "재유통",
        description: "보증과 함께 재유통합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 순환 - 업소용 주방장비를 수거, 정비, 재사용하는 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "aircon",
    title: "이동식에어컨 순환",
    subtitle:
      "시즌 종료 에어컨을 수거, 정비하여 다음 시즌에 재사용합니다.",
    heroGradient: "from-teal-900 to-teal-500",
    features: [
      {
        icon: "❄️",
        title: "시즌 순환",
        description:
          "여름 시즌 종료 후 수거, 겨울에 정비, 다음 여름에 재배치합니다.",
      },
      {
        icon: "🔧",
        title: "전문 정비",
        description:
          "냉매 충전, 필터 교체, 성능 테스트를 진행합니다.",
      },
      {
        icon: "💰",
        title: "비용 절감",
        description:
          "새 장비 구매 대비 큰 폭의 비용을 절감합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거",
        description: "시즌 종료 후 에어컨을 수거합니다",
      },
      { step: 2, title: "검수", description: "성능과 상태를 검수합니다" },
      {
        step: 3,
        title: "정비",
        description: "냉매 충전, 세척, 부품교체를 합니다",
      },
      {
        step: 4,
        title: "재배치",
        description: "다음 시즌에 필요한 곳에 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 이동식에어컨 순환 - 시즌별 에어컨 수거, 정비, 재사용 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "seasonal",
    title: "계절상품 순환",
    subtitle:
      "계절별 필요한 상품을 순환 시스템으로 효율적으로 운영합니다.",
    heroGradient: "from-orange-900 to-red-500",
    features: [
      {
        icon: "🌸",
        title: "시즌 대응",
        description:
          "봄/여름/가을/겨울 시즌별 상품을 순환 관리합니다.",
      },
      {
        icon: "📦",
        title: "보관 서비스",
        description: "비수기 장비를 안전하게 보관합니다.",
      },
      {
        icon: "🔄",
        title: "자동 순환",
        description:
          "시즌이 되면 자동으로 배치하고, 종료되면 회수합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "등록",
        description: "순환 대상 상품을 등록합니다",
      },
      { step: 2, title: "보관", description: "비수기에 안전하게 보관합니다" },
      {
        step: 3,
        title: "정비",
        description: "시즌 전 점검과 정비를 합니다",
      },
      {
        step: 4,
        title: "재배치",
        description: "시즌에 맞춰 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 계절상품 순환 - 계절별 상품을 보관, 정비, 재사용하는 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "dehumidifier",
    title: "산업용제습기 순환",
    subtitle:
      "장마철 사용 후 제습기를 수거, 정비하여 다음 시즌에 재사용합니다.",
    heroGradient: "from-blue-900 to-blue-500",
    features: [
      {
        icon: "💧",
        title: "시즌 순환",
        description:
          "장마철 종료 후 수거, 건기에 정비, 다음 시즌 재배치합니다.",
      },
      {
        icon: "🔧",
        title: "성능 복원",
        description:
          "필터 교체, 압축기 점검으로 원래 성능을 복원합니다.",
      },
      {
        icon: "🌱",
        title: "친환경",
        description:
          "장비 재사용으로 폐기물을 줄이고 환경에 기여합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거",
        description: "시즌 종료 후 제습기를 수거합니다",
      },
      { step: 2, title: "검수", description: "성능과 상태를 검수합니다" },
      {
        step: 3,
        title: "정비",
        description: "필터, 압축기 등을 점검 정비합니다",
      },
      { step: 4, title: "재배치", description: "다음 시즌에 재배치합니다" },
    ],
    metaDescription:
      "AOVO 산업용제습기 순환 - 제습기 수거, 정비, 재사용 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "special",
    title: "특수집기 순환",
    subtitle:
      "특수 용도의 집기를 수거, 정비하여 재사용하는 전문 순환 서비스입니다.",
    heroGradient: "from-gray-900 to-gray-500",
    features: [
      {
        icon: "🔬",
        title: "특수 장비",
        description:
          "실험실, 연구소, 특수 현장의 전문 집기를 취급합니다.",
      },
      {
        icon: "🛡️",
        title: "안전 관리",
        description:
          "특수 장비에 맞는 안전 기준을 준수하여 정비합니다.",
      },
      {
        icon: "📜",
        title: "이력 관리",
        description:
          "장비별 사용 이력과 정비 이력을 체계적으로 관리합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "사전 조사",
        description: "특수 장비의 종류와 상태를 조사합니다",
      },
      { step: 2, title: "수거", description: "안전하게 수거하여 이송합니다" },
      {
        step: 3,
        title: "전문 정비",
        description: "장비별 전문 정비를 진행합니다",
      },
      {
        step: 4,
        title: "재유통",
        description: "품질 보증과 함께 재유통합니다",
      },
    ],
    metaDescription:
      "AOVO 특수집기 순환 - 특수 용도 집기의 전문 수거, 정비, 재사용 서비스.",
  },

  // === WHOLESALE (5) ===
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "logistics",
    title: "물류장비 도소매",
    subtitle:
      "롤테이너, 파랫트, 인테이너 등 물류장비를 도매가에 직접 구매하세요.",
    heroGradient: "from-slate-950 to-slate-600",
    features: [
      {
        icon: "🏭",
        title: "공장 직거래",
        description:
          "제조사 직거래로 중간 마진을 없앤 합리적 가격을 제공합니다.",
      },
      {
        icon: "📦",
        title: "대량 할인",
        description: "수량이 많을수록 더 큰 할인을 제공합니다.",
      },
      {
        icon: "🚛",
        title: "전국 배송",
        description: "대량 주문도 전국 어디든 배송합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "문의",
        description: "필요 품목과 수량을 알려주세요",
      },
      { step: 2, title: "견적", description: "도매가 견적을 제공합니다" },
      { step: 3, title: "주문", description: "확인 후 주문을 확정합니다" },
      { step: 4, title: "배송", description: "전국 어디든 배송합니다" },
    ],
    metaDescription:
      "AOVO 물류장비 도소매 - 롤테이너, 파랫트 등을 공장 직거래 도매가로 구매하세요.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "kitchen",
    title: "주방집기 도소매",
    subtitle:
      "업소용 주방장비와 집기를 도매가에 직접 구매하세요.",
    heroGradient: "from-amber-950 to-amber-600",
    features: [
      {
        icon: "🍳",
        title: "업소용 전문",
        description:
          "냉장고, 조리대, 식기류 등 업소용 전 품목을 취급합니다.",
      },
      {
        icon: "💰",
        title: "도매 가격",
        description:
          "소매가 대비 최대 40% 저렴한 도매가를 제공합니다.",
      },
      {
        icon: "🔧",
        title: "설치 지원",
        description: "대형 장비는 설치까지 지원합니다.",
      },
    ],
    process: [
      { step: 1, title: "상담", description: "필요 품목을 상담합니다" },
      { step: 2, title: "견적", description: "도매가 견적을 제공합니다" },
      { step: 3, title: "결제/주문", description: "주문을 확정합니다" },
      {
        step: 4,
        title: "배송/설치",
        description: "배송 및 설치를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 도소매 - 업소용 주방장비를 도매가에 직접 구매하세요.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "event",
    title: "행사집기 도소매",
    subtitle:
      "행사, 전시, 파티에 필요한 집기를 도매가에 구매하세요.",
    heroGradient: "from-fuchsia-950 to-fuchsia-600",
    features: [
      {
        icon: "🎪",
        title: "행사 전문",
        description:
          "테이블, 의자, 무대장비, 조명 등 행사 전 품목을 취급합니다.",
      },
      {
        icon: "📦",
        title: "대량 재고",
        description:
          "즉시 출고 가능한 대량 재고를 보유하고 있습니다.",
      },
      {
        icon: "🎨",
        title: "다양한 디자인",
        description:
          "행사 컨셉에 맞는 다양한 디자인의 집기를 보유합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "카탈로그",
        description: "온라인 카탈로그에서 제품을 확인하세요",
      },
      {
        step: 2,
        title: "견적",
        description: "수량별 도매가를 확인합니다",
      },
      {
        step: 3,
        title: "주문",
        description: "온라인 또는 전화로 주문합니다",
      },
      {
        step: 4,
        title: "배송",
        description: "행사장으로 직접 배송합니다",
      },
    ],
    metaDescription:
      "AOVO 행사집기 도소매 - 행사, 전시 집기를 도매가에 구매하세요.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "seasonal",
    title: "계절집기 도소매",
    subtitle:
      "계절별 필요한 장비와 집기를 도매가에 구매하세요.",
    heroGradient: "from-red-900 to-orange-500",
    features: [
      {
        icon: "☀️",
        title: "여름 장비",
        description:
          "에어컨, 선풍기, 냉풍기 등 여름 장비를 도매합니다.",
      },
      {
        icon: "❄️",
        title: "겨울 장비",
        description:
          "히터, 온풍기, 전기장판 등 겨울 장비를 도매합니다.",
      },
      {
        icon: "📅",
        title: "시즌 특가",
        description:
          "비수기 사전 주문 시 추가 할인을 제공합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "문의",
        description: "시즌 필요 품목을 상담합니다",
      },
      {
        step: 2,
        title: "견적",
        description: "시즌 특가 견적을 제공합니다",
      },
      {
        step: 3,
        title: "주문",
        description: "사전 주문으로 할인받으세요",
      },
      { step: 4, title: "배송", description: "시즌 시작 전 배송합니다" },
    ],
    metaDescription:
      "AOVO 계절집기 도소매 - 에어컨, 히터 등 계절 장비를 도매가에 구매하세요.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "medical",
    title: "의료집기 도소매",
    subtitle:
      "병원, 요양원, 의료시설에 필요한 집기를 도매가에 구매하세요.",
    heroGradient: "from-emerald-950 to-emerald-600",
    features: [
      {
        icon: "🏥",
        title: "의료 전문",
        description:
          "병원 침대, 사이드테이블, 수납장 등 의료 집기를 전문 취급합니다.",
      },
      {
        icon: "✅",
        title: "인증 제품",
        description:
          "의료시설 기준에 맞는 인증 제품만 취급합니다.",
      },
      {
        icon: "🤝",
        title: "장기 거래",
        description:
          "장기 거래 시 추가 할인과 우선 납품을 보장합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "상담",
        description: "필요 품목과 규격을 상담합니다",
      },
      { step: 2, title: "견적", description: "도매가 견적을 제공합니다" },
      { step: 3, title: "주문", description: "주문을 확정합니다" },
      { step: 4, title: "납품", description: "안전 포장하여 납품합니다" },
    ],
    metaDescription:
      "AOVO 의료집기 도소매 - 병원, 요양원에 필요한 의료집기를 도매가에 구매하세요.",
  },
];

export function getServiceData(
  category: string,
  slug: string
): ServiceData | undefined {
  return services.find((s) => s.category === category && s.slug === slug);
}

export function getServicesByCategory(category: string): ServiceData[] {
  return services.filter((s) => s.category === category);
}
