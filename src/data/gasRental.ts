/**
 * 가스기기 임대 카탈로그 — /gas(광고)와 /gas/rental(상품 목록)이 함께 쓰는 단일 소스.
 *
 * 협력업체 이름은 화면에 내지 않습니다(사용자 지시, 2026-10-21). partner와 sourceUrl은
 * 출처 기록용이고 렌더하지 않습니다. 협력업체 자체 제작품의 maker는 «아오보»입니다.
 *
 * 제품 정보와 사진의 출처(내부 기록):
 *   푸드앤머신   worldvending.com    행사 간식 기기 렌탈 전문(하남)
 *   주방뱅크     jubangbank.co.kr    황학동 업소용 주방기기 종합(서울)
 *   성진하이쿨   icepia.co.kr        스테인리스 가스렌지 자체 제작·린나이 유통(고양)
 *
 * 가격은 싣지 않습니다. 모든 기기는 임대 설치 기준이고, 견적은 기간·수량·현장에
 * 따라 달라지므로 상담으로 안내합니다. 규격은 협력업체 상세 페이지에 적힌 값만
 * 옮겼고, 적혀 있지 않은 값은 비워 두었습니다.
 */

export type PartnerId = "foodnmachine" | "jubangbank" | "sjhicool";

export interface RentalPartner {
  id: PartnerId;
  name: string;
  nameEn: string;
  /** 우리 라인업에서 맡는 역할 */
  role: string;
  location: string;
  url: string;
}

export const partners: RentalPartner[] = [
  {
    id: "sjhicool",
    name: "성진하이쿨",
    nameEn: "Sungjin Hicool",
    role: "스테인리스 간택기 · 낮은렌지 · 그리들 자체 제작, 린나이 업소용 기기",
    location: "경기 고양",
    url: "https://icepia.co.kr/",
  },
  {
    id: "jubangbank",
    name: "주방뱅크",
    nameEn: "Jubang Bank",
    role: "황학동 업소용 주방기기 종합, 제작 렌지 · 회전국솥 · 중화렌지",
    location: "서울 황학동",
    url: "https://www.jubangbank.co.kr/",
  },
  {
    id: "foodnmachine",
    name: "푸드앤머신",
    nameEn: "Food & Machine",
    role: "축제 · 행사장 간식 조리기기 렌탈",
    location: "경기 하남",
    url: "https://worldvending.com/",
  },
];

export const partnerById = Object.fromEntries(partners.map((p) => [p.id, p])) as Record<
  PartnerId,
  RentalPartner
>;

export type CategoryId = "range" | "kettle" | "griddle" | "snack";

export interface RentalCategory {
  id: CategoryId;
  title: string;
  /** 광고 장면의 큰 문장 */
  headline: string;
  lead: string;
  /** 어떤 메뉴·현장에 맞는지 */
  fits: string;
}

