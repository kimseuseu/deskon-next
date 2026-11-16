import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";
import { buildTrafficSummary, type RawTrafficSummary, type TrafficResponse } from "@/lib/traffic";
import { formatPeriodLabel, isTrafficAudience, resolveTrafficPeriod, toKstDateString } from "@/lib/traffic-period";

/**
 * 관리자 전용. 트래픽 통계(/admin/analytics) 가 읽는 합계.
 *   ?range=24h|7d|28d|3m|custom  &from=YYYY-MM-DD&to=YYYY-MM-DD (custom 일 때)  &audience=human|bot|all
 *
 * supabase-page-views.sql 을 아직 실행하지 않았으면 { ready: false } 를 돌려주고, 화면은 그 안내를 보여 줍니다.
 */
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = req.nextUrl.searchParams;
  const now = new Date();
  const audienceParam = sp.get("audience");
  const audience = isTrafficAudience(audienceParam) ? audienceParam : "human";
  const { period, rangeParam, error, customInput } = resolveTrafficPeriod(
    { range: sp.get("range"), from: sp.get("from"), to: sp.get("to") },
    now,
  );

  try {
    const { data, error: dbError } = await createAdminClient().rpc("deskon_traffic_summary", {
      p_since: period.since.toISOString(),
      p_until: period.until.toISOString(),
      p_bucket: period.bucket,
      p_audience: audience,
    });
    if (dbError) {
      /* 함수나 표가 없음 = SQL 미실행 */
      if (dbError.code === "PGRST202" || dbError.code === "42883" || dbError.code === "42P01") {
        return NextResponse.json({ data: { ready: false } satisfies TrafficResponse }, { headers: { "cache-control": "no-store" } });
      }
      console.error("[admin/traffic] failed", dbError);
      return NextResponse.json({ error: "트래픽 통계를 불러오지 못했습니다." }, { status: 500 });
    }
    const summary = buildTrafficSummary(data as RawTrafficSummary, {
      period,
      rangeParam,
      audience,
      error,
      customInput,
      today: toKstDateString(now),
      labelPeriod: formatPeriodLabel,
    });
    return NextResponse.json({ data: summary satisfies TrafficResponse }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[admin/traffic] error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
