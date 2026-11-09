"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./ui";

export interface StepMeta {
  key: string;
  label: string;
}

/**
 * 위쪽 진행 표시. 넓은 화면에서는 단계 이름이 한 줄로 서고 파란 알약이 지금 단계로
 * 미끄러집니다(layoutId). 전화기에서는 칸이 채워지는 막대와 «2 / 5 · 현장 정보»가 섭니다.
 * 지나온 단계는 눌러서 돌아갈 수 있습니다.
 */
export default function StepIndicator({
  steps,
  current,
  onJump,
}: {
  steps: StepMeta[];
  current: number;
  onJump: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <nav aria-label="문의 단계">
      {/* 넓은 화면 */}
      <ol className="hidden items-center gap-1 rounded-full bg-tg p-1 md:flex">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step.key} className="relative flex-1">
              {active && (
                <motion.span
                  layoutId="contact-step-pill"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_rgba(25,31,40,0.08)]"
                  aria-hidden
                />
              )}
              <button
                type="button"
                onClick={() => done && onJump(i)}
                disabled={!done && !active}
                aria-current={active ? "step" : undefined}
                className={`relative flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[14px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-tb ${
                  active ? "text-tx" : done ? "text-tx-2 hover:text-tx" : "text-tx-3"
                } ${done ? "cursor-pointer" : ""}`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold tabular-nums transition-colors duration-200 ${
                    active ? "bg-tb text-white" : done ? "bg-tx text-white" : "bg-white text-tx-3"
                  }`}
                >
                  {done ? (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="truncate">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* 전화기 */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-bold text-tx">{steps[current]?.label}</p>
          <p className="text-[13px] font-semibold tabular-nums text-tx-3">
            {current + 1} / {steps.length}
          </p>
        </div>
        <ol className="mt-3 flex gap-1.5" aria-hidden>
          {steps.map((step, i) => (
            <li key={step.key} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-tg-2">
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-tb"
                initial={false}
                animate={{ scaleX: i <= current ? 1 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
