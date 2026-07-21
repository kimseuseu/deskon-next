import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { exchangeCodeForTokens, kakaoRedirectUri } from "@/lib/kakao";

function page(title: string, body: string, ok: boolean) {
  return new NextResponse(
    `<!doctype html><html lang="ko"><head><meta charset="utf-8">
     <meta name="viewport" content="width=device-width,initial-scale=1">
     <title>${title}</title></head>
     <body style="font-family:system-ui,sans-serif;background:#0e0e11;color:#f7f5f0;
       display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
       <div style="max-width:440px;padding:40px;text-align:center">
         <div style="font-size:40px;margin-bottom:16px">${ok ? "✅" : "⚠️"}</div>
         <h1 style="font-size:20px;font-weight:600;margin:0 0 12px">${title}</h1>
         <p style="font-size:14px;line-height:1.7;color:#b9b6ad;margin:0 0 28px">${body}</p>
         <a href="/admin/inquiries" style="display:inline-block;padding:12px 28px;
           background:#caaa61;color:#0e0e11;text-decoration:none;font-weight:600;
           font-size:13px;letter-spacing:0.05em">관리자로 이동</a>
       </div></body></html>`,
    { status: ok ? 200 : 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

// 관리자 전용 — 카카오가 인가 코드를 돌려보내면 토큰으로 교환해 저장합니다.
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const error = req.nextUrl.searchParams.get("error");
  if (error) {
    return page("연동 실패", `카카오 인증이 취소되었거나 실패했습니다. (${error})`, false);
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return page("연동 실패", "인가 코드가 전달되지 않았습니다.", false);
  }

  try {
    await exchangeCodeForTokens(code, kakaoRedirectUri(req.url));
    return page(
      "카카오 알림 연동 완료",
      "이제 새 문의가 접수되면 이 카카오 계정으로 알림이 전송됩니다.",
      true
    );
  } catch (err) {
    console.error("Kakao callback error:", err);
    return page("연동 실패", `토큰 발급 중 오류가 발생했습니다. ${String(err)}`, false);
  }
}
