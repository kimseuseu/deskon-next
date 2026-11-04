"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { waterStages } from "@/data/water-story";
import type { Photo, Stage } from "@/data/water-story";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 현장의 하루. 이 페이지의 서명입니다.
 *
 * 왼쪽에 제목과 일곱 단계가 붙어 있고, 오른쪽으로 단계가 하나씩 지나갑니다.
 * 두 칸 사이의 선은 호스입니다. 스크롤을 내리면 선이 아래로 그어지고,
 * 선이 닿은 단계에 불이 들어옵니다. 배관을 파는 페이지라, 선이 그어지는
 * 동작 자체가 내용입니다.
 *
 * 선은 스크롤 진행도를 스프링 하나로 눌러 씁니다. 지금 어느 단계인지는
 * 단계마다 화면 가운데 띠에 들어왔는지로 잽니다(useInView).
 */
export function FlowTimeline() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.62", "end 0.62"] });
  const line = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <section ref={ref} aria-label="현장의 하루" className="bg-white text-tx">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <div className="grid grid-cols-[1px_minmax(0,1fr)] gap-x-6 lg:grid-cols-[minmax(0,4fr)_1px_minmax(0,8fr)] lg:gap-x-14">
          {/* 제목과 단계 목록. 넓은 화면에서는 오른쪽이 지나가는 동안 붙어 있습니다. */}
          <div className="col-start-2 row-start-1 mb-14 lg:col-start-1 lg:mb-0">
            <div className="lg:sticky lg:top-[calc(var(--bar)+3rem)]">
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.2] tracking-[-0.035em]">
                {waterStages.title[0]}
                <br />
                {waterStages.title[1]}
              </h2>
              <p className="mt-5 max-w-md whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">{waterStages.lead}</p>

              <ol className="mt-10 hidden lg:block" aria-label="단계">
                {waterStages.stages.map((s, i) => (
                  <li
                    key={s.key}
                    className={`flex items-baseline gap-4 py-2 text-[17px] font-semibold transition-colors duration-500 ${
                      i === active ? "text-tx" : i < active ? "text-tx-3" : "text-tg-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`block h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
                        i <= active ? "bg-tb" : "bg-tg-2"
                      }`}
                    />
                    {s.title}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 호스. 바탕선은 늘 있고, 파란 선이 진행도만큼 내려옵니다. */}
          <div aria-hidden className="relative col-start-1 row-span-2 row-start-1 bg-tg-2 lg:col-start-2 lg:row-span-1">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-tb"
              style={reduce ? { scaleY: 1 } : { scaleY: line }}
            />
          </div>

          <ol className="col-start-2 row-start-2 space-y-24 lg:col-start-3 lg:row-start-1 lg:space-y-40">
            {waterStages.stages.map((s, i) => (
              <StageBlock key={s.key} stage={s} index={i} active={active} onEnter={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StageBlock({
  stage,
  index,
  active,
  onEnter,
}: {
  stage: Stage;
  index: number;
  active: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);
  const lit = index <= active;

  return (
    <li ref={ref} className="relative">
      {/* 호스 위의 이음새. 선이 닿으면 파랗게 켜집니다. */}
      <span
        aria-hidden
        className={`absolute top-3 -left-[calc(1.5rem+7px)] h-[13px] w-[13px] rounded-full border-2 transition-colors duration-500 lg:-left-[calc(3.5rem+7px)] ${
          lit ? "border-tb bg-tb" : "border-tg-2 bg-white"
        }`}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h3
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          className="text-[clamp(1.6rem,3vw,2.6rem)] font-bold leading-[1.25] tracking-[-0.03em] text-tx"
        >
          {stage.title}
        </motion.h3>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          className="mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2"
        >
          {stage.body}
        </motion.p>
        <PhotoGrid layout={stage.layout} photos={stage.photos} />
      </motion.div>
    </li>
  );
}

const photoVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

function Shot({ photo, className = "", sizes }: { photo: Photo; className?: string; sizes: string }) {
  return (
    <motion.figure variants={photoVariants} className={`img-zoom relative overflow-hidden rounded-[20px] bg-tg ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </motion.figure>
  );
}

/** 단계마다 사진의 짜임이 다릅니다. 같은 격자가 일곱 번 반복되면 기록이 아니라 카탈로그로 읽힙니다. */
function PhotoGrid({ layout, photos }: { layout: Stage["layout"]; photos: Photo[] }) {
  const [a, b, c, d] = photos;
  switch (layout) {
    case "row3":
      return (
        <div className="mt-8 grid grid-cols-3 gap-2 lg:mt-10 lg:gap-3">
          {photos.map((p) => (
            <Shot key={p.src} photo={p} className="aspect-[3/4]" sizes="(min-width: 1024px) 28vw, 32vw" />
          ))}
        </div>
      );
    case "bigLeft":
      return (
        <div className="mt-8 grid grid-cols-[2fr_1fr] gap-2 lg:mt-10 lg:gap-3">
          <Shot photo={a} className="row-span-2 aspect-[4/3]" sizes="(min-width: 1024px) 56vw, 64vw" />
          <Shot photo={b} className="h-full min-h-0" sizes="(min-width: 1024px) 28vw, 32vw" />
          <Shot photo={c} className="h-full min-h-0" sizes="(min-width: 1024px) 28vw, 32vw" />
        </div>
      );
    case "quad":
      return (
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-10 lg:gap-3">
          {photos.map((p) => (
            <Shot key={p.src} photo={p} className="aspect-[3/4]" sizes="(min-width: 1024px) 20vw, 48vw" />
          ))}
        </div>
      );
    case "pair":
      return (
        <div className="mt-8 grid grid-cols-[3fr_2fr] gap-2 lg:mt-10 lg:gap-3">
          <Shot photo={a} className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 58vw" />
          <Shot photo={b} className="h-full min-h-0" sizes="(min-width: 1024px) 34vw, 40vw" />
          <Shot photo={c} className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 58vw" />
          <Shot photo={d} className="h-full min-h-0" sizes="(min-width: 1024px) 34vw, 40vw" />
        </div>
      );
    case "bigTop":
      return (
        <div className="mt-8 grid grid-cols-[3fr_2fr] gap-2 lg:mt-10 lg:gap-3">
          <Shot photo={a} className="col-span-2 aspect-[16/9]" sizes="(min-width: 1024px) 84vw, 100vw" />
          <Shot photo={b} className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 58vw" />
          <Shot photo={c} className="h-full min-h-0" sizes="(min-width: 1024px) 34vw, 40vw" />
        </div>
      );
  }
}
