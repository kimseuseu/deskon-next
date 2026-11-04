import Image from "next/image";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import type { FacilityWork } from "@/data/facility";

/** 문장 끝에서 줄을 바꿉니다. 한 문장이 한 줄입니다. */
const lines = (text: string) => text.replace(/\.\s+/g, ".\n");

/**
 * 라인업을 한 줄로 훑는 장면.
 *
 * 넓은 화면에서는 세로 스크롤이 가로 이동이 됩니다. 제목은 제자리에 있고
 * 카드 여섯 장이 그 밑을 지나갑니다. 전화기에서는 고정하지 않습니다.
 * 손가락으로 직접 넘기는 편이 자연스럽고, 줄이 화면 밖으로 나가 있는
 * 것만으로 «더 있다»가 전해집니다.
 *
 * 카드는 둥근 회색 판 위의 굵은 이름과 규격 알약입니다. 사진이 있는 품목만 사진을 깝니다.
 */
export function LineupPan({
  work,
  images = {},
}: {
  work: FacilityWork;
  /** 카드 상단의 작은 영문 라벨. 토스풍에서는 그리지 않습니다. */
  label: string;
  /** 품목명 → 사진 경로 */
  images?: Record<string, { src: string; alt: string }>;
}) {
  const items = work.lineup.items;
  return (
    <Scene className="pan" style={{ "--n": items.length } as CSSProperties}>
      <div className="pan-stage flex flex-col justify-center bg-white pt-24 pb-16 text-tx lg:pt-[var(--bar)] lg:pb-0">
        <div className="mx-auto w-full max-w-[1200px] px-6 text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
            {work.lineup.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {lines(work.lineup.lead)}
          </p>
        </div>

        <ul className="pan-track cue mt-10 pb-2 lg:mt-14" aria-label={work.lineup.title}>
          {items.map((item, i) => {
            const photo = images[item.name];
            const dark = !photo && i % 3 === 2;
            return (
              <li
                key={item.name}
                className={`pan-card group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[28px] p-6 lg:p-7 ${
                  dark ? "bg-tk text-white" : "bg-tg text-tx"
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
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-tg from-8% via-tg/90 via-30% to-transparent to-65%"
                    />
                  </>
                )}
                <div>
                  <h3 className="text-[clamp(1.4rem,2vw,1.8rem)] font-bold tracking-[-0.03em]">{item.name}</h3>
                  {item.tagline && (
                    <p className={`mt-1.5 text-[14px] font-medium leading-snug ${dark ? "text-white/65" : "text-tx-2"}`}>
                      {item.tagline}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.specs.map((s) => (
                      <li
                        key={s}
                        className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${
                          dark ? "bg-white/12 text-white" : "bg-white text-tb"
                        }`}
                      >
                        {s}
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
