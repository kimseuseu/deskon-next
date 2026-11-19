import { COMPANY } from "@/lib/constants";

/**
 * 회사 소개 문장의 단일 소스. 홈, /about, 메타 설명, 조직 구조화 데이터가 모두 여기서 가져갑니다.
 *
 * 네이버 «아오보» 검색 대응(docs/naver-brand-search-strategy.md)으로 만든 것입니다.
 * 검색 요약 글과 AI 브리핑은 «X 는 ~하는 Y 입니다» 꼴의 정의 문장, 품목 목록, 번호가 붙은 절차를
 * 그대로 가져다 씁니다. 그래서 여기 문장은 구호가 아니라 사실 문장으로 씁니다.
 *
 * 업력은 COMPANY.years(22년, 2026-11-19 사용자 확인) 하나만 씁니다. 설립 연도는 적지 않습니다(법인 설립 연도와
 * 업력의 시작이 달라 구조화 데이터의 foundingDate 도 넣지 않음). 거래 기업 수와 요금은 넣지 않습니다.
 */
export const companyIntro = {
  /** 한 문장 정의. 어디서든 이 문장으로 시작합니다. */
  definition:
    "아오보(AOVO)는 주식회사 킴샵이 운영하는 비즈니스 장비 구독 · 공유 · 렌탈 · 재정비 중고 · 매입 서비스입니다.",
  /** 정의 뒤에 붙는 둘째 문장. 무엇을 다루는지. */
  scope:
    "사무용 의자와 사무가구, 롤테이너 같은 물류장비, 주방집기를 사지 않고 빌려 쓰게 하고, 행사장 급배수 설치와 가스기기 임대도 직접 합니다.",
  /** 메타 설명(검색 결과 요약 글). 160자 안팎. */
  metaDescription: `아오보(AOVO)는 주식회사 킴샵이 운영하는 비즈니스 장비 구독 · 공유 · 렌탈 · 재정비 중고 · 매입 서비스입니다. 사무용 의자, 사무가구, 물류장비, 주방집기를 빌려 쓰고, 행사장 급배수 설치와 가스기기 임대도 합니다. 대표 전화 ${COMPANY.phone}.`,
  /** 같은 이름을 쓰는 다른 주체와 섞이지 않게 하는 한 줄. */
  disambiguation:
    "아오보(AOVO)는 전동킥보드 브랜드 AOVO, 협동로봇 기업 AUBO(아오보)와 관계가 없는 한국의 비즈니스 장비 운영 서비스입니다.",
} as const;

/** 서비스 방식 비교. /about 소개 구역의 표가 됩니다. 내용은 src/data/divisions.ts 와 같습니다. */
export const serviceModes = [
  { name: "구독", href: "/subscribe", how: "매달 정액으로 쓰고, 쓰지 않게 되면 반납합니다.", items: "사무용 의자, 롤테이너, 파랫트, 주방집기, 냉난방기" },
  { name: "공유", href: "/sharing", how: "에이플로우(A-flow) 앱으로 QR 코드를 찍어 시간 단위로 빌리고 반납합니다.", items: "롤테이너, 카트, 스테커, 행사장 장비" },
  { name: "렌탈", href: "/rental", how: "1개월부터 36개월까지 기간을 정해 계약하고, 설치와 유지보수, 회수를 함께 맡깁니다.", items: "사무가구, 주방집기, 행사집기, 이동식 에어컨, 물류장비" },
  { name: "자산연대(재정비 중고)", href: "/recycle", how: "회수한 장비를 검수하고 재정비해 다시 공급합니다.", items: "사무용 의자, 사무가구, 물류장비, 주방집기" },
  { name: "유통(매입)", href: "/buyback", how: "이전, 리모델링, 폐업으로 처분하는 장비를 방문해서 매입합니다.", items: "사무가구, 물류장비, 행사집기, 업소용 집기" },
] as const;

