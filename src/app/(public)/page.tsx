"use client";

import Link from "next/link";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

const stats = [
  { value: "2,500+", label: "거래 기업" },
  { value: "50,000+", label: "운영 장비" },
  { value: "98%", label: "만족도" },
];

const serviceCards = [
  ...SERVICE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    title: cat.nameKo,
    subtitle: cat.nameEn,
    color: cat.color,
    href: `/${cat.slug}`,
  })),
  {
    slug: "products",
    title: "상품 카탈로그",
    subtitle: "Product Catalog",
    color: "from-accent to-amber-700",
    href: "/products",
  },
];

const serviceIcons: Record<string, string> = {
  subscribe: "🔄",
  sharing: "🤝",
  rental: "🚚",
  recycle: "♻️",
  wholesale: "🏭",
  products: "📦",
};

const valueProps = [
  {
    icon: "💰",
    title: "쓴 만큼만 비용",
    desc: "사용한 기간과 수량만큼만 비용을 지불합니다. 유휴 장비 보관 비용, 감가상각 부담이 사라집니다.",
  },
  {
    icon: "👥",
    title: "인원 변동 대응",
    desc: "사업 규모에 맞춰 장비 수량을 자유롭게 조절하세요. 확장과 축소 모두 유연하게 대응합니다.",
  },
  {
    icon: "⚡",
    title: "휴지기 비용 제로",
    desc: "비수기나 휴지기에는 장비를 반납하면 됩니다. 쓰지 않는 기간에는 비용이 발생하지 않습니다.",
  },
];

const processSteps = [
  { step: "01", title: "문의", desc: "전화, 카카오톡, 웹 문의" },
  { step: "02", title: "견적", desc: "맞춤 견적서 제안" },
  { step: "03", title: "배치", desc: "현장 배송 및 설치" },
  { step: "04", title: "관리", desc: "유지보수 및 교체" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-8">
            산업용품 통합 운영 플랫폼
          </span>

          <h1 className="font-paperlogy text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            쓸 때만 비용을 내세요
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            구독 &middot; 공유 &middot; 렌탈 &middot; 순환 &middot; 유통 —
            산업용품을 가장 효율적으로 운영하는 방법
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mb-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-paperlogy text-3xl md:text-4xl font-bold text-accent-light">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent-light transition-colors duration-300 shadow-lg shadow-accent/25"
            >
              맞춤 견적 받기
            </Link>
            <Link
              href="/subscribe/rolltainer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-colors duration-300"
            >
              서비스 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Categories ── */}
      <section className="py-24 bg-cream">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Services
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              서비스 카테고리
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <Link
                key={card.slug}
                href={card.href}
                className={`group block relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-8 min-h-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{serviceIcons[card.slug]}</div>
                  <h3 className="font-paperlogy text-xl font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">{card.subtitle}</p>
                  <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    자세히 보기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Proposition ── */}
      <section className="py-24 bg-surface">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Why AOVO
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              사두면 남고, 빌리면 딱
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 bg-cream">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Process
            </span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              이용 절차
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/30 transition-colors duration-300">
                  <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-accent/30 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-gradient-to-r from-accent to-amber-700 overflow-hidden">
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-6">
            지금 맞춤 견적을 받아보세요
          </h2>
          <p className="text-white/80 text-lg mb-10">
            전문 상담사가 귀사에 최적화된 운영 방안을 제안해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary font-bold text-base hover:bg-cream transition-colors duration-300 shadow-lg"
            >
              문의하기
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 text-white/90 font-medium text-lg hover:text-white transition-colors"
            >
              📞 {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
