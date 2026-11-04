import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import { water } from "@/data/facility";
import { waterHero } from "@/data/water-story";
import { COMPANY } from "@/lib/constants";
import { HeroVideo } from "./HeroVideo";
import { ScrollCue } from "./ScrollCue";

const step = (i: number): CSSProperties => ({ animationDelay: `${0.1 + i * 0.09}s` });

/**
 * 첫 장면. 흰 바탕 가운데에 굵은 제목과 알약 버튼, 그 밑에 둥근 영상 액자.
 *
 * 첫 화면은 멈춰 있어도 완성입니다. 스크롤이 시작되면 제목이 떠나고 액자가
 * 자라 화면을 채우며, 그 위에 논지 두 줄이 선 뒤 다음 장면으로 이어집니다.
 *
 *   0.04 → 0.30  제목과 버튼이 올라가며 떠난다.
 *   0.08 → 0.50  액자가 자라 화면을 채운다. 모서리도 펴진다.
 *   0.56 → 0.80  영상이 눌리고 논지가 한 줄씩 선다.
 *
 * 액자 아래쪽의 스크롤 유도 알약(ScrollCue)은 0.10까지 사라집니다.
 */
export function WaterHero() {
  const phone = water.phone ?? COMPANY.phone;
  return (
    <Scene className="tw-hero">
      <div className="stage bg-white">
        <div
          className="cue-out absolute inset-x-0 top-[calc(var(--bar)+2.5svh)] px-5 text-center lg:top-[calc(var(--bar)+6svh)]"
          style={span(0.04, 0.3)}
        >
          <h1
            className="rise mx-auto max-w-4xl text-[clamp(1.9rem,6vw,4.6rem)] font-bold leading-[1.18] tracking-[-0.035em] text-tx text-balance"
            style={step(0)}
          >
            {waterHero.title[0]} {waterHero.title[1]}
          </h1>
          <p
            className="rise mx-auto mt-3 max-w-2xl whitespace-pre-line text-[clamp(0.9rem,1.5vw,1.25rem)] font-medium leading-[1.6] text-tx-2 lg:mt-5"
            style={step(1)}
          >
            {waterHero.lead}
          </p>
          <div className="rise mt-5 flex flex-row items-center justify-center gap-2.5 sm:gap-3 lg:mt-7" style={step(2)}>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tb px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-[16px]"
            >
              {water.callLabel ?? "전화 상담"}
              <span className="hidden font-medium text-white/85 sm:inline">{phone}</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center rounded-full bg-tg px-5 py-3 text-[15px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-[16px]"
            >
              {water.inquiryLabel ?? "설치 문의하기"}
            </Link>
          </div>
        </div>

        {/* 영상 액자. 처음엔 제목 밑의 둥근 카드, 스크롤하면 자라 화면을 채웁니다. */}
        <div
          className="tw-hero-card cue absolute isolate overflow-hidden bg-tg [--hero-bottom:3svh] [--hero-side:1.25rem] [--hero-top:max(50svh,24rem)] sm:[--hero-top:50svh] lg:[--hero-side:max(2.5rem,calc((100vw-1200px)/2))] lg:[--hero-top:46svh]"
        >
          <HeroVideo src={waterHero.video} poster={waterHero.poster.src} className="h-full w-full object-cover" />
          <div aria-hidden className="tw-hero-dim cue film-only absolute inset-0 bg-tk" />
          <ScrollCue />
          <div aria-hidden className="film-only absolute inset-0 grid place-items-center px-6">
            <div className="text-center">
              <p className="text-[clamp(1.75rem,4.6vw,3.8rem)] font-bold leading-[1.25] tracking-[-0.03em] text-white text-balance">
                {waterHero.thesis.map((line, i) => (
                  <span key={line} className="cue-in block" style={span(0.58 + i * 0.1, 0.7 + i * 0.1)}>
                    {line}
                  </span>
                ))}
              </p>
              <p className="cue-in mt-5 text-[clamp(1rem,1.5vw,1.25rem)] font-medium text-white/80" style={span(0.8, 0.9)}>
                {waterHero.thesisNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
