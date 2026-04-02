"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";
/* Fullpage scroll utility */

/* ── Data ── */

const heroTitleLine1 = "자리가 비면";
const heroTitleLine2 = "비용도 멈춥니다";

const statsData = [
  { target: 2500, suffix: "+", label: "거래 기업" },
  { target: 50000, suffix: "+", label: "운영 장비" },
  { target: 98, suffix: "%", label: "만족도" },
];

const serviceTimeline = [
  {
    slug: "subscribe",
    badge: "월정액",
    title: "구독서비스",
    desc: "매달 정액으로 필요한 장비를 사용하고 언제든 교체·반납",
    href: "/subscribe",
    icon: "🔄",
    color: "from-blue-600 to-blue-400",
    details: [
      "롤테이너·파랫트·인테이너 등 물류장비",
      "사무용 의자·냉난방기·주방집기",
      "월정액 납부, 유휴 시 반납으로 비용 절감",
      "3개월 주기 정기 점검 및 부품 교체 포함",
    ],
  },
  {
    slug: "sharing",
    badge: "자산 공유",
    title: "공유서비스",
    desc: "유휴 장비를 기업 간 공유하여 자산 가동률 극대화",
    href: "/sharing",
    icon: "🤝",
    color: "from-emerald-600 to-emerald-400",
    details: [
      "QR 코드 스캔으로 즉시 대여·반납",
      "시간·일·주 단위 유연한 요금제",
      "카트·스테커·계단리프트 등 현장 장비",
      "전국 거점에 공유 스테이션 운영",
    ],
  },
  {
    slug: "rental",
    badge: "기간 렌탈",
    title: "렌탈서비스",
    desc: "단기부터 장기까지 필요한 기간만큼 렌탈로 운영",
    href: "/rental",
    icon: "🚚",
    color: "from-violet-600 to-violet-400",
    details: [
      "사무가구·IT기기·의료장비 등 전 카테고리",
      "1개월~36개월 자유 계약 기간",
      "설치·철거·유지보수 전담팀 운영",
      "계약 종료 후 무상 수거",
    ],
  },
  {
    slug: "recycle",
    badge: "순환",
    title: "순환서비스",
    desc: "전문 재정비를 거친 검증된 품질의 장비를 합리적인 가격으로",
    href: "/recycle",
    icon: "♻️",
    color: "from-teal-600 to-teal-400",
    details: [
      "전문 기술진의 철저한 재정비 완료",
      "3단계 품질 검수로 검증된 품질 보장",
      "새것처럼 관리된 장비를 합리적 가격으로",
      "ESG 인증서 발급 가능",
    ],
  },
  {
    slug: "buyback",
    badge: "유통",
    title: "유통서비스",
    desc: "보유 장비를 합리적인 가격으로 유통하여 자산 정리 지원",
    href: "/buyback",
    icon: "🏭",
    color: "from-orange-600 to-orange-400",
    details: [
      "사무가구·물류장비·행사집기 등 폭넓은 유통",
      "전문 감정을 통한 합리적 유통가 산정",
      "방문 수거로 편리한 자산 처분",
      "공간 효율화와 자산 정리를 한번에",
    ],
  },
];

const chairCards = [
  {
    name: "JNS-801",
    image: "/images/chairs/jns-801.webp",
    price: "월 29,000원~",
    href: "/subscribe/chair",
  },
  {
    name: "JNS-1018",
    image: "/images/chairs/jns-1018.webp",
    price: "월 25,000원~",
    href: "/subscribe/chair",
  },
  {
    name: "JNS-901",
    image: "/images/chairs/jns-901.webp",
    price: "월 19,000원~",
    href: "/subscribe/chair",
  },
];

const logisticsFeatures = [
  "전국 거점 물류창고 운영",
  "앱 기반 실시간 재고 관리",
  "바코드 기반 자산 추적",
];

const warehouseRegions = [
  { name: "수도권", sub: "서울/경기/인천" },
  { name: "충청권", sub: "대전/세종/충남북" },
  { name: "영남권", sub: "부산/대구/울산/경남북" },
  { name: "호남권", sub: "광주/전남북" },
  { name: "강원/제주", sub: "강원·제주" },
];

const warehouseStats = [
  { value: "8개+", label: "전국 물류거점" },
  { value: "당일/익일", label: "배송" },
  { value: "무료", label: "수거·반납" },
];

