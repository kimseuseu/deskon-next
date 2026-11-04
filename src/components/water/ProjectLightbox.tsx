"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/water-story";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 현장 확대 보기. 카드를 누르면 뜨는 큰 화면입니다.
 *
 * 예전 쌓이는 카드와 같은 짜임입니다. 사진이 화면을 채우고, 왼쪽 위에
 * 연도와 장소, 현장명, 한 줄 메모, 범위 알약이, 오른쪽 아래에 세부 사진
 * 둘이 섭니다. 카드의 표지 사진이 그대로 커져서 열리고(layoutId), 닫을 때는
 * 더 빠르게 제자리로 돌아갑니다. 좌우 화살표나 방향키로 다음 현장으로 갑니다.
 */
export function ProjectLightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Project[];
  /** 열린 현장의 번호. null이면 닫힌 상태. */
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const p = open ? items[index] : null;

  /* 열려 있는 동안 페이지는 멈춥니다. Lenis는 .lenis-stopped를 보고 overflow를 잠급니다. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onStep]);

  return (
    <AnimatePresence>
      {p && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${p.name} 크게 보기`}
          data-lenis-prevent
          className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-tk/70 backdrop-blur-sm" />

          <motion.article
            key={p.slug}
            className="relative h-[min(84svh,780px)] w-full max-w-[1120px] overflow-hidden rounded-[28px] bg-tk text-white shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:rounded-[36px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div layoutId={reduce ? undefined : `cover-${p.slug}`} className="absolute inset-0" transition={{ duration: 0.5, ease: EASE }}>
              <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 1024px) 1120px, 100vw" className="object-cover" priority />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-tk/90 via-tk/40 to-tk/15" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-tk/45 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-12">
              <div className="max-w-2xl pr-14">
                <p className="text-[15px] font-semibold text-white/60">
                  {p.year} · {p.place}
                </p>
                <h3 className="mt-3 text-[clamp(1.6rem,3.6vw,3rem)] font-bold leading-[1.2] tracking-[-0.035em]">{p.name}</h3>
                <p className="mt-4 max-w-xl whitespace-pre-line text-[clamp(0.95rem,1.3vw,1.125rem)] font-medium leading-[1.7] text-white/85">{p.note}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="작업 범위">
                  {p.scope.map((s) => (
                    <li key={s} className="rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-end justify-between gap-6">
                {/* 이전 · 다음. 번호는 사람이 세는 대로. */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onStep(-1)}
                    aria-label="이전 현장"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                  >
                    <span aria-hidden>←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onStep(1)}
                    aria-label="다음 현장"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                  >
                    <span aria-hidden>→</span>
                  </button>
                  <span className="ml-2 text-[13px] font-semibold text-white/70">
                    {index + 1} / {items.length}
                  </span>
                </div>
                <div className="hidden w-[38%] grid-cols-2 gap-3 lg:grid">
                  {p.details.map((d) => (
                    <figure key={d.src} className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-tk">
                      <Image src={d.src} alt={d.alt} fill sizes="20vw" className="object-cover" />
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-[22px] leading-none text-white backdrop-blur-md transition-colors hover:bg-white/30"
            >
              <span aria-hidden>×</span>
            </button>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
