/**
 * 트래픽 통계(/admin/analytics)의 조회 기간 계산.
 * Supabase 나 Next 에 기대지 않는 순수 함수만 두어 화면(클라이언트)과 API(서버)가 같은 규칙을 씁니다.
 * 모든 날짜는 한국 시간(Asia/Seoul) 기준 "YYYY-MM-DD" 문자열입니다(한국은 서머타임이 없어 +09:00 고정).
 */

export type TrafficRange = "24h" | "7d" | "28d" | "3m";
export type TrafficRangeParam = TrafficRange | "custom";
export type TrafficBucket = "hour" | "day";
export type TrafficAudience = "human" | "bot" | "all";

export const TRAFFIC_RANGES: readonly TrafficRange[] = ["24h", "7d", "28d", "3m"];

export const RANGE_LABEL: Record<TrafficRange, string> = {
  "24h": "최근 24시간",
  "7d": "최근 7일",
  "28d": "최근 28일",
  "3m": "최근 3개월",
};

export const AUDIENCE_LABEL: Record<TrafficAudience, string> = {
  human: "사람",
  bot: "로봇",
  all: "전체",
};

const RANGE_MS: Record<TrafficRange, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "28d": 28 * 24 * 60 * 60 * 1000,
  "3m": 90 * 24 * 60 * 60 * 1000,
};

/** 직접 고른 기간으로 한 번에 볼 수 있는 최대 일수(1년) */
export const MAX_CUSTOM_DAYS = 366;
/** 이 일수 이하면 시간별, 넘으면 일별 눈금 */
export const HOURLY_MAX_DAYS = 2;
const DEFAULT_CUSTOM_DAYS = 7;

export const DAY_MS = 24 * 60 * 60 * 1000;
export const HOUR_MS = 60 * 60 * 1000;
export const KST_OFFSET_MS = 9 * HOUR_MS;

export type TrafficPeriod =
  | { kind: "preset"; range: TrafficRange; since: Date; until: Date; bucket: TrafficBucket }
  | { kind: "custom"; from: string; to: string; days: number; since: Date; until: Date; bucket: TrafficBucket };

export function isTrafficRange(v: string | undefined | null): v is TrafficRange {
  return v === "24h" || v === "7d" || v === "28d" || v === "3m";
}
export function isTrafficRangeParam(v: string | undefined | null): v is TrafficRangeParam {
  return v === "custom" || isTrafficRange(v);
}
export function isTrafficAudience(v: string | undefined | null): v is TrafficAudience {
  return v === "human" || v === "bot" || v === "all";
}

const kstYmd = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" });

/** Date → 한국 날짜 "YYYY-MM-DD" */
export function toKstDateString(d: Date): string {
  return kstYmd.format(d);
}
/** "YYYY-MM-DD" → 그날 00:00(한국) */
export function kstDayStart(ymd: string): Date {
  return new Date(`${ymd}T00:00:00+09:00`);
}
export function addDays(ymd: string, n: number): string {
  return toKstDateString(new Date(kstDayStart(ymd).getTime() + n * DAY_MS));
}

const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;
export function isValidYmd(v: string | undefined): v is string {
  if (!v || !YMD_RE.test(v)) return false;
  const d = kstDayStart(v);
  return !Number.isNaN(d.getTime()) && toKstDateString(d) === v;
}
export function inclusiveDays(from: string, to: string): number {
  return Math.round((kstDayStart(to).getTime() - kstDayStart(from).getTime()) / DAY_MS) + 1;
}
export function bucketForSpan(sinceMs: number, untilMs: number): TrafficBucket {
  return untilMs - sinceMs <= HOURLY_MAX_DAYS * DAY_MS ? "hour" : "day";
}

export type CustomRangeValidation = { ok: true; from: string; to: string; days: number } | { ok: false; message: string };

/** 직접 고른 기간 검사. 화면(입력 중)과 API(주소 직접 입력) 양쪽에서 같은 문구를 씁니다. */
export function validateCustomRange(from: string | undefined, to: string | undefined, now: Date = new Date()): CustomRangeValidation {
  if (!from || !to) return { ok: false, message: "시작일과 종료일을 모두 골라 주세요." };
  if (!isValidYmd(from) || !isValidYmd(to)) return { ok: false, message: "날짜 형식이 올바르지 않습니다. 달력에서 날짜를 다시 골라 주세요." };
  if (from > to) return { ok: false, message: "시작일이 종료일보다 늦습니다. 시작일을 종료일과 같거나 더 앞선 날로 골라 주세요." };
  const today = toKstDateString(now);
  if (to > today) return { ok: false, message: "오늘 이후의 날짜는 아직 통계가 없어 볼 수 없습니다." };
  const days = inclusiveDays(from, to);
  if (days > MAX_CUSTOM_DAYS) {
    return { ok: false, message: `한 번에 최대 ${MAX_CUSTOM_DAYS}일(1년)까지만 볼 수 있습니다. 지금 고른 기간은 ${days.toLocaleString()}일입니다.` };
  }
  return { ok: true, from, to, days };
}

