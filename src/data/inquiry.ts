/**
 * 견적 문의(/support/contact)의 단계형 폼이 고르는 보기들.
 * 분야마다 묻는 항목이 다르므로, 분야 설정 하나에 규모·수량·세부 옵션을 다 적습니다.
 * 화면 문구와 저장 형식은 전부 여기서 파생됩니다. 수정은 여기서만.
 */

export type InquiryFieldSlug =
  | "water"
  | "gas"
  | "rental"
  | "subscribe"
  | "sharing"
  | "recycle"
  | "other";

export interface ChoiceOption {
  value: string;
  label: string;
  /** 칩 밑에 작게 서는 보조 설명 */
  hint?: string;
}

export interface InquiryField {
  slug: InquiryFieldSlug;
  label: string;
  labelEn: string;
  /** 카드에 두 줄로 서는 설명. 문장 하나가 한 줄입니다. */
  description: string;
  /** 분야 카드 왼쪽 위의 짧은 표식 */
  mark: string;
  /** 현장 정보 단계: 규모를 묻는 칩 묶음 */
  scale?: { label: string; options: ChoiceOption[] };
  /** 현장 정보 단계: 수를 세는 스테퍼 */
  count?: { label: string; unit: string; min: number; max: number; step: number; initial: number };
  /** 세부 요청 단계: 여러 개 고르는 옵션 칩 */
  options: { label: string; items: ChoiceOption[] };
  /** 자유 메모 입력칸의 안내 문구 */
  memoPlaceholder: string;
}

export const REGION_OPTIONS: ChoiceOption[] = [
  { value: "seoul", label: "서울" },
  { value: "gyeonggi", label: "경기" },
  { value: "incheon", label: "인천" },
  { value: "chungcheong", label: "충청" },
  { value: "gangwon", label: "강원" },
  { value: "other", label: "그 외 지역" },
];

export const DURATION_OPTIONS: ChoiceOption[] = [
  { value: "1d", label: "하루" },
  { value: "2-3d", label: "2~3일" },
  { value: "1w", label: "일주일" },
  { value: "1m", label: "한 달 이상" },
  { value: "tbd", label: "미정" },
];

