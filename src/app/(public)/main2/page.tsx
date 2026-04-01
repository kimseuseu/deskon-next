"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/constants";

/* ── Scroll Reveal Hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── CountUp ── */
function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const s = performance.now();
          const dur = 2000;
          const animate = (now: number) => {
            const p = Math.min((now - s) / dur, 1);
            setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

/* ── Form ── */
function InquiryForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "", agree: false });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree || !form.name || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, inquiry_type: "웹사이트 문의" }),
      });
      setDone(true);
    } catch { alert("전송에 실패했습니다."); }
    finally { setSubmitting(false); }
  }, [form]);

  if (done) return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">✓</div>
      <h3 className="font-paperlogy text-2xl font-bold text-primary mb-2">문의가 접수되었습니다</h3>
      <p className="text-muted">담당자가 빠른 시일 내 연락드리겠습니다.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="이름 / 담당자명 *" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3.5 bg-surface border border-gray-200 rounded-lg text-sm outline-none focus:border-accent transition-colors" />
        <input type="text" placeholder="회사명" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="w-full px-4 py-3.5 bg-surface border border-gray-200 rounded-lg text-sm outline-none focus:border-accent transition-colors" />
      </div>
      <input type="tel" placeholder="연락처 *" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3.5 bg-surface border border-gray-200 rounded-lg text-sm outline-none focus:border-accent transition-colors" />
      <textarea placeholder="문의 내용 (선택)" rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3.5 bg-surface border border-gray-200 rounded-lg text-sm outline-none focus:border-accent transition-colors resize-none" />
      <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
        <input type="checkbox" checked={form.agree} onChange={e => setForm(p => ({ ...p, agree: e.target.checked }))} className="accent-accent" />
        개인정보 수집 및 이용에 동의합니다
      </label>
      <button type="submit" disabled={submitting || !form.agree} className="w-full py-4 bg-accent hover:bg-accent-light disabled:opacity-50 text-white font-bold rounded-lg transition-colors text-base">
        {submitting ? "전송 중..." : "무료 상담 신청하기"}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Main2Page() {
  return (
    <div className="bg-white">

      {/* ═══ 1. HERO ═══ */}
      <section data-hero-dark className="relative overflow-hidden" style={{ minHeight: "100dvh" }}>
        <Image src="/images/aovo-banner1.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-[1]" />

        <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 pt-20">
          <Reveal>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase bg-white/10 text-white/70 border border-white/15 mb-8">
              산업용품 통합 운영 플랫폼
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-paperlogy text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              자리가 비면,<br />
              <span className="text-accent-light">비용도 멈춥니다.</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              인원변화에 반응하는 자산 관리 서비스.<br className="hidden md:block" />
              구독 · 공유 · 렌탈 · 순환 · 매입, 하나의 플랫폼에서.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inquiry" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent-light transition-all shadow-lg shadow-accent/25 text-base">
                무료 상담 신청
              </a>
              <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-white/25 text-white font-medium hover:bg-white/10 transition-all">
                📞 {COMPANY.phone}
              </a>
            </div>
          </Reveal>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest">
            <span>SCROLL</span>
            <div className="w-px h-8 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-accent animate-bounce" style={{ animationDuration: "2s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. TRUST METRICS ═══ */}
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { target: 2500, suffix: "+", label: "누적 거래 기업" },
                { target: 50000, suffix: "+", label: "운영 장비 수" },
                { target: 98, suffix: "%", label: "고객 만족도" },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-paperlogy text-4xl md:text-5xl font-bold text-accent-light">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="text-white/40 text-sm mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3. PROBLEM ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">The Problem</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-8">
              이런 고민, 하고 계시지 않나요?
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: "💸", title: "초기 비용 부담", desc: "사무가구, 물류장비 구매에 수천만 원.\n써보지도 않고 큰돈을 묶어야 합니다." },
              { icon: "📦", title: "유휴 장비 보관", desc: "인원이 줄면 남는 장비는 창고에.\n공간도 비용도 낭비됩니다." },
              { icon: "🔧", title: "관리 인력 부담", desc: "고장, 교체, 폐기까지\n관리에 별도 인력이 필요합니다." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 150}>
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-8 text-center h-full">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. SOLUTION INTRO ═══ */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">The Solution</span>
            <h2 className="font-paperlogy text-3xl md:text-5xl font-bold leading-snug mb-6">
              사지 마세요.<br /><span className="text-accent-light">운영하세요.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              AOVO는 산업용품을 소유하지 않고 운영할 수 있게 합니다.<br />
              필요할 때 배치하고, 필요 없을 때 반납하세요. 비용은 쓴 만큼만.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {[
                { num: "01", title: "초기 비용 ZERO", desc: "구매 없이 월정액으로 시작" },
                { num: "02", title: "인원만큼만 비용", desc: "늘리고 줄이는 건 자유" },
                { num: "03", title: "관리까지 전담", desc: "배송·설치·유지보수·수거" },
              ].map(item => (
                <div key={item.num} className="bg-white/5 backdrop-blur p-10 text-center">
                  <div className="font-paperlogy text-3xl font-bold text-accent/30 mb-3">{item.num}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. SERVICES ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">5 Services</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
                5대 서비스로 통합 운영
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              { icon: "🔄", badge: "월정액", title: "구독서비스", desc: "롤테이너, 파랫트, 의자, 냉난방기 등을 월정액으로 사용합니다. 유휴 시 반납하면 과금이 즉시 중지됩니다.", href: "/subscribe", color: "border-l-blue-500" },
              { icon: "🤝", badge: "QR 공유", title: "공유서비스", desc: "QR 코드 스캔으로 즉시 대여·반납. 시간/일/주 단위 유연한 요금제로 전국 공유 스테이션에서 이용 가능합니다.", href: "/sharing", color: "border-l-emerald-500" },
              { icon: "🚚", badge: "기간 렌탈", title: "렌탈서비스", desc: "사무가구, IT기기, 의료장비 등 1개월~36개월 자유 계약. 설치·철거·유지보수까지 전담팀이 운영합니다.", href: "/rental", color: "border-l-violet-500" },
              { icon: "♻️", badge: "재정비", title: "순환서비스", desc: "전문 재정비를 거쳐 검증된 품질의 장비를 합리적 가격으로 제공합니다. 3단계 품질 검수를 통과한 장비만 공급합니다.", href: "/recycle", color: "border-l-amber-500" },
              { icon: "📋", badge: "자산 정리", title: "매입서비스", desc: "사무실 이전·축소 시 보유 장비를 합리적 가격으로 매입합니다. 무료 방문 수거, 간편 정산으로 공간을 효율화하세요.", href: "/buyback", color: "border-l-slate-500" },
            ].map((svc, i) => (
              <Reveal key={svc.title} delay={i * 100}>
                <Link href={svc.href} className={`group flex items-start gap-6 p-8 bg-surface border border-gray-100 border-l-4 ${svc.color} rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300`}>
                  <div className="text-4xl shrink-0 group-hover:scale-110 transition-transform">{svc.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded">{svc.badge}</span>
                      <h3 className="font-paperlogy text-xl font-bold text-primary group-hover:text-accent transition-colors">{svc.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="text-accent/30 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CHAIR SHOWCASE ═══ */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Chair Subscription</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold">프리미엄 의자 구독</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">인체공학 사무용 의자를 월정액으로. 3개월 정기 관리 포함.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "JNS-801", price: "월 29,000원~", image: "/images/chairs/jns-801.png", tag: "BEST" },
              { name: "JNS-1018", price: "월 25,000원~", image: "/images/chairs/jns-1018.jpg", tag: "" },
              { name: "JNS-901", price: "월 19,000원~", image: "/images/chairs/jns-901.jpg", tag: "" },
              { name: "JNS-501", price: "월 15,000원~", image: "/images/chairs/jns-501.jpg", tag: "가성비" },
            ].map((chair, i) => (
              <Reveal key={chair.name} delay={i * 100}>
                <Link href="/subscribe#chair" className="group block bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:border-accent/40 transition-all">
                  <div className="relative aspect-square bg-white/5 flex items-center justify-center p-4">
                    <Image src={chair.image} alt={chair.name} width={200} height={200} className="object-contain group-hover:scale-105 transition-transform duration-500" />
                    {chair.tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-accent text-white px-2 py-0.5 rounded">{chair.tag}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-paperlogy text-base font-bold text-white">{chair.name}</h4>
                    <p className="text-accent text-sm font-medium mt-1">{chair.price}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center mt-12">
              <Link href="/subscribe/chair" className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors">
                의자 전체 라인업 보기
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 7. COMPARISON ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Comparison</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
                구매 vs AOVO 구독
              </h2>
              <p className="text-muted mt-3">50인 사무실 기준 비교</p>
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
                    ["초기 비용", "약 5,000만원", "0원"],
                    ["인원 축소 시", "유휴 장비 보관", "즉시 반납·비용 절감"],
                    ["유지보수", "자체 관리 (인력·비용)", "전담팀 무상 관리"],
                    ["감가상각", "매년 자산가치 하락", "비용 처리, 부담 없음"],
                    ["폐기 처리", "폐기 비용 발생", "무상 수거"],
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
            <div className="mt-8 p-5 bg-primary text-white rounded-xl text-center text-sm">
              <strong className="text-accent">핵심:</strong> 인원 변동이 잦은 기업일수록 구독이 유리합니다. 초기 부담 없이 시작하세요.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 8. PROCESS ═══ */}
      <section className="py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Process</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">간단한 4단계로 시작</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "📞", title: "문의·상담", desc: "전화, 카카오톡, 웹으로 편하게" },
              { num: "02", icon: "📋", title: "견적·계약", desc: "맞춤 견적 24시간 내 제공" },
              { num: "03", icon: "🚛", title: "배송·설치", desc: "현장 배송 및 설치 완료" },
              { num: "04", icon: "🔧", title: "운영·관리", desc: "전담팀 유지보수 및 점검" },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="relative bg-white rounded-2xl p-8 text-center border border-gray-100 h-full">
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div className="font-paperlogy text-3xl font-bold text-accent/15 mb-2">{step.num}</div>
                  <h3 className="font-paperlogy text-base font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-xs text-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. WAREHOUSE ═══ */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Logistics Network</span>
              <h2 className="font-paperlogy text-3xl md:text-4xl font-bold">전국 물류 거점 운영</h2>
              <p className="text-white/40 mt-3">수도권 당일, 전국 익일 배송</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { name: "수도권", sub: "서울·경기·인천" },
                { name: "충청권", sub: "대전·세종·충남북" },
                { name: "영남권", sub: "부산·대구·경남북" },
                { name: "호남권", sub: "광주·전남북" },
                { name: "강원·제주", sub: "강원·제주" },
              ].map(w => (
                <div key={w.name} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <h4 className="font-paperlogy text-base font-bold text-white mb-1">{w.name}</h4>
                  <p className="text-xs text-white/40">{w.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {[
                { val: "8+", label: "전국 물류거점" },
                { val: "당일/익일", label: "배송" },
                { val: "무료", label: "수거·반납" },
              ].map(s => (
                <div key={s.label} className="bg-white/5 rounded-xl p-5">
                  <div className="font-paperlogy text-xl font-bold text-accent">{s.val}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 10. CTA + INQUIRY FORM ═══ */}
      <section id="inquiry" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: messaging */}
            <Reveal>
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Contact Us</span>
                <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary leading-snug mb-6">
                  맞춤 견적을<br />받아보세요
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  전문 상담사가 귀사의 인원수와 공간에 맞는 최적의 운영 방안을 제안합니다.
                  문의부터 배치까지 평균 3영업일 내 완료됩니다.
                </p>

                <div className="space-y-4 mb-8">
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                    <div>
                      <div className="font-paperlogy text-2xl font-bold text-primary group-hover:text-accent transition-colors">{COMPANY.phone}</div>
                      <div className="text-xs text-muted">평일 09:00 - 18:00</div>
                    </div>
                  </a>

                  <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-primary group-hover:text-accent transition-colors">카카오톡 상담</div>
                      <div className="text-xs text-muted">실시간 채팅 상담</div>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={200}>
              <div className="bg-surface rounded-2xl p-8 border border-gray-100">
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-6">무료 상담 신청</h3>
                <InquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
