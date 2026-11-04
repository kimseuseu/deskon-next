"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { divisions, type Division } from "@/data/divisions";
import { brandsForDivision } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import CountUp from "@/components/motion/CountUp";

const PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]";
const SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]";

/**
 * 사업분야 소개 페이지의 공용 틀.
 *   첫 화면    라벨 · 제목 · 한 줄 · 설명 · 알약 버튼, 그 밑에 둥근 큰 사진.
 *   다른 점    회색 카드 셋.
 *   (children) 분야별 쇼케이스.
 *   주요 품목  회색 바탕에 흰 카드.
 *   진행 과정  번호가 든 회색 카드. 순서가 있는 내용이라 번호를 둡니다.
 *   브랜드     이 분야를 움직이는 브랜드.
 *   맺음       한 번 오는 어두운 장면. 숫자 하나와 버튼, 이전 · 다음 분야.
 */
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
      {/* ── 첫 화면 ── */}
      <section className="bg-white pt-32 text-tx lg:pt-40">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <Reveal direction="none" duration={0.6}>
            <p className="eyebrow justify-center">Division {division.no} · {division.nameEn}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-[1.12] tracking-[-0.04em]">{division.nameFull}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-[clamp(1.1rem,2vw,1.5rem)] font-bold tracking-[-0.02em] text-tb">{division.tagline}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] font-medium leading-[1.7] text-tx-2">{division.description}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/support/contact" className={`${PRIMARY} w-full sm:w-auto`}>
                상담 문의하기
              </Link>
              {division.siteUrl && (
                <a href={division.siteUrl} target="_blank" rel="noopener noreferrer" className={`${SECONDARY} w-full sm:w-auto`}>
                  공식 사이트
                  <span aria-hidden className="text-tb">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal direction="none" duration={1} amount={0.15}>
          <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:mt-16">
            <div className="overflow-hidden rounded-[32px] bg-tg">
              <Parallax strength={6} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
                <Image
                  src={division.heroImage}
                  alt={division.imageAlt}
                  fill
                  sizes="(min-width: 1400px) 1352px, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 다른 점 ── */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              {division.nameFull}, 이렇게 다릅니다.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            {division.values.map((v, i) => (
              <StaggerItem key={v.title} className="rounded-[24px] bg-tg p-7">
                <span className="font-serif text-[15px] italic text-tb">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em]">{v.title}</h3>
                <p className="mt-3 text-[15px] font-medium leading-[1.7] text-tx-2">{v.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {children}

      {/* ── 주요 품목 ── */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">주요 품목</h2>
            <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
              {`${division.nameFull}가 운영하는 대표 품목입니다.\n현장에 맞는 구성은 상담을 통해 제안합니다.`}
            </p>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.06}>
            {division.offerings.map((o) => (
              <StaggerItem key={o.name} className="flex min-h-[180px] flex-col rounded-[24px] bg-white p-6">
                <span className="text-[13px] font-semibold text-tx-3">{o.nameEn}</span>
                <h3 className="mt-5 text-[18px] font-bold tracking-[-0.02em]">{o.name}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{o.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {division.certifications && division.certifications.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {division.certifications.map((c) => (
                  <span key={c} className="rounded-full bg-tb-soft px-4 py-2 text-[14px] font-semibold text-tb">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 진행 과정 ── */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">진행 과정</h2>
          </Reveal>
          <Stagger
            className={`mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 ${
              division.process.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
            gap={0.08}
          >
            {division.process.map((step, i) => (
              <StaggerItem key={step.title} className="rounded-[24px] bg-tg p-6">
                <span className="font-serif text-[17px] italic text-tb">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 이 분야를 움직이는 브랜드 ── */}
      {myBrands.length > 0 && (
        <section className="bg-tg text-tx">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
            <Reveal className="text-center">
              <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">
                이 분야를 움직이는 브랜드
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.08}>
              {myBrands.map((b) => (
                <StaggerItem key={b.slug} className="h-full">
                  <Link
                    href={b.href}
                    className="group flex h-full flex-col rounded-[24px] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(25,31,40,0.08)]"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="text-[22px] font-bold tracking-[0.02em]">{b.name}</span>
                      <span className="text-[13px] font-semibold text-tx-3">{b.nameKo}</span>
                    </span>
                    <span className="mt-3 text-[14px] font-medium leading-relaxed text-tx-2">{b.domain}</span>
                    <span
                      aria-hidden
                      className="mt-auto grid h-9 w-9 place-items-center self-end rounded-full bg-tg pt-0 text-tb transition-colors duration-200 group-hover:bg-tb group-hover:text-white"
                    >
                      →
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── 맺음 ── */}
      <section className="bg-tk text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-paperlogy text-[clamp(3rem,7vw,5.8rem)] font-light leading-none tracking-[-0.03em]">
                  <CountUp value={statNumber} />
                  <span className="ml-1 font-serif text-[0.5em] italic text-tb-soft">{division.stat.suffix}</span>
                </p>
                <p className="mt-3 text-[17px] font-semibold text-white/65">{division.stat.label}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">
                  {division.nameFull}에 대해
                  <br />
                  더 깊이 알아보세요.
                </h2>
                <p className="mt-5 max-w-lg whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/65">
                  {division.siteUrl
                    ? `${division.nameFull} 전문 사이트에서 상세 요금과 품목, 도입 사례를 확인할 수 있습니다.`
                    : `${division.nameFull} 전문 사이트가 오픈을 준비하고 있습니다.\n그 전에도 상담을 통해 요금과 도입 방안을 바로 안내받을 수 있습니다.`}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {division.siteUrl ? (
                    <>
                      <a href={division.siteUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
                        공식 사이트
                        <span aria-hidden>↗</span>
                      </a>
                      <Link
                        href="/support/contact"
                        className="inline-flex items-center justify-center rounded-full bg-white/12 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98]"
                      >
                        상담 문의하기
                      </Link>
                    </>
                  ) : (
                    <Link href="/support/contact" className={PRIMARY}>
                      상담 문의하기
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* 이전 · 다음 분야 */}
          <div className="mt-20 grid grid-cols-2 gap-4">
            <Link href={prev.href} className="group rounded-[24px] bg-white/8 p-6 transition-colors duration-200 hover:bg-white/14">
              <span className="text-[13px] font-semibold text-white/50">이전</span>
              <span className="mt-2 flex items-center gap-2 text-[20px] font-bold tracking-[-0.02em] md:text-[24px]">
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                {prev.nameKo}
              </span>
            </Link>
            <Link href={next.href} className="group rounded-[24px] bg-white/8 p-6 text-right transition-colors duration-200 hover:bg-white/14">
              <span className="text-[13px] font-semibold text-white/50">다음</span>
              <span className="mt-2 flex items-center justify-end gap-2 text-[20px] font-bold tracking-[-0.02em] md:text-[24px]">
                {next.nameKo}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
