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
const chairModels = [
  { name: "JNS-901 풀메쉬", image: "/images/chairs/jns-901.jpg", price: "월 65,000원", purchasePrice: "3,920,000원", spec: "풀메쉬 · 요추지지 · 알루미늄 베이스", tag: "PREMIUM" },
  { name: "JNS-801L", image: "/images/chairs/jns-801l.png", price: "월 45,000원", purchasePrice: "2,600,000원", spec: "가죽 시트 · 헤드레스트 · 임원용", tag: "BEST" },
  { name: "JNS-1018AFYK", image: "/images/chairs/jns-1018.jpg", price: "월 35,000원", purchasePrice: "1,400,000원", spec: "풀메쉬 · 싱크로틸트 · 4D 팔걸이", tag: "" },
  { name: "AKENT-A", image: "/images/chairs/akent-a.jpg", price: "월 27,500원", purchasePrice: "1,100,000원", spec: "천연가죽 · 심플 디자인 · 회의실", tag: "" },
  { name: "N831", image: "/images/chairs/n831.jpg", price: "월 25,000원", purchasePrice: "1,520,000원", spec: "회의용 · 스태킹 · 대량 도입 최적", tag: "" },
  { name: "JNS-501", image: "/images/chairs/jns-501.jpg", price: "월 15,000원", purchasePrice: "1,520,000원", spec: "메쉬 · 메모리폼 · 가성비 사무용", tag: "가성비" },
];

const benefits = [
  { icon: "💰", title: "초기 비용 ZERO", desc: "의자 구매에 수백만~수천만 원을 쓸 필요가 없습니다. 월정액으로 바로 시작하세요." },
  { icon: "🔧", title: "정기 관리 포함", desc: "가스 실린더, 휠, 베이스 등 소모품을 무상 점검·교체합니다. 항상 새것 같은 상태를 유지합니다." },
  { icon: "📊", title: "인원만큼만 비용", desc: "퇴사자 의자는 반납하고, 신입 의자는 추가합니다. 유휴 의자 보관 비용이 사라집니다." },
  { icon: "♻️", title: "감가상각 부담 제로", desc: "의자를 자산이 아닌 비용으로 처리합니다. 매년 떨어지는 자산가치를 걱정할 필요가 없습니다." },
];

const process = [
  { num: "01", title: "상담 신청", desc: "전화, 카카오톡, 웹으로 인원수와 필요 등급을 알려주세요.", icon: "📞" },
  { num: "02", title: "쇼룸 체험·선택", desc: "광명 쇼룸에서 직접 앉아보고 모델과 플랜을 선택합니다.", icon: "🪑" },
  { num: "03", title: "배송·설치", desc: "전문팀이 사무실로 방문하여 배송부터 설치까지 완료합니다.", icon: "🚛" },
  { num: "04", title: "정기 관리", desc: "플랜에 따라 정기 점검, 부품 교체, 세척 서비스를 제공합니다.", icon: "🔧" },
];

const faqs = [
  { q: "플랜 간 차이가 무엇인가요?", a: "STANDARD는 일반 사무용, BUSINESS는 인체공학 메쉬, EXECUTIVE는 프리미엄 패브릭, VIP는 최고급 가죽 의자입니다. 상위 플랜일수록 교체 주기가 짧고 A/S 범위가 넓어집니다." },
  { q: "부서마다 다른 플랜을 사용할 수 있나요?", a: "네, 가능합니다. 일반 직원은 BUSINESS, 임원은 EXECUTIVE/VIP 등 부서별로 다르게 구성할 수 있습니다." },
  { q: "최소 계약 기간은 어떻게 되나요?", a: "기본 12개월이며, 이후 월 단위 자동 연장됩니다. 해지는 1개월 전 통보로 가능합니다." },
  { q: "중간에 플랜 변경이 가능한가요?", a: "업그레이드는 계약 중간에도 가능하며, 다운그레이드는 갱신 시점에 변경할 수 있습니다." },
  { q: "의자가 고장나면 어떻게 하나요?", a: "BUSINESS 이상 플랜은 부품 무상 교체가 포함됩니다. 연락 주시면 48시간 내 대응합니다." },
];

