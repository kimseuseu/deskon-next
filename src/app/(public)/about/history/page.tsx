import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/motion/CountUp";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/* ── Data ── */
const milestones = [
  {
    year: "2015",
    title: "회사 설립",
    desc: "B2B 장비 유통 전문기업으로 출발. B2B 물류장비 공급 사업을 시작하며 업계에 첫 발을 내딛었습니다.",
    image: "/images/auth-office/1.webp",
  },
  {
    year: "2016",
    title: "사무용 의자 구독 서비스 론칭",
    desc: "업계 최초 사무용 의자 구독 모델 도입. 중소기업을 대상으로 월정액 의자 운영 서비스를 시작했습니다.",
    image: "/images/chairs/jns-801.webp",
  },
  {
    year: "2018",
    title: "물류장비 사업 확장",
    desc: "롤테이너, 파랫트, 인테이너 등 물류장비 라인업을 대폭 확대하고 대형 유통사 납품 계약을 체결했습니다.",
    image: "/images/logistics/steel-rolltainer.webp",
  },
  {
    year: "2020",
    title: "자산연대서비스 시작",
    desc: "전문 재정비를 거친 검증된 품질의 장비를 합리적 가격으로 재공급하는 모델을 구축하고 ESG 경영을 본격화했습니다.",
    image: "/images/certa.webp",
  },
  {
    year: "2022",
    title: "공유서비스 플랫폼 오픈",
    desc: "카트, 스테커 등 물류장비 QR 기반 공유 플랫폼을 론칭하고 행사장비 공유 서비스로 영역을 확대했습니다.",
    image: "/images/logistics/service-concept.webp",
  },
  {
    year: "2024",
    title: "유통서비스 사업 개시",
    desc: "기업의 보유 장비를 합리적 가격으로 유통하는 서비스를 오픈하고 자산 정리 솔루션으로 카테고리를 다각화했습니다.",
    image: "/images/auth-office/3.webp",
  },
  {
    year: "2025",
    title: "통합 플랫폼 자산연대",
    desc: "구독·공유·렌탈·자산연대·유통 5대 서비스를 하나로 통합한 AOVO 플랫폼으로 새롭게 오픈했습니다.",
    image: "/images/aovo-banner1.webp",
  },
];

const stats = [
  { value: 10, suffix: "년+", label: "업력" },
  { value: 2500, suffix: "+", label: "거래 기업" },
  { value: 50000, suffix: "+", label: "운영 장비" },
];

/* ── Page ── */
export default function HistoryPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section data-hero-dark className="relative isolate overflow-hidden bg-tk text-white">
        <Image src="/images/aovo-banner2.webp" alt="" fill className="-z-20 object-cover" priority />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-tk/60 via-tk/45 to-tk/75" />

        <div className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
          <Reveal>
            <h1 className="text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-balance">
              걸어온 길,
              <br />
              만들어갈 미래
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium leading-[1.7] text-white/80">
              비즈니스 장비 운영의 새로운 기준을 세워가는 AOVO의 여정
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white text-tx" aria-label="주요 수치">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Stagger className="mx-auto grid max-w-4xl grid-cols-3 gap-6" gap={0.12}>
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="text-[clamp(2rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.04em] text-tx">
                  <CountUp value={s.value} />
                  <span className="ml-1 text-[0.45em] font-semibold text-tb">{s.suffix}</span>
                </p>
                <p className="mt-4 text-[15px] font-semibold text-tx sm:text-[17px]">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-tg text-tx" aria-label="연혁">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <ol className="space-y-4">
            {milestones.map((m) => (
              <li key={m.year}>
                <Reveal>
                  <article className="grid gap-6 rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(25,31,40,0.06)] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center lg:p-8">
                    <div className="grid gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6">
                      <p className="text-[24px] font-bold leading-none tracking-[-0.03em] text-tb">{m.year}</p>
                      <div>
                        <h3 className="text-[20px] font-bold leading-[1.3] tracking-[-0.02em] lg:text-[22px]">{m.title}</h3>
                        <p className="mt-3 text-[15px] font-medium leading-[1.7] text-tx-2">{m.desc}</p>
                      </div>
                    </div>
                    <figure className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[20px] bg-tg">
                      <Image src={m.image} alt={m.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                    </figure>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Vision CTA ── */}
      <section className="bg-tk text-white" aria-label="비전">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center lg:py-36">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">
              기업의 미래를
              <br />
              함께 만들어갑니다
            </h2>
            <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/60">
              {"구매에서 운영으로, 소유에서 공유로.\nAOVO는 산업 자산의 패러다임을 바꾸고 있습니다.\n지속 가능한 산업 생태계를 위한 여정은 계속됩니다."}
            </p>
            <Link
              href="/support/contact"
              className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
            >
              파트너가 되어주세요
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
