import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Brand } from "@/data/brands";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 그라탑. 사이트는 바닥 색 회색 판, 먹색 글자, 잔디 초록 한 낱말, 그리고
 * 재질 네 장(보양판 · 고무 · 잔디 · 야자)이 바닥을 갈라 덮는 장면입니다.
 * 숫자는 촘촘한 산세리프. 여기서는 그 네 장이 스크롤에 맞춰 차례로
 * 올라와 바닥을 덮습니다.
 */
const FLOOR = "#e3e5e2";
const TURF = "#226b3f";
const INK = "#1a1c1e";
const dy = (from: number, to: number, d: string): CSSProperties => ({ ...span(from, to), "--dy": d }) as CSSProperties;
const step = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.09}s` });

export function GratopHero({ brand }: { brand: Brand }) {
  return (
    <section className="pt-32 lg:pt-40" style={{ backgroundColor: FLOOR }}>
      <div className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-10 lg:pb-20">
        <p className="rise font-paperlogy text-[13px] font-semibold tracking-[0.18em]" style={{ ...step(0), color: INK }}>
          GRATOP <span className="ml-2 font-normal tracking-normal text-[#5a5e5c]">그라탑</span>
        </p>
        <h1
          className="rise mt-6 font-paperlogy text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          style={{ ...step(1), color: INK }}
        >
          바닥은 그라탑이
          <br />
          <span style={{ color: TURF }}>덮습니다</span>.
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="rise max-w-xl text-[15px] leading-[1.9] text-[#3a3e3c] lg:col-span-7 md:text-base" style={step(2)}>
            {brand.description}
          </p>
          <div className="rise flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" style={step(3)}>
            <a
              href={brand.siteUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-[4px] px-7 py-4 font-paperlogy text-[13px] font-bold tracking-[0.08em] text-white transition-transform duration-200 ease-out hover:-translate-y-0.5"
              style={{ backgroundColor: TURF }}
            >
              gratop.kr에서 견적 요청
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex items-center rounded-[4px] border border-[#1a1c1e]/30 px-7 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.08em] transition-colors duration-300 hover:border-[#1a1c1e]"
              style={{ color: INK }}
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
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <ol className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
          {materials.map((m, i) => {
            const a = 0.15 + i * 0.14;
            return (
              <li key={m.name} className="cue-in" style={dy(a, a + 0.3, "6rem")}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[4px]" style={{ backgroundColor: INK }}>
                  <Image
                    src={m.image}
                    alt={`${m.name} 질감`}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-3 font-paperlogy text-[16px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
                  {m.name}
                  <span className="ml-2 text-[12px] font-medium tracking-[0.04em] text-[#5a5e5c]">{m.latin}</span>
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5a5e5c]">{m.use}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="h-16 lg:h-24" />
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
      <Scene mode="enter" className="bg-[#f2f3f0]" aria-label="사는 법이 셋">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <h2 className="cue-in font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em]" style={{ ...span(0.05, 0.25), color: INK }}>
            사는 법이 셋, 하나를 고르면 됩니다.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="cue-in font-paperlogy text-2xl font-semibold" style={{ ...span(0.12, 0.3), color: TURF }}>
                임대
              </p>
              <p className="cue-in mt-3 max-w-md text-[15px] leading-[1.9] text-[#3a3e3c]" style={span(0.16, 0.34)}>
                며칠만 쓰는 행사장과 전시장은 사지 않아도 됩니다. 날짜와 면적을 알려 주시면 가져다 깔고, 끝나면 걷어 갑니다.
              </p>
              <div className="relative mt-10">
                <div aria-hidden className="h-px w-full bg-[#1a1c1e]/15" />
                <div aria-hidden className="pipe-line cue absolute left-0 top-0 h-px w-full" style={{ ...span(0.3, 0.9), backgroundColor: TURF }} />
                <ol className="mt-5 grid grid-cols-4 gap-3">
                  {flow.map((f, i) => (
                    <li key={f.name} className="cue-in" style={span(0.3 + i * gap, 0.42 + i * gap)}>
                      <span className="block font-paperlogy text-lg font-semibold" style={{ color: INK }}>
                        {f.name}
                      </span>
                      <span className="mt-1 block text-[12px] leading-relaxed text-[#5a5e5c]">{f.note}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {[
              { k: "소매", body: "필요한 수량만 사서 두고 쓰는 공사장과 작업장. 롤 단위로 출고합니다." },
              { k: "주문제작", body: "폭과 길이, 두께, 색을 현장에 맞춰 만듭니다. 로고 인쇄도 가능합니다." },
            ].map((d, i) => (
              <div key={d.k} className="cue-in border-t border-[#1a1c1e]/15 pt-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={span(0.4 + i * 0.12, 0.6 + i * 0.12)}>
                <p className="font-paperlogy text-2xl font-semibold" style={{ color: INK }}>
                  {d.k}
                </p>
                <p className="mt-3 text-[15px] leading-[1.9] text-[#3a3e3c]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <section style={{ backgroundColor: FLOOR }}>
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]" style={{ color: INK }}>
              어디에 깔리는가
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" gap={0.1}>
            {sites.map((s) => (
              <StaggerItem key={s.name} className="group">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] bg-[#16181b]">
                  <Image src={s.image} alt={`${s.name} 바닥`} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 font-paperlogy text-lg font-semibold" style={{ color: INK }}>
                  {s.name}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5a5e5c]">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
