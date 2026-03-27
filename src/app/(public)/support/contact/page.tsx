"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const inquiryTypes = [
  "서비스 문의",
  "견적 요청",
  "파트너십 문의",
  "기술 지원",
  "기타",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    inquiryType: "",
    serviceCategory: "",
    message: "",
    privacyAgreed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-primary mb-1.5";

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
            Contact Us
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            문의하기
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
            맞춤 견적부터 서비스 상담까지, 무엇이든 물어보세요
          </motion.p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {submitted ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h2 className="font-paperlogy text-3xl font-bold text-primary mb-4">
                문의가 접수되었습니다
              </h2>
              <p className="text-muted text-lg mb-8">
                담당자가 확인 후 빠르게 연락드리겠습니다.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    company: "",
                    phone: "",
                    email: "",
                    inquiryType: "",
                    serviceCategory: "",
                    message: "",
                    privacyAgreed: false,
                  });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
              >
                새 문의 작성
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="font-paperlogy text-2xl font-bold text-primary mb-2">문의 양식</h2>
                <p className="text-sm text-muted">* 표시 항목은 필수 입력 사항입니다.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}>
                  <label htmlFor="name" className={labelClass}>이름 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="company" className={labelClass}>회사명 *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="(주)회사명"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="phone" className={labelClass}>연락처 *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className={labelClass}>이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@company.com"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="inquiryType" className={labelClass}>문의 유형 *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={form.inquiryType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">선택해주세요</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="serviceCategory" className={labelClass}>서비스 카테고리</label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={form.serviceCategory}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">선택해주세요</option>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.nameKo}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="mt-6">
                <label htmlFor="message" className={labelClass}>문의 내용 *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용을 자세히 적어주세요."
                  className={`${inputClass} resize-none`}
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacyAgreed"
                    checked={form.privacyAgreed}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent/30"
                  />
                  <span className="text-sm text-muted leading-relaxed">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 처리 목적으로만 사용되며, 처리 완료 후 지체 없이 파기됩니다. *
                  </span>
                </label>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent-light transition-colors duration-300 shadow-lg shadow-accent/20"
                >
                  문의하기
                </button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-muted mb-2">전화 상담을 원하시면</p>
                <a href={`tel:${COMPANY.phone}`} className="text-lg font-bold text-accent hover:text-accent-light transition-colors">
                  {COMPANY.phone}
                </a>
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>
    </>
  );
}
