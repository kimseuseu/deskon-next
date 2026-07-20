"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/*
  ── Splash ──
  Wordmark rises from a mask, divisions whisper underneath, curtain lifts.

  0.00s : ink canvas
  0.15s : gold wordmark rises
  0.90s : division keywords fade in
  2.00s : whole screen slides up and out
  2.65s : unmount
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

    // Once per browser session — repeat visits go straight to the hero
    if (sessionStorage.getItem("aovo-splash-played")) {
      splashPlayed = true;
      const raf = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(raf);
    }

    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => {
        setDone(true);
        splashPlayed = true;
        sessionStorage.setItem("aovo-splash-played", "1");
      }, 2650),
    ];

    return () => timers.forEach(clearTimeout);
  }, [skip]);

  if (skip || done) return null;

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const exit = phase >= 3;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#0e0e11",
        transform: exit ? "translateY(-100%)" : "translateY(0)",
        transition: `transform 0.7s ${ease}`,
        pointerEvents: exit ? "none" : "auto",
      }}
      aria-hidden
    >
      <div className="flex flex-col items-center px-6">
        {/* Wordmark rising from a mask */}
        <div className="overflow-hidden py-1">
          <div
            style={{
              transform: phase >= 1 ? "translateY(0)" : "translateY(110%)",
              transition: `transform 1s ${ease}`,
            }}
          >
            <Image
              src="/images/aovo_wordmark_gold.svg"
              alt="AOVO"
              width={595}
              height={212}
              loading="eager"
              className="h-auto w-[min(52vw,300px)]"
            />
          </div>
        </div>

        {/* Divisions */}
        <div
          className="mt-7 flex items-center gap-3 md:gap-5"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: `opacity 0.8s ${ease}`,
          }}
        >
          {DIVISIONS.map((label, i) => (
            <span key={label} className="flex items-center gap-3 md:gap-5">
              {i > 0 && <span className="block h-3 w-px bg-white/15" />}
              <span className="font-paperlogy text-[13px] font-medium tracking-[0.02em] text-white/45 md:text-sm">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
