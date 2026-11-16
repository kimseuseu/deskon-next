"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, ErrorState, FilterTabs, PageHeader } from "@/components/admin/ui";
import { BreakdownList, CustomRangeForm, TabbedBreakdown, TrafficColumns } from "@/components/admin/TrafficStats";
import type { TrafficResponse, TrafficSummary } from "@/lib/traffic";
import {
  AUDIENCE_LABEL,
  RANGE_LABEL,
  TRAFFIC_RANGES,
  isTrafficAudience,
  isTrafficRangeParam,
  trafficSearch,
  type TrafficAudience,
  type TrafficRangeParam,
} from "@/lib/traffic-period";

/**
 * 트래픽 통계. 기간(최근 24시간 · 7일 · 28일 · 3개월 · 직접 선택)과 대상(사람 · 로봇 · 전체)은 주소에 남겨
 * 새로 고침하거나 링크를 공유해도 같은 화면이 나옵니다. 숫자는 /api/admin/traffic 이 줍니다.
 */

const num = (v: number) => v.toLocaleString("ko-KR");
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <AnalyticsScreen />
    </Suspense>
  );
}

function AnalyticsScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const rangeParam: TrafficRangeParam = isTrafficRangeParam(sp.get("range")) ? (sp.get("range") as TrafficRangeParam) : "7d";
  const audience: TrafficAudience = isTrafficAudience(sp.get("audience")) ? (sp.get("audience") as TrafficAudience) : "human";
  const from = sp.get("from") ?? undefined;
  const to = sp.get("to") ?? undefined;
  const query = sp.toString();

  const [data, setData] = useState<TrafficResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/traffic?${query}`, { cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { data?: TrafficResponse; error?: string };
      if (!res.ok || !json.data) {
        setError(json.error ?? "트래픽 통계를 불러오지 못했습니다.");
        return;
      }
      setError(null);
      setData(json.data);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    void load();
  }, [load]);

  const go = (next: { range?: TrafficRangeParam; audience?: TrafficAudience; from?: string; to?: string }) => {
    const r = next.range ?? rangeParam;
    router.replace(`${pathname}?${trafficSearch({ range: r, audience: next.audience ?? audience, from: next.from ?? from, to: next.to ?? to })}`);
  };

  const ready: TrafficSummary | null = data?.ready ? data : null;

  return (
    <div className="space-y-5">
      <PageHeader
        title="트래픽 통계"
        description={
          ready
            ? `${ready.period.label} · ${AUDIENCE_LABEL[ready.audience]} 기준 · ${ready.bucket === "hour" ? "시간별" : "날짜별"} 집계`
            : "사이트에 누가 얼마나 들어왔는지 봅니다."
        }
        stats={
          ready
            ? [
                { label: "방문자", value: num(ready.visitors), tone: "accent" },
                { label: "페이지뷰", value: num(ready.views) },
                { label: "세션", value: num(ready.sessions) },
                { label: "이탈률", value: pct(ready.bounceRate) },
              ]
            : undefined
        }
      />

      {error && <ErrorState message={error} onRetry={load} />}

      {data?.ready === false ? (
        <Card>
          <p className="text-[15px] font-bold text-tx">트래픽 통계가 아직 켜지지 않았습니다</p>
          <p className="mt-1 text-[13px] font-medium leading-[1.7] text-tx-3">
            저장소의 supabase-page-views.sql 을 Supabase SQL Editor 에서 한 번 실행하면, 그때부터 방문이 여기에 쌓입니다. 사이트 쪽 기록 코드는 이미 들어 있어
            표만 만들면 됩니다.
          </p>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <FilterTabs
              tabs={[...TRAFFIC_RANGES.map((r) => ({ key: r as TrafficRangeParam, label: RANGE_LABEL[r] })), { key: "custom" as TrafficRangeParam, label: "직접 선택" }]}
              active={rangeParam}
              onChange={(r) => go({ range: r })}
            />
            <FilterTabs
              tabs={(["human", "bot", "all"] as TrafficAudience[]).map((a) => ({ key: a, label: AUDIENCE_LABEL[a], count: ready ? ready.totals[a].views : undefined }))}
              active={audience}
              onChange={(a) => go({ audience: a })}
            />
          </div>

          {rangeParam === "custom" && ready?.customInput && (
            <CustomRangeForm
              key={`${ready.customInput.from}|${ready.customInput.to}`}
              from={ready.customInput.from}
              to={ready.customInput.to}
              today={ready.today}
              serverError={ready.error}
              pending={loading}
              onApply={(f, t) => go({ range: "custom", from: f, to: t })}
            />
          )}

          {ready ? (
            <>
              <TrafficColumns timeline={ready.timeline} bucket={ready.bucket} totals={{ visitors: ready.visitors, views: ready.views }} refreshing={loading} />

              <div className={`grid gap-4 lg:grid-cols-2 transition-opacity duration-200 ${loading ? "opacity-60" : ""}`}>
                <BreakdownList title="많이 본 페이지" rows={ready.pages} emptyText="이 기간에는 본 페이지가 없습니다" hrefFor={(k) => (k.startsWith("/") ? k : null)} />
                <BreakdownList title="어디서 왔나" rows={ready.referrers} emptyText="바깥 사이트에서 들어온 방문이 없습니다" hrefFor={(k) => (k ? `https://${k}` : null)} />
                <BreakdownList title="나라" rows={ready.countries} emptyText="아직 나라 정보가 없습니다" />
                <TabbedBreakdown
                  tabs={[
                    { key: "devices", title: "기기", rows: ready.devices, emptyText: "아직 기기 정보가 없습니다" },
                    { key: "browsers", title: "브라우저", rows: ready.browsers, emptyText: "아직 브라우저 정보가 없습니다" },
                    { key: "oses", title: "운영체제", rows: ready.oses, emptyText: "아직 운영체제 정보가 없습니다" },
                  ]}
                />
                {ready.audience !== "human" && (
                  <BreakdownList title={ready.audience === "bot" ? "어떤 로봇인지" : "로봇만 따로 보면"} rows={ready.bots} emptyText="이 기간에는 로봇 방문이 없습니다" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <SubKpi label="세션당 페이지뷰" value={ready.sessions > 0 ? (ready.views / ready.sessions).toFixed(2) : "-"} hint="한 번 들어와서 몇 쪽을 봤나" />
                <SubKpi label="방문자당 페이지뷰" value={ready.visitors > 0 ? (ready.views / ready.visitors).toFixed(2) : "-"} />
                <SubKpi label="이탈률" value={pct(ready.bounceRate)} hint="한 쪽만 보고 나간 세션의 비율" />
                <SubKpi label="집계된 나라 수" value={String(ready.countries.length)} />
              </div>

              <p className="text-[12px] font-medium leading-[1.7] text-tx-3">
                기간 안 합계 — 사람 {num(ready.totals.human.views)} · 로봇 {num(ready.totals.bot.views)} · 전체 {num(ready.totals.all.views)} 페이지뷰.
                로그인한 관리자의 방문은 세지 않습니다. 방문자는 브라우저에 둔 무작위 번호로 세므로 브라우저를 바꾸거나 저장소를 지우면 새 방문자로 잡힙니다.
                국가는 Vercel 이 알려 주는 값이라 로컬 실행에서는 비어 있습니다.
              </p>
            </>
          ) : (
            !error && <Skeleton />
          )}
        </>
      )}
    </div>
  );
}

function SubKpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <p className="text-[12px] font-medium text-tx-3">{label}</p>
      <p className="mt-1 text-[22px] font-bold tabular-nums tracking-[-0.02em] text-tx">{value}</p>
      {hint && <p className="mt-1 text-[12px] font-medium text-tx-3">{hint}</p>}
    </Card>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4" aria-busy aria-label="트래픽 통계를 불러오는 중">
      <Card>
        <div className="space-y-4">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-8 w-56" />
          <div className="skeleton h-[180px] w-full" />
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="skeleton h-48 rounded-[20px]" />
        <div className="skeleton h-48 rounded-[20px]" />
      </div>
    </div>
  );
}
