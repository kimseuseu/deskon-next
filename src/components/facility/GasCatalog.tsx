import { gas } from "@/data/facility";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 가스기기 상세. 라인업 팬이 여섯 종을 훑고 지나간 뒤, 여기서 필름이 멈추고
 * 규격이 무엇을 뜻하는지, 어떤 현장에 두는지를 읽습니다.
 *
 * 품목마다 한 행입니다. 왼쪽에 이름과 규격, 오른쪽에 설명과 쓰임새.
 * 맨 아래에 임대 설치 기준 한 줄이 섭니다. 사지 않고 빌리는 것이 이 페이지의
 * 전제라, 품목 설명이 끝나는 자리에 둡니다.
 */
export function GasCatalog() {
  const { lineup } = gas;
  return (
    <section className="border-t border-line bg-paper" aria-label="가스기기 상세">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
            기기별 규격과 쓰임새
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-muted">
            규격 숫자는 대부분 가로 폭(mm)이고, 회전국솥은 한 번에 끓이는 인분 수입니다.
            현장 도면이나 메뉴만 알려주시면 맞는 규격을 골라 드립니다.
          </p>
        </Reveal>

        <Stagger className="mt-12 border-t border-primary/20" gap={0.08}>
          {lineup.items.map((item) => (
            <StaggerItem
              key={item.name}
              direction="none"
              className="grid grid-cols-1 gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-4">
                <h3 className="font-paperlogy text-2xl font-medium tracking-[-0.01em] text-primary">
                  {item.name}
                </h3>
                {item.tagline && <p className="mt-1.5 text-sm text-muted">{item.tagline}</p>}
                <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {item.specs.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold/70" />}
                      <span className="font-serif text-lg italic text-accent-deep">{s}</span>
                    </li>
                  ))}
                </ul>
                {item.specNote && (
                  <p className="mt-2 text-[12px] tracking-[0.02em] text-muted/80">{item.specNote}</p>
                )}
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-line lg:pl-10">
                <p className="max-w-2xl text-[15px] leading-[1.9] text-primary/85">{item.description}</p>
                {item.uses && (
                  <p className="mt-4 text-sm text-muted">
                    <span className="mr-3 font-paperlogy font-medium text-primary/70">쓰는 곳</span>
                    {item.uses}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {lineup.note && (
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
              <p className="font-serif text-lg italic text-accent-deep lg:col-span-4">임대 설치 기준</p>
              <p className="max-w-2xl text-[15px] leading-[1.9] text-muted lg:col-span-8 lg:pl-10">
                {lineup.note}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
