"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const steps = [
  { num: "01", icon: "📞", title: "문의", desc: "필요한 장비 종류, 수량, 기간을 상담합니다." },
  { num: "02", icon: "📋", title: "견적", desc: "현장 조건에 맞는 맞춤 견적서를 제안합니다." },
  { num: "03", icon: "🔧", title: "설치", desc: "전문 기사가 현장에 장비를 배송·설치합니다." },
  { num: "04", icon: "🛡️", title: "관리", desc: "사용 중 유지보수와 교체를 지원합니다." },
  { num: "05", icon: "🚚", title: "회수", desc: "계약 종료 시 장비를 철거·회수합니다." },
];

const benefits = [
  { icon: "🔧", title: "전문 설치·유지보수", desc: "배송, 설치, 고장 수리까지 전담 기사가 원스톱 관리합니다." },
  { icon: "📅", title: "프로젝트 단위 계약", desc: "1개월부터 수년까지, 프로젝트 일정에 맞춰 유연하게 계약합니다." },
  { icon: "💰", title: "초기 투자 불필요", desc: "구매 대비 90% 이상 초기 비용을 절감할 수 있습니다." },
  { icon: "🔄", title: "최신 장비 교체", desc: "계약 갱신 시 최신 모델로 교체하여 항상 최적의 환경을 유지합니다." },
];

const equipment = [
  { name: "사무가구/기기", desc: "책상, 의자, 파티션, 복합기 등", href: "/rental/furniture", emoji: "🪑" },
  { name: "주방집기", desc: "업소용 냉장고, 세척기, 인덕션", href: "/rental/kitchen", emoji: "🍳" },
  { name: "행사집기", desc: "전시·행사·선거 사무실 장비", href: "/rental/event", emoji: "🎪" },
  { name: "IT기기/로봇", desc: "노트북, 모니터, 서비스 로봇", href: "/rental/it", emoji: "💻" },
  { name: "의료장비", desc: "병원침대, 휠체어, 산소농축기", href: "/rental/medical", emoji: "🏥" },
  { name: "이동식에어컨", desc: "산업용 이동식 냉방기", href: "/rental/aircon", emoji: "❄️" },
  { name: "산업용제습기", desc: "대용량 산업용 제습기", href: "/rental/dehumidifier", emoji: "💧" },
];

export default function RentalLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2c1810] to-[#5a3a28] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-violet-400 rounded-full blur-[120px]" />
        </div>
        <motion.div className="max-w-6xl mx-auto px-6 relative z-10" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm text-amber-300 font-medium mb-6">
            RENTAL
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            필요한 기간만큼<br />
            <span className="text-amber-300">맞춤 렌탈</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            프로젝트, 시즌, 행사에 맞춰 장비를 렌탈하세요.
            설치부터 유지보수, 회수까지 전 과정을 아오보 그룹이 관리합니다.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link href="/support/contact" className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-all">
              렌탈 견적 요청
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              📞 전화 상담
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">PROCESS</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">렌탈 진행 절차</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeInUp} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-amber-50 rounded-xl flex items-center justify-center text-2xl relative z-10">{step.icon}</div>
                {/* Connecting line between steps */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-8 left-[calc(50%+2rem)] h-0.5 bg-accent/20 origin-left"
                    style={{ width: "calc(100% - 4rem)" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.6, ease: "easeOut" }}
                  />
                )}
                <div className="text-xs font-bold text-accent mb-1">{step.num}</div>
                <h3 className="font-paperlogy text-lg font-bold text-primary mb-1">{step.title}</h3>
                <p className="text-xs text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">BENEFITS</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">렌탈의 장점</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeInUp} className="group bg-surface rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-4 block group-hover:animate-[attentionBounce_0.5s_ease-out]">{b.icon}</span>
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
            <motion.p variants={fadeInUp} className="text-sm font-semibold tracking-widest text-accent mb-3">EQUIPMENT</motion.p>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">렌탈 가능 장비</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {equipment.map((e) => (
              <motion.div key={e.href} id={e.href.split("/").pop() || ""} className="scroll-mt-24" variants={scaleIn}>
                <Link href={e.href} className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
                  <span className="text-4xl mb-4 block group-hover:animate-[attentionBounce_0.5s_ease-out]">{e.emoji}</span>
                  <h3 className="font-paperlogy text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{e.name}</h3>
                  <p className="text-sm text-muted mb-4">{e.desc}</p>
                  <span className="inline-flex items-center text-sm text-accent font-medium">
                    자세히 보기 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-paperlogy text-3xl md:text-4xl font-bold mb-4">맞춤 렌탈 견적을 받아보세요</h2>
          <p className="text-lg opacity-90 mb-8">전문 상담사가 프로젝트에 최적화된 장비 구성을 제안합니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="px-8 py-4 bg-white text-accent rounded-full font-bold hover:bg-gray-100 transition-colors">
              견적 요청하기
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
