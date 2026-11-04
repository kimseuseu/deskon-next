import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { divisions } from "@/data/divisions";
import Reveal from "@/components/motion/Reveal";
import GrowLine from "@/components/motion/GrowLine";

/**
 * 다섯 분야. 카드가 헤더 밑에 붙고, 스크롤하면 다음 카드가 그 위로 올라와 덮습니다.
 * 한 장씩 읽히고, 끝에는 다섯 장이 어긋나게 포개져 있습니다.
 */
export default function DivisionIndex() {
  return (
    <section id="divisions" className="scroll-mt-16 bg-tg text-tx">
      <div className="mx-auto max-w-[1200px] px-6 pt-24 lg:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
          <Reveal>
            <p className="eyebrow">Our Divisions</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.15] text-balance">다섯 개의 전문 분야</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs whitespace-pre-line pb-1 text-[15px] font-medium leading-[1.7] text-tx-2">
              {"도입부터 순환, 유통까지.\n각 분야의 전문 조직이 자산의 전 주기를 책임집니다."}
            </p>
          </Reveal>
        </div>
        <GrowLine />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-24 lg:pb-36">
        {divisions.map((d, i) => (
          <article
            key={d.slug}
            className="dstack-card mb-8 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(25,31,40,0.1)] last:mb-0"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="grid min-h-[62svh] grid-cols-1 lg:grid-cols-12">
              <div className="flex flex-col p-7 lg:col-span-6 lg:p-12">
                <span className="font-serif text-[17px] italic text-tb">{d.no}</span>
                <h3 className="mt-5 text-[clamp(1.9rem,3.6vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{d.nameKo}</h3>
                <p className="mt-2 text-[clamp(1rem,1.5vw,1.3rem)] font-bold text-tb">{d.tagline}</p>
                <p className="mt-5 max-w-md text-[15px] font-medium leading-[1.75] text-tx-2 lg:text-[16px]">{d.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {d.keywords.slice(0, 4).map((kw) => (
                    <span key={kw} className="rounded-full bg-tg px-3 py-1 text-[13px] font-semibold text-tx-2">
                      {kw}
                    </span>
                  ))}
                </div>
                <Link
                  href={d.href}
                  className="group mt-auto inline-flex items-center gap-2 self-start pt-8 text-[16px] font-semibold text-tx transition-colors hover:text-tb"
                >
                  {d.nameFull} 자세히
                  <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-tg text-tb transition-colors duration-200 group-hover:bg-tb group-hover:text-white">
                    →
                  </span>
                </Link>
              </div>
              <div className="relative min-h-[260px] lg:col-span-6">
                <Image src={d.heroImage} alt={d.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
