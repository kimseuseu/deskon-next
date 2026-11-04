import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/motion/CountUp";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

/* ── Data ── */
const stats = [
  { value: 2500, suffix: "+", label: "누적 거래 기업" },
  { value: 50000, suffix: "+", label: "운영 장비 수" },
  { value: 98, suffix: "%", label: "고객 만족도" },
  { value: 10, suffix: "년+", label: "업력" },
];

const storyCards = [
  { title: "구매의 딜레마", desc: "사무가구, 물류장비를 구매하면 수천만 원의 초기 비용이 발생합니다. 사업이 축소되면 유휴 자산이 되어 공간과 비용을 낭비합니다. 매년 감가상각으로 자산 가치는 떨어지고, 폐기 시 추가 비용까지 발생합니다." },
  { title: "운영의 해답", desc: "필요할 때 배치하고, 필요 없을 때 반납합니다. 초기 비용 없이 월정액으로 시작하고, 인원 변동에 따라 수량을 즉시 조절합니다. 유지보수, 교체, 수거까지 전담팀이 책임집니다." },
  { title: "재무적 효과", desc: "장비가 자산이 아닌 비용으로 처리되어 재무제표가 깔끔해집니다. 감가상각 부담이 사라지고, 유휴 장비 보관 비용이 제로가 됩니다. 사용한 만큼만 비용을 지불하는 구조입니다." },
  { title: "지속 가능한 성장", desc: "자산연대 서비스를 통해 장비의 수명을 연장하고 폐기를 줄입니다. ESG 경영에 기여하면서 동시에 비용을 절감합니다. 기업은 장비 관리가 아닌 본업에 집중할 수 있습니다." },
];

const services = [
  { ...SERVICE_CATEGORIES[0], desc: "매달 정액으로 필요한 장비를 사용. 유휴 시 반납하면 과금 중지." },
  { ...SERVICE_CATEGORIES[1], desc: "QR 코드 스캔으로 즉시 대여·반납. 시간 단위 유연 요금제." },
  { ...SERVICE_CATEGORIES[2], desc: "1개월~36개월 자유 계약. 설치·철거·유지보수 전담." },
  { ...SERVICE_CATEGORIES[3], desc: "전문 재정비를 거친 검증 장비를 합리적 가격으로." },
  { ...SERVICE_CATEGORIES[4], desc: "보유 장비를 합리적 가격으로 유통. 무료 방문 수거." },
];

const strengths = [
  { title: "전국 물류 네트워크", desc: "수도권 당일, 전국 익일 배송. 8개 이상의 거점 물류창고에서 운영합니다." },
  { title: "전담 관리 시스템", desc: "배송·설치·유지보수·수거까지 원스톱 관리. 별도 인력이 필요 없습니다." },
  { title: "IT 기반 자산 관리", desc: "바코드·QR 기반 실시간 장비 추적. 이용 현황을 앱에서 한눈에 확인합니다." },
  { title: "비용 구조 혁신", desc: "초기 투자 없이 월정액 운영. 사용하지 않는 기간에는 비용이 발생하지 않습니다." },
  { title: "파트너 생태계", desc: "부동산, 인테리어, 이전 업체 등 다양한 파트너와 협력하여 통합 솔루션을 제공합니다." },
  { title: "ESG 경영", desc: "장비 재정비·자산연대를 통해 폐기를 줄이고, 지속 가능한 산업 생태계를 구축합니다." },
];

const companyInfo = [
  { label: "상호", value: COMPANY.legalName },
  { label: "대표", value: COMPANY.ceo },
  { label: "사업자등록번호", value: COMPANY.bizNumber },
  { label: "통신판매업신고번호", value: COMPANY.salesReportNumber },
  { label: "주소", value: COMPANY.address },
  { label: "전화", value: COMPANY.phone },
  { label: "이메일", value: COMPANY.email },
  { label: "카카오톡", value: "@아오보" },
];

const subLinks = [
  { label: "회사 연혁", href: "/about/history" },
  { label: "CI 소개", href: "/about/ci" },
  { label: "오시는 길", href: "/about/location" },
  { label: "파트너 계약", href: "/about/partners" },
];

