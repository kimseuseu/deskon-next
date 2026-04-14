"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  ── Minimal Splash ──
  Clean, typographic, smooth.

  Phase 1 (0.0s) : background ready
  Phase 2 (0.3s) : "AOVO GROUP" fades in large
  Phase 3 (1.2s) : service keywords slide up
  Phase 4 (3.6s) : everything fades out
  Phase 5 (4.4s) : unmount
*/

let splashPlayed = false;

const SERVICES = ["구독", "공유", "렌탈", "자산연대", "유통"] as const;

export default function SplashScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const skip = pathname !== "/" || splashPlayed;

  useEffect(() => {
    if (skip) {
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 50),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => {
        setDone(true);
        splashPlayed = true;
      }, 4400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [skip]);

  if (skip || done) return null;

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const fadeOut = phase >= 4;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#08080c",
        opacity: fadeOut ? 0 : 1,
        transition: `opacity 0.8s ${ease}`,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* ── AOVO GROUP ── */}
        <h1
          className="font-paperlogy select-none"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 1,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(24px)",
            filter: phase >= 2 ? "blur(0)" : "blur(8px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}, filter 1s ${ease}`,
          }}
        >
          <span className="font-bold tracking-[-0.03em] text-white">
            AOVO
          </span>
          <span className="font-light tracking-[0.04em] text-white/30 ml-[0.15em]">
            GROUP
          </span>
        </h1>

        {/* ── Services ── */}
        <div
          className="flex items-center gap-3 md:gap-5 mt-8 md:mt-10"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
            filter: phase >= 3 ? "blur(0)" : "blur(4px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}, filter 0.8s ${ease}`,
          }}
        >
          {SERVICES.map((label, i) => (
            <span key={label} className="flex items-center gap-3 md:gap-5">
              {i > 0 && (
                <span className="block w-px h-3 bg-white/10" />
              )}
              <span className="text-white/50 text-sm md:text-base font-paperlogy font-medium tracking-[-0.02em]">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