const valueCards = [
  { icon: "📊", title: "감가상각 제로", desc: "자산 유통 없이 운영하여 감가상각 부담을 완전히 제거합니다." },
  { icon: "💰", title: "초기 비용 절감", desc: "대규모 초기 투자 없이 월정액으로 바로 사용을 시작합니다." },
  { icon: "📋", title: "회계 단순화", desc: "자산 관리 대신 단순 비용 처리로 회계 업무를 줄입니다." },
  { icon: "🤖", title: "관리 인력 불필요", desc: "전담팀이 배송·설치·유지보수를 모두 책임집니다." },
  { icon: "⚡", title: "즉시 확장·축소", desc: "사업 규모 변동에 맞춰 장비를 즉시 늘리거나 줄입니다." },
];

const processSteps = [
  { step: "01", title: "문의·상담", desc: "전화/카카오톡/웹으로 편하게 문의" },
  { step: "02", title: "계약·배치", desc: "맞춤 견적 후 현장 배송·설치" },
  { step: "03", title: "운영·관리", desc: "전담팀 유지보수 및 정기 점검" },
  { step: "04", title: "회수·순환", desc: "반납·회수 후 재정비·재배치" },
];

const serviceFeatureBoxes = [
  { title: "필요할 때 즉시 배치", desc: "전국 물류 네트워크" },
  { title: "통합 자산 관리", desc: "바코드 기반 실시간 추적" },
  { title: "전문팀 직접 관리", desc: "배송·설치·점검·회수 원스톱" },
];

/* ── Helpers ── */

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

