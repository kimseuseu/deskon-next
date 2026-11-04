import Link from "next/link";
import { products, rentalTerms } from "@/data/gasRental";
import { RentalShop } from "./RentalShop";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { gas } from "@/data/facility";
import { COMPANY } from "@/lib/constants";

/** 문장 끝에서 줄을 바꿉니다. 한 문장이 한 줄입니다. */
const lines = (text: string) => text.replace(/\.\s+/g, ".\n");

/**
 * 가스기기 임대 카탈로그. 필름이 아니라 펼쳐 놓은 카탈로그 한 권입니다.
 *
 * 맨 위에 제목과 네 묶음으로 가는 차례가 서고, 차례는 스크롤해도 헤더 밑에
 * 붙어 따라옵니다. 묶음마다 큰 문장 하나와 기기 타일. 타일은
 * 카탈로그 컷이라 흰 바탕이고, 회색 바탕 위의 둥근 흰 카드가 그대로 제품입니다.
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
  const phone = gas.phone ?? COMPANY.phone;
  return (
    <section className="bg-white pt-32 pb-12 text-tx lg:pt-40 lg:pb-16">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Reveal direction="none" duration={0.7}>
          <Link
            href="/gas"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-tx-3 transition-colors duration-200 hover:text-tx"
          >
            <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            아오보 가스기기 임대
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.18] tracking-[-0.035em] text-balance">
            임대 라인업 {products.length}종
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {"행사와 급식 현장에 가장 많이 나가는 가스기기를 아오보가 보유하고 임대합니다.\n목록에 없는 기기도 찾아 드립니다."}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
            >
              {gas.callLabel ?? "전화 상담"}
              <span className="font-medium text-white/85">{phone}</span>
            </a>
            <Link
              href="/support/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-tg px-8 py-4 text-[17px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
            >
              임대 문의하기
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
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
    <section className="bg-white text-tx" aria-labelledby="terms-title">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2
            id="terms-title"
            className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance"
          >
            {rentalTerms.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {lines(rentalTerms.note)}
          </p>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.1}>
          {rentalTerms.items.map((item) => (
            <StaggerItem key={item.title} className="rounded-[24px] bg-tg p-6">
              <h3 className="text-[18px] font-bold">{item.title}</h3>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{item.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
