"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { divisions } from "@/data/divisions";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function DivisionIndex() {
  const [active, setActive] = useState(0);

  return (
    <section id="divisions" className="border-t border-line bg-paper scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
        {/* Section head */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <Reveal>
            <p className="eyebrow text-muted">Our Divisions</p>
            <h2 className="mt-5 font-paperlogy text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-primary">
              다섯 개의 전문 분야
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-muted">
              장비의 도입부터 순환, 유통까지 —
              각 분야의 전문 조직이 자산의 전 주기를 책임집니다.
            </p>
          </Reveal>
        </div>

        {/* ── Desktop: interactive index + image panel ── */}
        <div className="hidden gap-16 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7">
            {divisions.map((d, i) => (
              <Link
                key={d.slug}
                href={d.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative block border-t border-line last:border-b"
              >
                <div className="flex items-center gap-8 py-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  <span
                    className={`font-serif text-base italic transition-colors duration-300 ${
                      active === i ? "text-accent-deep" : "text-muted/70"
                    }`}
                  >
                    {d.no}
                  </span>
                  <div className="flex flex-1 items-baseline gap-5">
                    <h3
                      className={`font-paperlogy text-[44px] font-light leading-none tracking-[-0.02em] transition-colors duration-300 ${
                        active === i ? "text-primary" : "text-primary/60"
                      }`}
                    >
                      {d.nameKo}
                    </h3>
                    <span
                      className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                        active === i ? "text-accent-deep" : "text-muted/70"
                      }`}
                    >
                      {d.nameEn}
                    </span>
                  </div>
                  <p
                    className={`hidden max-w-[220px] text-right text-[13px] leading-relaxed transition-all duration-500 xl:block ${
                      active === i ? "translate-x-0 opacity-100 text-muted" : "translate-x-2 opacity-0"
                    }`}
                  >
                    {d.keywords.join(" · ")}
                  </p>
                  <span
                    aria-hidden
                    className={`text-xl transition-all duration-500 ${
                      active === i ? "translate-x-0 opacity-100 text-accent-deep" : "-translate-x-3 opacity-0"
                    }`}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Sticky image panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {/* All five stay mounted — crossfade only, so no first-hover flash */}
                {divisions.map((d, i) => (
                  <motion.div
                    key={d.slug}
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                    transition={{ duration: 0.75, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={d.image}
                      alt={d.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                  </motion.div>
                ))}

                {/* Panel caption */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-7">
                  <div>
                    <p className="font-serif text-sm italic text-gold">{divisions[active].nameEn}</p>
                    <p className="mt-1.5 font-paperlogy text-xl font-medium text-cream">
                      {divisions[active].tagline}
                    </p>
                  </div>
                  <span className="pb-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                    View →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: editorial cards ── */}
        <Stagger className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:hidden" gap={0.12}>
          {divisions.map((d) => (
            <StaggerItem key={d.slug}>
              <Link href={d.href} className="group block">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 font-serif text-sm italic text-cream/90">
                    {d.no}
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-paperlogy text-[26px] font-light tracking-[-0.01em] text-primary">
                    {d.nameKo}
                    <span className="ml-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-deep">
                      {d.nameEn}
                    </span>
                  </h3>
                  <span aria-hidden className="text-lg text-accent-deep transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.tagline}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
