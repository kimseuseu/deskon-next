"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal, { LineReveal } from "@/components/motion/Reveal";
import { COMPANY } from "@/lib/constants";
import QuoteWizard from "./QuoteWizard";

/**
 * 견적 문의 페이지의 첫 화면과 폼.
 * 첫 화면 뒤의 둥근 판 둘이 스크롤에 다른 속도로 흐르고(transform·opacity만),
 * 폼 구역의 바탕에도 큰 원 하나가 천천히 따라옵니다. 움직임을 줄인 환경에서는 가만히 있습니다.
 */
export default function ContactExperience() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const discY = useTransform(heroP, [0, 1], [0, 220]);
  const ringY = useTransform(heroP, [0, 1], [0, -140]);
  const ringRotate = useTransform(heroP, [0, 1], [0, 28]);
  const shapesOpacity = useTransform(heroP, [0, 0.7, 1], [1, 0.5, 0]);
  const textY = useTransform(heroP, [0, 1], [0, 60]);
  const textOpacity = useTransform(heroP, [0, 0.8], [1, 0.35]);

  const { scrollYProgress: formP } = useScroll({ target: formRef, offset: ["start end", "end start"] });
  const blobY = useTransform(formP, [0, 1], [120, -220]);

  const still = reduce ? { y: 0, rotate: 0, opacity: 1 } : undefined;

  return (
    <>
      <section ref={heroRef} className="relative overflow-clip bg-white pt-32 pb-14 lg:pt-40 lg:pb-20">
        {/* 뒤판 */}
        <motion.div
          aria-hidden
          style={still ?? { y: discY, opacity: shapesOpacity }}
          className="pointer-events-none absolute -right-28 -top-10 h-[18rem] w-[18rem] rounded-full bg-tb-soft lg:-right-10 lg:top-10 lg:h-[34rem] lg:w-[34rem]"
        />
        <motion.div
          aria-hidden
          style={still ?? { y: ringY, rotate: ringRotate, opacity: shapesOpacity }}
          className="pointer-events-none absolute right-[26%] top-[30%] hidden h-56 w-56 rounded-[2.5rem] border border-tb/25 lg:block"
        />
        <motion.div
          aria-hidden
          style={still ?? { y: ringY, opacity: shapesOpacity }}
          className="pointer-events-none absolute right-[10%] top-[22%] h-2.5 w-2.5 rounded-full bg-tb lg:right-[14%] lg:top-[62%] lg:h-3 lg:w-3"
        />

        <motion.div style={still ? undefined : { y: textY, opacity: textOpacity }} className="relative mx-auto max-w-[1200px] px-6">
          <div className="max-w-[56rem]">
            <Reveal direction="none" duration={0.6}>
              <p className="eyebrow">Request a quote</p>
            </Reveal>
            <LineReveal
              as="h1"
              className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] text-tx"
              lineClassName="pb-[0.08em]"
              lines={[<>몇 번만 골라 주세요.</>, <>현장에 맞는 견적을 보내드립니다.</>]}
            />
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
                {"분야와 현장 정보를 고르고 연락처를 남겨 주세요.\n담당자가 24시간 안에 연락드립니다."}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium text-tx-3">
                <span>급하시면 전화가 빠릅니다</span>
                <a href={`tel:${COMPANY.phone}`} className="text-[16px] font-bold tracking-[-0.02em] text-tx transition-colors hover:text-tb">
                  {COMPANY.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      <section ref={formRef} className="relative overflow-x-clip bg-tg pb-24 pt-10 text-tx lg:pb-36 lg:pt-14">
        <motion.div
          aria-hidden
          style={reduce ? undefined : { y: blobY }}
          className="pointer-events-none absolute -left-32 top-1/3 hidden h-[30rem] w-[30rem] rounded-full bg-white/70 lg:block"
        />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal duration={0.7} amount={0.05}>
            <QuoteWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* 2026-11-09: 전화기에서는 뒤판 원을 위로 올리고 둥근 테두리는 넓은 화면에만 둔다. */
