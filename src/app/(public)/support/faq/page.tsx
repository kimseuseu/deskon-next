"use client";

import { useState, useEffect } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <span className="font-paperlogy text-lg font-bold text-accent/40 shrink-0">
            Q{index + 1}
          </span>
          <span className="text-sm font-medium text-primary leading-relaxed">
            {faq.question}
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
      {isOpen && (
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pl-16">
            <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((json) => {
        setFaqs(json.data || []);
      })
      .catch(() => {
        setFaqs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            FAQ
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-gray-400 text-lg">
            궁금한 점을 빠르게 확인하세요
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-muted">불러오는 중...</div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-20 text-muted">등록된 FAQ가 없습니다.</div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.id} faq={faq} index={i} />
              ))}
            </div>
          )}

          {/* Extra CTA */}
          <div className="text-center mt-12">
            <p className="text-muted mb-4">원하는 답변을 찾지 못하셨나요?</p>
            <a
              href="/support/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
            >
              직접 문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
