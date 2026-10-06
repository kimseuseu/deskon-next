import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span, through } from "@/components/film/cue";
import { cycle } from "@/data/facility";

const N = cycle.steps.length;
/* 호가 그어지는 구간. 단계마다 이만큼씩 나눠 가집니다. */
const ARC_FROM = 0.06;
const ARC_TO = 0.84;
const SEG = (ARC_TO - ARC_FROM) / N;
const R = 46;

/** i번째 단계가 원 위에 서는 자리(%). 0번이 12시, 시계 방향. */
function pos(i: number): CSSProperties {
  const a = ((-90 + (i * 360) / N) * Math.PI) / 180;
  return { left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` };
}

/**
 * 급수배수 사이클 컨트롤 관리. 여섯 단계는 실제로 순서가 있는 공정이라
 * 번호가 붙고, 처음으로 돌아오는 일이라 둥글게 섭니다.
 *
 *   0.06 → 0.84  호가 한 바퀴 그어진다. 단계는 호가 닿는 순서로 켜지고,
 *                가운데에는 지금 지나는 단계가 선다.
 *   0.56 → 0.86  왼쪽에 관리 세 가지가 차례로 선다.
 *   0.88 → 0.98  손글씨 한 줄.
 */
export function WaterCycle() {
  return (
    <Scene className="ring" aria-label={cycle.title}>
      <div className="stage bg-paper pt-[var(--bar)]">
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-1 content-center gap-8 px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
          <div className="lg:col-span-5">
            <h2
              className="cue-in font-paperlogy text-[clamp(1.75rem,3.6vw,3.2rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary"
              style={span(0, 0.1)}
            >
              {cycle.title}
            </h2>
            <p className="cue-in mt-4 max-w-md text-[15px] leading-[1.9] text-muted" style={span(0.04, 0.14)}>
              {cycle.lead}
            </p>

            <ul className="mt-8 hidden space-y-4 lg:mt-12 lg:block">
              {cycle.points.map((p, i) => (
                <li key={p.title} className="cue-in" style={span(0.56 + i * 0.1, 0.66 + i * 0.1)}>
                  <p className="text-[15px] leading-[1.85]">
                    <span className="font-paperlogy font-medium text-primary">{p.title}</span>
                    <span className="ml-3 text-muted">{p.description}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p
              className="cue-in mt-8 hidden font-serif text-xl italic text-accent-deep lg:block"
              style={span(0.88, 0.98)}
            >
              {cycle.slogan}
            </p>
          </div>

          {/* 원 — 여섯 단계가 둥글게 서고, 호가 그어지며 켜집니다.
              좁은 화면에서는 바깥 여백(px-10)이 원 양옆의 라벨 자리입니다. */}
          <div className="mx-auto w-full max-w-[min(560px,56svh)] px-10 lg:col-span-7 lg:px-0">
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-line)" strokeWidth="0.5" />
              <circle
                className="ring-arc cue"
                style={span(ARC_FROM, ARC_TO)}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="0.9"
                pathLength={1}
              />
            </svg>

            <ol className="absolute inset-0">
              {cycle.steps.map((s, i) => (
                <li
                  key={s}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={pos(i)}
                >
                  <span
                    className="cue-in flex items-center gap-2 whitespace-nowrap border border-line bg-paper px-3 py-1.5 lg:px-4 lg:py-2"
                    style={{ ...span(ARC_FROM + i * SEG, ARC_FROM + i * SEG + 0.06), "--dy": "0.5rem" } as CSSProperties}
                  >
                    <span className="font-serif text-[11px] italic text-accent-deep lg:text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-paperlogy text-[13px] font-medium text-primary lg:text-[15px]">{s}</span>
                  </span>
                </li>
              ))}
            </ol>

            {/* 지금 지나는 단계 */}
            <div className="ring-center absolute inset-0 grid place-items-center" aria-hidden>
              {cycle.steps.map((s, i) => {
                const start = ARC_FROM + i * SEG;
                const end = start + SEG;
                return (
                  <p
                    key={s}
                    className="cue-through absolute text-center"
                    style={through(
                      i === 0 ? -1 : start,
                      i === 0 ? -0.5 : start + 0.05,
                      i === N - 1 ? 2 : end - 0.04,
                      i === N - 1 ? 3 : end,
                    )}
                  >
                    <span className="block font-serif text-[clamp(2rem,5vw,4rem)] italic leading-none text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 block font-paperlogy text-[clamp(1.25rem,2.4vw,2rem)] font-light tracking-[-0.02em] text-primary">
                      {s}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          </div>

          {/* 좁은 화면: 관리 세 가지는 원 밑에 섭니다. */}
          <div className="lg:hidden">
            <ul className="space-y-3">
              {cycle.points.map((p, i) => (
                <li key={p.title} className="cue-in" style={span(0.56 + i * 0.1, 0.66 + i * 0.1)}>
                  <p className="text-sm leading-[1.8]">
                    <span className="font-paperlogy font-medium text-primary">{p.title}</span>
                    <span className="ml-2 text-muted">{p.description}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="cue-in mt-5 font-serif text-lg italic text-accent-deep" style={span(0.88, 0.98)}>
              {cycle.slogan}
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
