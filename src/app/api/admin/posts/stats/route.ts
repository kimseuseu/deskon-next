import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";
import { STAT_RANGES, buildViewStats, type RawViewStats, type StatRange, type ViewStatsResponse } from "@/lib/post-stats";

/**
 * 관리자 전용. 현장 노트 조회 통계(전체와 글별: 누적 · 최근 N일 · 오늘 · 날짜별 · 유입 경로별).
 * ?days=7|30|90 (기본 30).
 *
 * supabase-post-views.sql 을 아직 실행하지 않았으면 { ready: false } 를 돌려주고,
 * 화면은 그 안내를 보여줍니다(글 목록은 그대로 동작).
 */
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const asked = Number(req.nextUrl.searchParams.get("days"));
  const days: StatRange = (STAT_RANGES as readonly number[]).includes(asked) ? (asked as StatRange) : 30;

  try {
    const { data, error } = await createAdminClient().rpc("deskon_post_view_stats", { p_days: days });
    if (error) {
      /* 함수나 테이블이 없음 = SQL 미실행 */
      if (error.code === "PGRST202" || error.code === "42883" || error.code === "42P01") {
        return NextResponse.json({ data: { ready: false } satisfies ViewStatsResponse });
      }
      console.error("[admin/posts/stats] failed", error);
      return NextResponse.json({ error: "조회 통계를 불러오지 못했습니다." }, { status: 500 });
    }
    return NextResponse.json({ data: buildViewStats(data as RawViewStats) satisfies ViewStatsResponse });
  } catch (err) {
    console.error("[admin/posts/stats] error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
