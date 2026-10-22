import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";
import {
  categories,
  kettleLadder,
  menuPairs,
  productById,
  productsByCategory,
  rangeWidths,
  type RentalCategory,
  type RentalProduct,
} from "@/data/gasRental";
import Reveal from "@/components/motion/Reveal";

/**
 * 임대 기기 광고. 라인업 팬이 여섯 종을 훑고 지나간 뒤, 실제로 빌려 가는
 * 기기를 네 묶음으로 읽습니다. 묶음마다 생김새도 움직임도 다릅니다.
 * 기기를 고르는 기준이 묶음마다 다르기 때문입니다.
 *
 *   간택기 · 렌지      폭이 곧 화구 수. 스크롤하면 폭 막대가 하나씩 자란다.
 *   회전국솥 · 취반기  인분. 자가 그어지고 55에서 500까지 숫자가 커지며 선다.
 *   그리들 · 구이 · 튀김  메뉴. 메뉴는 왼쪽에서, 기기는 오른쪽에서, 사진은 도장처럼.
 *   행사 간식 기기      철. 포장마차 여섯 대가 오른쪽에서 굴러 들어와 줄을 선다.
 *
 * 넓은 화면에서는 장면이 고정된 채 재생되고(globals.css 「임대 묶음 장면」),
 * 전화기에서는 고정을 풀고 들어오는 동안 재생합니다.
 */
export function RentalShowcase() {
  const [range, kettle, griddle, snack] = categories;
  return (
    <section className="border-t border-line bg-paper" aria-label="임대 기기 소개">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 lg:px-10 lg:pt-32">
        <Reveal>
          <h2 className="max-w-3xl font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary text-balance">
            행사에 필요한 가스기기를
            <br />
            기간만큼 빌려 드립니다<span className="text-gold">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-muted md:text-base">
            간택기부터 회전국솥, 그리들, 떡볶이판까지 아오보 임대 라인업 28종. 가격표가 아니라 메뉴에서
            시작합니다.
          </p>
        </Reveal>
      </div>

      <RangeScene c={range} />
      <KettleScene c={kettle} />
      <GriddleScene c={griddle} />
      <SnackScene c={snack} />
    </section>
  );
}

/* ── 공통 조각 ── */

const dy = (from: number, to: number, d: string): CSSProperties =>
  ({ ...span(from, to), "--dy": d }) as CSSProperties;