export const categories: RentalCategory[] = [
  {
    id: "range",
    title: "간택기 · 렌지",
    headline: "국밥 200그릇, 화구 열두 개면 됩니다.",
    lead:
      "행사장 임시주방의 기본은 화구 수입니다. 900 폭 6구부터 1800 폭 15구 간택기까지, 큰 솥을 올리는 낮은렌지와 탕렌지, 볶음용 중화렌지를 부스 메뉴에 맞춰 골라 드립니다.",
    fits: "국밥 · 탕 · 찌개 부스, 급식소, 식당 임시 주방",
  },
  {
    id: "kettle",
    title: "회전국솥 · 취반기",
    headline: "수백 인분을 한 번에, 기울여서 따릅니다.",
    lead:
      "150인분에서 500인분까지 끓이는 린나이 회전국솥과 150인용 가스취반기. 급식과 대형 행사 배식은 솥 하나로 리듬이 정해집니다. 운송과 설치, 가스 연결까지 함께 갑니다.",
    fits: "급식소, 대형 행사 배식, 단체 식사",
  },
  {
    id: "griddle",
    title: "그리들 · 구이 · 튀김",
    headline: "철판 한 장이 메뉴 하나입니다.",
    lead:
      "부침과 철판 메뉴는 그리들, 스테이크와 생선은 그릴러, 치킨과 핫도그는 가스튀김기. 기름 받이와 뚜껑이 있는 기기를 골라 철거까지 깨끗하게 끝냅니다.",
    fits: "부침 · 철판 · 구이 · 튀김 부스",
  },
  {
    id: "snack",
    title: "행사 간식 기기",
    headline: "축제의 냄새는 여기서 납니다.",
    lead:
      "떡볶이판, 호떡 전판, 꼬치구이, 가스 찜솥, 군고구마와 군밤 기계. 가을 축제와 겨울 장터에 가장 많이 나가는 가스식 간식 기기를 행사 기간만큼 빌려 드립니다.",
    fits: "지역 축제, 플리마켓, 학교 · 교회 바자회, 겨울 장터",
  },
];

export interface RentalProduct {
  id: string;
  category: CategoryId;
  name: string;
  /** 제조 브랜드. 협력업체 자체 제작이면 협력업체 이름 */
  maker: string;
  partner: PartnerId;
  model?: string;
  /** 카드에 한 줄로 서는 쓰임새 */
  tagline: string;
  /** 규격. 협력업체 페이지에 적힌 값만 */
  specs: string[];
  image: string;
  imageAlt: string;
  sourceUrl: string;
  /** /gas 광고 장면에 올라가는 대표 기기 */
  featured?: boolean;
  /**
   * 묶음마다 뜻이 다른 큰 라벨. 묶음별 장면이 이걸로 기기를 세웁니다.
   *   range    화구 수 (6구, 12구)      kettle  한 번에 끓이는 인분
   *   griddle  맞는 메뉴 (부침 · 철판)   snack   나가는 철
   */
  facet?: string;
}

