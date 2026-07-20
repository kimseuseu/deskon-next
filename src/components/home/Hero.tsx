"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { divisions } from "@/data/divisions";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Splash lasts ~2.65s on first load — hero copy waits for the curtain lift. */
const BASE_DELAY = 0.4;

/* 기존 사이트의 히어로 영상 3종 + 시그니처 카피 3연작 (원본 짝 그대로) */
const SLIDES = [
  {
    src: "/images/aovo-brand-bg-web.mp4",
    skipIntro: false,
    line: "자리가 비면, 비용도 멈춥니다",
    context: "사무용 의자 구독",
  },
  {
    src: "/images/hero-rolltainer-web.mp4",
    skipIntro: false,
    line: "이직 · 감원 시, 비용도 멈춥니다",
    context: "사무가구 구독 & 렌탈",
  },
  /* desk 클립은 첫 0.9초가 필러박스 세로 컷 — 1초부터 재생 */
  {
    src: "/images/hero-desk-web.mp4",
    skipIntro: true,
    line: "굴러가지 않으면, 비용도 멈춥니다",
    context: "롤테이너 구독 & 공유",
  },
] as const;

const SLIDE_MS = 7000;

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [slide, setSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Only ship the video loops to viewports that justify it.
    // setTimeout (not rAF) so background tabs still mount & buffer the video.
    const id = setTimeout(() => {
      if (window.matchMedia("(min-width: 768px)").matches && !reduce) {
        setShowVideo(true);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [reduce]);

  // Rotate slides on a fixed rhythm (videos stream progressively on demand)
  useEffect(() => {
    if (!showVideo) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [showVideo]);

  // Play only the active video; pause the rest
  useEffect(() => {
    if (!showVideo) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === slide) {
        if (SLIDES[i].skipIntro && v.currentTime < 0.9) v.currentTime = 1;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [slide, showVideo]);

  // Background tabs block play() — resume the active slide on return
  const slideRef = useRef(slide);
  useEffect(() => {
    slideRef.current = slide;
  }, [slide]);
  useEffect(() => {
    if (!showVideo) return;
    const onVisible = () => {
      if (document.hidden) return;
      videoRefs.current[slideRef.current]?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [showVideo]);

  return (
    <section data-hero-dark className="grain relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink text-cream">
      {/* Backdrop */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed LCP backdrop; optimizer adds no value for a single pre-sized frame */}
        <img
          src="/images/hero-poster.jpg"
          alt=""
          fetchPriority="high"
          className={`h-full w-full object-cover transition-opacity duration-1000 ${showVideo ? "opacity-0" : "opacity-100"}`}
        />
        {showVideo &&
          SLIDES.map((s, i) => (
            <video
              key={s.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "none"}
              autoPlay={i === 0}
              onTimeUpdate={
                s.skipIntro
                  ? (e) => {
                      if (e.currentTarget.currentTime < 0.9) e.currentTarget.currentTime = 1;
                    }
                  : undefined
              }
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
                slide === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={s.src} type="video/mp4" />
            </video>
          ))}
        {/* Scrim: readable type, visible image */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/72 via-ink/38 to-ink/86" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
      </div>

      {/* Copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-6 pb-0 lg:px-10">
        <div className="pb-14 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: BASE_DELAY, ease: EASE }}
            className="font-serif text-base italic tracking-wide text-gold md:text-lg"
          >
            From ownership to operation
          </motion.p>

          <h1 className="mt-5 font-paperlogy font-extralight leading-[1.06] tracking-[-0.025em] text-[clamp(3.2rem,9.5vw,8.2rem)]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "108%" }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 1.1, delay: BASE_DELAY + 0.12, ease: EASE }}
              >
                소유에서
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "108%" }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 1.1, delay: BASE_DELAY + 0.24, ease: EASE }}
              >
                운영으로<span className="text-gold">.</span>
              </motion.span>
            </span>
          </h1>

          {/* 시그니처 카피 — 활성 영상과 함께 로테이션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: BASE_DELAY + 0.5, ease: EASE }}
            className="mt-7 h-[3.4rem] md:h-[3.8rem]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={slide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="block font-paperlogy text-base font-medium text-white/85 md:text-lg">
                  {SLIDES[slide].line}
                </span>
                <span className="mt-1 block text-[12px] tracking-[0.04em] text-white/55 md:text-[13px]">
                  {SLIDES[slide].context}
                </span>
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom index bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: BASE_DELAY + 0.8 }}
          className="border-t border-white/15"
        >
          <div className="flex items-center justify-between gap-6 py-5">
            {/* Scroll cue */}
            <div className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60 md:flex">
              <span className="relative block h-8 w-px overflow-hidden bg-white/20">
                <span className="absolute left-0 top-0 h-3 w-px animate-[scrollDown_1.8s_ease-in-out_infinite] bg-gold" />
              </span>
              Scroll
            </div>

            {/* Division quick index */}
            <nav aria-label="사업분야 바로가기" className="flex w-full flex-wrap items-center gap-x-6 gap-y-1.5 pr-16 md:w-auto md:justify-end md:gap-9 md:pr-20">
              {divisions.map((d) => (
                <Link
                  key={d.slug}
                  href={d.href}
                  className="group flex items-baseline gap-2 py-2.5"
                >
                  <span className="font-serif text-[11px] italic text-gold">{d.no}</span>
                  <span className="font-paperlogy text-[13px] font-medium text-white/75 transition-colors duration-300 group-hover:text-white md:text-sm">
                    {d.nameKo}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
