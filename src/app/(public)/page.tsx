"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

const serviceCards = [
  ...SERVICE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    title: cat.nameKo,
    subtitle: cat.nameEn,
    color: cat.color,
    href: `/${cat.slug}`,
  })),
  {
    slug: "products",
    title: "상품 카탈로그",
    subtitle: "Product Catalog",
    color: "from-accent to-amber-700",
    href: "/products",
  },
];

const serviceIcons: Record<string, string> = {
  subscribe: "🔄",
  sharing: "🤝",
  rental: "🚚",
  recycle: "♻️",
  wholesale: "🏭",
  products: "📦",
};

const serviceImages: Record<string, string> = {
  subscribe: "/images/office-furniture.png",
  sharing: "/images/office-equipment.png",
  rental: "/images/aovo-ergo-side.png",
  recycle: "/images/certa.png",
  wholesale: "/images/auth-office/1.png",
  products: "/images/aovo-lineup.png",
};

const valueProps = [
  {
    icon: "💰",
    title: "쓴 만큼만 비용",
    desc: "사용한 기간과 수량만큼만 비용을 지불합니다. 유휴 장비 보관 비용, 감가상각 부담이 사라집니다.",
  },
  {
    icon: "👥",
    title: "인원 변동 대응",
    desc: "사업 규모에 맞춰 장비 수량을 자유롭게 조절하세요. 확장과 축소 모두 유연하게 대응합니다.",
  },
  {
    icon: "⚡",
    title: "휴지기 비용 제로",
    desc: "비수기나 휴지기에는 장비를 반납하면 됩니다. 쓰지 않는 기간에는 비용이 발생하지 않습니다.",
  },
];

const processSteps = [
  { step: "01", title: "문의", desc: "전화, 카카오톡, 웹 문의" },
  { step: "02", title: "견적", desc: "맞춤 견적서 제안" },
  { step: "03", title: "배치", desc: "현장 배송 및 설치" },
  { step: "04", title: "관리", desc: "유지보수 및 교체" },
];

/* ── Hero animation helpers ── */
const heroTitleLine1 = "쓸 때만";
const heroTitleLine2 = "비용을 내세요";

