"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const metrics = [
  { value: "2,500+", label: "거래 기업", suffix: "" },
  { value: "50,000+", label: "운영 장비", suffix: "" },
  { value: "98%", label: "고객 만족도", suffix: "" },
  { value: "10년+", label: "업력", suffix: "" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            About AOVO
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-6xl font-bold text-white mb-6">
            회사 소개
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed">
            산업용품의 구매부터 운영, 순환까지 &mdash; 기업이 본업에 집중할 수 있도록 돕습니다.
          </motion.p>
        </motion.div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">
              Our Vision
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-5xl font-bold text-primary mb-6">
              쓰는 만큼, 낭비 없이
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted text-lg leading-relaxed">
              AOVO는 산업용품을 소유가 아닌 운영의 관점에서 바라봅니다. 구독, 공유, 렌탈, 순환, 유통의 다섯 가지 서비스 모델을 통해 기업의 자산 운영 효율을 극대화하고, 불필요한 비용을 제거합니다.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
              >
                <div className="font-paperlogy text-3xl md:text-4xl font-bold text-accent mb-2">
                  {m.value}
                </div>
                <div className="text-sm text-muted">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Services</span>
            <h2 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary">
              5대 핵심 서비스
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <motion.div key={cat.slug} variants={fadeInUp}>
                <Link
                  href={`/${cat.slug}`}
                  className={`block rounded-2xl bg-gradient-to-br ${cat.color} p-8 text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                >
                  <h3 className="font-paperlogy text-xl font-bold mb-1">{cat.nameKo}</h3>
                  <p className="text-sm text-white/60">{cat.nameEn}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-amber-700">
        <motion.div
          className="max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-6">
            AOVO와 함께 시작하세요
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-10">
            최적의 산업용품 운영 방안을 제안해 드립니다.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-cream transition-colors shadow-lg"
            >
              문의하기
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 text-white/90 font-medium text-lg hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              {COMPANY.phone}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
