"use client";

import { useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import { Scene, useSceneProgress } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import { groupStats, network } from "@/data/divisions";
import CountUp from "@/components/motion/CountUp";

/** 어두운 원이 다 번진 뒤(0.45)에야 숫자가 올라갑니다. */
function Numbers() {
  const p = useSceneProgress();
  const [go, setGo] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.45 && !go) setGo(true);
  });
  return (
    <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-20 lg:grid-cols-4">
      {groupStats.map((stat, i) => (
        <div key={stat.label} className="cue-in text-center" style={span(0.46 + i * 0.04, 0.6 + i * 0.04)}>
          <p className="whitespace-nowrap font-paperlogy text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-none tracking-[-0.03em]">
            <CountUp value={stat.value} active={go} />
            <span className="ml-1 font-serif text-[0.5em] italic text-tb-soft">{stat.suffix}</span>
          </p>
          <p className="mt-4 text-[17px] font-semibold">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * 숫자. 흰 무대 가운데 제목이 서 있고, 스크롤하면 어두운 원이 번져 화면을 덮습니다.
 * 원 안에서 같은 제목이 흰 글자로 남고 그 밑에 숫자 넷이 올라옵니다.
 */
export default function Stats() {
  const title = (
    <>
      <p className="eyebrow justify-center">AOVO in Numbers</p>
      <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.25] text-balance">
        숫자가 말하는 <span className="font-serif italic">신뢰</span>
      </h2>
    </>
  );
  return (
    <Scene className="ink-scene">
      <div className="stage bg-white text-tx">
        {/* 흰 무대: 제목만 */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center [&_h2_span]:text-tb">{title}</div>

        {/* 어두운 원 */}
        <div className="ink cue absolute inset-0 bg-tk text-white">
          <div className="flex h-full items-center justify-center px-6">
            <div className="mx-auto w-full max-w-[1200px] text-center [&_h2_span]:text-tb-soft">
              {title}
              <p className="cue-in mx-auto mt-4 max-w-2xl text-[17px] font-medium leading-[1.7] text-white/65" style={span(0.4, 0.52)}>
                2015년부터 지금까지 현장에서 쌓아 온 운영의 기록입니다.
              </p>
              <Numbers />
              <div className="cue-in mt-12 flex flex-col items-center gap-4 lg:mt-16" style={span(0.66, 0.8)}>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {network.regions.map((r) => (
                    <span key={r} className="rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold text-white/85">
                      {r}
                    </span>
                  ))}
                </div>
                <p className="text-[15px] font-medium text-white/60">{network.sla}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
