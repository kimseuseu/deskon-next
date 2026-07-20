"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const actions = [
  {
    label: "카카오채널 상담",
    labelEn: "Kakao",
    href: "http://pf.kakao.com/_qxkxnRX",
    external: true,
  },
  {
    label: "전화 상담",
    labelEn: "Call",
    href: "tel:010-9929-5363",
    external: false,
  },
  {
    label: "견적 요청",
    labelEn: "Quote",
    href: "/support/contact",
    external: false,
  },
];

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mb-1 flex flex-col border border-line bg-paper shadow-xl shadow-black/10"
          >
            {actions.map((action, index) => {
              const inner = (
                <span className="flex w-52 items-baseline justify-between gap-4 px-5 py-3.5">
                  <span className="font-paperlogy text-sm font-medium text-primary">
                    {action.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted/70">
                    {action.labelEn}
                  </span>
                </span>
              );
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: index * 0.05, duration: 0.25, ease: EASE }}
                  className="border-b border-line last:border-b-0"
                >
                  {action.external ? (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-colors duration-200 hover:bg-surface"
                      onClick={() => setIsExpanded(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={action.href}
                      className="block transition-colors duration-200 hover:bg-surface"
                      onClick={() => setIsExpanded(false)}
                    >
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold shadow-lg shadow-black/20 transition-all duration-300 hover:bg-gold hover:text-ink"
        aria-label="문의하기"
        aria-expanded={isExpanded}
      >
        <motion.svg
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.4}
        >
          {isExpanded ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          )}
        </motion.svg>
      </button>
    </div>
  );
}
