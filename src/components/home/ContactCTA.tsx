"use client";

import Link from "next/link";
import Reveal, { LineReveal } from "@/components/motion/Reveal";

export default function ContactCTA() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-28 text-center lg:px-10 lg:py-40">
        <Reveal>
          <p className="eyebrow justify-center text-muted">Contact</p>
        </Reveal>

        <LineReveal
          as="h2"
          className="mt-8 font-paperlogy text-[clamp(2.4rem,6vw,5.2rem)] font-extralight leading-[1.14] tracking-[-0.025em] text-primary"
          lines={[
            <>장비 운영의 다음 단계,</>,
            <>
              <span className="mr-[0.2em] font-serif italic text-accent-deep">아오보</span>와 시작하세요
            </>,
          ]}
        />

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-muted">
            품목과 수량만 알려주시면, 24시간 내에
            현장에 맞는 운영 방안과 견적을 보내드립니다.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/support/contact"
              className="group inline-flex w-full items-center justify-center gap-3 bg-primary px-9 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-colors duration-400 hover:bg-accent-deep sm:w-auto"
            >
              상담 문의하기
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="http://pf.kakao.com/_qxkxnRX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 border border-primary/25 px-9 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary hover:text-cream sm:w-auto"
            >
              카카오 채널 ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <a
            href="tel:010-9929-5363"
            className="mt-12 inline-block font-paperlogy text-lg font-medium text-muted transition-colors duration-300 hover:text-primary"
          >
            010-9929-5363 <span className="ml-2 text-xs text-muted/70">평일 09:00 – 18:00</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
