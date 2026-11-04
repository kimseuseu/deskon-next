"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

const FILMS = [
  {
    src: "/images/aovo-mechanism-3d.mp4",
    title: "메커니즘",
    caption: "체중과 자세에 반응하는 틸팅 메커니즘. 부품 하나까지 검증합니다.",
  },
  {
    src: "/images/aovo-flexible-backrest.mp4",
    title: "플렉시블 등받이",
    caption: "허리의 움직임을 따라오는 등판 설계. 오래 앉는 시간이 달라집니다.",
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
    <figure className="rounded-[28px] bg-white p-3 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
      <div className="overflow-hidden rounded-[20px] bg-tg">
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
      <figcaption className="px-3 pb-3 pt-5">
        <span className="block text-[18px] font-bold tracking-[-0.02em] text-tx">{film.title}</span>
        <span className="mt-1 block whitespace-pre-line text-[14px] font-medium leading-relaxed text-tx-2">
          {film.caption.replace(/\.\s+/g, ".\n")}
        </span>
      </figcaption>
    </figure>
  );
}

/** IDEN 전용 쇼케이스. 사무용 체어 제품 필름 2종 */
export default function IdenCraft() {
  return (
    <section className="bg-tg text-tx">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
            디테일이{" "}
            <span className="mx-0.5 inline-block rounded-full bg-white px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb">운영 품질</span>
            을 만듭니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {"IDEN이 공급하는 체어의 구조를 그대로 보여드립니다.\n보이지 않는 부분까지 검증된 장비만 현장에 갑니다."}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16" gap={0.12}>
          {FILMS.map((film) => (
            <StaggerItem key={film.src}>
              <CraftFilm film={film} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
