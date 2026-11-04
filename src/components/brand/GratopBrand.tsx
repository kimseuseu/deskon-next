import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Brand } from "@/data/brands";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 그라탑. 흰 바탕, 굵은 제목, 파랑 한 낱말, 그리고 재질 네 장
 * (보양판 · 고무 · 잔디 · 야자)이 스크롤에 맞춰 차례로 올라와 바닥을
 * 덮는 장면입니다. 필름 메커니즘은 그대로 두고 색과 모양만 바꿨습니다.
 */
const dy = (from: number, to: number, d: string): CSSProperties => ({ ...span(from, to), "--dy": d }) as CSSProperties;
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.09}s` });

/** 리드 문단은 문장 하나가 한 줄입니다. 카피는 그대로, 줄만 나눕니다. */
const lines = (s: string) => s.replace(/\.\s+/g, ".\n");

export function GratopHero({ brand }: { brand: Brand }) {
  return (
    <section className="bg-white pt-28 text-tx lg:pt-32">
      <div className="mx-auto max-w-[1200px] px-6 pb-14 lg:pb-16">
        <p className="rise" style={step(0)}>
          <span className="inline-flex items-center gap-2 rounded-full bg-tb-soft px-3 py-1 text-[13px] font-semibold text-tb">
            GRATOP
            <span className="font-medium">그라탑</span>
          </span>
        </p>
        <h1
          className="rise mt-6 text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-tx"
          style={step(1)}
        >
          바닥은 그라탑이
          <br />
          <span className="text-tb">덮습니다</span>.
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="rise max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2 lg:col-span-7" style={step(2)}>
            {lines(brand.description)}
          </p>
          <div className="rise flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end" style={step(3)}>
            <a
              href={brand.siteUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
            >
              gratop.kr에서 견적 요청
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
      </div>

      <MaterialsFilm />
    </section>
  );
}

const materials = [
  { name: "바닥보양재", latin: "Ground mat", use: "트랙 · 잔디 · 흙바닥 위로 차량과 사람이 지나는 동안", image: "/images/brands/gratop/tex-guard.webp" },
  { name: "고무롤매트", latin: "Rubber roll mat", use: "장비 동선, 미끄럼 방지, 충격 흡수", image: "/images/brands/gratop/tex-rubber.webp" },
  { name: "인조잔디", latin: "Turf", use: "행사장과 전시장 바닥 연출", image: "/images/brands/gratop/tex-turf.webp" },
  { name: "야자매트", latin: "Coir mat", use: "야외 동선과 공사장 출입구", image: "/images/brands/gratop/tex-coir.webp" },
];

/** 재질 네 장이 스크롤에 맞춰 왼쪽부터 차례로 올라와 바닥을 덮습니다. */
function MaterialsFilm() {
  return (
    <Scene mode="enter" aria-label="네 가지 재질">
      <div className="mx-auto max-w-[1400px] px-6">
        <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {materials.map((m, i) => {
            const a = 0.15 + i * 0.14;
            return (
              <li key={m.name} className="cue-in" style={dy(a, a + 0.3, "6rem")}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-tg">
                  <Image
                    src={m.image}
                    alt={`${m.name} 질감`}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-[18px] font-bold tracking-[-0.02em] text-tx">{m.name}</p>
                <p className="mt-1 text-[14px] font-medium leading-relaxed text-tx-2">{m.use}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="h-20 lg:h-28" />
    </Scene>
  );
}

const flow = [
  { name: "배송", note: "현장으로 자재 운반" },
  { name: "시공", note: "펼치고 고정" },
  { name: "사용", note: "행사 기간 동안" },
  { name: "회수", note: "철거와 반납" },
];

const sites = [
  { name: "행사장", body: "무대 뒤 동선과 관객석 바닥. 하루 이틀 쓰고 걷는 임대가 많습니다.", image: "/images/brands/gratop/rental-warehouse.webp" },
  { name: "공사장", body: "마감된 바닥 위로 자재와 장비가 지납니다. 보양재를 사서 두고 씁니다.", image: "/images/brands/gratop/site-construction.webp" },
  { name: "전시장", body: "부스 바닥 연출. 인조잔디와 로고 매트를 주문제작합니다.", image: "/images/brands/gratop/site-exhibition.webp" },
];

/** 사는 법이 셋. 임대는 네 걸음이 선 하나로 이어집니다. */
export function GratopDeal() {
  const gap = 0.6 / flow.length;
  return (
    <>
      <Scene mode="enter" className="bg-tg text-tx" aria-label="사는 법이 셋">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <h2
            className="cue-in text-center text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance"
            style={span(0.05, 0.25)}
          >
            사는 법이 셋, 하나를 고르면 됩니다.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-12">
            <div className="cue-in rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:col-span-6 lg:p-9" style={span(0.12, 0.3)}>
              <p className="text-[24px] font-bold tracking-[-0.02em] text-tb">임대</p>
              <p className="mt-3 max-w-md whitespace-pre-line text-[15px] font-medium leading-[1.7] text-tx-2">
                {"며칠만 쓰는 행사장과 전시장은 사지 않아도 됩니다.\n날짜와 면적을 알려 주시면 가져다 깔고, 끝나면 걷어 갑니다."}
              </p>
              <div className="relative mt-10">
                <div aria-hidden className="h-1 w-full rounded-full bg-tg" />
                <div aria-hidden className="pipe-line cue absolute left-0 top-0 h-1 w-full rounded-full bg-tb" style={span(0.3, 0.9)} />
                <ol className="mt-5 grid grid-cols-4 gap-3">
                  {flow.map((f, i) => (
                    <li key={f.name} className="cue-in" style={span(0.3 + i * gap, 0.42 + i * gap)}>
                      <span className="block text-[17px] font-bold tracking-[-0.02em] text-tx">{f.name}</span>
                      <span className="mt-1 block text-[13px] font-medium leading-relaxed text-tx-3">{f.note}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {[
              { k: "소매", body: "필요한 수량만 사서 두고 쓰는 공사장과 작업장. 롤 단위로 출고합니다." },
              { k: "주문제작", body: "폭과 길이, 두께, 색을 현장에 맞춰 만듭니다. 로고 인쇄도 가능합니다." },
            ].map((d, i) => (
              <div
                key={d.k}
                className="cue-in rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:col-span-3 lg:p-9"
                style={span(0.4 + i * 0.12, 0.6 + i * 0.12)}
              >
                <p className="text-[24px] font-bold tracking-[-0.02em] text-tx">{d.k}</p>
                <p className="mt-3 whitespace-pre-line text-[15px] font-medium leading-[1.7] text-tx-2">{lines(d.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              어디에 깔리는가
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16" gap={0.1}>
            {sites.map((s) => (
              <StaggerItem key={s.name} className="group">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-tg">
                  <Image src={s.image} alt={`${s.name} 바닥`} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[18px] font-bold tracking-[-0.02em]">{s.name}</p>
                <p className="mt-1 text-[14px] font-medium leading-relaxed text-tx-2">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
