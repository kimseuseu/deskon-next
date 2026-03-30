"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  IntersectionObserver-based fade-in                                 */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const programACards = [
  {
    title: "이런 분들에게 추천합니다",
    items: [
      { icon: "🏢", label: "부동산 중개업소", desc: "사무실 이전 고객을 자주 만나는 중개사" },
      { icon: "🎨", label: "인테리어 업체", desc: "사무공간 시공 시 가구 수요 연결" },
      { icon: "🏗️", label: "건물 관리사무소", desc: "입주 기업에 가구 서비스 안내" },
      { icon: "🚚", label: "사무실 이전 업체", desc: "이사와 함께 새 가구 필요 고객 소개" },
    ],
  },
  {
    title: "소개 절차",
    steps: [
      { num: "01", label: "고객 발굴", desc: "사무실 집기/가구가 필요한 고객을 확인합니다" },
      { num: "02", label: "아오보 소개", desc: "고객 연락처를 아오보에 전달합니다" },
      { num: "03", label: "상담 및 계약", desc: "아오보가 직접 고객을 상담하고 계약합니다" },
      { num: "04", label: "수수료 지급", desc: "계약 성사 후 D+7일 이내 수수료를 정산합니다" },
    ],
  },
  {
    title: "수수료 구조",
    details: [
      { stat: "10%", label: "계약 금액 대비 수수료율" },
      { stat: "무제한", label: "소개 횟수 제한 없음" },
      { stat: "D+7", label: "계약 후 7일 이내 정산" },
      { stat: "전담", label: "파트너 전담 매니저 배정" },
    ],
  },
  {
    title: "이런 경우를 상상해 보세요",
    scenario:
      "부동산 중개사 A씨는 사무실 임대 계약을 마친 고객에게 아오보를 소개했습니다. 고객은 사무가구 패키지 500만 원 계약을 체결했고, A씨는 별도 영업 없이 50만 원의 소개 수수료를 D+7일 이내에 지급받았습니다. 소개만 했을 뿐인데 추가 수익이 발생한 것입니다.",
  },
];

const programBCards = [
  {
    title: "이런 업장에 적합합니다",
    items: [
      { icon: "🏬", label: "대형마트", desc: "고객 장보기용 카트, 롤테이너 대여" },
      { icon: "📦", label: "물류센터", desc: "입출고 작업용 장비 공유" },
      { icon: "🏭", label: "창고 / 공장", desc: "내부 운반 장비 수요 해결" },
      { icon: "🏪", label: "유통센터 / 시장", desc: "상인 및 고객 대상 장비 대여" },
    ],
  },
  {
    title: "운영 방식",
    steps: [
      { num: "01", label: "파트너 신청", desc: "온라인 또는 전화로 파트너를 신청합니다" },
      { num: "02", label: "현장 실사", desc: "아오보가 업장을 방문하여 배치 계획을 수립합니다" },
      { num: "03", label: "장비 설치", desc: "물류장비와 QR 시스템을 설치합니다" },
      { num: "04", label: "운영 및 정산", desc: "이용료 발생 시 매월 수수료를 정산합니다" },
    ],
  },
  {
    title: "수익 구조",
    details: [
      { stat: "0원", label: "초기 비용 (장비 무상 제공)" },
      { stat: "매월", label: "이용료 기반 수수료 정산" },
      { stat: "자동", label: "아오보 앱으로 자동 관리" },
      { stat: "무관리", label: "장비 유지보수 아오보 부담" },
    ],
  },
  {
    title: "아오보가 제공하는 것",
    provisions: [
      "롤테이너, 카트, 스태커 등 물류장비 무상 제공",
      "QR 코드 기반 대여 시스템 구축",
      "아오보 앱을 통한 실시간 이용 현황 관리",
      "장비 유지보수 및 교체",
      "이용자 보험 적용",
    ],
  },
];

