"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Brand } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

/**
 * 달려콜. 사이트는 흰 바탕에 빨강 하나, 모서리가 둥근 액자, 알약 버튼,
 * 그리고 전화기 화면입니다. 파는 것이 앱으로 부르는 긴급 인력이라
 * 전화기가 곧 제품입니다. 그 문법을 그대로 옮깁니다.
 */
const RED = "#e60012";
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.09}s` });

export function DcallHero({ brand }: { brand: Brand }) {
  return (
    <section className="bg-white pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 pb-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-28">
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
            className="rise mt-8 font-paperlogy text-[clamp(2.4rem,5.6vw,4.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#0c0d12]"
            style={step(1)}
          >
            펑크 난 자리를
            <br />
            그날 메웁니다<span style={{ color: RED }}>.</span>
          </h1>
          <p className="rise mt-6 flex items-baseline gap-3" style={step(2)}>
            <span className="font-paperlogy text-[clamp(3.6rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.04em]" style={{ color: RED }}>
              <CountUp value={30} duration={1.4} />
            </span>
            <span className="font-paperlogy text-xl font-semibold text-[#0c0d12]">분 이내 도착, 전국</span>
          </p>
          <p className="rise mt-6 max-w-xl text-[15px] leading-[1.9] text-[#5c6068]" style={step(3)}>
            {brand.description}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
            <a
              href={brand.siteUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-paperlogy text-[14px] font-bold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: RED }}
            >
              timecall.kr에서 부르기
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center rounded-full border border-[#e4e5ea] px-7 py-3.5 font-paperlogy text-[14px] font-semibold text-[#0c0d12] transition-colors duration-300 hover:border-[#0c0d12]"
            >
              상담 문의
            </Link>
          </div>
        </div>

        {/* 전화기 세 대. 가운데가 서고 양옆이 비스듬히 기댑니다. */}
        <div className="lg:col-span-5">
          <div className="rise relative mx-auto aspect-[4/5] max-w-[440px] rounded-[2rem] bg-[#fdeceb]" style={step(2)}>
            {[
              { src: "/images/brands/dcall/app-when.webp", alt: "달려콜 앱, 언제 필요한지 고르는 화면", cls: "left-[6%] top-[14%] w-[44%] -rotate-[9deg]" },
              { src: "/images/brands/dcall/app-matching.webp", alt: "달려콜 앱, 인력을 배정하는 화면", cls: "right-[6%] top-[14%] w-[44%] rotate-[9deg]" },
              { src: "/images/brands/dcall/app-call.webp", alt: "달려콜 앱, 지금 부르기 화면", cls: "left-1/2 top-[8%] w-[50%] -translate-x-1/2 z-10" },
            ].map((ph, i) => (
              <div
                key={ph.src}
                className={`rise absolute overflow-hidden rounded-[1.4rem] shadow-[0_18px_40px_rgba(12,13,18,0.18)] transition-transform duration-300 ease-out hover:-translate-y-2 ${ph.cls}`}
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
    <section className="border-t border-[#e4e5ea] bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="font-paperlogy text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#0c0d12]">
            이런 순간, 바로 달려콜<span style={{ color: RED }}>!</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#5c6068]">
            사람 하나가 비어서 일이 멈췄습니다. 내일은 늦고, 미룰 수도 없습니다. 그때 거는 전화입니다.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {moments.map((m) => (
            <StaggerItem key={m.image} className="group">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.25rem] bg-[#f6f6f8]">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-4 font-paperlogy text-[17px] font-bold leading-snug tracking-[-0.02em] text-[#0c0d12]">{m.when}!</p>
              <p className="mt-2 text-[13px] font-medium" style={{ color: RED }}>
                {m.then}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[1.25rem] bg-[#f6f6f8] px-6 py-5">
            <span className="font-paperlogy text-[15px] font-bold text-[#0c0d12]">기술이 필요한 일은 기술자가 갑니다</span>
            <ul className="flex flex-wrap gap-2">
              {trades.map((t) => (
                <li key={t} className="rounded-full border border-[#e4e5ea] bg-white px-4 py-1.5 text-[13px] font-medium text-[#0c0d12]">
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
