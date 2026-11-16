"use client";

import { useId, useState } from "react";
import { Button, Card, inputClass } from "@/components/admin/ui";
import { niceAxisMax } from "@/lib/post-stats";
import type { TrafficBreakdownRow, TrafficPoint } from "@/lib/traffic";
import { HOURLY_MAX_DAYS, MAX_CUSTOM_DAYS, validateCustomRange, type TrafficBucket } from "@/lib/traffic-period";

/**
 * 트래픽 통계(/admin/analytics)의 화면 조각들.
 *  - TrafficColumns: 방문자 · 페이지뷰를 고르는 숫자 탭 + 시간별/일별 막대
 *  - BreakdownList / TabbedBreakdown: 페이지 · 유입 사이트 · 국가 · 기기 같은 상위 10개 분포
 *  - CustomRangeForm: 시작일 · 종료일 직접 고르기
 * 차트는 한 계열뿐이라 색은 파랑 하나, 값은 막대에 올리거나 초점을 주면 뜹니다.
 */

const num = (v: number) => v.toLocaleString("ko-KR");

const hourFmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", hour: "numeric", hour12: false });
const dayFmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" });
const shortHourFmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", hour: "numeric", hour12: false });
const shortDayFmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "numeric", day: "numeric" });

/** 막대 위 말풍선에 쓰는 긴 이름: "11월 16일 14시" / "11월 16일 (월)" */
function longLabel(iso: string, bucket: TrafficBucket) {
  const d = new Date(iso);
  return bucket === "hour" ? hourFmt.format(d) : dayFmt.format(d);
}
/** 가로축의 짧은 이름: "14시" / "11.16" */
function shortLabel(iso: string, bucket: TrafficBucket) {
  const d = new Date(iso);
  return bucket === "hour" ? shortHourFmt.format(d) : shortDayFmt.format(d).replace(/\s/g, "").replace(/\.$/, "");
}

/* ── 막대 그래프 ────────────────────────────────────────────────── */

type Metric = "visitors" | "views";
const METRIC_LABEL: Record<Metric, string> = { visitors: "방문자", views: "페이지뷰" };

