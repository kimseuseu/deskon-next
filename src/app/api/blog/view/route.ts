import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";
import { isBlogConfigured } from "@/lib/blog";
import { classifySource, isCountableUserAgent } from "@/lib/post-stats";

/**
 * 글 조회 한 번을 기록합니다. 글 페이지의 ViewBeacon 이 부릅니다.
 *
 * 세지 않는 것: 검색 로봇과 스크립트(UA), 다른 사이트에서 온 요청(Origin), 로그인한 관리자, 발행되지 않은 글.
 * 남기는 것: 글 · 날짜 · 유입 경로별 숫자뿐. IP · 쿠키 · 리퍼러 주소는 저장하지 않습니다.
 * 무슨 일이 있어도 방문자 화면에는 영향을 주지 않도록 늘 204 로 답합니다.
 */

const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent");
  if (!isCountableUserAgent(ua)) return done();

  /* 같은 사이트의 페이지에서 보낸 요청만. 브라우저의 same-origin POST 는 Origin 을 꼭 붙입니다. */
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const origin = req.headers.get("origin");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).host : "";
  } catch {
    return done();
  }
  if (!host || originHost !== host) return done();
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return done();

  const body = (await req.json().catch(() => null)) as { slug?: unknown; ref?: unknown } | null;
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
  if (!slug || slug.length > 200) return done();
  const ref = typeof body?.ref === "string" ? body.ref.slice(0, 2000) : "";

  if (!isBlogConfigured()) return done();
  /* 글을 쓰고 고치는 사람이 자기 글을 열어 본 것은 세지 않습니다. */
  if (await getAdminSession()) return done();

  try {
    const { error } = await createAdminClient().rpc("deskon_record_post_view", {
      p_slug: slug,
      p_source: classifySource(ref, host, ua),
    });
    /* 함수가 아직 없으면(supabase-post-views.sql 미실행) 조용히 넘어갑니다. */
    if (error && error.code !== "PGRST202" && error.code !== "42883") {
      console.error("[blog/view] record failed", error);
    }
  } catch (err) {
    console.error("[blog/view] record error", err);
  }
  return done();
}
