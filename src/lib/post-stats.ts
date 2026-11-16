/**
 * 현장 노트 조회 통계의 공용 모양과 순수 함수들(서버 API 와 관리자 화면이 같이 씁니다).
 *
 * 저장은 supabase-post-views.sql 의 deskon_post_views(글 · 한국 날짜 · 유입 경로별 숫자) 한 테이블입니다.
 * 방문자를 식별하는 값은 어디에도 남기지 않습니다. 리퍼러는 호스트 이름만 보고 경로로 분류한 뒤 버립니다.
 */

export const VIEW_SOURCES = ["naver", "google", "daum", "kakao", "site", "direct", "other"] as const;
export type ViewSource = (typeof VIEW_SOURCES)[number];

export const VIEW_SOURCE_LABEL: Record<ViewSource, string> = {
  naver: "네이버",
  google: "구글",
  daum: "다음",
  kakao: "카카오",
  site: "사이트 안에서 이동",
  direct: "직접 방문",
  other: "그 밖의 사이트",
};

export const STAT_RANGES = [7, 30, 90] as const;
export type StatRange = (typeof STAT_RANGES)[number];

/* ── 기록할 때 ──────────────────────────────────────────────────── */

const BOT_UA =
  /bot|crawl|spider|slurp|yeti|daumoa|facebookexternalhit|kakaotalk-scrap|headless|lighthouse|pagespeed|inspectiontool|curl|wget|python-requests|axios|node-fetch|go-http-client|uptime|monitor/i;

/** 검색 로봇 · 미리보기 수집기 · 스크립트는 세지 않습니다. */
export function isCountableUserAgent(ua: string | null | undefined): boolean {
  if (!ua || ua.length < 20) return false;
  return !BOT_UA.test(ua);
}

/**
 * 리퍼러 주소 → 유입 경로.
 * selfHost 는 이 사이트의 호스트(www.aovo.kr). 리퍼러가 없으면 직접 방문인데,
 * 카카오톡 인앱 브라우저는 리퍼러를 주지 않으므로 UA 로 카카오를 가려냅니다.
 */
export function classifySource(referrer: string | null | undefined, selfHost: string, ua?: string | null): ViewSource {
  const ref = (referrer ?? "").trim();
  if (!ref) return ua && /KAKAOTALK/i.test(ua) ? "kakao" : "direct";

  let host: string;
  try {
    host = new URL(ref).hostname.toLowerCase();
  } catch {
    return "other";
  }
  const bare = (h: string) => h.toLowerCase().replace(/:\d+$/, "").replace(/^www\./, "");
  const self = bare(selfHost);
  const h = bare(host);
  if (self && (h === self || h.endsWith(`.${self}`))) return "site";
  if (/(^|\.)naver\.(com|me)$/.test(h)) return "naver";
  if (/(^|\.)google\.[a-z.]{2,6}$/.test(h)) return "google";
  if (/(^|\.)daum\.net$/.test(h)) return "daum";
  if (/(^|\.)kakao(corp)?\.com$/.test(h)) return "kakao";
  return "other";
}

/* ── 읽을 때 ────────────────────────────────────────────────────── */

/** deskon_post_view_stats() 가 돌려주는 모양 그대로 */
export interface RawViewStats {
  today: string;
  days: number;
  totals: { postId: string; views: number }[];
  daily: { postId: string; day: string; views: number }[];
  sources: { postId: string; source: string; views: number }[];
}

export interface ViewSeries {
  /** 집계를 시작한 뒤의 누적 */
  total: number;
  /** 고른 기간(최근 N일)의 합 */
  period: number;
  today: number;
  /** 기간의 날짜별 조회수. dayLabels 와 같은 순서(오래된 날 → 오늘) */
  daily: number[];
  /** 기간의 유입 경로별 합. 많은 순, 0 은 뺍니다 */
  sources: { source: ViewSource; views: number }[];
}

export interface ViewStats {
  ready: true;
  today: string;
  days: number;
  /** "2026-11-16" 꼴, 오래된 날부터 */
  dayLabels: string[];
  all: ViewSeries;
  posts: Record<string, ViewSeries>;
}

export type ViewStatsResponse = ViewStats | { ready: false };

const isSource = (s: string): s is ViewSource => (VIEW_SOURCES as readonly string[]).includes(s);

/** "2026-11-16" 에서 n 일 전(달력 계산은 UTC 로 해서 서머타임 · 시간대 영향을 받지 않습니다). */
export function shiftDay(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + delta)).toISOString().slice(0, 10);
}

function emptySeries(days: number): ViewSeries & { sourceMap: Map<ViewSource, number> } {
  return { total: 0, period: 0, today: 0, daily: Array.from({ length: days }, () => 0), sources: [], sourceMap: new Map() };
}

/** DB 합계를 화면이 쓰는 모양으로. 빈 날은 0 으로 채웁니다. */
export function buildViewStats(raw: RawViewStats): ViewStats {
  const days = Math.max(1, Math.min(365, Math.round(raw.days)));
  const dayLabels = Array.from({ length: days }, (_, i) => shiftDay(raw.today, i - (days - 1)));
  const index = new Map(dayLabels.map((d, i) => [d, i]));

  const all = emptySeries(days);
  const byPost = new Map<string, ReturnType<typeof emptySeries>>();
  const seriesOf = (id: string) => {
    let s = byPost.get(id);
    if (!s) byPost.set(id, (s = emptySeries(days)));
    return s;
  };

  for (const t of raw.totals) {
    seriesOf(t.postId).total += t.views;
    all.total += t.views;
  }
  for (const d of raw.daily) {
    const i = index.get(d.day);
    if (i === undefined) continue;
    for (const s of [seriesOf(d.postId), all]) {
      s.daily[i] += d.views;
      s.period += d.views;
      if (i === days - 1) s.today += d.views;
    }
  }
  for (const r of raw.sources) {
    const source: ViewSource = isSource(r.source) ? r.source : "other";
    for (const s of [seriesOf(r.postId), all]) s.sourceMap.set(source, (s.sourceMap.get(source) ?? 0) + r.views);
  }

  const finish = ({ sourceMap, ...s }: ReturnType<typeof emptySeries>): ViewSeries => ({
    ...s,
    sources: [...sourceMap.entries()]
      .filter(([, views]) => views > 0)
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views || VIEW_SOURCES.indexOf(a.source) - VIEW_SOURCES.indexOf(b.source)),
  });

  return {
    ready: true,
    today: raw.today,
    days,
    dayLabels,
    all: finish(all),
    posts: Object.fromEntries([...byPost.entries()].map(([id, s]) => [id, finish(s)])),
  };
}

/** 세로축 위끝: 최댓값 이상에서 가장 가까운 1 · 2 · 4 · 6 · 8 × 10ⁿ. 가운데 눈금이 정수가 되게 늘 짝수입니다(4 이하는 4). */
export function niceAxisMax(max: number): number {
  if (max <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(max));
  for (const m of [1, 2, 4, 6, 8, 10]) if (m * pow >= max) return m * pow;
  return 10 * pow;
}