export function TrafficColumns({
  timeline,
  bucket,
  totals,
  refreshing,
}: {
  timeline: TrafficPoint[];
  bucket: TrafficBucket;
  totals: { visitors: number; views: number };
  refreshing?: boolean;
}) {
  const [metric, setMetric] = useState<Metric>("visitors");
  const [active, setActive] = useState<number | null>(null);
  const values = timeline.map((p) => p[metric]);
  const n = values.length;
  const top = niceAxisMax(Math.max(0, ...values));
  const ticks = [top, top / 2, 0];
  const empty = values.every((v) => v === 0);
  const height = 180;

  /* 가로축 이름: 8칸 이하면 전부, 그보다 길면 다섯 군데 */
  const marks =
    n <= 8
      ? timeline.map((_, i) => ({ i, align: "center" as const }))
      : [0, 0.25, 0.5, 0.75, 1].map((f, idx) => ({
          i: Math.round(f * (n - 1)),
          align: idx === 0 ? ("start" as const) : idx === 4 ? ("end" as const) : ("center" as const),
        }));

  return (
    <Card padded={false} className={`transition-opacity duration-200 ${refreshing ? "opacity-60" : ""}`}>
      <div className="grid grid-cols-2 border-b border-tg" role="tablist" aria-label="그래프 항목">
        {(Object.keys(METRIC_LABEL) as Metric[]).map((m, idx) => {
          const on = metric === m;
          return (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setMetric(m)}
              className={`relative px-5 py-4 text-left transition-colors duration-150 ${idx === 0 ? "rounded-tl-[20px]" : "rounded-tr-[20px]"} ${on ? "bg-tb-soft/50" : "hover:bg-tg/60"}`}
            >
              <p className="text-[12px] font-medium text-tx-3">{METRIC_LABEL[m]}</p>
              <p className="mt-1 text-[26px] font-bold tracking-[-0.02em] text-tx">{num(totals[m])}</p>
              {on && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-tb" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div className="px-5 pb-5 pt-6">
        <div className="flex gap-2.5">
          <div className="relative w-9 shrink-0 text-right text-[11px] font-medium tabular-nums text-tx-3" style={{ height }} aria-hidden>
            {ticks.map((t) => (
              <span key={t} className="absolute right-0 -translate-y-1/2 leading-none" style={{ top: `${(1 - t / top) * 100}%` }}>
                {num(t)}
              </span>
            ))}
          </div>

          <div
            className="relative min-w-0 flex-1"
            style={{ height }}
            role="group"
            aria-label={`${bucket === "hour" ? "시간별" : "날짜별"} ${METRIC_LABEL[metric]}`}
            onPointerLeave={() => setActive(null)}
          >
            {ticks.map((t) => (
              <span key={t} aria-hidden className={`absolute inset-x-0 h-px ${t === 0 ? "bg-tg-2" : "bg-tg"}`} style={{ top: `${(1 - t / top) * 100}%` }} />
            ))}
            <div className="absolute inset-0 flex items-end">
              {timeline.map((p, i) => (
                <button
                  key={p.bucket}
                  type="button"
                  aria-label={`${longLabel(p.bucket, bucket)} ${METRIC_LABEL[metric]} ${num(values[i])}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((a) => (a === i ? null : a))}
                  className="group flex h-full min-w-0 flex-1 cursor-default items-end justify-center px-px focus:outline-none"
                >
                  <span
                    className={`block w-full max-w-[24px] rounded-t-[4px] transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-tb group-focus-visible:ring-offset-1 ${active === i ? "bg-tb-deep" : "bg-tb"}`}
                    style={{ height: `${(values[i] / top) * 100}%`, minHeight: values[i] > 0 ? 3 : 0 }}
                  />
                </button>
              ))}
            </div>

            {empty && <p className="pointer-events-none absolute inset-0 grid place-items-center text-[13px] font-medium text-tx-3">이 기간에는 방문이 없습니다</p>}

            {active !== null && n > 0 && (
              <div
                aria-hidden
                className="pointer-events-none absolute z-10 whitespace-nowrap rounded-[10px] bg-tx px-3 py-2 text-white shadow-[0_6px_20px_rgba(25,31,40,0.18)]"
                style={{
                  left: `${((active + 0.5) / n) * 100}%`,
                  bottom: `calc(${(values[active] / top) * 100}% + 8px)`,
                  transform: `translateX(${active < n * 0.2 ? "-14px" : active > n * 0.8 ? "calc(-100% + 14px)" : "-50%"})`,
                }}
              >
                <p className="text-[14px] font-bold leading-tight">
                  {METRIC_LABEL[metric]} {num(values[active])}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-white/65">
                  {longLabel(timeline[active].bucket, bucket)} · 페이지뷰 {num(timeline[active].views)} · 방문자 {num(timeline[active].visitors)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative ml-[2.875rem] mt-2 h-4 text-[11px] font-medium tabular-nums text-tx-3" aria-hidden>
          {marks.map(({ i, align }) =>
            timeline[i] ? (
              <span
                key={i}
                className={`absolute top-0 whitespace-nowrap ${align === "center" ? "-translate-x-1/2" : ""}`}
                style={align === "end" ? { right: 0 } : { left: align === "start" ? 0 : `${((i + 0.5) / n) * 100}%` }}
              >
                {shortLabel(timeline[i].bucket, bucket)}
              </span>
            ) : null,
          )}
        </div>

        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-full text-[12px] font-semibold text-tx-3 transition-colors duration-150 hover:text-tx focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <svg className="h-3 w-3 transition-transform duration-150 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
            {bucket === "hour" ? "시간별" : "날짜별"} 표로 보기
          </summary>
          <div className="mt-2 max-h-64 overflow-y-auto rounded-[12px] bg-tg/60">
            <table className="w-full text-[13px]">
              <thead className="sticky top-0 bg-tg text-left text-[12px] font-semibold text-tx-3">
                <tr>
                  <th className="px-4 py-2 font-semibold">{bucket === "hour" ? "시각" : "날짜"}</th>
                  <th className="px-4 py-2 text-right font-semibold">방문자</th>
                  <th className="px-4 py-2 text-right font-semibold">페이지뷰</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white">
                {[...timeline].reverse().map((p) => (
                  <tr key={p.bucket}>
                    <td className="px-4 py-1.5 font-medium text-tx-2">{longLabel(p.bucket, bucket)}</td>
                    <td className={`px-4 py-1.5 text-right tabular-nums ${p.visitors > 0 ? "font-semibold text-tx" : "text-tx-3"}`}>{num(p.visitors)}</td>
                    <td className={`px-4 py-1.5 text-right tabular-nums ${p.views > 0 ? "font-semibold text-tx" : "text-tx-3"}`}>{num(p.views)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </Card>
  );
}

/* ── 분포 목록 ──────────────────────────────────────────────────── */

function BreakdownBody({ rows, emptyText, hrefFor }: { rows: TrafficBreakdownRow[]; emptyText: string; hrefFor?: (key: string) => string | null }) {
  if (rows.length === 0) return <p className="px-5 py-10 text-center text-[13px] font-medium text-tx-3">{emptyText}</p>;
  const max = Math.max(1, ...rows.map((r) => r.visitors));
  return (
    <ul className="divide-y divide-tg">
      {rows.map((r) => {
        const href = hrefFor?.(r.key) ?? null;
        const inner = (
          <div className="relative flex items-center justify-between gap-3 px-5 py-2.5">
            <span className="absolute inset-y-1 left-3 rounded-md bg-tb-soft/70" style={{ width: `calc((100% - 1.5rem) * ${Math.max(0.02, r.visitors / max)})` }} aria-hidden />
            <span className="relative min-w-0 truncate text-[14px] font-medium text-tx">{r.label}</span>
            <span className="relative shrink-0 whitespace-nowrap text-[13px] tabular-nums">
              <strong className="font-bold text-tx">{num(r.visitors)}</strong>
              <span className="ml-1.5 font-medium text-tx-3">{num(r.views)}</span>
            </span>
          </div>
        );
        return (
          <li key={r.key || "(빈 값)"}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="block transition-colors duration-150 hover:bg-tg/60" title="새 탭에서 열기">
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function BreakdownList({ title, rows, emptyText, hrefFor }: { title: string; rows: TrafficBreakdownRow[]; emptyText: string; hrefFor?: (key: string) => string | null }) {
  return (
    <Card padded={false}>
      <div className="flex items-center justify-between gap-3 border-b border-tg px-5 py-3.5">
        <h2 className="text-[15px] font-bold text-tx">{title}</h2>
        <span className="text-[11px] font-medium text-tx-3">방문자 · 페이지뷰</span>
      </div>
      <BreakdownBody rows={rows} emptyText={emptyText} hrefFor={hrefFor} />
    </Card>
  );
}

export function TabbedBreakdown({ tabs }: { tabs: { key: string; title: string; rows: TrafficBreakdownRow[]; emptyText: string }[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];
  if (!current) return null;
  return (
    <Card padded={false}>
      <div className="flex items-center justify-between gap-3 border-b border-tg px-5 py-2.5">
        <div className="flex gap-1 rounded-full bg-tg p-1" role="tablist" aria-label="분포 종류">
          {tabs.map((t) => {
            const on = t.key === current.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.key)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${on ? "bg-white text-tx shadow-[0_1px_2px_rgba(25,31,40,0.06)]" : "text-tx-2 hover:text-tx"}`}
              >
                {t.title}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] font-medium text-tx-3">방문자 · 페이지뷰</span>
      </div>
      <BreakdownBody rows={current.rows} emptyText={current.emptyText} />
    </Card>
  );
}

/* ── 기간 직접 고르기 ───────────────────────────────────────────── */

export function CustomRangeForm({
  from,
  to,
  today,
  serverError,
  onApply,
  pending,
}: {
  from: string;
  to: string;
  today: string;
  serverError: string | null;
  onApply: (from: string, to: string) => void;
  pending?: boolean;
}) {
  const id = useId();
  const [draftFrom, setDraftFrom] = useState(from);
  const [draftTo, setDraftTo] = useState(to);
  const dirty = draftFrom !== from || draftTo !== to;
  const v = validateCustomRange(draftFrom, draftTo);
  const message = !v.ok ? v.message : !dirty && serverError ? serverError : null;

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (v.ok) onApply(v.from, v.to);
        }}
        aria-describedby={`${id}-help`}
      >
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-tx-2">시작일</span>
            <input type="date" value={draftFrom} max={today} required aria-invalid={!v.ok} onChange={(e) => setDraftFrom(e.target.value)} className={`${inputClass} w-auto tabular-nums`} />
          </label>
          <span className="pb-3 text-tx-3" aria-hidden>
            ~
          </span>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-tx-2">종료일</span>
            <input type="date" value={draftTo} max={today} required aria-invalid={!v.ok} onChange={(e) => setDraftTo(e.target.value)} className={`${inputClass} w-auto tabular-nums`} />
          </label>
          <Button type="submit" disabled={!v.ok || pending || (!dirty && !serverError)}>
            {pending ? "불러오는 중" : "이 기간으로 보기"}
          </Button>
        </div>
        {message ? (
          <p role="alert" className="mt-3 text-[13px] font-semibold text-red-700">
            {message}
            {!dirty && serverError && " 아래에는 최근 7일 통계가 대신 보입니다."}
          </p>
        ) : (
          <p id={`${id}-help`} className="mt-3 text-[13px] font-medium text-tx-3">
            한 번에 최대 {MAX_CUSTOM_DAYS}일(1년)까지 볼 수 있습니다. {HOURLY_MAX_DAYS}일 이하는 시간별, 그 이상은 날짜별로 그립니다.
          </p>
        )}
      </form>
    </Card>
  );
}