const commonBenefits = [
  {
    title: "전담 매니저",
    desc: "파트너별 전담 매니저를 배정하여 신속한 소통과 맞춤 지원을 제공합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "마케팅 지원",
    desc: "파트너 업장 홍보물, 온라인 배너, 공동 프로모션 등 마케팅 자료를 제공합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
      </svg>
    ),
  },
  {
    title: "교육 지원",
    desc: "파트너 직원 대상 서비스 교육, 장비 사용법 안내, 운영 매뉴얼을 제공합니다.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Card renderers                                                     */
/* ------------------------------------------------------------------ */
function ItemsCard({ title, items }: { title: string; items: { icon: string; label: string; desc: string }[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="font-paperlogy text-xl font-bold text-primary mb-6">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            <span className="text-2xl shrink-0">{item.icon}</span>
            <div>
              <p className="font-bold text-primary text-sm">{item.label}</p>
              <p className="text-muted text-xs leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsCard({ title, steps }: { title: string; steps: { num: string; label: string; desc: string }[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="font-paperlogy text-xl font-bold text-primary mb-6">{title}</h4>
      <div className="space-y-5">
        {steps.map((s) => (
          <div key={s.num} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-paperlogy font-bold text-sm shrink-0">
              {s.num}
            </div>
            <div>
              <p className="font-bold text-primary text-sm">{s.label}</p>
              <p className="text-muted text-xs leading-relaxed mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailsCard({ title, details }: { title: string; details: { stat: string; label: string }[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="font-paperlogy text-xl font-bold text-primary mb-6">{title}</h4>
      <div className="grid grid-cols-2 gap-6">
        {details.map((d) => (
          <div key={d.label}>
            <p className="font-paperlogy text-2xl font-bold text-accent">{d.stat}</p>
            <p className="text-muted text-xs mt-1">{d.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioCard({ title, scenario }: { title: string; scenario: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="font-paperlogy text-xl font-bold text-primary mb-4">{title}</h4>
      <div className="bg-cream rounded-xl p-6">
        <p className="text-sm text-primary/80 leading-relaxed">{scenario}</p>
      </div>
    </div>
  );
}

function ProvisionsCard({ title, provisions }: { title: string; provisions: string[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h4 className="font-paperlogy text-xl font-bold text-primary mb-6">{title}</h4>
      <ul className="space-y-3">
        {provisions.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className="text-sm text-primary/80">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Render a single program card by type                               */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProgramCard({ card }: { card: any }) {
  if ("items" in card) return <ItemsCard title={card.title} items={card.items} />;
  if ("steps" in card) return <StepsCard title={card.title} steps={card.steps} />;
  if ("details" in card) return <DetailsCard title={card.title} details={card.details} />;
  if ("scenario" in card) return <ScenarioCard title={card.title} scenario={card.scenario} />;
  if ("provisions" in card) return <ProvisionsCard title={card.title} provisions={card.provisions} />;
  return null;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PartnersPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        {/* glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
              Partnership Program
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              파트너와 함께 성장합니다
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              소개만으로 수익을, 공간만으로 수익을. 아오보의 두 가지 파트너 프로그램을 만나보세요.
            </p>
          </Reveal>

          {/* Stat cards */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-8 py-6 text-center min-w-[200px]">
                <p className="font-paperlogy text-3xl font-bold text-accent">10%</p>
                <p className="text-gray-400 text-sm mt-1">사무가구 소개 수수료</p>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-8 py-6 text-center min-w-[200px]">
                <p className="font-paperlogy text-3xl font-bold text-accent">QR</p>
                <p className="text-gray-400 text-sm mt-1">물류장비 공유 수익</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10">
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-colors shadow-lg text-base"
              >
                파트너 신청하기
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PROGRAM A: 사무가구 소개 수수료 ========== */}
      <section className="relative bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Sticky */}
            <div className="lg:sticky lg:top-[50vh] lg:-translate-y-1/2 lg:self-start lg:h-fit py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">
                  Furniture Referral
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-5">
                  고객만 소개하면<br />수수료 10%
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-muted text-base leading-relaxed mb-10 max-w-md">
                  사무실 집기/가구가 필요한 고객을 아오보에 소개해 주세요. 아오보가 직접 상담하고 계약하며, 계약 성사 시 계약 금액의 10%를 수수료로 지급합니다. 영업 부담 없이 소개만 하시면 됩니다.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">10%</p>
                    <p className="text-muted text-xs mt-1">수수료율</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">D+7</p>
                    <p className="text-muted text-xs mt-1">정산 주기</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">1:1</p>
                    <p className="text-muted text-xs mt-1">전담 매니저</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Scrolling cards */}
            <div className="space-y-8 py-24">
              {programACards.map((card, i) => (
                <Reveal key={card.title} delay={i * 80}>
                  <ProgramCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROGRAM B: 물류장비 QR 공유서비스 (reversed layout) ========== */}
      <section className="relative bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Scrolling cards (on desktop) */}
            <div className="space-y-8 py-24 order-2 lg:order-1">
              {programBCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 80}>
                  <ProgramCard card={card} />
                </Reveal>
              ))}
            </div>

            {/* Right: Sticky (on desktop) */}
            <div className="lg:sticky lg:top-[50vh] lg:-translate-y-1/2 lg:self-start lg:h-fit py-24 order-1 lg:order-2">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">
                  QR Sharing Partner
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-5">
                  내 업장에서<br />장비 공유 수익을
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-muted text-base leading-relaxed mb-10 max-w-md">
                  파트너 업장에 아오보 물류장비(롤테이너, 카트, 스태커 등)를 배치하면, 방문 고객이 QR 코드로 장비를 대여합니다. 발생하는 이용료의 일부를 파트너에게 매월 수수료로 지급합니다.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">0원</p>
                    <p className="text-muted text-xs mt-1">초기 비용</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">매월</p>
                    <p className="text-muted text-xs mt-1">정산 주기</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="font-paperlogy text-2xl font-bold text-accent">앱</p>
                    <p className="text-muted text-xs mt-1">자동 관리</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 공통 파트너 혜택 ========== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                Common Benefits
              </span>
              <h2 className="font-paperlogy text-3xl font-bold text-primary">
                공통 파트너 혜택
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonBenefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full hover:border-accent/20 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
                    {b.icon}
                  </div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 bg-gradient-to-r from-accent to-amber-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-6">
              지금 파트너가 되어 보세요
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              소개 수수료든, 장비 공유 수익이든, 아오보와 함께라면 새로운 수익 채널이 열립니다. 부담 없이 문의해 주세요.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg"
              >
                파트너 문의하기
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 text-white/90 font-medium text-lg hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {COMPANY.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
