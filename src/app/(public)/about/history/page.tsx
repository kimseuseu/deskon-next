"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── Data ── */
const milestones = [
  {
    year: "2015",
    title: "회사 설립",
    desc: "산업용품 유통 전문기업으로 출발. B2B 물류장비 공급 사업을 시작하며 업계에 첫 발을 내딛었습니다.",
    image: "/images/auth-office/1.png",
    accent: "from-blue-600 to-blue-400",
  },
  {
    year: "2016",
    title: "사무용 의자 구독 서비스 론칭",
    desc: "업계 최초 사무용 의자 구독 모델 도입. 중소기업을 대상으로 월정액 의자 운영 서비스를 시작했습니다.",
    image: "/images/chairs/jns-801.png",
    accent: "from-accent to-amber-600",
  },
  {
    year: "2018",
    title: "물류장비 사업 확장",
    desc: "롤테이너, 파랫트, 인테이너 등 물류장비 라인업을 대폭 확대하고 대형 유통사 납품 계약을 체결했습니다.",
    image: "/images/logistics/steel-rolltainer.jpg",
    accent: "from-emerald-600 to-emerald-400",
  },
  {
    year: "2020",
    title: "순환서비스 시작",
    desc: "전문 재정비를 거친 검증된 품질의 장비를 합리적 가격으로 재공급하는 모델을 구축하고 ESG 경영을 본격화했습니다.",
    image: "/images/certa.png",
    accent: "from-teal-600 to-teal-400",
  },
  {
    year: "2022",
    title: "공유서비스 플랫폼 오픈",
    desc: "카트, 스테커 등 물류장비 QR 기반 공유 플랫폼을 론칭하고 행사장비 공유 서비스로 영역을 확대했습니다.",
    image: "/images/logistics/service-concept.png",
    accent: "from-violet-600 to-violet-400",
  },
  {
    year: "2024",
    title: "유통서비스 사업 개시",
    desc: "기업의 보유 장비를 합리적 가격으로 매입하는 서비스를 오픈하고 자산 정리 솔루션으로 카테고리를 다각화했습니다.",
    image: "/images/auth-office/3.png",
    accent: "from-orange-600 to-orange-400",
  },
  {
    year: "2025",
    title: "통합 플랫폼 순환",
    desc: "구독·공유·렌탈·순환·매입 5대 서비스를 하나로 통합한 AOVO 플랫폼으로 새롭게 오픈했습니다.",
    image: "/images/aovo-banner1.png",
    accent: "from-accent to-gold",
  },
];

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Counter ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 2000;
          const animate = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

/* ── Page ── */
export default function HistoryPage() {
  // Progress line
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = el.scrollHeight;
      const scrolled = Math.max(0, windowH - rect.top);
      setProgress(Math.min(scrolled / total, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section data-hero-dark className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <Image src="/images/aovo-banner2.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90 z-[1]" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 min-h-[70vh]">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-8">
            Since 2015
          </span>
          <h1 className="font-paperlogy text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            걸어온 길,<br />만들어갈 미래
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl">
            산업용품 통합 운영의 새로운 기준을 세워가는 AOVO의 여정
          </p>

          {/* Stats */}
          <div className="flex gap-12 md:gap-20 mt-16">
            {[
              { target: 10, suffix: "년+", label: "업력" },
              { target: 2500, suffix: "+", label: "거래 기업" },
              { target: 50000, suffix: "+", label: "운영 장비" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-paperlogy text-3xl md:text-4xl font-bold text-accent-light">
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
              <div className="w-1 h-2.5 bg-accent rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative bg-cream py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={timelineRef}>

          {/* Center progress line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-px -translate-x-1/2">
            <div className="w-full h-full bg-gray-200 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-gold transition-all duration-100"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
          </div>

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <RevealCard key={m.year} delay={i * 80}>
                <div className={`relative flex flex-col lg:flex-row items-center mb-20 last:mb-0 gap-8 lg:gap-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}>
                  {/* Content side */}
                  <div className={`w-full lg:w-[45%] ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                    {/* Year badge */}
                    <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                      <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${m.accent}`} />
                      <span className="font-paperlogy text-4xl md:text-5xl font-bold text-primary/10">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="font-paperlogy text-2xl md:text-3xl font-bold text-primary mb-3">
                      {m.title}
                    </h3>
                    <p className="text-muted text-base leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${m.accent} shadow-lg ring-4 ring-cream`} />
                  </div>

                  {/* Image side */}
                  <div className={`w-full lg:w-[45%] ${isLeft ? "lg:pl-16" : "lg:pr-16"}`}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                      <div className="aspect-[16/10] relative">
                        <Image
                          src={m.image}
                          alt={m.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${m.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      </div>
                      {/* Year overlay */}
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${m.accent} shadow-md`}>
                          {m.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealCard>
            );
          })}
        </div>
      </section>

      {/* ── Vision CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <RevealCard>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-8">
              Vision
            </span>
            <h2 className="font-paperlogy text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              산업용품의 미래를<br />함께 만들어갑니다
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              구매에서 운영으로, 소유에서 공유로. AOVO는 산업 자산의 패러다임을 바꾸고 있습니다.
              지속 가능한 산업 생태계를 위한 여정은 계속됩니다.
            </p>
            <a
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-full px-10 py-4 transition-all duration-300 shadow-lg shadow-accent/25"
            >
              파트너가 되어주세요
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </RevealCard>
        </div>
      </section>
    </>
  );
}
