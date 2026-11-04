"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { brands, type Brand } from "@/data/brands";
import { divisions } from "@/data/divisions";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

const PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]";
const SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]";

/** 브랜드 마크: 로고 이미지가 있으면 흰 판 위의 이미지, 없으면 글자 락업 */
function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  if (brand.logo) {
    return (
      <span className={`inline-flex h-16 items-center rounded-2xl bg-white px-6 ${className ?? ""}`}>
        <Image src={brand.logo} alt={`${brand.name} ${brand.nameKo}`} width={299} height={100} className="h-8 w-auto" />
      </span>
    );
  }
  return (
    <span className={`inline-flex h-16 items-baseline gap-2 rounded-2xl bg-white px-6 ${className ?? ""}`}>
      <span className="self-center text-[26px] font-bold tracking-[0.02em] text-tx">{brand.name}</span>
      <span className="self-center text-[14px] font-semibold text-tx-3">{brand.nameKo}</span>
    </span>
  );
}

/**
 * 브랜드 소개 페이지의 공용 틀.
 *   첫 화면    라벨 · 이름 · 담당 분야 · 한 줄 · 설명 · 알약 버튼, 그 밑에 둥근 큰 사진(없으면 어두운 띠).
 *   다른 점    회색 카드 셋.
 *   (children) 브랜드별 쇼케이스.
 *   전문 분야  회색 바탕에 흰 카드.
 *   서비스     이 브랜드가 움직이는 아오보 서비스.
 *   맺음       한 번 오는 어두운 장면. 로고와 버튼, 이전 · 다음 브랜드.
 */
