import Link from "next/link";
import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";

const SENTENCES = [
  "장비를 사는 순간 감가상각과 관리 인력, 유휴 자산이 함께 따라옵니다.",
  "아오보 그룹은 사는 대신 운영을 제안합니다.",
  "쓰는 만큼만 내고, 멈추면 0원.",
  "2,500개 기업이 선택한 자산 운영의 기준입니다.",
];

/**
 * 선언문. 화면에 붙은 채로 스크롤에 따라 낱말이 하나씩 켜집니다.
 * 다 켜지면 밑에서 그룹소개 버튼이 올라옵니다.
 */
export default function Manifesto() {
  const words = SENTENCES.map((s) => s.split(" "));
  const n = words.reduce((a, w) => a + w.length, 0);
  let k = 0;
  return (
    <Scene className="word-scene relative z-10 -mt-[14svh] text-tx">
      <div className="stage flex items-center justify-center rounded-t-[40px] bg-white px-6">
        <div className="mx-auto w-full max-w-[1000px]">
          <p className="eyebrow">AOVO Group</p>
          <p
            className="wr mt-7 font-paperlogy text-[clamp(1.6rem,3.6vw,3.1rem)] font-medium leading-[1.4] tracking-[-0.03em]"
            style={{ "--n": n, "--from": 0.1, "--to": 0.8 } as CSSProperties}
          >
            {words.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => {
                  const i = k++;
                  return (
                    <span key={wi} className="wr-word inline-block" style={{ "--i": i } as CSSProperties}>
                      {w}
                      {wi < line.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
          <div className="cue-in mt-10" style={span(0.82, 0.95)}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-tg px-6 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]"
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
