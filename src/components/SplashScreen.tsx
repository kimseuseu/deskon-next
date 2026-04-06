"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/*
  Phase flow:
  "gallery"  → 0~1.8s   큰 이미지들이 화면을 꽉 채우며 등장
  "logo"     → 1.8~4s   이미지들이 축소·흩어지며 로고가 크게 등장
  "fading"   → 4~4.8s   전체 페이드아웃
  "done"     → 제거
*/

const galleryImages = [
  { src: "/images/aovo-jns901.webp", alt: "의자" },
  { src: "/images/subscribe/rolltainer.webp", alt: "롤테이너" },
  { src: "/images/office-furniture.webp", alt: "사무가구" },
  { src: "/images/subscribe/kitchen.png", alt: "주방집기" },
  { src: "/images/subscribe/pallet.webp", alt: "파랫트" },
  { src: "/images/subscribe/hvac.webp", alt: "냉난방기" },
];

type Phase = "gallery" | "logo" | "fading" | "done";

/* 전역 플래그: 이 JS 실행 컨텍스트(탭) 안에서 이미 재생했는지 추적.
   SPA 내비게이션으로 /→다른페이지→/ 돌아올 때 중복 재생 방지.
   새 탭 / 새로고침 시에는 JS가 새로 로드되므로 false로 초기화됨. */
let splashPlayed = false;

export default function SplashScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("gallery");

  useEffect(() => {
    // 메인 페이지(/)에서만 표시
    if (pathname !== "/") {
      setPhase("done");
      return;
    }

    // 이미 이 탭에서 재생한 적 있으면 스킵
    if (splashPlayed) {
      setPhase("done");
      return;
    }

    const t1 = setTimeout(() => setPhase("logo"), 1800);
    const t2 = setTimeout(() => setPhase("fading"), 4000);
    const t3 = setTimeout(() => {
      setPhase("done");
      splashPlayed = true;
    }, 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [pathname]);

  if (phase === "done") return null;

  const isLogo = phase === "logo" || phase === "fading";

  return (
    <>
      <style jsx global>{`
        /* ── Gallery image entrance ── */
        @keyframes galSlideUp {
          0%   { opacity: 0; transform: translateY(100%) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Gallery → Logo: images scatter & shrink ── */
        @keyframes galShrink0 { to { opacity:0; transform: translate(-120vw, -60vh) scale(0.15) rotate(-20deg); } }
        @keyframes galShrink1 { to { opacity:0; transform: translate(110vw, -50vh) scale(0.1) rotate(15deg); } }
        @keyframes galShrink2 { to { opacity:0; transform: translate(-100vw, 70vh) scale(0.12) rotate(25deg); } }
        @keyframes galShrink3 { to { opacity:0; transform: translate(120vw, 60vh) scale(0.1) rotate(-30deg); } }
        @keyframes galShrink4 { to { opacity:0; transform: translate(-80vw, -80vh) scale(0.15) rotate(18deg); } }
        @keyframes galShrink5 { to { opacity:0; transform: translate(90vw, -70vh) scale(0.12) rotate(-22deg); } }

        /* ── Logo entrance ── */
        @keyframes logoReveal {
          0%   { opacity: 0; transform: scale(2.5); filter: blur(20px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes logoTextUp {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes copyFade {
          0%   { opacity: 0; letter-spacing: 0.4em; }
          100% { opacity: 1; letter-spacing: 0.08em; }
        }
        @keyframes badgeFade {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[9999] bg-[#111119] overflow-hidden"
        style={{
          opacity: phase === "fading" ? 0 : 1,
          transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: phase === "fading" ? "none" : "auto",
        }}
      >
        {/* ── Ambient glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/8 rounded-full blur-[200px]" />
        </div>

        {/* ══════════════════════════════════════════
            Gallery grid — 화면을 꽉 채우는 큰 이미지들
        ══════════════════════════════════════════ */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-0">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{
                animation: isLogo
                  ? `galShrink${i} 0.9s cubic-bezier(0.7,0,0.3,1) ${i * 60}ms forwards`
                  : `galSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both`,
              }}
            >
              {/* Dark overlay on each image */}
              <div className="absolute inset-0 bg-black/30 z-10" />
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 33vw"
                priority={i < 3}
              />
              {/* Label */}
              <span
                className="absolute bottom-4 left-4 z-20 text-[11px] font-medium uppercase tracking-widest text-white/50"
                style={{
                  animation: isLogo ? "none" : `logoTextUp 0.5s ease-out ${0.6 + i * 0.12}s both`,
                  opacity: isLogo ? 0 : undefined,
                }}
              >
                {img.alt}
              </span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            Logo center — 이미지 축소 후 등장
        ══════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{ opacity: isLogo ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div className="text-center px-6">
            {/* Symbol */}
            <div style={{ animation: isLogo ? "logoReveal 1s cubic-bezier(0.16,1,0.3,1) both" : "none" }}>
              <Image
                src="/images/ex_aovo_symbol.png"
                alt="AOVO"
                width={80}
                height={100}
                className="mx-auto h-24 md:h-28 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>

            {/* Brand name */}
            <h1
              className="font-paperlogy text-white text-5xl md:text-7xl font-bold tracking-tight mt-5 mb-3"
              style={{ animation: isLogo ? "logoTextUp 0.7s ease-out 0.3s both" : "none" }}
            >
              AOVO<span className="font-light text-white/40 ml-3">group</span>
            </h1>

            {/* Line */}
            <div
              className="w-20 h-[2px] bg-accent mx-auto mb-5 origin-center"
              style={{ animation: isLogo ? "lineGrow 0.6s ease-out 0.6s both" : "none" }}
            />

            {/* Tagline */}
            <p
              className="text-white/70 text-base md:text-lg font-medium"
              style={{ animation: isLogo ? "copyFade 0.8s ease-out 0.7s both" : "none" }}
            >
              사용하지 않으면 비용도 멈춥니다
            </p>

            {/* Badges */}
            <div
              className="flex items-center justify-center gap-3 mt-7 flex-wrap"
              style={{ animation: isLogo ? "badgeFade 0.6s ease-out 1s both" : "none" }}
            >
              {["구독", "공유", "렌탈", "연대", "유통"].map((s) => (
                <span key={s} className="text-[11px] font-medium text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
