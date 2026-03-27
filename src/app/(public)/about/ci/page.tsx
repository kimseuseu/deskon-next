"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const brandColors = [
  { name: "Primary", hex: "#0a0a0f", desc: "브랜드의 신뢰감과 전문성을 상징합니다.", textLight: true },
  { name: "Accent", hex: "#b8977e", desc: "따뜻한 프리미엄 감성을 전달합니다.", textLight: true },
  { name: "Gold", hex: "#c8a96a", desc: "품격과 가치를 나타냅니다.", textLight: true },
  { name: "Cream", hex: "#fafaf8", desc: "깨끗하고 정돈된 배경을 제공합니다.", textLight: false },
];

const brandValues = [
  { title: "효율", desc: "불필요한 비용 없이, 꼭 필요한 만큼만" },
  { title: "신뢰", desc: "10년 이상의 산업용품 운영 노하우" },
  { title: "지속", desc: "순환경제를 통한 지속가능한 비즈니스" },
  { title: "혁신", desc: "소유에서 운영으로, 패러다임 전환" },
];

export default function CIPage() {
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
            Brand Identity
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            CI 소개
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            AOVO 브랜드의 시각적 아이덴티티를 소개합니다
          </motion.p>
        </motion.div>
      </section>

      {/* Symbol Mark */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Symbol Mark</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">심볼 마크</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[250px]">
              <Image
                src="/images/aovo_symbol.svg"
                alt="AOVO 심볼 마크"
                width={120}
                height={120}
                className="mb-4"
              />
              <p className="text-sm text-muted">Symbol Mark (SVG)</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[250px]">
              <Image
                src="/images/aovo_symbol.png"
                alt="AOVO 심볼 마크"
                width={120}
                height={120}
                className="mb-4"
              />
              <p className="text-sm text-muted">Symbol Mark (PNG)</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-primary rounded-2xl p-12 flex flex-col items-center justify-center min-h-[250px]">
              <Image
                src="/images/aovo_symbol2.png"
                alt="AOVO 심볼 마크 화이트"
                width={120}
                height={120}
                className="mb-4"
              />
              <p className="text-sm text-gray-500">Symbol Mark (Dark BG)</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Logo */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Logo</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">로고</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Color Logo */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[250px]">
              <Image
                src="/images/aovologo.png"
                alt="AOVO 로고 컬러"
                width={240}
                height={80}
                className="object-contain mb-4"
              />
              <p className="text-sm text-muted">Color Logo</p>
            </motion.div>
            {/* Black Logo on Light */}
            <motion.div variants={fadeInUp} className="bg-cream rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[250px]">
              <Image
                src="/images/aovologo_black.png"
                alt="AOVO 로고 블랙"
                width={240}
                height={80}
                className="object-contain mb-4"
              />
              <p className="text-sm text-muted">Black Logo (Light BG)</p>
            </motion.div>
            {/* White Logo on Dark */}
            <motion.div variants={fadeInUp} className="bg-primary rounded-2xl p-12 flex flex-col items-center justify-center min-h-[250px]">
              <Image
                src="/images/aovologo_white.png"
                alt="AOVO 로고 화이트"
                width={240}
                height={80}
                className="object-contain mb-4"
              />
              <p className="text-sm text-gray-500">White Logo (Dark BG)</p>
            </motion.div>
          </motion.div>

          {/* Text Logos */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[200px]">
              <Image
                src="/images/aovo_text.png"
                alt="AOVO 텍스트 로고"
                width={200}
                height={60}
                className="object-contain mb-4"
              />
              <p className="text-sm text-muted">Text Logo</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 min-h-[200px]">
              <Image
                src="/images/aovo_text_thin.png"
                alt="AOVO 텍스트 로고 (Thin)"
                width={200}
                height={60}
                className="object-contain mb-4"
              />
              <p className="text-sm text-muted">Text Logo (Thin)</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CI Examples */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">CI Application</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">CI 활용 예시</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[1, 2, 3].map((n) => (
              <motion.div key={n} variants={fadeInUp} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={`/images/ci${n}.png`}
                  alt={`AOVO CI 활용 예시 ${n}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Colors</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">브랜드 컬러</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {brandColors.map((color) => (
              <motion.div key={color.name} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div
                  className="h-32 flex items-end p-4"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`text-sm font-mono font-medium ${color.textLight ? "text-white/80" : "text-gray-500"}`}>
                    {color.hex}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-paperlogy font-bold text-primary mb-1">{color.name}</h3>
                  <p className="text-sm text-muted">{color.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Typography</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">타이포그래피</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-gray-100">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Primary Display</span>
              <h3 className="font-paperlogy text-5xl font-bold text-primary mb-4">Paperlogy</h3>
              <p className="font-paperlogy text-xl text-muted mb-2">산업용품 통합 운영 플랫폼</p>
              <p className="text-sm text-muted">헤드라인, 타이틀, 강조 텍스트에 사용됩니다.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 border border-gray-100">
              <span className="text-xs font-medium uppercase tracking-widest text-accent mb-4 block">Body Text</span>
              <h3 className="font-sans text-5xl font-bold text-primary mb-4">Noto Sans KR</h3>
              <p className="font-sans text-xl text-muted mb-2">본문 텍스트와 UI 요소에 활용됩니다.</p>
              <p className="text-sm text-muted">가독성을 최우선으로 선택된 서체입니다.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3 block">Values</span>
            <h2 className="font-paperlogy text-3xl font-bold text-primary">브랜드 가치</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {brandValues.map((val) => (
              <motion.div
                key={val.title}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-paperlogy text-xl font-bold text-accent mb-3">{val.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
