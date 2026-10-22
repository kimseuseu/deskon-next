import { gas, inspection } from "@/data/facility";
import Reveal from "@/components/motion/Reveal";

/**
 * 시공. 이 페이지의 주인공은 임대라서, 배관공사와 검사대행은 맨 아래에
 * 한 화면 안으로 접어 둡니다. 임대 기기도 가스설비이고 같은 팀이 시공까지
 * 한다는 사실만 전하면 됩니다. 자세한 항목은 접힌 채로도 전부 읽힙니다.
 */
export function WorksCompact() {
  const { install } = gas;
  return (
    <section className="border-t border-line bg-paper" aria-label="설치 · 배관 · 검사대행">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-24">
        <Reveal className="lg:col-span-5">
          <h2 className="font-paperlogy text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-[1.25] tracking-[-0.02em] text-primary text-balance">
            설치 · 배관 · 검사대행도
            <br />
            같은 팀이 합니다<span className="text-gold">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-[1.9] text-muted">{install.lead}</p>
          <p className="mt-6 font-serif text-base italic text-accent-deep">{gas.caption}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:border-l lg:border-line lg:pl-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-paperlogy text-base font-medium text-primary">{install.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {install.items.map((item) => (
                  <li key={item} className="border border-line px-3 py-1.5 text-[13px] text-primary/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-paperlogy text-base font-medium text-primary">{inspection.title}</h3>
              <ul className="mt-4 space-y-2">
                {inspection.items.map((item) => (
                  <li key={item.title} className="text-[13px] leading-relaxed text-primary/80">
                    <span className="font-medium text-primary">{item.title}</span>
                    <span className="mx-2 text-line">|</span>
                    <span className="text-muted">{item.description}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-block border border-accent-deep/50 px-4 py-2 font-serif text-sm italic tracking-wide text-accent-deep">
                {inspection.document}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
