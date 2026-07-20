"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 44 },
  down: { x: 0, y: -32 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Portion of the element that must be visible before revealing (0–1) */
  amount?: number;
  className?: string;
  once?: boolean;
}

/** Scroll-triggered reveal. Wraps children in a motion.div. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  amount = 0.25,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[direction];

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child reveal */
  gap?: number;
  delay?: number;
  amount?: number;
}

/** Parent that staggers direct <StaggerItem> children. */
export function Stagger({ children, className, gap = 0.09, delay = 0, amount = 0.2 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-masked headline reveal: each line slides up from behind an
 * overflow-hidden mask, in sequence. Pass one string per line.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        /* The observed element is the unclipped mask wrapper — observing the
           translated inner span would deadlock (it starts fully clipped, so
           it can never intersect the viewport). Variants propagate down. */
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "110%" },
              visible: {
                ...(reduce ? { opacity: 1 } : { y: 0 }),
                transition: { duration: 1.0, delay: delay + i * 0.12, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
