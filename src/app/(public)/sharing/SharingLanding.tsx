"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const appSteps = [
  { num: "01", icon: "📱", title: "앱 다운로드", desc: "에이플로우 앱을 설치하고 간편 가입합니다." },
  { num: "02", icon: "📷", title: "QR 스캔", desc: "장비에 부착된 QR 코드를 스캔합니다." },
  { num: "03", icon: "✅", title: "대여 시작", desc: "요금제를 선택하면 바로 사용할 수 있습니다." },
  { num: "04", icon: "🔄", title: "반납", desc: "스테이션에 반납하면 자동으로 과금이 종료됩니다." },
];

const features = [
  { icon: "📷", title: "QR 즉시 대여", desc: "QR 코드 스캔 한 번으로 대여 절차 완료. 별도 서류나 대기 없이 바로 사용하세요." },
  { icon: "👥", title: "그룹 대여", desc: "그룹 QR 하나로 여러 장비를 한꺼번에 대여. 물류 현장에서 팀 단위 운영이 편리합니다." },
  { icon: "📍", title: "GPS 스테이션 탐색", desc: "현재 위치에서 가까운 장비 스테이션을 지도에서 바로 확인할 수 있습니다." },
  { icon: "⏱️", title: "실시간 요금 계산", desc: "사용 시간과 현재 요금을 실시간으로 확인. 예상치 못한 추가 요금이 없습니다." },
  { icon: "⭐", title: "등급별 할인", desc: "사용량에 따라 Green → Silver → Gold 등급 자동 승급, 최대 10% 할인 혜택." },
  { icon: "💳", title: "간편 결제", desc: "앱 내 카드 결제로 별도 정산 없이 자동 결제됩니다." },
];

const equipment = [
  { name: "롤테이너", desc: "물류센터·창고 단기 운용", href: "/sharing/rolltainer", emoji: "📦" },
  { name: "카트", desc: "운반용 카트 시간 단위 대여", href: "/sharing/cart", emoji: "🛒" },
  { name: "공항카트", desc: "공항·터미널 여객용 카트", href: "/sharing/airport-cart", emoji: "✈️" },
  { name: "계단카트", desc: "계단 운반 전용 전동카트", href: "/sharing/stair-cart", emoji: "🪜" },
  { name: "스테커", desc: "적재·하역용 전동 스테커", href: "/sharing/stacker", emoji: "🏗️" },
  { name: "행사장장비", desc: "전시·행사 현장 단기 장비", href: "/sharing/event", emoji: "🎪" },
];

const pricing = [
  { plan: "시간제", price: "5,000원~", unit: "/ 시간", desc: "30분 단위 과금, 짧은 작업에 최적" },
  { plan: "일일제", price: "30,000원~", unit: "/ 일", desc: "8시간 기준, 하루 단위 작업에 경제적" },
  { plan: "주간제", price: "150,000원~", unit: "/ 주", desc: "장기 프로젝트에 가장 합리적" },
];

export default function SharingLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d3b2e] to-[#1a6b4a] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent rounded-full blur-[100px]" />
        </div>
        <motion.div
          className="max-w-6xl mx-auto px-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm text-emerald-300 font-medium mb-6">
            SHARING · 에이플로우
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            QR 스캔 한 번으로<br />
            <span className="text-emerald-300">장비 공유</span> 시작
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            에이플로우 앱으로 물류장비를 공유하세요. QR 코드를 스캔하면 바로 대여,
            반납하면 자동 정산. 시간·일·주 단위로 유연하게 운영합니다.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link href="/support/contact" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-400 transition-all">
              도입 문의하기
            </Link>
            <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              카카오톡 상담
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* App Flow */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">에이플로우 APP</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-4">이렇게 사용합니다</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted max-w-xl mx-auto">스마트폰 하나면 장비 대여부터 반납까지 모두 해결됩니다</motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {appSteps.map((step, i) => (
              <motion.div key={step.num} variants={fadeInUp} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-emerald-600 mb-2">{step.num}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
                {i < appSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-emerald-300 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">FEATURES</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">에이플로우의 핵심 기능</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeInUp} className="bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">PRICING</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-4">유연한 요금제</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted">장비 종류와 사용 기간에 따라 요금이 달라집니다</motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {pricing.map((p) => (
              <motion.div key={p.plan} variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-xl hover:border-emerald-200 transition-all">
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-4">{p.plan}</h3>
                <div className="mb-4">
                  <span className="font-paperlogy text-3xl font-bold text-emerald-600">{p.price}</span>
                  <span className="text-sm text-muted ml-1">{p.unit}</span>
                </div>
                <p className="text-sm text-muted">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">EQUIPMENT</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">공유 가능 장비</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {equipment.map((e) => (
              <motion.div key={e.href} variants={fadeInUp}>
                <Link href={e.href} className="group block bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{e.emoji}</span>
                  <h3 className="font-paperlogy text-xl font-bold text-primary mb-2 group-hover:text-emerald-600 transition-colors">{e.name}</h3>
                  <p className="text-sm text-muted mb-4">{e.desc}</p>
                  <span className="inline-flex items-center text-sm text-emerald-600 font-medium">
                    자세히 보기 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">공유서비스 도입을 상담하세요</h2>
          <p className="text-lg opacity-90 mb-8">귀사 시설에 맞는 스테이션 구축부터 운영까지 함께합니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support/contact" className="px-8 py-4 bg-white text-emerald-700 rounded-full font-bold hover:bg-gray-100 transition-colors">
              도입 상담하기
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-full font-bold hover:bg-white/30 transition-colors">
              📞 {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
