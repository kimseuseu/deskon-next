import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { companyIntro, inquirySteps, introQA, serviceModes } from "@/data/company-intro";

/**
 * «아오보 소개». 첫 화면 바로 아래에서 회사를 사실 문장으로 설명합니다.
 * 왼쪽에 정의 문장, 오른쪽에 질문과 답. 답은 접지 않고 다 펼쳐 둡니다(검색이 읽습니다).
 * 방식 비교는 표, 진행 순서는 번호 목록입니다. 문장은 src/data/company-intro.ts 에서 옵니다.
 */
export function AboutIntro() {
  return (
    <section id="intro" className="scroll-mt-20 bg-white text-tx" aria-labelledby="intro-title">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[calc(var(--bar)+3rem)] lg:self-start">
            <h2 id="intro-title" className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              아오보는 어떤 회사인가요
            </h2>
            <p className="mt-6 text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold leading-[1.65] text-tx">{companyIntro.definition}</p>
            <p className="mt-3 text-[16px] font-medium leading-[1.75] text-tx-2">{companyIntro.scope}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-14 lg:mt-0">
            <dl className="divide-y divide-tg-2 border-y border-tg-2">
              {introQA.slice(1).map((item) => (
                <div key={item.q} className="py-7">
                  <dt className="text-[18px] font-bold leading-[1.45] tracking-[-0.02em]">{item.q}</dt>
                  <dd className="mt-3 text-[15px] font-medium leading-[1.75] text-tx-2">
                    <p>{item.a}</p>

                    {item.extra === "modes" && (
                      /* 넓은 화면은 표, 전화기는 줄마다 세로로 쌓습니다(가로로 밀어 보는 표를 두지 않습니다). */
                      <table className="mt-5 w-full border-collapse text-left text-[14px]">
                        <thead className="max-sm:hidden">
                          <tr className="border-b border-tg-2 text-[13px] text-tx-3">
                            <th scope="col" className="py-2.5 pr-4 font-semibold">방식</th>
                            <th scope="col" className="py-2.5 pr-4 font-semibold">어떻게 쓰나</th>
                            <th scope="col" className="py-2.5 font-semibold">대표 품목</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-tg-2 max-sm:block max-sm:border-t max-sm:border-tg-2">
                          {serviceModes.map((m) => (
                            <tr key={m.name} className="align-top max-sm:block max-sm:py-3.5">
                              <th scope="row" className="font-bold text-tx max-sm:block sm:whitespace-nowrap sm:py-3 sm:pr-4">
                                <Link href={m.href} className="transition-colors duration-200 hover:text-tb">
                                  {m.name}
                                </Link>
                              </th>
                              <td className="max-sm:mt-1 max-sm:block sm:py-3 sm:pr-4">{m.how}</td>
                              <td className="max-sm:mt-1 max-sm:block max-sm:text-[13px] max-sm:text-tx-3 sm:py-3">{m.items}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {item.extra === "steps" && (
                      <ol className="mt-4 space-y-2">
                        {inquirySteps.map((s, i) => (
                          <li key={s} className="flex gap-3">
                            <span className="w-5 shrink-0 font-bold tabular-nums text-tb">{i + 1}.</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[14px] font-medium leading-[1.7] text-tx-3">{companyIntro.disambiguation}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
