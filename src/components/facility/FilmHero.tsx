import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import type { FacilityWork } from "@/data/facility";
import { COMPANY } from "@/lib/constants";

const step = (i: number): CSSProperties => ({ animationDelay: `${0.1 + i * 0.09}s` });

/**
 * 필름의 첫 장면. 사진 한 장이 헤더 아래 화면을 채웁니다.
 *
 * 첫 화면은 멈춰 있어도 완성입니다. 이름과 약속, 버튼 둘이 처음부터 서
 * 있고, 스크롤 없이도 전화할 수 있습니다. 필름은 그다음입니다.
 *
 *   0.02 → 0.20  첫 문장이 올라가며 떠난다. 사진은 내내 천천히 다가온다.
 *   0.24 → 0.60  네 분야가 알약 하나씩 도착하고, 그 밑에 «한 번에»가 선다.
 *   0.70 → 1.00  액자가 한 뼘 물러나 흰 바탕 위의 둥근 카드가 된다.
 */
export function FilmHero({ work, priority = true }: { work: FacilityWork; priority?: boolean }) {
  return (
    <Scene className="film-hero">
      <div className="stage bg-white">
        <div className="film-hero-frame cue absolute inset-x-0 top-[var(--bar)] bottom-0 isolate overflow-hidden rounded-[calc(32px_*_var(--e))] bg-tk text-white motion-reduce:rounded-none">
          <div className="film-hero-photo absolute inset-0 -z-20">
            <Image
              src={work.image}
              alt={work.imageAlt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover opacity-90"
            />
          </div>

          {/* 위는 열어 두고 아래로 갈수록 짙어집니다. 글이 바닥에 있으므로
              대비가 필요한 곳도 바닥입니다. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-tk/10 via-tk/30 to-tk/85"
          />
          {/* 다음 문장은 사진 한가운데에 섭니다. 그 전에 사진 전체를 한 번 눌러 둡니다. */}
          <div aria-hidden className="film-hero-dim cue film-only absolute inset-0 -z-10 bg-tk/65" />

          <div
            className="cue-out absolute inset-x-0 bottom-0 px-6 pb-12 text-center lg:pb-20"
            style={span(0.02, 0.2)}
          >
            <h1
              className="rise mx-auto max-w-4xl text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-balance"
              style={step(0)}
            >
              {work.nameFull}
            </h1>
            <p
              className="rise mx-auto mt-5 max-w-2xl text-[17px] font-medium leading-[1.7] text-white/80 md:text-[19px]"
              style={step(1)}
            >
              {work.motto}
            </p>

            <div className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={step(2)}>
              <a
                href={`tel:${work.phone ?? COMPANY.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
              >
                {work.callLabel ?? "전화 상담"}
                <span className="font-medium text-white/85">{work.phone ?? COMPANY.phone}</span>
              </a>
              <Link
                href="/support/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/12 px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98] sm:w-auto"
              >
                {work.inquiryLabel ?? "설치 문의하기"}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* 분야마다 제 구간이 있어 알약 하나씩 도착합니다. */}
          <div aria-hidden className="film-only absolute inset-0 grid place-items-center px-6 lg:px-16">
            <div className="text-center">
              <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[clamp(1.25rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.03em]">
                {work.categories.map((c, i) => (
                  <span
                    key={c}
                    className="cue-in inline-block rounded-full bg-white/12 px-[0.7em] py-[0.32em] backdrop-blur-sm"
                    style={span(0.24 + i * 0.07, 0.36 + i * 0.07)}
                  >
                    {c}
                  </span>
                ))}
              </p>
              <p
                className="cue-in mt-8 text-[clamp(1.5rem,3.6vw,3rem)] font-bold leading-[1.25] tracking-[-0.035em] text-balance"
                style={span(0.56, 0.68)}
              >
                {work.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
