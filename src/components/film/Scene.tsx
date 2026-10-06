"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useScroll } from "framer-motion";

/**
 * 장면이 진행도를 재는 두 가지 방식.
 *
 *   pin    장면의 위가 화면 위에 닿을 때 0, 아래가 화면 아래에 닿을 때 1.
 *          안쪽 무대(.stage)가 화면에 붙어 있는 동안입니다.
 *   enter  장면의 위가 화면 아래에서 들어올 때 0, 화면 위에 닿을 때 1.
 *          고정하지 않고, 다가오는 동안만 움직입니다.
 */
const OFFSET = {
  pin: ["start start", "end end"],
  enter: ["start end", "start start"],
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  mode?: keyof typeof OFFSET;
  style?: CSSProperties;
  "aria-label"?: string;
};

/**
 * 필름의 한 장면. 하는 일은 하나입니다. 스크롤 진행도를 0에서 1 사이의
 * 숫자로 재서 `--p`에 적습니다. 그 아래의 움직임은 전부 CSS가 그 숫자에서
 * 계산합니다(globals.css의 「필름」).
 *
 * 스크롤 자체는 Lenis가 이미 부드럽게 보간하므로 여기서 스프링을 한 번 더
 * 두지 않습니다. 장면 안쪽은 서버 컴포넌트로 남습니다.
 */
export function Scene({ children, className = "", mode = "pin", style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...OFFSET[mode]],
  });

  return (
    <motion.section
      ref={ref}
      className={`scene ${className}`}
      style={{ ...style, "--p": scrollYProgress } as never}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
