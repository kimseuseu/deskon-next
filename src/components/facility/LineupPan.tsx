import Image from "next/image";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import type { FacilityWork } from "@/data/facility";

/**
 * 라인업을 한 줄로 훑는 장면.
 *
 * 넓은 화면에서는 세로 스크롤이 가로 이동이 됩니다. 제목은 제자리에 있고
 * 카드 여섯 장이 그 밑을 지나갑니다. 전화기에서는 고정하지 않습니다.
 * 손가락으로 직접 넘기는 편이 자연스럽고, 줄이 화면 밖으로 나가 있는
 * 것만으로 «더 있다»가 전해집니다.
 *
 * 카드는 하이라인 보더 안의 타이포입니다. 사진이 있는 품목만 사진을 깝니다.
 */
export function LineupPan({
  work,
  label,
  images = {},
}: {
  work: FacilityWork;
  /** 카드 상단의 작은 영문 라벨 */
  label: string;
  /** 품목명 → 사진 경로 */
  images?: Record<string, { src: string; alt: string }>;
}) {
  const items = work.lineup.items;
  return (
    <Scene className="pan" style={{ "--n": items.length } as CSSProperties}>
      <div className="pan-stage flex flex-col justify-center border-t border-line bg-surface/60 pt-20 pb-16 lg:pt-[var(--bar)] lg:pb-0">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <h2 className="font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary">
            {work.lineup.title}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{work.lineup.lead}</p>
        </div>

        <ul className="pan-track cue mt-10 pb-2 lg:mt-14" aria-label={work.lineup.title}>
          {items.map((item, i) => {
            const photo = images[item.name];
            const ink = !photo && i % 3 === 2;
            return (
              <li
                key={item.name}
                className={`pan-card group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden border border-line p-6 lg:p-7 ${
                  ink ? "bg-ink text-cream" : "bg-paper text-primary"
                }`}
              >
                {photo && (
                  <>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 70vw"
                      className="-z-20 object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-paper from-5% via-paper/85 via-25% to-transparent to-60%"
                    />
                  </>
                )}
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.16em] ${
                    ink ? "text-white/55" : "text-muted"
                  }`}
                >
                  {label}
                </span>
                <div>
                  <h3 className="font-paperlogy text-[clamp(1.5rem,2.2vw,2rem)] font-medium tracking-[-0.01em]">
                    {item.name}
                  </h3>
                  {item.tagline && (
                    <p className={`mt-1.5 text-[13px] leading-snug ${ink ? "text-white/65" : "text-muted"}`}>
                      {item.tagline}
                    </p>
                  )}
                  <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {item.specs.map((s, j) => (
                      <li key={s} className="flex items-center gap-3">
                        {j > 0 && (
                          <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold/70" />
                        )}
                        <span className={`font-serif text-[15px] italic ${ink ? "text-gold" : "text-accent-deep"}`}>
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Scene>
  );
}
