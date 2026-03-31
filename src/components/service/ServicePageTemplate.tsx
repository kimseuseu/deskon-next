"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ServiceData } from "@/data/services";

export default function ServicePageTemplate({ data }: { data: ServiceData }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        data-hero-dark
        className={`relative bg-gradient-to-br ${data.heroGradient} text-white pt-32 pb-20 px-6`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider mb-6">
              {data.categoryLabel}
            </span>
            <h1 className="font-paperlogy font-bold text-4xl md:text-6xl mb-6">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/support/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-all"
              >
                견적 문의
              </Link>
              <Link
                href="tel:010-9929-5363"
                className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                전화 상담
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-paperlogy font-bold text-3xl md:text-4xl mb-4">
              주요 특장점
            </h2>
            <p className="text-muted text-lg">왜 AOVO를 선택해야 할까요?</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-surface rounded-2xl p-8 hover:shadow-lg transition-all duration-500 group"
              >
                <span className="text-4xl mb-6 block">{feature.icon}</span>
                <h3 className="font-paperlogy font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-paperlogy font-bold text-3xl md:text-4xl mb-4">
              이용 절차
            </h2>
            <p className="text-muted text-lg">간단한 4단계로 시작하세요</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {data.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-paperlogy font-bold text-2xl text-accent">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-paperlogy font-bold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`relative bg-gradient-to-br ${data.heroGradient} text-white py-20 px-6`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-paperlogy font-bold text-3xl md:text-4xl mb-6">
            지금 바로 문의하세요
          </h2>
          <p className="text-white/70 text-lg mb-4">
            맞춤 견적을 24시간 내에 보내드립니다
          </p>

          {/* Phone number */}
          <a
            href="tel:010-9929-5363"
            className="inline-flex items-center gap-3 mb-10 group"
          >
            <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span className="font-paperlogy text-3xl md:text-4xl font-bold text-white group-hover:text-accent-light transition-colors">
              010-9929-5363
            </span>
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all"
            >
              견적 요청하기
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              상품 둘러보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
