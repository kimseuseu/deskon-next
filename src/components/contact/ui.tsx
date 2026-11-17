"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
  견적 문의 폼의 조각들. 사이트 문법 그대로입니다.
  흰 카드 28px, 입력칸은 회색 바탕 16px, 버튼은 알약. 파랑 하나(tb)만 씁니다.
  움직임은 transform과 opacity뿐이고, 등장 200~260ms, 퇴장은 더 짧게.
*/

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const inputClass =
  "w-full rounded-2xl bg-tg px-5 py-4 text-[16px] font-medium text-tx placeholder:text-tx-3 focus:outline-none focus:ring-2 focus:ring-tb disabled:text-tx-3";
export const inputErrorClass = "ring-2 ring-red-300 bg-red-50/60";

/** 단계의 머리. 제목 한 줄, 설명 한 줄. */
export function StepHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mb-7">
      <h2 className="text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.25] tracking-[-0.03em] text-tx">{title}</h2>
      {lead && <p className="mt-2 whitespace-pre-line text-[15px] font-medium leading-[1.65] text-tx-2">{lead}</p>}
    </div>
  );
}

/** 입력칸 묶음. 라벨 위, 오류는 아래. 흔들지 않고 색과 문구로만 알립니다. */
export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-[14px] font-semibold text-tx">
        {label}
        {optional && <span className="text-[12px] font-medium text-tx-3">선택</span>}
      </label>
      {children}
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="err"
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="mt-2 text-[13px] font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" className="mt-2 text-[13px] font-medium text-tx-3">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** 묶음 라벨(칩 그룹 위) */
export function GroupLabel({ children, error, optional }: { children: ReactNode; error?: string; optional?: boolean }) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline gap-x-2">
      <span className="text-[14px] font-semibold text-tx">{children}</span>
      {optional && <span className="text-[12px] font-medium text-tx-3">선택</span>}
      {error && (
        <span role="alert" className="text-[13px] font-medium text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}

/** 큰 선택 카드. 분야 고르기에 씁니다. */
export function OptionCard({
  selected,
  onSelect,
  mark,
  title,
  titleEn,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  mark: string;
  title: string;
  titleEn: string;
  description: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={`group relative flex w-full flex-col items-start rounded-[22px] p-5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb ${
        selected ? "bg-tb-soft ring-2 ring-tb" : "bg-tg hover:bg-tg-2"
      }`}
    >
      <div className="flex w-full items-start justify-between">
        <span
          className={`grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold transition-colors duration-200 ${
            selected ? "bg-tb text-white" : "bg-white text-tx-2 group-hover:text-tx"
          }`}
        >
          {mark}
        </span>
        <AnimatePresence initial={false}>
          {selected && (
            <motion.span
              key="check"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: EASE }}
              className="grid h-6 w-6 place-items-center rounded-full bg-tb text-white"
              aria-hidden
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="mt-4 text-[18px] font-bold leading-tight tracking-[-0.02em] text-tx">{title}</span>
      <span className="mt-0.5 text-[12px] font-medium text-tx-3">{titleEn}</span>
      <span className="mt-3 whitespace-pre-line text-[14px] font-medium leading-[1.6] text-tx-2">{description}</span>
    </motion.button>
  );
}

/** 알약 칩. 하나 또는 여러 개 고릅니다. */
export function Chip({
  selected,
  onToggle,
  label,
  hint,
  role = "checkbox",
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  hint?: string;
  role?: "checkbox" | "radio";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onToggle}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`inline-flex flex-col items-start rounded-full px-4 py-2.5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 ${
        selected ? "bg-tb text-white" : "bg-tg text-tx hover:bg-tg-2"
      } ${hint ? "rounded-[18px] py-2" : ""}`}
    >
      <span className="text-[15px] font-semibold leading-tight">{label}</span>
      {hint && (
        <span className={`mt-0.5 text-[12px] font-medium leading-tight ${selected ? "text-white/75" : "text-tx-3"}`}>
          {hint}
        </span>
      )}
    </motion.button>
  );
}

/** 수를 세는 스테퍼. 버튼을 누를 때마다 숫자가 위로 넘어갑니다. */
export function Stepper({
  value,
  onChange,
  min,
  max,
  step,
  unit,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const btn =
    "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-tx transition-colors duration-200 hover:bg-tb-soft hover:text-tb disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-tx focus:outline-none focus-visible:ring-2 focus-visible:ring-tb";
  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-tg p-1.5">
      <button type="button" onClick={() => onChange(clamp(value - step))} disabled={value <= min} className={btn} aria-label={`${label} 줄이기`}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M5 12h14" />
        </svg>
      </button>
      <div className="relative flex h-8 min-w-[5.5rem] items-baseline justify-center gap-1 overflow-hidden" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={value}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: EASE }}
            className="text-[22px] font-bold tabular-nums tracking-[-0.02em] text-tx"
          >
            {value.toLocaleString("ko-KR")}
          </motion.span>
        </AnimatePresence>
        <span className="text-[14px] font-semibold text-tx-2">{unit}</span>
      </div>
      <button type="button" onClick={() => onChange(clamp(value + step))} disabled={value >= max} className={btn} aria-label={`${label} 늘리기`}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

/** 알약 버튼. primary는 파랑, ghost는 회색 바탕. */
export function Pill({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "dark";
  disabled?: boolean;
  className?: string;
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[16px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";
  const look =
    variant === "primary"
      ? "bg-tb text-white hover:bg-tb-deep"
      : variant === "dark"
        ? "bg-tx text-white hover:bg-tk-2"
        : "bg-tg text-tx hover:bg-tg-2";
  if (href) {
    return (
      <a href={href} className={`${base} ${look} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${look} ${className}`}>
      {children}
    </button>
  );
}
