"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

/**
 * Shared light editorial page hero — keeps secondary pages (about,
 * support, legal) in the same grammar as the division intros.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper pt-36 pb-14 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal direction="none" duration={0.7}>
          <p className="eyebrow text-muted">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-7 font-paperlogy text-[clamp(2.4rem,6vw,4.4rem)] font-extralight leading-[1.12] tracking-[-0.02em] text-primary">
            {title}
            <span className="text-gold">.</span>
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-muted">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
