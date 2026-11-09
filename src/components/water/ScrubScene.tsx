import type { CSSProperties, ReactNode } from "react";
import { Scene } from "@/components/film/Scene";
import { span, through } from "@/components/film/cue";
import { FrameScrub } from "./FrameScrub";

export interface Caption {
  /** 들어오는 구간과 나가는 구간. 0에서 1 사이의 장면 진행도입니다. */
  at: readonly [number, number, number, number];
  title: string;
  body?: string;
  /** 가로로 어디에 서는지. 기본은 가운데. */
  align?: "center" | "left" | "right";
  /** 세로로 어디에 서는지. 피사체를 가리지 않는 쪽에 둡니다. 기본은 가운데. */
  y?: "center" | "top" | "bottom";
}

/**
 * 스크럽 장면. 캔버스가 화면을 채우고 스크롤이 프레임을 넘깁니다.
 * 자막은 제 구간에 들어왔다 나갑니다. 토스 메인의 첫 시퀀스와 같은 문법입니다.
 *
 *   n       이 장면을 넘기는 데 쓰는 화면 수. 프레임이 많을수록 길게.
 *   tone    light는 흰 바탕에 검은 글, dark는 검은 바탕에 흰 글.
 *   shrink  끝에서 액자가 한 뼘 물러나 둥근 카드가 될지.
 */
export function ScrubScene({
  seq,
  count,
  n = 5,
  tone = "light",
  shrink = false,
  captions,
  label,
  children,
}: {
  seq: string;
  count: number;
  n?: number;
  tone?: "light" | "dark";
  shrink?: boolean;
  captions: Caption[];
  "aria-label"?: string;
  label: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <Scene className={`scrub ${dark ? "bg-tk" : "bg-white"}`} style={{ "--n": n } as CSSProperties} aria-label={label}>
      <div className={`scrub-stage ${dark ? "bg-tk text-white" : "bg-white text-tx"}`}>
        <div className={`${shrink ? "scrub-shrink cue " : ""}relative h-full w-full overflow-hidden ${dark ? "bg-tk-2" : "bg-tg"}`}>
          <FrameScrub base={`/seq/${seq}`} count={count} />
          {/* 어두운 장면만 위아래를 조금 눌러 글을 받칩니다. 밝은 장면은 영상 그대로 둡니다.
              흰 겹을 얹으면 화면이 뿌옇게 보입니다. */}
          {dark && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,28,0.45)_0%,rgba(23,23,28,0)_32%,rgba(23,23,28,0)_68%,rgba(23,23,28,0.55)_100%)]"
            />
          )}
          {captions.map((c) => {
            const [a, b, c2, d] = c.at;
            const x =
              c.align === "left"
                ? "left-6 lg:left-[8vw] text-left items-start"
                : c.align === "right"
                  ? "right-6 lg:right-[8vw] text-right items-end"
                  : "left-1/2 -translate-x-1/2 text-center items-center";
            const yPos =
              c.y === "top"
                ? "top-[calc(var(--bar)+8svh)]"
                : c.y === "bottom"
                  ? "bottom-[9svh]"
                  : "top-1/2 -translate-y-1/2";
            /* 밝은 장면의 글은 거의 흰 카드 위에 섭니다. 영상의 파랑과 겹쳐도 읽힙니다.
               움직이는 캔버스 위라 backdrop-filter는 쓰지 않습니다(매 프레임 흐림 비용).
               어두운 장면은 그림자로 충분합니다. */
            const card = dark
              ? ""
              : "rounded-[28px] bg-white/92 px-7 py-6 shadow-[0_16px_48px_rgba(25,31,40,0.14)] lg:px-9 lg:py-8";
            return (
              <div
                key={c.title}
                className={`cue-through pointer-events-none absolute flex flex-col gap-3 ${dark ? "w-[min(90vw,44rem)]" : "w-[min(90vw,36rem)]"} ${x} ${yPos} ${card}`}
                style={{ ...through(a, b, c2, d), "--dy": "2rem" } as CSSProperties}
              >
                <p
                  className={`font-bold leading-[1.22] tracking-[-0.03em] text-balance ${
                    dark
                      ? "text-[clamp(1.9rem,4.6vw,3.6rem)] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
                      : "text-[clamp(1.6rem,3.4vw,2.8rem)] text-tx"
                  }`}
                >
                  {c.title}
                </p>
                {c.body && (
                  <p
                    className={`whitespace-pre-line text-[clamp(1rem,1.4vw,1.2rem)] font-medium leading-[1.65] ${
                      dark ? "text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]" : "text-tx-2"
                    }`}
                  >
                    {c.body}
                  </p>
                )}
              </div>
            );
          })}
          {children}
        </div>
      </div>
    </Scene>
  );
}

/** 장면 하나 안에서 쓰는 들어옴 구간. ScrubScene 밖에서도 같은 리듬으로 씁니다. */
export { span };
