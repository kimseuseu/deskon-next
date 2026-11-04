import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { gas, water } from "@/data/facility";
import { waterClosing } from "@/data/water-story";
import { COMPANY } from "@/lib/constants";

/**
 * 맺음. 스크럽 ③이 해 뜨는 장면으로 끝나므로 맺음은 밝습니다.
 * 가운데에 제목과 알약 버튼 둘, 그 밑에 약속 셋.
 * 두 랜딩은 서로를 가리키므로, 가스기기 임대로 가는 길을 함께 둡니다.
 */
export function WaterClosing() {
  const phone = water.phone ?? COMPANY.phone;
  const { cta } = water;
  return (
    <section className="bg-white text-tx" aria-label="상담">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">{waterClosing.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">{waterClosing.lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
            >
              {water.callLabel ?? "전화 상담"}
              <span className="font-medium text-white/85">{phone}</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-tg px-8 py-4 text-[17px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
            >
              {water.inquiryLabel ?? "설치 문의하기"}
            </Link>
          </div>
          <p className="mt-4 text-[13px] font-medium text-tx-3">{waterClosing.hours}</p>
        </Reveal>

        <Stagger className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-24" gap={0.1}>
          {cta.promises.map((p) => (
            <StaggerItem key={p.title} className="rounded-[24px] bg-tg p-6 text-center">
              <p className="text-[18px] font-bold">{p.title}</p>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{p.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 text-center">
          <Link
            href={gas.href}
            className="group inline-flex items-center gap-2 text-[16px] font-semibold text-tx-3 transition-colors hover:text-tx"
          >
            {gas.nameFull} 보기
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
