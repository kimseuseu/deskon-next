"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const serviceLabel: Record<string, string> = {
  subscribe: "구독",
  sharing: "공유",
  rental: "렌탈",
  recycle: "순환",
  wholesale: "도소매",
};

export default function QuotePage() {
  const { items, totalItems, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: "",
    message: "",
    privacyAgreed: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    form.companyName.trim() &&
    form.contactName.trim() &&
    form.phone.trim() &&
    form.privacyAgreed &&
    items.length > 0 &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: form.companyName,
          contact_name: form.contactName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          delivery_date: form.deliveryDate || null,
          message: form.message,
          items: items.map((item) => ({
            productName: item.productName,
            quantity: item.quantity,
            serviceType: item.serviceType,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "견적 요청에 실패했습니다.");
      }

      clearCart();
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-paperlogy text-3xl font-bold text-primary mb-3">
            견적 요청이 완료되었습니다
          </h1>
          <p className="text-muted mb-8">
            담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            상품 계속 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section data-hero-dark className="bg-primary pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-paperlogy text-4xl font-bold text-white mb-3">
            견적 요청
          </h1>
          <p className="text-white/70">
            아래 양식을 작성하시면 빠르게 견적을 보내드립니다.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="(주) 데스콘"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  이메일
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="example@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                배송 주소
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="서울시 강남구 테헤란로 123"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
              />
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                희망 납품일
              </label>
              <input
                type="date"
                value={form.deliveryDate}
                onChange={(e) => update("deliveryDate", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                요청 사항
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="추가 요청사항이 있으시면 작성해주세요."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm resize-none"
              />
            </div>

            {/* Privacy */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={(e) => update("privacyAgreed", e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm text-muted">
                개인정보 수집 및 이용에 동의합니다.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full font-paperlogy font-bold text-lg py-4 rounded-2xl transition-all shadow-lg ${
                canSubmit
                  ? "bg-accent hover:bg-accent-light text-white hover:shadow-xl active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {submitting ? "전송 중..." : "견적 요청 전송"}
            </button>
          </form>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-surface rounded-2xl p-6 sticky top-28">
              <h3 className="font-paperlogy font-bold text-lg text-primary mb-4">
                견적 요약
              </h3>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted text-sm mb-2">
                    견적 목록이 비어있습니다.
                  </p>
                  <Link
                    href="/products"
                    className="text-accent hover:text-accent-light text-sm underline transition-colors"
                  >
                    상품 추가하기
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="space-y-3 mb-6">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between bg-white rounded-xl p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-primary text-sm truncate">
                            {item.productName}
                          </p>
                          <span className="text-xs text-accent">
                            {serviceLabel[item.serviceType] ?? item.serviceType}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-primary ml-3 whitespace-nowrap">
                          x{item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">총 품목 수</span>
                      <span className="font-paperlogy font-bold text-primary text-lg">
                        {totalItems}개
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
