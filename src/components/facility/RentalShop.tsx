"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { categories, products, type CategoryId, type RentalProduct } from "@/data/gasRental";
import { gas } from "@/data/facility";
import { COMPANY } from "@/lib/constants";

/**
 * 가스기기 임대 상품 진열. 쇼핑몰의 문법입니다.
 *
 *   위에 필터 칩과 정렬이 붙은 도구 줄이 서고, 그 아래 둥근 흰 카드가 격자로
 *   늘어섭니다. 카드마다 사진, 배지, 브랜드, 이름, 규격 한 줄, 알약 버튼 두 개.
 *   카드를 누르면 빠른 보기 창이 열려 규격 전체와 문의 버튼을 보여 줍니다.
 *   가격 자리는 비워 두지 않고 «임대가 문의»로 채웁니다. 모든 기기가 임대
 *   설치 기준이고 견적은 기간 · 수량 · 현장으로 정해지기 때문입니다.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
type Filter = "all" | CategoryId;
type Sort = "default" | "name" | "maker";
/** 한 쪽에 보이는 기기 수. 넓은 화면 4열 기준 세 줄. */
const PER_PAGE = 12;

export function RentalShop() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("default");
  const [open, setOpen] = useState<RentalProduct | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const list = useMemo(() => {
    const base = filter === "all" ? products : products.filter((p) => p.category === filter);
    if (sort === "name") return [...base].sort((a, b) => a.name.localeCompare(b.name, "ko"));
    if (sort === "maker") return [...base].sort((a, b) => a.maker.localeCompare(b.maker, "ko"));
    return base;
  }, [filter, sort]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const first = list.length === 0 ? 0 : (current - 1) * PER_PAGE + 1;
  const last = Math.min(current * PER_PAGE, list.length);

  /* 필터나 정렬이 바뀌면 첫 쪽으로. 쪽을 넘기면 목록 머리로 올라갑니다. */
  const pick = (f: Filter) => {
    setFilter(f);
    setPage(1);
  };
  const order = (o: Sort) => {
    setSort(o);
    setPage(1);
  };
  const go = (n: number) => {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const phone = gas.phone ?? COMPANY.phone;

  return (
    <>
      {/* 도구 줄: 필터 칩 + 정렬. 헤더 밑에 붙어 따라옵니다. */}
      <div className="sticky top-[var(--bar)] z-30 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-3">
          <LayoutGroup id="rental-filter">
            <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="기기 묶음">
              {[{ id: "all" as Filter, title: "전체", n: products.length }, ...categories.map((c) => ({ id: c.id as Filter, title: c.title, n: products.filter((p) => p.category === c.id).length }))].map((t) => {
                const active = filter === t.id;
                return (
                  <li key={t.id} className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => pick(t.id)}
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 ${
                        active ? "text-white" : "bg-tg text-tx hover:bg-tg-2"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="chip"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-full bg-tb"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {t.title}
                      <span className={`text-[12px] font-semibold ${active ? "text-white/70" : "text-tx-3"}`}>{t.n}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
          <label className="ml-auto hidden shrink-0 items-center gap-2 text-[13px] font-medium text-tx-3 sm:flex">
            정렬
            <select
              value={sort}
              onChange={(e) => order(e.target.value as Sort)}
              className="rounded-full bg-tg px-4 py-2 text-[14px] font-semibold text-tx outline-none transition-colors duration-200 hover:bg-tg-2 focus-visible:ring-2 focus-visible:ring-tb"
            >
              <option value="default">기본 순</option>
              <option value="name">이름 순</option>
              <option value="maker">브랜드 순</option>
            </select>
          </label>
        </div>
      </div>

      <section className="bg-tg text-tx" aria-label="임대 기기 목록">
        <div ref={gridRef} className="mx-auto max-w-[1400px] scroll-mt-[calc(var(--bar)+4rem)] px-6 py-10 lg:py-14">
          <div className="mb-6 flex flex-col gap-1 text-[14px] font-medium text-tx-3 sm:flex-row sm:items-baseline sm:justify-between">
            <p>
              <span className="text-[16px] font-bold text-tx">{list.length}</span>개 기기
              {pages > 1 && <span className="ml-2">{first}-{last} 표시</span>}
            </p>
            <p>모든 기기는 운송 · 설치 · 안전점검 · 철거가 포함된 임대 기준입니다</p>
          </div>

          <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" role="list">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <ProductCard p={p} onOpen={() => setOpen(p)} phone={phone} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {pages > 1 && <Pagination current={current} pages={pages} onGo={go} />}
        </div>
      </section>

      <QuickView p={open} phone={phone} onClose={() => setOpen(null)} />
    </>
  );
}

/** 쪽 번호. 이전 · 번호들 · 다음. 지금 쪽은 파랑으로 찍힙니다. */
function Pagination({ current, pages, onGo }: { current: number; pages: number; onGo: (n: number) => void }) {
  const btn =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-[14px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="쪽 이동">
      <button type="button" onClick={() => onGo(current - 1)} disabled={current === 1} className={`${btn} bg-white text-tx hover:bg-tg-2`} aria-label="이전 쪽">
        ←
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onGo(n)}
          aria-current={n === current ? "page" : undefined}
          className={`${btn} ${n === current ? "bg-tb text-white" : "bg-white text-tx hover:bg-tg-2"}`}
        >
          {n}
        </button>
      ))}
      <button type="button" onClick={() => onGo(current + 1)} disabled={current === pages} className={`${btn} bg-white text-tx hover:bg-tg-2`} aria-label="다음 쪽">
        →
      </button>
    </nav>
  );
}

function ProductCard({ p, onOpen, phone }: { p: RentalProduct; onOpen: () => void; phone: string }) {
  const cat = categories.find((c) => c.id === p.category)!;
  return (
    <article
      id={p.id}
      className="group flex h-full scroll-mt-[calc(var(--bar)+4.5rem)] flex-col overflow-hidden rounded-[24px] bg-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_12px_40px_rgba(25,31,40,0.08)] motion-safe:hover:-translate-y-1"
    >
      <button type="button" onClick={onOpen} className="relative block aspect-square w-full overflow-hidden bg-white text-left" aria-label={`${p.name} 빠른 보기`}>
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 22vw, 45vw"
          className="object-contain p-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-tb-soft px-2.5 py-1 text-[11px] font-semibold text-tb">임대</span>
          {p.featured && <span className="rounded-full bg-tb px-2.5 py-1 text-[11px] font-semibold text-white">대표</span>}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[12px] font-medium text-tx-3">
          {p.maker} · {cat.title}
        </p>
        <h3 className="mt-1.5 text-[16px] font-bold leading-snug">
          <button type="button" onClick={onOpen} className="text-left transition-colors duration-200 hover:text-tb">
            {p.name}
          </button>
        </h3>
        <p className="mt-1 line-clamp-1 text-[13px] font-medium text-tx-2">{p.specs.slice(0, 2).join(" · ")}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[15px] font-bold">임대가 문의</span>
          {p.facet && <span className="rounded-full bg-tg px-2.5 py-1 text-[12px] font-semibold text-tb">{p.facet}</span>}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-4">
          <Link
            href="/support/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-tb px-3 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:px-4"
          >
            임대 문의
          </Link>
          <a
            href={`tel:${phone}`}
            aria-label={`${gas.callLabel ?? "전화 상담"} ${phone}`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-tg px-3 py-2.5 text-[13px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:px-4"
          >
            전화
          </a>
        </div>
      </div>
    </article>
  );
}

/** 빠른 보기. 카드를 누르면 가운데에서 열리고, 바깥을 누르거나 Esc로 닫힙니다. */
function QuickView({ p, phone, onClose }: { p: RentalProduct | null; phone: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-tk/55 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE }}
            className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-t-[28px] bg-white text-tx sm:grid-cols-2 sm:rounded-[28px]"
          >
            <div className="relative aspect-square bg-white">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-contain p-8" />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[13px] font-medium text-tx-3">
                  {p.maker}
                  {p.model && <span className="ml-1.5">· {p.model}</span>}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="닫기"
                  className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-tg text-xl text-tx-2 transition-colors duration-200 hover:bg-tg-2 hover:text-tx"
                >
                  ×
                </button>
              </div>
              <h2 id="qv-title" className="mt-2 text-[24px] font-bold leading-snug tracking-[-0.03em]">
                {p.name}
              </h2>
              <p className="mt-2 text-[15px] font-medium text-tx-2">{p.tagline}</p>

              <div className="mt-6 rounded-[20px] bg-tg p-4">
                <p className="text-[12px] font-semibold text-tx-3">규격</p>
                <ul className="mt-2 space-y-1.5">
                  {p.specs.map((s) => (
                    <li key={s} className="text-[14px] font-medium text-tx">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-3">
                <span className="text-[18px] font-bold">임대가 문의</span>
                <span className="text-[13px] font-medium text-tx-3">기간 · 수량 · 지역 기준 당일 안내</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/support/contact"
                  className="inline-flex items-center justify-center rounded-full bg-tb px-4 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
                >
                  임대 문의하기
                </Link>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tg px-4 py-3.5 text-[15px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]"
                >
                  {gas.callLabel ?? "전화 상담"}
                  <span className="text-[13px] font-medium text-tx-2">{phone}</span>
                </a>
              </div>
              <p className="mt-4 whitespace-pre-line text-[13px] font-medium leading-relaxed text-tx-3">
                {"운송 · 설치 · 가스 연결 · 사용 전 안전점검 · 철거까지 임대에 포함됩니다.\n현장이 LNG인지 LPG인지에 맞춰 세팅해 보냅니다."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
