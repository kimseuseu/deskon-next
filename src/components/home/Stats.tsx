"use client";

import { groupStats, network } from "@/data/divisions";
import CountUp from "@/components/motion/CountUp";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

export default function Stats() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <Reveal>
            <p className="eyebrow text-white/55">AOVO in Numbers</p>
            <h2 className="mt-5 font-paperlogy text-[clamp(1.9rem,3.8vw,3.2rem)] font-light leading-[1.2] tracking-[-0.02em]">
              숫자가 말하는 <span className="font-serif italic text-gold">신뢰</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs pb-1 text-sm leading-relaxed text-white/65">
              2015년부터 지금까지, 아오보 그룹이
              현장에서 쌓아온 운영의 기록입니다.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {groupStats.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              className={`border-t border-white/15 py-9 lg:py-10 ${
                i % 2 === 1 ? "border-l border-l-white/10 pl-7" : "pr-4"
              } lg:pl-8 lg:pr-0 lg:border-l lg:border-l-white/10 lg:first:border-l-0 lg:first:pl-1`}
            >
              <p className="whitespace-nowrap font-paperlogy text-[clamp(1.9rem,9vw,4.2rem)] font-extralight leading-none tracking-[-0.02em]">
                <CountUp value={stat.value} />
                <span className="ml-1 font-serif text-[0.55em] italic text-gold">{stat.suffix}</span>
              </p>
              <p className="mt-4 font-paperlogy text-sm font-medium text-white/80">{stat.label}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">
                {stat.labelEn}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* 전국 물류거점 네트워크 */}
        <Reveal delay={0.15}>
          <div className="mt-4 flex flex-col gap-4 border-t border-white/15 pt-7 md:flex-row md:items-baseline md:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="mr-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
                Nationwide
              </span>
              {network.regions.map((r, i) => (
                <span key={r} className="flex items-baseline gap-5">
                  {i > 0 && <span aria-hidden className="block h-1 w-1 -translate-y-0.5 rotate-45 bg-gold/60" />}
                  <span className="font-paperlogy text-sm font-medium text-white/80">{r}</span>
                </span>
              ))}
            </div>
            <p className="font-serif text-sm italic text-gold">{network.sla}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
