"use client";

import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/data/brands";
import type { CSSProperties } from "react";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

/**
 * 탑웍스. 흰 바탕에 굵은 글자 두 줄, 그 가운데 한 글자만 파랑, 오른쪽에
 * 주황 천막 포장마차 사진 한 장, 품목이 흐르는 알약 띠, 그리고 거래 조건
 * 카드 여섯입니다. 사진의 주황은 그대로 두고 나머지 색은 모두 공통 토큰입니다.
 */
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.1}s` });

/** 리드 문단은 문장 하나가 한 줄입니다. 카피는 그대로, 줄만 나눕니다. */
const lines = (s: string) => s.replace(/\.\s+/g, ".\n");

export function TopworksHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative overflow-hidden bg-white pt-28 text-tx lg:pt-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="rise" style={step(0)}>
          <span className="inline-flex items-center gap-2 rounded-full bg-tg px-3 py-1.5 text-[13px] font-semibold text-tx">
            <Image src={brand.logo!} alt="" aria-hidden width={40} height={40} className="h-5 w-5" />
            TOPWORKS
          </span>
        </p>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/* 첫 화면은 스크롤 없이 완성되어야 하므로 보이면 재생하는 방식이 아니라
                페이지가 열릴 때 한 줄씩 올라오는 방식입니다(FilmHero와 같은 .rise). */}
            <h1 className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[1.08] tracking-[-0.04em] text-tx">
              <span className="rise block" style={step(1)}>
                우리는
              </span>
              <span className="rise block" style={step(2)}>
                <span className="text-tb">다</span> 만듭니다
              </span>
            </h1>
            <p className="rise mt-7 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2" style={step(3)}>
              {lines(brand.description)}
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
              <a
                href={brand.siteUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
              >
                topworks.kr에서 견적 문의
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]"
              >
                상담 문의
              </Link>
            </div>
          </div>

          {/* 사진 한 장. 둥근 액자 안에서 천천히 흐릅니다. */}
          <div className="rise lg:col-span-5" style={step(2)}>
            <Parallax strength={6} className="aspect-[4/5] w-full rounded-[32px] bg-tg">
              <Image
                src="/images/brands/topworks/pocha-portrait.webp"
                alt="주황 천막을 올린 이동식 포장마차"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
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
    <div className="mx-auto mt-14 max-w-[1200px] px-6 pb-20 lg:pb-28">
      <div className="ticker overflow-hidden rounded-full bg-tg py-4" aria-label="취급 품목">
        <div className="ticker-track flex w-max items-center">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 text-[15px] font-semibold tracking-[-0.01em] text-tx" aria-hidden={i >= items.length}>
              {t}
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-tb" />
            </span>
          ))}
        </div>
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

/** 거래 조건 카드 여섯과 현장 사진 셋. */
export function TopworksPlate() {
  return (
    <>
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              거래 조건
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] font-medium leading-[1.7] text-tx-2">공장이 안 받아 주는 수량, 여기서 받습니다.</p>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3" gap={0.08}>
            {plate.map((r) => (
              <StaggerItem key={r.k} className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <p className="text-[13px] font-semibold text-tx-3">{r.k}</p>
                <p className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-tb">{r.v}</p>
                <p className="mt-3 text-[14px] font-medium leading-relaxed text-tx-2">{r.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-36">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12" gap={0.1}>
            {photos.map((p) => (
              <StaggerItem key={p.src} className={`group sm:col-span-1 ${p.span}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-tg">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[18px] font-bold tracking-[-0.02em]">{p.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
