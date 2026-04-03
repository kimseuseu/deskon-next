"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const actions = [
  {
    label: "카카오채널 상담",
    href: "http://pf.kakao.com/_qxkxnRX",
    external: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.794 5.108 4.504 6.46-.147.538-.951 3.467-.982 3.69 0 0-.02.166.087.23.107.064.233.015.233.015.307-.043 3.559-2.328 4.117-2.723.664.098 1.348.149 2.041.149 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
      </svg>
    ),
    color: "bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835]",
  },
  {
    label: "전화 상담",
    href: "tel:010-9929-5363",
    external: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    color: "bg-emerald-500 text-white hover:bg-emerald-600",
  },
  {
    label: "견적 요청",
    href: "/quote",
    external: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    color: "bg-accent text-white hover:bg-accent-light",
  },
];

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Actions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 mb-1"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {action.external ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full shadow-lg transition-all duration-200 ${action.color}`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {action.icon}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                  </a>
                ) : (
                  <Link
                    href={action.href}
                    className={`flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full shadow-lg transition-all duration-200 ${action.color}`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {action.icon}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ring-pulse breathe w-[60px] h-[60px] rounded-full bg-accent text-white shadow-xl shadow-accent/25 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center animate-[attentionBounce_0.6s_ease-out_1s_1]"
        aria-label="문의하기"
      >
        <motion.svg
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isExpanded ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
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
