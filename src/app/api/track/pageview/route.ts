import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { isBlogConfigured } from "@/lib/blog";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase-admin";
import { detectBot, parsePageViewPayload, parseUserAgent, referrerHost } from "@/lib/traffic";

/**
 * 공개 페이지 방문 한 번을 기록합니다. PageViewTracker 가 부릅니다.
 *
 * 세지 않는 것: 다른 사이트에서 온 요청(Origin), 로그인한 관리자. 검색 로봇은 저장은 하되 is_bot 으로 분리합니다.
 * 남기는 것: 시각 · 경로 · 익명 번호 둘 · 유입 사이트 호스트 · 국가 코드 · 기기/브라우저/운영체제 이름.
 * 무슨 일이 있어도 방문자 화면에는 영향을 주지 않도록 늘 204 로 답합니다.
 */

const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  /* 같은 사이트의 페이지에서 보낸 요청만 */
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  let originHost = "";
  try {
    const origin = req.headers.get("origin");
    originHost = origin ? new URL(origin).host : "";
  } catch {
    return done();
  }
  if (!host || originHost !== host) return done();
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return done();

  const limit = rateLimit(`pageview:${getClientIp(req)}`, 240, 60_000);
  if (!limit.ok) return done();

  const payload = parsePageViewPayload(await req.json().catch(() => null));
  if (!payload) return done();

  if (!isBlogConfigured()) return done();
  /* 사이트를 고치고 보는 관리자의 방문은 세지 않습니다. */
  if (await getAdminSession()) return done();

  const ua = req.headers.get("user-agent");
  const { isBot, botName } = detectBot(ua);
  const { device, browser, os } = parseUserAgent(ua);
  const country = req.headers.get("x-vercel-ip-country");

  try {
    const { error } = await createAdminClient().from("deskon_page_views").insert({
      path: payload.path,
      visitor_id: payload.visitorId,
      session_id: payload.sessionId,
      referrer_host: referrerHost(payload.referrer, host),
      country: country ? country.slice(0, 8).toUpperCase() : null,
      device,
      browser,
      os,
      is_bot: isBot,
      bot_name: botName,
    });
    /* 표가 아직 없으면(supabase-page-views.sql 미실행) 조용히 넘어갑니다. */
    if (error && error.code !== "42P01" && error.code !== "PGRST205") {
      console.error("[track/pageview] insert failed", error);
    }
  } catch (err) {
    console.error("[track/pageview] error", err);
  }
  return done();
}
