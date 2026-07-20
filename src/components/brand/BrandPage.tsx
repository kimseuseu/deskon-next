"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { brands, type Brand } from "@/data/brands";
import { divisions } from "@/data/divisions";
import Reveal, { LineReveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

/** 브랜드 마크: 로고 이미지가 있으면 이미지, 없으면 타이포그래픽 락업 */
function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo}
        alt={`${brand.name} ${brand.nameKo}`}
        width={299}
        height={100}
        className={className ?? "h-14 w-auto"}
      />
    );
  }
  return (
    <span className="flex items-baseline gap-3">
      <span className="font-paperlogy text-4xl font-semibold tracking-[0.04em] text-primary">
        {brand.name}
      </span>
      <span className="font-serif text-lg italic text-accent-deep">{brand.nameKo}</span>
    </span>
  );
}

export default function BrandPage({
  brand,
  children,
}: {
  brand: Brand;
  /** 브랜드별 쇼케이스 — Values와 Specialties 사이에 렌더링 */
  children?: ReactNode;
}) {
  const index = brands.findIndex((b) => b.slug === brand.slug);
  const prev = brands[(index - 1 + brands.length) % brands.length];
  const next = brands[(index + 1) % brands.length];
  const myDivisions = divisions.filter((d) => brand.services.includes(d.slug));

  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-paper pt-36 lg:pt-44">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Reveal direction="none" duration={0.7}>
            <p className="eyebrow text-muted">
              Brand {brand.no} — {brand.domainEn}
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
            <div className="lg:col-span-7">
              <LineReveal
                as="h1"
                className="font-paperlogy text-[clamp(2.8rem,7vw,6rem)] font-extralight leading-[1.08] tracking-[-0.025em] text-primary"
                lines={[
                  <>{brand.name}<span className="text-gold">.</span></>,
                ]}
              />
              <Reveal delay={0.15}>
                <p className="mt-5 font-paperlogy text-lg font-medium text-primary/80">
                  {brand.domain}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-3 font-serif text-xl italic text-accent-deep md:text-2xl">
                  {brand.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-muted">
                  {brand.description}
                </p>
              </Reveal>
            </div>

            {/* Brand card */}
            <div className="flex items-start lg:col-span-5 lg:justify-end">
              <Reveal delay={0.2} direction="none">
                {brand.siteUrl ? (
                  <a
                    href={brand.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-[280px] flex-col gap-8 border border-line bg-white px-10 py-9 transition-colors duration-400 hover:border-primary/40"
                  >
                    <BrandMark brand={brand} />
                    <span className="flex items-baseline justify-between gap-8">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                        {brand.siteUrl.replace(/^https?:\/\//, "")}
                      </span>
                      <span
                        aria-hidden
                        className="text-lg text-accent-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex min-w-[280px] flex-col gap-8 border border-line bg-white px-10 py-9">
                    <BrandMark brand={brand} />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted/70">
                      Official site — coming soon
                    </span>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>

        {/* Hero image — 없으면 타이포그래픽 잉크 밴드 */}
        {brand.heroImage ? (
          <Reveal direction="none" duration={1.2} amount={0.2}>
            <div className="relative">
              <Parallax strength={7} className="h-[46vh] min-h-[320px] md:h-[60vh]">
                <Image
                  src={brand.heroImage}
                  alt={brand.imageAlt}
                  fill
                  sizes="100vw"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                />
              </Parallax>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/25 bg-gradient-to-t from-ink/35 via-transparent to-ink/20"
              />
            </div>
          </Reveal>
        ) : (
          <Reveal direction="none" duration={1.2} amount={0.3}>
            <div className="relative overflow-hidden border-y border-white/5 bg-ink py-16 md:py-24">
              <p
                aria-hidden
                className="select-none whitespace-nowrap text-center font-serif text-[clamp(4rem,14vw,12rem)] italic leading-none text-gold/[0.13]"
              >
                {brand.name}
              </p>
              <p className="absolute inset-0 flex items-center justify-center font-paperlogy text-lg font-light tracking-[0.35em] text-cream/90 md:text-2xl">
                {brand.domain}
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── Values ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Stagger className="grid grid-cols-1 gap-x-10 md:grid-cols-3" gap={0.12}>
            {brand.values.map((v, i) => (
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

      {/* ── Specialties ── */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-muted">What {brand.name} Does</p>
              <h2 className="mt-5 font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary">
                전문 분야
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-xs pb-1 text-sm leading-relaxed text-muted">
                {brand.name}가 {brand.domain} 현장에서
                맡고 있는 영역입니다.
              </p>
            </Reveal>
          </div>

          <Stagger
            className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3"
            gap={0.06}
          >
            {brand.specialties.map((o, i) => (
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
        </div>
      </section>

      {/* ── 아오보 서비스 연결 ── */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-24">
          <Reveal>
            <p className="eyebrow text-muted">Services by AOVO</p>
            <h2 className="mt-5 font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
              {brand.name}는 아오보의 이 서비스로 만납니다
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {myDivisions.map((d) => (
              <StaggerItem key={d.slug} direction="none">
                <Link
                  href={d.href}
                  className="group flex items-baseline gap-4 border-t border-line py-5 pr-4 transition-colors duration-300"
                >
                  <span className="font-serif text-sm italic text-muted/70 transition-colors duration-300 group-hover:text-accent-deep">
                    {d.no}
                  </span>
                  <span>
                    <span className="block font-paperlogy text-lg font-medium text-primary/85 transition-colors duration-300 group-hover:text-primary">
                      {d.nameFull}
                    </span>
                    <span className="mt-0.5 block text-[11px] uppercase tracking-[0.16em] text-muted">
                      {d.nameEn}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto self-center text-accent-deep opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Site CTA ── */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                {brand.logo ? (
                  <div className="inline-block bg-white px-8 py-6">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} ${brand.nameKo}`}
                      width={299}
                      height={100}
                      className="h-12 w-auto"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-paperlogy text-[clamp(2.4rem,5vw,4rem)] font-extralight tracking-[0.04em]">
                      {brand.name}
                    </p>
                    <p className="mt-2 font-serif text-lg italic text-gold">{brand.nameKo}</p>
                  </div>
                )}
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-14">
              <Reveal delay={0.1}>
                {brand.siteUrl ? (
                  <>
                    <h2 className="font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.3] tracking-[-0.02em]">
                      더 많은 이야기가
                      <br />
                      기다리고 있습니다<span className="text-gold">.</span>
                    </h2>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/65">
                      실시간 재고와 상세 가격, 도입 사례는
                      {" "}{brand.name} 공식 사이트에서 바로 확인할 수 있습니다.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <a
                        href={brand.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 bg-gold px-9 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-ink transition-colors duration-400 hover:bg-cream"
                      >
                        {brand.siteUrl.replace(/^https?:\/\//, "")} 방문하기
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
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
                    <h2 className="font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.3] tracking-[-0.02em]">
                      {brand.name}에 대해
                      <br />더 깊이 알아보세요<span className="text-gold">.</span>
                    </h2>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/65">
                      {brand.name} 전문 사이트가 오픈을 준비하고 있습니다.
                      그 전에도 상담을 통해 도입 방안을 바로 안내받을 수 있습니다.
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

          {/* Prev / next brand */}
          <div className="mt-24 grid grid-cols-2 border-t border-white/10 pt-8">
            <Link href={prev.href} className="group flex flex-col gap-2 pr-6">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Prev</span>
              <span className="font-paperlogy text-xl font-light text-white/70 transition-colors duration-300 group-hover:text-cream md:text-2xl">
                <span aria-hidden className="mr-3 inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {prev.name}
              </span>
            </Link>
            <Link href={next.href} className="group flex flex-col items-end gap-2 border-l border-white/10 pl-6 text-right">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Next</span>
              <span className="font-paperlogy text-xl font-light text-white/70 transition-colors duration-300 group-hover:text-cream md:text-2xl">
                {next.name}
                <span aria-hidden className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