export const INQUIRY_FIELDS: InquiryField[] = [
  {
    slug: "water",
    label: "급배수",
    labelEn: "Water Works",
    description: "행사장 급수 인입부터 배수, 오폐수 처리까지.\n물탱크와 호스, 회수차를 한 팀이 맡습니다.",
    mark: "W",
    scale: {
      label: "하루 급수량",
      options: [
        { value: "lt1t", label: "1톤 미만" },
        { value: "1-5t", label: "1~5톤" },
        { value: "5-10t", label: "5~10톤" },
        { value: "gt10t", label: "10톤 이상" },
        { value: "unknown", label: "잘 모르겠어요" },
      ],
    },
    count: { label: "물이 필요한 부스 수", unit: "곳", min: 1, max: 60, step: 1, initial: 4 },
    options: {
      label: "필요한 작업",
      items: [
        { value: "supply", label: "급수 연결", hint: "급수차 · 물탱크 · 호스" },
        { value: "drain", label: "배수 처리", hint: "싱크대 배수 · 회수 탱크" },
        { value: "sewage", label: "오폐수 수거", hint: "회수차 · 처리 대행" },
        { value: "tank", label: "물탱크 설치", hint: "1톤 단위" },
        { value: "hotwater", label: "온수 공급" },
        { value: "sink", label: "싱크대 임대" },
        { value: "night", label: "야간·새벽 작업" },
      ],
    },
    memoPlaceholder: "예) 푸드트럭 8대와 세척 부스 2곳, 토요일 새벽 설치 후 일요일 밤 철거",
  },
  {
    slug: "gas",
    label: "가스기기 임대",
    labelEn: "Gas Rental",
    description: "간택기, 회전국솥, 그리들을 행사 기간만큼.\n운송과 설치, 배관 연결, 철거까지 포함합니다.",
    mark: "G",
    scale: {
      label: "배식 규모",
      options: [
        { value: "lt100", label: "100인분 미만" },
        { value: "100-300", label: "100~300인분" },
        { value: "300-1000", label: "300~1,000인분" },
        { value: "gt1000", label: "1,000인분 이상" },
        { value: "unknown", label: "잘 모르겠어요" },
      ],
    },
    count: { label: "조리 부스 수", unit: "곳", min: 1, max: 40, step: 1, initial: 2 },
    options: {
      label: "필요한 기기와 작업",
      items: [
        { value: "range", label: "간택기 · 낮은렌지" },
        { value: "pot", label: "회전국솥 · 취반기" },
        { value: "griddle", label: "그리들 · 튀김기" },
        { value: "induction", label: "인덕션", hint: "가스 반입 제한 현장" },
        { value: "snack", label: "행사 간식 기기" },
        { value: "piping", label: "배관 · 안전점검" },
        { value: "teardown", label: "철거 · 회수 포함" },
      ],
    },
    memoPlaceholder: "예) 국밥 부스 3곳, 전 부스 2곳. 실내 전시장이라 가스 반입 가능 여부 확인 필요",
  },
  {
    slug: "rental",
    label: "렌탈",
    labelEn: "Rental",
    description: "냉난방기, 제습기, 가구, IT 장비를 기간제로.\n현장 배송과 회수가 포함됩니다.",
    mark: "R",
    scale: {
      label: "이용 기간",
      options: [
        { value: "event", label: "행사 기간만" },
        { value: "1-3m", label: "1~3개월" },
        { value: "3-12m", label: "3~12개월" },
        { value: "gt12m", label: "1년 이상" },
      ],
    },
    count: { label: "필요 수량", unit: "대", min: 1, max: 500, step: 1, initial: 10 },
    options: {
      label: "필요한 품목",
      items: [
        { value: "hvac", label: "냉난방기" },
        { value: "dehumidifier", label: "제습기" },
        { value: "furniture", label: "사무가구 · 행사 가구" },
        { value: "it", label: "IT 장비" },
        { value: "kitchen", label: "주방집기" },
        { value: "medical", label: "의료 · 복지 장비" },
        { value: "delivery", label: "설치 · 회수 포함" },
      ],
    },
    memoPlaceholder: "예) 전시 부스 20곳에 둘 1인 책상과 의자, 전시 3일 전 반입",
  },
  {
    slug: "subscribe",
    label: "구독",
    labelEn: "Subscription",
    description: "체어, 롤테이너, 파렛트를 월정액으로.\n멈추면 비용도 멈추는 종량형입니다.",
    mark: "S",
    scale: {
      label: "운영 규모",
      options: [
        { value: "lt10", label: "10개 미만" },
        { value: "10-50", label: "10~50개" },
        { value: "50-200", label: "50~200개" },
        { value: "gt200", label: "200개 이상" },
      ],
    },
    options: {
      label: "관심 품목",
      items: [
        { value: "chair", label: "오피스 체어" },
        { value: "rolltainer", label: "롤테이너" },
        { value: "pallet", label: "파렛트" },
        { value: "intainer", label: "인테이너" },
        { value: "movingbox", label: "이사바구니" },
        { value: "kitchen", label: "주방집기" },
        { value: "hvac", label: "냉난방기" },
      ],
    },
    memoPlaceholder: "예) 신규 사무실 40석, 입주일 기준 일주일 전 설치",
  },
  {
    slug: "sharing",
    label: "공유",
    labelEn: "Sharing",
    description: "카트, 롤테이너, 스태커를 쓰는 날만.\n물류 현장과 행사장에 공급합니다.",
    mark: "C",
    count: { label: "필요 수량", unit: "대", min: 1, max: 1000, step: 5, initial: 20 },
    options: {
      label: "관심 품목",
      items: [
        { value: "cart", label: "핸드카트" },
        { value: "rolltainer", label: "롤테이너" },
        { value: "stacker", label: "스태커" },
        { value: "stair", label: "계단용 카트" },
        { value: "airport", label: "공항형 카트" },
        { value: "event", label: "행사용 운반 장비" },
      ],
    },
    memoPlaceholder: "예) 물류센터 성수기 두 달 동안 롤테이너 100대 추가",
  },
  {
    slug: "recycle",
    label: "자산 매입 · 유통",
    labelEn: "Buyback",
    description: "쓰던 물류장비, 사무가구, 주방집기를 매입합니다.\n상태를 보고 적정가를 제안합니다.",
    mark: "B",
    scale: {
      label: "물량",
      options: [
        { value: "lt1t", label: "1톤 트럭 1대 미만" },
        { value: "1-5t", label: "1톤 트럭 1~5대" },
        { value: "gt5t", label: "5대 이상" },
        { value: "unknown", label: "잘 모르겠어요" },
      ],
    },
    options: {
      label: "매각 품목",
      items: [
        { value: "logistics", label: "물류장비" },
        { value: "furniture", label: "사무가구" },
        { value: "kitchen", label: "주방집기" },
        { value: "aircon", label: "냉난방기 · 제습기" },
        { value: "chair", label: "의자" },
        { value: "special", label: "특수 장비" },
      ],
    },
    memoPlaceholder: "예) 사무실 이전으로 책상 60개와 의자 60개 처분, 사진 있음",
  },
  {
    slug: "other",
    label: "기타 문의",
    labelEn: "Other",
    description: "파트너십, 기술 지원, 그 밖의 문의.\n어떤 내용이든 적어 주세요.",
    mark: "?",
    options: {
      label: "문의 성격",
      items: [
        { value: "partnership", label: "파트너십 · 제휴" },
        { value: "support", label: "기술 지원 · AS" },
        { value: "press", label: "홍보 · 제안" },
        { value: "etc", label: "그 밖의 내용" },
      ],
    },
    memoPlaceholder: "문의하실 내용을 적어 주세요.",
  },
];

