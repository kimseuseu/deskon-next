"use client";

import { useState, FormEvent } from "react";
import { COMPANY, SERVICE_CATEGORIES } from "@/lib/constants";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";

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
  const [shakeForm, setShakeForm] = useState(false);

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
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl bg-tg px-5 py-4 text-[16px] font-medium text-tx placeholder:text-tx-3 focus:outline-none focus:ring-2 focus:ring-tb";
  const labelClass = "mb-2 block text-[14px] font-semibold text-tx";

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Contact Us"
        title="문의하기"
        description="맞춤 상담부터 도입 견적까지, 무엇이든 물어보세요."
      />

      {/* Form Section */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:py-36">
          {submitted ? (
            <div className="rounded-[28px] bg-white px-7 py-16 text-center shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:py-20">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-tb-soft">
                <svg className="h-10 w-10 text-tb" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    style={{ strokeDasharray: 24, strokeDashoffset: 0, animation: "checkDraw 0.6s ease-out forwards" }}
                  />
                </svg>
              </div>
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.25] tracking-[-0.03em]">
                문의가 접수되었습니다
              </h2>
              <p className="mt-4 text-[17px] font-medium leading-[1.7] text-tx-2">
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
                className="mt-9 inline-flex items-center justify-center rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
              >
                새 문의 작성
              </button>
            </div>
          ) : (
            <Reveal duration={0.7} amount={0.1}>
              <form
                onSubmit={handleSubmit}
                className={`rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] md:p-10 ${shakeForm ? "shake" : ""}`}
              >
                <div className="mb-8">
                  <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.25] tracking-[-0.03em]">문의 양식</h2>
                  <p className="mt-2 text-[14px] font-medium text-tx-3">* 표시 항목은 필수 입력 사항입니다.</p>
                </div>

                {errorMsg && (
                  <div role="alert" className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-[14px] font-medium text-red-600">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-tg px-5 py-4">
                    <input
                      type="checkbox"
                      name="privacyAgreed"
                      checked={form.privacyAgreed}
                      onChange={handleChange}
                      required
                      className="mt-0.5 h-5 w-5 shrink-0 rounded accent-tb focus:outline-none focus:ring-2 focus:ring-tb"
                    />
                    <span className="text-[14px] font-medium leading-relaxed text-tx-2">
                      개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 처리 목적으로만 사용되며, 처리 완료 후 지체 없이 파기됩니다. *
                    </span>
                  </label>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "전송 중..." : "문의하기"}
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[14px] font-medium text-tx-3">전화 상담을 원하시면</p>
                  <a href={`tel:${COMPANY.phone}`} className="mt-1 inline-block text-[18px] font-bold text-tb transition-colors hover:text-tb-deep">
                    {COMPANY.phone}
                  </a>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
