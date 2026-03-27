"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const milestones = [
  {
    year: "2015",
    title: "회사 설립",
    desc: "산업용품 유통 전문기업으로 출발. B2B 물류장비 공급 사업 개시.",
  },
  {
    year: "2016",
    title: "사무용 의자 구독 서비스 론칭",
    desc: "업계 최초 사무용 의자 구독 모델 도입. 중소기업 대상 월정액 의자 운영 서비스 시작.",
  },
  {
    year: "2018",
    title: "물류장비 사업 확장",
    desc: "롤테이너, 파랫트, 인테이너 등 물류장비 라인업 확대. 대형 유통사 납품 계약 체결.",
  },
  {
    year: "2020",
    title: "순환서비스 시작",
    desc: "중고 산업용품 매입-재정비-재공급 순환경제 모델 구축. ESG 경영 본격화.",
  },
  {
    year: "2022",
    title: "공유서비스 플랫폼 오픈",
    desc: "카트, 스테커 등 공유장비 운영 플랫폼 론칭. 행사장비 공유 서비스 확대.",
  },
  {
    year: "2024",
    title: "도소매/유통 사업 개시",
    desc: "B2B 전용 도소매 유통 채널 오픈. 주방집기, 의료집기 등 카테고리 다각화.",
  },
  {
    year: "2025",
    title: "산업용품 통합 플랫폼 리뉴얼",
    desc: "구독 · 공유 · 렌탈 · 순환 · 유통 5대 서비스 통합 플랫폼 AOVO 브랜드로 리뉴얼 오픈.",
  },
];

export default function HistoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            History
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            회사 연혁
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            AOVO가 걸어온 길, 그리고 앞으로 나아갈 방향
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    variants={fadeInUp}
                    className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                        <span className="font-paperlogy text-2xl font-bold text-accent">{m.year}</span>
                        <h3 className="font-paperlogy text-lg font-bold text-primary mt-2 mb-2">{m.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-cream z-10" />

                    {/* Spacer */}
                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
