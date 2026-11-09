"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
  관리자 틀. 넓은 화면은 왼쪽에 고정 사이드바, 전화기는 위 막대와 서랍.
  지금 메뉴는 파란 알약으로 표시하고 위 막대에 페이지 이름이 섭니다.
  아이콘은 Heroicons 외곽선 경로입니다.
*/

const icon = (d: string) => (
  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const navItems = [
  {
    label: "대시보드",
    href: "/admin",
    icon: icon(
      "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    ),
  },
  {
    label: "상품관리",
    href: "/admin/products",
    icon: icon(
      "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    ),
  },
  {
    label: "문의관리",
    href: "/admin/inquiries",
    icon: icon(
      "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    ),
  },
  {
    label: "견적관리",
    href: "/admin/quotes",
    icon: icon(
      "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    ),
  },
  {
    label: "현장 노트 글",
    href: "/admin/posts",
    icon: icon(
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    ),
  },
  {
    label: "배너관리",
    href: "/admin/banners",
    icon: icon(
      "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18.75h19.5M2.25 6h19.5"
    ),
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });

        if (cancelled) {
          return;
        }

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        setIsAuthenticated(true);
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      } finally {
        if (!cancelled) {
          setIsChecking(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  /* 길이 바뀌면 서랍을 닫습니다. */
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  /* 서랍이 열린 동안 뒤 화면이 스크롤되지 않게 */
  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const current = navItems.find((n) => isActive(n.href));

  if (isChecking || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-tg">
        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-tx-2 shadow-[0_1px_2px_rgba(25,31,40,0.04)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-tb border-t-transparent" />
          로그인 확인 중
        </div>
      </div>
    );
  }

  const sidebarBody = (
    <>
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-tx text-[13px] font-bold text-white">A</span>
          <span className="text-[15px] font-bold tracking-[-0.01em] text-tx">AOVO 관리자</span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="grid h-9 w-9 place-items-center rounded-full text-tx-3 transition-colors duration-150 hover:bg-tg hover:text-tx lg:hidden"
          aria-label="메뉴 닫기"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="관리자 메뉴">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="relative">
                {active && (
                  <motion.span
                    layoutId="admin-nav-pill"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-xl bg-tb-soft"
                    aria-hidden
                  />
                )}
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors duration-150 ${
                    active ? "text-tb-deep" : "text-tx-2 hover:bg-tg hover:text-tx"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-0.5 border-t border-tg p-3">
        <a
          href="http://w.aovo.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-tx-2 transition-colors duration-150 hover:bg-tg hover:text-tx"
        >
          {icon("M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25")}
          후이즈메일
        </a>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-tx-2 transition-colors duration-150 hover:bg-tg hover:text-tx"
        >
          {icon("M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75")}
          사이트 보기
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-tx-2 transition-colors duration-150 hover:bg-red-50 hover:text-red-700"
        >
          {icon("M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9")}
          로그아웃
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-tg text-tx">
      {/* 넓은 화면: 고정 사이드바 */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-tg-2 bg-white lg:flex">{sidebarBody}</aside>

      {/* 전화기: 서랍 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="메뉴 닫기"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-tk/40 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={reduce ? { opacity: 0 } : { x: "-100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "-100%", transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.24, ease: EASE }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white shadow-[0_16px_48px_rgba(25,31,40,0.18)] lg:hidden"
              role="dialog"
              aria-modal
              aria-label="관리자 메뉴"
            >
              {sidebarBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-col lg:pl-60">
        {/* 위 막대 */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-tg-2 bg-white/90 px-4 backdrop-blur sm:px-6 lg:h-16 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full text-tx-2 transition-colors duration-150 hover:bg-tg hover:text-tx lg:hidden"
            aria-label="메뉴 열기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="flex min-w-0 items-center gap-2 text-[14px] font-semibold">
            <span className="hidden text-tx-3 sm:inline">관리자</span>
            <span className="hidden text-tx-3 sm:inline" aria-hidden>
              /
            </span>
            <span className="truncate text-tx">{current?.label ?? "관리자"}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/support/contact"
              target="_blank"
              className="hidden rounded-full bg-tg px-3.5 py-1.5 text-[13px] font-semibold text-tx-2 transition-colors duration-150 hover:bg-tg-2 hover:text-tx sm:inline-flex"
            >
              문의 폼 보기
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1240px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
