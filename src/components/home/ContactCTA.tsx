"use client";

import Link from "next/link";
import Reveal, { LineReveal } from "@/components/motion/Reveal";
import { COMPANY } from "@/lib/constants";

/** 맺음. 가운데 제목, 알약 버튼 둘, 전화번호. */
export default function ContactCTA() {
  return (
    <section className="bg-tg text-tx">
      <div className="mx-auto max-w-[1200px] px-6 py-24 text-center lg:py-36">
        <Reveal>
          <p className="eyebrow justify-center">Contact</p>
          <LineReveal
            as="h2"
            className="mt-6 text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.2]"
            lineClassName="pb-[0.1em]"
            lines={[
              <>장비 운영의 다음 단계,</>,
              <>
                <span className="font-serif italic text-tb">아오보</span>와 시작하세요.
              </>,
            ]}
          />
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {"품목과 수량만 알려주세요.\n24시간 안에 현장에 맞는 운영 방안과 견적을 보내드립니다."}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/support/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
            >
              상담 문의하기
            </Link>
            <a
              href={COMPANY.kakaoChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[17px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
            >
              카카오 채널
            </a>
          </div>
          <a href={`tel:${COMPANY.phone}`} className="mt-8 inline-block text-[18px] font-bold tracking-[-0.02em] text-tx transition-colors hover:text-tb">
            {COMPANY.phone}
          </a>
          <p className="mt-1 text-[13px] font-medium text-tx-3">평일 09:00 - 18:00</p>
        </Reveal>
      </div>
    </section>
  );
}
