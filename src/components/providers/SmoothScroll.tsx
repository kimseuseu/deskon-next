"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/components/motion/useMinimalMotion";

/**
 * Site-wide inertial smooth scrolling (public pages only).
 * MotionConfig makes every framer-motion animation honor the
 * user's prefers-reduced-motion setting. Phones keep interaction motion
 * (menus, dialogs, form steps); scroll choreography opts out on its own
 * via useMinimalMotion. Anchor links jump instead of glide on phones.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  return (
    <MotionConfig reducedMotion="user">
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
