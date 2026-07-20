"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Subtle scroll parallax. The inner layer is oversized by `strength * 2`
 * and drifts as the frame crosses the viewport, so edges never show.
 */
export default function Parallax({
  children,
  strength = 7,
  className,
}: {
  children: ReactNode;
  /** Drift as a percentage of the frame height (4–10 looks right) */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  if (reduce) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y, height: `${100 + strength * 2}%`, top: `-${strength}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
