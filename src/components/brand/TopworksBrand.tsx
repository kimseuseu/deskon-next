"use client";

import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/data/brands";
import type { CSSProperties } from "react";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

/**
 * 탑웍스. 사이트는 하늘색 판 위에 거대한 글자 두 줄, 그 가운데 한 글자만
 * 주홍, 오른쪽에 주황 천막 포장마차 사진 기둥, 품목이 흐르는 띠, 그리고
 * 장비에 리벳으로 박은 명판 같은 거래 조건표입니다. 공장의 문법입니다.
 */
const SKY = "#d8e5ed";
const ORANGE = "#e64a12";
const VOID = "#121316";
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.1}s` });

export function TopworksHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32" style={{ backgroundColor: SKY }}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <p
          className="rise flex items-center gap-4 text-[12px] font-bold tracking-[0.22em] text-[#4b4f55]"
          style={{ ...step(0), fontFamily: "var(--font-syne), sans-serif" }}
        >
          <Image src={brand.logo!} alt="" aria-hidden width={40} height={40} className="h-8 w-8" />
          TOPWORKS
        </p>

        <div className="relative mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="relative z-10 lg:col-span-8">
            {/* 첫 화면은 스크롤 없이 완성되어야 하므로 보이면 재생하는 방식이 아니라
                페이지가 열릴 때 한 줄씩 올라오는 방식입니다(FilmHero와 같은 .rise). */}
            <h1 className="font-paperlogy text-[clamp(3.4rem,11vw,10.5rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#101113]">
              <span className="rise block" style={step(1)}>
                우리는
              </span>
              <span className="rise block" style={step(2)}>
                <span style={{ color: ORANGE }}>다</span> 만듭니다
              </span>
            </h1>
            <p className="rise mt-8 max-w-xl text-[15px] leading-[1.9] text-[#1d1f23] md:text-base" style={step(3)}>
              {brand.description}
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
              <a
                href={brand.siteUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 font-paperlogy text-[13px] font-bold tracking-[0.1em] text-white transition-transform duration-200 ease-out hover:-translate-y-0.5"
                style={{ backgroundColor: "#cc3d0c" }}
              >
                topworks.kr에서 견적 문의
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
              <Link
                href="/support/contact"
                className="inline-flex items-center border border-[#101113]/30 px-8 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.1em] text-[#101113] transition-colors duration-300 hover:border-[#101113]"
              >
                상담 문의
              </Link>
            </div>
          </div>

          {/* 사진 기둥. 넓은 화면에서 둘째 줄 글자가 이 위로 넘어갑니다. */}
          <div className="rise lg:col-span-4 lg:-ml-24" style={step(2)}>
            <Parallax strength={6} className="aspect-[2/3] w-full">
              <Image
                src="/images/brands/topworks/pocha-portrait.webp"
                alt="주황 천막을 올린 이동식 포장마차"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

const items = ["포장마차", "꽃마차", "통닭기계", "특수주방집기", "주얼리 쇼케이스", "명품 쇼케이스", "팝업스토어 집기", "특수전시집기", "식재료 · 주방집기 제공", "단기임대", "사후관리"];

/** 품목 띠. 두 번 이어 붙여 끝없이 흐릅니다. */
function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="ticker mt-14 overflow-hidden border-y border-[#101113]/20 py-4" aria-label="취급 품목">
      <div className="ticker-track flex w-max items-center">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-paperlogy text-[15px] font-semibold tracking-[-0.01em] text-[#101113]" aria-hidden={i >= items.length}>
            {t}
            <span aria-hidden className="block h-1.5 w-1.5 rotate-45" style={{ backgroundColor: ORANGE }} />
          </span>
        ))}
      </div>
    </div>
  );
}

const plate = [
  { k: "최소 수량", v: "1대", note: "시험 제작도 받습니다" },
  { k: "치수", v: "요청 치수", note: "규격품이 아니라 실측 제작입니다" },
  { k: "로고 인쇄", v: "무료", note: "브랜드 로고와 맞춤 디자인" },
  { k: "배송 · 설치", v: "전국", note: "설치까지 한 번에 끝냅니다" },
  { k: "단기임대", v: "필요한 기간만", note: "행사와 팝업처럼 기간이 정해진 일" },
  { k: "사후관리", v: "설치 뒤에도", note: "쓰시는 동안 고치고 손보는 것까지" },
];

const photos = [
  { src: "/images/brands/topworks/macha-side-orange.webp", alt: "주황 천막 이동식 마차 측면", label: "마차 · 포장마차", span: "lg:col-span-5" },
  { src: "/images/brands/topworks/roaster-front.webp", alt: "통닭 로스터 정면", label: "통닭기계", span: "lg:col-span-4" },
  { src: "/images/brands/topworks/counter-bright.webp", alt: "스테인리스 카운터", label: "업소용 맞춤 집기", span: "lg:col-span-3" },
];

/** 거래 조건 명판과 현장 사진. */
export function TopworksPlate() {
  return (
    <>
      <section className="bg-[#101113] text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-32">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[12px] font-bold tracking-[0.22em]" style={{ color: ORANGE, fontFamily: "var(--font-syne), sans-serif" }}>
                PLATE
              </p>
              <h2 className="mt-4 font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                거래 조건
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.9] text-white/65">공장이 안 받아 주는 수량, 여기서 받습니다.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            {/* 명판. 네 귀퉁이의 리벳이 이 블록을 장비에 붙입니다. */}
            <div className="relative border border-white/20 p-7 lg:p-10" style={{ backgroundColor: VOID }}>
              {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos) => (
                <span key={pos} aria-hidden className={`absolute h-2 w-2 rounded-full bg-white/40 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)] ${pos}`} />
              ))}
              <Stagger className="divide-y divide-white/12" gap={0.08}>
                {plate.map((r) => (
                  <StaggerItem key={r.k} direction="none" className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[9rem_1fr_1fr]">
                    <span className="text-[13px] font-medium tracking-[0.04em] text-white/55">{r.k}</span>
                    <span className="font-paperlogy text-xl font-bold tracking-[-0.02em] sm:text-2xl" style={{ color: ORANGE }}>
                      {r.v}
                    </span>
                    <span className="col-span-2 text-[13px] leading-relaxed text-white/60 sm:col-span-1">{r.note}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ backgroundColor: SKY }}>
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12" gap={0.1}>
            {photos.map((p) => (
              <StaggerItem key={p.src} className={`group sm:col-span-1 ${p.span}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#c2d5e1]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 font-paperlogy text-[15px] font-bold tracking-[-0.02em] text-[#101113]">{p.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
