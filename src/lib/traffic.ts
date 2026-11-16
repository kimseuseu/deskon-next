/**
 * 트래픽 통계의 공용 모양과 순수 함수들(기록 API · 관리자 API · 화면이 같이 씁니다).
 *
 * 저장은 supabase-page-views.sql 의 deskon_page_views 한 표입니다. 방문자를 식별하는 개인정보는 남기지 않습니다.
 * 리퍼러는 호스트 이름만, 기기 정보는 브라우저가 보낸 User-Agent 를 서버에서 이름으로 바꾼 뒤 그 이름만 저장합니다.
 */

import {
  bucketStarts,
  type TrafficAudience,
  type TrafficBucket,
  type TrafficPeriod,
  type TrafficRangeParam,
} from "@/lib/traffic-period";

/* ── 로봇 판정 ─────────────────────────────────────────────────── */

const KNOWN_BOTS: { name: string; pattern: RegExp }[] = [
  { name: "구글 로봇", pattern: /googlebot|google-inspectiontool|adsbot-google|mediapartners-google|google-read-aloud|google-site-verification/i },
  { name: "빙 로봇", pattern: /bingbot|bingpreview|msnbot/i },
  { name: "네이버 로봇", pattern: /yeti|naverbot|naver blog/i },
  { name: "다음 로봇", pattern: /daumoa|daum\b/i },
  { name: "바이두 로봇", pattern: /baiduspider|baidu/i },
  { name: "얀덱스 로봇", pattern: /yandex/i },
  { name: "덕덕고 로봇", pattern: /duckduckbot|duckduckgo-favicons/i },
  { name: "애플 로봇", pattern: /applebot/i },
  { name: "아마존 로봇", pattern: /amazonbot/i },
  { name: "Ahrefs", pattern: /ahrefsbot/i },
  { name: "Semrush", pattern: /semrushbot/i },
  { name: "MJ12bot", pattern: /mj12bot/i },
  { name: "DotBot", pattern: /dotbot/i },
  { name: "PetalBot", pattern: /petalbot/i },
  { name: "Bytespider", pattern: /bytespider/i },
  { name: "GPTBot", pattern: /gptbot|oai-searchbot|chatgpt-user/i },
  { name: "ClaudeBot", pattern: /claudebot|claude-web|anthropic-ai/i },
  { name: "Perplexity", pattern: /perplexitybot/i },
  { name: "CCBot", pattern: /ccbot/i },
  { name: "페이스북 미리보기", pattern: /facebookexternalhit|facebookcatalog/i },
  { name: "카카오톡 미리보기", pattern: /kakaotalk-scrap/i },
  { name: "트위터 미리보기", pattern: /twitterbot/i },
  { name: "슬랙 미리보기", pattern: /slackbot|slack-imgproxy/i },
  { name: "디스코드 미리보기", pattern: /discordbot/i },
  { name: "텔레그램 미리보기", pattern: /telegrambot/i },
  { name: "라인 미리보기", pattern: /line-poker|linespider/i },
  { name: "핀터레스트", pattern: /pinterest|pinterestbot/i },
  { name: "링크드인", pattern: /linkedinbot/i },
  { name: "라이트하우스", pattern: /chrome-lighthouse|pagespeed|lighthouse/i },
  { name: "헤드리스 브라우저", pattern: /headlesschrome|puppeteer|playwright|phantomjs|selenium/i },
];

const GENERIC_BOT = /bot\b|crawler|spider|crawling|scraper|fetcher|monitor|uptime|preview|http[-_ ]?client|curl|wget|python-?requests|libwww|java\/|go-http|okhttp|node-fetch|axios|inspectiontool/i;

export type BotDetect = { isBot: boolean; botName: string | null };

/** 브라우저가 보낸 User-Agent 로 검색 로봇·스크립트를 가려냅니다. 막지는 않고 사람 통계와 분리만 합니다. */
export function detectBot(ua: string | null | undefined): BotDetect {
  if (!ua || ua.length < 20) return { isBot: true, botName: "알 수 없는 로봇" };
  for (const { name, pattern } of KNOWN_BOTS) if (pattern.test(ua)) return { isBot: true, botName: name };
  if (GENERIC_BOT.test(ua)) return { isBot: true, botName: "그 밖의 로봇" };
  return { isBot: false, botName: null };
}

/* ── 기기 · 브라우저 · 운영체제 ────────────────────────────────── */

export type DeviceKind = "desktop" | "mobile" | "tablet" | "smarttv";

export const DEVICE_LABEL: Record<DeviceKind, string> = {
  desktop: "컴퓨터",
  mobile: "휴대폰",
  tablet: "태블릿",
  smarttv: "스마트 TV",
};

