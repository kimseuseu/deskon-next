"use client";

import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/* 답은 접혀 있어도 문서 안에 있습니다(높이만 0). 검색 로봇은 첫 문서에서 질문과 답을 함께 읽습니다. */
function FaqItem({ faq }: { faq: Faq }) {
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

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Stagger className="space-y-3" gap={0.06} amount={0.05}>
      {faqs.map((faq) => (
        <StaggerItem key={faq.id}>
          <FaqItem faq={faq} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
