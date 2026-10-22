import Image from "next/image";
import Link from "next/link";
import {
  categories,
  products,
  productsByCategory,
  rentalTerms,
  type RentalProduct,
} from "@/data/gasRental";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 가스기기 임대 카탈로그. 필름이 아니라 펼쳐 놓은 카탈로그 한 권입니다.
 *
 * 맨 위에 제목과 네 묶음으로 가는 차례가 서고, 차례는 스크롤해도 헤더 밑에
 * 붙어 따라옵니다. 묶음마다 큰 문장 하나와 기기 타일. 타일은
 * 카탈로그 컷이라 흰 바탕이고, 종이 위의 흰 사각형이 그대로 제품입니다.
 * 가격은 없습니다. 임대 견적은 기간과 수량, 현장에 따라 달라지므로
 * 모든 타일이 같은 문장으로 끝납니다. «임대 문의».
 */
export function RentalCatalog() {
  return (
    <>
      <CatalogHead />
      <CategoryNav />
      {categories.map((c) => (
        <section
          key={c.id}
          id={c.id}
          className="scroll-mt-[calc(var(--bar)+3.25rem)] border-t border-line bg-paper"
          aria-labelledby={`${c.id}-title`}
        >
          <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
            <Reveal>
              <h2
                id={`${c.id}-title`}
                className="font-paperlogy text-[clamp(1.7rem,3.4vw,2.8rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary text-balance"
              >
                {c.headline}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-muted">{c.lead}</p>
              <p className="mt-3 text-sm text-muted">
                <span className="mr-3 font-paperlogy font-medium text-primary/70">{c.title}</span>
                {c.fits}
              </p>
            </Reveal>

            <Stagger
              className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:mt-14 lg:grid-cols-4 lg:gap-x-4"
              gap={0.06}
              amount={0.1}
            >
              {productsByCategory(c.id).map((p) => (
                <StaggerItem key={p.id}>
                  <ProductTile product={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ))}
      <Terms />
    </>
  );
}

function CatalogHead() {
  return (
    <section className="border-b border-line bg-paper pt-36 pb-12 lg:pt-44 lg:pb-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal direction="none" duration={0.7}>
          <Link
            href="/gas"
            className="group inline-flex items-center gap-2 font-serif text-base italic text-accent-deep transition-colors duration-300 hover:text-primary"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            아오보 가스기기 임대
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-paperlogy text-[clamp(2.4rem,6vw,4.4rem)] font-extralight leading-[1.12] tracking-[-0.02em] text-primary">
            임대 라인업 {products.length}종<span className="text-gold">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-muted md:text-base">
            행사와 급식 현장에 가장 많이 나가는 가스기기를 아오보가 보유하고 임대합니다. 목록에 없는 기기도
            찾아 드립니다.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="tel:010-8473-1666"
              className="inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-cream transition-colors duration-400 hover:bg-gold hover:text-ink"
            >
              전화 상담
              <span className="font-serif text-sm italic tracking-normal">010-8473-1666</span>
            </a>
            <Link
              href="/support/contact"
              className="group inline-flex items-center justify-center gap-3 border border-primary/30 px-8 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-primary transition-colors duration-400 hover:border-primary"
            >
              임대 문의하기
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** 네 묶음으로 가는 차례. 헤더 밑에 붙어 따라옵니다. */
function CategoryNav() {
  return (
    <nav
      className="sticky top-[var(--bar)] z-30 border-b border-line bg-paper/92 backdrop-blur-sm"
      aria-label="기기 묶음"
    >
      <ul className="mx-auto flex max-w-[1440px] gap-x-7 overflow-x-auto px-6 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <li key={c.id} className="shrink-0">
            <a
              href={`#${c.id}`}
              className="flex items-center gap-2 border-b-2 border-transparent py-4 font-paperlogy text-[13px] font-medium tracking-[0.02em] text-primary/75 transition-colors duration-300 hover:border-gold hover:text-primary"
            >
              {c.title}
              <span className="font-serif text-sm italic text-accent-deep">{productsByCategory(c.id).length}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProductTile({ product: p }: { product: RentalProduct }) {
  return (
    <article id={p.id} className="group scroll-mt-[calc(var(--bar)+4rem)]">
      <div className="relative aspect-square overflow-hidden border border-line bg-white">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-contain p-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-paperlogy text-[15px] font-medium leading-snug text-primary md:text-base">{p.name}</h3>
        <p className="mt-1 text-[13px] leading-snug text-muted">
          {p.maker}
          {p.model && (
            <>
              <span className="mx-2 text-line">|</span>
              <span className="font-serif italic text-accent-deep">{p.model}</span>
            </>
          )}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-primary/80">{p.tagline}</p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] leading-relaxed text-muted">
          {p.specs.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="block h-1 w-1 rotate-45 bg-gold/70" />}
              {s}
            </li>
          ))}
        </ul>
        <Link
          href={`/support/contact`}
          className="mt-4 inline-flex items-center gap-2 border-b border-primary/30 pb-0.5 font-paperlogy text-[12px] font-semibold tracking-[0.1em] text-primary transition-colors duration-300 hover:border-gold"
        >
          임대 문의
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}

/** 임대에 포함되는 것. 목록이 끝나는 자리에 둡니다. */
function Terms() {
  return (
    <section className="border-t border-line bg-surface/60" aria-labelledby="terms-title">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28">
        <Reveal className="lg:col-span-4">
          <h2
            id="terms-title"
            className="font-paperlogy text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary"
          >
            {rentalTerms.title}
            <span className="text-gold">.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-[1.9] text-muted">{rentalTerms.note}</p>
        </Reveal>
        <div className="lg:col-span-8 lg:border-l lg:border-line lg:pl-14">
          <Stagger className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2" gap={0.1}>
            {rentalTerms.items.map((item) => (
              <StaggerItem key={item.title}>
                <h3 className="font-paperlogy text-xl font-medium text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.85] text-muted">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
