import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span, through } from "@/components/film/cue";
import { HeroReel, type Clip, type Window } from "./HeroReel";

const step = (i: number): CSSProperties => ({ animationDelay: `${0.1 + i * 0.09}s` });

const hero = {
  title: ["소유에서", "운영", "으로."] as const,
  lead: "구독, 공유, 렌탈, 자산연대, 유통.\n비즈니스 장비를 쓰는 만큼만 운영하는 아오보 그룹입니다.",
};

/* 첫 화면의 세 편. 시간 대신 스크롤이 넘깁니다. 이름은 오른쪽 레일에만 작게 섭니다.
   급배수는 /water 첫 장면의 «세우는 날»을 앞뒤로 이어 붙인 루프(아침→밤→아침)라 끊김이 없습니다.
   가스기기는 영상이 생길 때까지 정지 사진 한 장입니다(프롬프트: docs/home-hero-video-prompts.md). */
const CLIPS: Clip[] = [
  { src: "/images/hero-water-web.mp4", poster: "/images/home/poster-water.jpg", context: "급배수" },
  { src: "/images/aovo-brand-bg-web.mp4", poster: "/images/home/poster-chair.jpg", context: "사무용 의자" },
  { poster: "/images/home/poster-gas.jpg", context: "가스기기" },
];

/* 편마다 머무는 구간 [들어옴 시작, 들어옴 끝, 나감 시작, 나감 끝].
   겹치는 0.18 동안 다음 편이 아래서 올라와 앞 편을 덮습니다. 스크롤 한 화면 반 정도라
   와이프가 스크롤을 따라오는 것이 눈에 보입니다. 첫 편은 스크롤 전부터 보여야 하므로
   들어오는 구간을 0 앞에 둡니다. */
const WINDOWS: Window[] = [
  [-0.02, -0.01, 0.22, 0.4],
  [0.22, 0.4, 0.58, 0.76],
  [0.58, 0.76, 1.2, 1.3],
];

/**
 * 첫 장면. 영상이 화면을 가득 채웁니다(옛 사이트의 풀페이지 첫 화면).
 * 스크롤하면 세 편이 차례로 녹아 바뀌고, 왼쪽 아래의 시그니처 문장도 함께 바뀝니다.
 * 제목과 버튼은 내내 서 있습니다. 헤더는 이 위에서 투명합니다([data-hero-dark]).
 */
export default function Hero() {
  return (
    <Scene className="home-hero">
      <div data-hero-dark className="stage relative isolate bg-tk text-white">
        {/* 영상 세 편. 지금 지나는 편만 재생합니다. */}
        <HeroReel clips={CLIPS} windows={WINDOWS} />
        {/* 글이 읽히는 어둠 */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tk/85 via-tk/35 to-tk/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-tk/50 via-transparent to-transparent" />
        {/* 장면 끝에서 어두워진다. 다음 장면의 흰 판이 그 위로 밀려 올라온다. */}
        <div aria-hidden className="cue-in absolute inset-0 bg-tk [--dy:0px]" style={span(0.86, 1)} />

        {/* 오른쪽 레일: 세 편의 번호와 제목, 스크롤만큼 차오르는 선. 넓은 화면에서만. */}
        <ol aria-hidden className="absolute top-1/2 right-10 z-10 hidden -translate-y-1/2 lg:block">
          <span className="absolute top-2 bottom-2 left-[5px] w-px bg-white/20">
            <span className="home-rail-fill block h-full w-full bg-white" />
          </span>
          {CLIPS.map((c, i) => (
            <li key={c.context} className="relative flex items-center gap-4 py-5 pl-6">
              <span className="cue-through absolute top-1/2 left-0 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-white [--dy:0px]" style={through(...WINDOWS[i])} />
              <span className="absolute top-1/2 left-[3px] h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-white/50" />
              <span className="font-serif text-[15px] italic text-tb-soft">0{i + 1}</span>
              <span className="cue-through text-[14px] font-semibold text-white [--dy:0.5rem]" style={through(...WINDOWS[i])}>
                {c.context}
              </span>
            </li>
          ))}
        </ol>

        {/* 스크롤 유도. 첫 편이 나가기 시작하면 사라집니다. */}
        <div
          aria-hidden
          className="cue-out absolute bottom-[5.5rem] left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/12 py-2 pr-2.5 pl-4 text-[13px] font-semibold text-white backdrop-blur-md lg:right-10 lg:bottom-10 lg:left-auto lg:translate-x-0 lg:text-[14px]"
          style={span(0.02, 0.14)}
        >
          스크롤하면 다음 현장
          <span className="tw-cue-arrow grid h-6 w-6 place-items-center rounded-full bg-tb">
            <span className="mb-[3px] block h-[7px] w-[7px] rotate-45 border-r-2 border-b-2 border-white" />
          </span>
        </div>

        {/* 글 */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-10 lg:px-10 lg:pb-16">
          <h1 className="rise max-w-4xl text-[clamp(2.6rem,7.5vw,6.4rem)] leading-[1.05] text-white text-balance" style={step(1)}>
            {hero.title[0]} <span className="font-serif italic text-tb-soft">{hero.title[1]}</span>
            {hero.title[2]}
          </h1>
          <p
            className="rise mt-5 max-w-2xl whitespace-pre-line text-[clamp(0.95rem,1.4vw,1.2rem)] font-medium leading-[1.65] text-white/80"
            style={step(2)}
          >
            {hero.lead}
          </p>
          <div className="rise mt-7 flex flex-row items-center gap-2.5 sm:gap-3" style={step(3)}>
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center rounded-full bg-tb px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-[16px]"
            >
              상담 문의하기
            </Link>
            <Link
              href="#divisions"
              className="inline-flex items-center justify-center rounded-full bg-white/14 px-5 py-3 text-[15px] font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/24 active:scale-[0.98] sm:px-7 sm:py-3.5 sm:text-[16px]"
            >
              사업분야 보기
            </Link>
          </div>

          {/* 전화기: 세 편 중 어디인지. 막대가 그 편을 지나는 만큼 차오릅니다. */}
          <div className="cue-out mt-8 flex gap-1.5 lg:hidden" style={span(0.9, 1)} aria-hidden>
            {CLIPS.map((c, i) => (
              <span key={c.context} className="block h-1 w-12 overflow-hidden rounded-full bg-white/25">
                <span className="home-bar cue block h-full w-full bg-white" style={span(Math.max(WINDOWS[i][0], 0), WINDOWS[i][2])} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
