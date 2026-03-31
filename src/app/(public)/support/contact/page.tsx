"use client";

import { useState, FormEvent } from "react";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";

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
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          inquiry_type: form.inquiryType,
          service_category: form.serviceCategory,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "문의 등록에 실패했습니다.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-primary mb-1.5";

  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            Contact Us
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            문의하기
          </h1>
          <p className="text-gray-400 text-lg">
            맞춤 견적부터 서비스 상담까지, 무엇이든 물어보세요
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {submitted ? (
            <div className="text-center py-20">
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
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm"
            >
              <div className="mb-8">
                <h2 className="font-paperlogy text-2xl font-bold text-primary mb-2">문의 양식</h2>
                <p className="text-sm text-muted">* 표시 항목은 필수 입력 사항입니다.</p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>
              </div>

              <div className="mt-6">
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
              </div>

              <div className="mt-6">
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
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-accent-light transition-colors duration-300 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "전송 중..." : "문의하기"}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-muted mb-2">전화 상담을 원하시면</p>
                <a href={`tel:${COMPANY.phone}`} className="text-lg font-bold text-accent hover:text-accent-light transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
