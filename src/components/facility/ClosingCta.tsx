import Link from "next/link";
import { Scene } from "@/components/film/Scene";
import type { FacilityWork } from "@/data/facility";

/**
 * 맺음. 어두운 판 한 장이 아래에서 다가와 자리를 잡습니다.
 * 페이지가 끝나는 것이 아니라 마지막 장면이 도착하는 것으로 읽힙니다.
 * 두 랜딩은 서로를 가리키므로, 다른 설비로 가는 길을 함께 둡니다.
 */
export function ClosingCta({ work, sibling }: { work: FacilityWork; sibling: FacilityWork }) {
  const { cta } = work;
  return (
    <Scene mode="enter" className="bg-paper">
      <div className="closing-panel cue bg-ink text-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="eyebrow text-white/55">Contact</p>
              <h2 className="mt-8 font-paperlogy text-[clamp(2rem,4.4vw,3.8rem)] font-light leading-[1.2] tracking-[-0.02em]">
                {cta.title}
                <span className="text-gold">.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-[1.9] text-white/65 md:text-base">{cta.lead}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="tel:010-9929-5363"
                  className="inline-flex items-center justify-center gap-3 bg-gold px-9 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-ink transition-colors duration-400 hover:bg-cream"
                >
                  전화 상담
                  <span className="font-serif text-sm italic tracking-normal">010-9929-5363</span>
                </a>
                <Link
                  href="/support/contact"
                  className="group inline-flex items-center justify-center gap-3 border border-white/30 px-9 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-colors duration-400 hover:border-cream"
                >
                  설치 문의하기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/50">평일 09:00 - 18:00</p>
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-14">
              <ul className="divide-y divide-white/10 border-t border-white/15">
                {cta.promises.map((p) => (
                  <li key={p.title} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-6">
                    <span className="font-paperlogy text-lg font-medium sm:col-span-5">{p.title}</span>
                    <span className="text-sm leading-relaxed text-white/60 sm:col-span-7">{p.description}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-xl italic text-gold md:text-2xl">{cta.slogan}</p>

              <Link
                href={sibling.href}
                className="group mt-14 flex items-end justify-between gap-6 border-t border-white/15 pt-6"
              >
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-white/55">
                    {sibling.nameEn}
                  </span>
                  <span className="mt-2 block font-paperlogy text-xl font-light text-white/75 transition-colors duration-300 group-hover:text-cream md:text-2xl">
                    {sibling.nameFull}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mb-1 text-xl text-gold transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
