"use client";

import Link from "next/link";
import Reveal, { LineReveal } from "@/components/motion/Reveal";

export default function Manifesto() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-40">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-muted">AOVO Group</p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <LineReveal
            as="h2"
            className="font-paperlogy text-[clamp(2.1rem,4.6vw,4.1rem)] font-light leading-[1.22] tracking-[-0.02em] text-primary"
            lines={[
              <>쓰지 않는 순간,</>,
              <>
                비용도 <span className="font-serif italic text-accent-deep">멈춥니다</span>.
              </>,
            ]}
          />

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.9] text-muted md:text-base">
              장비를 사는 순간 감가상각과 관리 인력, 유휴 자산이 함께 따라옵니다.
              아오보 그룹은 구매 대신 운영을 제안합니다. 필요한 만큼만 쓰는 —
              2,500개 기업이 선택한 자산 운영의 새로운 기준입니다.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-3 border-b border-primary/30 pb-2 font-paperlogy text-sm font-medium tracking-[0.06em] text-primary transition-colors duration-300 hover:border-accent-deep hover:text-accent-deep"
            >
              그룹소개
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
