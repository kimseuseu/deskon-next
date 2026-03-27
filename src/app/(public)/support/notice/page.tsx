"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const notices = [
  {
    id: 1,
    category: "공지",
    title: "AOVO 통합 플랫폼 리뉴얼 오픈 안내",
    date: "2025-03-15",
    isNew: true,
  },
  {
    id: 2,
    category: "서비스",
    title: "구독서비스 신규 품목 추가 안내 (냉난방기, 주방집기)",
    date: "2025-03-10",
    isNew: true,
  },
  {
    id: 3,
    category: "공지",
    title: "2025년 설 연휴 배송 일정 안내",
    date: "2025-01-20",
    isNew: false,
  },
  {
    id: 4,
    category: "서비스",
    title: "공유서비스 행사장비 카테고리 확대 안내",
    date: "2024-12-15",
    isNew: false,
  },
  {
    id: 5,
    category: "공지",
    title: "개인정보처리방침 개정 안내",
    date: "2024-11-01",
    isNew: false,
  },
  {
    id: 6,
    category: "서비스",
    title: "도소매/유통 서비스 정식 오픈 안내",
    date: "2024-09-01",
    isNew: false,
  },
];

export default function NoticePage() {
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
            Notice
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            공지사항
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            AOVO의 최신 소식을 확인하세요
          </motion.p>
        </motion.div>
      </section>

      {/* Notice List */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-surface border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-muted">
                <div className="col-span-2">분류</div>
                <div className="col-span-7">제목</div>
                <div className="col-span-3 text-right">날짜</div>
              </div>

              {/* Rows */}
              {notices.map((notice) => (
                <motion.div
                  key={notice.id}
                  variants={fadeInUp}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-5 border-b border-gray-50 last:border-0 hover:bg-surface/50 transition-colors cursor-pointer group"
                >
                  <div className="sm:col-span-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      notice.category === "공지"
                        ? "bg-accent/10 text-accent"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {notice.category}
                    </span>
                  </div>
                  <div className="sm:col-span-7 flex items-center gap-2">
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                      {notice.title}
                    </span>
                    {notice.isNew && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none">
                        N
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-3 text-sm text-muted sm:text-right">
                    {notice.date}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination placeholder */}
            <motion.div variants={fadeInUp} className="flex justify-center mt-8 gap-2">
              {[1].map((page) => (
                <button
                  key={page}
                  className="w-10 h-10 rounded-lg bg-accent text-white text-sm font-medium"
                >
                  {page}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