export const products: RentalProduct[] = [
  // ── 간택기 · 렌지 ──
  {
    id: "sj-gantaek-1500",
    facet: "12구",
    category: "range",
    name: "간택기 1500 (올)",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "링구 12구, 국밥 부스의 표준",
    specs: ["W1500 × D600 × H850", "링구 12구", "49,200 kcal/h", "STS201", "LNG · LPG"],
    image: "/images/gas-rental/sj-gantaek-1500.webp",
    imageAlt: "링구 12구가 네 줄로 놓인 1500 폭 스테인리스 간택기",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7581",
    featured: true,
  },
  {
    id: "sj-gantaek-900",
    facet: "6구",
    category: "range",
    name: "간택기 900 (올)",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "작은 부스에 맞는 6구",
    specs: ["W900 × D600 × H850", "링구 6구", "24,600 kcal/h", "STS201", "LNG · LPG"],
    image: "/images/gas-rental/sj-gantaek-900.webp",
    imageAlt: "링구 6구의 900 폭 스테인리스 간택기",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7606",
  },
  {
    id: "jb-gantaek-1800",
    facet: "양열 1800",
    category: "range",
    name: "1800 양열 간텍기렌지 (제작품)",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-Z15-003",
    tagline: "양쪽에서 조리하는 가장 긴 폭",
    specs: ["W1800 × D600 × H800", "양열", "STS201"],
    image: "/images/gas-rental/jb-gantaek-1800.webp",
    imageAlt: "양쪽으로 화구가 배열된 1800 폭 간택기렌지",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=43315",
  },
  {
    id: "sj-low-600",
    facet: "낮은 1구",
    category: "range",
    name: "낮은렌지 1구 600",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "큰 솥 하나를 무릎 높이에",
    specs: ["W600 × D600 × H450", "1구", "STS201", "LNG · LPG"],
    image: "/images/gas-rental/sj-low-600.webp",
    imageAlt: "대형 화구 하나를 갖춘 600 폭 스테인리스 낮은렌지",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7545",
    featured: true,
  },
  {
    id: "jb-low-1200",
    facet: "낮은 2구",
    category: "range",
    name: "2구 낮은렌지 1200",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-J8-252",
    tagline: "들통 두 개를 나란히",
    specs: ["W1200 × D600 × H450", "2구"],
    image: "/images/gas-rental/jb-low-1200.webp",
    imageAlt: "화구 두 개가 나란히 놓인 1200 폭 낮은렌지",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=22175",
  },
  {
    id: "sj-high-4-1200",
    facet: "4구",
    category: "range",
    name: "높은렌지 4구 1200",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "서서 조리하는 일반 화구 4개",
    specs: ["W1200 × D600 × H850", "2열 2구 + 링구 2구", "STS201", "LNG · LPG"],
    image: "/images/gas-rental/sj-high-4-1200.webp",
    imageAlt: "화구 네 개를 갖춘 1200 폭 스테인리스 높은렌지",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7557",
  },
  {
    id: "sj-rinnai-rsb907s",
    facet: "탁상 7구",
    category: "range",
    name: "린나이 고화력 탁상형 7구 가스렌지",
    maker: "린나이",
    partner: "sjhicool",
    model: "RSB-907S",
    tagline: "작업대 위에 올리는 7구",
    specs: ["탁상형", "7구", "LNG · LPG"],
    image: "/images/gas-rental/sj-rinnai-rsb907s.webp",
    imageAlt: "작업대 위에 올려 쓰는 린나이 탁상형 7구 가스렌지",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7434",
  },
  {
    id: "jb-tang-3",
    facet: "탕 3열",
    category: "range",
    name: "3열 탕렌지",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-T18-005",
    tagline: "국통 전용 고화력, 물통 용량으로 고릅니다",
    specs: ["18 ~ 60L 물통 선택", "W650 ~ 850 × H500", "19,780 kcal/h (LNG)", "LNG · LPG"],
    image: "/images/gas-rental/jb-tang-3.webp",
    imageAlt: "대형 국통을 올리는 3열 버너 탕렌지",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=54056",
  },
  {
    id: "jb-sigma-wok",
    facet: "중화 1~2구",
    category: "range",
    name: "시그마 스마트 중화렌지",
    maker: "시그마",
    partner: "jubangbank",
    model: "DK-H16-019",
    tagline: "터치로 약불에서 강불까지",
    specs: ["750 · 1200 · 1500 폭", "1구 ~ 2구 + 보조 1구", "W750 ~ 1500 × D850 × H800"],
    image: "/images/gas-rental/jb-sigma-wok.webp",
    imageAlt: "시그마 버너를 단 스테인리스 중화렌지",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=46725",
    featured: true,
  },

  // ── 회전국솥 · 취반기 ──
  {
    id: "sj-kettle-rskn201t",
    facet: "200인분",
    category: "kettle",
    name: "린나이 회전국솥 통스텐 200인용",
    maker: "린나이",
    partner: "sjhicool",
    model: "RSKN-201T",
    tagline: "급식소 기본 사이즈",
    specs: ["200인용", "W1392 × D1000 × H930", "통스텐", "LNG · LPG"],
    image: "/images/gas-rental/sj-kettle-rskn201t.webp",
    imageAlt: "측면 회전 손잡이가 달린 린나이 200인용 통스텐 회전국솥",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7103",
    featured: true,
  },
  {
    id: "sj-kettle-rskn501t",
    facet: "500인분",
    category: "kettle",
    name: "린나이 회전국솥 통스텐 500인용",
    maker: "린나이",
    partner: "sjhicool",
    model: "RSKN-501T",
    tagline: "대형 행사 배식의 끝",
    specs: ["500인용", "통스텐", "LNG · LPG"],
    image: "/images/gas-rental/sj-kettle-rskn501t.webp",
    imageAlt: "린나이 500인용 통스텐 회전국솥",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7105",
  },
  {
    id: "jb-kettle-gas",
    facet: "200 · 300 · 500인분",
    category: "kettle",
    name: "가스 회전식 국솥",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-T6-009",
    tagline: "200 · 300 · 500 세 가지 크기",
    specs: ["W1400 ~ 1650 × D1100 ~ 1300 × H840 ~ 900", "내피 스테인리스", "외피 철 · 스테인리스 선택"],
    image: "/images/gas-rental/jb-kettle-gas.webp",
    imageAlt: "스테인리스 내피의 가스 회전식 국솥",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=55742",
  },
  {
    id: "sj-rice-rra151a",
    facet: "밥 150인분",
    category: "kettle",
    name: "린나이 가스취반기 150인용",
    maker: "린나이",
    partner: "sjhicool",
    model: "RRA-151A",
    tagline: "밥 150인분을 한 번에",
    specs: ["150인용", "W700 × D727 × H1247", "내솥 알루미늄", "LNG · LPG"],
    image: "/images/gas-rental/sj-rice-rra151a.webp",
    imageAlt: "린나이 150인용 가스취반기",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7160",
    featured: true,
  },
  {
    id: "jb-rice-rr55g",
    facet: "밥 55인분",
    category: "kettle",
    name: "린나이 가스밥솥 55인용",
    maker: "린나이",
    partner: "jubangbank",
    model: "RR-55G",
    tagline: "작은 부스의 밥솥",
    specs: ["20 ~ 55인용", "W526 × D481 × H434", "8,400 kcal/h (LNG)", "16 kg", "LNG · LPG"],
    image: "/images/gas-rental/jb-rice-rr55g.webp",
    imageAlt: "린나이 55인용 가스밥솥",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=23102",
  },

  // ── 그리들 · 구이 · 튀김 ──
  {
    id: "sj-griddle-900",
    facet: "부침 · 철판",
    category: "griddle",
    name: "그리들 부침전판 900",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "전과 철판 메뉴의 기본 폭",
    specs: ["W900 × D600 × H850", "일자 3구", "스테인리스", "LNG · LPG"],
    image: "/images/gas-rental/sj-griddle-900.webp",
    imageAlt: "900 폭 스테인리스 가스 그리들 부침전판",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7518",
    featured: true,
  },
  {
    id: "jb-griddle-gas",
    facet: "부침 · 철판",
    category: "griddle",
    name: "가스그리들 1500",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-R10-016",
    tagline: "기름 받이와 뚜껑이 있는 넓은 철판",
    specs: ["W1500 × D600 × H900", "상판 STS304 · 판 철", "기름 받이 · 뚜껑"],
    image: "/images/gas-rental/jb-griddle-gas.webp",
    imageAlt: "앞쪽 기름 받이와 뚜껑이 있는 1500 폭 가스그리들",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=47398",
  },
  {
    id: "sj-rinnai-rsb450h",
    facet: "부침 · 철판",
    category: "griddle",
    name: "린나이 가스 부침기 테이블용",
    maker: "린나이",
    partner: "sjhicool",
    model: "RSB-450H",
    tagline: "작업대 위에 올리는 소형 부침기",
    specs: ["W450 × D600 × H360", "테이블용", "LNG · LPG"],
    image: "/images/gas-rental/sj-rinnai-rsb450h.webp",
    imageAlt: "린나이 테이블용 가스 부침기",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=3274",
  },
  {
    id: "sj-griller-900",
    facet: "스테이크 · 생선",
    category: "griddle",
    name: "스테이크그릴러 900",
    maker: "아오보",
    partner: "sjhicool",
    tagline: "스테이크와 생선에 불자국을",
    specs: ["W900 × D600 × H850", "삿갓버너 4구", "18,500 kcal/h", "LNG · LPG"],
    image: "/images/gas-rental/sj-griller-900.webp",
    imageAlt: "900 폭 스테인리스 가스 스테이크그릴러",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=7473",
  },
  {
    id: "sj-rinnai-r92wsv",
    facet: "생선구이",
    category: "griddle",
    name: "린나이 하화식 가스 그릴",
    maker: "린나이",
    partner: "sjhicool",
    model: "R-92WSV",
    tagline: "생선구이 부스의 단골",
    specs: ["하화식", "LNG · LPG"],
    image: "/images/gas-rental/sj-rinnai-r92wsv.webp",
    imageAlt: "린나이 하화식 가스 그릴 구이기",
    sourceUrl: "https://icepia.co.kr/product/detail.html?product_no=3280",
  },
  {
    id: "jb-bbq-range",
    facet: "바베큐 · 삼겹살",
    category: "griddle",
    name: "가스 숯불 바베큐 렌지",
    maker: "아오보",
    partner: "jubangbank",
    model: "DK-A8-557",
    tagline: "가스로 숯을 피워 불맛을 냅니다",
    specs: ["600 · 900 · 1200 · 1500 폭", "D600 × H800", "원뿔 버너, 기름 흘러내림"],
    image: "/images/gas-rental/jb-bbq-range.webp",
    imageAlt: "가스로 숯을 가열하는 바베큐 렌지",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=61730",
    featured: true,
  },
  {
    id: "jb-fryer-rfam20g",
    facet: "치킨 · 핫도그",
    category: "griddle",
    name: "린나이 프리미엄 가스튀김기 22L",
    maker: "린나이",
    partner: "jubangbank",
    model: "RFA-M20G",
    tagline: "치킨 부스 1구 기본",
    specs: ["22L", "W450 × D615 × H1000", "LNG · LPG"],
    image: "/images/gas-rental/jb-fryer-rfam20g.webp",
    imageAlt: "린나이 22리터 스탠드형 가스튀김기",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=18756",
    featured: true,
  },
  {
    id: "jb-fryer-22x2",
    facet: "치킨 · 감자",
    category: "griddle",
    name: "상업용 가스튀김기 2구 22L × 2",
    maker: "그랜드우성",
    partner: "jubangbank",
    model: "DK-A8-500",
    tagline: "22리터 두 통, 메뉴 둘을 동시에",
    specs: ["22L × 2구", "스탠드형"],
    image: "/images/gas-rental/jb-fryer-22x2.webp",
    imageAlt: "튀김통 두 개를 갖춘 스탠드형 가스튀김기",
    sourceUrl: "https://www.jubangbank.co.kr/goods/detail.asp?gno=42443",
  },

  // ── 행사 간식 기기 ──
  {
    id: "fm-tteok",
    facet: "사계절",
    category: "snack",
    name: "가스식 떡볶이판",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "축제 부스 1번 메뉴",
    specs: ["가스식", "렌탈 전용"],
    image: "/images/gas-rental/fm-tteok.webp",
    imageAlt: "가스식 떡볶이판",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=689",
    featured: true,
  },
  {
    id: "fm-hotteok",
    facet: "가을 · 겨울",
    category: "snack",
    name: "가스식 호떡 · 토스트 · 전판",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "호떡, 토스트, 전을 한 판으로",
    specs: ["가스식", "렌탈 전용"],
    image: "/images/gas-rental/fm-hotteok.webp",
    imageAlt: "가스식 호떡 토스트 전판",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=691",
  },
  {
    id: "fm-skewer",
    facet: "사계절",
    category: "snack",
    name: "가스식 꼬치구이기",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "닭꼬치 · 소떡소떡",
    specs: ["가스식", "렌탈 전용"],
    image: "/images/gas-rental/fm-skewer.webp",
    imageAlt: "가스식 꼬치구이기",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=699",
    featured: true,
  },
  {
    id: "fm-steamer",
    facet: "겨울",
    category: "snack",
    name: "가스식 찜솥",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "만두 · 순대 · 호빵",
    specs: ["가스식", "렌탈 전용"],
    image: "/images/gas-rental/fm-steamer.webp",
    imageAlt: "가스식 찜솥",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=239",
  },
  {
    id: "fm-sweetpotato",
    facet: "겨울",
    category: "snack",
    name: "가스식 군고구마 구이기 5구",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "겨울 장터의 얼굴",
    specs: ["가스식 5구", "렌탈 전용"],
    image: "/images/gas-rental/fm-sweetpotato.webp",
    imageAlt: "가스식 5구 군고구마 구이기",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=25",
    featured: true,
  },
  {
    id: "fm-chestnut",
    facet: "겨울",
    category: "snack",
    name: "가스식 군밤 기계",
    maker: "아오보",
    partner: "foodnmachine",
    tagline: "회전 드럼으로 고르게 굽습니다",
    specs: ["가스식", "렌탈 전용"],
    image: "/images/gas-rental/fm-chestnut.webp",
    imageAlt: "가스식 회전 군밤 기계",
    sourceUrl: "https://worldvending.com/product/detail.html?product_no=673",
  },
];