export const INQUIRY_FIELD_MAP: Record<string, InquiryField> = Object.fromEntries(
  INQUIRY_FIELDS.map((f) => [f.slug, f])
);

/** 관리자 화면 등에서 slug를 이름으로 바꿉니다. 옛 문의의 slug(구독서비스 등)도 받습니다. */
export function fieldLabel(slug?: string | null): string {
  if (!slug) return "";
  return INQUIRY_FIELD_MAP[slug]?.label ?? slug;
}

/** 견적 문의가 보내는 inquiry_type 값. 관리자 표의 «유형» 열에 그대로 섭니다. */
export const QUOTE_INQUIRY_TYPE = "견적 요청";

/* ─── 관리자가 매기는 문의 상태 ─── */

export type InquiryStatus = "new" | "confirmed" | "in-progress" | "resolved" | "rejected";

/** 순서대로 처리 흐름입니다. 반려만 흐름 밖에 있습니다. tone은 관리자 UI의 Badge 색 이름입니다. */
export const INQUIRY_STATUSES: { key: InquiryStatus; label: string; tone: "blue" | "violet" | "amber" | "green" | "red" | "gray"; hint: string }[] = [
  { key: "new", label: "신규", tone: "blue", hint: "아직 아무도 보지 않은 문의" },
  { key: "confirmed", label: "확인", tone: "violet", hint: "내용을 확인했고 곧 연락할 문의" },
  { key: "in-progress", label: "진행중", tone: "amber", hint: "통화·견적이 오가는 중" },
  { key: "resolved", label: "완료", tone: "green", hint: "계약 또는 안내가 끝난 문의" },
  { key: "rejected", label: "반려", tone: "red", hint: "진행하지 않기로 한 문의(범위 밖, 중복, 연락 불가)" },
];

export const INQUIRY_STATUS_KEYS = INQUIRY_STATUSES.map((s) => s.key);

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === "string" && (INQUIRY_STATUS_KEYS as string[]).includes(value);
}

export const INQUIRY_STATUS_LABEL = Object.fromEntries(INQUIRY_STATUSES.map((s) => [s.key, s.label])) as Record<InquiryStatus, string>;
export const INQUIRY_STATUS_TONE = Object.fromEntries(INQUIRY_STATUSES.map((s) => [s.key, s.tone])) as Record<InquiryStatus, (typeof INQUIRY_STATUSES)[number]["tone"]>;

/** 명함 사진 제한 */
export const BUSINESS_CARD_MAX_BYTES = 10 * 1024 * 1024;
export const BUSINESS_CARD_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif";

/* ── 저장 형식 ─────────────────────────────────────────────────────────── */

/** deskon_inquiries.details(jsonb)에 들어가는 모양. 버전을 적어 두고 모양이 바뀌면 올립니다. */
export interface InquiryDetails {
  version: 1;
  field: { slug: string; label: string };
  event: {
    name?: string;
    place?: string;
    region?: { value: string; label: string };
    schedule?: { start?: string; end?: string; duration?: { value: string; label: string } };
    scale?: { label: string; value: string; display: string };
    count?: { label: string; value: number; unit: string };
  };
  options: { value: string; label: string }[];
  memo?: string;
  businessCard?: { url: string; width: number; height: number } | null;
  /** 이름·회사를 비우고 «명함에서 확인»으로 넘겼는지 */
  contactFromCard?: boolean;
}

/** 폼 상태 → 저장 형식. 빈 값은 넣지 않습니다. */
export interface InquiryDraft {
  field: InquiryFieldSlug | null;
  eventName: string;
  place: string;
  region: string;
  start: string;
  end: string;
  duration: string;
  scale: string;
  count: number | null;
  options: string[];
  memo: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  businessCard: { url: string; width: number; height: number } | null;
  contactFromCard: boolean;
  privacyAgreed: boolean;
}

export const EMPTY_DRAFT: InquiryDraft = {
  field: null,
  eventName: "",
  place: "",
  region: "",
  start: "",
  end: "",
  duration: "",
  scale: "",
  count: null,
  options: [],
  memo: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  businessCard: null,
  contactFromCard: false,
  privacyAgreed: false,
};

