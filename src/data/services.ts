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

// ALL 33 services defined here
export const services: ServiceData[] = [
  // === SUBSCRIBE (7) ===
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "rolltainer",
    title: "롤테이너 구독",
    subtitle:
      "물류 현장의 핵심 운반·보관 장비인 롤테이너를 월 구독료만으로 운영하세요. 택배 물류센터, 유통 창고, 제조 공장 등에서 시즌별 물동량 변동에 따라 수량을 자유롭게 조절할 수 있습니다. 초기 구매 비용 부담 없이 바로 현장에 투입 가능합니다.",
    heroGradient: "from-blue-950 to-blue-700",
    features: [
      {
        icon: "📦",
        title: "시즌별 탄력 운영",
        description:
          "택배 성수기·비수기에 맞춰 롤테이너 수량을 월 단위로 증감할 수 있어 유휴 장비 없이 효율적으로 운영합니다.",
      },
      {
        icon: "🔧",
        title: "3개월 주기 정기 점검",
        description:
          "전문 코디네이터가 3개월마다 현장을 방문하여 바퀴 마모, 프레임 변형, 잠금장치 등을 점검하고 즉시 무상 수리합니다.",
      },
      {
        icon: "💰",
        title: "구매 대비 70% 비용 절감",
        description:
          "롤테이너 1대당 수십만 원의 구매 비용 대신 월 구독료로 운영하여 초기 투자금을 대폭 절감하고 현금 흐름을 개선합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수요 파악",
        description: "현장 물동량과 필요 수량, 규격(L형/대형/접이식)을 상담합니다",
      },
      {
        step: 2,
        title: "맞춤 견적",
        description: "사용 기간과 수량에 따른 월 구독료 견적을 24시간 내 제공합니다",
      },
      {
        step: 3,
        title: "현장 배치",
        description: "전국 물류 거점에서 세척·점검 완료된 롤테이너를 신속 배송합니다",
      },
      {
        step: 4,
        title: "정기 관리",
        description: "3개월 주기 정기 점검, 파손 시 즉시 교체로 현장 운영을 보장합니다",
      },
    ],
    metaDescription:
      "AOVO 롤테이너 구독 서비스 - 물류센터, 유통 창고에 필요한 롤테이너를 월 구독료로 유연하게 운영하세요. 시즌별 수량 조절, 정기 점검 포함.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "pallet",
    title: "파랫트 구독",
    subtitle:
      "물류 보관과 운반의 기본 단위인 파랫트를 구독 방식으로 운영하세요. 목재·플라스틱·철제 등 다양한 소재와 T11, T12 등 표준 규격을 보유하고 있습니다. 바코드 기반 자산 추적 시스템으로 파랫트 분실을 최소화합니다.",
    heroGradient: "from-slate-900 to-slate-600",
    features: [
      {
        icon: "🏗️",
        title: "소재·규격별 풀라인업",
        description:
          "목재 파랫트(T11/T12), 플라스틱 파랫트, 철제 파랫트 등 적재 화물에 맞는 최적 규격을 선택할 수 있습니다.",
      },
      {
        icon: "♻️",
        title: "회수·세척·보수 순환 시스템",
        description:
          "사용 후 파랫트를 회수하여 고압 세척, 못 박힘 수리, 판재 교체 등 전문 보수를 거쳐 재투입하는 순환 체계를 운영합니다.",
      },
      {
        icon: "📊",
        title: "바코드 기반 실시간 추적",
        description:
          "개별 파랫트에 바코드를 부착하여 위치, 사용 이력, 상태를 실시간 추적하고 분실률을 최소화합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "규격 상담",
        description: "적재 화물의 종류, 중량, 규격에 맞는 파랫트를 추천합니다",
      },
      {
        step: 2,
        title: "견적 산출",
        description: "소재별·수량별 월 구독료를 산출하여 제안합니다",
      },
      {
        step: 3,
        title: "전국 배송",
        description: "수도권 당일, 지방 익일 배송으로 전국 어디든 신속 납품합니다",
      },
      {
        step: 4,
        title: "순환 관리",
        description: "정기 회수, 세척, 보수 후 재투입하는 순환 시스템을 운영합니다",
      },
    ],
    metaDescription:
      "AOVO 파랫트 구독 서비스 - 목재·플라스틱·철제 파랫트를 초기 비용 없이 월 구독으로 운영하세요. 바코드 추적, 순환 관리 포함.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "intainer",
    title: "인테이너 구독",
    subtitle:
      "중량물 보관과 운반에 최적화된 산업용 인테이너를 구독 방식으로 이용하세요. 제조 공장의 부품 보관, 물류센터의 중량 화물 적재, 유통 현장의 대량 운반에 적합합니다. 파손 시 즉시 교체하여 생산 라인 중단을 방지합니다.",
    heroGradient: "from-cyan-950 to-cyan-700",
    features: [
      {
        icon: "🏭",
        title: "제조·물류 현장 특화",
        description:
          "자동차 부품, 전자 부품, 식품 원료 등 업종별 적재물에 맞는 메쉬형·밀폐형·접이식 인테이너를 제공합니다.",
      },
      {
        icon: "📐",
        title: "맞춤 규격 대응",
        description:
          "표준 규격(800x600, 1200x1000) 외에도 특수 적재물에 맞는 칸막이, 내부 트레이 등 맞춤 옵션을 지원합니다.",
      },
      {
        icon: "🔄",
        title: "파손 시 당일 교체",
        description:
          "프레임 변형, 바퀴 파손 등 발생 시 당일 내 대체 인테이너를 투입하여 현장 운영에 차질이 없도록 합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 진단",
        description: "적재물 종류, 중량, 작업 동선을 파악하여 최적 인테이너를 추천합니다",
      },
      {
        step: 2,
        title: "구성 제안",
        description: "규격, 소재, 옵션(칸막이/라벨홀더 등)을 포함한 맞춤 견적을 제안합니다",
      },
      {
        step: 3,
        title: "납품 설치",
        description: "현장까지 안전하게 배송하고 작업 동선에 맞춰 배치합니다",
      },
      {
        step: 4,
        title: "유지보수",
        description: "분기별 정기 점검과 파손 시 즉시 교체를 보장합니다",
      },
    ],
    metaDescription:
      "AOVO 인테이너 구독 서비스 - 제조·물류 현장에 맞는 산업용 인테이너를 월 구독으로 유연하게 운영하세요. 맞춤 규격, 즉시 교체 지원.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "movingbox",
    title: "이사바구니 구독",
    subtitle:
      "이사 전문 업체와 포장이사 현장을 위한 이사바구니를 월 구독으로 운영하세요. 봄·가을 이사 성수기에는 수량을 늘리고 비수기에는 줄여 재고 부담을 없앨 수 있습니다. 사용 후 전문 세척·소독으로 항상 깨끗한 상태를 유지합니다.",
    heroGradient: "from-amber-950 to-amber-700",
    features: [
      {
        icon: "📦",
        title: "성수기·비수기 탄력 운영",
        description:
          "3·4월, 9·10월 이사 성수기에 수량을 최대 200%까지 증량하고, 비수기에는 감량하여 창고 보관 비용을 절감합니다.",
      },
      {
        icon: "🧹",
        title: "전문 세척·소독 서비스",
        description:
          "매 회수 후 고압 세척과 UV 소독을 진행하여 위생적인 상태로 재투입합니다. 냄새·얼룩 없는 깨끗한 바구니를 보장합니다.",
      },
      {
        icon: "🚛",
        title: "대규모 물량 즉시 공급",
        description:
          "법인 이사, 관공서 이전 등 대규모 프로젝트에도 500개 이상 즉시 공급 가능한 재고를 상시 보유합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수량 상담",
        description: "월평균 이사 건수와 성수기 피크 물량을 기준으로 상담합니다",
      },
      {
        step: 2,
        title: "구독 견적",
        description: "기본 수량과 증감 범위를 포함한 월 구독료를 제안합니다",
      },
      {
        step: 3,
        title: "현장 배송",
        description: "이사 일정에 맞춰 원하는 장소로 배송합니다",
      },
      {
        step: 4,
        title: "회수·세척",
        description: "이사 완료 후 회수하여 전문 세척·소독 후 재투입합니다",
      },
    ],
    metaDescription:
      "AOVO 이사바구니 구독 - 이사 업체를 위한 이사바구니를 성수기·비수기 물량에 맞춰 유연하게 운영하세요. 세척·소독 포함.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "kitchen",
    title: "주방집기 구독",
    subtitle:
      "급식소, 구내식당, 프랜차이즈 매장에 필요한 업소용 주방 장비를 구독으로 운영하세요. 업소용 냉장·냉동고, 식기세척기, 가스레인지, 조리대, 배식대 등 전 품목을 한번에 구성할 수 있습니다. 장비 고장 시 당일 수리 또는 대체 장비 투입을 보장합니다.",
    heroGradient: "from-orange-950 to-orange-700",
    features: [
      {
        icon: "🍳",
        title: "업소용 전 품목 구성",
        description:
          "업소용 냉장고, 식기세척기, 가스레인지, 튀김기, 배식대, 스팀테이블 등 주방에 필요한 모든 장비를 한번에 구성합니다.",
      },
      {
        icon: "✨",
        title: "HACCP 위생 관리",
        description:
          "HACCP 기준에 따른 정기 위생 점검과 소독 서비스를 포함합니다. 위생 관리 기록부를 제공하여 감사 대비를 지원합니다.",
      },
      {
        icon: "🔧",
        title: "고장 시 당일 대응",
        description:
          "냉장고 고장 등 긴급 상황 시 4시간 내 출동하여 수리하거나 동급 대체 장비를 즉시 투입합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 실측",
        description: "주방 면적, 가스·전기 용량, 배수 환경을 직접 확인합니다",
      },
      {
        step: 2,
        title: "장비 구성 제안",
        description: "메뉴와 식수 인원에 맞는 최적 장비 목록과 배치도를 제안합니다",
      },
      {
        step: 3,
        title: "설치·교육",
        description: "전문 기사가 설치하고 조리 담당자에게 사용법을 교육합니다",
      },
      {
        step: 4,
        title: "위생·유지관리",
        description: "월 1회 위생 점검과 장비 상태 확인, 소모품 교체를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 구독 - 급식소, 구내식당에 필요한 업소용 주방 장비를 초기 비용 없이 구독으로 운영하세요. HACCP 위생 관리 포함.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "hvac",
    title: "냉난방기 구독",
    subtitle:
      "사무실, 매장, 공장, 창고에 필요한 냉난방기를 구매 없이 월 구독으로 운영하세요. 여름에는 냉방, 겨울에는 난방 장비로 시즌별 교체가 가능하며, 최신 인버터 기술로 전기료를 절감합니다. 필터 교체, 냉매 충전 등 유지보수가 모두 포함됩니다.",
    heroGradient: "from-teal-950 to-teal-600",
    features: [
      {
        icon: "❄️",
        title: "시즌별 장비 교체",
        description:
          "여름에는 스탠드형·천장형 에어컨, 겨울에는 온풍기·히트펌프로 교체하여 연중 쾌적한 환경을 유지합니다.",
      },
      {
        icon: "🔧",
        title: "무상 A/S 및 정기 관리",
        description:
          "고장 시 24시간 내 출동 무상 수리, 시즌 전후 필터 교체·냉매 충전·배수구 세척 등 정기 관리를 포함합니다.",
      },
      {
        icon: "💡",
        title: "최신 인버터로 전기료 절감",
        description:
          "1등급 에너지 효율의 최신 인버터 장비를 제공하여 기존 장비 대비 전기료를 최대 30% 절감합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "공간 진단",
        description: "공간 면적, 층고, 단열 상태, 재실 인원을 파악합니다",
      },
      {
        step: 2,
        title: "장비 선정·견적",
        description: "냉난방 부하를 계산하여 최적 용량의 장비와 월 구독료를 제안합니다",
      },
      {
        step: 3,
        title: "전문 설치",
        description: "인증 기사가 배관, 배수, 전기 연결까지 완벽하게 설치합니다",
      },
      {
        step: 4,
        title: "시즌 관리",
        description: "시즌 전 사전 점검, 필터 교체, 시즌 후 장비 교체를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 냉난방기 구독 - 에어컨, 히터를 구매 없이 월 구독으로 운영하세요. 시즌별 교체, 무상 A/S, 에너지 효율 최적화 포함.",
  },
  {
    category: "subscribe",
    categoryLabel: "구독서비스",
    slug: "chair",
    title: "체어 구독",
    subtitle:
      "인체공학 설계의 프리미엄 사무용 의자를 구매 없이 월 구독으로 이용하세요. 직원 수 변동에 따라 의자 수량을 자유롭게 조절할 수 있고, 3개월마다 전문 세척과 부품 교체를 포함합니다. 쇼룸 방문 체험 후 모델을 선택할 수 있습니다.",
    heroGradient: "from-primary to-gray-800",
    features: [
      {
        icon: "💺",
        title: "인체공학 프리미엄 체어",
        description:
          "요추 지지대, 4D 팔걸이, 틸팅 메커니즘 등 인체공학 설계의 프리미엄 사무용 의자를 제공합니다.",
      },
      {
        icon: "🔄",
        title: "인원 변동 시 즉시 대응",
        description:
          "신규 채용, 퇴사, 부서 이동 시 의자 수량 증감과 모델 교체를 자유롭게 요청할 수 있습니다.",
      },
      {
        icon: "🛡️",
        title: "3개월 주기 전문 관리",
        description:
          "전문 코디네이터가 3개월마다 방문하여 시트 세척, 가스실린더 점검, 캐스터 교체 등을 무상으로 진행합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "모델 상담",
        description: "업무 환경과 선호도에 맞는 체어 모델과 수량을 상담합니다",
      },
      {
        step: 2,
        title: "쇼룸 체험",
        description: "쇼룸에서 다양한 모델을 직접 앉아보고 선택할 수 있습니다",
      },
      {
        step: 3,
        title: "배송·설치",
        description: "사무실까지 배송 후 높낮이·팔걸이 등 개인별 세팅을 진행합니다",
      },
      {
        step: 4,
        title: "정기 관리",
        description: "3개월마다 전문 세척, 부품 점검, 필요 시 교체를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 체어 구독 - 인체공학 프리미엄 사무용 의자를 월 구독료로 운영하세요. 수량 자유 조절, 3개월 주기 전문 관리 포함.",
  },

  // === SHARING (6) ===
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "rolltainer",
    title: "롤테이너 공유",
    subtitle:
      "택배 물류 성수기, 임시 프로젝트 등 단기간 추가 롤테이너가 필요할 때 공유 풀에서 빌려 쓰세요. 최소 1주일부터 이용 가능하며, 전국 물류 거점에서 가장 가까운 곳의 재고를 즉시 배정받을 수 있습니다. 장비 구매나 장기 계약 없이 필요한 기간만 합리적으로 이용합니다.",
    heroGradient: "from-emerald-950 to-emerald-600",
    features: [
      {
        icon: "🤝",
        title: "유휴 장비 공유로 비용 절감",
        description:
          "다른 기업의 비수기 유휴 롤테이너를 공유 풀에서 배정받아 구매 비용의 1/10 수준으로 이용합니다.",
      },
      {
        icon: "⚡",
        title: "전국 거점 즉시 배정",
        description:
          "전국 주요 물류 허브에 공유 거점을 운영하여, 예약 후 최단 거리 거점에서 당일~익일 내 배정합니다.",
      },
      {
        icon: "📅",
        title: "최소 1주일 단기 이용",
        description:
          "최소 1주일부터 최대 3개월까지 필요한 기간만 이용 가능하여 성수기 대응에 최적입니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "온라인 예약",
        description: "필요 수량, 기간, 배송지를 입력하여 온라인으로 간편 예약합니다",
      },
      {
        step: 2,
        title: "거점 배정",
        description: "배송지에서 가장 가까운 공유 거점의 재고를 실시간 확인 후 배정합니다",
      },
      {
        step: 3,
        title: "현장 이용",
        description: "약정 기간 동안 자유롭게 사용하며, 기간 연장도 가능합니다",
      },
      {
        step: 4,
        title: "거점 반납",
        description: "사용 종료 후 지정 거점으로 반납하면 검수 후 보증금을 환급합니다",
      },
    ],
    metaDescription:
      "AOVO 롤테이너 공유 서비스 - 물류 성수기에 필요한 롤테이너를 공유 풀에서 단기 임대하세요. 전국 거점 즉시 배정.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "cart",
    title: "카트 공유",
    subtitle:
      "물류 현장, 마트, 창고에서 필요한 핸드카트, 플랫폼카트, 접이식 카트 등을 공유 풀에서 단기간 빌려 쓰세요. 일 단위 과금으로 필요한 만큼만 비용을 지불하며, 전국 주요 도시의 거점에서 간편하게 수령·반납할 수 있습니다.",
    heroGradient: "from-gray-900 to-gray-600",
    features: [
      {
        icon: "🛒",
        title: "용도별 카트 라인업",
        description:
          "핸드카트(최대 150kg), 플랫폼카트(최대 500kg), 접이식 카트, 돌리 등 용도에 맞는 다양한 카트를 보유합니다.",
      },
      {
        icon: "📍",
        title: "전국 주요 도시 거점 운영",
        description:
          "서울, 경기, 부산, 대구, 광주 등 전국 주요 도시에 공유 거점을 운영하여 가까운 곳에서 수령·반납합니다.",
      },
      {
        icon: "💳",
        title: "일 단위 합리적 과금",
        description:
          "일 단위로 과금하여 하루만 필요해도 부담 없이 이용합니다. 장기 이용 시 할인 단가를 적용합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "온라인 예약",
        description: "카트 종류, 수량, 이용 기간을 온라인으로 간편하게 예약합니다",
      },
      {
        step: 2,
        title: "거점 수령",
        description: "예약 확인 후 가까운 거점에서 직접 수령합니다",
      },
      {
        step: 3,
        title: "자유 이용",
        description: "약정 기간 동안 자유롭게 사용하며 기간 연장도 가능합니다",
      },
      {
        step: 4,
        title: "거점 반납",
        description: "사용 후 가까운 거점으로 반납하면 자동 정산됩니다",
      },
    ],
    metaDescription:
      "AOVO 카트 공유 서비스 - 핸드카트, 플랫폼카트 등을 일 단위로 합리적으로 이용하세요. 전국 거점 수령·반납.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "airport-cart",
    title: "공항카트 공유",
    subtitle:
      "공항, 컨벤션센터, 대형 전시장 등에서 여행객과 방문객의 짐 운반을 위한 전용 카트를 공유 서비스로 운영하세요. 시설 규모에 맞는 수량을 배치하고, 이용 현황 데이터를 기반으로 최적 위치를 제안합니다. 정기 수거·정비·재배치까지 원스톱으로 관리합니다.",
    heroGradient: "from-indigo-950 to-indigo-600",
    features: [
      {
        icon: "✈️",
        title: "공항·대형시설 전용 설계",
        description:
          "넓은 짐받이, 경량 알루미늄 프레임, 브레이크 시스템 등 공항 환경에 최적화된 전용 카트를 제공합니다.",
      },
      {
        icon: "🏢",
        title: "컨벤션·전시장 대응",
        description:
          "컨벤션센터, 전시장, 대형 쇼핑몰 등 다양한 대형 시설의 규모와 특성에 맞춘 카트를 배치합니다.",
      },
      {
        icon: "📊",
        title: "이용 현황 데이터 제공",
        description:
          "카트 이용률, 피크 시간대, 동선 분석 데이터를 제공하여 최적 배치 위치와 적정 수량을 제안합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "시설 협의",
        description: "시설 규모, 동선, 이용객 수를 파악하여 필요 수량을 산출합니다",
      },
      {
        step: 2,
        title: "최적 배치",
        description: "출입구, 에스컬레이터 등 주요 동선에 맞춰 최적 위치에 배치합니다",
      },
      {
        step: 3,
        title: "자유 이용",
        description: "이용객이 자유롭게 사용하고 지정 장소에 반납합니다",
      },
      {
        step: 4,
        title: "정기 관리",
        description: "정기적으로 수거, 세척, 정비 후 다시 최적 위치에 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 공항카트 공유 서비스 - 공항, 컨벤션센터, 전시장 전용 카트를 공유 방식으로 효율적으로 운영하세요.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "stair-cart",
    title: "계단카트 공유",
    subtitle:
      "엘리베이터가 없는 건물에서 무거운 짐을 계단으로 운반해야 할 때, 전동·수동 계단카트를 공유 풀에서 빌려 쓰세요. 최대 300kg까지 안전하게 계단 운반이 가능하며, 이사·배송·설치 현장에서 작업자의 체력 부담을 크게 줄여줍니다.",
    heroGradient: "from-purple-950 to-purple-600",
    features: [
      {
        icon: "🪜",
        title: "전동·수동 계단 주행",
        description:
          "전동 모터로 계단을 자동 오르내리는 전동식과 경량 수동식을 모두 보유하여 현장 여건에 맞게 선택합니다.",
      },
      {
        icon: "💪",
        title: "최대 300kg 안전 운반",
        description:
          "냉장고, 세탁기, 피아노 등 대형 가전·가구를 최대 300kg까지 안전하게 계단으로 운반합니다.",
      },
      {
        icon: "🔋",
        title: "충전 완료 상태 제공",
        description:
          "전동 계단카트는 완충 상태로 제공하며, 1회 충전으로 약 40층 분량의 계단 작업이 가능합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 상담",
        description: "운반할 물품의 크기, 중량, 계단 폭과 층수를 상담합니다",
      },
      {
        step: 2,
        title: "장비 배정",
        description: "운반 조건에 맞는 전동식 또는 수동식 계단카트를 배정합니다",
      },
      {
        step: 3,
        title: "현장 이용",
        description: "사용법 교육 후 현장에서 바로 작업을 진행합니다",
      },
      {
        step: 4,
        title: "반납·회수",
        description: "작업 완료 후 수거하며, 배터리 충전과 장비 점검을 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 계단카트 공유 서비스 - 엘리베이터 없는 현장에서 최대 300kg까지 안전하게 계단 운반하세요. 전동·수동 선택 가능.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "stacker",
    title: "스테커 공유",
    subtitle:
      "창고, 물류센터, 공장에서 파랫트 적재·하역에 필요한 전동 스테커를 공유 방식으로 이용하세요. 최대 5m 높이까지 안전한 적재가 가능하며, 안전 인증을 받은 장비만 제공합니다. 장비 구매 없이 필요한 기간만 합리적으로 사용할 수 있습니다.",
    heroGradient: "from-orange-900 to-orange-500",
    features: [
      {
        icon: "🏗️",
        title: "최대 5m 고적재 지원",
        description:
          "전동 리프트로 최대 5m 높이까지 파랫트를 적재·하역할 수 있어 다단 랙 창고에 적합합니다.",
      },
      {
        icon: "⚡",
        title: "전동식 워키형 스테커",
        description:
          "작업자가 보행하며 조작하는 워키형 전동 스테커로 좁은 통로에서도 효율적으로 작업합니다.",
      },
      {
        icon: "🔒",
        title: "KC 안전 인증 장비",
        description:
          "KC(한국인증) 등 안전 인증을 받은 장비만 제공하며, 정기 안전 검사 이력을 보유합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "사양 상담",
        description: "적재 높이, 파랫트 중량, 통로 폭 등 작업 환경을 확인합니다",
      },
      {
        step: 2,
        title: "장비 배정",
        description: "작업 조건에 맞는 스테커를 가장 가까운 거점에서 배정합니다",
      },
      {
        step: 3,
        title: "안전 교육·이용",
        description: "조작 교육을 진행한 후 현장에서 안전하게 사용합니다",
      },
      {
        step: 4,
        title: "반납·정비",
        description: "사용 후 회수하여 배터리 충전, 유압 점검, 포크 정비를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 스테커 공유 서비스 - 창고, 물류센터에 필요한 전동 스테커를 안전 인증 장비로 합리적으로 이용하세요.",
  },
  {
    category: "sharing",
    categoryLabel: "공유서비스",
    slug: "event",
    title: "행사장장비 공유",
    subtitle:
      "전시회, 박람회, 기업 행사, 축제 등에 필요한 테이블, 의자, 파티션, 조명, 무대장비를 공유 풀에서 빌려 쓰세요. 1일부터 이용 가능하며, 배송·설치·철거까지 원스톱으로 진행합니다. 행사 규모에 맞는 맞춤 패키지를 제안합니다.",
    heroGradient: "from-rose-950 to-rose-600",
    features: [
      {
        icon: "🎪",
        title: "행사 전 품목 보유",
        description:
          "접이식 테이블, 연회 의자, 이동식 파티션, LED 조명, 간이 무대, 마이크·앰프 세트 등 행사에 필요한 전 품목을 보유합니다.",
      },
      {
        icon: "📦",
        title: "배송·설치·철거 원스톱",
        description:
          "행사장까지 배송, 현장 설치, 행사 종료 후 철거·회수까지 전담 팀이 원스톱으로 진행합니다.",
      },
      {
        icon: "🕐",
        title: "1일 단위 유연한 이용",
        description:
          "1일부터 이용 가능하여 하루짜리 세미나부터 1주일 전시회까지 행사 기간에 맞춰 운영합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "행사 상담",
        description: "행사 유형, 참석 인원, 장소 규모를 파악하여 필요 장비를 산출합니다",
      },
      {
        step: 2,
        title: "패키지 견적",
        description: "행사 규모에 맞는 맞춤 패키지와 단품 견적을 함께 제안합니다",
      },
      {
        step: 3,
        title: "배송·설치",
        description: "행사 전일 또는 당일 아침에 현장 배송 및 설치를 완료합니다",
      },
      {
        step: 4,
        title: "철거·회수",
        description: "행사 종료 즉시 철거하고 장비를 회수합니다",
      },
    ],
    metaDescription:
      "AOVO 행사장장비 공유 - 전시회, 박람회, 기업 행사에 필요한 모든 장비를 1일부터 빌려 쓰세요. 설치·철거 포함.",
  },

  // === RENTAL (7) ===
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "furniture",
    title: "사무가구/기기 렌탈",
    subtitle:
      "사무실 개설, 확장, 임시 프로젝트룸 등에 필요한 사무 가구와 기기를 렌탈로 빠르게 구비하세요. 책상, 의자, 수납장, 파티션 등 가구와 복합기, 프린터, 모니터 등 기기를 한번에 구성합니다. 전문 공간 설계사가 사무실 면적에 맞는 최적 배치도를 제안합니다.",
    heroGradient: "from-violet-950 to-violet-600",
    features: [
      {
        icon: "🪑",
        title: "사무실 풀세트 구성",
        description:
          "L형 책상, 높낮이 조절 데스크, 3단 캐비닛, 파티션, 회의 테이블 등 사무실 전체를 한번에 구성합니다.",
      },
      {
        icon: "🖨️",
        title: "사무기기 통합 렌탈",
        description:
          "복합기(인쇄·스캔·팩스), 모니터, 프로젝터, 화상회의 장비 등 사무에 필요한 기기도 함께 렌탈합니다.",
      },
      {
        icon: "📐",
        title: "전문 공간 설계 제안",
        description:
          "사무실 면적, 인원수, 업무 특성에 맞는 최적 가구 배치도와 동선 설계를 무료로 제안합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 방문 실측",
        description: "사무실 면적, 전기 배선, 인원수를 직접 확인하고 실측합니다",
      },
      {
        step: 2,
        title: "배치도·견적",
        description: "공간 설계 배치도와 함께 가구·기기 통합 견적을 제안합니다",
      },
      {
        step: 3,
        title: "배송·설치",
        description: "전문 팀이 배송, 조립, 설치, 배선 정리까지 완료합니다",
      },
      {
        step: 4,
        title: "유지·교체",
        description: "파손·고장 시 무상 교체, 인원 변동 시 추가·회수를 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 사무가구/기기 렌탈 - 책상, 의자, 복합기 등 사무실 전체를 렌탈로 빠르게 구비하세요. 공간 설계 무료 제공.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "kitchen",
    title: "주방집기 렌탈",
    subtitle:
      "급식소, 구내식당, 카페, 푸드코트 등에 필요한 업소용 주방 장비를 렌탈하세요. HACCP 기준에 적합한 위생 인증 장비를 보유하고 있으며, 장비 고장 시 24시간 내 긴급 교체를 지원합니다. 메뉴와 식수 인원에 맞는 최적 장비를 선정해드립니다.",
    heroGradient: "from-amber-900 to-amber-600",
    features: [
      {
        icon: "🍳",
        title: "업소용 전문 장비",
        description:
          "업소용 냉장·냉동고, 가스레인지, 오븐, 식기세척기, 배식대, 스팀테이블 등 전문 주방 장비를 제공합니다.",
      },
      {
        icon: "📋",
        title: "HACCP 위생 인증 장비",
        description:
          "HACCP 기준에 적합한 스테인리스 재질, 위생 인증을 받은 장비를 보유하여 위생 감사에 대비합니다.",
      },
      {
        icon: "⏱️",
        title: "24시간 내 긴급 교체",
        description:
          "냉장고 고장 등 긴급 상황 시 접수 후 24시간 내 동급 장비로 긴급 교체하여 영업 중단을 방지합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 조사",
        description: "주방 면적, 가스·전기 용량, 배수 환경, 메뉴 구성을 파악합니다",
      },
      {
        step: 2,
        title: "장비 선정·견적",
        description: "식수 인원과 메뉴에 맞는 최적 장비를 선정하고 견적을 산출합니다",
      },
      {
        step: 3,
        title: "설치·사용 교육",
        description: "전문 기사가 설치하고 조리 담당자에게 장비 사용법을 교육합니다",
      },
      {
        step: 4,
        title: "정기 위생·유지보수",
        description: "월 1회 위생 점검과 장비 성능 확인, 소모품 교체를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 렌탈 - HACCP 인증 업소용 주방 장비를 렌탈로 초기 비용 없이 운영하세요. 24시간 긴급 교체 지원.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "event",
    title: "행사집기 렌탈",
    subtitle:
      "선거사무실, 전시 부스, 박람회, 기업 행사, 임시 사무소 등에 필요한 집기를 렌탈하세요. 선거용 책상·의자·파티션 세트부터 전시 부스 장비, 행사장 테이블·조명까지 행사 유형별 맞춤 패키지를 제공합니다. 긴급한 행사에도 당일 배송이 가능합니다.",
    heroGradient: "from-red-950 to-red-700",
    features: [
      {
        icon: "🗳️",
        title: "선거사무실 원스톱 세팅",
        description:
          "선거사무실에 필요한 책상, 의자, 파티션, 화이트보드, 복합기까지 한번에 렌탈하고 선거 종료 후 일괄 회수합니다.",
      },
      {
        icon: "🎪",
        title: "전시·행사 맞춤 패키지",
        description:
          "전시 부스 파티션, 행사장 연회 테이블, 접이식 의자, 안내 데스크, 간이 무대 등을 패키지로 제공합니다.",
      },
      {
        icon: "🚚",
        title: "긴급 당일 배송",
        description:
          "갑작스러운 행사에도 오전 접수 시 당일 오후 배송·설치가 가능합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "행사 유형 상담",
        description: "선거, 전시, 행사 등 유형과 규모, 일정을 파악합니다",
      },
      {
        step: 2,
        title: "패키지 견적",
        description: "행사 유형별 맞춤 패키지 또는 단품 견적을 제안합니다",
      },
      {
        step: 3,
        title: "배송·설치",
        description: "행사장에 배송하고 현장 배치·설치를 완료합니다",
      },
      {
        step: 4,
        title: "철거·회수",
        description: "행사 종료 후 약속된 일시에 철거·회수합니다",
      },
    ],
    metaDescription:
      "AOVO 행사집기 렌탈 - 선거사무실, 전시 부스, 박람회 등 행사에 필요한 집기를 빠르게 렌탈하세요. 당일 배송 가능.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "it",
    title: "IT기기/로봇 렌탈",
    subtitle:
      "노트북, 태블릿, 대형 모니터, 키오스크, 서빙로봇 등 최신 IT 장비를 렌탈하세요. 행사·전시·세미나 등 단기 프로젝트부터 매장·식당의 중장기 운영까지 지원합니다. 반납 시 인증된 데이터 완전 삭제(DoD 기준)를 보장하여 정보 유출 걱정이 없습니다.",
    heroGradient: "from-blue-950 to-indigo-600",
    features: [
      {
        icon: "💻",
        title: "최신 IT기기 풀라인업",
        description:
          "노트북(Windows/Mac), 태블릿(iPad/Galaxy Tab), 대형 모니터, 키오스크, POS 시스템 등 최신 기기를 제공합니다.",
      },
      {
        icon: "🤖",
        title: "자율주행 서빙로봇",
        description:
          "식당, 카페, 호텔에서 사용하는 자율주행 서빙로봇을 렌탈합니다. 매장 동선 매핑과 초기 세팅을 포함합니다.",
      },
      {
        icon: "🔐",
        title: "DoD 기준 데이터 완전 삭제",
        description:
          "반납 시 미국 국방부(DoD) 기준의 데이터 삭제를 진행하고 삭제 인증서를 발급하여 정보 보안을 보장합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "기기·스펙 상담",
        description: "용도, 운영체제, 소프트웨어 요구사항을 파악하여 최적 기기를 추천합니다",
      },
      {
        step: 2,
        title: "SW 세팅·구성",
        description: "필요한 소프트웨어 설치, 네트워크 설정, 계정 구성을 완료합니다",
      },
      {
        step: 3,
        title: "안전 포장·배송",
        description: "정전기 방지 포장으로 안전하게 배송하고 현장 세팅을 확인합니다",
      },
      {
        step: 4,
        title: "데이터 삭제·회수",
        description: "반납 시 데이터 완전 삭제 후 삭제 인증서를 발급합니다",
      },
    ],
    metaDescription:
      "AOVO IT기기/로봇 렌탈 - 노트북, 태블릿, 서빙로봇, 키오스크 등 최신 IT 장비를 렌탈하세요. 데이터 보안 보장.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "medical",
    title: "의료장비 렌탈",
    subtitle:
      "병원, 요양원, 재활센터, 보건소 등 의료 현장에 필요한 장비를 렌탈하세요. 병원 침대, 전동 휠체어, 재활 운동기구, 환자 리프트, 산소 발생기 등 의료기기 인증을 받은 안전한 장비만 취급합니다. 전문 멸균 소독 후 납품하며, 정기 점검을 포함합니다.",
    heroGradient: "from-green-950 to-green-600",
    features: [
      {
        icon: "🏥",
        title: "의료 전문 장비 라인업",
        description:
          "전동 병원 침대, 전동·수동 휠체어, 워커, 재활 운동기구, 환자 리프트, 산소 발생기 등을 제공합니다.",
      },
      {
        icon: "✅",
        title: "의료기기 인증 안전 장비",
        description:
          "식약처 의료기기 인증, 안전 검사를 통과한 장비만 취급하며, 인증서 사본을 함께 제공합니다.",
      },
      {
        icon: "🧼",
        title: "전문 멸균 소독 납품",
        description:
          "자외선(UV) 소독, 고온 증기 멸균을 거친 장비만 납품하며, 멸균 확인서를 발급합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "전문 상담",
        description: "환자 유형, 시설 규모, 의료 용도에 맞는 장비를 전문 상담합니다",
      },
      {
        step: 2,
        title: "장비 구성·견적",
        description: "필요 장비를 구성하고 렌탈 기간별 비용을 제안합니다",
      },
      {
        step: 3,
        title: "멸균 납품",
        description: "전문 멸균 소독 후 안전 포장하여 배송하고 현장 세팅을 확인합니다",
      },
      {
        step: 4,
        title: "정기 점검·멸균",
        description: "월 1회 장비 상태 점검과 멸균 소독을 정기적으로 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 의료장비 렌탈 - 병원, 요양원에 필요한 인증 의료장비를 멸균 소독 후 안전하게 렌탈하세요. 정기 점검 포함.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "aircon",
    title: "이동식에어컨 렌탈",
    subtitle:
      "공사현장, 행사장, 임시시설, 서버실 등 고정 에어컨 설치가 어려운 공간에 이동식 에어컨을 렌탈하세요. 별도 배관 공사 없이 전원만 연결하면 바로 사용 가능합니다. 1일부터 렌탈 가능하며, 산업용 대용량 모델로 넓은 공간도 시원하게 냉방합니다.",
    heroGradient: "from-sky-950 to-sky-600",
    features: [
      {
        icon: "❄️",
        title: "산업용 대용량 냉방",
        description:
          "30평~100평 이상 넓은 공간도 냉방 가능한 산업용 대용량 이동식 에어컨을 보유하고 있습니다.",
      },
      {
        icon: "🔌",
        title: "배관 공사 없이 간편 설치",
        description:
          "이동형 설계로 배관·배수 공사 없이 전원 콘센트만 연결하면 바로 가동합니다. 설치 5분 완료.",
      },
      {
        icon: "📅",
        title: "1일부터 유연한 렌탈",
        description:
          "하루짜리 행사부터 수개월 공사현장까지, 필요한 기간만큼만 렌탈하여 불필요한 비용을 절감합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "냉방 부하 상담",
        description: "공간 면적, 층고, 발열원, 재실 인원을 파악하여 적정 용량을 산출합니다",
      },
      {
        step: 2,
        title: "현장 배송",
        description: "수도권 당일 배송, 지방 익일 배송으로 현장에 직접 납품합니다",
      },
      {
        step: 3,
        title: "설치·가동 확인",
        description: "전문가가 설치하고 냉방 성능을 테스트하여 정상 가동을 확인합니다",
      },
      {
        step: 4,
        title: "회수·정비",
        description: "렌탈 종료 후 회수하여 필터 교체, 냉매 점검, 세척을 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 이동식에어컨 렌탈 - 공사현장, 행사장에 배관 공사 없이 설치하는 산업용 이동식 에어컨. 1일부터 렌탈 가능.",
  },
  {
    category: "rental",
    categoryLabel: "렌탈서비스",
    slug: "dehumidifier",
    title: "산업용제습기 렌탈",
    subtitle:
      "공장, 창고, 건설현장, 지하 주차장 등의 습도 관리를 위한 산업용 제습기를 렌탈하세요. 하루 최대 150L 제습 가능한 대용량 장비를 보유하고 있으며, 실시간 습도 모니터링 기능으로 최적 환경을 자동 유지합니다. 장마철 단기 렌탈부터 연중 상시 운영까지 대응합니다.",
    heroGradient: "from-blue-900 to-cyan-600",
    features: [
      {
        icon: "💧",
        title: "하루 최대 150L 대용량 제습",
        description:
          "산업용 압축기를 탑재한 대용량 제습기로 하루 최대 150L까지 제습하여 넓은 공장·창고도 효과적으로 관리합니다.",
      },
      {
        icon: "🏭",
        title: "산업 현장 내구성",
        description:
          "분진, 고온, 다습 등 산업 현장의 가혹한 환경에서도 안정적으로 작동하는 내구성 높은 장비입니다.",
      },
      {
        icon: "📊",
        title: "실시간 습도 모니터링",
        description:
          "디지털 습도 센서를 통해 실시간 습도를 모니터링하고, 설정 습도에 도달하면 자동 제어합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "현장 환경 확인",
        description: "공간 면적, 환기 상태, 현재 습도, 목표 습도를 확인합니다",
      },
      {
        step: 2,
        title: "용량 선정·견적",
        description: "제습 부하를 계산하여 최적 용량의 제습기와 대수를 결정합니다",
      },
      {
        step: 3,
        title: "설치·가동",
        description: "현장에 배송·설치하고 습도 센서 설정과 성능 테스트를 완료합니다",
      },
      {
        step: 4,
        title: "정기 관리",
        description: "필터 교체, 배수 확인, 압축기 점검 등 정기 관리를 진행합니다",
      },
    ],
    metaDescription:
      "AOVO 산업용제습기 렌탈 - 공장, 창고의 습도를 하루 최대 150L 제습으로 관리하세요. 실시간 모니터링 포함.",
  },

  // === RECYCLE (8) ===
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "logistics",
    title: "물류장비 순환",
    subtitle:
      "사용 완료되거나 노후된 롤테이너, 파랫트, 인테이너 등 물류장비를 수거하여 전문 정비 후 재사용합니다. 폐기 대신 순환하여 구매 비용을 절감하고, 탄소 배출과 폐기물을 줄여 ESG 경영에 기여합니다. 엄격한 품질 검수를 거쳐 기준 충족 장비만 재투입합니다.",
    heroGradient: "from-lime-950 to-lime-600",
    features: [
      {
        icon: "♻️",
        title: "폐기 제로, 자원 순환",
        description:
          "수명이 다한 롤테이너·파랫트를 폐기하지 않고 프레임 교정, 바퀴 교체, 용접 보수 등을 거쳐 재사용합니다.",
      },
      {
        icon: "🔍",
        title: "3단계 품질 검수",
        description:
          "외관 검수, 하중 테스트, 안전 장치 점검의 3단계 검수를 거쳐 기준 충족 장비만 A/B 등급으로 분류하여 재투입합니다.",
      },
      {
        icon: "🌱",
        title: "ESG 탄소 절감 인증",
        description:
          "장비 재사용으로 절감된 탄소 배출량과 폐기물 감소량을 산출하여 ESG 보고서 작성에 활용할 수 있는 인증서를 발급합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거 신청",
        description: "노후·파손 물류장비의 종류, 수량, 위치를 알려주시면 수거 일정을 잡습니다",
      },
      {
        step: 2,
        title: "3단계 검수",
        description: "수거한 장비를 외관, 하중, 안전 장치 기준으로 등급을 매깁니다",
      },
      {
        step: 3,
        title: "전문 정비",
        description: "프레임 교정, 바퀴 교체, 용접 보수, 고압 세척을 진행합니다",
      },
      {
        step: 4,
        title: "재배치·인증",
        description: "정비 완료 장비를 필요한 곳에 재배치하고 순환 인증서를 발급합니다",
      },
    ],
    metaDescription:
      "AOVO 물류장비 순환 서비스 - 롤테이너, 파랫트 등 노후 물류장비를 수거·정비·재사용하여 비용과 탄소를 절감하세요.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "chair",
    title: "체어 순환 (세르타)",
    subtitle:
      "사용 완료된 프리미엄 사무용 의자를 수거하여 전문가가 완전 분해, 정밀 검수, 부품 교체, 세척, 재조립하는 인증 리퍼비시 프로그램입니다. 새 제품 대비 40~60% 저렴한 가격으로 거의 새 것과 같은 품질의 의자를 제공합니다. 세르타 인증 기준을 충족한 의자만 출고됩니다.",
    heroGradient: "from-primary to-gray-700",
    features: [
      {
        icon: "🏆",
        title: "세르타 인증 리퍼비시",
        description:
          "세르타 공식 인증 기준(프레임 무변형, 시트폼 탄성 90% 이상, 메커니즘 정상 작동)을 충족한 의자만 출고합니다.",
      },
      {
        icon: "🔧",
        title: "완전 분해·정밀 복원",
        description:
          "프레임, 시트, 등판, 팔걸이, 가스실린더, 캐스터를 완전 분해하여 세척·교체·재조립합니다.",
      },
      {
        icon: "💰",
        title: "새 제품 대비 40~60% 절감",
        description:
          "프리미엄 인체공학 의자를 새 제품의 절반 이하 가격에 이용할 수 있어 사무실 구축 비용을 크게 절감합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "전국 수거",
        description: "기업, 관공서 등에서 사용 완료된 의자를 전국에서 수거합니다",
      },
      {
        step: 2,
        title: "정밀 검수",
        description: "프레임 변형, 시트폼 탄성, 틸팅 메커니즘, 가스실린더 등을 정밀 검수합니다",
      },
      {
        step: 3,
        title: "분해·복원",
        description: "완전 분해 후 세척, 마모 부품 교체, 재조립하여 새 것처럼 복원합니다",
      },
      {
        step: 4,
        title: "인증·납품",
        description: "세르타 인증 기준 최종 검사 후 품질 보증서와 함께 납품합니다",
      },
    ],
    metaDescription:
      "AOVO 체어 순환 (세르타) - 프리미엄 의자를 전문 분해·복원하여 새 제품 대비 40~60% 저렴하게 제공합니다. 세르타 인증.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "furniture",
    title: "사무가구/기기 순환",
    subtitle:
      "사무실 이전, 축소, 폐업 시 발생하는 중고 사무가구와 기기를 일괄 수거하여 복원·재유통합니다. 책상, 캐비닛, 파티션, 복합기, 모니터 등을 전문 정비하여 합리적 가격에 재판매합니다. 폐기물 처리 비용을 절감하고 ESG 가치를 실현합니다.",
    heroGradient: "from-stone-900 to-stone-600",
    features: [
      {
        icon: "🪑",
        title: "사무가구 전문 복원",
        description:
          "책상 상판 재도장, 캐비닛 잠금장치 교체, 파티션 패브릭 교체 등 가구별 전문 복원을 진행합니다.",
      },
      {
        icon: "🖥️",
        title: "사무기기 리퍼비시",
        description:
          "복합기 드럼·토너 교체, 모니터 패널 점검, 프린터 헤드 세척 등 기기별 리퍼비시로 성능을 복원합니다.",
      },
      {
        icon: "📦",
        title: "사무실 이전 시 일괄 처리",
        description:
          "사무실 이전·폐업 시 가구와 기기를 일괄 수거하여 복원 가능 품목은 재유통, 불가 품목은 친환경 폐기합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거 신청·견적",
        description: "수거할 가구·기기 목록과 사진을 보내주시면 무상/유상 수거 여부를 안내합니다",
      },
      {
        step: 2,
        title: "방문 수거",
        description: "전문 팀이 방문하여 분류·포장·운반을 진행합니다",
      },
      {
        step: 3,
        title: "복원·정비",
        description: "가구는 세척·재도장, 기기는 부품 교체·성능 테스트를 진행합니다",
      },
      {
        step: 4,
        title: "재유통·납품",
        description: "복원 완료 제품을 필요한 곳에 합리적 가격으로 납품합니다",
      },
    ],
    metaDescription:
      "AOVO 사무가구/기기 순환 - 사무실 이전 시 중고 가구·기기를 일괄 수거하여 복원·재유통하는 순환 서비스.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "kitchen",
    title: "주방집기 순환",
    subtitle:
      "폐업, 리모델링 등으로 발생하는 중고 업소용 주방 장비를 수거하여 전문 세척·소독·정비 후 재유통합니다. 고온 고압 세척과 UV 살균으로 위생 기준을 충족시키고, 성능 테스트를 통과한 장비만 재판매합니다. 새 장비 대비 최대 50% 저렴하게 구매 가능합니다.",
    heroGradient: "from-yellow-900 to-yellow-600",
    features: [
      {
        icon: "🍳",
        title: "업소용 장비 전문 복원",
        description:
          "업소용 냉장고 압축기 점검, 가스레인지 버너 교체, 식기세척기 노즐 세척 등 장비별 전문 복원을 진행합니다.",
      },
      {
        icon: "🧼",
        title: "고온 고압 세척·UV 살균",
        description:
          "100도 이상 고온 고압 스팀 세척과 UV 살균으로 기름때, 세균을 완벽히 제거합니다.",
      },
      {
        icon: "✅",
        title: "성능 테스트 합격 장비만 출고",
        description:
          "온도 유지 테스트, 가스 누설 검사, 전기 안전 검사 등 성능 테스트를 통과한 장비만 재유통합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "수거 접수",
        description: "폐업·리모델링 주방의 장비 목록과 사진을 보내주시면 수거를 접수합니다",
      },
      {
        step: 2,
        title: "전문 세척·살균",
        description: "고온 고압 스팀 세척과 UV 살균으로 위생 기준을 충족시킵니다",
      },
      {
        step: 3,
        title: "성능 정비·테스트",
        description: "부품 교체, 성능 복원 후 온도·가스·전기 안전 테스트를 진행합니다",
      },
      {
        step: 4,
        title: "품질 보증 재유통",
        description: "성능 보증서와 함께 합리적 가격으로 재유통합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 순환 - 중고 업소용 주방장비를 전문 세척·소독·정비하여 합리적 가격으로 재유통합니다. 위생 인증 포함.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "aircon",
    title: "이동식에어컨 순환",
    subtitle:
      "여름 시즌 종료 후 사용 완료된 이동식 에어컨을 수거하여, 비수기인 겨울에 냉매 충전, 필터 교체, 압축기 점검 등 전문 정비를 거쳐 다음 여름 시즌에 재배치합니다. 매년 새 장비를 구매하는 것보다 대폭 비용을 절감할 수 있습니다.",
    heroGradient: "from-teal-900 to-teal-500",
    features: [
      {
        icon: "❄️",
        title: "시즌별 수거·재배치 순환",
        description:
          "여름 종료 시 수거 → 겨울 중 정비 → 다음 여름 재배치의 연간 순환 사이클로 장비를 효율적으로 운영합니다.",
      },
      {
        icon: "🔧",
        title: "비수기 전문 정비",
        description:
          "냉매 충전, 압축기 성능 테스트, 팬 모터 점검, 필터 교체, 외관 세척까지 비수기에 완벽하게 정비합니다.",
      },
      {
        icon: "💰",
        title: "매년 구매 대비 60% 절감",
        description:
          "순환 프로그램을 통해 매년 새 장비를 구매하는 비용의 약 40% 수준으로 동일 성능의 에어컨을 이용합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "시즌 종료 수거",
        description: "여름 시즌 종료 시점에 사용 완료 에어컨을 현장에서 수거합니다",
      },
      {
        step: 2,
        title: "성능 검수",
        description: "냉방 성능, 압축기 상태, 전기 안전을 검수하여 정비 범위를 결정합니다",
      },
      {
        step: 3,
        title: "비수기 전문 정비",
        description: "냉매 충전, 필터 교체, 압축기 점검, 외관 세척 등 완전 정비를 진행합니다",
      },
      {
        step: 4,
        title: "다음 시즌 재배치",
        description: "다음 여름 시즌 시작 전 정비 완료 장비를 필요한 곳에 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 이동식에어컨 순환 - 시즌 종료 에어컨을 수거·정비하여 다음 시즌 재사용. 매년 구매 대비 60% 비용 절감.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "seasonal",
    title: "계절상품 순환",
    subtitle:
      "여름 선풍기·냉풍기, 겨울 온풍기·전기장판 등 계절별로 필요한 상품을 순환 시스템으로 운영합니다. 비수기에는 안전한 창고에 보관하고, 시즌 시작 전 점검·정비하여 자동으로 배치합니다. 계절 상품의 구매·보관·폐기 부담을 모두 해결합니다.",
    heroGradient: "from-orange-900 to-red-500",
    features: [
      {
        icon: "🌸",
        title: "봄·여름·가을·겨울 전 시즌 대응",
        description:
          "냉풍기, 선풍기, 서큘레이터(여름), 온풍기, 전기장판, 히터(겨울) 등 사계절 상품을 모두 순환 관리합니다.",
      },
      {
        icon: "📦",
        title: "비수기 창고 보관 서비스",
        description:
          "사용하지 않는 비수기에는 온·습도 관리가 되는 전용 창고에 안전하게 보관하여 보관 공간 부담을 없앱니다.",
      },
      {
        icon: "🔄",
        title: "시즌 자동 배치·회수",
        description:
          "시즌 시작 2주 전 자동으로 점검·배치하고, 시즌 종료 시 자동 회수하여 수동 관리 없이 운영합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "순환 등록",
        description: "순환 관리할 계절 상품의 종류와 수량을 등록합니다",
      },
      {
        step: 2,
        title: "비수기 보관",
        description: "시즌 종료 후 전용 창고에 안전하게 보관합니다",
      },
      {
        step: 3,
        title: "시즌 전 점검·정비",
        description: "다음 시즌 시작 전 성능 점검, 세척, 부품 교체를 진행합니다",
      },
      {
        step: 4,
        title: "자동 재배치",
        description: "시즌에 맞춰 약속된 장소에 자동으로 배치합니다",
      },
    ],
    metaDescription:
      "AOVO 계절상품 순환 - 선풍기, 온풍기 등 계절 상품을 보관·정비·자동 배치하는 순환 서비스. 구매·폐기 부담 제로.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "dehumidifier",
    title: "산업용제습기 순환",
    subtitle:
      "장마철 사용 후 산업용 제습기를 수거하여 비수기에 필터 교체, 압축기 정비, 배수 시스템 점검 등 전문 정비를 진행합니다. 다음 장마철에 성능이 복원된 장비를 재배치하여 매년 새 장비를 구매할 필요 없이 효율적으로 운영합니다. 장비 재사용으로 폐기물을 줄여 환경에 기여합니다.",
    heroGradient: "from-blue-900 to-blue-500",
    features: [
      {
        icon: "💧",
        title: "장마철 수거·건기 정비 사이클",
        description:
          "장마철 종료 후 수거 → 건기 동안 전문 정비 → 다음 장마철 재배치의 연간 순환으로 운영합니다.",
      },
      {
        icon: "🔧",
        title: "압축기·필터 성능 완전 복원",
        description:
          "제습 성능의 핵심인 압축기 점검, 필터 교체, 배수 펌프 세척, 센서 보정을 통해 원래 성능을 복원합니다.",
      },
      {
        icon: "🌱",
        title: "친환경 자원 순환",
        description:
          "산업용 제습기의 재사용으로 연간 수톤의 폐기물을 줄이고, 탄소 배출 절감 실적을 ESG 보고에 활용합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "장마 후 수거",
        description: "장마철 종료 시점에 사용 완료 제습기를 현장에서 수거합니다",
      },
      {
        step: 2,
        title: "성능 검수",
        description: "제습 용량, 압축기 상태, 센서 정확도를 검수하여 정비 범위를 결정합니다",
      },
      {
        step: 3,
        title: "건기 전문 정비",
        description: "필터 교체, 압축기 점검, 배수 시스템 세척, 센서 보정을 진행합니다",
      },
      {
        step: 4,
        title: "다음 시즌 재배치",
        description: "다음 장마철 시작 전 정비 완료 장비를 필요한 곳에 재배치합니다",
      },
    ],
    metaDescription:
      "AOVO 산업용제습기 순환 - 장마 후 수거, 건기 정비, 재배치 순환 서비스. 매년 구매 없이 효율적으로 운영하세요.",
  },
  {
    category: "recycle",
    categoryLabel: "순환서비스",
    slug: "special",
    title: "특수집기 순환",
    subtitle:
      "실험실 장비, 클린룸 설비, 반도체 공정 집기, 특수 선반·랙 등 일반 집기와 다른 관리가 필요한 특수 용도 집기의 수거, 전문 정비, 재유통을 담당합니다. 장비별 사용 이력과 정비 이력을 체계적으로 관리하며, 특수 환경 안전 기준을 준수합니다.",
    heroGradient: "from-gray-900 to-gray-500",
    features: [
      {
        icon: "🔬",
        title: "특수 환경 전문 집기",
        description:
          "실험실 작업대, 클린룸 선반, 내화학성 캐비닛, ESD 방지 랙 등 특수 환경에 맞는 집기를 전문 취급합니다.",
      },
      {
        icon: "🛡️",
        title: "안전 기준 준수 정비",
        description:
          "화학물질 잔류 검사, 내열·내화학 성능 테스트, 정전기 방지 성능 확인 등 특수 환경 안전 기준을 준수하여 정비합니다.",
      },
      {
        icon: "📜",
        title: "장비 이력 추적 관리",
        description:
          "각 장비의 제조 이력, 사용처, 정비 내역, 부품 교체 이력을 체계적으로 관리하여 추적 가능성을 보장합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "사전 조사·안전 확인",
        description: "특수 집기의 종류, 사용 환경, 오염 물질, 안전 요구사항을 사전 조사합니다",
      },
      {
        step: 2,
        title: "전문 수거·이송",
        description: "특수 장비 취급 자격을 갖춘 팀이 안전하게 수거하여 이송합니다",
      },
      {
        step: 3,
        title: "특수 정비·인증",
        description: "장비별 특수 세척, 성능 복원, 안전 테스트를 진행하고 인증합니다",
      },
      {
        step: 4,
        title: "이력 관리·재유통",
        description: "정비 이력을 기록하고 품질 보증서와 함께 재유통합니다",
      },
    ],
    metaDescription:
      "AOVO 특수집기 순환 - 실험실, 클린룸 등 특수 환경 집기를 전문 수거·정비·재유통하는 순환 서비스. 이력 추적 관리.",
  },

  // === WHOLESALE (5) ===
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "logistics",
    title: "물류장비 도소매",
    subtitle:
      "롤테이너, 파랫트, 인테이너, 대차 등 물류장비를 제조사 직거래 도매가에 구매하세요. 중간 유통 마진을 없앤 공장 직거래로 시중 대비 최대 30% 저렴한 가격을 제공합니다. 10대 이상 대량 주문 시 추가 할인이 적용되며, 전국 어디든 배송합니다.",
    heroGradient: "from-slate-950 to-slate-600",
    features: [
      {
        icon: "🏭",
        title: "제조사 직거래 도매가",
        description:
          "국내외 제조사와 직거래 계약으로 중간 유통 마진을 없앴습니다. 시중 소매가 대비 최대 30% 저렴합니다.",
      },
      {
        icon: "📦",
        title: "10대 이상 대량 추가 할인",
        description:
          "10대 이상 주문 시 5% 추가 할인, 50대 이상 10% 추가 할인 등 수량이 많을수록 더 큰 할인을 적용합니다.",
      },
      {
        icon: "🚛",
        title: "전국 직배송 체계",
        description:
          "수도권 당일, 지방 2~3일 내 배송하는 전국 직배송 체계를 운영합니다. 하역 서비스도 함께 제공합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "품목·수량 문의",
        description: "필요한 물류장비 종류, 규격, 수량을 알려주세요",
      },
      {
        step: 2,
        title: "도매 견적",
        description: "수량별 도매 단가를 산출하여 견적서를 발송합니다",
      },
      {
        step: 3,
        title: "주문 확정",
        description: "견적 확인 후 주문을 확정하고 결제를 진행합니다",
      },
      {
        step: 4,
        title: "전국 배송",
        description: "전국 어디든 안전 포장하여 직배송하며, 하역을 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 물류장비 도소매 - 롤테이너, 파랫트, 인테이너를 제조사 직거래 도매가로 구매하세요. 대량 할인, 전국 배송.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "kitchen",
    title: "주방집기 도소매",
    subtitle:
      "식당 창업, 급식소 신설, 구내식당 구축 시 필요한 업소용 주방장비를 도매가에 직접 구매하세요. 업소용 냉장고, 가스레인지, 식기세척기, 조리대, 배식대, 식기류까지 전 품목을 취급합니다. 소매가 대비 최대 40% 저렴하며, 대형 장비는 설치까지 지원합니다.",
    heroGradient: "from-amber-950 to-amber-600",
    features: [
      {
        icon: "🍳",
        title: "업소용 전 품목 취급",
        description:
          "업소용 냉장·냉동고, 가스레인지, 튀김기, 식기세척기, 스테인리스 조리대, 배식대, 식기류 등 전 품목을 취급합니다.",
      },
      {
        icon: "💰",
        title: "소매가 대비 최대 40% 할인",
        description:
          "제조사·수입사 직거래로 소매가 대비 최대 40% 저렴한 도매가를 제공합니다. 대량 구매 시 추가 할인을 적용합니다.",
      },
      {
        icon: "🔧",
        title: "대형 장비 설치 지원",
        description:
          "업소용 냉장고, 식기세척기 등 대형 장비는 전문 기사가 배송부터 설치, 가스·전기 연결까지 지원합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "품목 상담",
        description: "개업 메뉴, 식수 인원에 맞는 필요 장비를 함께 선정합니다",
      },
      {
        step: 2,
        title: "도매 견적",
        description: "품목별 도매 단가와 설치비를 포함한 견적을 제공합니다",
      },
      {
        step: 3,
        title: "결제·주문",
        description: "견적 확인 후 결제하고 주문을 확정합니다",
      },
      {
        step: 4,
        title: "배송·설치",
        description: "현장에 배송하고 대형 장비는 전문 기사가 설치를 완료합니다",
      },
    ],
    metaDescription:
      "AOVO 주방집기 도소매 - 업소용 냉장고, 조리대, 식기류 등을 도매가에 직접 구매하세요. 최대 40% 할인, 설치 지원.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "event",
    title: "행사집기 도소매",
    subtitle:
      "행사 대행업체, 웨딩홀, 연회장, 전시 기획사 등에서 필요한 접이식 테이블, 연회 의자, 파티션, 무대장비, 조명 등을 도매가에 구매하세요. 즉시 출고 가능한 대량 재고를 상시 보유하며, 행사 컨셉에 맞는 다양한 디자인과 색상을 선택할 수 있습니다.",
    heroGradient: "from-fuchsia-950 to-fuchsia-600",
    features: [
      {
        icon: "🎪",
        title: "행사 전 품목 도매",
        description:
          "접이식 테이블, 연회 의자, 이동식 파티션, 간이 무대, LED 조명, 마이크·앰프 등 행사 전 품목을 도매합니다.",
      },
      {
        icon: "📦",
        title: "대량 재고 상시 보유",
        description:
          "인기 품목 수천 개를 상시 보유하여 대량 주문도 즉시 출고 가능합니다. 긴급 납기에도 대응합니다.",
      },
      {
        icon: "🎨",
        title: "디자인·색상 다양",
        description:
          "화이트, 블랙, 우드톤 등 행사 컨셉에 맞는 다양한 디자인과 색상의 집기를 보유합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "카탈로그 확인",
        description: "온라인 카탈로그에서 품목, 디자인, 규격을 확인하세요",
      },
      {
        step: 2,
        title: "수량별 견적",
        description: "수량에 따른 도매 단가와 배송비를 포함한 견적을 제공합니다",
      },
      {
        step: 3,
        title: "주문·결제",
        description: "온라인 또는 전화로 주문하고 결제를 진행합니다",
      },
      {
        step: 4,
        title: "행사장 직배송",
        description: "행사장까지 직접 배송하며, 하역 서비스도 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 행사집기 도소매 - 접이식 테이블, 연회 의자, 무대장비 등을 도매가에 대량 구매하세요. 대량 재고 즉시 출고.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "seasonal",
    title: "계절집기 도소매",
    subtitle:
      "여름 냉방(에어컨, 냉풍기, 선풍기, 서큘레이터)과 겨울 난방(온풍기, 히터, 전기장판, 라디에이터) 장비를 시즌 전 도매가에 구매하세요. 비수기 사전 주문 시 추가 할인을 적용하여 시즌 대비 비용을 절감합니다. 시즌 상품 재고 부족 전에 미리 확보하세요.",
    heroGradient: "from-red-900 to-orange-500",
    features: [
      {
        icon: "☀️",
        title: "여름 냉방 장비 도매",
        description:
          "이동식 에어컨, 산업용 냉풍기, 대형 선풍기, 서큘레이터 등 여름 냉방 장비를 도매가에 공급합니다.",
      },
      {
        icon: "❄️",
        title: "겨울 난방 장비 도매",
        description:
          "산업용 온풍기, 세라믹 히터, 전기장판, 오일 라디에이터 등 겨울 난방 장비를 도매가에 공급합니다.",
      },
      {
        icon: "📅",
        title: "비수기 사전 주문 추가 할인",
        description:
          "시즌 2개월 전 사전 주문 시 도매가에서 추가 5~10% 할인을 적용합니다. 시즌 재고 부족 걱정도 없습니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "시즌 품목 상담",
        description: "다가오는 시즌에 필요한 냉방·난방 장비를 상담합니다",
      },
      {
        step: 2,
        title: "시즌 특가 견적",
        description: "비수기 사전 주문 할인을 포함한 특가 견적을 제공합니다",
      },
      {
        step: 3,
        title: "사전 주문 확정",
        description: "시즌 전 사전 주문으로 재고를 확보하고 추가 할인을 받으세요",
      },
      {
        step: 4,
        title: "시즌 전 배송",
        description: "시즌 시작 전 여유 있게 배송하여 준비를 완료합니다",
      },
    ],
    metaDescription:
      "AOVO 계절집기 도소매 - 에어컨, 냉풍기, 온풍기, 히터 등 계절 장비를 비수기 사전 주문 할인으로 구매하세요.",
  },
  {
    category: "wholesale",
    categoryLabel: "도소매/유통",
    slug: "medical",
    title: "의료집기 도소매",
    subtitle:
      "병원, 요양원, 재활센터, 보건소 등 의료시설에 필요한 병원 침대, 사이드테이블, 의료용 수납장, 진료 데스크, 대기실 의자 등을 도매가에 구매하세요. 의료시설 기준에 맞는 항균·방염 인증 제품만 취급하며, 장기 거래 시 추가 할인과 우선 납품을 보장합니다.",
    heroGradient: "from-emerald-950 to-emerald-600",
    features: [
      {
        icon: "🏥",
        title: "의료시설 전문 집기",
        description:
          "전동 병원 침대, 오버베드 테이블, 의료용 캐비닛, 진료 데스크, 항균 대기실 의자 등 의료 전문 집기를 취급합니다.",
      },
      {
        icon: "✅",
        title: "항균·방염 인증 제품",
        description:
          "의료시설 기준에 맞는 항균 코팅, 방염 처리, 내약품성 소재의 인증 제품만 취급합니다.",
      },
      {
        icon: "🤝",
        title: "장기 거래 우대 조건",
        description:
          "연간 계약 또는 장기 거래 시 추가 할인, 우선 납품, 무상 설치 등 우대 조건을 제공합니다.",
      },
    ],
    process: [
      {
        step: 1,
        title: "시설·규격 상담",
        description: "의료시설 유형, 병상 수, 필요 품목과 규격을 상담합니다",
      },
      {
        step: 2,
        title: "도매 견적",
        description: "품목별 도매 단가와 설치비를 포함한 견적을 제공합니다",
      },
      {
        step: 3,
        title: "주문 확정",
        description: "견적 확인 후 주문을 확정하고 납기를 협의합니다",
      },
      {
        step: 4,
        title: "안전 납품·설치",
        description: "안전 포장하여 납품하고 대형 집기는 현장 설치를 지원합니다",
      },
    ],
    metaDescription:
      "AOVO 의료집기 도소매 - 병원 침대, 의료용 수납장 등을 항균·방염 인증 제품으로 도매가에 구매하세요. 장기 거래 우대.",
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
