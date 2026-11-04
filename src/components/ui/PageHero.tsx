"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

/**
 * 보조 페이지(그룹소개 · 고객지원 · 약관)의 첫 화면.
 * 흰 바탕 가운데에 작은 파란 라벨, 굵은 제목, 리드 한 단락.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="bg-white pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Reveal direction="none" duration={0.6}>
          <p className="eyebrow justify-center">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 text-[clamp(2rem,5vw,4.2rem)] leading-[1.15] text-tx text-balance">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
