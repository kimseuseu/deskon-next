"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { divisions, type Division } from "@/data/divisions";
import { brandsForDivision } from "@/data/brands";
import Reveal, { LineReveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import CountUp from "@/components/motion/CountUp";

export default function DivisionPage({
  division,
  children,
}: {
  division: Division;
  /** Division-specific showcase, rendered between Values and Offerings */
  children?: ReactNode;
}) {
  const index = divisions.findIndex((d) => d.slug === division.slug);
  const prev = divisions[(index - 1 + divisions.length) % divisions.length];
  const next = divisions[(index + 1) % divisions.length];
  const statNumber = Number(division.stat.value.replace(/,/g, ""));
  const myBrands = brandsForDivision(division.slug);

  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-paper pt-36 lg:pt-44">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Reveal direction="none" duration={0.7}>
            <p className="eyebrow text-muted">
              Division {division.no} — {division.nameEn}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-10 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
            <div className="lg:col-span-7">
              <LineReveal
                as="h1"
                className="font-paperlogy text-[clamp(3rem,8vw,6.8rem)] font-extralight leading-[1.05] tracking-[-0.025em] text-primary"
                lines={[
                  <>{division.nameKo}<span className="text-gold">.</span></>,
                ]}
              />
              <Reveal delay={0.15}>
                <p className="mt-6 font-serif text-xl italic text-accent-deep md:text-2xl">
                  {division.tagline}
                </p>
              </Reveal>
            </div>
            <div className="flex items-end lg:col-span-5">
              <Reveal delay={0.25}>
                <p className="max-w-md text-[15px] leading-[1.9] text-muted">
                  {division.description}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <Reveal direction="none" duration={1.2} amount={0.2}>
          <div className="relative">
            <Parallax strength={7} className="h-[52vh] min-h-[360px] md:h-[68vh]">
              <Image
                src={division.heroImage}
                alt={division.imageAlt}
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </Parallax>
            {/* Ink scrim — settles the photo into the editorial palette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-ink/25 bg-gradient-to-t from-ink/35 via-transparent to-ink/20"
            />
          </div>
        </Reveal>
      </section>

      {/* ── Values ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Stagger className="grid grid-cols-1 gap-x-10 md:grid-cols-3" gap={0.12}>
            {division.values.map((v, i) => (
              <StaggerItem key={v.title} className="border-t border-primary/20 py-8">
                <span className="font-serif text-sm italic text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-paperlogy text-[22px] font-medium tracking-[-0.01em] text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-muted">{v.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {children}

      {/* ── Offerings ── */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-muted">What We Operate</p>
              <h2 className="mt-5 font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary">
                주요 품목
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-xs pb-1 text-sm leading-relaxed text-muted">
                {division.nameFull}가 운영하는 대표 품목입니다.
                현장에 맞는 구성은 상담을 통해 제안합니다.
              </p>
            </Reveal>
          </div>

          <Stagger
            className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4"
            gap={0.06}
          >
            {division.offerings.map((o, i) => (
              <StaggerItem
                key={o.name}
                direction="none"
                className="group relative flex min-h-[190px] flex-col justify-between border-b border-r border-line bg-paper p-7 transition-colors duration-400 hover:bg-ink"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-[13px] italic text-muted transition-colors duration-400 group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted transition-colors duration-400 group-hover:text-white/60">
                    {o.nameEn}
                  </span>
                </div>
                <div>
                  <h3 className="font-paperlogy text-xl font-medium text-primary transition-colors duration-400 group-hover:text-cream">
                    {o.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted transition-colors duration-400 group-hover:text-white/60">
                    {o.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* 인증 · 검증 요소 */}
          {division.certifications && division.certifications.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Certified
                </span>
                {division.certifications.map((c, i) => (
                  <span key={c} className="flex items-baseline gap-6">
                    {i > 0 && <span aria-hidden className="block h-1 w-1 -translate-y-0.5 rotate-45 bg-gold/70" />}
                    <span className="text-[13px] font-medium text-primary/75">{c}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 진행 과정 ── */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-muted">How It Works</p>
              <h2 className="mt-5 font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
                진행 과정
              </h2>
            </Reveal>
          </div>
          <Stagger
            className={`grid grid-cols-1 gap-x-8 sm:grid-cols-2 ${
              division.process.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
            gap={0.1}
          >
            {division.process.map((step, i) => (
              <StaggerItem key={step.title} className="border-t border-primary/20 py-6">
                <span className="font-serif text-sm italic text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-paperlogy text-lg font-medium text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 이 분야를 움직이는 브랜드 ── */}
      {myBrands.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="eyebrow text-muted">Brands in This Division</p>
                <h2 className="mt-5 font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
                  이 분야를 움직이는 브랜드
                </h2>
              </Reveal>
            </div>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
              {myBrands.map((b) => (
                <StaggerItem key={b.slug} direction="none">
                  <Link
                    href={b.href}
                    className="group flex h-full flex-col gap-6 border-t border-primary/20 py-6 pr-4"
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span className="font-paperlogy text-2xl font-semibold tracking-[0.04em] text-primary">
                        {b.name}
                      </span>
                      <span className="font-serif text-sm italic text-accent-deep">{b.nameKo}</span>
                    </span>
                    <span className="mt-auto flex items-baseline justify-between gap-4">
                      <span className="text-[13px] leading-relaxed text-muted">{b.domain}</span>
                      <span
                        aria-hidden
                        className="text-accent-deep opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Site CTA ── */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-white/55">{division.nameEn}</p>
                <p className="mt-8 font-paperlogy text-[clamp(3rem,6vw,5rem)] font-extralight leading-none tracking-[-0.02em]">
                  <CountUp value={statNumber} />
                  <span className="ml-1 font-serif text-[0.5em] italic text-gold">
                    {division.stat.suffix}
                  </span>
                </p>
                <p className="mt-3 text-sm text-white/65">{division.stat.label}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-14">
              <Reveal delay={0.1}>
                <h2 className="font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.3] tracking-[-0.02em]">
                  {division.nameFull}에 대해
                  <br />더 깊이 알아보세요<span className="text-gold">.</span>
                </h2>

                {division.siteUrl ? (
                  <>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
                      {division.nameFull} 전문 사이트에서 상세 요금과 품목,
                      도입 사례를 확인할 수 있습니다.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <a
                        href={division.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-gold px-9 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-ink transition-colors duration-400 hover:bg-cream"
                      >
                        공식 사이트 방문
                        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                      </a>
                      <Link
                        href="/support/contact"
                        className="inline-flex items-center gap-3 border border-white/30 px-9 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-colors duration-400 hover:border-cream"
                      >
                        상담 문의
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
                      {division.nameFull} 전문 사이트가 오픈을 준비하고 있습니다.
                      그 전에도 상담을 통해 요금과 도입 방안을 바로 안내받을 수 있습니다.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                      <Link
                        href="/support/contact"
                        className="group inline-flex items-center gap-3 bg-cream px-9 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-ink transition-colors duration-400 hover:bg-gold"
                      >
                        상담 문의하기
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                      <span className="font-serif text-sm italic text-white/60">
                        Official site — coming soon
                      </span>
                    </div>
                  </>
                )}
              </Reveal>
            </div>
          </div>

          {/* Prev / next division */}
          <div className="mt-24 grid grid-cols-2 border-t border-white/10 pt-8">
            <Link href={prev.href} className="group flex flex-col gap-2 pr-6">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Prev</span>
              <span className="font-paperlogy text-xl font-light text-white/70 transition-colors duration-300 group-hover:text-cream md:text-2xl">
                <span aria-hidden className="mr-3 inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {prev.nameKo}
              </span>
            </Link>
            <Link href={next.href} className="group flex flex-col items-end gap-2 border-l border-white/10 pl-6 text-right">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Next</span>
              <span className="font-paperlogy text-xl font-light text-white/70 transition-colors duration-300 group-hover:text-cream md:text-2xl">
                {next.nameKo}
                <span aria-hidden className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
