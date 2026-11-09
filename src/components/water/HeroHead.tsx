"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * 첫 장면의 글 묶음(제목·설명·버튼). 흐름 속에 서서 제 높이를 재고,
 * 그 아래가 영상 액자의 시작점이 되도록 무대(.stage)에 `--hero-top`을 적습니다.
 *
 * 글이 길어지거나 창 크기가 바뀌어 줄 수가 달라져도 액자가 버튼을 덮지 않습니다.
 * 높이는 ResizeObserver로 다시 재므로 리사이즈에도 그대로 따라옵니다.
 * 액자가 너무 납작해지지 않게 무대 높이에서 200px은 남깁니다.
 */
export function HeroHead({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const stage = el?.parentElement;
    if (!el || !stage) return;
    const apply = () => {
      const gap = window.innerWidth >= 1024 ? 20 : 16;
      const max = Math.max(stage.clientHeight - 200, 160);
      stage.style.setProperty("--hero-top", `${Math.min(el.offsetHeight + gap, max)}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
