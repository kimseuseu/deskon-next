import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { kakaoRedirectUri } from "@/lib/kakao";

// 관리자 전용 — 카카오 로그인 동의 화면으로 보냅니다(1회 연동).
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const restKey = process.env.KAKAO_REST_API_KEY;
  if (!restKey) {
    return NextResponse.json(
      { error: "KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const authUrl = new URL("https://kauth.kakao.com/oauth/authorize");
  authUrl.searchParams.set("client_id", restKey);
  authUrl.searchParams.set("redirect_uri", kakaoRedirectUri(req.url));
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "talk_message");

  return NextResponse.redirect(authUrl.toString());
}
