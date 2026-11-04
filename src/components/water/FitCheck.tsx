import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { waterFit } from "@/data/water-story";

/**
 * 상담이 먼저인 현장. 가운데 제목, 둥근 흰 카드 안에 여섯 줄, 알약 버튼 하나.
 */
export function FitCheck() {
  return (
    <section className="bg-tg text-tx" aria-label={waterFit.title}>
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">{waterFit.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">{waterFit.lead}</p>
        </Reveal>

        <Stagger
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-10 rounded-[28px] bg-white px-7 py-3 shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:mt-16 lg:grid-cols-2 lg:px-10"
          gap={0.07}
        >
          {waterFit.items.map((it) => (
            <StaggerItem key={it} className="flex items-start gap-4 border-b border-tg-2 py-5 last:border-b-0 lg:[&:nth-last-child(2)]:border-b-0">
              <span aria-hidden className="mt-[0.3em] block h-5 w-5 shrink-0 rounded-md border-2 border-tb/70" />
              <span className="text-[17px] font-semibold leading-snug">{it}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Link
            href="/support/contact"
            className="inline-flex items-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
          >
            설치 문의하기
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
