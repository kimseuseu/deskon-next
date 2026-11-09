import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import { water } from "@/data/facility";
import { waterHero } from "@/data/water-story";
import { COMPANY } from "@/lib/constants";
import { FrameScrub } from "./FrameScrub";
import { HeroClock } from "./HeroClock";
import { HeroHead } from "./HeroHead";
import { ScrollCue } from "./ScrollCue";

const step = (i: number): CSSProperties => ({ animationDelay: `${0.1 + i * 0.09}s` });

/* 장면은 380svh입니다. 앞 180svh가 하루(아침 → 밤 → 논지)이고, 남은 한 화면은 다음 장면의
   시트가 밤 위로 올라오는 동안입니다(globals.css의 .sheet-rise). 아래 숫자는 하루 안의 비율이고,
   film()이 장면 전체의 진행도로 바꿉니다. */
const FILM = 180 / 280;
const film = (from: number, to: number) => span(from * FILM, to * FILM);

/** 프레임이 마지막 장(밤)에 닿는 지점(하루 기준). 그 뒤로는 밤에 멈춰 있고 논지가 마저 섭니다.
    불은 프레임의 0.87에서 켜지므로 하루의 약 0.7부터 밤입니다. */
const DAY_END = 0.8 * FILM;

/**
 * 첫 장면. 흰 바탕 가운데에 굵은 제목과 알약 버튼, 그 밑에 둥근 영상 액자.
 *
 * 액자 안은 «세우는 날» 타임랩스(영상 D)이고, 스크롤이 프레임을 넘깁니다.
 * 첫 화면은 아침의 빈 잔디에 멈춰 있어도 완성입니다. 스크롤이 시작되면 제목이 떠나고
 * 액자가 자라 화면을 채우는 동안 천막과 탱크가 서고 해가 집니다. 밤이 되면 그 위에
 * 논지 두 줄이 서고 다음 장면으로 이어집니다. 귀퉁이의 시계가 시각을 읽어 줍니다.
 *
 * 액자는 화면 크기의 상자 하나이고, clip-path로 잘라 보여 줍니다(globals.css .tw-hero-card).
 * 상자 크기가 바뀌지 않으니 캔버스를 다시 잡지 않고, 레이아웃도 흔들리지 않습니다.
 * 액자의 시작점(--hero-top)은 글 묶음(HeroHead)이 제 높이를 재서 정합니다.
 *
 * 하루 기준(장면 진행도 × 0.643):
 *   0.03 → 0.22  제목과 버튼이 올라가며 떠난다.
 *   0.05 → 0.38  액자가 자라 화면을 채운다. 모서리도 펴진다.
 *   0.00 → 0.80  프레임이 넘어간다. 아침 → 설치 → 해넘이 → 밤(0.70부터).
 *   0.68 → 0.86  밤 위에 논지가 한 줄씩 선다. 0.88 → 0.94 덧말.
 * 장면 기준 0.643 → 1.00: 다음 장면이 둥근 시트로 올라오고 액자는 한 뼘 물러난다.
 *
 * 액자 아래쪽의 스크롤 유도 알약(ScrollCue)은 하루의 0.08까지 사라집니다.
 */
export function WaterHero() {
  const phone = water.phone ?? COMPANY.phone;
  return (
    <Scene className="tw-hero">
      <div className="stage bg-white">
        {/* 글 묶음. 흐름 속에 서서 높이를 재고, 그 밑에서 액자가 시작됩니다. */}
        <HeroHead
          className="cue-out px-5 pt-[calc(var(--bar)+2.5svh)] text-center lg:pt-[calc(var(--bar)+6svh)]"
          style={film(0.03, 0.22)}
        >
          <h1
            className="rise mx-auto max-w-4xl text-[clamp(1.9rem,6vw,4.6rem)] font-bold leading-[1.18] tracking-[-0.035em] text-tx text-balance"
            style={step(0)}
          >
            {waterHero.title[0]} {waterHero.title[1]}
          </h1>
          <p
            className="rise mx-auto mt-3 max-w-4xl whitespace-pre-line text-[clamp(0.9rem,1.5vw,1.25rem)] font-medium leading-[1.6] text-tx-2 lg:mt-5"
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
        </HeroHead>

        {/* 영상 액자. 화면 크기의 상자를 clip-path로 잘라, 처음엔 글 밑의 둥근 카드로 보이다가
            스크롤하면 잘린 자리가 열리며 화면을 채웁니다. 안쪽은 스크롤로 넘기는 프레임입니다. */}
        <div className="tw-hero-card cue absolute inset-0 isolate bg-tg">
          <FrameScrub base={`/seq/${waterHero.seq}`} count={waterHero.count} to={DAY_END} />
          <div aria-hidden className="tw-hero-dim cue film-only absolute inset-0 bg-tk" />
          <HeroClock from={waterHero.clock.from} to={waterHero.clock.to} labels={waterHero.clock.labels} end={DAY_END} />
          {/* 스크롤 유도 알약은 보이는 액자의 아래 가장자리를 따라갑니다. */}
          <div className="tw-hero-cue absolute inset-x-0 h-0">
            <ScrollCue />
          </div>
          <div aria-hidden className="film-only absolute inset-0 grid place-items-center px-6">
            <div className="text-center">
              <p className="text-[clamp(1.75rem,4.6vw,3.8rem)] font-bold leading-[1.25] tracking-[-0.03em] text-white text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.4)]">
                {waterHero.thesis.map((line, i) => (
                  <span key={line} className="cue-in block" style={film(0.68 + i * 0.08, 0.78 + i * 0.08)}>
                    {line}
                  </span>
                ))}
              </p>
              <p
                className="cue-in mt-5 text-[clamp(1rem,1.5vw,1.25rem)] font-medium text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
                style={film(0.88, 0.94)}
              >
                {waterHero.thesisNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