export function presetPeriod(range: TrafficRange, now: Date = new Date()): TrafficPeriod {
  const since = new Date(now.getTime() - RANGE_MS[range]);
  return { kind: "preset", range, since, until: now, bucket: bucketForSpan(since.getTime(), now.getTime()) };
}

export function customPeriod(from: string, to: string): TrafficPeriod {
  const since = kstDayStart(from);
  const until = new Date(kstDayStart(to).getTime() + DAY_MS);
  return { kind: "custom", from, to, days: inclusiveDays(from, to), since, until, bucket: bucketForSpan(since.getTime(), until.getTime()) };
}

/** "직접 선택"을 처음 눌렀을 때 미리 채우는 기간: 오늘을 포함한 최근 7일 */
export function defaultCustomRange(now: Date = new Date()): { from: string; to: string } {
  const to = toKstDateString(now);
  return { from: addDays(to, -(DEFAULT_CUSTOM_DAYS - 1)), to };
}

export type ResolvedTrafficPeriod = {
  period: TrafficPeriod;
  /** 주소의 range 값(버튼 활성 표시용). 잘못됐으면 "7d" */
  rangeParam: TrafficRangeParam;
  /** 직접 고른 기간이 잘못됐을 때의 안내. 이때 period 는 최근 7일로 대체됩니다 */
  error: string | null;
  /** 폼에 다시 채울 입력값. range=custom 일 때만 */
  customInput: { from: string; to: string } | null;
};

const FALLBACK_RANGE: TrafficRange = "7d";

/** 주소의 range · from · to 를 조회 기간으로 해석합니다. */
export function resolveTrafficPeriod(params: { range?: string | null; from?: string | null; to?: string | null }, now: Date = new Date()): ResolvedTrafficPeriod {
  if (params.range !== "custom") {
    const range = isTrafficRange(params.range) ? params.range : FALLBACK_RANGE;
    return { period: presetPeriod(range, now), rangeParam: range, error: null, customInput: null };
  }
  const hasInput = Boolean(params.from || params.to);
  const input = hasInput ? { from: params.from ?? "", to: params.to ?? "" } : defaultCustomRange(now);
  const v = validateCustomRange(input.from, input.to, now);
  if (!v.ok) return { period: presetPeriod(FALLBACK_RANGE, now), rangeParam: "custom", error: v.message, customInput: input };
  return { period: customPeriod(v.from, v.to), rangeParam: "custom", error: null, customInput: { from: v.from, to: v.to } };
}

/** 통계 화면 주소. 프리셋이면 from/to 를 버리고, custom 이면 있을 때만 붙입니다. */
export function trafficSearch(opts: { range: TrafficRangeParam; audience: TrafficAudience; from?: string; to?: string }): string {
  const sp = new URLSearchParams();
  sp.set("range", opts.range);
  if (opts.range === "custom") {
    if (opts.from) sp.set("from", opts.from);
    if (opts.to) sp.set("to", opts.to);
  }
  sp.set("audience", opts.audience);
  return sp.toString();
}

/** "2026-10-01" → "2026.10.01" */
export function formatYmd(ymd: string): string {
  return ymd.replaceAll("-", ".");
}

/** 머리글 부제에 쓰는 기간 설명 */
export function formatPeriodLabel(period: TrafficPeriod): string {
  if (period.kind === "preset") return RANGE_LABEL[period.range];
  if (period.from === period.to) return `${formatYmd(period.from)} (하루)`;
  return `${formatYmd(period.from)} ~ ${formatYmd(period.to)} (${period.days}일)`;
}

/** 한국 시간 기준으로 시(hour) 또는 날(day) 시작으로 내림 */
export function truncToBucket(ms: number, bucket: TrafficBucket): number {
  const step = bucket === "hour" ? HOUR_MS : DAY_MS;
  return Math.floor((ms + KST_OFFSET_MS) / step) * step - KST_OFFSET_MS;
}

/** [since, until) 구간을 눈금 단위로 채운 시작 시각 목록(밀리초). 빈 구간도 0 으로 그리기 위해 씁니다. */
export function bucketStarts(since: Date, until: Date, bucket: TrafficBucket): number[] {
  const step = bucket === "hour" ? HOUR_MS : DAY_MS;
  const out: number[] = [];
  for (let t = truncToBucket(since.getTime(), bucket); t < until.getTime() && out.length < 10_000; t += step) out.push(t);
  return out;
}
