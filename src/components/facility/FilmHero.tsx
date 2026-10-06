import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import type { FacilityWork } from "@/data/facility";

const step = (i: number): CSSProperties => ({ animationDelay: `${0.1 + i * 0.09}s` });

/**
 * 필름의 첫 장면. 사진 한 장이 헤더 아래 화면을 채웁니다.
 *
 * 첫 화면은 멈춰 있어도 완성입니다. 이름과 약속, 버튼 둘이 처음부터 서
 * 있고, 스크롤 없이도 전화할 수 있습니다. 필름은 그다음입니다.
 *
 *   0.02 → 0.20  첫 문장이 올라가며 떠난다. 사진은 내내 천천히 다가온다.
 *   0.24 → 0.60  네 분야가 하나씩 도착하고, 그 밑에 «한 번에»가 선다.
 *   0.70 → 1.00  액자가 한 뼘 물러나 종이 위의 카드가 된다.
 */
export function FilmHero({ work, priority = true }: { work: FacilityWork; priority?: boolean }) {
  return (
    <Scene className="film-hero">
      <div className="stage bg-paper">
        <div className="film-hero-frame cue grain absolute inset-x-0 top-[var(--bar)] bottom-0 isolate overflow-hidden bg-ink text-cream">
          <div className="film-hero-photo absolute inset-0 -z-20">
            <Image
              src={work.image}
              alt={work.imageAlt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover opacity-85"
            />
          </div>

          {/* 위는 열어 두고 아래로 갈수록 짙어집니다. 글이 바닥에 있으므로
              대비가 필요한 곳도 바닥입니다. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/35 to-ink/92"
          />
          {/* 다음 문장은 사진 한가운데에 섭니다. 그 전에 사진 전체를 한 번 눌러 둡니다. */}
          <div aria-hidden className="film-hero-dim cue film-only absolute inset-0 -z-10 bg-ink/60" />

          <div
            className="cue-out absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16"
            style={span(0.02, 0.2)}
          >
            <p className="rise font-serif text-base italic tracking-wide text-gold md:text-lg" style={step(0)}>
              {work.nameEn}
            </p>
            <h1
              className="rise mt-4 font-paperlogy text-[clamp(2.6rem,7vw,6rem)] font-extralight leading-[1.06] tracking-[-0.025em]"
              style={step(1)}
            >
              {work.nameFull}
              <span className="text-gold">.</span>
            </h1>
            <p
              className="rise mt-5 font-paperlogy text-lg font-medium text-white/85 md:text-xl"
              style={step(2)}
            >
              {work.motto}
            </p>

            <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={step(3)}>
              <a
                href="tel:010-9929-5363"
                className="inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-ink transition-colors duration-400 hover:bg-cream"
              >
                전화 상담
                <span className="font-serif text-sm italic tracking-normal">010-9929-5363</span>
              </a>
              <Link
                href="/support/contact"
                className="group inline-flex items-center justify-center gap-3 border border-white/35 px-8 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-colors duration-400 hover:border-cream"
              >
                설치 문의하기
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* 분야마다 제 구간이 있어 하나씩 도착합니다. */}
          <div aria-hidden className="film-only absolute inset-0 grid place-items-center px-6 lg:px-16">
            <div className="text-center">
              <p className="font-paperlogy text-[clamp(1.6rem,4.4vw,3.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-balance">
                {work.categories.map((c, i) => (
                  <span key={c} className="inline-block">
                    {i > 0 && (
                      <span
                        className="cue-in mx-[0.45em] inline-block h-[0.18em] w-[0.18em] -translate-y-[0.25em] rotate-45 bg-gold/80 align-middle"
                        style={span(0.24 + i * 0.07, 0.34 + i * 0.07)}
                      />
                    )}
                    <span className="cue-in inline-block" style={span(0.24 + i * 0.07, 0.36 + i * 0.07)}>
                      {c}
                    </span>
                  </span>
                ))}
              </p>
              <p
                className="cue-in mt-6 font-serif text-xl italic text-gold md:text-2xl"
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
