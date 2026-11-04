import Link from "next/link";
import { Scene } from "@/components/film/Scene";
import type { FacilityWork } from "@/data/facility";
import { COMPANY } from "@/lib/constants";

/** 문장 끝에서 줄을 바꿉니다. 한 문장이 한 줄입니다. */
const lines = (text: string) => text.replace(/\.\s+/g, ".\n");

/**
 * 맺음. 어두운 둥근 판 한 장이 아래에서 다가와 자리를 잡습니다.
 * 페이지가 끝나는 것이 아니라 마지막 장면이 도착하는 것으로 읽힙니다.
 * 두 랜딩은 서로를 가리키므로, 다른 설비로 가는 길을 함께 둡니다.
 */
export function ClosingCta({ work, sibling }: { work: FacilityWork; sibling: FacilityWork }) {
  const { cta } = work;
  const phone = work.phone ?? COMPANY.phone;
  return (
    <Scene mode="enter" className="bg-white px-4 pb-4 lg:px-6 lg:pb-6">
      <div className="closing-panel cue mx-auto max-w-[1400px] rounded-[32px] bg-tk text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-32">
          <div className="text-center">
            <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/70">
              {lines(cta.lead)}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
              >
                {work.callLabel ?? "전화 상담"}
                <span className="font-medium text-white/85">{phone}</span>
              </a>
              <Link
                href="/support/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/12 px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98] sm:w-auto"
              >
                {work.inquiryLabel ?? "설치 문의하기"}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <p className="mt-4 text-[13px] font-medium text-white/50">평일 09:00 - 18:00</p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-20">
            {cta.promises.map((p) => (
              <li key={p.title} className="rounded-[24px] bg-tk-2 p-6 text-center">
                <p className="text-[18px] font-bold">{p.title}</p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-white/60">{p.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-[17px] font-semibold text-white/80 md:text-[19px]">{cta.slogan}</p>

          <div className="mt-14 text-center">
            <Link
              href={sibling.href}
              className="group inline-flex items-center gap-2 text-[16px] font-semibold text-white/55 transition-colors duration-200 hover:text-white"
            >
              {sibling.nameFull}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </Scene>
  );
}