export default function BrandPage({
  brand,
  hero,
  children,
}: {
  brand: Brand;
  /** 브랜드 사이트의 얼굴을 옮긴 첫 화면. 주면 공용 첫 화면을 대신합니다. */
  hero?: ReactNode;
  /** 브랜드별 쇼케이스. 다른 점과 전문 분야 사이에 렌더링 */
  children?: ReactNode;
}) {
  const index = brands.findIndex((b) => b.slug === brand.slug);
  const prev = brands[(index - 1 + brands.length) % brands.length];
  const next = brands[(index + 1) % brands.length];
  const myDivisions = divisions.filter((d) => brand.services.includes(d.slug));
  const site = brand.siteUrl?.replace(/^https?:\/\//, "").replace(/^www\./, "");

  return (
    <>
      {hero ?? (
        <section className="bg-white pt-32 text-tx lg:pt-40">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <Reveal direction="none" duration={0.6}>
              <p className="eyebrow justify-center">Brand {brand.no} · {brand.nameKo}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[clamp(2.4rem,6.5vw,5.2rem)] font-bold leading-[1.1] tracking-[-0.03em]">{brand.name}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-[clamp(1.1rem,2vw,1.5rem)] font-bold tracking-[-0.02em] text-tb">{brand.domain}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
                {`${brand.tagline}\n${brand.description}`}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {brand.siteUrl ? (
                  <a href={brand.siteUrl} target="_blank" rel="noopener noreferrer" className={`${PRIMARY} w-full sm:w-auto`}>
                    {site} 방문하기
                    <span aria-hidden>↗</span>
                  </a>
                ) : (
                  <span className={`${SECONDARY} w-full cursor-default text-tx-3 hover:bg-tg sm:w-auto`}>공식 사이트 오픈 준비중</span>
                )}
                <Link href="/support/contact" className={`${brand.siteUrl ? SECONDARY : PRIMARY} w-full sm:w-auto`}>
                  상담 문의하기
                </Link>
              </div>
            </Reveal>
          </div>

          {brand.heroImage ? (
            <Reveal direction="none" duration={1} amount={0.15}>
              <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:mt-16">
                <div className="overflow-hidden rounded-[32px] bg-tg">
                  <Parallax strength={6} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
                    <Image
                      src={brand.heroImage}
                      alt={brand.imageAlt}
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
          ) : (
            <Reveal direction="none" duration={1} amount={0.3}>
              <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:mt-16">
                <div className="flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[32px] bg-tk px-6 py-20 text-center text-white md:py-28">
                  <p className="text-[clamp(2.6rem,9vw,8rem)] font-bold leading-none tracking-[-0.04em]">{brand.name}</p>
                  <p className="text-[clamp(1rem,1.6vw,1.3rem)] font-semibold text-white/65">{brand.domain}</p>
                </div>
              </div>
            </Reveal>
          )}
        </section>
      )}

      {/* ── 다른 점 ── */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              {brand.name}, 이렇게 다릅니다.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            {brand.values.map((v, i) => (
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

      {/* ── 전문 분야 ── */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">전문 분야</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] font-medium leading-[1.7] text-tx-2">
              {brand.name}가 {brand.domain} 현장에서 맡고 있는 영역입니다.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3" gap={0.06}>
            {brand.specialties.map((o) => (
              <StaggerItem key={o.name} className="flex min-h-[180px] flex-col rounded-[24px] bg-white p-6">
                <span className="text-[13px] font-semibold text-tx-3">{o.nameEn}</span>
                <h3 className="mt-5 text-[18px] font-bold tracking-[-0.02em]">{o.name}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{o.detail}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 아오보 서비스 연결 ── */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              {brand.name}는 아오보의 이 서비스로 만납니다.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.08}>
            {myDivisions.map((d) => (
              <StaggerItem key={d.slug} className="h-full">
                <Link
                  href={d.href}
                  className="group flex h-full flex-col rounded-[24px] bg-tg p-6 transition-colors duration-300 hover:bg-tg-2"
                >
                  <span className="text-[13px] font-semibold text-tx-3">{d.nameEn}</span>
                  <span className="mt-4 text-[20px] font-bold tracking-[-0.02em]">{d.nameFull}</span>
                  <span className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{d.tagline}</span>
                  <span
                    aria-hidden
                    className="mt-6 grid h-9 w-9 place-items-center self-end rounded-full bg-white text-tb transition-colors duration-200 group-hover:bg-tb group-hover:text-white"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 맺음 ── */}
      <section className="bg-tk text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <BrandMark brand={brand} />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">
                  {brand.siteUrl ? (
                    <>
                      더 많은 이야기가
                      <br />
                      기다리고 있습니다.
                    </>
                  ) : (
                    <>
                      {brand.name}에 대해
                      <br />
                      더 깊이 알아보세요.
                    </>
                  )}
                </h2>
                <p className="mt-5 max-w-lg whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/65">
                  {brand.siteUrl
                    ? `실시간 재고와 상세 가격, 도입 사례는 ${brand.name} 공식 사이트에서 바로 확인할 수 있습니다.`
                    : `${brand.name} 전문 사이트가 오픈을 준비하고 있습니다.\n그 전에도 상담을 통해 도입 방안을 바로 안내받을 수 있습니다.`}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {brand.siteUrl ? (
                    <>
                      <a href={brand.siteUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
                        {site} 방문하기
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

          <div className="mt-20 grid grid-cols-2 gap-4">
            <Link href={prev.href} className="group rounded-[24px] bg-white/8 p-6 transition-colors duration-200 hover:bg-white/14">
              <span className="text-[13px] font-semibold text-white/50">이전</span>
              <span className="mt-2 flex items-center gap-2 text-[20px] font-bold tracking-[-0.01em] md:text-[24px]">
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                {prev.name}
              </span>
            </Link>
            <Link href={next.href} className="group rounded-[24px] bg-white/8 p-6 text-right transition-colors duration-200 hover:bg-white/14">
              <span className="text-[13px] font-semibold text-white/50">다음</span>
              <span className="mt-2 flex items-center justify-end gap-2 text-[20px] font-bold tracking-[-0.01em] md:text-[24px]">
                {next.name}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
