"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { divisions } from "@/data/divisions";
import { brands } from "@/data/brands";
import { featured } from "@/data/navigation";
import { COMPANY } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const secondaryLinks = [
  { label: "그룹소개", href: "/about" },
  { label: "회사 연혁", href: "/about/history" },
  { label: "오시는 길", href: "/about/location" },
  { label: "현장 노트", href: "/blog" },
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
  { label: "문의하기", href: "/support/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/** 전화기 메뉴. 흰 화면이 위에서 내려오고, 강조 메뉴 둘이 파란 카드로 맨 위에 섭니다. */
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
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-white text-tx lg:hidden"
        >
          {/* Top bar */}
          <div className="flex h-[72px] shrink-0 items-center justify-between px-6">
            <Logo size="md" onClick={onClose} />
            <button
              ref={closeRef}
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-tg text-tx"
              aria-label="메뉴 닫기"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pt-3 pb-10" data-lenis-prevent>
            {/* 강조 메뉴: 설비 랜딩 둘 */}
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4, ease: EASE }}
              aria-label="설비 서비스"
              className="grid grid-cols-2 gap-3"
            >
              {featured.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group flex flex-col gap-5 rounded-[20px] bg-tb-soft p-5 transition-colors active:bg-tb/15"
                >
                  <span className="text-[20px] font-bold leading-none tracking-[-0.02em] text-tb">{item.label}</span>
                  <span className="text-[13px] font-medium leading-snug text-tx-2">{item.desc}</span>
                </Link>
              ))}
            </motion.nav>

            {/* 사업분야 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.4 }}
              className="mt-9 text-[13px] font-semibold text-tx-3"
            >
              사업분야
            </motion.p>
            <nav className="mt-2" aria-label="사업분야">
              {divisions.map((d, i) => (
                <div key={d.slug} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 + i * 0.05, ease: EASE }}
                  >
                    <Link href={d.href} onClick={onClose} className="group flex items-baseline justify-between gap-4 border-b border-tg-2 py-3.5">
                      <span className="flex items-baseline gap-3">
                        <span className="font-serif text-[15px] italic text-tb">{d.no}</span>
                        <span className="font-paperlogy text-[28px] font-semibold leading-none tracking-[-0.03em] text-tx">{d.nameKo}</span>
                      </span>
                      <span className="text-[13px] font-medium text-tx-3">{d.tagline}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* 브랜드 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
            >
              <p className="mt-9 text-[13px] font-semibold text-tx-3">브랜드</p>
              <nav className="mt-3 grid grid-cols-2 gap-2" aria-label="브랜드">
                {brands.map((b) => (
                  <Link
                    key={b.slug}
                    href={b.href}
                    onClick={onClose}
                    className="flex items-baseline gap-2 rounded-2xl bg-tg px-4 py-3 transition-colors active:bg-tg-2"
                  >
                    <span className="text-[15px] font-bold text-tx">{b.name}</span>
                    <span className="text-[12px] font-medium text-tx-3">{b.nameKo}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* 그 밖의 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.4, ease: EASE }}
              className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3.5"
            >
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className="text-[15px] font-semibold text-tx-2 transition-colors hover:text-tx">
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* 연락 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="shrink-0 border-t border-tg-2 px-6 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <a href={`tel:${COMPANY.phone}`} className="block text-[20px] font-bold tracking-[-0.02em] text-tx">
                  {COMPANY.phone}
                </a>
                <p className="mt-0.5 text-[12px] font-medium text-tx-3">평일 09:00 - 18:00</p>
              </div>
              <a
                href={COMPANY.kakaoChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-tb px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-tb-deep"
              >
                카카오 채널
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
