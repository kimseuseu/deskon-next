"use client";

import Link from "next/link";
import { brands } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

export default function Brands() {
  return (
    <section id="brands" className="border-t border-line bg-paper scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow text-muted">Group Brands</p>
            <h2 className="mt-5 font-paperlogy text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-primary">
              현장마다, 전문 브랜드
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-muted">
              사무실부터 데이터센터, 공장, 물류센터까지 —
              네 개의 브랜드가 각자의 현장을 책임집니다.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line" gap={0.1}>
          {brands.map((b) => (
            <StaggerItem key={b.slug} direction="none" className="h-full">
              <Link
                href={b.href}
                className="group flex h-full min-h-[280px] flex-col justify-between border-b border-line px-1 py-8 transition-colors duration-400 hover:bg-surface/70 sm:border-b-0 lg:px-7"
              >
                <div>
                  <span className="font-serif text-sm italic text-accent-deep">{b.no}</span>
                  <p className="mt-6 font-paperlogy text-[28px] font-semibold tracking-[0.03em] text-primary">
                    {b.name}
                  </p>
                  <p className="mt-1 font-serif text-base italic text-muted">{b.nameKo}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-relaxed text-primary/75">
                    {b.domain}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted">
                    {b.specialties.slice(0, 3).map((s) => s.name).join(" · ")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-accent-deep">
                    View
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
