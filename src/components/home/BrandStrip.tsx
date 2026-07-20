"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BrandStrip() {
  return (
    <section className="relative">
      <Parallax strength={8} className="h-[68vh] min-h-[440px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- parallax layer needs a plain element */}
        <img
          src="/images/aovo-living.webp"
          alt="아오보가 운영하는 워크스페이스"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 bg-ink/45" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-serif text-xl italic text-gold md:text-2xl"
          >
            Focus on your business —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
            className="mt-4 max-w-2xl font-paperlogy text-[clamp(1.9rem,4.5vw,3.6rem)] font-light leading-[1.25] tracking-[-0.02em] text-cream"
          >
            기업은 본업에 집중하고,
            <br />
            장비는 아오보가 운영합니다.
          </motion.h2>
          <Reveal delay={0.3}>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 border border-white/50 px-7 py-3.5 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-all duration-400 hover:border-cream hover:bg-cream hover:text-primary"
            >
              아오보 그룹 이야기
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
