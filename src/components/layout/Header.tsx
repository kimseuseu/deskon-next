"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { featured, navigation } from "@/data/navigation";
import { divisions } from "@/data/divisions";
import MobileNav from "./MobileNav";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // 페이지 전체가 어두우면([data-page-dark]) 고정 헤더도 어두운 유리로 남습니다.
  const [darkPage, setDarkPage] = useState(false);
  // 흰 바탕 페이지([data-page-white])에서는 종이색 대신 흰 유리로 섭니다.
  const [whitePage, setWhitePage] = useState(false);
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
    // Transparent header while a dark hero ([data-hero-dark]) fills the top.
    // Re-runs per route (soft navigation fires no scroll event), rAF-throttled.
    let ticking = false;
    const update = () => {
      ticking = false;
      const heroEl = document.querySelector("[data-hero-dark]");
      setScrolled(heroEl ? heroEl.getBoundingClientRect().bottom <= 80 : true);
      setDarkPage(!!document.querySelector("[data-page-dark]"));
      setWhitePage(!!document.querySelector("[data-page-white]"));
    };
    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    onScrollOrResize();
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

  return (
    <>
      <header
        onMouseLeave={closeMenu}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveMenu(null);
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          mobileOpen ? "opacity-0 pointer-events-none" : ""
        } ${
          solid
            ? light
              ? whitePage
                ? "bg-white/90 backdrop-blur-xl border-b border-[#e5e8eb]"
                : "bg-paper/92 backdrop-blur-xl border-b border-line"
              : "bg-ink/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo lockup: symbol · wordmark · Group, centred on one line.
             The wordmark's capitals sit in the middle of its SVG box
             (cap top 12%, baseline 86%), so centring the boxes centres the
             caps. The symbol is a quarter taller than the caps and straddles
             them evenly; Group is a secondary italic at about three quarters
             of the cap height, nudged up a hair so its x-height, not its
             descender, reads as centred. Nothing rises or drops in a stair. */}
          <Link href="/" aria-label="AOVO 홈" className="relative z-10 flex shrink-0 items-center">
            <Image
              src="/images/aovo_symbol.svg"
              alt=""
              aria-hidden
              width={435}
              height={540}
              loading="eager"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-10"}`}
            />
            <Image
              src={light ? "/images/aovo_wordmark.svg" : "/images/aovo_wordmark_white.svg"}
              alt="AOVO"
              width={119}
              height={42}
              loading="eager"
              className={`ml-1.5 w-auto transition-all duration-500 ${scrolled ? "h-[31px]" : "h-9"}`}
            />
            <span
              className={`ml-1.5 hidden -translate-y-[0.08em] font-serif italic leading-none sm:block transition-all duration-500 ${
                scrolled ? "text-[23px]" : "text-[26px]"
              } ${light ? "text-muted" : "text-cream/70"}`}
            >
              Group
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="주 메뉴">
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
                  className={`nav-underline font-paperlogy text-[14px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                    light ? "text-primary/85 hover:text-primary" : "text-white/85 hover:text-white"
                  }`}
                  data-active={activeMenu === index}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* 강조 메뉴: 설비 랜딩 둘. 가는 세로선으로 떼어 두고 금색 표식을 답니다.
                펼침 패널이 없으므로 손을 올리면 열려 있던 패널을 닫습니다. */}
            <span aria-hidden className={`mx-1 h-4 w-px ${light ? "bg-line" : "bg-white/20"}`} />
            {featured.map((item) => {
              const current = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setActiveMenu(null)}
                  onFocus={() => setActiveMenu(null)}
                  aria-current={current ? "page" : undefined}
                  className={`group inline-flex items-center gap-2 font-paperlogy text-[14px] font-semibold tracking-[0.02em] transition-colors duration-300 ${
                    light
                      ? "text-accent-deep hover:text-primary"
                      : "text-gold hover:text-cream"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`block h-1.5 w-1.5 rotate-45 transition-transform duration-300 group-hover:scale-125 ${
                      current ? "bg-current" : light ? "bg-gold" : "bg-gold"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-5">
            <Link
              href="/support/contact"
              className={`group hidden items-center gap-2.5 border px-5 py-2.5 font-paperlogy text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-400 lg:inline-flex ${
                light
                  ? "border-primary/25 text-primary hover:bg-primary hover:text-cream hover:border-primary"
                  : "border-white/35 text-white hover:bg-white hover:text-primary hover:border-white"
              }`}
            >
              상담 문의
              <span aria-hidden className="text-[13px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="group flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <div className="flex w-6 flex-col gap-[7px]">
                <span className={`block h-px w-full transition-colors duration-300 ${light ? "bg-primary" : "bg-white"}`} />
                <span className={`block h-px w-2/3 self-end transition-all duration-300 group-hover:w-full ${light ? "bg-primary" : "bg-white"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mega / dropdown panel */}
        <AnimatePresence>
          {activeMenu !== null && navigation[activeMenu].children && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-paper/97 backdrop-blur-xl lg:block"
            >
              {navigation[activeMenu].labelEn === "Divisions" ? (
                /* ── Divisions mega panel ── */
                <div className="mx-auto max-w-[1440px] px-10 py-10">
                  <div className="mb-8 flex items-end justify-between">
                    <p className="eyebrow text-muted">Our Divisions</p>
                    <p className="font-serif text-[15px] italic text-muted">
                      Five ways to run your assets.
                    </p>
                  </div>
                  <div className="grid grid-cols-5 divide-x divide-line border-t border-line">
                    {divisions.map((d) => (
                      <Link
                        key={d.slug}
                        href={d.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col gap-10 px-6 pt-6 pb-7 transition-colors duration-300 hover:bg-surface"
                      >
                        <span className="font-serif text-sm italic text-accent-deep">{d.no}</span>
                        <span>
                          <span className="block font-paperlogy text-lg font-semibold text-primary">
                            {d.nameKo}
                            <span aria-hidden className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                              →
                            </span>
                          </span>
                          <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                            {d.nameEn}
                          </span>
                          <span className="mt-3 block text-[13px] leading-relaxed text-muted">
                            {d.tagline}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Simple panel ── */
                <div className="mx-auto flex max-w-[1440px] items-start gap-20 px-10 py-10">
                  <div className="w-64 shrink-0">
                    <p className="eyebrow text-muted">{navigation[activeMenu].labelEn}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {navigation[activeMenu].desc}
                    </p>
                  </div>
                  <ul className="grid flex-1 grid-cols-3 gap-x-10 border-l border-line pl-14">
                    {navigation[activeMenu].children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-baseline justify-between gap-4 border-b border-line py-4"
                        >
                          <span className="font-paperlogy text-[15px] font-medium text-primary/85 transition-colors duration-300 group-hover:text-primary">
                            {child.label}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-accent-deep">
                            {child.labelEn}
                          </span>
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
