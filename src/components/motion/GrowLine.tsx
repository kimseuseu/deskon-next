"use client";

import { motion, useReducedMotion } from "framer-motion";

/** 화면에 들어오면 왼쪽에서 오른쪽으로 그어지는 가는 선. 섹션 머리 밑에 둡니다. */
export default function GrowLine({ className = "bg-tg-2", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`block h-px w-full origin-left ${className}`}
    />
  );
}