/* ── Component ── */
export default function ChairSubscriptionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section data-hero-dark className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
        <Image src="/images/aovo-banner1.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-[1]" />

        <div className="relative z-10 min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left text */}
            <div>
              <Reveal>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
                  Chair Subscription
                </span>
              </Reveal>
              <Reveal delay={150}>
                <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  프리미엄 의자를<br />
                  <span className="text-accent-light">구독</span>하세요
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                  인체공학 설계의 사무용 의자를 구매 없이 월 구독으로 이용하세요.
                  직원 수 변동에 맞춰 수량을 자유롭게 조절하고,
                  정기 관리까지 포함됩니다.
                </p>
              </Reveal>
              <Reveal delay={450}>
                <div className="flex flex-wrap gap-4">
                  <a href="#plans" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-full px-8 py-4 transition-all shadow-lg shadow-accent/25">
                    구매 vs 구독 비교 <span>↓</span>
                  </a>
                  <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 border border-white/25 text-white font-medium rounded-full px-8 py-4 hover:bg-white/10 transition-all">
                    📞 {COMPANY.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: featured chair */}
            <Reveal delay={400} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/10 rounded-full blur-[80px]" />
                <Image src="/images/chairs/jns-801.png" alt="JNS-801" width={500} height={500} className="relative z-10 w-full h-auto object-contain drop-shadow-2xl" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ WHY SUBSCRIBE (Sticky Parallax) ═══ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left: sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Why Subscribe</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
                  왜 의자를<br /><span className="text-accent">구독</span>할까요?
                </h2>
                <p className="text-muted text-base leading-relaxed mb-8">
                  의자는 사무실에서 가장 빠르게 마모되는 자산입니다.
                  가스 실린더, 휠, 시트 쿠션이 노후되면 직원 건강과 업무 효율에 직접 영향을 줍니다.
                  구독하면 항상 최상의 상태를 유지할 수 있습니다.
                </p>
                <div className="p-5 bg-accent/5 border border-accent/15 rounded-xl">
                  <p className="text-sm text-primary font-medium">
                    💡 의자만 구독인 이유: 책상·파티션과 달리 의자는 소모품(가스·휠·베이스)의
                    마모가 빨라 정기적인 점검과 교체가 필수입니다.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: scrolling cards */}
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

      {/* ═══ CHAIR LINEUP (Sticky Parallax) ═══ */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left: scrolling chairs */}
            <div className="py-24 space-y-6">
              {chairModels.map((chair, i) => (
                <Reveal key={chair.name} delay={i * 80}>
                  <div className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center gap-6 p-6">
                      <div className="relative w-28 h-28 bg-white/5 rounded-xl flex-shrink-0 flex items-center justify-center">
                        <Image src={chair.image} alt={chair.name} width={100} height={100} className="object-contain group-hover:scale-105 transition-transform duration-500" />
                        {chair.tag && (
                          <span className="absolute top-1 right-1 text-[9px] font-bold uppercase bg-accent text-white px-1.5 py-0.5 rounded">{chair.tag}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-paperlogy text-lg font-bold text-white mb-1">{chair.name}</h3>
                        <p className="text-white/40 text-xs mb-2">{chair.spec}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-accent font-bold text-base">{chair.price}</span>
                          <span className="text-white/25 text-xs line-through">{chair.purchasePrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right: sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start py-24">
              <Reveal>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Chair Lineup</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white leading-snug mb-6">
                  검증된 프리미엄<br />의자 라인업
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  인체공학 메쉬부터 프리미엄 가죽까지,
                  직원 규모와 예산에 맞는 다양한 모델을 제공합니다.
                  광명 쇼룸에서 직접 체험하고 선택할 수 있습니다.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">✓</span>
                    모든 모델 쇼룸 체험 가능
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">✓</span>
                    부서별 다른 모델 조합 가능
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">✓</span>
                    10석 이상 기업 할인 적용
                  </div>
                </div>

                <a href="https://www.aovochair.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-10 text-accent hover:text-accent-light font-medium transition-colors">
                  aovochair.com에서 전체 제품 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON: 구매 vs 구독 ═══ */}
      <section id="plans" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Comparison</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">구매 vs 구독</h2>
              <p className="text-muted mt-3">50인 사무실 기준, JNS-1018AFYK 모델 비교</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-surface font-medium text-muted w-1/3">항목</th>
                    <th className="p-4 bg-surface font-medium text-muted">직접 구매</th>
                    <th className="p-4 bg-primary text-accent font-bold">AOVO 구독</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["초기 비용 (50석)", "7,000만원", "0원"],
                    ["월 비용", "0원 (감가상각 별도)", "월 1,750,000원"],
                    ["3년 총비용", "7,000만원 + 관리비", "약 6,300만원 (관리 포함)"],
                    ["인원 축소 시", "유휴 의자 창고 보관", "즉시 반납, 비용 절감"],
                    ["고장·파손", "자체 수리 (인력·비용)", "무상 교체"],
                    ["정기 관리", "없음 (자체 관리)", "3개월 정기 세척·점검"],
                    ["감가상각", "매년 자산가치 하락", "비용 처리, 부담 없음"],
                    ["퇴직자 의자", "폐기 비용 발생", "무상 수거"],
                  ].map(([label, buy, sub]) => (
                    <tr key={label} className="border-t border-gray-100">
                      <td className="p-4 font-medium text-primary bg-surface/50">{label}</td>
                      <td className="p-4 text-center text-muted">{buy}</td>
                      <td className="p-4 text-center font-bold text-accent bg-accent/5">{sub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 p-5 bg-primary text-white rounded-xl text-center text-sm leading-relaxed">
              <strong className="text-accent">핵심:</strong> 3년 사용 시 구독이 약 10% 저렴하면서, 정기 관리·무상 교체·즉시 반납까지 포함됩니다.
              <br />인원 변동이 잦을수록 구독의 비용 효율이 더 커집니다.
            </div>
          </Reveal>
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
                <div className="relative bg-white rounded-2xl p-8 text-center border border-gray-100 h-full">
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
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-surface rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-accent/20"
                >
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
        <Image src="/images/aovo-banner2.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-amber-800/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-4">
              지금 맞춤 견적을 받아보세요
            </h2>
            <p className="text-white/80 text-lg mb-4">인원수와 필요 등급만 알려주시면 24시간 내 견적을 보내드립니다.</p>

            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 my-6 group">
              <span className="font-paperlogy text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors">{COMPANY.phone}</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link href="/support/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg">
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
