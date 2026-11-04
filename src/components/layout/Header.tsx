"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { featured, navigation } from "@/data/navigation";
import { divisions } from "@/data/divisions";
import MobileNav from "./MobileNav";
import Logo from "@/components/ui/Logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 고정 헤더. 흰 유리 바가 기본이고, 어두운 첫 화면([data-hero-dark]) 위에서는
 * 투명하게 시작해 스크롤하면 바가 섭니다. 페이지 전체가 어두우면([data-page-dark])
 * 어두운 유리로 남습니다. 높이는 늘 4rem(globals.css의 --bar)입니다.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [darkPage, setDarkPage] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Any open panel/overlay closes when the route changes (adjust-during-render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const heroEl = document.querySelector("[data-hero-dark]");
      setScrolled(heroEl ? heroEl.getBoundingClientRect().bottom <= 72 : true);
      setDarkPage(!!document.querySelector("[data-page-dark]"));
    };
    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    /* 첫 판정은 바로 합니다. rAF가 멈춘 배경 탭에서도 바가 제 색으로 섭니다. */
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const solid = scrolled || activeMenu !== null;
  /* 글자색 기준. 어두운 페이지에서는 바가 서도 글자가 흰색으로 남습니다. */
  const light = solid && !(darkPage && activeMenu === null);

  const barClass = solid
    ? light
      ? "border-b border-tg-2 bg-white/90 backdrop-blur-xl"
      : "border-b border-white/10 bg-tk/80 backdrop-blur-xl"
    : "border-b border-transparent bg-transparent";

  return (
    <>
      <header
        onMouseLeave={closeMenu}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveMenu(null);
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
          mobileOpen ? "pointer-events-none opacity-0" : ""
        } ${barClass}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Logo tone={light ? "dark" : "light"} size="md" className="relative z-10" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="주 메뉴">
            {navigation.map((item, index) => (
              <div
                key={item.href}
                onMouseEnter={() => openMenu(index)}
                onFocus={() => openMenu(index)}
                className="relative"
              >
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === index}
                  data-active={activeMenu === index}
                  className={`nav-underline inline-flex items-center py-2 text-[15px] font-semibold transition-colors duration-200 ${
                    light ? "text-tx-2 hover:text-tx" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* 강조 메뉴: 설비 랜딩 둘. 파란 알약으로 서고, 펼침 패널이 없습니다. */}
            <span aria-hidden className={`mx-1 h-4 w-px ${light ? "bg-tg-2" : "bg-white/20"}`} />
            <div className="flex items-center gap-1.5">
              {featured.map((item) => {
                const current = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setActiveMenu(null)}
                    onFocus={() => setActiveMenu(null)}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex items-center rounded-full px-3.5 py-2 text-[14px] font-bold transition-colors duration-200 ${
                      current
                        ? "bg-tb text-white"
                        : light
                          ? "bg-tb-soft text-tb hover:bg-tb hover:text-white"
                          : "bg-white/12 text-white hover:bg-white/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/support/contact"
              className={`hidden items-center rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors duration-200 lg:inline-flex ${
                light ? "bg-tx text-white hover:bg-tk-2" : "bg-white text-tx hover:bg-white/90"
              }`}
            >
              상담 문의
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="group flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <div className="flex w-5 flex-col gap-[6px]">
                <span className={`block h-[2px] w-full rounded-full ${light ? "bg-tx" : "bg-white"}`} />
                <span className={`block h-[2px] w-full rounded-full ${light ? "bg-tx" : "bg-white"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* 펼침 패널 */}
        <AnimatePresence>
          {activeMenu !== null && navigation[activeMenu].children && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
              className="absolute inset-x-0 top-full hidden border-b border-tg-2 bg-white/97 shadow-[0_24px_60px_rgba(25,31,40,0.08)] backdrop-blur-xl lg:block"
            >
              {navigation[activeMenu].labelEn === "Divisions" ? (
                <div className="mx-auto max-w-[1440px] px-10 py-8">
                  <div className="grid grid-cols-5 gap-3">
                    {divisions.map((d) => (
                      <Link
                        key={d.slug}
                        href={d.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col gap-6 rounded-[20px] p-5 transition-colors duration-200 hover:bg-tg"
                      >
                        <span className="text-[13px] font-semibold text-tx-3">{d.nameEn}</span>
                        <span>
                          <span className="flex items-center gap-1.5 text-[18px] font-bold text-tx">
                            {d.nameKo}
                            <span
                              aria-hidden
                              className="inline-block text-tb opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                            >
                              →
                            </span>
                          </span>
                          <span className="mt-1.5 block text-[14px] font-medium leading-relaxed text-tx-2">
                            {d.tagline}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex max-w-[1440px] items-start gap-16 px-10 py-8">
                  <div className="w-64 shrink-0 pt-2">
                    <p className="text-[18px] font-bold text-tx">{navigation[activeMenu].label}</p>
                    <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">
                      {navigation[activeMenu].desc}
                    </p>
                  </div>
                  <ul className="grid flex-1 grid-cols-3 gap-2">
                    {navigation[activeMenu].children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-baseline justify-between gap-4 rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-tg"
                        >
                          <span className="text-[15px] font-semibold text-tx">{child.label}</span>
                          <span className="text-[12px] font-medium text-tx-3">{child.labelEn}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
