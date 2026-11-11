import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";

/* 사는 순간 따라붙는 세 줄. 설명은 /about 의 «구매의 딜레마»를 한 줄로 줄인 것입니다. */
const BURDENS = [
  { name: "감가상각", desc: "해마다 떨어지는 자산 가치" },
  { name: "관리 인력", desc: "점검하고 고치는 사람과 시간" },
  { name: "유휴 자산", desc: "안 쓸 때도 차지하는 자리" },
];

/* 줄마다 들어오는 구간(--from → --to)과 지워지는 구간(--ofrom → --oto). */
const row = (i: number) =>
  ({
    "--from": 0.03 + i * 0.07,
    "--to": 0.15 + i * 0.07,
    "--ofrom": 0.42 + i * 0.05,
    "--oto": 0.52 + i * 0.05,
  }) as CSSProperties;

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 선언. 글을 읽히는 대신 명세서 한 장으로 보여 줍니다.
 *   1. 사면 따라붙는 세 줄이 왼쪽에서 줄줄이 들어온다.
 *   2. 제목이 아오보의 제안으로 바뀌고, 세 줄에 파란 줄이 그어진다.
 *   3. 합계 칸의 숫자가 굴러 내려와 0에 선다.
 *   4. 2,500개 기업과 그룹소개 버튼이 올라온다.
 * 움직임은 전부 --p 에서 CSS가 계산합니다(globals.css의 «선언: 명세서»).
 */
export default function Manifesto() {
  return (
    <Scene className="bill-scene relative z-10 -mt-[14svh] text-tx">
      <div className="stage flex items-center rounded-t-[40px] bg-white px-6 pt-[var(--bar)] motion-reduce:py-24">
        <div className="bill-grid mx-auto grid w-full max-w-[1200px] gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10">
          {/* 제목 둘이 같은 자리에서 바뀝니다. */}
          <div className="bill-swap text-[clamp(1.6rem,3.3vw,2.75rem)] leading-[1.28]">
            <h2 className="cue-out [--dy:1rem]" style={span(0.38, 0.46)}>
              <span className="block">장비를 사는 순간,</span>
              <span className="block">이 셋이 함께 따라옵니다.</span>
            </h2>
            <p className="cue-in font-paperlogy font-semibold tracking-[-0.03em] [--dy:1.25rem]" style={span(0.47, 0.57)}>
              <span className="block">아오보 그룹은 사는 대신</span>
              <span className="block">
                <span className="font-serif italic text-tb">운영</span>을 제안합니다.
              </span>
            </p>
          </div>

          {/* 명세서 */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <p className="pb-3 text-[14px] font-semibold text-tx-2">구매하면</p>
            <ul>
              {BURDENS.map((b, i) => (
                <li key={b.name} className="bill-row flex items-baseline gap-3 border-t border-tg-2 py-4 lg:gap-4 lg:py-6" style={row(i)}>
                  <span aria-hidden className="bill-dim font-paperlogy text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium text-tx-3">
                    +
                  </span>
                  <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-5 gap-y-0.5">
                    <span className="relative font-paperlogy text-[clamp(1.3rem,2.4vw,2.1rem)] font-semibold tracking-[-0.03em]">
                      <span className="bill-dim">{b.name}</span>
                      <span aria-hidden className="bill-strike absolute -inset-x-1.5 top-[52%] h-[0.09em] rounded-full bg-tb" />
                    </span>
                    <span className="bill-dim text-[14px] font-medium text-tx-2 lg:text-[16px]">{b.desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* 합계 */}
            <span aria-hidden className="bill-rule cue block h-[2px] bg-tx" style={span(0.58, 0.68)} />
            <div className="flex items-baseline-last justify-between gap-4 pt-4 lg:pt-5">
              <div className="cue-in [--dy:1rem]" style={span(0.62, 0.72)}>
                <p className="text-[14px] font-semibold text-tb">운영하면</p>
                <p className="mt-1.5 font-paperlogy text-[clamp(1.15rem,2vw,1.75rem)] font-semibold leading-[1.35] tracking-[-0.03em]">
                  쓰는 만큼만 내고,
                  <br />
                  멈추면
                </p>
              </div>
              <p
                className="bill-zero cue-in font-paperlogy text-[clamp(5.5rem,12vw,9.5rem)] font-bold leading-none tracking-[-0.05em] text-tb [--dy:0px]"
                style={span(0.64, 0.7)}
              >
                <span className="bill-roll">
                  <span className="text-transparent">0</span>
                  <span aria-hidden className="bill-roll-strip cue" style={span(0.66, 0.86)}>
                    {DIGITS.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </span>
                </span>
                <span className="ml-[0.06em] text-[0.4em] tracking-[-0.02em]">원</span>
              </p>
            </div>
          </div>

          {/* 근거와 버튼 */}
          <div className="bill-foot cue-in lg:col-start-1 lg:row-start-2 lg:self-end" style={span(0.84, 0.94)}>
            <p className="text-[16px] font-medium leading-[1.6] text-tx-2 lg:text-[17px]">
              <strong className="font-semibold text-tx">2,500개 기업</strong>이 선택한
              <br className="hidden lg:block" /> 자산 운영의 기준입니다.
            </p>
            <Link
              href="/about"
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-tg px-6 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] lg:mt-6"
            >
              그룹소개
              <span aria-hidden className="text-tb transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </Scene>
  );
}
