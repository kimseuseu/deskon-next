"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/ui/Logo";

/*
  ── Splash ──
  흰 화면. 워드마크가 올라오고, 다섯 분야가 그 밑에 서고, 화면이 위로 걷힙니다.

  0.00s : 흰 바탕
  0.15s : 워드마크
  0.80s : 분야 이름
  1.80s : 화면이 위로 걷힌다
  2.35s : 사라진다
*/

let splashPlayed = false;

const DIVISIONS = ["구독", "공유", "렌탈", "자산연대", "유통"] as const;

export default function SplashScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const skip = pathname !== "/" || splashPlayed;

  useEffect(() => {
    if (skip) return;

    if (sessionStorage.getItem("aovo-splash-played")) {
      splashPlayed = true;
      const raf = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(raf);
    }

    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => {
        setDone(true);
        splashPlayed = true;
        sessionStorage.setItem("aovo-splash-played", "1");
      }, 2350),
    ];

    return () => timers.forEach(clearTimeout);
  }, [skip]);

  if (skip || done) return null;

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const exit = phase >= 3;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        transform: exit ? "translateY(-100%)" : "translateY(0)",
        transition: `transform 0.55s ${ease}`,
        pointerEvents: exit ? "none" : "auto",
      }}
      aria-hidden
    >
      <div className="flex flex-col items-center px-6">
        <div className="overflow-hidden py-1">
          <div
            style={{
              transform: phase >= 1 ? "translateY(0)" : "translateY(110%)",
              transition: `transform 0.8s ${ease}`,
            }}
          >
            <LogoMark size="lg" />
          </div>
        </div>

        <div
          className="mt-6 flex items-center gap-4 md:gap-6"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
          }}
        >
          {DIVISIONS.map((label, i) => (
            <span key={label} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <span className="block h-3 w-px bg-tg-2" />}
              <span className="font-paperlogy text-[14px] font-medium tracking-[0.02em] text-tx-3 md:text-[15px]">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
