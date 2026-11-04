"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Brand } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

/**
 * 달려콜. 흰 바탕, 모서리가 둥근 액자, 알약 버튼, 그리고 전화기 화면입니다.
 * 파는 것이 앱으로 부르는 긴급 인력이라 전화기가 곧 제품입니다.
 * 액센트는 파랑 하나만 씁니다.
 */
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.09}s` });

/** 리드 문단은 문장 하나가 한 줄입니다. 카피는 그대로, 줄만 나눕니다. */
const lines = (s: string) => s.replace(/\.\s+/g, ".\n");

export function DcallHero({ brand }: { brand: Brand }) {
  return (
    <section className="bg-white pt-28 text-tx lg:pt-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <Image
            src={brand.logo!}
            alt="달려콜"
            width={900}
            height={264}
            priority
            className="rise h-9 w-auto lg:h-11"
            style={step(0)}
          />
          <h1
            className="rise mt-8 text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-tx"
            style={step(1)}
          >
            펑크 난 자리를
            <br />
            그날 메웁니다<span className="text-tb">.</span>
          </h1>
          <p className="rise mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1" style={step(2)}>
            <span className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-tb">
              <CountUp value={30} duration={1.4} />
            </span>
            <span className="text-[20px] font-bold tracking-[-0.02em] text-tx">분 이내 도착, 전국</span>
          </p>
          <p className="rise mt-6 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2" style={step(3)}>
            {lines(brand.description)}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
            <a
              href={brand.siteUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
            >
              timecall.kr에서 부르기
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]"
            >
              상담 문의
            </Link>
          </div>
        </div>

        {/* 전화기 세 대. 가운데가 서고 양옆이 비스듬히 기댑니다. */}
        <div className="lg:col-span-5">
          <div className="rise relative mx-auto aspect-[4/5] max-w-[440px] rounded-[32px] bg-tg" style={step(2)}>
            {[
              { src: "/images/brands/dcall/app-when.webp", alt: "달려콜 앱, 언제 필요한지 고르는 화면", cls: "left-[6%] top-[14%] w-[44%] -rotate-[9deg]" },
              { src: "/images/brands/dcall/app-matching.webp", alt: "달려콜 앱, 인력을 배정하는 화면", cls: "right-[6%] top-[14%] w-[44%] rotate-[9deg]" },
              { src: "/images/brands/dcall/app-call.webp", alt: "달려콜 앱, 지금 부르기 화면", cls: "left-1/2 top-[8%] w-[50%] -translate-x-1/2 z-10" },
            ].map((ph, i) => (
              <div
                key={ph.src}
                className={`rise absolute overflow-hidden rounded-[1.4rem] shadow-[0_18px_40px_rgba(25,31,40,0.16)] transition-transform duration-200 ease-out hover:-translate-y-2 ${ph.cls}`}
                style={step(3 + i)}
              >
                <Image src={ph.src} alt={ph.alt} width={640} height={1391} sizes="220px" className="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const moments = [
  { when: "출근한다던 직원이 연락이 안 된다", then: "긴급 인력 투입, 30분 안에 도착", image: "/images/brands/dcall/d01-absent-worker.webp", alt: "결원으로 비어 있는 물류 작업 자리" },
  { when: "트럭은 왔는데 내릴 사람이 없다", then: "상하차 인력 투입, 다 내릴 때까지", image: "/images/brands/dcall/d02-truck-no-crew.webp", alt: "도착한 트럭과 비어 있는 하차 현장" },
  { when: "행사 시작 30분 전, 부스가 반밖에 안 섰다", then: "행사 인력 투입, 오픈 전 완료", image: "/images/brands/dcall/d04-event-deadline.webp", alt: "오픈 직전 아직 완성되지 않은 행사 부스" },
  { when: "가구와 집기를 오늘 안에 옮겨야 한다", then: "운반 인력 투입, 전화한 그날", image: "/images/brands/dcall/d06-office-move.webp", alt: "오늘 안에 옮겨야 하는 사무실 집기" },
];

const trades = ["전기", "배관 · 수도", "설비 · 수리", "목공", "미장 · 도배"];

/** 이런 순간, 바로 달려콜. 네 장면과 기술자 다섯. */
export function DcallMoments() {
  return (
    <section className="bg-tg text-tx">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
            이런 순간, 바로 달려콜<span className="text-tb">!</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {"사람 하나가 비어서 일이 멈췄습니다.\n내일은 늦고, 미룰 수도 없습니다.\n그때 거는 전화입니다."}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.1}>
          {moments.map((m) => (
            <StaggerItem key={m.image} className="group rounded-[28px] bg-white p-3 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] bg-tg">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
                />
              </div>
              <div className="px-3 pb-3 pt-5">
                <p className="text-[18px] font-bold leading-snug tracking-[-0.02em]">{m.when}!</p>
                <p className="mt-2 text-[14px] font-semibold text-tb">{m.then}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[24px] bg-white px-7 py-6 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
            <span className="text-[18px] font-bold tracking-[-0.02em]">기술이 필요한 일은 기술자가 갑니다</span>
            <ul className="flex flex-wrap gap-2">
              {trades.map((t) => (
                <li key={t} className="rounded-full bg-tg px-4 py-1.5 text-[14px] font-semibold text-tx">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