function pick(options: ChoiceOption[], value: string) {
  const found = options.find((o) => o.value === value);
  return found ? { value: found.value, label: found.label } : undefined;
}

export function buildInquiryDetails(draft: InquiryDraft): InquiryDetails | null {
  if (!draft.field) return null;
  const field = INQUIRY_FIELD_MAP[draft.field];
  const scaleOpt = field.scale ? pick(field.scale.options, draft.scale) : undefined;
  const details: InquiryDetails = {
    version: 1,
    field: { slug: field.slug, label: field.label },
    event: {},
    options: draft.options
      .map((v) => pick(field.options.items, v))
      .filter((o): o is { value: string; label: string } => Boolean(o)),
    businessCard: draft.businessCard,
    contactFromCard: draft.contactFromCard,
  };
  if (draft.eventName.trim()) details.event.name = draft.eventName.trim();
  if (draft.place.trim()) details.event.place = draft.place.trim();
  const region = pick(REGION_OPTIONS, draft.region);
  if (region) details.event.region = region;
  const duration = pick(DURATION_OPTIONS, draft.duration);
  if (draft.start || draft.end || duration) {
    details.event.schedule = {
      ...(draft.start ? { start: draft.start } : {}),
      ...(draft.end ? { end: draft.end } : {}),
      ...(duration ? { duration } : {}),
    };
  }
  if (field.scale && scaleOpt) {
    details.event.scale = { label: field.scale.label, value: scaleOpt.value, display: scaleOpt.label };
  }
  if (field.count && typeof draft.count === "number") {
    details.event.count = { label: field.count.label, value: draft.count, unit: field.count.unit };
  }
  if (draft.memo.trim()) details.memo = draft.memo.trim();
  return details;
}

/** 관리자 목록·카카오 알림에 한 줄씩 서는 요약. 비어 있는 항목은 건너뜁니다. */
export function summarizeDetails(details: InquiryDetails): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  rows.push({ label: "분야", value: details.field.label });
  const ev = details.event;
  if (ev.name) rows.push({ label: "행사 · 현장", value: ev.name });
  if (ev.place || ev.region) {
    rows.push({ label: "장소", value: [ev.region?.label, ev.place].filter(Boolean).join(" ") });
  }
  if (ev.schedule) {
    const { start, end, duration } = ev.schedule;
    const range = start && end ? `${start} ~ ${end}` : start || end || "";
    rows.push({ label: "일정", value: [range, duration?.label].filter(Boolean).join(" / ") });
  }
  if (ev.scale) rows.push({ label: ev.scale.label, value: ev.scale.display });
  if (ev.count) rows.push({ label: ev.count.label, value: `${ev.count.value}${ev.count.unit}` });
  if (details.options.length) {
    rows.push({ label: "요청 항목", value: details.options.map((o) => o.label).join(", ") });
  }
  return rows;
}

/** message 컬럼이 비지 않게 요약으로 채우는 본문 */
export function detailsToMessage(details: InquiryDetails): string {
  const lines = summarizeDetails(details).map((r) => `${r.label}: ${r.value}`);
  if (details.memo) lines.push(`메모: ${details.memo}`);
  if (details.contactFromCard) lines.push("이름·회사는 첨부한 명함에서 확인");
  return lines.join("\n");
}

/** DB에서 읽은 jsonb를 안전하게 InquiryDetails로. 모양이 다르면 null. */
export function parseInquiryDetails(value: unknown): InquiryDetails | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  const field = v.field as Record<string, unknown> | undefined;
  if (!field || typeof field.slug !== "string") return null;
  const event = (v.event && typeof v.event === "object" ? v.event : {}) as InquiryDetails["event"];
  const options = Array.isArray(v.options)
    ? (v.options as unknown[]).flatMap((o) => {
        const r = o as Record<string, unknown>;
        return typeof r?.value === "string" && typeof r?.label === "string"
          ? [{ value: r.value, label: r.label }]
          : [];
      })
    : [];
  const card = v.businessCard as Record<string, unknown> | null | undefined;
  return {
    version: 1,
    field: { slug: field.slug, label: typeof field.label === "string" ? field.label : fieldLabel(field.slug) },
    event,
    options,
    memo: typeof v.memo === "string" ? v.memo : undefined,
    businessCard:
      card && typeof card.url === "string"
        ? {
            url: card.url,
            width: typeof card.width === "number" ? card.width : 0,
            height: typeof card.height === "number" ? card.height : 0,
          }
        : null,
    contactFromCard: v.contactFromCard === true,
  };
}
