"use client";

import Link from "next/link";
import Image from "next/image";

const externalLinks = [
  {
    title: "의자 구독 서비스",
    desc: "인체공학 프리미엄 의자를 월정액으로 이용하세요. 3개월마다 전문 세척, 부품 교체 포함.",
    href: "https://www.aovochair.com/subscription",
    label: "구독 서비스 보기",
    icon: "🔄",
  },
  {
    title: "온라인 스토어",
    desc: "사무용 의자 직접 구매. 인체공학 메쉬, 가죽, 회의용 등 전 라인업.",
    href: "https://www.aovochair.com/shop",
    label: "스토어 바로가기",
    icon: "🛒",
  },
  {
    title: "쇼룸 방문 예약",
    desc: "경기도 광명 쇼룸에서 직접 체험하고 선택하세요. 전문 상담사가 안내합니다.",
    href: "https://www.aovochair.com/showroom",
    label: "쇼룸 예약하기",
    icon: "🏢",
  },
  {
    title: "기업 대량 구독",
    desc: "10석 이상 기업 고객 전용 할인. 맞춤 견적과 전담 매니저를 배정합니다.",
    href: "https://www.aovochair.com/business",
    label: "기업 문의하기",
    icon: "🏢",
  },
];

export default function ChairSubscribePage() {
  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
        <Image
          src="/images/aovo-ergo-side.png"
          alt="AOVO Chair"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            Chair Subscription
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-xl">
            프리미엄 의자<br />구독 서비스
          </h1>
          <p className="text-white/70 text-lg max-w-lg mb-10">
            인체공학 설계의 프리미엄 사무용 의자를 구매 없이 월 구독으로 이용하세요.
            직원 수 변동에 맞춰 수량을 자유롭게 조절할 수 있습니다.
          </p>
          <a
            href="https://www.aovochair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold rounded-full px-8 py-4 transition-colors shadow-lg"
          >
            aovochair.com 바로가기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Why AOVO Chair</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              왜 의자를 구독할까요?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "감가상각 부담 제로", desc: "매년 가치가 떨어지는 자산을 보유하지 않아도 됩니다. 월정액으로 항상 최상의 의자를 사용하세요.", icon: "💰" },
              { title: "3개월 정기 관리", desc: "전문 세척·소독, 부품 교체, 높이 조절 점검까지. 항상 새것 같은 상태를 유지합니다.", icon: "🔧" },
              { title: "자유로운 수량 조절", desc: "퇴사·입사에 맞춰 의자 수를 늘리거나 줄일 수 있습니다. 유휴 의자 보관 비용이 사라집니다.", icon: "📊" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* External links grid */}
          <div className="text-center mb-12">
            <h2 className="font-paperlogy text-2xl md:text-3xl font-bold text-primary">
              <span className="text-accent">aovochair.com</span>에서 자세히 알아보세요
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {externalLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-4">{link.icon}</div>
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{link.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all">
                  {link.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <Image src="/images/aovo-banner1.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-amber-700/90" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-5">
            의자 전문 사이트에서 확인하세요
          </h2>
          <p className="text-white/80 text-lg mb-10">
            구독 신청, 제품 상세, 쇼룸 예약, 기업 문의까지 모두 aovochair.com에서 가능합니다.
          </p>
          <a
            href="https://www.aovochair.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg text-lg"
          >
            aovochair.com 방문하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
