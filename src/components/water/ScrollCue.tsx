"use client";

import { span } from "@/components/film/cue";

/**
 * 첫 화면의 스크롤 유도. 영상 액자 아래쪽 가운데에 선 흰 알약입니다.
 *
 * 화살표가 숨 쉬듯 내려갔다 올라오고(globals.css의 cueDip), 스크롤이 시작되면
 * 알약은 곧 사라집니다(0.00 → 0.05). 누르면 밤이 되어 논지가 선 자리까지 내려갑니다.
 * 움직임을 줄인 환경에서는 화살표가 멈춰 있습니다.
 */
export function ScrollCue({ label = "아래로 내려 보세요" }: { label?: string }) {
  const go = () => {
    const hero = document.querySelector<HTMLElement>(".tw-hero");
    if (!hero) return;
    const top = hero.getBoundingClientRect().top + window.scrollY;
    /* 장면 진행도 0.61 지점: 해가 지고 액자 가운데에 논지가 다 선 다음, 시트가 올라오기 직전입니다. */
    const target = top + (hero.offsetHeight - window.innerHeight) * 0.61;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label="다음 장면으로 내려가기"
      className="cue-out absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 py-2 pr-3 pl-4 text-[13px] font-semibold whitespace-nowrap text-tx shadow-[0_8px_24px_rgba(25,31,40,0.18)] backdrop-blur-md transition-transform duration-200 hover:bg-white active:scale-[0.97] sm:gap-2.5 sm:py-2.5 sm:pr-4 sm:pl-5 sm:text-[14px] lg:bottom-7 lg:text-[15px]"
      style={span(0, 0.05)}
    >
      {label}
      <span aria-hidden className="tw-cue-arrow grid h-6 w-6 place-items-center rounded-full bg-tb">
        <span className="mb-[3px] block h-[7px] w-[7px] rotate-45 border-r-2 border-b-2 border-white" />
      </span>
    </button>
  );
}
