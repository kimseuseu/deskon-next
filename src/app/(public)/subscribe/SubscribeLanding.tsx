"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

/* ── Animation variants ── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Data ── */
const steps = [
  {
    num: "01",
    title: "문의",
    desc: "전화·카카오톡·웹으로 필요 장비와 수량을 알려주세요.",
    icon: "📞",
  },
  {
    num: "02",
    title: "배치",
    desc: "견적 확정 후 현장까지 배송·설치를 완료합니다.",
    icon: "🚛",
  },
  {
    num: "03",
    title: "사용",
    desc: "월 구독료만 내고 자유롭게 사용하세요. 유지보수 포함.",
    icon: "✅",
  },
  {
    num: "04",
    title: "반납/확장",
    desc: "불필요 시 반납하면 과금 중지, 추가 필요 시 즉시 확장.",
    icon: "🔄",
  },
];

const benefits = [
  {
    icon: "💰",
    title: "비용 절감",
    desc: "초기 구매 비용 없이 월 정액으로 운영. 유휴 장비에 대한 감가상각 부담이 사라집니다.",
  },
  {
    icon: "📊",
    title: "유연한 수량 조절",
    desc: "사업 규모에 맞춰 장비 수량을 자유롭게 늘리거나 줄일 수 있습니다.",
  },
  {
    icon: "🔧",
    title: "유지보수 포함",
    desc: "파손·노후 장비는 무상으로 교체 및 수리. 별도 관리 인력이 필요 없습니다.",
  },
  {
    icon: "🏢",
    title: "자산 부담 제로",
    desc: "장비가 자산이 아닌 비용으로 처리되어 재무 효율이 높아집니다.",
  },
];

const products = [
  {
    slug: "chair",
    name: "사무용 의자",
    desc: "인체공학 메쉬, 가죽, 회의용 등 다양한 의자 라인업을 구독으로 이용하세요.",
    icon: "🪑",
    items: "JNS-801 · JNS-1018 · JNS-901 · JNS-501 · AKENT-A 외",
  },
  {
    slug: "rolltainer",
    name: "롤테이너",
    desc: "철제·메쉬·접이식 등 용도별 롤테이너를 필요한 수량만큼 구독합니다.",
    icon: "📦",
    items: "철제 롤테이너 · 메쉬 롤테이너 · 접이식 롤테이너 외",
  },
  {
    slug: "pallet",
    name: "파렛트",
    desc: "플라스틱·목재·철제 등 규격별 파렛트 구독 서비스.",
    icon: "🏗️",
    items: "PP-1200 · 목재 파렛트 · 철제 파렛트 외",
  },
  {
    slug: "intainer",
    name: "인테이너",
    desc: "산업용 접이식 컨테이너, 다양한 사이즈로 공간 효율을 극대화합니다.",
    icon: "📐",
    items: "대형 인테이너 · 중형 인테이너 · 소형 인테이너",
  },
  {
    slug: "movingbox",
    name: "이사바구니",
    desc: "이사·배송·정리에 최적화된 바구니를 시즌별로 구독합니다.",
    icon: "🧺",
    items: "대형 바구니 · 중형 바구니 · 소형 바구니",
  },
  {
    slug: "kitchen",
    name: "주방집기",
    desc: "급식·외식 현장에 필요한 업소용 주방 기물을 월 단위로 운영합니다.",
    icon: "🍳",
    items: "업소용 냉장고 · 식기세척기 · 인덕션 · 조리대 외",
  },
  {
    slug: "hvac",
    name: "냉난방기",
    desc: "계절 수요에 맞춘 냉난방 장비, 비수기엔 반납하여 비용을 절감합니다.",
    icon: "❄️",
    items: "이동식 에어컨 · 산업용 제습기 · 온풍기 외",
  },
];

/* ── Component ── */
export default function SubscribeLanding() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#2d3a4a]" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6"
          >
            Subscription Service
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="font-paperlogy text-4xl md:text-6xl font-bold text-white mb-6"
          >
            구독서비스
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            필요할 때 배치하고, 불필요할 때 반납하세요.
            <br />
            사용한 만큼만 비용을 지불하는 산업장비 월 구독 서비스입니다.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent-light transition-colors duration-300 shadow-lg shadow-accent/25"
            >
              구독 문의하기
            </Link>
            <Link
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-colors duration-300"
            >
              상품 보기 ↓
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block"
            >
              How it works
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-paperlogy text-3xl md:text-4xl font-bold text-primary"
            >
              이용 절차
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeInUp} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/30 transition-colors duration-300 h-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="font-paperlogy text-4xl font-bold text-accent/20 mb-2">
                    {s.num}
                  </div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-accent/30 text-xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="relative py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block"
            >
              Benefits
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-paperlogy text-3xl md:text-4xl font-bold text-primary"
            >
              구독서비스의 장점
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-6">{b.icon}</div>
                <h3 className="font-paperlogy text-xl font-bold text-primary mb-3">
                  {b.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section id="products" className="py-24 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block"
            >
              AOVO Group Business Subscription Service
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-paperlogy text-3xl md:text-4xl font-bold text-primary"
            >
              구독 서비스 라인업
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted mt-4 max-w-xl mx-auto"
            >
              각 카테고리를 클릭하면 제품 종류와 상세 정보를 확인할 수 있습니다.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {products.map((p) => (
              <motion.div key={p.slug} id={p.slug} className="scroll-mt-24" variants={fadeInUp}>
                <Link
                  href={`/subscribe/${p.slug}`}
                  className="group block bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-paperlogy text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {p.desc}
                  </p>
                  <p className="text-xs text-accent/60 leading-relaxed mb-4">
                    {p.items}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-accent/70 group-hover:text-accent transition-colors">
                    자세히 보기 →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-[#2d3a4a]/95" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-paperlogy text-3xl md:text-4xl font-bold text-white mb-6"
          >
            지금 구독을 시작하세요
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg mb-10 leading-relaxed"
          >
            귀사에 맞는 맞춤 구독 플랜을 제안해 드립니다.
            <br />
            부담 없이 문의해 주세요.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
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
              {COMPANY.phone}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