export function parseUserAgent(ua: string | null | undefined): { device: DeviceKind; browser: string | null; os: string | null } {
  const s = ua ?? "";
  let device: DeviceKind = "desktop";
  if (/SmartTV|SMART-TV|Tizen|Web0S|WebOS|AppleTV|HbbTV|NetCast/i.test(s)) device = "smarttv";
  else if (/iPad|Tablet|PlayBook|Silk|Kindle/i.test(s) || (/Android/i.test(s) && !/Mobile/i.test(s))) device = "tablet";
  else if (/Mobi|iPhone|iPod|Android|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(s)) device = "mobile";

  let browser: string | null = null;
  if (/Whale\//i.test(s)) browser = "네이버 웨일";
  else if (/KAKAOTALK/i.test(s)) browser = "카카오톡 안 브라우저";
  else if (/NAVER\(inapp/i.test(s)) browser = "네이버 앱";
  else if (/Instagram/i.test(s)) browser = "인스타그램 안 브라우저";
  else if (/FBAN|FBAV/i.test(s)) browser = "페이스북 안 브라우저";
  else if (/SamsungBrowser/i.test(s)) browser = "삼성 인터넷";
  else if (/Edg(e|A|iOS)?\//i.test(s)) browser = "엣지";
  else if (/OPR\/|Opera/i.test(s)) browser = "오페라";
  else if (/CriOS\/|Chrome\//i.test(s)) browser = "크롬";
  else if (/FxiOS\/|Firefox\//i.test(s)) browser = "파이어폭스";
  else if (/Safari\//i.test(s) && /Version\//i.test(s)) browser = "사파리";
  else if (/MSIE|Trident\//i.test(s)) browser = "인터넷 익스플로러";

  let os: string | null = null;
  if (/Windows/i.test(s)) os = "윈도우";
  else if (/Android/i.test(s)) os = "안드로이드";
  else if (/iPhone|iPad|iPod/i.test(s)) os = "아이폰·아이패드";
  else if (/Mac OS X|Macintosh/i.test(s)) os = "맥";
  else if (/CrOS/i.test(s)) os = "크롬북";
  else if (/Linux/i.test(s)) os = "리눅스";

  return { device, browser, os };
}

/* ── 국가 ───────────────────────────────────────────────────────── */

const COUNTRY_LABEL: Record<string, string> = {
  KR: "한국", US: "미국", JP: "일본", CN: "중국", TW: "대만", HK: "홍콩", SG: "싱가포르",
  VN: "베트남", PH: "필리핀", ID: "인도네시아", TH: "태국", MY: "말레이시아", IN: "인도",
  GB: "영국", DE: "독일", FR: "프랑스", NL: "네덜란드", RU: "러시아", CA: "캐나다", AU: "호주", BR: "브라질",
};
export function countryLabel(code: string | null | undefined): string {
  if (!code) return "알 수 없음";
  return COUNTRY_LABEL[code.toUpperCase()] ?? code.toUpperCase();
}

/* ── 기록 API 가 받는 값 ────────────────────────────────────────── */

export interface PageViewPayload {
  path: string;
  visitorId: string;
  sessionId: string;
  referrer: string | null;
}

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

/** 브라우저가 보낸 JSON 을 검사해 저장할 모양으로. 틀리면 null. */
export function parsePageViewPayload(body: unknown): PageViewPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const path = typeof b.path === "string" ? b.path.trim() : "";
  if (!path.startsWith("/") || path.length > 500) return null;
  const visitorId = typeof b.visitorId === "string" ? b.visitorId : "";
  const sessionId = typeof b.sessionId === "string" ? b.sessionId : "";
  if (!ID_RE.test(visitorId) || !ID_RE.test(sessionId)) return null;
  const referrer = typeof b.referrer === "string" && b.referrer ? b.referrer.slice(0, 2000) : null;
  /* 쿼리스트링·해시는 버립니다(검색어 같은 값이 섞일 수 있음). */
  return { path: path.split(/[?#]/)[0] || "/", visitorId, sessionId, referrer };
}

/** 리퍼러 주소 → 호스트 이름만. 같은 사이트거나 주소가 아니면 null. */
export function referrerHost(referrer: string | null, selfHost: string): string | null {
  if (!referrer) return null;
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  const bare = (h: string) => h.replace(/:\d+$/, "").replace(/^www\./, "");
  if (!host) return null;
  const self = bare(selfHost);
  if (self && (bare(host) === self || bare(host).endsWith(`.${self}`))) return null;
  return host.replace(/^www\./, "").slice(0, 200);
}

/* ── 관리자 API 가 돌려주는 모양 ────────────────────────────────── */

export interface TrafficCount {
  views: number;
  visitors: number;
}

export interface TrafficBreakdownRow {
  key: string;
  label: string;
  views: number;
  visitors: number;
}

export interface TrafficPoint {
  /** 눈금 시작(ISO). 한국 시간 기준 시 또는 날 */
  bucket: string;
  views: number;
  visitors: number;
}

export interface TrafficSummary {
  ready: true;
  rangeParam: TrafficRangeParam;
  audience: TrafficAudience;
  period:
    | { kind: "preset"; range: Exclude<TrafficRangeParam, "custom">; label: string }
    | { kind: "custom"; from: string; to: string; days: number; label: string };
  since: string;
  until: string;
  bucket: TrafficBucket;
  /** 직접 고른 기간이 잘못됐을 때의 안내(이때 통계는 최근 7일) */
  error: string | null;
  customInput: { from: string; to: string } | null;
  today: string;
  totals: Record<TrafficAudience, TrafficCount>;
  views: number;
  visitors: number;
  sessions: number;
  bounceRate: number;
  timeline: TrafficPoint[];
  pages: TrafficBreakdownRow[];
  referrers: TrafficBreakdownRow[];
  countries: TrafficBreakdownRow[];
  devices: TrafficBreakdownRow[];
  browsers: TrafficBreakdownRow[];
  oses: TrafficBreakdownRow[];
  bots: TrafficBreakdownRow[];
}

export type TrafficResponse = TrafficSummary | { ready: false };

/** deskon_traffic_summary() 가 돌려주는 모양 그대로 */
export interface RawTrafficSummary {
  totals: Record<TrafficAudience, TrafficCount>;
  sessions: number;
  bounced: number;
  timeline: { bucket: string; views: number; visitors: number }[];
  pages: { key: string; views: number; visitors: number }[];
  referrers: { key: string; views: number; visitors: number }[];
  countries: { key: string; views: number; visitors: number }[];
  devices: { key: string; views: number; visitors: number }[];
  browsers: { key: string; views: number; visitors: number }[];
  oses: { key: string; views: number; visitors: number }[];
  bots: { key: string; views: number; visitors: number }[];
}

const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const count = (c: Partial<TrafficCount> | undefined): TrafficCount => ({ views: n(c?.views), visitors: n(c?.visitors) });

function rows(list: RawTrafficSummary["pages"] | undefined, label: (key: string) => string): TrafficBreakdownRow[] {
  return (list ?? []).map((r) => ({ key: r.key ?? "", label: label(r.key ?? ""), views: n(r.views), visitors: n(r.visitors) }));
}

/** DB 합계를 화면이 쓰는 모양으로. 눈금이 빈 시간·날은 0 으로 채웁니다. */
export function buildTrafficSummary(
  raw: RawTrafficSummary,
  args: {
    period: TrafficPeriod;
    rangeParam: TrafficRangeParam;
    audience: TrafficAudience;
    error: string | null;
    customInput: { from: string; to: string } | null;
    today: string;
    labelPeriod: (p: TrafficPeriod) => string;
  },
): TrafficSummary {
  const { period, audience } = args;
  const totals: Record<TrafficAudience, TrafficCount> = {
    human: count(raw.totals?.human),
    bot: count(raw.totals?.bot),
    all: count(raw.totals?.all),
  };
  const byBucket = new Map<number, TrafficPoint>();
  for (const p of raw.timeline ?? []) {
    const t = new Date(p.bucket).getTime();
    if (!Number.isNaN(t)) byBucket.set(t, { bucket: new Date(t).toISOString(), views: n(p.views), visitors: n(p.visitors) });
  }
  const timeline = bucketStarts(period.since, period.until, period.bucket).map(
    (t) => byBucket.get(t) ?? { bucket: new Date(t).toISOString(), views: 0, visitors: 0 },
  );
  const sessions = n(raw.sessions);
  const bounced = n(raw.bounced);
  const text = (k: string) => k || "알 수 없음";

  return {
    ready: true,
    rangeParam: args.rangeParam,
    audience,
    period:
      period.kind === "preset"
        ? { kind: "preset", range: period.range, label: args.labelPeriod(period) }
        : { kind: "custom", from: period.from, to: period.to, days: period.days, label: args.labelPeriod(period) },
    since: period.since.toISOString(),
    until: period.until.toISOString(),
    bucket: period.bucket,
    error: args.error,
    customInput: args.customInput,
    today: args.today,
    totals,
    views: totals[audience].views,
    visitors: totals[audience].visitors,
    sessions,
    bounceRate: sessions > 0 ? bounced / sessions : 0,
    timeline,
    pages: rows(raw.pages, (k) => (k.length > 80 ? `${k.slice(0, 80)}…` : k || "/")),
    referrers: rows(raw.referrers, text),
    countries: rows(raw.countries, countryLabel),
    devices: rows(raw.devices, (k) => (k in DEVICE_LABEL ? DEVICE_LABEL[k as DeviceKind] : k || "알 수 없음")),
    browsers: rows(raw.browsers, text),
    oses: rows(raw.oses, text),
    bots: rows(raw.bots, (k) => k || "그 밖의 로봇"),
  };
}
