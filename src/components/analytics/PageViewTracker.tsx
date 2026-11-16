"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * 공개 페이지의 방문을 한 번씩 기록합니다(관리자 «트래픽 통계»).
 *
 * - 방문자 번호는 localStorage, 세션 번호는 sessionStorage 에 둔 무작위 값입니다. 쿠키는 쓰지 않습니다.
 *   30분 넘게 쉬었다 돌아오면 새 세션으로 셉니다.
 * - 보내는 것은 경로(쿼리스트링 제외) · 두 번호 · 처음 들어왔을 때의 리퍼러뿐입니다.
 *   서버는 리퍼러에서 호스트 이름만 남기고, 기기 정보는 User-Agent 를 이름으로 바꿔 저장합니다.
 * - 관리자(/admin)·로그인 페이지는 이 컴포넌트가 없는 레이아웃이라 세지 않습니다.
 */

const VISITOR_KEY = "aovo:visitor";
const SESSION_KEY = "aovo:session";
const SESSION_TS_KEY = "aovo:session-ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function randomId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* 아래 폴백 */
  }
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function visitorId(): string | null {
  try {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) {
      v = randomId();
      localStorage.setItem(VISITOR_KEY, v);
    }
    return v;
  } catch {
    return null;
  }
}

function sessionId(): string | null {
  try {
    const now = Date.now();
    const last = Number(sessionStorage.getItem(SESSION_TS_KEY) ?? 0);
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s || now - last > SESSION_TIMEOUT_MS) {
      s = randomId();
      sessionStorage.setItem(SESSION_KEY, s);
    }
    sessionStorage.setItem(SESSION_TS_KEY, String(now));
    return s;
  } catch {
    return null;
  }
}

export default function PageViewTracker() {
  const pathname = usePathname();
  /* 개발 모드의 이중 effect · 같은 경로 재렌더에 두 번 보내지 않게 */
  const lastSent = useRef<string | null>(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    const v = visitorId();
    const s = sessionId();
    if (!v || !s) return;

    /* 리퍼러는 사이트에 처음 들어온 페이지에서만 뜻이 있습니다. 안에서 이동한 뒤에는 보내지 않습니다. */
    const referrer = firstLoad.current ? document.referrer || null : null;
    firstLoad.current = false;

    void fetch("/api/track/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorId: v, sessionId: s, referrer }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
