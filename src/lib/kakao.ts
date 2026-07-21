import { createAdminClient } from "@/lib/supabase-admin";

/*
  카카오톡 "나에게 보내기" 알림
  ────────────────────────────────
  문의가 접수되면 관리자 본인의 카카오톡으로 알림을 보냅니다.

  필요한 환경변수:
  - KAKAO_REST_API_KEY   (카카오 개발자 앱의 REST API 키)   — 필수
  - KAKAO_CLIENT_SECRET  (앱에서 "보안 → Client Secret"을 켠 경우에만) — 선택
  - NEXT_PUBLIC_SITE_URL (예: https://www.aovo.kr)          — 선택(기본값 존재)

  리프레시 토큰은 deskon_settings 테이블에 저장되며, 사용할 때마다
  카카오가 새 토큰을 내려주면 자동으로 갱신합니다 → 만료로 알림이 끊기지 않습니다.
*/

const KAUTH = "https://kauth.kakao.com";
const KAPI = "https://kapi.kakao.com";
const REFRESH_TOKEN_KEY = "kakao_refresh_token";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aovo.kr";

function restApiKey(): string {
  const key = process.env.KAKAO_REST_API_KEY;
  if (!key) throw new Error("Missing KAKAO_REST_API_KEY");
  return key;
}

/** authorize/callback이 동일하게 쓸 리다이렉트 URI (카카오 콘솔 등록값과 일치해야 함) */
export function kakaoRedirectUri(requestUrl: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(requestUrl).origin;
  return `${base.replace(/\/$/, "")}/api/kakao/callback`;
}

/* ── deskon_settings 저장소 ── */
async function readSetting(key: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("deskon_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return data?.value ?? null;
}

async function writeSetting(key: string, value: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase
    .from("deskon_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
}

async function getRefreshToken(): Promise<string | null> {
  return (await readSetting(REFRESH_TOKEN_KEY)) ?? process.env.KAKAO_REFRESH_TOKEN ?? null;
}

/** 인가 코드 → 토큰 교환 (최초 연동 시 1회) */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<void> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: restApiKey(),
    redirect_uri: redirectUri,
    code,
  });
  if (process.env.KAKAO_CLIENT_SECRET) {
    body.set("client_secret", process.env.KAKAO_CLIENT_SECRET);
  }

  const res = await fetch(`${KAUTH}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body,
  });
  const json = await res.json();
  if (!res.ok || !json.refresh_token) {
    throw new Error(`카카오 토큰 발급 실패: ${JSON.stringify(json)}`);
  }
  await writeSetting(REFRESH_TOKEN_KEY, json.refresh_token);
}

/** 리프레시 토큰으로 액세스 토큰 발급 — 새 리프레시 토큰이 오면 저장(자동 갱신) */
async function getAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error("카카오 리프레시 토큰이 없습니다 — 관리자에서 연동을 먼저 진행하세요");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: restApiKey(),
    refresh_token: refreshToken,
  });
  if (process.env.KAKAO_CLIENT_SECRET) {
    body.set("client_secret", process.env.KAKAO_CLIENT_SECRET);
  }

  const res = await fetch(`${KAUTH}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body,
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) {
    throw new Error(`카카오 토큰 갱신 실패: ${JSON.stringify(json)}`);
  }
  // 카카오는 리프레시 토큰 만료가 임박했을 때만 새 토큰을 내려줌 → 있으면 저장
  if (json.refresh_token) {
    await writeSetting(REFRESH_TOKEN_KEY, json.refresh_token);
  }
  return json.access_token as string;
}

/** "나에게 보내기" 텍스트 메시지 전송 */
async function sendMemo(text: string, linkUrl: string): Promise<void> {
  const accessToken = await getAccessToken();
  const templateObject = {
    object_type: "text",
    text: text.slice(0, 200), // 카카오 텍스트 템플릿 최대 200자
    link: { web_url: linkUrl, mobile_web_url: linkUrl },
    button_title: "관리자에서 보기",
  };

  const res = await fetch(`${KAPI}/v2/api/talk/memo/default/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams({ template_object: JSON.stringify(templateObject) }),
  });
  if (!res.ok) {
    throw new Error(`카카오 메시지 전송 실패: ${res.status} ${await res.text()}`);
  }
}

export interface InquiryNotice {
  name: string;
  company?: string | null;
  phone: string;
  inquiry_type: string;
  service_category?: string | null;
  message: string;
}

/**
 * 새 문의 알림 — 실패해도 절대 예외를 던지지 않습니다(문의 저장을 막지 않도록).
 * KAKAO_REST_API_KEY가 없으면 조용히 건너뜁니다.
 */
export async function notifyNewInquiry(inq: InquiryNotice): Promise<void> {
  try {
    if (!process.env.KAKAO_REST_API_KEY) return;
    const text = [
      "[아오보] 새 문의가 접수되었습니다",
      `· 이름: ${inq.name}${inq.company ? ` (${inq.company})` : ""}`,
      `· 연락처: ${inq.phone}`,
      `· 유형: ${inq.inquiry_type}${inq.service_category ? ` / ${inq.service_category}` : ""}`,
      `· 내용: ${inq.message}`,
    ].join("\n");
    await sendMemo(text, `${SITE_URL.replace(/\/$/, "")}/admin/inquiries`);
  } catch (err) {
    console.error("Kakao notify failed:", err);
  }
}
