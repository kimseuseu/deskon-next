"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/components/motion/useMinimalMotion";

/**
 * Site-wide inertial smooth scrolling (public pages only).
 * MotionConfig makes every framer-motion animation honor the
 * user's prefers-reduced-motion setting, and on phones it always
 * drops transform/layout motion. Anchor links jump instead of glide there.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  return (
    <MotionConfig reducedMotion={mobile ? "always" : "user"}>
      <ReactLenis
        root
        options={{
          lerp: 0.11,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
          anchors: mobile ? { immediate: true } : true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
