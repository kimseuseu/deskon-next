"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";

/* ══════════════════════════════════════
   ANIMATION HOOKS & COMPONENTS
══════════════════════════════════════ */

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

function Reveal({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const { ref, visible } = useReveal();
  const transforms = {
    up: visible ? "translateY(0)" : "translateY(40px)",
    left: visible ? "translateX(0)" : "translateX(-40px)",
    right: visible ? "translateX(0)" : "translateX(40px)",
    scale: visible ? "scale(1)" : "scale(0.95)",
  };
  return (
    <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: transforms[direction], transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* 01 롤테이너: 좌→우 롤링 등장 */
function RollIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) rotate(0deg)" : "translateX(-80px) rotate(-8deg)",
        transitionDelay: `${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* 02 파랫트: 아래서 적층 */
function StackUp({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div ref={ref} className="transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : `translateY(${60 + index * 20}px) scale(0.9)`,
        transitionDelay: `${index * 150}ms`,
      }}>
      {children}
    </div>
  );
}

/* 03 인테이너: 접혔다 펼쳐지기 */
function Unfold({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "perspective(800px) rotateY(0deg) scaleX(1)" : "perspective(800px) rotateY(-15deg) scaleX(0.85)",
        transformOrigin: "left center",
        transitionDelay: `${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* 04 이사바구니: 톡톡 떨어지는 bounce */
function DropIn({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div ref={ref} className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(-50px) scale(0.8)",
        transitionDelay: `${index * 120}ms`,
      }}>
      {children}
    </div>
  );
}

/* 05 주방집기: glow 효과 */
function GlowIn({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className="transition-all duration-500 ease-out"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.95)",
        filter: active ? "brightness(1)" : "brightness(0.7)",
      }}>
      {children}
    </div>
  );
}

