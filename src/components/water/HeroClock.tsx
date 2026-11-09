"use client";

import { useRef } from "react";
import { useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useSceneProgress } from "@/components/film/Scene";

/**
 * 첫 장면 액자 귀퉁이의 시계. 타임랩스의 시각을 읽어 줍니다.
 *
 * 장면 진행도 0 → end를 from시 → to시로 바꿔 «06:30»처럼 적고, labels의 지점을
 * 지나면 «설치 중»이 «행사 중»으로 바뀝니다. 스크롤이 곧 하루라는 것을 글자로
 * 한 번 더 말하는 자리입니다. 다시 그리지 않고 글자만 바꿉니다.
 * 보이는 액자의 왼쪽 위를 따라가다가, 액자가 화면을 채우면 헤더 밑에 섭니다(globals.css의 .tw-hero-clock).
 * 움직이는 캔버스 위라 backdrop-filter는 쓰지 않습니다(매 프레임 흐림 비용).
 * 움직임을 줄인 환경에서는 첫 시각에 멈춰 있습니다.
 */
export function HeroClock({
  from,
  to,
  labels,
  end = 0.9,
}: {
  /** 시작 시각과 끝 시각. 시 단위(6.5 = 06:30). */
  from: number;
  to: number;
  /** [진행도, 라벨]. 진행도가 그 지점을 넘으면 라벨이 바뀝니다. 오름차순. */
  labels: readonly (readonly [number, string])[];
  /** 프레임이 마지막 장에 닿는 진행도. FrameScrub의 to와 같게. */
  end?: number;
}) {
  const progress = useSceneProgress();
  const reduce = useReducedMotion();
  const timeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const fmt = (h: number) => {
    const m = Math.round(h * 60);
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  };
  const labelAt = (t: number) => {
    let out = labels[0][1];
    for (const [at, text] of labels) if (t >= at) out = text;
    return out;
  };

  /* 글자는 바뀔 때만 씁니다. 분이 같으면 DOM을 건드리지 않습니다. */
  useMotionValueEvent(progress, "change", (p) => {
    if (reduce) return;
    const t = Math.min(1, Math.max(0, p / end));
    const time = fmt(from + (to - from) * t);
    if (timeRef.current && timeRef.current.textContent !== time) timeRef.current.textContent = time;
    const label = labelAt(t);
    if (labelRef.current && labelRef.current.textContent !== label) labelRef.current.textContent = label;
  });

  return (
    <div
      aria-hidden
      className="tw-hero-clock absolute inline-flex items-center gap-2 rounded-full bg-white/95 py-1.5 pr-3.5 pl-3 text-[12px] font-semibold text-tx shadow-[0_8px_24px_rgba(25,31,40,0.16)] sm:text-[13px] lg:text-[14px]"
    >
      <span className="block h-2 w-2 rounded-full bg-tb" />
      <span ref={labelRef}>{labels[0][1]}</span>
      <span ref={timeRef} className="font-medium text-tx-3 tabular-nums">
        {fmt(from)}
      </span>
    </div>
  );
}
