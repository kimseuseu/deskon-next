import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { companyIntro } from "@/data/company-intro";

/* 홈에서 바로 가는 여섯 곳. 검색 결과의 바로가기와 같은 이름을 씁니다. */
const DOORS = [
  { name: "구독", href: "/subscribe", desc: "매달 정액으로 쓰고, 쓰지 않으면 반납" },
  { name: "공유", href: "/sharing", desc: "앱으로 QR 코드를 찍어 시간 단위로" },
  { name: "렌탈", href: "/rental", desc: "기간을 정해 설치부터 회수까지" },
  { name: "급배수 설비", href: "/water", desc: "행사장 급수 · 배수 · 오폐수 처리" },
  { name: "가스기기 임대", href: "/gas", desc: "간택기 · 회전국솥 · 그리들 행사 임대" },
  { name: "현장 노트", href: "/blog", desc: "현장에서 쓴 글과 사진" },
];

/**
 * «아오보는». 숫자 장면과 맺음 사이에서, 회사를 한 문단의 사실 문장으로 말합니다.
 * 홈의 다른 장면은 영상과 움직임이 주인공이라 글자로 된 회사 설명이 적었습니다.
 * 검색이 홈을 «아오보» 의 대표 문서로 읽으려면 이 문단이 본문에 글자로 있어야 합니다.
 */
export default function HomeIntro() {
  return (
    <section className="bg-white text-tx" aria-labelledby="home-intro-title">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20 lg:py-36">
        <Reveal>
          <p className="eyebrow">About AOVO</p>
          <h2 id="home-intro-title" className="mt-5 text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.25] text-balance">
            아오보는 어떤 회사인가요
          </h2>
          <p className="mt-6 text-[17px] font-semibold leading-[1.7] text-tx">{companyIntro.definition}</p>
          <p className="mt-3 text-[16px] font-medium leading-[1.75] text-tx-2">{companyIntro.scope}</p>
          <Link
            href="/about#intro"
            className="group mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-tb transition-colors duration-200 hover:text-tb-deep"
          >
            아오보 그룹 소개
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-0">
          <ul className="divide-y divide-tg-2 border-y border-tg-2">
            {DOORS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group flex items-baseline gap-4 py-5">
                  <span className="w-[7.5rem] shrink-0 text-[17px] font-bold tracking-[-0.02em] text-tx transition-colors duration-200 group-hover:text-tb">
                    {d.name}
                  </span>
                  <span className="flex-1 text-[15px] font-medium leading-[1.6] text-tx-2">{d.desc}</span>
                  <span aria-hidden className="shrink-0 text-tx-3 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
