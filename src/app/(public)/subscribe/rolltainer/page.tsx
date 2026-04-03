"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";

/* ── Scroll Reveal ── */
function useReveal(threshold = 0.15) {
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
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Data ── */
const rolltainerTypes = [
  { name: "철제 롤테이너", image: "/images/logistics/steel-rolltainer.webp", spec: "500L · 내구성 강화 · 잠금장치", price: "월 45,000원~", tag: "BEST" },
  { name: "메쉬 롤테이너", image: "/images/logistics/steel-rolltainer-use.webp", spec: "경량 · 통풍형 · 식품물류 최적", price: "월 40,000원~", tag: "" },
  { name: "접이식 롤테이너", image: "/images/logistics/rolltainer-use.webp", spec: "접이식 · 보관 효율 · 소규모 물류", price: "월 35,000원~", tag: "" },
  { name: "대형 롤테이너", image: "/images/logistics/rolltainer-use-alt.webp", spec: "800L · 대용량 · 창고·공장용", price: "월 55,000원~", tag: "대용량" },
];

const benefits = [
  { icon: "💰", title: "구매 대비 70% 비용 절감", desc: "수백 대 롤테이너를 한꺼번에 구매하지 않아도 됩니다. 월정액으로 필요한 만큼만 사용하세요." },
  { icon: "📊", title: "시즌별 탄력 운영", desc: "물동량이 많은 시즌에 수량을 늘리고, 비수기에는 반납합니다. 유휴 장비 보관 비용이 사라집니다." },
  { icon: "🔧", title: "파손 시 즉시 교체", desc: "파손·노후된 롤테이너는 무상으로 교체합니다. 별도 수리 비용이나 관리 인력이 필요 없습니다." },
  { icon: "🏢", title: "전국 거점 당일 배송", desc: "수도권·충청·영남·호남·강원 전국 물류 거점에서 당일 또는 익일 배송합니다." },
];

const useCases = [
  { title: "물류센터·창고", desc: "대량 적재·운반에 최적화된 철제 롤테이너로 물류 효율을 극대화합니다.", icon: "🏭" },
  { title: "대형마트·유통", desc: "매장 간 상품 이동, 입고·진열에 필수적인 운반 장비를 안정적으로 공급합니다.", icon: "🏪" },
  { title: "택배·배송", desc: "허브터미널, 서브터미널 간 화물 분류·운반에 접이식 롤테이너를 활용합니다.", icon: "📦" },
  { title: "제조·공장", desc: "생산 라인 간 부품·완성품 운반에 대형 롤테이너를 사용합니다.", icon: "⚙️" },
];

const process = [
  { num: "01", title: "수요 파악", desc: "물동량, 필요 수량, 규격을 상담합니다.", icon: "📞" },
  { num: "02", title: "견적·계약", desc: "맞춤 견적 후 월 구독 계약을 체결합니다.", icon: "📋" },
  { num: "03", title: "배송·배치", desc: "전국 거점에서 현장으로 직접 배송합니다.", icon: "🚛" },
  { num: "04", title: "운영·교체", desc: "파손 시 즉시 교체, 비수기 반납 가능합니다.", icon: "🔄" },
];

const faqs = [
  { q: "최소 구독 수량이 있나요?", a: "최소 수량 제한 없이 1대부터 구독 가능합니다. 수량이 많을수록 단가가 낮아지며, 대량 구독 시 별도 할인이 적용됩니다." },
  { q: "다른 규격의 롤테이너를 섞어서 구독할 수 있나요?", a: "네, 가능합니다. 철제·메쉬·접이식·대형 등 용도에 맞게 조합하여 구독할 수 있습니다." },
  { q: "파손된 롤테이너는 어떻게 처리하나요?", a: "연락 주시면 무상으로 교체합니다. 수거와 새 롤테이너 배송이 동시에 진행되어 현장 운영에 차질이 없습니다." },
  { q: "비수기에 일부만 반납할 수 있나요?", a: "네, 월 단위로 수량 조절이 가능합니다. 반납한 수량만큼 다음 달 구독료가 줄어듭니다." },
];

/* ── Component ── */
export default function RolltainerSubscriptionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section data-hero-dark className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
        <Image src="/images/logistics/cover.webp" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-[1]" />

        <div className="relative z-10 min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
            <div className="max-w-2xl">
              <Reveal>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-blue-500/15 text-blue-300 border border-blue-400/20 mb-6">
                  Rolltainer Subscription
                </span>
              </Reveal>
              <Reveal delay={150}>
                <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  롤테이너를<br />
                  <span className="text-accent-light">구독</span>하세요
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                  물류·유통 현장의 핵심 운반 장비, 롤테이너를 구매 없이 월 구독으로 운영하세요.
                  물동량에 맞춰 수량을 자유롭게 조절하고, 파손 시 즉시 교체됩니다.
                </p>
              </Reveal>
              <Reveal delay={450}>
                <div className="flex flex-wrap gap-4">
                  <a href="#lineup" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-full px-8 py-4 transition-all shadow-lg shadow-accent/25">
                    제품 보기 <span>↓</span>
                  </a>
                  <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 border border-white/25 text-white font-medium rounded-full px-8 py-4 hover:bg-white/10 transition-all">
                    📞 {COMPANY.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* 히어로 이미지 제거 — 배경 이미지만 사용 */}
          </div>
        </div>
      </section>

      {/* ═══ WHY SUBSCRIBE (Sticky Parallax) ═══ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Why Subscribe</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
                  롤테이너,<br />왜 <span className="text-accent">구독</span>할까요?
                </h2>
                <p className="text-muted text-base leading-relaxed">
                  롤테이너를 수백 대 구매하면 초기 비용이 수천만 원에 달합니다.
                  물동량은 계절마다 달라지는데, 구매한 장비는 비수기에도 창고에 놓여있습니다.
                  구독하면 필요한 만큼만 쓰고, 필요 없을 때 반납합니다.
                </p>
              </Reveal>
            </div>

            <div className="py-24 space-y-8">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 100}>
                  <div className="bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                    <div className="text-4xl mb-5">{b.icon}</div>
                    <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">{b.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LINEUP (Sticky Parallax reversed) ═══ */}
      <section id="lineup" className="bg-primary text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="py-24 space-y-6">
              {rolltainerTypes.map((rt, i) => (
                <Reveal key={rt.name} delay={i * 80}>
                  <div className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-6 p-6">
                      <div className="relative w-32 h-24 bg-white/5 rounded-xl flex-shrink-0 overflow-hidden">
                        <Image src={rt.image} alt={rt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        {rt.tag && (
                          <span className="absolute top-1 right-1 text-[9px] font-bold uppercase bg-accent text-white px-1.5 py-0.5 rounded">{rt.tag}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-paperlogy text-lg font-bold text-white mb-1">{rt.name}</h3>
                        <p className="text-white/40 text-xs mb-2">{rt.spec}</p>
                        <div className="text-accent font-bold text-base">{rt.price}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Lineup</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white leading-snug mb-6">
                  용도별 롤테이너<br />라인업
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  물류센터, 유통매장, 택배 허브, 제조 공장 등
                  현장 환경에 맞는 다양한 규격과 타입을 제공합니다.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  {["철제·메쉬·접이식 등 다양한 타입", "500L ~ 800L 용량별 선택", "10대 이상 구독 시 할인 적용", "파손 시 무상 교체"].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Use Cases</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">이런 현장에서 사용됩니다</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc, i) => (
              <Reveal key={uc.title} delay={i * 100}>
                <div className="bg-surface rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all duration-300 h-full">
                  <div className="text-4xl mb-5">{uc.icon}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-3">{uc.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Process</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">이용 절차</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 h-full">
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div className="font-paperlogy text-3xl font-bold text-accent/15 mb-2">{step.num}</div>
                  <h3 className="font-paperlogy text-base font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">FAQ</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">자주 묻는 질문</h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-surface rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-accent/20">
                  <div className="flex items-center justify-between p-5">
                    <span className="font-medium text-primary text-sm pr-4">{faq.q}</span>
                    <span className={`text-accent shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5 px-5" : "max-h-0"}`}>
                    <p className="text-sm text-muted leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-slate-800/95" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-4">
              롤테이너 구독 견적을 받아보세요
            </h2>
            <p className="text-white/60 text-lg mb-4">필요 수량과 규격을 알려주시면 24시간 내 맞춤 견적을 보내드립니다.</p>

            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 my-6 group">
              <span className="font-paperlogy text-3xl md:text-4xl font-bold text-white group-hover:text-accent-light transition-colors">{COMPANY.phone}</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent hover:bg-accent-light text-white font-bold transition-colors shadow-lg">
                견적 요청하기
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
