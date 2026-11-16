import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, setAdminSessionCookie } from "@/lib/admin-session";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase-admin";

/**
 * 통합 관리자 허브의 «관리자 페이지 열기» 자동 로그인 (연동 규격 "관리자 자동 로그인").
 *
 *   GET  /api/hub/login            → 204 (이 사이트가 자동 로그인을 지원한다는 뜻)
 *   POST /api/hub/login (폼)       → username(이메일) · password · next(기본 /admin)
 *        맞으면 세션 쿠키를 심고 303 으로 next 로, 틀리면 303 으로 /login?error=hub 로.
 *
 * 허브는 이 맥의 브라우저에서 폼을 제출하므로 Origin 은 로컬(127.0.0.1·localhost)이거나 이 사이트 자신이다.
 * 비밀번호 검사는 /api/admin/login 과 같다(bcrypt, 옛 평문은 그대로 비교).
 */

const LOGIN_PAGE = "/login?error=hub";

export async function GET() {
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    const self = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").replace(/:\d+$/, "");
    return host === "127.0.0.1" || host === "localhost" || host === "[::1]" || (!!self && host === self);
  } catch {
    return false;
  }
}

/** 같은 사이트 안의 경로만 허용한다("//다른곳" 같은 값은 /admin 으로). */
function safeNext(value: FormDataEntryValue | null): string {
  const s = typeof value === "string" ? value.trim() : "";
  return s.startsWith("/") && !s.startsWith("//") && !s.includes("\\") ? s : "/admin";
}

export async function POST(req: NextRequest) {
  const back = (path: string, status = 303) => NextResponse.redirect(new URL(path, req.nextUrl.origin), { status, headers: { "cache-control": "no-store" } });

  if (!originAllowed(req)) return back(LOGIN_PAGE);
  const limit = rateLimit(`admin-login:${getClientIp(req)}`, 10, 5 * 60_000);
  if (!limit.ok) return back(LOGIN_PAGE);

  const form = await req.formData().catch(() => null);
  if (!form) return back(LOGIN_PAGE);
  const email = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const next = safeNext(form.get("next"));
  if (!email || !password) return back(LOGIN_PAGE);

  try {
    const { data: admin, error } = await createAdminClient().from("deskon_admins").select("email, name, password_hash").eq("email", email).single();
    if (error || !admin) return back(LOGIN_PAGE);
    const ok = admin.password_hash.startsWith("$2") ? await compare(password, admin.password_hash) : admin.password_hash === password;
    if (!ok) return back(LOGIN_PAGE);

    const res = back(next);
    setAdminSessionCookie(res, createAdminSessionToken({ email: admin.email, name: admin.name }));
    return res;
  } catch (err) {
    console.error("[hub/login] error", err);
    return back(LOGIN_PAGE);
  }
}
