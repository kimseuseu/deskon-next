"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${faq.id}`;

  return (
    <div className="rounded-[24px] bg-tg transition-colors duration-200 hover:bg-tg-2/70">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 rounded-[24px] px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tb lg:px-7"
      >
        <span className="text-[16px] font-semibold leading-relaxed text-tx lg:text-[17px]">{faq.question}</span>
        <span
          aria-hidden
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-tb transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 lg:px-7">
          <p className="text-[15px] font-medium leading-[1.75] text-tx-2">{faq.answer}</p>
        </div>
      </div>
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
      <PageHero
        eyebrow="FAQ"
        title="자주 묻는 질문"
        description="궁금한 점을 빠르게 확인하세요."
      />

      {/* FAQ List */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:py-36">
          {loading ? (
            <p className="py-20 text-center text-[15px] font-medium text-tx-3">불러오는 중...</p>
          ) : faqs.length === 0 ? (
            <p className="rounded-[24px] bg-tg py-20 text-center text-[15px] font-medium text-tx-3">등록된 FAQ가 없습니다.</p>
          ) : (
            <Stagger className="space-y-3" gap={0.06} amount={0.05}>
              {faqs.map((faq) => (
                <StaggerItem key={faq.id}>
                  <FAQItem faq={faq} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {/* Extra CTA */}
          <Reveal className="mt-16 text-center">
            <p className="text-[17px] font-medium text-tx-2">원하는 답변을 찾지 못하셨나요?</p>
            <Link
              href="/support/contact"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
            >
              직접 문의하기
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
