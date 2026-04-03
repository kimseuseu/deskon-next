"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

/* ── Animations ── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ── useReveal ── */
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

/* ── Phone Mockup with animated screens ── */
function PhoneMockup({ activeScreen }: { activeScreen: number }) {
  const screens = [
    // Screen 0: Home (에이플로우 앱 실제 디자인 반영)
    <div key="home" className="flex flex-col h-full p-4" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold" style={{ color: "#0F172A" }}>안녕하세요, 사용자님</p>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            <p className="text-[9px]" style={{ color: "#64748B" }}>GREEN</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <span className="text-[10px]">🔔</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
            <span className="text-white text-sm">📷</span>
          </div>
          <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>QR 스캔</p>
          <p className="text-[8px] mt-0.5" style={{ color: "#94A3B8" }}>장비 QR을 스캔</p>
          <div className="flex items-center gap-0.5 mt-1">
            <p className="text-[9px] font-semibold" style={{ color: "#2563EB" }}>스캔하기</p>
            <span className="text-[8px]" style={{ color: "#2563EB" }}>→</span>
          </div>
        </div>
        <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
            <span className="text-white text-sm">📍</span>
          </div>
          <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>주변 거점</p>
          <p className="text-[8px] mt-0.5" style={{ color: "#94A3B8" }}>가장 가까운 거점</p>
          <div className="flex items-center gap-0.5 mt-1">
            <p className="text-[9px] font-semibold" style={{ color: "#059669" }}>지도 보기</p>
            <span className="text-[8px]" style={{ color: "#059669" }}>→</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex rounded-2xl p-3 mb-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
        {[{ num: "3", label: "주변 거점", color: "#0F172A" }, { num: "12", label: "이용 가능", color: "#22C55E" }, { num: "7", label: "총 이용", color: "#0F172A" }].map((s, i) => (
          <div key={s.label} className="flex-1 text-center" style={{ borderLeft: i > 0 ? "1px solid #E2E8F0" : "none" }}>
            <p className="text-sm font-bold" style={{ color: s.color }}>{s.num}</p>
            <p className="text-[8px]" style={{ color: "#94A3B8" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Nearby Stations */}
      <p className="text-[10px] font-bold mb-2" style={{ color: "#0F172A" }}>가까운 거점</p>
      {[{ name: "광명물류센터 A동", dist: "350m", count: 5 }, { name: "시흥배송센터", dist: "1.2km", count: 7 }].map(st => (
        <div key={st.name} className="flex items-center gap-3 p-2.5 rounded-xl mb-1.5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EFF6FF" }}>
            <span className="text-sm">📍</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>{st.name}</p>
            <p className="text-[8px]" style={{ color: "#94A3B8" }}>{st.dist} · {st.count}대 이용 가능</p>
          </div>
          <span className="text-[10px]" style={{ color: "#94A3B8" }}>›</span>
        </div>
      ))}

      {/* Tab bar */}
      <div className="mt-auto flex justify-around pt-3" style={{ borderTop: "1px solid #E2E8F0" }}>
        {[{ icon: "🏠", label: "홈", active: true }, { icon: "📷", label: "스캔" }, { icon: "📋", label: "이용내역" }, { icon: "👤", label: "마이" }].map(tab => (
          <div key={tab.label} className="text-center">
            <div className={`text-base ${tab.active ? "opacity-100" : "opacity-30"}`}>{tab.icon}</div>
            <p className="text-[7px] mt-0.5" style={{ color: tab.active ? "#2563EB" : "#94A3B8" }}>{tab.label}</p>
          </div>
        ))}
      </div>
    </div>,

    // Screen 1: QR Scan (에이플로우 앱 스캔 화면)
    <div key="qr" className="flex flex-col h-full items-center justify-center relative" style={{ backgroundColor: "#0F172A" }}>
      {/* Scan frame */}
      <div className="w-44 h-44 relative mb-6">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-xl" style={{ borderColor: "#2563EB" }} />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-xl" style={{ borderColor: "#2563EB" }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-xl" style={{ borderColor: "#2563EB" }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-xl" style={{ borderColor: "#2563EB" }} />
        {/* Scan line */}
        <div className="absolute left-2 right-2 h-0.5 rounded-full animate-[scanMove_2s_ease-in-out_infinite]" style={{ backgroundColor: "#2563EB", top: "50%", boxShadow: "0 0 8px #2563EB" }} />
      </div>
      <p className="text-white text-sm font-semibold mb-1">QR 코드를 스캔하세요</p>
      <p className="text-[11px]" style={{ color: "#64748B" }}>장비에 부착된 QR 코드에 카메라를 맞춰주세요</p>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="px-4 py-2 rounded-full" style={{ backgroundColor: "#1E293B" }}>
          <p className="text-[10px] text-white/60">직접 입력</p>
        </div>
      </div>
    </div>,

    // Screen 2: Rental confirm (에이플로우 대여 확인 화면)
    <div key="confirm" className="flex flex-col h-full" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <p className="text-xs font-bold" style={{ color: "#0F172A" }}>대여 확인</p>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {/* Device card */}
        <div className="rounded-2xl p-5 text-center mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "#EFF6FF" }}>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-sm font-bold" style={{ color: "#0F172A" }}>철제 롤테이너</p>
          <p className="text-[10px]" style={{ color: "#94A3B8" }}>RT-0042 · 광명 A동</p>
        </div>

        {/* Plan selector */}
        <div className="flex gap-1.5 mb-4">
          {[{ label: "시간제", active: true }, { label: "일일(8h)", active: false }, { label: "주간", active: false }].map(p => (
            <div key={p.label} className="flex-1 py-2 rounded-xl text-center" style={{
              backgroundColor: p.active ? "#2563EB" : "#FFFFFF",
              border: p.active ? "none" : "1px solid #E2E8F0"
            }}>
              <p className="text-[10px] font-semibold" style={{ color: p.active ? "#FFFFFF" : "#64748B" }}>{p.label}</p>
            </div>
          ))}
        </div>

        {/* Fee info */}
        <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="flex justify-between mb-2">
            <span className="text-[10px]" style={{ color: "#94A3B8" }}>기본료</span>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>5,000원</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[10px]" style={{ color: "#94A3B8" }}>시간당</span>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>1,500원/h</span>
          </div>
          <div className="flex justify-between pt-2" style={{ borderTop: "1px solid #F1F5F9" }}>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>예상 요금 (4시간)</span>
            <span className="text-xs font-bold" style={{ color: "#2563EB" }}>11,000원</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full py-3 rounded-xl text-center" style={{ backgroundColor: "#2563EB" }}>
          <p className="text-sm font-bold text-white">대여 시작하기</p>
        </div>
      </div>
    </div>,

    // Screen 3: Active rental (에이플로우 이용 중 화면)
    <div key="active" className="flex flex-col h-full" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <p className="text-xs font-bold" style={{ color: "#0F172A" }}>이용 중</p>
      </div>
      <div className="flex-1 p-4">
        {/* Active card with border glow */}
        <div className="relative rounded-2xl mb-4">
          <div className="absolute -inset-0.5 rounded-2xl animate-pulse" style={{ border: "2px solid #2563EB", opacity: 0.4 }} />
          <div className="relative rounded-2xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DBEAFE" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: "#F0FDF4" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22C55E" }} />
                <span className="text-[9px] font-bold" style={{ color: "#22C55E" }}>이용 중</span>
              </div>
              <span className="text-[10px] font-bold ml-auto" style={{ color: "#0F172A" }}>철제 롤테이너</span>
            </div>

            <div className="text-center mb-3">
              <p className="text-[9px]" style={{ color: "#94A3B8" }}>이용 시간</p>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#0F172A", fontFamily: "monospace" }}>02:34:15</p>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl" style={{ backgroundColor: "#EFF6FF" }}>
              <div>
                <p className="text-[9px]" style={{ color: "#64748B" }}>현재 요금</p>
                <p className="text-base font-bold" style={{ color: "#2563EB" }}>8,500원</p>
              </div>
              <div className="text-right">
                <p className="text-[9px]" style={{ color: "#64748B" }}>스테이션</p>
                <p className="text-[10px] font-semibold" style={{ color: "#0F172A" }}>광명 A동</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-3 rounded-xl text-center" style={{ backgroundColor: "#0F172A" }}>
          <p className="text-sm font-bold text-white">반납하기</p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="relative mx-auto" style={{ width: 280, height: 560 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-gray-200 to-gray-300 shadow-2xl" />
      <div className="absolute inset-[3px] rounded-[37px] bg-white overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
        {/* Screen content */}
        <div className="absolute inset-0 top-6 bottom-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {screens[activeScreen]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-10" />
    </div>
  );
}

/* ── Data ── */
const equipment = [
  { name: "롤테이너", desc: "물류센터·창고 단기 운용", emoji: "📦", href: "/sharing/rolltainer", price: "시간당 1,000원~" },
  { name: "카트", desc: "운반용 카트 시간 단위 대여", emoji: "🛒", href: "/sharing/cart", price: "시간당 500원~" },
  { name: "공항카트", desc: "공항·터미널 여객용 카트", emoji: "✈️", href: "/sharing/airport-cart", price: "시간당 1,000원~" },
  { name: "계단카트", desc: "계단 운반 전용 전동카트", emoji: "🪜", href: "/sharing/stair-cart", price: "시간당 2,000원~" },
  { name: "스테커", desc: "적재·하역용 전동 스테커", emoji: "🏗️", href: "/sharing/stacker", price: "시간당 3,000원~" },
  { name: "행사장장비", desc: "전시·행사 현장 단기 장비", emoji: "🎪", href: "/sharing/event", price: "일 10,000원~" },
];

const benefits = [
  { icon: "⏱️", title: "시간 단위 과금", desc: "시간/일/주 단위로 유연하게 선택. 쓴 시간만큼만 비용을 지불합니다." },
  { icon: "📱", title: "QR 즉시 대여", desc: "앱으로 QR 코드를 스캔하면 3초 만에 대여가 시작됩니다. 별도 서류 없이." },
  { icon: "📍", title: "전국 스테이션", desc: "전국 주요 물류 거점에 공유 스테이션을 운영하여 어디서든 이용 가능합니다." },
  { icon: "🔧", title: "관리 불필요", desc: "장비 유지보수, 충전, 점검은 모두 아오보 그룹이 담당합니다." },
];

const partnerBenefits = [
  { icon: "💰", title: "추가 수익 창출", desc: "유휴 공간에 장비를 배치하면 이용료의 일부가 파트너 리워드로 지급됩니다." },
  { icon: "🏢", title: "초기 비용 0원", desc: "장비 구매, 설치, 유지보수 비용 모두 아오보 그룹이 부담합니다." },
  { icon: "📊", title: "자동 관리", desc: "앱 기반으로 대여·반납·정산이 자동화됩니다. 별도 관리 인력이 필요 없습니다." },
];

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function SharingLanding() {
  const [phoneScreen, setPhoneScreen] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-rotate phone screens
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setPhoneScreen(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="bg-white">

      {/* ═══ HERO ═══ */}
      <section data-hero-dark className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" style={{ minHeight: "90vh" }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 min-h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left: text */}
            <div>
              <Reveal>
                <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-blue-500/10 text-blue-300 border border-blue-400/20 mb-8">
                  QR 기반 장비 공유 플랫폼
                </span>
              </Reveal>

              <Reveal delay={150}>
                <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                  스캔 한 번으로<br />
                  <span className="text-blue-300">장비를 빌리세요</span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-white/70 text-lg max-w-lg leading-relaxed mb-10">
                  에이플로우 앱으로 QR 코드를 스캔하면 3초 만에 물류장비를 대여할 수 있습니다.
                  시간 단위 과금으로 쓴 만큼만 비용을 지불하세요.
                </p>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <a href="#how-it-works" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-500 text-white font-medium rounded-full px-8 py-4 transition-all shadow-lg shadow-blue-500/25 text-sm">
                    이용 방법 보기 ↓
                  </a>
                  <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full px-8 py-4 transition-all text-sm">
                    {COMPANY.phone}
                  </a>
                </div>
              </Reveal>

              {/* Stats */}
              <Reveal delay={600}>
                <div className="flex gap-10 pt-8 border-t border-white/5">
                  {[
                    { val: "3초", label: "대여 소요시간" },
                    { val: "24/7", label: "무인 운영" },
                    { val: "전국", label: "스테이션 네트워크" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-paperlogy text-2xl font-bold text-blue-300">{s.val}</div>
                      <div className="text-[11px] text-white/60 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Phone mockup */}
            <Reveal delay={400} className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-16 bg-blue-500/5 rounded-full blur-[80px]" />
                <PhoneMockup activeScreen={phoneScreen} />
                {/* Screen indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {["홈", "QR스캔", "대여확인", "이용중"].map((label, i) => (
                    <button
                      key={i}
                      onClick={() => { setPhoneScreen(i); setAutoPlay(false); }}
                      className={`text-[10px] px-3 py-1 rounded-full transition-all duration-300 ${
                        phoneScreen === i
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-white/65 hover:bg-white/20"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS (Sticky + Phone) ═══ */}
      <section id="how-it-works" className="bg-surface scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left: sticky phone */}
            <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <div className="flex justify-center">
                  <PhoneMockup activeScreen={1} />
                </div>
                <p className="text-center text-xs text-muted mt-6">에이플로우 앱 QR 스캔 화면</p>
              </Reveal>
            </div>

            {/* Right: scrolling steps */}
            <div className="py-24 space-y-8">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-blue-600 mb-3 block">How it works</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-4">
                  이렇게 간단합니다
                </h2>
                <p className="text-muted text-sm mb-8">앱 하나로 대여부터 반납까지. 서류도, 보증금도 필요 없습니다.</p>
              </Reveal>

              {[
                { num: "01", icon: "📱", title: "에이플로우 앱 설치", desc: "앱스토어 또는 구글플레이에서 '에이플로우'를 검색하여 설치합니다. 휴대폰 번호만으로 30초 만에 가입이 완료됩니다.", color: "bg-blue-50 text-blue-600" },
                { num: "02", icon: "📷", title: "QR 코드 스캔", desc: "장비에 부착된 QR 코드에 카메라를 맞추면 장비 정보와 요금제가 자동으로 표시됩니다. 시간/일/주 단위를 선택하세요.", color: "bg-blue-50 text-blue-600" },
                { num: "03", icon: "✅", title: "대여 시작", desc: "'대여 시작' 버튼을 누르면 즉시 이용할 수 있습니다. 실시간으로 이용 시간과 현재 요금이 표시됩니다.", color: "bg-amber-50 text-amber-600" },
                { num: "04", icon: "🔄", title: "반납 완료", desc: "스테이션에 장비를 반납하고 '반납' 버튼을 누르면 자동으로 과금이 종료됩니다. 정산은 자동으로 처리됩니다.", color: "bg-violet-50 text-violet-600" },
              ].map((step, i) => (
                <Reveal key={step.num} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-2xl shrink-0`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-accent">{step.num}</span>
                          <h3 className="font-paperlogy text-lg font-bold text-primary">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QR CODE + APP DOWNLOAD ═══ */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-3 block">Download App</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-white/65 text-sm max-w-lg mx-auto mb-12">
              QR 코드를 스캔하여 에이플로우 앱을 다운로드하세요
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="inline-block bg-white rounded-3xl p-8 shadow-2xl">
              <Image src="/images/app-qr.png" alt="에이플로우 앱 다운로드 QR" width={200} height={200} className="mx-auto" />
              <p className="text-primary font-paperlogy font-bold text-sm mt-4">에이플로우</p>
              <p className="text-muted text-xs mt-1">QR 스캔으로 다운로드</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-blue-600 mb-3 block">Benefits</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">공유서비스의 장점</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="group bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-4xl mb-5 group-hover:animate-[attentionBounce_0.5s_ease-out]">{b.icon}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-3">{b.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EQUIPMENT LINEUP ═══ */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-blue-600 mb-3 block">Equipment</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">공유 가능 장비</h2>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {equipment.map((e) => (
              <motion.div key={e.href} id={e.href.split("/").pop() || ""} className="scroll-mt-24" variants={scaleIn}>
                <Link href={e.href} className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl group-hover:animate-[attentionBounce_0.5s_ease-out]">{e.emoji}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{e.price}</span>
                  </div>
                  <h3 className="font-paperlogy text-xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">{e.name}</h3>
                  <p className="text-sm text-muted mb-4">{e.desc}</p>
                  <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                    자세히 보기 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PARTNER PROGRAM ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-blue-600 mb-3 block">Partner Station</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
                  귀사의 공간이<br /><span className="text-blue-600">수익이 됩니다</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  업장에 아오보 그룹 물류장비를 배치하면, 방문 고객이 QR 코드로 대여합니다.
                  발생하는 이용료의 일부가 파트너 리워드로 지급됩니다.
                  초기 비용 없이, 관리 부담 없이 새로운 수익 채널을 만드세요.
                </p>
                <Link href="/about/partners" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  파트너 프로그램 자세히 보기 →
                </Link>
              </div>
            </Reveal>

            <div className="space-y-4">
              {partnerBenefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 120}>
                  <div className="group flex items-start gap-5 p-6 bg-surface rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl group-hover:animate-[attentionBounce_0.5s_ease-out]">{b.icon}</div>
                    <div>
                      <h3 className="font-paperlogy text-base font-bold text-primary mb-1">{b.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">
              공유서비스 도입을 상담하세요
            </h2>
            <p className="text-white/70 text-sm mb-4">귀사 시설에 맞는 스테이션 구축부터 운영까지 함께합니다.</p>

            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 my-6 group">
              <span className="ring-pulse font-paperlogy text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">{COMPANY.phone}</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-500 text-white font-medium rounded-full transition-all text-sm">
                도입 문의하기
              </Link>
              <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full transition-all text-sm">
                카카오톡 상담
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
