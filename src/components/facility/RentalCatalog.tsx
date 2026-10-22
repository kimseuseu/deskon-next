import Link from "next/link";
import { products, rentalTerms } from "@/data/gasRental";
import { RentalShop } from "./RentalShop";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { gas } from "@/data/facility";
import { COMPANY } from "@/lib/constants";

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
      <RentalShop />
      <Terms />
    </>
  );
}

function CatalogHead() {
  return (
    <section className="bg-paper pt-32 pb-10 lg:pt-40 lg:pb-12">
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
              href={`tel:${gas.phone ?? COMPANY.phone}`}
              className="inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 font-paperlogy text-[13px] font-bold tracking-[0.12em] text-cream transition-colors duration-400 hover:bg-gold hover:text-ink"
            >
              {gas.callLabel ?? "전화 상담"}
              <span className="font-serif text-sm italic tracking-normal">{gas.phone ?? COMPANY.phone}</span>
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
