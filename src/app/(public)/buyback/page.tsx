"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const steps = [
  { num: "01", title: "유통 문의", desc: "전화·카카오톡·웹으로 유통 희망 장비를 알려주세요.", icon: "📞" },
  { num: "02", title: "방문 견적", desc: "전문 감정사가 방문하여 장비 상태를 확인하고 유통가를 제안합니다.", icon: "📋" },
  { num: "03", title: "수거", desc: "합의된 일정에 전문팀이 방문하여 장비를 수거합니다.", icon: "🚛" },
  { num: "04", title: "정산", desc: "수거 완료 후 합의된 유통 대금을 신속히 정산합니다.", icon: "💰" },
];

const benefits = [
  { icon: "🏢", title: "공간 효율화", desc: "사용하지 않는 장비를 정리하여 사무 공간을 확보하세요." },
  { icon: "💵", title: "합리적 유통가", desc: "시장 시세에 기반한 투명하고 공정한 유통 가격을 제안합니다." },
  { icon: "🚚", title: "무료 방문 수거", desc: "별도 운반 비용 없이 전문팀이 직접 방문하여 수거합니다." },
  { icon: "⚡", title: "간편한 절차", desc: "문의부터 정산까지 빠르고 간편하게 진행됩니다." },
];

const categories = [
  { id: "furniture", name: "사무가구", desc: "책상, 의자, 파티션, 캐비넷, 소파 등 사무공간 가구 일체", emoji: "🪑", href: "/buyback/furniture" },
  { id: "logistics", name: "물류장비", desc: "롤테이너, 파렛트, 핸드카트, 스테커 등 물류 운반 장비", emoji: "📦", href: "/buyback/logistics" },
  { id: "event", name: "행사집기", desc: "연회 테이블, 의자, 조명, 음향장비 등 행사용 집기", emoji: "🎪", href: "/buyback/event" },
  { id: "commercial", name: "업소용집기", desc: "업소용 냉장고, 세척기, 인덕션 등 주방·매장 설비", emoji: "🍳", href: "/buyback/commercial" },
];

export default function BuybackLanding() {
  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-32 pb-20">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/15 text-accent-light border border-accent/20 mb-8">
            Buyback Service
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            보유 장비, 합리적으로 유통합니다
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10">
            사무실 이전, 인원 축소, 리모델링 등으로 처분이 필요한 장비를
            아오보 그룹이 적정 가격에 유통합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors shadow-lg shadow-accent/25">
              유통 문의하기
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
              📞 {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Process</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">유통 절차</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 h-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-2">{s.num}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-accent/30 text-xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Benefits</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">유통서비스의 장점</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-4xl mb-5">{b.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Categories</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">유통 가능 품목</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((c) => (
              <div key={c.id} id={c.id} className="scroll-mt-24">
                <Link href={c.href} className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{c.emoji}</div>
                  <h3 className="font-paperlogy text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{c.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{c.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-accent/70 group-hover:text-accent transition-colors">
                    자세히 보기 →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">장비 유통이 필요하신가요?</h2>
          <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-3 mt-4 mb-8 group">
            <span className="font-paperlogy text-3xl md:text-4xl font-bold text-white group-hover:text-accent-light transition-colors">{COMPANY.phone}</span>
          </a>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/contact" className="inline-flex items-center justify-center px-10 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-all">
              유통 문의하기
            </Link>
            <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
