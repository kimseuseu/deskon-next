"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide inertial smooth scrolling (public pages only).
 * MotionConfig makes every framer-motion animation honor the
 * user's prefers-reduced-motion setting.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.11,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
          anchors: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
