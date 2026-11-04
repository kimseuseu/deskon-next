"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * 첫 장면의 영상. 소리 없이 되풀이됩니다.
 *
 * React는 서버에서 `muted`를 HTML로 내보내지 않아, 그대로 두면 브라우저가
 * 자동 재생을 막습니다. 그래서 마운트 직후에 직접 끄고 재생합니다.
 * 움직임을 줄인 환경에서는 포스터 한 장만 둡니다.
 */
export function HeroVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = v.play();
    if (play) play.catch(() => {});
  }, [reduce]);

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element -- 정지 화면 한 장, 최적화 단계 불필요
    return <img src={poster} alt="" aria-hidden className={className} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={className}
    />
  );
}
