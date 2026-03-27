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

const circularSteps = [
  { num: "01", icon: "🚚", title: "수거", desc: "전국 어디든 사용 완료 장비를 수거합니다." },
  { num: "02", icon: "🔍", title: "검수", desc: "3단계 품질 검수로 재사용 가능 여부를 판정합니다." },
  { num: "03", icon: "♻️", title: "재생", desc: "세척, 수리, 부품 교체를 거쳐 장비를 재생합니다." },
  { num: "04", icon: "📦", title: "재배치", desc: "재생 장비는 재배치, 불가 장비는 친환경 폐기합니다." },
];

const benefits = [
  { icon: "🌱", title: "ESG 경영 지원", desc: "장비 순환 실적을 ESG 보고서에 반영할 수 있도록 데이터와 인증서를 제공합니다." },
  { icon: "💰", title: "자산 처분 비용 절감", desc: "폐기 비용 부담 없이 장비를 처분할 수 있습니다. 재생 가능 장비는 보상 매입합니다." },
  { icon: "📊", title: "환경 인증 지원", desc: "탄소 절감량 산출, 폐기물 감축 보고서 등 환경 인증에 필요한 자료를 지원합니다." },
  { icon: "🔬", title: "3단계 품질 검수", desc: "외관·기능·안전 3단계 검수를 거쳐 재생 장비의 품질을 보증합니다." },
];

const equipment = [
  { name: "체어(세르타)", desc: "프리미엄 의자 재생·리퍼비시", href: "/recycle/chair", emoji: "🪑" },
  { name: "물류장비", desc: "롤테이너, 파랫트 등 재생", href: "/recycle/logistics", emoji: "📦" },
  { name: "사무가구/기기", desc: "책상, 의자, 복합기 재활용", href: "/recycle/furniture", emoji: "🏢" },
  { name: "주방집기", desc: "업소용 주방장비 재생", href: "/recycle/kitchen", emoji: "🍳" },
  { name: "이동식에어컨", desc: "냉방기 정비·재배치", href: "/recycle/aircon", emoji: "❄️" },
  { name: "계절상품", desc: "시즌 종료 장비 보관·재배치", href: "/recycle/seasonal", emoji: "🌸" },
  { name: "산업용제습기", desc: "제습기 점검·재생", href: "/recycle/dehumidifier", emoji: "💧" },
  { name: "특수집기", desc: "특수 용도 장비 맞춤 처리", href: "/recycle/special", emoji: "⚙️" },
];

const stats = [
  { value: "15,000+", label: "연간 순환 장비 수" },
  { value: "92%", label: "재생률" },
  { value: "320톤", label: "연간 폐기물 감축" },
  { value: "100+", label: "ESG 인증 지원 기업" },
];

export default function RecycleLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a3a1a] to-[#2d6b2d] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-300 rounded-full blur-[100px]" />
        </div>
        <motion.div className="max-w-6xl mx-auto px-6 relative z-10" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm text-green-300 font-medium mb-6">
            RECYCLING · ESG
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            버리지 말고<br />
            <span className="text-green-300">순환</span>하세요
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            사용이 끝난 장비를 수거하고, 검수·재생을 거쳐 다시 현장에 배치합니다.
            ESG 경영과 비용 절감을 동시에 실현하세요.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link href="/support/contact" className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-400 transition-all">
              순환 서비스 문의
            </Link>
            <a href={COMPANY.kakaoChannel} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              카카오톡 상담
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp} className="text-center">
                <div className="font-paperlogy text-3xl md:text-4xl font-bold text-green-700 mb-1">{s.value}</div>
                <div className="text-sm text-muted">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Circular Process */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-green-700 mb-3">CIRCULAR PROCESS</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">순환 프로세스</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {circularSteps.map((step, i) => (
              <motion.div key={step.num} variants={fadeInUp} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-50 rounded-2xl flex items-center justify-center text-3xl">{step.icon}</div>
                <div className="text-xs font-bold text-green-600 mb-2">{step.num}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
                {i < circularSteps.length - 1 && <div className="hidden md:block absolute top-10 -right-4 text-green-300 text-2xl">→</div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-green-700 mb-3">BENEFITS</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">순환의 가치</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeInUp} className="bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-green-700 mb-3">EQUIPMENT</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">순환 대상 장비</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {equipment.map((e) => (
              <motion.div key={e.href} variants={fadeInUp}>
                <Link href={e.href} className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{e.emoji}</span>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-1 group-hover:text-green-700 transition-colors">{e.name}</h3>
                  <p className="text-xs text-muted mb-3">{e.desc}</p>
                  <span className="inline-flex items-center text-xs text-green-600 font-medium">
                    자세히 보기 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">장비 순환 서비스를 시작하세요</h2>
          <p className="text-lg opacity-90 mb-8">ESG 경영의 첫걸음, AOVO 순환서비스가 함께합니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support/contact" className="px-8 py-4 bg-white text-green-700 rounded-full font-bold hover:bg-gray-100 transition-colors">
              순환 서비스 문의
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