function CountUpStat({
  target,
  suffix,
  label,
  start,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
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

/* ── Main Component ── */

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
    agree: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fullpage scroll – wheel/touch snap to sections
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Disable fullpage scroll on mobile (< 1024px)
    const isMobile = () => window.innerWidth < 1024;

    const sections = containerRef.current?.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections?.length) return;

    const smoothScrollTo = (target: number, duration: number) => {
      const start = window.scrollY;
      const distance = target - start;
      const startTime = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isScrolling.current = false;
        }
      };
      requestAnimationFrame(animate);
    };

    const scrollTo = (index: number) => {
      const clamped = Math.max(0, Math.min(index, sections.length - 1));
      if (clamped === currentSection && index !== 0) return;
      isScrolling.current = true;
      setCurrentSection(clamped);
      const targetTop = sections[clamped].getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetTop, 1100);
    };

    const onWheel = (e: WheelEvent) => {
      if (isMobile()) return; // normal scroll on mobile
      if (isScrolling.current) { e.preventDefault(); return; }
      const target = e.target as HTMLElement;
      if (target.closest("form") || target.closest("textarea") || target.closest("select")) return;

      if (Math.abs(e.deltaY) < 30) return;

      // Last section + scrolling down → let normal scroll to footer
      const lastIndex = sections.length - 1;
      if (currentSection === lastIndex && e.deltaY > 0) {
        return; // don't prevent default, allow natural scroll to footer
      }

      e.preventDefault();
      scrollTo(currentSection + (e.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isMobile()) return;
      if (isScrolling.current) return;
      const lastIndex = sections.length - 1;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentSection === lastIndex) return; // allow natural scroll to footer
        e.preventDefault(); scrollTo(currentSection + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); scrollTo(currentSection - 1); }
      if (e.key === "Home") { e.preventDefault(); scrollTo(0); }
      if (e.key === "End") { e.preventDefault(); scrollTo(lastIndex); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [currentSection]);

  // IntersectionObserver for data-animate elements
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stats count-up delay
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.agree) return;
      setFormSubmitting(true);
      try {
        await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setFormSubmitted(true);
      } catch {
        alert("문의 전송에 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setFormSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <>
      {/* ── Global keyframes & animate styles ── */}
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
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(36px);
          }
        }
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        [data-animate].visible {
          opacity: 1;
          transform: translateY(0);
        }
        [data-animate][data-delay="1"] {
          transition-delay: 0.1s;
        }
        [data-animate][data-delay="2"] {
          transition-delay: 0.2s;
        }
        [data-animate][data-delay="3"] {
          transition-delay: 0.3s;
        }
        [data-animate][data-delay="4"] {
          transition-delay: 0.4s;
        }
        [data-animate][data-delay="5"] {
          transition-delay: 0.5s;
        }
      `}</style>

      {/* Section navigation dots */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3" aria-label="Page sections">
        {["히어로", "소개", "서비스", "의자구독", "물류장비", "물류창고", "AOVO", "문의"].map((label, i) => (
          <button
            key={i}
            onClick={() => {
              const sections = containerRef.current?.querySelectorAll<HTMLElement>("[data-section]");
              if (sections?.[i]) {
                isScrolling.current = true;
                setCurrentSection(i);
                sections[i].scrollIntoView({ behavior: "smooth" });
                setTimeout(() => { isScrolling.current = false; }, 1000);
              }
            }}
            className={`group relative w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === i
                ? "bg-accent border-accent scale-125"
                : "bg-transparent border-white/40 hover:border-accent/60"
            }`}
            aria-label={label}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white bg-primary/80 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div ref={containerRef}>
        {/* ═══════════════════════════════════════════
            Section 1: HERO
        ═══════════════════════════════════════════ */}
        <section
          data-section="0"
          data-hero-dark
          className="relative overflow-hidden"
          style={{ height: "100dvh" }}
        >
          {/* Poster image (shows instantly while video loads) */}
          <Image
            src="/images/aovo-banner1.webp"
            alt=""
            fill
            priority
            className="object-cover"
          />
          {/* Video bg (loads over poster) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/aovo-banner1.webp"
            className="absolute inset-0 w-full h-full object-cover z-[1]"
          >
            <source src="/images/aovo-brand-bg.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-[2]" />

          {/* Center content */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pt-20">
            <div className="text-center px-4">
              <p
                className="mb-8 text-[clamp(1rem,2.2vw,1.35rem)] font-normal text-white/70 tracking-[0.06em] leading-relaxed opacity-0"
                style={{
                  animation: "heroFadeIn 0.8s ease-out 0.3s forwards",
                  textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                }}
              >
                <span className="block tracking-[0.02em]">인원변화에 반응하는</span>
                <span className="block mt-1 tracking-[0.02em]">
                  자산 관리 서비스
                </span>
              </p>

              <h1
                className="font-paperlogy leading-[1.15] tracking-[-0.02em] m-0"
                style={{
                  fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
                  textShadow:
                    "0 4px 30px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                <span className="block text-white mb-[0.1em] font-light">
                  {heroTitleLine1.split("").map((char, i) => (
                    <AnimatedChar
                      key={i}
                      char={char}
                      delay={0.6 + i * 0.05}
                    />
                  ))}
                </span>
                <span
                  className="block font-bold text-accent-light"
                  style={{
                    textShadow:
                      "0 4px 30px rgba(184,151,126,0.3), 0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {heroTitleLine2.split("").map((char, i) => (
                    <AnimatedChar
                      key={i}
                      char={char}
                      delay={
                        0.6 + heroTitleLine1.length * 0.05 + i * 0.05
                      }
                    />
                  ))}
                </span>
              </h1>
            </div>
          </div>

          {/* Bottom bar: stats left + CTAs right */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 opacity-0"
            style={{ animation: "heroFadeIn 0.8s ease-out 1.2s forwards" }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              {/* Stats */}
              <div className="flex gap-8 md:gap-10">
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

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Link
                  href="/support/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-medium tracking-[0.02em] rounded-full px-7 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,151,126,0.3)] transition-all duration-300"
                >
                  맞춤 견적 받기
                  <span className="ml-1">&rarr;</span>
                </Link>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center border border-white/30 text-white hover:bg-white/10 text-sm font-normal tracking-[0.03em] rounded-full px-7 py-3.5 transition-all duration-300"
                >
                  서비스 둘러보기
                </Link>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center pb-4 max-md:hidden">
              <div className="w-px h-[40px] bg-white/[0.15] relative">
                <div
                  className="absolute top-0 left-1/2 w-[3px] h-[3px] bg-accent rounded-full"
                  style={{
                    animation: "scrollBounce 2.5s cubic-bezier(0.4,0,0.2,1) infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 2: ASSET MESSAGE
        ═══════════════════════════════════════════ */}
        <section
          data-section="1"
          className="min-h-screen bg-primary flex items-center relative overflow-hidden"
        >
          {/* Radial gradient bg */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(184,151,126,0.08),transparent_70%)]" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-6 block">
                TOTAL EQUIPMENT SOLUTION
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                사두면 남고,
                <br />
                빌리면 딱 맞습니다.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                물류장비부터 사무가구, 주방집기, 의료장비까지 아오보 그룹 통합 운영
                서비스로 자산을 최적화하세요.
              </p>

              <div className="space-y-4">
                {[
                  "필요한 만큼만 빌려 쓰고 반납",
                  "구독·공유·렌탈·순환·유통 통합",
                  "초기 비용 ZERO, 월정액 운영",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                    data-animate
                    data-delay={String(i + 1)}
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm md:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div className="relative" data-animate data-delay="2">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/aovo-banner2.webp"
                  alt="아오보 그룹 통합 장비 운영"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 3: 5대 서비스 카테고리
        ═══════════════════════════════════════════ */}
        <section
          data-section="2"
          className="min-h-screen bg-cream flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16" data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                OUR SERVICES
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
                5대 서비스로 통합 운영
              </h2>
            </div>

            {/* Interactive Service Cards */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 lg:h-[420px]" data-animate data-delay="1">
              {serviceTimeline.map((svc) => (
                <div
                  key={svc.slug}
                  className="group relative flex-1 lg:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl overflow-hidden cursor-pointer min-h-[100px] lg:min-h-0"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Default state: compact vertical card */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-6 lg:py-0 text-center transition-all duration-700">
                    {/* Icon + badge (always visible) */}
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">
                      {svc.icon}
                    </div>
                    <span className="text-[0.6rem] font-medium uppercase tracking-widest text-white/60 mb-2">
                      {svc.badge}
                    </span>
                    <h3 className="font-paperlogy text-lg font-bold text-white mb-1 whitespace-nowrap">
                      {svc.title}
                    </h3>

                    {/* Short desc (visible in default state, hidden on hover) */}
                    <p className="text-xs text-white/50 max-w-[160px] leading-relaxed lg:opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300">
                      {svc.desc}
                    </p>

                    {/* Expanded details (hidden by default, visible on hover) */}
                    <div className="hidden lg:block overflow-hidden max-h-0 group-hover:max-h-[300px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-4">
                      <div className="border-t border-white/20 pt-4 text-left px-2">
                        <ul className="space-y-2.5">
                          {svc.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-white/80"
                              style={{ transitionDelay: `${j * 60}ms` }}
                            >
                              <svg className="w-4 h-4 text-white/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={svc.href}
                          className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-white bg-white/15 hover:bg-white/25 rounded-full px-5 py-2 transition-colors duration-200"
                        >
                          자세히 보기
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: link overlay */}
                  <Link href={svc.href} className="absolute inset-0 z-20 lg:hidden" aria-label={svc.title} />
                </div>
              ))}
            </div>

            {/* Feature boxes */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              data-animate
              data-delay="2"
            >
              {serviceFeatureBoxes.map((box) => (
                <div
                  key={box.title}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all duration-300"
                >
                  <h4 className="font-paperlogy text-lg font-bold text-primary mb-2">
                    {box.title}
                  </h4>
                  <p className="text-sm text-muted">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 4: 의자 구독 서비스
        ═══════════════════════════════════════════ */}
        <section
          data-section="3"
          className="min-h-screen bg-primary flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16" data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                CHAIR SUBSCRIPTION
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white">
                프리미엄 의자 구독
              </h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              data-animate
              data-delay="1"
            >
              {chairCards.map((chair, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="relative aspect-square bg-white/5">
                    <Image
                      src={chair.image}
                      alt={chair.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-paperlogy text-lg font-bold text-white mb-1">
                      {chair.name}
                    </h3>
                    <p className="text-accent text-sm font-medium mb-4">
                      {chair.price}
                    </p>
                    <Link
                      href={chair.href}
                      className="text-sm text-white/60 hover:text-accent transition-colors"
                    >
                      자세히 보기 &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center" data-animate data-delay="2">
              <Link
                href="/subscribe/chair"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
              >
                의자 구독 서비스 알아보기
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 5: 물류장비 구독 & 공유
        ═══════════════════════════════════════════ */}
        <section
          data-section="4"
          className="min-h-screen bg-surface flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-6 block">
                LOGISTICS SOLUTION
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-tight mb-6">
                물류장비 구독 &amp; 공유
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-lg">
                롤테이너, 파렛트, 인테이너 등 물류 핵심 장비를 구독 또는 공유
                방식으로 유연하게 운영하세요. 보유 부담 없이 필요한 만큼만
                사용하고 반납합니다.
              </p>

              <ul className="space-y-3 mb-10">
                {logisticsFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-primary/80">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/subscribe/rolltainer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-medium rounded-full px-6 py-3 transition-all duration-300"
                >
                  구독 서비스
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/sharing/rolltainer"
                  className="inline-flex items-center gap-2 border border-accent/30 text-accent hover:bg-accent/5 text-sm font-medium rounded-full px-6 py-3 transition-all duration-300"
                >
                  공유 서비스
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative" data-animate data-delay="2">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/logistics/steel-rolltainer-use.webp"
                  alt="물류장비 라인업"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 6: 전국 물류 창고 네트워크
        ═══════════════════════════════════════════ */}
        <section
          data-section="5"
          className="min-h-screen bg-cream flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16" data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                NATIONWIDE NETWORK
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-4">
                전국 거점 물류창고
              </h2>
              <p className="text-muted text-base max-w-lg mx-auto">
                전국 어디서나 빠른 배송과 회수가 가능합니다
              </p>
            </div>

            {/* Region grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16"
              data-animate
              data-delay="1"
            >
              {warehouseRegions.map((region, i) => (
                <div
                  key={region.name}
                  className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  data-animate
                  data-delay={String(i + 1)}
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <h4 className="font-paperlogy text-base font-bold text-primary mb-1">
                    {region.name}
                  </h4>
                  <p className="text-xs text-muted">{region.sub}</p>
                  <p className="text-[0.65rem] text-accent/60 mt-2 uppercase tracking-wider">
                    거점 물류센터
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom stats */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              data-animate
              data-delay="3"
            >
              {warehouseStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-primary rounded-2xl p-8 text-center"
                >
                  <div className="font-paperlogy text-2xl font-bold text-accent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 7: WHY AOVO
        ═══════════════════════════════════════════ */}
        <section
          data-section="6"
          className="min-h-screen bg-primary flex items-center relative overflow-hidden"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/aovo-banner1.webp"
              alt=""
              fill
              className="object-cover opacity-[0.06]"
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16" data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                WHY AOVO
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
                아오보는 장비 운영의 방식을
                <br />새로 정의합니다.
              </h2>
            </div>

            {/* Value cards */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20"
              data-animate
              data-delay="1"
            >
              {valueCards.map((card, i) => (
                <div
                  key={card.title}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 text-center"
                  data-animate
                  data-delay={String(i + 1)}
                >
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <h4 className="font-paperlogy text-sm font-bold text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Process */}
            <div data-animate data-delay="2">
              <h3 className="text-center font-paperlogy text-xl font-bold text-white/80 mb-10">
                서비스 프로세스
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, i) => (
                  <div key={step.step} className="relative">
                    <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
                      <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-3">
                        {step.step}
                      </div>
                      <h4 className="font-paperlogy text-lg font-bold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-white/50">{step.desc}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-accent/30 text-xl">
                        &rarr;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 8: CONTACT
        ═══════════════════════════════════════════ */}
        <section
          data-section="7"
          className="min-h-screen bg-cream flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center mb-16" data-animate>
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
                CONTACT US
              </span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
                무엇이든 문의하세요
              </h2>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              data-animate
              data-delay="1"
            >
              {/* Left: info */}
              <div className="flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <h4 className="font-paperlogy text-sm font-bold text-primary/50 uppercase tracking-wider mb-2">
                      전화 문의
                    </h4>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="font-paperlogy text-2xl font-bold text-primary hover:text-accent transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-paperlogy text-sm font-bold text-primary/50 uppercase tracking-wider mb-2">
                      카카오톡 상담
                    </h4>
                    <a
                      href={COMPANY.kakaoChannel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-paperlogy text-lg font-bold text-accent hover:text-accent-light transition-colors"
                    >
                      카카오톡 채널 바로가기 &rarr;
                    </a>
                  </div>
                  <div>
                    <h4 className="font-paperlogy text-sm font-bold text-primary/50 uppercase tracking-wider mb-2">
                      이메일
                    </h4>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-paperlogy text-lg font-bold text-primary hover:text-accent transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-paperlogy text-sm font-bold text-primary/50 uppercase tracking-wider mb-2">
                      주소
                    </h4>
                    <p className="text-muted text-sm">{COMPANY.address}</p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-paperlogy text-xl font-bold text-primary mb-2">
                      문의가 접수되었습니다
                    </h3>
                    <p className="text-sm text-muted">
                      빠른 시일 내에 담당자가 연락드리겠습니다.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary/70 mb-1">
                          회사명
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                          placeholder="주식회사 아오보"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/70 mb-1">
                          담당자명
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                          placeholder="홍길동"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary/70 mb-1">
                          연락처
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                          placeholder="010-1234-5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/70 mb-1">
                          이메일
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary/70 mb-1">
                        서비스 유형
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                      >
                        <option value="">선택해 주세요</option>
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.nameKo}
                          </option>
                        ))}
                        <option value="etc">기타</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary/70 mb-1">
                        문의 내용
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                        placeholder="문의 내용을 입력해 주세요"
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={formData.agree}
                        onChange={(e) =>
                          setFormData({ ...formData, agree: e.target.checked })
                        }
                        className="mt-1 accent-accent"
                      />
                      <label
                        htmlFor="agree"
                        className="text-xs text-muted leading-relaxed"
                      >
                        개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의
                        답변 목적으로만 사용됩니다.
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={!formData.agree || formSubmitting}
                      className="w-full py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formSubmitting ? "전송 중..." : "문의하기"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
