"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { span } from "@/components/film/cue";
import { useSceneProgress } from "@/components/film/Scene";
import type { Project } from "@/data/water-story";
import { ProjectLightbox } from "./ProjectLightbox";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 현장 카드 줄. 등장은 스크롤에 묶지 않습니다.
 *
 * 카드를 누르면 확대 보기(ProjectLightbox)가 뜹니다. 카드 아래의 «크게 보기»
 * 단추와 손을 올렸을 때 떠오르는 사진이 누를 수 있다는 것을 알립니다.
 *
 * 장면 진행도가 기준점(at)을 한 번 넘으면 카드가 제 시간에 맞춰 차례로
 * 올라오고, 다시 기준점 위로 올라가면 더 빠르게 내려가며 사라집니다.
 * 옆으로 미는 동작만 스크롤이 맡습니다(globals.css의 .shelf-track).
 */
export function ShelfCards({ items, at = 0.34, panFrom = 0.46 }: { items: Project[]; at?: number; panFrom?: number }) {
  const progress = useSceneProgress();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );
  /* 새로고침으로 장면 한가운데에서 시작해도 기준점을 이미 넘었으면 바로 보입니다. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(progress.get() > at));
    return () => cancelAnimationFrame(id);
  }, [progress, at]);
  useMotionValueEvent(progress, "change", (p) => setShown(p > at));

  return (
    <>
    <ul className="shelf-track cue flex gap-5 px-6 lg:gap-7" style={span(panFrom, 1)} aria-label="현장 목록">
      {items.map((p, i) => (
        <motion.li
          key={p.slug}
          initial={false}
          animate={reduce ? { opacity: shown ? 1 : 0 } : shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 72, scale: 0.96 }}
          transition={
            shown
              ? { duration: 0.7, delay: i * 0.07, ease: EASE }
              : { duration: 0.35, delay: (items.length - 1 - i) * 0.03, ease: [0.4, 0, 1, 1] }
          }
          className={`shelf-card w-[min(78vw,300px)] shrink-0 ${i % 3 === 1 ? "lg:mt-10" : i % 3 === 2 ? "lg:-mt-6" : ""}`}
          style={{ "--i": i } as CSSProperties}
        >
          <button
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${p.name} 크게 보기`}
            className="group block w-full overflow-hidden rounded-[24px] bg-white text-left shadow-[0_18px_50px_rgba(25,31,40,0.1)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(25,31,40,0.16)] focus-visible:ring-4 focus-visible:ring-tb/40 focus-visible:outline-none active:translate-y-0"
          >
            <motion.div layoutId={reduce ? undefined : `cover-${p.slug}`} className="relative aspect-[4/3] overflow-hidden bg-tg">
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </motion.div>
            <div className="p-5">
              <p className="text-[13px] font-semibold text-tx-3">
                {p.year} · {p.place}
              </p>
              <h3 className="mt-1 text-[19px] font-bold leading-snug tracking-[-0.02em]">{p.name}</h3>
              <dl className="mt-4 space-y-2 border-t border-tg-2 pt-4 text-[13px]">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 font-medium text-tx-3">급수</dt>
                  <dd className="text-right font-semibold text-tx">{p.scope[0]}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 font-medium text-tx-3">배수</dt>
                  <dd className="text-right font-semibold text-tx">{p.scope[p.scope.length - 1]}</dd>
                </div>
              </dl>
              {/* 누르라는 단추. 손을 올리면 파랗게 찹니다. */}
              <span className="mt-4 flex items-center justify-between rounded-full bg-tg px-4 py-2.5 text-[13px] font-semibold text-tx transition-colors duration-200 group-hover:bg-tb group-hover:text-white">
                현장 크게 보기
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </button>
        </motion.li>
      ))}
    </ul>
    <ProjectLightbox items={items} index={open} onClose={close} onStep={step} />
    </>
  );
}
