"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/*
  관리자 화면의 공통 조각. 사이트 팔레트(tx · tb · tg) 하나로 맞춥니다.
  모서리 규칙: 카드 20px, 입력칸 12px, 버튼은 알약. 그림자는 바탕색을 띤 얕은 한 겹.
  전환은 150~200ms, 색과 투명도만 바뀝니다.
*/

export const inputClass =
  "w-full rounded-xl border border-tg-2 bg-white px-3.5 py-2.5 text-[14px] font-medium text-tx placeholder:text-tx-3 transition-colors duration-150 focus:outline-none focus:border-tb disabled:bg-tg disabled:text-tx-3";
export const labelClass = "mb-1.5 block text-[13px] font-semibold text-tx-2";

/** 페이지 머리. 제목, 한 줄 설명, 오른쪽 동작, 밑에 요약 수치. */
export function PageHeader({
  title,
  description,
  actions,
  stats,
  back,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  stats?: { label: string; value: ReactNode; tone?: "default" | "accent" }[];
  back?: { href: string; label: string };
}) {
  return (
    <header className="mb-6">
      {back && (
        <Link href={back.href} className="mb-2 inline-flex items-center gap-1 text-[13px] font-semibold text-tx-3 transition-colors duration-150 hover:text-tx">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
          </svg>
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-tx sm:text-[24px]">{title}</h1>
          {description && <p className="mt-1 text-[14px] font-medium text-tx-3">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {stats && stats.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3 rounded-[20px] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(25,31,40,0.04)]">
          {stats.map((s) => (
            <div key={s.label} className="min-w-[5.5rem]">
              <dt className="text-[12px] font-medium text-tx-3">{s.label}</dt>
              <dd className={`mt-0.5 text-[20px] font-bold tabular-nums tracking-[-0.02em] ${s.tone === "accent" ? "text-tb" : "text-tx"}`}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

/** 흰 카드 */
export function Card({ children, className = "", padded = true }: { children: ReactNode; className?: string; padded?: boolean }) {
  return (
    <div className={`rounded-[20px] bg-white shadow-[0_1px_2px_rgba(25,31,40,0.04)] ${padded ? "p-5 sm:p-6" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-bold text-tx">{children}</h2>
      {aside}
    </div>
  );
}

/** 알약 버튼 */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
const buttonLook: Record<ButtonVariant, string> = {
  primary: "bg-tb text-white hover:bg-tb-deep",
  secondary: "bg-tx text-white hover:bg-tk-2",
  ghost: "bg-tg text-tx hover:bg-tg-2",
  danger: "bg-red-50 text-red-700 hover:bg-red-100",
};
const buttonSize = {
  sm: "px-3.5 py-1.5 text-[13px]",
  md: "px-4.5 py-2.5 text-[14px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  external,
  ...rest
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  className?: string;
  href?: string;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${buttonLook[variant]} ${buttonSize[size]} ${className}`;
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** 상태 뱃지. 뜻이 있는 색만 씁니다. */
export type Tone = "blue" | "violet" | "amber" | "green" | "red" | "gray";
const toneClass: Record<Tone, string> = {
  blue: "bg-tb-soft text-tb-deep",
  violet: "bg-violet-50 text-violet-700",
  amber: "bg-amber-50 text-amber-700",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-700",
  gray: "bg-tg text-tx-2",
};
export function Badge({ tone = "gray", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${toneClass[tone]}`}>{children}</span>;
}

/** 필터 탭(개수 포함). 가로 스크롤이 됩니다. */
export function FilterTabs<K extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: K; label: string; count?: number }[];
  active: K;
  onChange: (key: K) => void;
}) {
  return (
    <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-150 ${
              on ? "bg-tx text-white" : "bg-white text-tx-2 hover:bg-tg-2 hover:text-tx"
            }`}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span className={`tabular-nums ${on ? "text-white/60" : "text-tx-3"}`}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** 켜고 끄는 스위치 */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 ${on ? "bg-tb" : "bg-tg-2"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

/** 목록이 비었을 때 */
export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-tg text-tx-3">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5zM4 12h16" />
        </svg>
      </div>
      <p className="mt-4 text-[15px] font-bold text-tx">{title}</p>
      {description && <p className="mt-1 text-[13px] font-medium text-tx-3">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

/** 불러오지 못했을 때 */
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-red-50 px-5 py-4 text-[14px] font-medium text-red-700">
      <span>{message}</span>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          다시 불러오기
        </Button>
      )}
    </div>
  );
}

/** 표 모양의 로딩 스켈레톤 */
export function SkeletonRows({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-tg" aria-busy aria-label="불러오는 중">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid items-center gap-4 px-5 py-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: cols }).map((__, c) => (
            <div key={c} className="skeleton h-3.5" style={{ width: `${55 + ((r * 7 + c * 13) % 40)}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy aria-label="불러오는 중">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-[20px] bg-white p-5 shadow-[0_1px_2px_rgba(25,31,40,0.04)]">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton mt-4 h-7 w-20" />
        </div>
      ))}
    </div>
  );
}

/** 넓은 화면은 표, 전화기는 카드. head/row 는 표용, card 는 전화기용. */
export function ResponsiveList<T>({
  items,
  keyOf,
  head,
  row,
  card,
  onRowClick,
  expanded,
  detail,
  empty,
}: {
  items: T[];
  keyOf: (item: T) => string;
  head: ReactNode;
  row: (item: T) => ReactNode;
  card: (item: T) => ReactNode;
  onRowClick?: (item: T) => void;
  expanded?: (item: T) => boolean;
  detail?: (item: T) => ReactNode;
  empty: ReactNode;
}) {
  if (items.length === 0) return <>{empty}</>;
  return (
    <>
      {/* 넓은 화면 */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-tg text-left text-[12px] font-semibold text-tx-3">{head}</tr>
          </thead>
          <tbody className="divide-y divide-tg">
            {items.map((item) => {
              const open = expanded?.(item) ?? false;
              return (
                <RowGroup key={keyOf(item)}>
                  <tr
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                    className={`transition-colors duration-150 ${onRowClick ? "cursor-pointer hover:bg-tg/60" : ""} ${open ? "bg-tg/40" : ""}`}
                  >
                    {row(item)}
                  </tr>
                  {open && detail && (
                    <tr className="bg-tg/40">
                      <td colSpan={99} className="px-5 pb-6 pt-1">
                        {detail(item)}
                      </td>
                    </tr>
                  )}
                </RowGroup>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 전화기 */}
      <ul className="divide-y divide-tg md:hidden">
        {items.map((item) => {
          const open = expanded?.(item) ?? false;
          return (
            <li key={keyOf(item)} className={open ? "bg-tg/40" : ""}>
              <div
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(item);
                        }
                      }
                    : undefined
                }
                className={`px-5 py-4 ${onRowClick ? "cursor-pointer active:bg-tg/60" : ""}`}
              >
                {card(item)}
              </div>
              {open && detail && <div className="px-5 pb-5">{detail(item)}</div>}
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* tbody 안에서 줄 둘을 묶어 key 를 주기 위한 조각. 표 구조는 그대로 둡니다. */
function RowGroup({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const th = "px-5 py-3 font-semibold whitespace-nowrap";
export const td = "px-5 py-3.5 align-middle";

/** 날짜 «2026-11-09 14:03» */
export function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function formatDate(iso: string | null | undefined) {
  return formatDateTime(iso).slice(0, 10);
}

/** 짧은 ID 표시 */
export function shortId(id: string) {
  return id.length > 8 ? id.slice(0, 8) : id;
}
