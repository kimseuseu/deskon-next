import { inspection } from "@/data/facility";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 검사대행. 필름이 잠깐 멈추고 읽는 자리입니다.
 * 앞의 장면들은 전부 화면에 붙어 재생됐습니다. 끝까지 그러면 리듬이 없으므로
 * 여기는 고정하지 않고, 글이 나란히 지나갑니다.
 */
export function GasInspection() {
  return (
    <section className="border-t border-line bg-surface/60">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-paperlogy text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary">
              {inspection.title}
              <span className="text-gold">.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.9] text-muted">{inspection.lead}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="mt-10 inline-block border border-accent-deep/50 px-5 py-3 font-serif text-base italic tracking-wide text-accent-deep">
              {inspection.document}
            </span>
            <p className="mt-8 font-serif text-lg italic text-muted">{inspection.caption}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-14">
          <Stagger className="divide-y divide-line border-t border-primary/20" gap={0.1}>
            {inspection.items.map((item) => (
              <StaggerItem key={item.title} className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-12 sm:gap-6">
                <h3 className="font-paperlogy text-xl font-medium text-primary sm:col-span-5">{item.title}</h3>
                <p className="text-sm leading-[1.85] text-muted sm:col-span-7">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
