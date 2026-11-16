"use client";

import { useState } from "react";
import { Card } from "@/components/admin/ui";
import { STAT_RANGES, VIEW_SOURCE_LABEL, niceAxisMax, type StatRange, type ViewSeries, type ViewStats } from "@/lib/post-stats";

/**
 * 현장 노트 조회 통계의 화면 조각들(관리자 글 목록).
 *
 *  - RangeTabs: 조회 기간(최근 7 · 30 · 90일). 아래 숫자 · 차트 · 표의 «최근 N일» 열이 모두 이 기간을 따릅니다.
 *  - ViewsOverview: 전체 합계. 숫자 셋, 날짜별 막대, 유입 경로.
 *  - PostViewsDetail: 글 한 편을 펼쳤을 때의 같은 구성.
 *
 * 차트는 한 계열(조회수)뿐이라 색은 파랑 하나, 범례는 두지 않습니다. 값은 막대에 올리거나 초점을 주면 뜨고,
 * «날짜별 표로 보기»에서 같은 숫자를 표로 볼 수 있습니다.
 */

const num = (n: number) => n.toLocaleString("ko-KR");

const dayFmt = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" });
/** "2026-11-16" → "11월 16일 (월)" */
const longDay = (day: string) => dayFmt.format(new Date(`${day}T12:00:00+09:00`));
/** "2026-11-16" → "11.16" */
const shortDay = (day: string) => `${Number(day.slice(5, 7))}.${Number(day.slice(8, 10))}`;

/* ── 조회 기간 ──────────────────────────────────────────────────── */

