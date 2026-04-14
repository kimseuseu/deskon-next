"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

/* ── Animations ── */

/* ── Reveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── CountUp ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      const p = Math.min(elapsed / duration, 1);
      setCount(Math.round((1 - (1 - p) * (1 - p)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

function CountStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, visible } = useReveal(0.5);
  const count = useCountUp(target, 1800, visible);
  return (
    <div ref={ref} className="text-center">
      <div className="font-paperlogy text-4xl md:text-5xl font-bold text-accent-light">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-white/65 mt-2">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} data-hero-dark className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image src="/images/aovo-banner2.webp" alt="" fill className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />

        <div className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-16">
          <Reveal>
            <span className="inline-block px-5 py-2 rounded-full text-[11px] font-medium tracking-widest uppercase bg-white/10 text-white/70 border border-white/15 mb-8">
              About AOVO Group
            </span>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="font-paperlogy text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              기업의 성장에<br />
              <span className="text-accent-light">집중할 수 있도록</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-white/65 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              비즈니스 장비의 구매부터 운영, 자산연대까지.
              AOVO Group은 기업이 본업에만 집중할 수 있는 환경을 만듭니다.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <a href="#story" className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-medium rounded-full px-8 py-4 transition-all text-sm">
              우리의 이야기 ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-16 bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CountStat target={2500} suffix="+" label="누적 거래 기업" />
            <CountStat target={50000} suffix="+" label="운영 장비 수" />
            <CountStat target={98} suffix="%" label="고객 만족도" />
            <CountStat target={10} suffix="년+" label="업력" />
          </div>
        </div>
      </section>

      {/* ═══ STORY (Sticky Parallax) ═══ */}
      <section id="story" className="bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20">
            {/* Left: sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Our Story</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
                  왜 장비를<br /><span className="text-accent">운영</span>해야 할까요?
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                <p className="text-muted text-base leading-relaxed">
                  기업은 성장합니다. 인원이 늘고, 사무실이 커지고, 장비가 필요합니다.
                  하지만 인원이 줄면? 장비는 창고에 쌓이고, 감가상각은 계속됩니다.
                  AOVO Group은 이 문제를 해결합니다.
                </p>
              </Reveal>
            </div>

            {/* Right: scrolling cards */}
            <div className="py-24 space-y-8">
              {[
                { icon: "💸", title: "구매의 딜레마", desc: "사무가구, 물류장비를 구매하면 수천만 원의 초기 비용이 발생합니다. 사업이 축소되면 유휴 자산이 되어 공간과 비용을 낭비합니다. 매년 감가상각으로 자산 가치는 떨어지고, 폐기 시 추가 비용까지 발생합니다." },
                { icon: "🔄", title: "운영의 해답", desc: "필요할 때 배치하고, 필요 없을 때 반납합니다. 초기 비용 없이 월정액으로 시작하고, 인원 변동에 따라 수량을 즉시 조절합니다. 유지보수, 교체, 수거까지 전담팀이 책임집니다." },
                { icon: "📊", title: "재무적 효과", desc: "장비가 자산이 아닌 비용으로 처리되어 재무제표가 깔끔해집니다. 감가상각 부담이 사라지고, 유휴 장비 보관 비용이 제로가 됩니다. 사용한 만큼만 비용을 지불하는 구조입니다." },
                { icon: "🌱", title: "지속 가능한 성장", desc: "자산연대 서비스를 통해 장비의 수명을 연장하고 폐기를 줄입니다. ESG 경영에 기여하면서 동시에 비용을 절감합니다. 기업은 장비 관리가 아닌 본업에 집중할 수 있습니다." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="group bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-5 group-hover:animate-[attentionBounce_0.5s_ease-out]">{item.icon}</div>
                    <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Mission</span>
            <h2 className="font-paperlogy text-3xl md:text-5xl font-bold leading-snug mb-8">
              <span className="text-accent-light">소유</span>에서 <span className="text-accent-light">운영</span>으로,<br />
              비즈니스 장비의 패러다임을 바꿉니다
            </h2>
            <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
              AOVO Group은 구독 · 공유 · 렌탈 · 자산연대 · 유통, 다섯 가지 서비스 모델을 통해
              기업의 자산 운영 효율을 극대화하고 불필요한 비용을 제거합니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5 SERVICES ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">5 Services</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">5대 핵심 서비스</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              { ...SERVICE_CATEGORIES[0], icon: "🔄", desc: "매달 정액으로 필요한 장비를 사용. 유휴 시 반납하면 과금 중지." },
              { ...SERVICE_CATEGORIES[1], icon: "🤝", desc: "QR 코드 스캔으로 즉시 대여·반납. 시간 단위 유연 요금제." },
              { ...SERVICE_CATEGORIES[2], icon: "🚚", desc: "1개월~36개월 자유 계약. 설치·철거·유지보수 전담." },
              { ...SERVICE_CATEGORIES[3], icon: "♻️", desc: "전문 재정비를 거친 검증 장비를 합리적 가격으로." },
              { ...SERVICE_CATEGORIES[4], icon: "📋", desc: "보유 장비를 합리적 가격으로 유통. 무료 방문 수거." },
            ].map((svc, i) => (
              <Reveal key={svc.slug} delay={i * 80}>
                <Link href={`/${svc.slug === "buyback" ? "buyback" : svc.slug}`}
                  className={`group flex items-center gap-6 p-6 bg-gradient-to-r ${svc.color} rounded-2xl text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
                  <div className="text-3xl shrink-0 group-hover:animate-[attentionBounce_0.5s_ease-out]">{svc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-paperlogy text-lg font-bold">{svc.nameKo}</h3>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/65">{svc.nameEn}</span>
                    </div>
                    <p className="text-sm text-white/70">{svc.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STRENGTHS ═══ */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Why AOVO</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">AOVO Group의 강점</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏢", title: "전국 물류 네트워크", desc: "수도권 당일, 전국 익일 배송. 8개 이상의 거점 물류창고에서 운영합니다." },
              { icon: "👨‍🔧", title: "전담 관리 시스템", desc: "배송·설치·유지보수·수거까지 원스톱 관리. 별도 인력이 필요 없습니다." },
              { icon: "📱", title: "IT 기반 자산 관리", desc: "바코드·QR 기반 실시간 장비 추적. 이용 현황을 앱에서 한눈에 확인합니다." },
              { icon: "💰", title: "비용 구조 혁신", desc: "초기 투자 없이 월정액 운영. 사용하지 않는 기간에는 비용이 발생하지 않습니다." },
              { icon: "🤝", title: "파트너 생태계", desc: "부동산, 인테리어, 이전 업체 등 다양한 파트너와 협력하여 통합 솔루션을 제공합니다." },
              { icon: "♻️", title: "ESG 경영", desc: "장비 재정비·자산연대를 통해 폐기를 줄이고, 지속 가능한 산업 생태계를 구축합니다." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-3xl mb-5 group-hover:animate-[attentionBounce_0.5s_ease-out]">{item.icon}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPANY INFO ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Company</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">회사 정보</h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "상호", value: COMPANY.legalName },
                  { label: "대표", value: COMPANY.ceo },
                  { label: "사업자등록번호", value: COMPANY.bizNumber },
                  { label: "통신판매업신고번호", value: COMPANY.salesReportNumber },
                  { label: "주소", value: COMPANY.address },
                  { label: "전화", value: COMPANY.phone },
                  { label: "이메일", value: COMPANY.email },
                  { label: "카카오톡", value: "@아오보" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-sm text-muted w-28 shrink-0 pt-0.5">{item.label}</span>
                    <span className="text-sm font-medium text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "회사 연혁", href: "/about/history", icon: "📅" },
              { label: "CI 소개", href: "/about/ci", icon: "🎨" },
              { label: "오시는 길", href: "/about/location", icon: "📍" },
              { label: "파트너 계약", href: "/about/partners", icon: "🤝" },
            ].map((link, i) => (
              <Reveal key={link.label} delay={i * 80}>
                <Link href={link.href} className="group flex flex-col items-center gap-3 p-6 bg-surface rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="text-2xl group-hover:animate-[attentionBounce_0.5s_ease-out]">{link.icon}</span>
                  <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">{link.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <Image src="/images/aovo-banner1.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-amber-800/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-4">
              AOVO Group과 함께 시작하세요
            </h2>
            <p className="text-white/80 text-lg mb-4">
              전문 상담사가 귀사에 최적화된 장비 운영 방안을 제안합니다.
            </p>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 my-6 group">
              <span className="ring-pulse font-paperlogy text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors">{COMPANY.phone}</span>
            </a>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg">
                문의하기
              </Link>
              <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors">
                카카오톡 상담
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