export const productsByCategory = (id: CategoryId) => products.filter((p) => p.category === id);

export const featuredByCategory = (id: CategoryId) =>
  products.filter((p) => p.category === id && p.featured);

export const productById = (id: string) => products.find((p) => p.id === id)!;

/** 간택기 폭 사다리. 폭이 넓어질수록 화구가 늘어납니다. 화구 수는 상세 페이지에 적힌 값만. */
export const rangeWidths = [
  { width: 900, burners: "6구" },
  { width: 1200 },
  { width: 1500, burners: "12구" },
  { width: 1800, burners: "15구" },
];

/** 국솥 · 취반기를 인분 순으로. 숫자는 묶음 장면의 큰 눈금이 됩니다. */
export const kettleLadder = [
  { id: "jb-rice-rr55g", servings: 55, label: "밥" },
  { id: "sj-rice-rra151a", servings: 150, label: "밥" },
  { id: "sj-kettle-rskn201t", servings: 200, label: "국" },
  { id: "sj-kettle-rskn501t", servings: 500, label: "국" },
];

/** 메뉴에서 기기로. 그리들 · 구이 · 튀김 묶음은 메뉴 이름이 입구입니다. */
export const menuPairs = [
  { menu: "부침 · 철판", id: "sj-griddle-900" },
  { menu: "스테이크 · 생선", id: "sj-griller-900" },
  { menu: "바베큐 · 삼겹살", id: "jb-bbq-range" },
  { menu: "치킨 · 핫도그", id: "jb-fryer-rfam20g" },
];

/** 임대에 포함되는 것. 카탈로그 페이지와 광고 장면이 같은 문장을 씁니다. */
export const rentalTerms = {
  title: "임대에 포함되는 것",
  items: [
    { title: "운송과 설치", description: "현장까지 싣고 가서 자리를 잡고, 배관과 중간밸브, 조절기까지 연결합니다." },
    { title: "가스 종류 맞춤", description: "현장이 LNG인지 LPG인지에 맞춰 노즐과 조절기를 세팅해 보냅니다." },
    { title: "사용 전 안전점검", description: "누설 점검과 점화 확인을 마친 뒤 사용법을 설명하고 돌아갑니다." },
    { title: "철거와 회수", description: "행사가 끝나면 다시 와서 분리하고 싣고 갑니다. 청소는 기본 사용 상태면 됩니다." },
  ],
  note: "임대 기간은 하루부터 가능하고, 기간 · 수량 · 지역에 따라 견적이 달라집니다. 메뉴와 부스 도면만 알려주시면 기기 구성부터 함께 잡아 드립니다.",
};
