"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const actions = [
  { label: "카카오채널 상담", href: COMPANY.kakaoChannel, external: true },
  { label: "전화 상담", href: `tel:${COMPANY.phone}`, external: false },
  { label: "견적 요청", href: "/support/contact", external: false },
];

/** 오른쪽 아래 파란 동그라미. 누르면 흰 카드가 열리고 상담 길 셋이 섭니다. */
export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mb-1 flex w-56 flex-col gap-0.5 rounded-[20px] bg-white p-2 shadow-[0_16px_48px_rgba(25,31,40,0.16)]"
          >
            {actions.map((action) => {
              const cls =
                "block rounded-2xl px-4 py-3 text-[15px] font-semibold text-tx transition-colors duration-200 hover:bg-tg";
              return action.external ? (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  onClick={() => setIsExpanded(false)}
                >
                  {action.label}
                </a>
              ) : (
                <Link key={action.label} href={action.href} className={cls} onClick={() => setIsExpanded(false)}>
                  {action.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-tb text-white shadow-[0_10px_28px_rgba(49,130,246,0.35)] transition-colors duration-200 hover:bg-tb-deep"
        aria-label="문의하기"
        aria-expanded={isExpanded}
      >
        <motion.svg
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isExpanded ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          )}
        </motion.svg>
      </button>
    </div>
  );
}
