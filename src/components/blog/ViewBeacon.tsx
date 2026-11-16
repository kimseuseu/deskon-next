"use client";

import { useEffect } from "react";

/**
 * 글을 실제로 화면에 띄운 방문을 한 번 셉니다(관리자 글 목록의 조회 통계).
 *
 * - 같은 탭에서 같은 글을 그날 다시 열거나 새로 고쳐도 한 번만 셉니다(sessionStorage).
 * - 백그라운드 탭으로 열린 글은 그 탭을 볼 때 셉니다.
 * - 보내는 것은 글 주소와 어디서 왔는지(리퍼러)뿐입니다. 서버는 리퍼러를 경로로 분류만 하고 저장하지 않습니다.
 */
export default function ViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    let sent = false;

    const send = () => {
      if (sent || document.visibilityState !== "visible") return;
      sent = true;

      const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
      const key = `aovo:view:${slug}`;
      try {
        if (sessionStorage.getItem(key) === today) return;
        sessionStorage.setItem(key, today);
      } catch {
        /* 저장소를 못 쓰는 브라우저는 열 때마다 셉니다. */
      }

      /* 이 글로 바로 들어왔으면 리퍼러 그대로. 사이트 안의 다른 페이지를 거쳐 왔는데
         바깥 리퍼러가 없으면 «사이트 안에서 이동»으로 셉니다. */
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      let landedHere = true;
      try {
        landedHere = !nav || new URL(nav.name).pathname === window.location.pathname;
      } catch {
        /* 그대로 둡니다 */
      }
      const ref = landedHere ? document.referrer : document.referrer || window.location.origin;

      void fetch("/api/blog/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ref }),
        keepalive: true,
      }).catch(() => {});
    };

    send();
    document.addEventListener("visibilitychange", send);
    return () => document.removeEventListener("visibilitychange", send);
  }, [slug]);

  return null;
}