/* 06 냉난방기: 바람에 흔들림 */
function BlowIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) skewX(0deg)" : "translateX(60px) skewX(-3deg)",
        transitionDelay: `${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* 07 체어: 회전 등장 */
function SpinIn({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div ref={ref} className="transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "rotate(0deg) scale(1)" : "rotate(12deg) scale(0.85)",
        transitionDelay: `${index * 100}ms`,
      }}>
      {children}
    </div>
  );
}

/* ── CountUp ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - s) / 1500, 1);
          setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

/* ── Price Tag ── */
function PriceTag({ label, price, unit }: { label: string; price: string; unit: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="font-paperlogy text-2xl md:text-3xl font-bold text-primary">{price}</span>
      <span className="text-sm text-muted">{unit}</span>
    </div>
  );
}

function PriceTagWhite({ label, price, unit }: { label: string; price: string; unit: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xs text-white/40">{label}</span>
      <span className="font-paperlogy text-2xl md:text-3xl font-bold text-white">{price}</span>
      <span className="text-sm text-white/40">{unit}</span>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function SubscribeLanding() {
  const [kitchenTab, setKitchenTab] = useState(0);

  return (
    <div className="bg-white">

      {/* ═══ HERO ═══ */}
      <section data-hero-dark className="relative overflow-hidden bg-primary" style={{ minHeight: "80vh" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto px-6 pt-28 pb-16">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-white/5 text-white/50 border border-white/10 mb-8 w-fit">
              AOVO Group Subscription
            </span>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="font-paperlogy text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              쓸 때만 비용,<br />
              <span className="text-accent-light">멈추면 0원.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-white/40 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
              롤테이너부터 주방집기까지. 구독 중이라도 사용이 멈추면 비용도 멈춥니다.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-wrap gap-4">
              <a href="#categories" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium rounded-full px-8 py-4 transition-all shadow-lg shadow-accent/20 text-sm">
                품목별 요금 보기 ↓
              </a>
              <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full px-8 py-4 transition-all text-sm">
                {COMPANY.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex gap-12 mt-20 pt-8 border-t border-white/5">
              {[
                { target: 2500, suffix: "+", label: "구독 기업" },
                { target: 50000, suffix: "+", label: "운영 장비" },
                { target: 98, suffix: "%", label: "재계약률" },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-paperlogy text-2xl font-bold text-white"><CountUp target={s.target} suffix={s.suffix} /></div>
                  <div className="text-[11px] text-white/30 mt-1 tracking-wider uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-medium uppercase tracking-widest text-accent mb-3">How it works</p>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">이렇게 간단합니다</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gray-100" />
            {[
              { num: "1", title: "문의", desc: "필요한 장비와 수량을 알려주세요", icon: "💬" },
              { num: "2", title: "견적", desc: "24시간 내 맞춤 견적서 발송", icon: "📋" },
              { num: "3", title: "배치", desc: "전국 거점에서 현장으로 직접 배송", icon: "🚛" },
              { num: "4", title: "운영", desc: "쓴 만큼만 비용, 멈추면 0원", icon: "✅" },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="text-center px-4 py-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-paperlogy font-bold text-sm relative z-10">{step.num}</div>
                  <h3 className="font-paperlogy text-base font-bold text-primary mb-1">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="scroll-mt-20">

        {/* ── 01. 롤테이너: 롤링 등장 ── */}
        <div className="bg-white py-24 border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <RollIn>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2 block">01 · Rolltainer</span><span className="font-paperlogy text-lg font-bold text-primary mb-3 block">롤테이너</span>
                  <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                    굴러가지 않을 땐<br /><span className="text-accent">비용도 멈춥니다</span>
                  </h2>
                </RollIn>
                <RollIn delay={200}>
                  <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                    물류 현장의 필수 장비, 롤테이너. 구독 중이라도 사용하지 않는 기간에는 비용이 발생하지 않습니다.
                  </p>
                </RollIn>
                <RollIn delay={400}>
                  <div className="bg-surface rounded-2xl p-6 mb-8">
                    <PriceTag label="기본료" price="30,000" unit="원/월" />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span className="text-xs text-muted">1일 사용료 <strong className="text-primary">1,000원</strong>이면 충분해</span>
                    </div>
                  </div>
                  <Link href="/subscribe/rolltainer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors">
                    자세히 보기 →
                  </Link>
                </RollIn>
              </div>

              <RollIn delay={300}>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/30 group">
                  <div className="aspect-[3/4] max-h-[420px] relative">
                    <Image src="/images/subscribe/rolltainer.webp" alt="롤테이너" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="flex flex-wrap gap-2">
                      {["철제", "메쉬", "접이식", "대형"].map(t => (
                        <span key={t} className="text-[11px] font-medium bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </RollIn>
            </div>
          </div>
        </div>

        {/* ── 02. 파랫트: 적층 효과 + 이미지 ── */}
        <div className="bg-surface py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <StackUp index={0}>
                <div className="relative rounded-3xl overflow-hidden bg-emerald-50 aspect-[3/4] max-h-[420px]">
                  <Image src="/images/subscribe/pallet.webp" alt="파랫트" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </StackUp>

              <div>
                <Reveal>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500 mb-2 block">02 · Pallet</span>
                  <span className="font-paperlogy text-lg font-bold text-primary mb-3 block">파랫트</span>
                  <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                    사용이 멈추면<br /><span className="text-accent">비용도 멈춥니다</span>
                  </h2>
                  <p className="text-muted text-sm mb-8">적재·보관·운송에 필요한 파랫트. 사용하지 않으면 과금도 멈춥니다.</p>
                </Reveal>

                <div className="space-y-3">
                  {[
                    { label: "기본료", value: "6,000원/월", bg: "bg-emerald-50 border-emerald-100" },
                    { label: "1일 사용료", value: "50원", bg: "bg-emerald-100/50 border-emerald-200/50" },
                    { label: "파손 시", value: "무상 교체", bg: "bg-emerald-100 border-emerald-200" },
                    { label: "반납 시", value: "즉시 과금 중지", bg: "bg-emerald-200/50 border-emerald-300/50" },
                  ].map((item, i) => (
                    <StackUp key={item.label} index={i}>
                      <div className={`${item.bg} border rounded-2xl p-5 flex justify-between items-center`}>
                        <span className="text-sm text-muted">{item.label}</span>
                        <span className="font-paperlogy text-lg font-bold text-primary">{item.value}</span>
                      </div>
                    </StackUp>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 03. 인테이너: 접혔다 펼쳐지기 ── */}
        <div className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-violet-500 mb-2 block">03 · Intainer</span><span className="font-paperlogy text-lg font-bold text-primary mb-3 block">인테이너</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  물건이 비면, <span className="text-accent">비용도 멈춥니다</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Unfold delay={0}>
                <div className="relative rounded-3xl overflow-hidden bg-violet-50 aspect-square max-h-[380px] mx-auto w-full">
                  <Image src="/images/subscribe/intainer.webp" alt="인테이너" fill className="object-contain p-4 hover:scale-105 transition-transform duration-700" />
                </div>
              </Unfold>

              <div className="space-y-4">
                {[
                  { size: "대형", price: "45,000", daily: "100원/일", color: "from-violet-50 to-purple-50" },
                  { size: "중형", price: "35,000", daily: "80원/일", color: "from-purple-50 to-violet-50" },
                  { size: "소형", price: "25,000", daily: "60원/일", color: "from-violet-100/30 to-purple-50" },
                ].map((item, i) => (
                  <Unfold key={item.size} delay={(i + 1) * 200}>
                    <div className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300`}>
                      <div>
                        <h3 className="font-paperlogy text-lg font-bold text-primary">{item.size}</h3>
                        <p className="text-xs text-violet-400">{item.daily}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-paperlogy text-2xl font-bold text-primary">{item.price}</span>
                        <span className="text-sm text-muted">원/월</span>
                      </div>
                    </div>
                  </Unfold>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 04. 이사바구니: 톡톡 떨어지는 bounce ── */}
        <div className="bg-primary text-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-accent mb-2 block">04 · Moving Box</span><span className="font-paperlogy text-lg font-bold text-white mb-3 block">이사바구니</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold leading-snug mb-4">
                  사용하지 않을 땐<br /><span className="text-accent-light">비용도 멈춥니다</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <Reveal direction="left">
                <div>
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
                    <PriceTagWhite label="기본료" price="3,000" unit="원/월" />
                    <p className="text-xs text-white/40 mt-2">1일 사용료 <strong className="text-white">100원</strong>이면 충분해</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["대형 바구니", "중형 바구니", "소형 바구니", "특수 규격"].map((name, i) => (
                      <DropIn key={name} index={i}>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
                          <p className="text-sm font-medium text-white">{name}</p>
                        </div>
                      </DropIn>
                    ))}
                  </div>
                </div>
              </Reveal>

              <DropIn index={0}>
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-h-[320px]">
                  <Image src="/images/subscribe/movingbox.webp" alt="이사바구니" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </DropIn>
            </div>
          </div>
        </div>

        {/* ── 05. 주방집기: Glow 탭 전환 ── */}
        <div className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left: image */}
              <Reveal direction="left" className="lg:col-span-2">
                <div className="relative rounded-3xl overflow-hidden bg-orange-50 aspect-[3/4] max-h-[420px]">
                  <Image src="/images/subscribe/kitchen.webp" alt="주방집기" fill className="object-contain p-2 hover:scale-105 transition-transform duration-700" />
                </div>
              </Reveal>

              {/* Right: content */}
              <div className="lg:col-span-3">
            <Reveal>
              <div className="mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-orange-500 mb-2 block">05 · Kitchen Equipment</span><span className="font-paperlogy text-lg font-bold text-primary mb-3 block">주방집기</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  조리가 멈추면, <span className="text-accent">비용도 멈춥니다</span>
                </h2>
                <p className="text-muted text-sm">급식·외식 현장에 필요한 업소용 장비를 시간 단위로 구독합니다.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex gap-2 mb-8 justify-center">
                {["🍳 튀김기", "🥩 철판그릴", "🔥 인덕션"].map((name, i) => (
                  <button key={name} onClick={() => setKitchenTab(i)}
                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      kitchenTab === i
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                        : "bg-surface text-muted hover:bg-gray-100"
                    }`}>
                    {name}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 min-h-[250px]">
                {/* 튀김기 */}
                <GlowIn active={kitchenTab === 0}>
                  <div className={`p-12 text-center ${kitchenTab === 0 ? "" : "absolute inset-0"}`}>
                    <div className="text-7xl mb-6 drop-shadow-lg">🍳</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-4">업소용 튀김기</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">250,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">시간당 <strong className="text-primary">1,000원</strong>이면 조리 끝</p>
                    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full mx-auto" />
                  </div>
                </GlowIn>

                {/* 철판그릴 */}
                <GlowIn active={kitchenTab === 1}>
                  <div className={`p-12 text-center ${kitchenTab === 1 ? "" : "absolute inset-0"}`}>
                    <div className="text-7xl mb-6 drop-shadow-lg">🥩</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-4">철판그릴</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">250,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">시간당 <strong className="text-primary">1,000원</strong></p>
                    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-300 to-orange-300 rounded-full mx-auto" />
                  </div>
                </GlowIn>

                {/* 인덕션 */}
                <GlowIn active={kitchenTab === 2}>
                  <div className={`p-12 text-center ${kitchenTab === 2 ? "" : "absolute inset-0"}`}>
                    <div className="text-7xl mb-6 drop-shadow-lg">🔥</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-4">인덕션</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">80,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">미사용 시 <strong className="text-primary">0원</strong></p>
                    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full mx-auto" />
                  </div>
                </GlowIn>
              </div>
            </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* ── 06. 냉난방기: 바람에 흔들림 ── */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-sky-500 mb-2 block">06 · HVAC</span><span className="font-paperlogy text-lg font-bold text-primary mb-3 block">냉난방기</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  사용하지 않을 때<br /><span className="text-accent">비용도 없습니다</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image */}
              <BlowIn delay={0}>
                <div className="relative rounded-3xl overflow-hidden bg-sky-100 aspect-square flex items-center justify-center">
                  <Image src="/images/subscribe/hvac.webp" alt="이동식에어컨" width={300} height={300} className="object-contain p-4 hover:scale-110 transition-transform duration-700" />
                </div>
              </BlowIn>

              {/* 2구 */}
              <BlowIn delay={200}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl animate-pulse" style={{ animationDuration: "3s" }}>❄️</div>
                    <div>
                      <h3 className="font-paperlogy text-lg font-bold text-primary">이동식에어컨 2구</h3>
                      <p className="text-xs text-muted">소규모 공간용</p>
                    </div>
                  </div>
                  <PriceTag label="기본료" price="150,000" unit="원" />
                  <p className="text-xs text-muted mt-2">시간당 <strong className="text-primary">1,000원</strong></p>
                </div>
              </BlowIn>

              {/* 3구 */}
              <BlowIn delay={400}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-center">
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-accent text-white px-2.5 py-0.5 rounded-full">인기</span>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl animate-pulse" style={{ animationDuration: "2.5s" }}>🌬️</div>
                    <div>
                      <h3 className="font-paperlogy text-lg font-bold text-primary">이동식에어컨 3구</h3>
                      <p className="text-xs text-muted">대규모 공간용</p>
                    </div>
                  </div>
                  <PriceTag label="기본료" price="200,000" unit="원" />
                  <p className="text-xs text-muted mt-2">시간당 <strong className="text-primary">1,500원</strong></p>
                </div>
              </BlowIn>
            </div>
          </div>
        </div>

        {/* ── 07. 체어: 영상 배경 + 글래스모피즘 ── */}
        <div className="relative py-28 overflow-hidden">
          {/* Video background */}
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
            <source src="/images/aovo-flexible-backrest.mp4" type="video/mp4" />
          </video>
          {/* 배경 오버레이: 80% — 영상이 은은하게 비침 */}
          <div className="absolute inset-0 bg-primary/80" />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            {/* 메인 글래스 패널 */}
            <Reveal>
              <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-10 md:p-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.03),0_8px_40px_rgba(0,0,0,0.25)] text-center">
                <span className="text-[11px] font-medium uppercase tracking-widest text-accent mb-2 block">07 · Chair</span>
                <span className="font-paperlogy text-lg font-bold text-white/90 mb-3 block" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>사무용 의자</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white leading-snug mb-4" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                  자리가 비면, <span className="text-accent-light">비용도 멈춥니다</span>
                </h2>
                <p className="text-white/50 text-sm max-w-lg mx-auto mb-10" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                  인체공학 프리미엄 사무용 의자를 월 구독으로. 3개월 정기 세척·부품 교체 포함.
                </p>

                {/* 가격 카드 — 이중 글래스 (패널 안의 카드) */}
                <div className="flex justify-center gap-4 flex-wrap mb-10">
                  {[
                    { price: "15,000", name: "JNS-501" },
                    { price: "35,000", name: "JNS-1018" },
                    { price: "45,000", name: "JNS-801L" },
                    { price: "65,000", name: "JNS-901" },
                  ].map((chair, i) => (
                    <SpinIn key={chair.name} index={i}>
                      <div className="bg-white/[0.08] backdrop-blur-lg border border-white/[0.15] rounded-2xl px-6 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_16px_rgba(0,0,0,0.15)] hover:bg-white/[0.14] hover:border-white/[0.25] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_24px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300 min-w-[120px] cursor-default">
                        <p className="text-accent font-paperlogy font-bold text-xl">{chair.price}<span className="text-xs font-normal text-white/30">원~</span></p>
                        <p className="text-[11px] text-white/40 mt-1">{chair.name}</p>
                      </div>
                    </SpinIn>
                  ))}
                </div>

                <Reveal delay={500}>
                  <Link href="/subscribe/chair" className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm hover:bg-accent text-white font-medium rounded-full px-8 py-4 transition-all shadow-[0_4px_20px_rgba(184,151,126,0.3)] hover:shadow-[0_6px_28px_rgba(184,151,126,0.4)] text-sm">
                    의자 구독 자세히 보기 →
                  </Link>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ WHY SUBSCRIBE ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-medium uppercase tracking-widest text-accent mb-3">Why Subscribe</p>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">왜 구독할까요?</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              { icon: "💰", title: "초기 비용 ZERO", desc: "대량 구매 비용 없이 월정액으로 바로 시작하세요." },
              { icon: "📊", title: "사용한 만큼만 비용", desc: "구독 중이라도 사용이 멈추면 비용도 멈춥니다." },
              { icon: "🔧", title: "파손 시 무상 교체", desc: "파손·노후 장비는 즉시 무상으로 교체합니다." },
              { icon: "🚚", title: "전국 당일 배송", desc: "수도권 당일, 전국 익일 배송. 8개 이상 물류 거점." },
              { icon: "♻️", title: "감가상각 부담 없음", desc: "장비를 자산이 아닌 비용으로 처리합니다." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex items-start gap-5 p-6 rounded-2xl hover:bg-surface transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface group-hover:bg-white flex items-center justify-center text-2xl shrink-0 transition-colors">{item.icon}</div>
                  <div>
                    <h3 className="font-paperlogy text-base font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-4">맞춤 견적을 받아보세요</h2>
            <p className="text-white/40 text-sm mb-8">품목과 수량만 알려주시면 24시간 내 견적서를 보내드립니다.</p>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 mb-8 group">
              <span className="font-paperlogy text-3xl font-bold text-accent group-hover:text-accent-light transition-colors">{COMPANY.phone}</span>
            </a>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-all text-sm">견적 요청하기</Link>
              <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full transition-all text-sm">카카오톡 상담</a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