function Heading({ c, dark = false, from = 0 }: { c: RentalCategory; dark?: boolean; from?: number }) {
  return (
    <div className="cue-in" style={span(from, from + 0.14)}>
      <h3
        className={`font-paperlogy text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.2] tracking-[-0.02em] ${
          dark ? "text-cream" : "text-primary"
        }`}
      >
        {c.title}
      </h3>
      <p className={`mt-3 font-serif text-xl italic leading-snug md:text-2xl ${dark ? "text-gold" : "text-accent-deep"}`}>
        {c.headline}
      </p>
      <p className={`mt-5 max-w-md text-[15px] leading-[1.9] ${dark ? "text-white/65" : "text-muted"}`}>{c.lead}</p>
      <p className={`mt-4 max-w-md text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>
        <span className={`mr-3 font-paperlogy font-medium ${dark ? "text-cream/80" : "text-primary/70"}`}>맞는 현장</span>
        {c.fits}
      </p>
    </div>
  );
}

function More({ c, dark = false, from }: { c: RentalCategory; dark?: boolean; from: number }) {
  const total = productsByCategory(c.id).length;
  return (
    <div className="cue-in" style={span(from, from + 0.1)}>
      <Link
        href={`/gas/rental#${c.id}`}
        className={`group inline-flex items-center gap-3 border-b pb-1 font-paperlogy text-[13px] font-semibold tracking-[0.1em] transition-colors duration-300 hover:border-gold ${
          dark ? "border-white/30 text-cream" : "border-primary/30 text-primary"
        }`}
      >
        {c.title} {total}종 전체 보기
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

function Photo({ p, sizes, className = "" }: { p: RentalProduct; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-line bg-white ${className}`}>
      <Image
        src={p.image}
        alt={p.imageAlt}
        fill
        sizes={sizes}
        className="object-contain p-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
      />
    </div>
  );
}

/* ── 1. 간택기 · 렌지: 폭 사다리 ──
   0.00 → 0.14  제목.  0.04 → 0.30  큰 사진이 한 뼘 다가온다.
   0.12 → 0.68  900, 1200, 1500, 1800 막대가 차례로 자라고 화구 수가 붙는다.
   0.30 → 0.53  옆 사진 둘.  0.72 → 0.82  전체 보기. */
function RangeScene({ c }: { c: RentalCategory }) {
  const hero = productById("sj-gantaek-1500");
  const side = [productById("sj-low-600"), productById("jb-sigma-wok")];
  const max = rangeWidths[rangeWidths.length - 1].width;
  return (
    <Scene className="ladder" mobileMode="enter" aria-label={c.title}>
      <div className="film-stage bg-paper">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-10">
          <div className="lg:col-span-5">
            <Heading c={c} />
            <ol className="mt-10 space-y-3" aria-label="간택기 폭과 화구 수">
              {rangeWidths.map((r, i) => {
                const a = 0.12 + i * 0.14;
                return (
                  <li key={r.width} className="flex items-center gap-4">
                    <span className="w-12 shrink-0 font-serif text-lg italic text-accent-deep">{r.width}</span>
                    <span
                      aria-hidden
                      className="cue ladder-bar h-2 bg-primary/85"
                      style={{ ...span(a, a + 0.14), width: `${(r.width / max) * 100}%`, maxWidth: "16rem" }}
                    />
                    <span className="cue-in shrink-0 text-[13px] text-muted" style={span(a + 0.08, a + 0.18)}>
                      {r.burners ?? "폭(mm)"}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-10">
              <More c={c} from={0.72} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-7">
            <div className="cue ladder-hero col-span-3 sm:col-span-2 sm:row-span-2" style={span(0.04, 0.3)}>
              <Link href={`/gas/rental#${hero.id}`} className="group block h-full">
                <Photo
                  p={hero}
                  sizes="(min-width: 1024px) 38vw, 66vw"
                  className="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[20rem]"
                />
                <p className="mt-3 font-paperlogy text-[15px] font-medium text-primary">
                  {hero.name}
                  <span className="ml-3 font-serif text-base italic text-accent-deep">{hero.facet}</span>
                </p>
                <p className="mt-1 text-[13px] text-muted">{hero.tagline}</p>
              </Link>
            </div>
            {side.map((p, i) => (
              <div key={p.id} className="cue-in col-span-3 sm:col-span-1" style={dy(0.3 + i * 0.08, 0.45 + i * 0.08, "3rem")}>
                <Link href={`/gas/rental#${p.id}`} className="group block">
                  <Photo p={p} sizes="(min-width: 1024px) 18vw, 33vw" className="aspect-square" />
                  <p className="mt-3 font-paperlogy text-[14px] font-medium leading-snug text-primary">{p.name}</p>
                  <p className="mt-1 text-[12px] text-muted">{p.facet}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ── 2. 회전국솥 · 취반기: 인분 눈금 ──
   0.00 → 0.14  제목.  0.08 → 0.55  자 한 줄이 왼쪽에서 오른쪽으로 그어진다.
   0.12 → 0.79  55, 150, 200, 500이 차례로 커지며 서고 그 밑에서 기기가 올라온다.
   0.80 → 0.90  전체 보기. */
function KettleScene({ c }: { c: RentalCategory }) {
  return (
    <Scene className="scale" mobileMode="enter" aria-label={c.title}>
      <div className="film-stage bg-ink text-cream">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10 lg:py-10">
          <div className="max-w-xl">
            <Heading c={c} dark />
          </div>

          <div className="relative mt-12">
            <div aria-hidden className="h-px w-full bg-white/12" />
            <div aria-hidden className="cue scale-rule absolute left-0 top-0 h-px w-full bg-gold" style={span(0.08, 0.55)} />
          </div>

          <ol className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4" aria-label="한 번에 끓이는 인분">
            {kettleLadder.map((k, i) => {
              const p = productById(k.id);
              const a = 0.12 + i * 0.13;
              return (
                <li key={k.id}>
                  <Link href={`/gas/rental#${p.id}`} className="group block">
                    <p className="flex items-baseline gap-2 pt-4">
                      <span
                        className="cue scale-num font-serif italic leading-none text-gold"
                        style={{ ...span(a, a + 0.12), fontSize: `${1.6 + i * 0.55}rem` }}
                      >
                        {k.servings}
                      </span>
                      <span className="cue-in text-[13px] text-white/55" style={span(a + 0.06, a + 0.16)}>
                        인분 · {k.label}
                      </span>
                    </p>
                    <div className="cue-in relative mt-4 aspect-[5/4] overflow-hidden bg-white" style={dy(a + 0.06, a + 0.22, "4rem")}>
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-contain p-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="cue-in" style={span(a + 0.14, a + 0.28)}>
                      <p className="mt-3 font-paperlogy text-[14px] font-medium leading-snug text-cream">{p.name}</p>
                      <p className="mt-1 text-[12px] text-white/55">{p.tagline}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-10">
            <More c={c} dark from={0.8} />
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ── 3. 그리들 · 구이 · 튀김: 메뉴 차림표 ──
   0.00 → 0.14  제목.  줄마다 0.17씩 늦게: 메뉴 이름은 왼쪽에서 밀려 들어오고,
   기기 이름은 오른쪽에서, 사진은 비스듬히 찍히고, 밑줄이 그어진다.
   0.80 → 0.90  전체 보기. */
function GriddleScene({ c }: { c: RentalCategory }) {
  return (
    <Scene className="menu" mobileMode="enter" aria-label={c.title}>
      <div className="film-stage border-t border-line bg-surface/60">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-10">
          <div className="lg:col-span-4">
            <Heading c={c} />
            <div className="mt-10">
              <More c={c} from={0.8} />
            </div>
          </div>

          <ol className="border-t border-primary/20 lg:col-span-8" aria-label="메뉴와 맞는 기기">
            {menuPairs.map((m, i) => {
              const p = productById(m.id);
              const a = 0.1 + i * 0.17;
              return (
                <li key={m.id} className="relative">
                  <Link
                    href={`/gas/rental#${p.id}`}
                    className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5 sm:grid-cols-[1fr_1fr_auto] sm:gap-8"
                  >
                    <span
                      className="cue menu-word font-paperlogy text-[clamp(1.3rem,2.4vw,2rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary"
                      style={span(a, a + 0.14)}
                    >
                      {m.menu}
                    </span>
                    <span className="cue menu-dev hidden sm:block" style={span(a + 0.04, a + 0.18)}>
                      <span className="block font-paperlogy text-[15px] font-medium text-primary">{p.name}</span>
                      <span className="mt-1 block text-[13px] text-muted">{p.tagline}</span>
                    </span>
                    <span className="cue menu-photo block" style={span(a + 0.02, a + 0.2)}>
                      <Photo p={p} sizes="112px" className="h-24 w-24 sm:h-28 sm:w-28" />
                    </span>
                  </Link>
                  <div aria-hidden className="h-px w-full bg-line" />
                  <div aria-hidden className="cue menu-line absolute bottom-0 left-0 h-px w-full bg-primary/60" style={span(a + 0.06, a + 0.24)} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Scene>
  );
}

/* ── 4. 행사 간식 기기: 포장마차 줄 ──
   0.00 → 0.14  제목.  0.08 → 0.80  여섯 대가 0.10씩 늦게 오른쪽에서 굴러 들어와
   제자리에 선다.  0.82 → 0.92  전체 보기. */
function SnackScene({ c }: { c: RentalCategory }) {
  const items = productsByCategory(c.id);
  return (
    <Scene className="train" mobileMode="enter" aria-label={c.title}>
      <div className="film-stage border-t border-line bg-paper">
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 lg:px-10 lg:pt-10">
          <div className="max-w-xl">
            <Heading c={c} />
          </div>
        </div>
        <ol
          className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden"
          aria-label={c.title}
        >
          {items.map((p, i) => {
            const a = 0.08 + i * 0.1;
            return (
              <li key={p.id} className="cue train-car w-[58vw] shrink-0 snap-start sm:w-[36vw] lg:w-auto" style={span(a, a + 0.22)}>
                <Link href={`/gas/rental#${p.id}`} className="group block">
                  <Photo p={p} sizes="(min-width: 1024px) 15vw, 58vw" className="aspect-[4/5]" />
                  <p className="mt-3 font-paperlogy text-[14px] font-medium leading-snug text-primary">{p.name}</p>
                  <p className="mt-1 text-[12px] text-muted">
                    <span className="font-serif italic text-accent-deep">{p.facet}</span>
                    <span className="mx-2 text-line">|</span>
                    {p.tagline}
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-10 lg:px-10 lg:pb-10">
          <More c={c} from={0.82} />
        </div>
      </div>
    </Scene>
  );
}