export function RangeTabs({ value, onChange, disabled }: { value: StatRange; onChange: (v: StatRange) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span id="stat-range-label" className="text-[13px] font-semibold text-tx-2">
        조회 기간
      </span>
      <div role="radiogroup" aria-labelledby="stat-range-label" className="inline-flex rounded-full bg-white p-1 shadow-[0_1px_2px_rgba(25,31,40,0.04)]">
        {STAT_RANGES.map((r) => {
          const on = r === value;
          return (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={disabled}
              onClick={() => onChange(r)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
                on ? "bg-tx text-white" : "text-tx-2 hover:bg-tg hover:text-tx"
              }`}
            >
              최근 {r}일
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── 숫자 셋 ────────────────────────────────────────────────────── */

function Figures({ series, days, size = "lg" }: { series: ViewSeries; days: number; size?: "lg" | "sm" }) {
  const items = [
    { label: "오늘", value: series.today },
    { label: `최근 ${days}일`, value: series.period },
    { label: "누적", value: series.total },
  ];
  return (
    <dl className="flex flex-wrap gap-x-9 gap-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <dt className="text-[12px] font-medium text-tx-3">{it.label}</dt>
          <dd className={`mt-0.5 font-bold tracking-[-0.02em] text-tx ${size === "lg" ? "text-[26px]" : "text-[20px]"}`}>{num(it.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── 날짜별 막대 ────────────────────────────────────────────────── */

function DailyColumns({ daily, dayLabels, height = 150, label }: { daily: number[]; dayLabels: string[]; height?: number; label: string }) {
  const [active, setActive] = useState<number | null>(null);
  const n = daily.length;
  const top = niceAxisMax(Math.max(0, ...daily));
  const ticks = [top, top / 2, 0];
  const empty = daily.every((v) => v === 0);

  /* 가로축 라벨: 7일이면 날마다, 그보다 길면 처음 · 가운데 · 끝. */
  const marks =
    n <= 7
      ? dayLabels.map((_, i) => ({ i, align: "center" as const }))
      : [
          { i: 0, align: "start" as const },
          { i: Math.floor((n - 1) / 2), align: "center" as const },
          { i: n - 1, align: "end" as const },
        ];

  return (
    <div>
      <div className="flex gap-2.5">
        {/* 세로축 눈금 */}
        <div className="relative w-8 shrink-0 text-right text-[11px] font-medium tabular-nums text-tx-3" style={{ height }} aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2 leading-none" style={{ top: `${(1 - t / top) * 100}%` }}>
              {num(t)}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1" style={{ height }} role="group" aria-label={label} onPointerLeave={() => setActive(null)}>
          {ticks.map((t) => (
            <span key={t} aria-hidden className={`absolute inset-x-0 h-px ${t === 0 ? "bg-tg-2" : "bg-tg"}`} style={{ top: `${(1 - t / top) * 100}%` }} />
          ))}

          {/* 막대. 열 전체가 누를 수 있는 자리이고, 막대는 24px 를 넘지 않습니다. */}
          <div className="absolute inset-0 flex items-end">
            {daily.map((v, i) => (
              <button
                key={dayLabels[i]}
                type="button"
                aria-label={`${longDay(dayLabels[i])} 조회 ${num(v)}회`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                className="group flex h-full min-w-0 flex-1 cursor-default items-end justify-center px-px focus:outline-none"
              >
                <span
                  className={`block w-full max-w-[24px] rounded-t-[4px] transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-tb group-focus-visible:ring-offset-1 ${
                    active === i ? "bg-tb-deep" : "bg-tb"
                  }`}
                  style={{ height: `${(v / top) * 100}%`, minHeight: v > 0 ? 3 : 0 }}
                />
              </button>
            ))}
          </div>

          {empty && (
            <p className="pointer-events-none absolute inset-0 grid place-items-center text-[13px] font-medium text-tx-3">이 기간에는 조회가 없습니다</p>
          )}

          {active !== null && (
            <div
              aria-hidden
              className="pointer-events-none absolute z-10 whitespace-nowrap rounded-[10px] bg-tx px-3 py-2 text-white shadow-[0_6px_20px_rgba(25,31,40,0.18)]"
              style={{
                left: `${((active + 0.5) / n) * 100}%`,
                bottom: `calc(${(daily[active] / top) * 100}% + 8px)`,
                transform: `translateX(${active < n * 0.2 ? "-14px" : active > n * 0.8 ? "calc(-100% + 14px)" : "-50%"})`,
              }}
            >
              <p className="text-[14px] font-bold leading-tight">{num(daily[active])}회</p>
              <p className="mt-0.5 text-[11px] font-medium text-white/65">{longDay(dayLabels[active])}</p>
            </div>
          )}
        </div>
      </div>

      {/* 가로축 라벨 */}
      <div className="relative ml-[2.625rem] mt-2 h-4 text-[11px] font-medium tabular-nums text-tx-3" aria-hidden>
        {marks.map(({ i, align }) => (
          <span
            key={i}
            className={`absolute top-0 whitespace-nowrap ${align === "center" ? "-translate-x-1/2" : ""}`}
            style={align === "end" ? { right: 0 } : { left: align === "start" ? 0 : `${((i + 0.5) / n) * 100}%` }}
          >
            {shortDay(dayLabels[i])}
          </span>
        ))}
      </div>

      <details className="group mt-3">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-full text-[12px] font-semibold text-tx-3 transition-colors duration-150 hover:text-tx focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
          <svg className="h-3 w-3 transition-transform duration-150 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
          날짜별 표로 보기
        </summary>
        <div className="mt-2 max-h-56 overflow-y-auto rounded-[12px] bg-tg/60">
          <table className="w-full text-[13px]">
            <thead className="sticky top-0 bg-tg text-left text-[12px] font-semibold text-tx-3">
              <tr>
                <th className="px-4 py-2 font-semibold">날짜</th>
                <th className="px-4 py-2 text-right font-semibold">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white">
              {dayLabels
                .map((d, i) => ({ d, v: daily[i] }))
                .reverse()
                .map(({ d, v }) => (
                  <tr key={d}>
                    <td className="px-4 py-1.5 font-medium text-tx-2">{longDay(d)}</td>
                    <td className={`px-4 py-1.5 text-right tabular-nums ${v > 0 ? "font-semibold text-tx" : "text-tx-3"}`}>{num(v)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

/* ── 유입 경로 ──────────────────────────────────────────────────── */

function SourceBars({ series }: { series: ViewSeries }) {
  if (series.sources.length === 0) {
    return <p className="text-[13px] font-medium text-tx-3">이 기간에 집계된 유입이 없습니다.</p>;
  }
  const max = series.sources[0].views;
  const sum = series.sources.reduce((a, s) => a + s.views, 0);
  return (
    <ul className="space-y-3.5">
      {series.sources.map((s) => (
        <li key={s.source}>
          <p className="text-[13px] font-semibold text-tx-2">{VIEW_SOURCE_LABEL[s.source]}</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            {/* 값이 막대 끝에 붙습니다. 오른쪽 5.5rem 은 숫자 자리입니다. */}
            <span className="block h-2.5 rounded-r-[4px] bg-tb" style={{ width: `calc((100% - 5.5rem) * ${s.views / max})`, minWidth: 3 }} aria-hidden />
            <span className="whitespace-nowrap text-[13px] tabular-nums">
              <strong className="font-bold text-tx">{num(s.views)}</strong>
              <span className="ml-1.5 font-medium text-tx-3">{Math.round((s.views / sum) * 100)}%</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── 전체 ───────────────────────────────────────────────────────── */

export function ViewsOverview({ stats, refreshing }: { stats: ViewStats; refreshing?: boolean }) {
  return (
    <Card className={`transition-opacity duration-200 ${refreshing ? "opacity-60" : ""}`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <h2 className="text-[15px] font-bold text-tx">현장 노트 조회</h2>
          <div className="mt-4">
            <Figures series={stats.all} days={stats.days} />
          </div>
          <div className="mt-7">
            <DailyColumns daily={stats.all.daily} dayLabels={stats.dayLabels} label={`최근 ${stats.days}일 날짜별 조회수`} />
          </div>
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-tx">어디서 왔나</h2>
          <p className="mt-1 text-[12px] font-medium text-tx-3">최근 {stats.days}일, 글을 연 방문의 유입 경로</p>
          <div className="mt-5">
            <SourceBars series={stats.all} />
          </div>
        </div>
      </div>
      <p className="mt-6 border-t border-tg pt-4 text-[12px] font-medium leading-[1.7] text-tx-3">
        {stats.all.total === 0 && "아직 집계된 조회가 없습니다. 방문자가 글을 열면 여기에 쌓이고, 집계를 켜기 전의 조회는 포함되지 않습니다. "}
        검색 로봇과 로그인한 관리자의 조회는 세지 않습니다. 같은 탭에서 같은 글을 그날 다시 열어도 한 번으로 셉니다.
      </p>
    </Card>
  );
}

/* ── 글 한 편 ───────────────────────────────────────────────────── */

const NO_VIEWS = (days: number): ViewSeries => ({ total: 0, period: 0, today: 0, daily: Array.from({ length: days }, () => 0), sources: [] });

export function PostViewsDetail({ stats, postId, title }: { stats: ViewStats; postId: string; title: string }) {
  const series = stats.posts[postId] ?? NO_VIEWS(stats.days);
  return (
    <div className="rounded-[16px] bg-white p-5">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <Figures series={series} days={stats.days} size="sm" />
          <div className="mt-6">
            <DailyColumns daily={series.daily} dayLabels={stats.dayLabels} height={120} label={`«${title}» 최근 ${stats.days}일 날짜별 조회수`} />
          </div>
        </div>
        <div>
          <p className="text-[13px] font-bold text-tx">어디서 왔나</p>
          <div className="mt-4">
            <SourceBars series={series} />
          </div>
        </div>
      </div>
    </div>
  );
}