const SECTION_TITLE = "text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance";
const LEAD = "whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2";

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section data-hero-dark className="relative isolate overflow-hidden bg-tk text-white">
        <Image src="/images/aovo-banner2.webp" alt="" fill className="-z-20 object-cover" priority />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-tk/55 via-tk/45 to-tk/70" />

        <div className="mx-auto flex min-h-[85vh] max-w-[1200px] flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
          <Reveal>
            <h1 className="text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-balance">
              기업의 성장에
              <br />
              집중할 수 있도록
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/80">
              {"비즈니스 장비의 구매부터 운영, 자산연대까지.\nAOVO Group은 기업이 본업에만 집중할 수 있는 환경을 만듭니다."}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#story"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white/12 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98]"
            >
              우리의 이야기 <span aria-hidden>↓</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-white text-tx" aria-label="주요 수치">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4" gap={0.12}>
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.04em] text-tx">
                  <CountUp value={s.value} />
                  <span className="ml-1 text-[0.45em] font-semibold text-tb">{s.suffix}</span>
                </p>
                <p className="mt-4 text-[17px] font-semibold text-tx">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section id="story" className="scroll-mt-20 bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--bar)+3rem)] lg:self-start">
              <Reveal>
                <h2 className={SECTION_TITLE}>
                  왜 장비를
                  <br />
                  <span className="mx-0.5 inline-block rounded-full bg-white px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb">운영</span>
                  해야 할까요?
                </h2>
                <p className={`mt-6 max-w-md ${LEAD}`}>
                  {"기업은 성장합니다. 인원이 늘고, 사무실이 커지고, 장비가 필요합니다.\n하지만 인원이 줄면? 장비는 창고에 쌓이고, 감가상각은 계속됩니다.\nAOVO Group은 이 문제를 해결합니다."}
                </p>
              </Reveal>
            </div>

            <Stagger className="mt-14 space-y-4 lg:mt-0" gap={0.1}>
              {storyCards.map((item) => (
                <StaggerItem key={item.title} className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:p-8">
                  <h3 className="text-[20px] font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 text-[15px] font-medium leading-[1.7] text-tx-2">{item.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section className="bg-tk text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center lg:py-36">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.45] tracking-[-0.03em] text-balance">
              <span className="mx-0.5 inline-block translate-y-[-0.06em] rounded-full bg-white/12 px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb-soft">소유</span>
              에서{" "}
              <span className="mx-0.5 inline-block translate-y-[-0.06em] rounded-full bg-white/12 px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb-soft">운영</span>
              으로,
              <br />
              비즈니스 장비의 패러다임을 바꿉니다
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] font-medium leading-[1.7] text-white/60">
              AOVO Group은 구독 · 공유 · 렌탈 · 자산연대 · 유통, 다섯 가지 서비스 모델을 통해 기업의 자산 운영 효율을 극대화하고 불필요한 비용을 제거합니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5 SERVICES ═══ */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>5대 핵심 서비스</h2>
          </Reveal>

          <Stagger className="mx-auto mt-12 grid max-w-4xl gap-4 lg:mt-16" gap={0.08}>
            {services.map((svc) => (
              <StaggerItem key={svc.slug}>
                <Link
                  href={`/${svc.slug === "buyback" ? "buyback" : svc.slug}`}
                  className="group flex items-center gap-6 rounded-[24px] bg-tg p-6 transition-colors duration-200 hover:bg-tg-2 lg:px-8"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-[18px] font-bold">{svc.nameKo}</h3>
                      <span className="text-[13px] font-semibold text-tx-3">{svc.nameEn}</span>
                    </div>
                    <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-tx-2">{svc.desc}</p>
                  </div>
                  <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-tb transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ STRENGTHS ═══ */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>AOVO Group의 강점</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3" gap={0.08}>
            {strengths.map((item) => (
              <StaggerItem key={item.title} className="h-full rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <h3 className="text-[18px] font-bold">{item.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{item.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ COMPANY INFO ═══ */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>회사 정보</h2>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl lg:mt-16">
            <dl className="grid gap-x-10 gap-y-6 rounded-[28px] bg-tg p-7 md:grid-cols-2 lg:p-10">
              {companyInfo.map((item) => (
                <div key={item.label}>
                  <dt className="text-[13px] font-semibold text-tx-3">{item.label}</dt>
                  <dd className="mt-1 text-[16px] font-semibold text-tx">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Stagger className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4" gap={0.08}>
            {subLinks.map((link) => (
              <StaggerItem key={link.label}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between rounded-[20px] bg-tg px-5 py-4 text-[15px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2"
                >
                  {link.label}
                  <span aria-hidden className="text-tb transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-tg text-tx" aria-label="상담">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">
              AOVO Group과 함께 시작하세요
            </h2>
            <p className={`mx-auto mt-5 max-w-2xl ${LEAD}`}>전문 상담사가 귀사에 최적화된 장비 운영 방안을 제안합니다.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/support/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
              >
                문의하기
              </Link>
              <a
                href={COMPANY.kakaoChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[17px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
              >
                카카오톡 상담
              </a>
            </div>
            <a href={`tel:${COMPANY.phone}`} className="mt-6 inline-block text-[17px] font-semibold text-tx-2 transition-colors hover:text-tb">
              {COMPANY.phone}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