const statsData = [
  { target: 2500, suffix: "+", label: "거래 기업" },
  { target: 50000, suffix: "+", label: "운영 장비" },
  { target: 98, suffix: "%", label: "만족도" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
}

function AnimatedChar({ char, delay }: { char: string; delay: number }) {
  return (
    <span
      className="inline-block opacity-0"
      style={{
        animation: `heroCharIn 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

function CountUpStat({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const value = useCountUp(target, 2000, start);
  return (
    <div className="flex flex-col items-start max-md:items-center">
      <div className="flex items-baseline gap-[0.15em]">
        <span className="font-paperlogy text-2xl md:text-[1.5rem] font-semibold text-white leading-none tracking-[-0.02em]">
          {value.toLocaleString()}
        </span>
        <span className="font-paperlogy text-base md:text-[1rem] font-medium text-accent">
          {suffix}
        </span>
      </div>
      <span className="text-[0.65rem] text-white/45 tracking-[0.08em] uppercase mt-1.5">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Start count-up after hero animations settle
    const timer = setTimeout(() => setStatsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Keyframes for hero animations */}
      <style jsx global>{`
        @keyframes heroCharIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(36px);
          }
        }
      `}</style>

      {/* ── Hero (기존 사이트 동일 구조) ── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/aovo-brand-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

        {/* Center: Subcopy + Main Title */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-4">
            {/* Subcopy */}
            <p
              className="mb-8 text-[clamp(1rem,2.2vw,1.35rem)] font-normal text-white/70 tracking-[0.06em] leading-relaxed opacity-0"
              style={{
                animation: "heroFadeIn 0.8s ease-out 0.3s forwards",
                textShadow: "0 2px 15px rgba(0,0,0,0.4)",
              }}
            >
              <span className="block">산업용품 통합 운영 플랫폼</span>
              <span className="block mt-1">구독 · 공유 · 렌탈 · 순환 · 유통</span>
            </p>

            {/* Main title with character animation */}
            <h1
              className="font-paperlogy leading-[1.15] tracking-[-0.02em] m-0"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
                textShadow: "0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              <span className="block text-white mb-[0.1em] font-light">
                {heroTitleLine1.split("").map((char, i) => (
                  <AnimatedChar key={i} char={char} delay={0.6 + i * 0.05} />
                ))}
              </span>
              <span
                className="block font-bold text-accent-light"
                style={{
                  textShadow: "0 4px 30px rgba(184,151,126,0.3), 0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {heroTitleLine2.split("").map((char, i) => (
                  <AnimatedChar key={i} char={char} delay={0.6 + heroTitleLine1.length * 0.05 + i * 0.05} />
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Left: Stats with count-up */}
        <div
          className="absolute bottom-12 left-12 z-10 flex gap-10 opacity-0 max-md:bottom-44 max-md:left-0 max-md:right-0 max-md:justify-center max-md:gap-8 max-md:px-4"
          style={{ animation: "heroFadeIn 0.8s ease-out 1.2s forwards" }}
        >
          {statsData.map((s) => (
            <CountUpStat
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              start={statsVisible}
            />
          ))}
        </div>

        {/* Bottom Right: CTA */}
        <div
          className="absolute bottom-12 right-12 z-10 flex items-center gap-4 opacity-0 max-md:bottom-12 max-md:left-0 max-md:right-0 max-md:flex-col max-md:items-center max-md:px-4"
          style={{ animation: "heroFadeIn 0.8s ease-out 1.4s forwards" }}
        >
          <Link
            href="/support/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-medium tracking-[0.02em] rounded-full px-8 py-4 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,151,126,0.3)] transition-all duration-300 max-md:w-[220px] max-md:justify-center"
          >
            맞춤 견적 받기
            <span className="ml-1">&rarr;</span>
          </Link>
          <Link
            href="/subscribe"
            className="inline-flex items-center border border-white/30 text-white hover:bg-white/10 text-sm font-normal tracking-[0.03em] rounded-full px-8 py-4 transition-all duration-300 max-md:w-[220px] max-md:justify-center"
          >
            서비스 둘러보기
          </Link>
        </div>

        {/* Bottom Center: Scroll Indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-0 max-md:hidden"
          style={{ animation: "heroFadeIn 0.8s ease-out 1.6s forwards" }}
        >
          <div className="w-px h-[50px] bg-white/[0.15] relative">
            <div
              className="absolute top-0 left-1/2 w-[3px] h-[3px] bg-accent rounded-full"
              style={{
                animation: "scrollBounce 2.5s cubic-bezier(0.4,0,0.2,1) infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Service Categories ── */}
      <section className="py-24 bg-cream">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Services
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              서비스 카테고리
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <Link
                key={card.slug}
                href={card.href}
                className="group block relative overflow-hidden rounded-2xl min-h-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Background image */}
                {serviceImages[card.slug] && (
                  <Image
                    src={serviceImages[card.slug]}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {/* Dark overlay with gradient color tint */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}
                />
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 p-8">
                  <div className="text-3xl mb-4">{serviceIcons[card.slug]}</div>
                  <h3 className="font-paperlogy text-xl font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">{card.subtitle}</p>
                  <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    자세히 보기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Proposition ── */}
      <section className="relative py-24 bg-surface overflow-hidden">
        {/* Background lifestyle image */}
        <div className="absolute inset-0">
          <Image
            src="/images/aovo-living.png"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Why AOVO
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              사두면 남고, 빌리면 딱
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 bg-cream">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Process
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              이용 절차
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/30 transition-colors duration-300">
                  <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-accent/30 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/auth-office/2.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-amber-700/90" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-6">
            지금 맞춤 견적을 받아보세요
          </h2>
          <p className="text-white/80 text-lg mb-10">
            전문 상담사가 귀사에 최적화된 운영 방안을 제안해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary font-bold text-base hover:bg-cream transition-colors duration-300 shadow-lg"
            >
              문의하기
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 text-white/90 font-medium text-lg hover:text-white transition-colors"
            >
              📞 {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
