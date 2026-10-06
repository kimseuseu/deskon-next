"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { FacilityWork } from "@/data/facility";

const smooth = (t: number) => t * t * (3 - 2 * t);

/* 한 줄이 가운데에 선 채로 머무는 구간. 줄 하나에 주어진 스크롤의 앞뒤
   이만큼씩입니다. 길면 넘어갈 때마다 덜컥 걸리고, 0이면 읽을 틈이 없습니다. */
const DWELL = 0.2;

/**
 * 가운데 선 줄의 번호. 곧게 흐르지 않고 줄마다 잠깐 섭니다.
 * 넘어가는 곡선은 양 끝에서 속도가 0이라 머무는 구간과 이음새 없이 붙습니다.
 */
function rest(p: number, last: number) {
  const x = Math.min(Math.max((p - 0.04) / 0.92, 0), 1) * last;
  const k = Math.min(Math.floor(x), last);
  const f = x - k;
  const move = 1 - DWELL * 2;
  return k + (f < DWELL ? 0 : f > 1 - DWELL ? 1 : smooth((f - DWELL) / move));
}

/**
 * «아오보가 특별한 이유». 제목은 제자리에 있고 네 가지 이유가 그 옆을
 * 지나갑니다. 가운데 선 줄만 또렷하고, 그 줄 밑에서 설명이 올라옵니다.
 * 지나간 줄과 올 줄은 흐리게 남아 있어, 목록의 어디쯤인지가 보입니다.
 *
 * 네 줄은 전부 처음부터 문서에 있습니다. 흐린 것은 눈에만 흐리고, 화면
 * 낭독기와 검색은 목록 그대로 읽습니다.
 */
export function ReasonsReel({ work }: { work: FacilityWork }) {
  const ref = useRef<HTMLElement>(null);
  const last = work.reasons.length - 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const idx = useTransform(scrollYProgress, (p) => rest(p, last));

  return (
    <motion.section
      ref={ref}
      className="scene reel"
      aria-label="아오보가 특별한 이유"
      style={
        {
          "--idx": idx,
          height: `calc(100svh + ${work.reasons.length} * var(--per))`,
        } as never
      }
    >
      <div className="stage bg-paper pt-[var(--bar)]">
        <div className="mx-auto grid h-full max-w-[1440px] grid-rows-[auto_1fr] gap-x-16 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:grid-rows-1 lg:px-10">
          <div className="pt-8 lg:self-center lg:pt-0">
            <p className="font-serif text-base italic text-accent-deep">{work.nameFull}</p>
            <h2 className="mt-4 font-paperlogy text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary">
              아오보가
              <br />
              특별한 이유<span className="text-gold">.</span>
            </h2>
          </div>

          <div className="reel-view relative h-full min-h-0 overflow-clip">
            <ul className="reel-list">
              {work.reasons.map((r, i) => (
                <li key={r.title} className="reel-item" style={{ "--i": i } as CSSProperties}>
                  <div className="flex items-center gap-4">
                    <span aria-hidden className="block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    <h3 className="font-paperlogy text-[clamp(1.5rem,3vw,2.6rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
                      {r.title}
                    </h3>
                  </div>
                  <p className="reel-desc mt-3 max-w-md pl-[1.375rem] text-[15px] leading-[1.85] text-muted md:text-base">
                    {r.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
