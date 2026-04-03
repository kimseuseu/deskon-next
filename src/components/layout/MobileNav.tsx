"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/data/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-primary text-white overflow-y-auto"
          >
            {/* Close area / top spacing */}
            <div className="h-20 flex items-center px-6">
              <span className="font-paperlogy text-lg font-bold tracking-tight text-accent">
                AOVO
              </span>
              <button
                onClick={onClose}
                className="ml-auto p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="닫기"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-10">
              {navigation.map((item, index) => (
                <div
                  key={item.href}
                  className="border-b border-white/10 last:border-b-0"
                >
                  {/* Parent Item */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-paperlogy text-base font-semibold tracking-wide">
                        {item.label}
                      </span>
                      <span className="text-xs text-white/65 font-medium uppercase tracking-widest">
                        {item.labelEn}
                      </span>
                    </div>
                    <motion.svg
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-white/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>

                  {/* Children */}
                  <AnimatePresence initial={false}>
                    {expandedIndex === index && item.children && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-4 space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="flex items-center gap-2.5 py-2 text-sm text-white/60 hover:text-accent transition-colors duration-150"
                            >
                              <span className="w-1 h-1 rounded-full bg-accent/50" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Extra Links */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/support/notice"
                  onClick={onClose}
                  className="block text-sm text-white/70 hover:text-accent transition-colors"
                >
                  공지사항
                </Link>
                <Link
                  href="/support/faq"
                  onClick={onClose}
                  className="block text-sm text-white/70 hover:text-accent transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/support/contact"
                  onClick={onClose}
                  className="block text-sm text-white/70 hover:text-accent transition-colors"
                >
                  문의하기
                </Link>
              </div>

              {/* Contact CTA */}
              <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/65 mb-2">상담 전화</p>
                <a
                  href="tel:010-9929-5363"
                  className="text-lg font-paperlogy font-bold text-accent"
                >
                  010-9929-5363
                </a>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
