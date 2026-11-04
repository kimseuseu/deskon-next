"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { span } from "@/components/film/cue";

/**
 * 화면 가운데 큰 제목이 문장 첫머리 자리로 날아가 작아집니다.
 *
 * 문장은 끝 자리에 그대로 두고, 그 첫머리(span)만 처음에는 가운데의 보이지
 * 않는 본(ghost) 위치와 크기로 밀어 둡니다. 본은 문장 블록이 아니라 무대에
 * 바로 놓여야 가운데가 무대의 가운데입니다. 두 자리의 차이(--dx, --dy, --ds)는
 * 마운트와 크기 변경 때 재서 CSS 변수로 적고, 움직임 자체는 --p로 CSS가
 * 계산합니다(globals.css의 .fly).
 *
 *   from → to       제목이 날아가는 구간
 *   restFrom → restTo  나머지 문장과 설명이 나타나는 구간
 */
export function FlyTitle({
  title,
  rest,
  body,
  from,
  to,
  restFrom,
  restTo,
  ghostClassName,
  wrapperClassName = "",
  wrapperStyle,
  className = "",
  children,
}: {
  title: string;
  rest: string;
  body?: string;
  from: number;
  to: number;
  restFrom: number;
  restTo: number;
  /** 가운데 본의 글자 크기 등. 처음 화면의 제목과 같아야 합니다. */
  ghostClassName: string;
  /** 문장 블록(끝 자리)의 위치와 들어오고 나가는 구간. 본은 이 블록 밖, 무대 기준으로 섭니다. */
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  const ghost = useRef<HTMLSpanElement>(null);
  const head = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const g = ghost.current;
    const h = head.current;
    if (!g || !h) return;
    const measure = () => {
      const prev = h.style.transform;
      h.style.transform = "none";
      const a = g.getBoundingClientRect();
      const b = h.getBoundingClientRect();
      h.style.transform = prev;
      h.style.setProperty("--dx", `${a.left - b.left}px`);
      h.style.setProperty("--dy", `${a.top - b.top}px`);
      h.style.setProperty("--ds", `${a.width / Math.max(b.width, 1)}`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [title]);

  return (
    <>
      {/* 가운데 본. 보이지 않고 자리만 잽니다. */}
      <span
        ref={ghost}
        aria-hidden
        className={`pointer-events-none invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${ghostClassName}`}
      >
        {title}
      </span>

      <div className={wrapperClassName} style={wrapperStyle}>
      <div className={className}>
        <p className="text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold leading-[1.22] tracking-[-0.03em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
          <span ref={head} className="fly cue inline-block origin-top-left whitespace-nowrap" style={span(from, to)}>
            {title}
          </span>
          <span className="cue-in inline" style={{ ...span(restFrom, restTo), "--dy": "0.6rem" } as CSSProperties}>
            {rest}
          </span>
        </p>
        {body && (
          <p
            className="cue-in mt-3 whitespace-pre-line text-[clamp(1rem,1.4vw,1.2rem)] font-medium leading-[1.65] text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
            style={{ ...span(restFrom + 0.02, restTo + 0.02), "--dy": "1rem" } as CSSProperties}
          >
            {body}
          </p>
        )}
        {children}
      </div>
      </div>
    </>
  );
}
