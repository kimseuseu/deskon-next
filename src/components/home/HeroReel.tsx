"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useSceneProgress } from "@/components/film/Scene";
import { through } from "@/components/film/cue";

export type Clip = { src: string; poster: string; context: string };
export type Window = [number, number, number, number];

/**
 * 첫 장면의 영상 세 편. 장면 진행도를 읽어 지금 지나는 편만 재생하고, 편이 도착하는
 * 순간 처음부터 다시 틉니다. 나머지는 멈춰 둡니다(세 편을 동시에 돌리지 않습니다).
 * 움직임을 줄인 환경에서는 첫 편의 포스터 한 장만 둡니다.
 */
export function HeroReel({ clips, windows }: { clips: Clip[]; windows: Window[] }) {
  const p = useSceneProgress();
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  /* 편이 바뀌는 지점: 앞 편이 나가기 시작하는 곳과 다음 편이 들어오는 곳의 가운데. */
  const pick = (v: number) => {
    let i = 0;
    for (let k = 1; k < windows.length; k++) if (v >= (windows[k][0] + windows[k][1]) / 2) i = k;
    return i;
  };
  useMotionValueEvent(p, "change", (v) => {
    const i = pick(v);
    if (i !== active) setActive(i);
  });

  useEffect(() => {
    if (reduce) return;
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = true;
        v.defaultMuted = true;
        if (v.readyState >= 1) v.currentTime = 0;
        const play = v.play();
        if (play) play.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduce]);

  /* 배경 탭에서 돌아오면 지금 편을 다시 틉니다. */
  useEffect(() => {
    if (reduce) return;
    const onVisible = () => {
      if (document.hidden) return;
      refs.current[active]?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [active, reduce]);

  if (reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 정지 화면 한 장
      <img src={clips[0].poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
    );
  }

  return (
    <>
      {clips.map((c, i) => (
        <div key={c.src} aria-hidden className="home-clip cue-through absolute inset-0" style={through(...windows[i])}>
          {/* 와이프 앞머리의 가는 선 */}
          <div className="home-edge absolute inset-x-0 top-0 z-10 h-px bg-white/70" />
          <video
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={c.src}
            poster={c.poster}
            muted
            loop
            playsInline
            autoPlay={i === 0}
            preload={i === 0 ? "auto" : "metadata"}
            className="h-full w-full object-cover"
          />
          {/* 덮이는 동안 어두워지는 막 */}
          <div className="home-dim absolute inset-0 bg-tk" />
        </div>
      ))}
    </>
  );
}
