"use client";

import Link from "next/link";
import Image from "next/image";

export default function RecycleChairPage() {
  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <Image src="/images/certa.webp" alt="CERTA 자산연대 서비스" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            CERTA Renewal
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-5 max-w-xl">
            체어 자산연대 서비스<br />(세르타)
          </h1>
          <p className="text-white/70 text-lg max-w-lg mb-10">
            전문 재정비를 거친 검증된 품질의 의자를 합리적 가격으로 다시 만나보세요.
            ESG 경영에 기여하고, 비용을 절감하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.aovochair.com/certa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-full px-8 py-4 transition-colors shadow-lg"
            >
              CERTA 서비스 자세히 보기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center border border-white/30 text-white hover:bg-white/10 font-medium rounded-full px-8 py-4 transition-colors"
            >
              수거 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Process</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">자산연대 프로세스</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "수거 신청", desc: "사용 완료된 의자의 수거를 신청합니다" },
              { step: "02", title: "방문 수거", desc: "전문팀이 직접 방문하여 의자를 수거합니다" },
              { step: "03", title: "3단계 정비", desc: "분해·세척·소독·부품 교체·품질 검수" },
              { step: "04", title: "자산연대 완료", desc: "재정비된 의자를 새 고객에게 배치합니다" },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-3">{s.step}</div>
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-paperlogy text-3xl font-bold text-primary">자산연대 서비스의 가치</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✅", title: "검증된 품질 보증", desc: "전문 재정비를 거쳐 검증된 품질의 의자만 제공합니다. ESG 보고서에 활용 가능한 인증서를 발급해 드립니다." },
              { icon: "💰", title: "합리적 가격", desc: "전문 재정비를 거친 프리미엄 의자를 합리적인 가격으로 만나보세요. 새 제품 대비 비용을 절감할 수 있습니다." },
              { icon: "🔧", title: "전문 재정비 리포트", desc: "재정비 과정, 부품 교체 내역, 품질 검수 결과 등 상세 리포트를 제공합니다." },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl mb-5">{b.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-amber-700/90" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl font-bold text-white mb-5">
            의자 자산연대 서비스가 궁금하신가요?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            aovochair.com에서 CERTA 자산연대 서비스를 자세히 확인하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.aovochair.com/certa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg"
            >
              aovochair.com/certa
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              수거 문의
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
