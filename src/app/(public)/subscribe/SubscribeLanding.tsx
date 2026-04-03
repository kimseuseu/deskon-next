"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

/* ── Reveal Hook ── */
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

/* ── Counter ── */
function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
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
  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

/* ── Pricing Card ── */
function PriceTag({ label, price, unit }: { label: string; price: string; unit: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="font-paperlogy text-2xl md:text-3xl font-bold text-primary">{price}</span>
      <span className="text-sm text-muted">{unit}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function SubscribeLanding() {
  const [activeTab, setActiveTab] = useState(0);

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
              필요한 만큼만 쓰고, 필요 없을 때 반납하세요.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-wrap gap-4">
              <a href="#categories" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium rounded-full px-8 py-4 transition-all shadow-lg shadow-accent/20 text-sm">
                품목별 요금 보기 <span>↓</span>
              </a>
              <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full px-8 py-4 transition-all text-sm">
                {COMPANY.phone}
              </a>
            </div>
          </Reveal>

          {/* Stats */}
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
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gray-100" />

            {[
              { num: "1", title: "문의", desc: "필요한 장비와 수량을 알려주세요", icon: "💬" },
              { num: "2", title: "견적", desc: "24시간 내 맞춤 견적서 발송", icon: "📋" },
              { num: "3", title: "배치", desc: "전국 거점에서 현장으로 직접 배송", icon: "🚛" },
              { num: "4", title: "운영", desc: "쓴 만큼만 비용, 멈추면 0원", icon: "✅" },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="text-center px-4 py-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-paperlogy font-bold text-sm relative z-10">
                    {step.num}
                  </div>
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

        {/* ── 1. 롤테이너 ── */}
        <div className="bg-white py-24 border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal direction="left">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-3 block">01 · Rolltainer</span>
                  <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                    굴러가지 않을 땐<br /><span className="text-accent">비용도 멈춥니다</span>
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                    물류 현장의 필수 장비, 롤테이너. 구독 중이라도 사용하지 않는 기간에는 비용이 발생하지 않습니다.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="bg-surface rounded-2xl p-6">
                      <PriceTag label="기본료" price="30,000" unit="원/월" />
                      <div className="mt-2 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        <span className="text-xs text-muted">1일 사용료 <strong className="text-primary">1,000원</strong>이면 충분해</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/subscribe/rolltainer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors">
                    자세히 보기 <span>→</span>
                  </Link>
                </div>
              </Reveal>

              <Reveal direction="right" delay={200}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-12 flex items-center justify-center min-h-[320px]">
                  <div className="text-center">
                    <div className="text-7xl mb-4">📦</div>
                    <p className="font-paperlogy text-lg font-bold text-primary">철제 · 메쉬 · 접이식 · 대형</p>
                    <p className="text-xs text-muted mt-2">용도에 맞는 다양한 규격 제공</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── 2. 파랫트 ── */}
        <div className="bg-surface py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal direction="scale" delay={100} className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-12 flex items-center justify-center min-h-[320px]">
                  <div className="text-center">
                    <div className="text-7xl mb-4">🏗️</div>
                    <p className="font-paperlogy text-lg font-bold text-primary">플라스틱 · 목재 · 철제</p>
                    <p className="text-xs text-muted mt-2">1200×1000mm 표준 규격</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" className="order-1 lg:order-2">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-500 mb-3 block">02 · Pallet</span>
                  <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                    사용이 멈추면<br /><span className="text-accent">비용도 멈춥니다</span>
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                    적재·보관·운송에 필요한 파랫트를 구독하세요. 사용하지 않는 기간에는 과금이 멈춥니다.
                  </p>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <PriceTag label="기본료" price="6,000" unit="원/월" />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span className="text-xs text-muted">1일 사용료 <strong className="text-primary">50원</strong>이면 충분해</span>
                    </div>
                  </div>

                  <Link href="/subscribe#pallet" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors">
                    자세히 보기 <span>→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── 3. 인테이너 ── */}
        <div className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-violet-500 mb-3 block">03 · Intainer</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  물건이 비면, <span className="text-accent">비용도 멈춥니다</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  산업용 접이식 컨테이너. 물동량에 따라 유연하게 수량을 조절하세요.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-4xl mb-3">📐</div>
                    <h3 className="font-paperlogy font-bold text-primary mb-2">대형</h3>
                    <PriceTag label="기본" price="45,000" unit="원/월" />
                    <p className="text-xs text-muted mt-2">1일 100원</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-4xl mb-3">📐</div>
                    <h3 className="font-paperlogy font-bold text-primary mb-2">중형</h3>
                    <PriceTag label="기본" price="35,000" unit="원/월" />
                    <p className="text-xs text-muted mt-2">1일 80원</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-4xl mb-3">📐</div>
                    <h3 className="font-paperlogy font-bold text-primary mb-2">소형</h3>
                    <PriceTag label="기본" price="25,000" unit="원/월" />
                    <p className="text-xs text-muted mt-2">1일 60원</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── 4. 이사바구니 ── */}
        <div className="bg-primary text-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal direction="left">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-accent mb-3 block">04 · Moving Box</span>
                  <h2 className="font-paperlogy text-3xl md:text-4xl font-bold leading-snug mb-4">
                    사용하지 않을 땐<br /><span className="text-accent-light">비용도 멈춥니다</span>
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md">
                    이사·배송·정리에 최적화된 바구니. 시즌별 수요에 맞춰 탄력적으로 운영하세요.
                  </p>

                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-white/40">기본료</span>
                      <span className="font-paperlogy text-3xl font-bold text-white">3,000</span>
                      <span className="text-sm text-white/40">원/월</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span className="text-xs text-white/50">1일 사용료 <strong className="text-white">100원</strong>이면 충분해</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={200}>
                <div className="grid grid-cols-2 gap-3">
                  {["대형 바구니", "중형 바구니", "소형 바구니", "특수 규격"].map((name, i) => (
                    <div key={name} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors cursor-default"
                      style={{ transitionDelay: `${i * 50}ms` }}>
                      <div className="text-3xl mb-2">🧺</div>
                      <p className="text-sm font-medium text-white">{name}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── 5. 주방집기 (Tab style) ── */}
        <div className="bg-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-orange-500 mb-3 block">05 · Kitchen Equipment</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  조리가 멈추면, <span className="text-accent">비용도 멈춥니다</span>
                </h2>
                <p className="text-muted text-sm">급식·외식 현장에 필요한 업소용 장비를 시간 단위로 구독합니다.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              {/* Tabs */}
              <div className="flex gap-2 mb-8 justify-center">
                {["튀김기", "철판그릴", "인덕션"].map((name, i) => (
                  <button key={name} onClick={() => setActiveTab(i)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === i
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface text-muted hover:bg-gray-100"
                    }`}>
                    {name}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="bg-surface rounded-3xl p-8 md:p-12 text-center transition-all duration-500">
                {activeTab === 0 && (
                  <div className="animate-fade-in">
                    <div className="text-6xl mb-6">🍳</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-2">업소용 튀김기</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">250,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">시간당 <strong className="text-primary">1,000원</strong>이면 조리 끝</p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="animate-fade-in">
                    <div className="text-6xl mb-6">🥩</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-2">철판그릴</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">250,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">시간당 <strong className="text-primary">1,000원</strong></p>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="animate-fade-in">
                    <div className="text-6xl mb-6">🔥</div>
                    <h3 className="font-paperlogy text-2xl font-bold text-primary mb-2">인덕션</h3>
                    <div className="flex items-baseline gap-1 justify-center mb-2">
                      <span className="text-xs text-muted">기본료</span>
                      <span className="font-paperlogy text-4xl font-bold text-primary">80,000</span>
                      <span className="text-sm text-muted">원</span>
                    </div>
                    <p className="text-muted text-sm">시간 기반 과금, 미사용 시 0원</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── 6. 냉난방기 ── */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-medium uppercase tracking-widest text-sky-500 mb-3 block">06 · HVAC</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  사용하지 않을 때<br /><span className="text-accent">비용도 없습니다</span>
                </h2>
                <p className="text-muted text-sm">계절 수요에 맞춘 냉난방 장비. 비수기엔 반납하세요.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal delay={100}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl">❄️</div>
                    <div>
                      <h3 className="font-paperlogy text-lg font-bold text-primary">이동식에어컨 2구</h3>
                      <p className="text-xs text-muted">소규모 공간용</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <PriceTag label="기본료" price="150,000" unit="원" />
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span className="text-xs text-muted">시간당 <strong className="text-primary">1,000원</strong></span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-accent text-white px-2.5 py-0.5 rounded-full">인기</span>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl">🌬️</div>
                    <div>
                      <h3 className="font-paperlogy text-lg font-bold text-primary">이동식에어컨 3구</h3>
                      <p className="text-xs text-muted">대규모 공간용</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <PriceTag label="기본료" price="200,000" unit="원" />
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span className="text-xs text-muted">시간당 <strong className="text-primary">1,500원</strong></span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── 7. 체어 (링크형) ── */}
        <div className="bg-primary py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Reveal>
              <span className="text-[11px] font-medium uppercase tracking-widest text-accent mb-3 block">07 · Chair</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
                자리가 비면, <span className="text-accent-light">비용도 멈춥니다</span>
              </h2>
              <p className="text-white/40 text-sm max-w-lg mx-auto mb-10">
                인체공학 프리미엄 사무용 의자를 월 구독으로. 3개월 정기 세척·부품 교체 포함.
              </p>

              <div className="flex justify-center gap-4 mb-12">
                {[
                  { price: "15,000", name: "JNS-501" },
                  { price: "35,000", name: "JNS-1018" },
                  { price: "45,000", name: "JNS-801L" },
                  { price: "65,000", name: "JNS-901" },
                ].map((chair, i) => (
                  <Reveal key={chair.name} delay={i * 80}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center hover:bg-white/10 transition-colors min-w-[110px]">
                      <p className="text-accent font-paperlogy font-bold text-lg">{chair.price}<span className="text-xs font-normal text-white/30">원~</span></p>
                      <p className="text-[11px] text-white/40 mt-1">{chair.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={400}>
                <Link href="/subscribe/chair" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium rounded-full px-8 py-4 transition-all shadow-lg shadow-accent/20 text-sm">
                  의자 구독 자세히 보기 <span>→</span>
                </Link>
              </Reveal>
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
              { icon: "📊", title: "사용한 만큼만 비용", desc: "구독 중이라도 사용이 멈추면 비용도 멈춥니다. 유휴 장비 보관 비용이 사라집니다." },
              { icon: "🔧", title: "파손 시 무상 교체", desc: "파손·노후 장비는 즉시 무상으로 교체합니다. 별도 관리 인력이 필요 없습니다." },
              { icon: "🚚", title: "전국 당일 배송", desc: "수도권 당일, 전국 익일 배송. 8개 이상 물류 거점에서 운영합니다." },
              { icon: "♻️", title: "감가상각 부담 없음", desc: "장비를 자산이 아닌 비용으로 처리. 매년 떨어지는 자산가치를 걱정하지 마세요." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex items-start gap-5 p-6 rounded-2xl hover:bg-surface transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-surface group-hover:bg-white flex items-center justify-center text-2xl shrink-0 transition-colors">
                    {item.icon}
                  </div>
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
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-4">
              맞춤 견적을 받아보세요
            </h2>
            <p className="text-white/40 text-sm mb-8">품목과 수량만 알려주시면 24시간 내 견적서를 보내드립니다.</p>

            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 mb-8 group">
              <span className="font-paperlogy text-3xl font-bold text-accent group-hover:text-accent-light transition-colors">{COMPANY.phone}</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-all text-sm">
                견적 요청하기
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
