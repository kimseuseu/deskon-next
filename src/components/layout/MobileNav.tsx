"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { divisions } from "@/data/divisions";
import { brands } from "@/data/brands";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const secondaryLinks = [
  { label: "그룹소개", labelEn: "About", href: "/about" },
  { label: "회사 연혁", labelEn: "History", href: "/about/history" },
  { label: "오시는 길", labelEn: "Location", href: "/about/location" },
  { label: "공지사항", labelEn: "Notice", href: "/support/notice" },
  { label: "FAQ", labelEn: "FAQ", href: "/support/faq" },
  { label: "문의하기", labelEn: "Contact", href: "/support/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="메뉴"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-cream lg:hidden"
        >
          {/* Top bar */}
          <div className="flex h-20 shrink-0 items-center justify-between px-6">
            <Link href="/" onClick={onClose} aria-label="AOVO 홈">
              <Image
                src="/images/aovo_wordmark_white.svg"
                alt="AOVO"
                width={119}
                height={42}
                className="h-5 w-auto"
              />
            </Link>
            <button
              ref={closeRef}
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="메뉴 닫기"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divisions */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10" data-lenis-prevent>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="eyebrow text-white/55"
            >
              Our Divisions
            </motion.p>

            <nav className="mt-5" aria-label="사업분야">
              {divisions.map((d, i) => (
                <div key={d.slug} className="overflow-hidden border-b border-white/10">
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.22 + i * 0.07, ease: EASE }}
                  >
                    <Link
                      href={d.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 py-5"
                    >
                      <span className="font-serif text-sm italic text-gold">{d.no}</span>
                      <span className="font-paperlogy text-[30px] font-light leading-none tracking-[-0.01em] text-cream transition-colors group-hover:text-gold">
                        {d.nameKo}
                      </span>
                      <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-white/55">
                        {d.nameEn}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Brands */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            >
              <p className="eyebrow mt-10 text-white/55">Group Brands</p>
              <nav className="mt-4 grid grid-cols-2 gap-x-6" aria-label="브랜드">
                {brands.map((b) => (
                  <Link
                    key={b.slug}
                    href={b.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-2 border-b border-white/10 py-3.5"
                  >
                    <span className="font-paperlogy text-[17px] font-semibold tracking-[0.03em] text-cream transition-colors group-hover:text-gold">
                      {b.name}
                    </span>
                    <span className="text-[11px] text-white/55">{b.nameKo}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Secondary links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-[14px] text-white/70 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Bottom contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="shrink-0 border-t border-white/10 px-6 py-6"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Contact</p>
                <a href="tel:010-9929-5363" className="mt-1.5 block font-paperlogy text-xl font-semibold text-cream">
                  010-9929-5363
                </a>
                <p className="mt-0.5 text-xs text-white/55">평일 09:00 – 18:00</p>
              </div>
              <a
                href="http://pf.kakao.com/_qxkxnRX"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 px-4 py-2.5 text-[12px] font-medium tracking-[0.1em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                카카오 채널 ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
