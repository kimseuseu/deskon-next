"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

const FILMS = [
  {
    src: "/images/aovo-mechanism-3d.mp4",
    no: "01",
    title: "메커니즘",
    caption: "체중과 자세에 반응하는 틸팅 메커니즘 — 부품 하나까지 검증합니다.",
  },
  {
    src: "/images/aovo-flexible-backrest.mp4",
    no: "02",
    title: "플렉시블 등받이",
    caption: "허리의 움직임을 따라오는 등판 설계 — 오래 앉는 시간이 달라집니다.",
  },
] as const;

/** 뷰포트에 들어올 때만 재생되는 제품 필름 */
function CraftFilm({ film }: { film: (typeof FILMS)[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <figure>
      <div className="overflow-hidden border border-white/10">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          className="aspect-video h-auto w-full object-cover"
        >
          <source src={film.src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-5 flex items-baseline gap-4">
        <span className="font-serif text-sm italic text-gold">{film.no}</span>
        <span>
          <span className="block font-paperlogy text-lg font-medium text-cream">{film.title}</span>
          <span className="mt-1 block text-[13px] leading-relaxed text-white/60">
            {film.caption}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** IDEN 전용 쇼케이스 — 사무용 체어 제품 필름 2종 */
export default function IdenCraft() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow text-white/55">Product Craft</p>
            <h2 className="mt-5 font-paperlogy text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.2] tracking-[-0.02em]">
              디테일이 <span className="font-serif italic text-gold">운영 품질</span>을 만듭니다
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs pb-1 text-sm leading-relaxed text-white/60">
              IDEN이 공급하는 체어의 구조를 그대로 보여드립니다.
              보이지 않는 부분까지 검증된 장비만 현장에 갑니다.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          {FILMS.map((film, i) => (
            <Reveal key={film.src} delay={i * 0.12}>
              <CraftFilm film={film} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
