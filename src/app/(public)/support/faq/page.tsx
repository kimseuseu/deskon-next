"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const faqs = [
  {
    q: "최소 계약 기간이 있나요?",
    a: "서비스 유형에 따라 다릅니다. 구독서비스는 최소 3개월, 렌탈서비스는 최소 1개월부터 이용 가능합니다. 공유서비스는 일 단위로도 이용할 수 있으며, 자세한 내용은 상담을 통해 안내드립니다.",
  },
  {
    q: "장비에 문제가 생기면 어떻게 하나요?",
    a: "AOVO는 모든 서비스에 유지보수 및 교체 서비스를 포함하고 있습니다. 장비 이상 발생 시 고객센터(02-2683-4459)로 연락 주시면, 담당 기사가 방문하여 점검 및 교체를 진행합니다. 긴급 상황 시 24시간 이내 대응을 원칙으로 합니다.",
  },
  {
    q: "전국 어디서나 서비스 이용이 가능한가요?",
    a: "수도권은 자체 물류망을 통해 직접 배송 및 설치가 가능하며, 지방 지역은 파트너 네트워크를 통해 서비스를 제공합니다. 일부 도서 산간 지역은 추가 배송비가 발생할 수 있으니, 문의 시 확인 부탁드립니다.",
  },
  {
    q: "견적은 어떻게 받을 수 있나요?",
    a: "웹사이트 문의 양식, 전화(02-2683-4459), 또는 카카오톡 채널을 통해 견적을 요청하실 수 있습니다. 필요한 장비 종류, 수량, 사용 기간을 알려주시면 맞춤 견적서를 발송해 드립니다. 보통 문의 후 1영업일 이내에 견적을 받아보실 수 있습니다.",
  },
  {
    q: "구독과 렌탈의 차이점은 무엇인가요?",
    a: "구독서비스는 월정액 기반으로 장비의 정기적 교체/관리가 포함된 장기 운영 모델입니다. 렌탈서비스는 특정 기간 동안 장비를 임차하는 모델로, 단기 프로젝트나 이벤트에 적합합니다. 자세한 차이점은 서비스 페이지에서 확인하실 수 있습니다.",
  },
  {
    q: "순환서비스(중고 장비)의 품질은 어떤가요?",
    a: "AOVO 순환서비스의 모든 제품은 전문 정비 과정을 거쳐 품질 검수를 완료한 제품만 공급됩니다. 외관 등급(A/B/C)을 명시하여 투명하게 제공하며, 기능적으로는 신품과 동일한 성능을 보장합니다.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-gray-100 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <span className="font-paperlogy text-lg font-bold text-accent/40 shrink-0">
            Q{index + 1}
          </span>
          <span className="text-sm font-medium text-primary leading-relaxed">
            {faq.q}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-muted shrink-0 mt-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pl-16">
              <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
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
            FAQ
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            자주 묻는 질문
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            궁금한 점을 빠르게 확인하세요
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          {/* Extra CTA */}
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <p className="text-muted mb-4">원하는 답변을 찾지 못하셨나요?</p>
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
            >
              직접 문의하기
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