/** 문의부터 회수까지. 번호 목록으로 그립니다. */
export const inquirySteps = [
  "품목과 수량, 쓸 기간을 전화나 카카오톡 채널, 문의 양식으로 알려 주십니다.",
  "현장 조건에 맞춰 구독, 공유, 렌탈 가운데 맞는 방식과 견적을 안내합니다.",
  "일정에 맞춰 배송하고 설치합니다.",
  "쓰는 동안 점검과 교체를 맡습니다.",
  "기간이 끝나면 현장에서 회수합니다.",
] as const;

export interface IntroQA {
  q: string;
  /** 답의 첫 문장. 구조화 데이터와 화면이 같이 씁니다. */
  a: string;
  /** 화면에서 답 아래에 붙는 것 */
  extra?: "modes" | "steps";
}

/** /about «아오보 소개» 구역의 질문과 답. FAQPage 구조화 데이터로도 나갑니다. */
export const introQA: IntroQA[] = [
  {
    q: "아오보는 어떤 회사인가요?",
    a: `${companyIntro.definition} ${companyIntro.scope} 본사는 ${COMPANY.address}에 있고 대표 전화는 ${COMPANY.phone}입니다.`,
  },
  {
    q: "아오보와 킴샵은 어떤 관계인가요?",
    a: `아오보(AOVO Group)는 브랜드 이름이고, 운영 법인은 ${COMPANY.legalName}(대표 ${COMPANY.ceo}, 사업자등록번호 ${COMPANY.bizNumber})입니다. 킴샵이 ${COMPANY.years}년 동안 해 온 장비 렌탈과 설비 일을 구독, 공유, 재정비 중고, 매입까지 넓혀 한곳에 모은 이름이 아오보입니다.`,
  },
  {
    q: "아오보에서 무엇을 이용할 수 있나요?",
    a: "사무용 의자, 책상과 파티션 같은 사무가구, 롤테이너와 카트 같은 물류장비, 업소용 주방집기, 이동식 에어컨 같은 계절 장비를 이용할 수 있습니다. 행사장에는 급배수 설비와 가스기기를 직접 설치합니다.",
  },
  {
    q: "구독, 공유, 렌탈은 어떻게 다른가요?",
    a: "구독은 매달 정액으로 쓰다가 필요 없으면 반납하는 방식이고, 공유는 앱으로 시간 단위로 빌리는 방식이며, 렌탈은 기간을 정해 설치와 회수까지 맡기는 방식입니다.",
    extra: "modes",
  },
  {
    q: "문의하면 어떤 순서로 진행되나요?",
    a: "문의, 견적, 설치, 운영 관리, 회수의 다섯 단계로 진행됩니다.",
    extra: "steps",
  },
  {
    q: "어디로 문의하면 되나요?",
    a: `전화 ${COMPANY.phone}, 카카오톡 채널 «아오보», 홈페이지 문의 양식 가운데 편한 쪽으로 주시면 됩니다. 상담 시간은 평일 09:00부터 18:00까지입니다.`,
  },
];

/** 구조화 데이터용 답. 표와 목록이 붙는 답은 그 내용을 문장으로 이어 붙입니다. */
export function introAnswerText(item: IntroQA): string {
  if (item.extra === "modes") {
    return `${item.a} ${serviceModes.map((m) => `${m.name}: ${m.how}`).join(" ")}`;
  }
  if (item.extra === "steps") {
    return `${item.a} ${inquirySteps.map((s, i) => `${i + 1}. ${s}`).join(" ")}`;
  }
  return item.a;
}

/**
 * 공식 채널. 조직 구조화 데이터의 sameAs 로 나가고(네이버 «사이트 연관채널»), 바닥글에도 같은 주소로 섭니다.
 * 우리가 운영하는 것이 확인된 채널만 넣습니다(2026-11-19 사용자 확인: 카카오톡 채널, 네이버 블로그 둘, 스마트스토어).
 * footer 가 true 인 것만 바닥글에 보입니다.
 */
export const officialChannels = [
  { label: "카카오 채널", url: "https://pf.kakao.com/_qxkxnRX", footer: true },
  { label: "네이버 블로그", url: "https://blog.naver.com/kimshop365", footer: true },
  { label: "네이버 블로그(킴샵)", url: "https://blog.naver.com/kimshop19", footer: false },
  { label: "스마트스토어", url: "https://smartstore.naver.com/kimshop19", footer: true },
] as const;
