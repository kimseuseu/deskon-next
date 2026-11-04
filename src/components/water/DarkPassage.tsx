import type { CSSProperties } from "react";
import { Scene } from "@/components/film/Scene";
import { span, through } from "@/components/film/cue";
import { waterPill, waterScrubs } from "@/data/water-story";
import { FlyTitle } from "./FlyTitle";
import { FrameScrub } from "./FrameScrub";

/**
 * 어두운 통로. 알약 전환과 «물이 가는 길» 영상이 한 장면입니다.
 *
 * 두 문장이 한 줄로 붙어 있다가 사이에 검은 알약이 생겨나며 벌어지고, 알약이
 * 자라 화면을 덮습니다. 장면은 그 자리에 멈춰 있습니다.
 * 어둠 위에 제목과 설명이 섰다가, 설명이 사라지며 영상이 그 자리에서 떠오르고,
 * 제목은 오른쪽 자막 자리로 날아가 작아집니다. 그 뒤에 «은 보이지 않아야
 * 합니다.»가 붙고, 스크롤이 프레임을 넘기며 자막 둘이 더 지나갑니다.
 *
 *   0.02 → 0.07  알약이 생겨나며 두 문장이 벌어진다.
 *   0.07 → 0.20  알약이 자라 화면을 덮는다. 문장은 밀려 나간다.
 *   0.17 → 0.23  제목과 설명이 선다.
 *   0.28 → 0.34  설명이 사라진다.
 *   0.30 → 0.40  영상이 떠오른다. 제목이 자막 자리로 날아간다(0.32 → 0.42).
 *   0.43 → 0.49  «은 보이지 않아야 합니다.»와 설명이 나타난다.
 *   0.36 → 1.00  프레임이 넘어간다. 자막 ②·③이 지나간다.
 */
export function DarkPassage() {
  const { seq, count, captions } = waterScrubs.kitchen;
  const [first, ...others] = captions;
  /* 첫 자막은 제목 «물이 가는 길»과 나머지 «은 보이지 않아야 합니다.»로 나뉩니다. */
  const rest = first.title.startsWith(waterPill.title) ? first.title.slice(waterPill.title.length) : first.title;

  return (
    <Scene className="scrub bg-white" style={{ "--n": 7.5 } as CSSProperties} aria-label={waterPill.title}>
      <div className="scrub-stage bg-white text-tx">
        {/* 두 낱말. 알약이 자라는 만큼 밀려 나갑니다. */}
        <div className="absolute inset-0 grid grid-cols-[1fr_28px_1fr] items-center gap-x-4 [--pg:1rem] sm:gap-x-6 sm:[--pg:1.5rem]">
          <span className="pill-word cue justify-self-end text-right text-[clamp(1.2rem,4.2vw,3.4rem)] font-bold tracking-[-0.03em] whitespace-nowrap" style={span(0.02, 0.2)}>
            {waterPill.left}
          </span>
          <span aria-hidden />
          <span className="pill-word pill-word-r cue justify-self-start text-left text-[clamp(1.2rem,4.2vw,3.4rem)] font-bold tracking-[-0.03em] whitespace-nowrap" style={span(0.02, 0.2)}>
            {waterPill.right}
          </span>
        </div>

        {/* 어두운 겹. 알약으로 잘려 있다가 화면을 덮습니다. */}
        <div className="pill-dark cue absolute inset-0 overflow-hidden bg-tk text-white" style={span(0.02, 0.2)}>
          {/* 영상. 어둠 위에서 떠오르고, 0.36부터 프레임이 넘어갑니다. */}
          <div className="cue-in absolute inset-0" style={{ ...span(0.3, 0.4), "--dy": "0px" } as CSSProperties}>
            <FrameScrub base={`/seq/${seq}`} count={count} from={0.36} to={1} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,28,0.45)_0%,rgba(23,23,28,0)_32%,rgba(23,23,28,0)_68%,rgba(23,23,28,0.55)_100%)]"
            />
          </div>

          {/* 가운데 설명. 제목 밑에 섰다가 영상이 뜨기 전에 사라집니다. */}
          <p
            className="cue-through absolute top-1/2 left-1/2 w-[min(92vw,36rem)] -translate-x-1/2 translate-y-[clamp(2.4rem,4.2vw,3.6rem)] text-center whitespace-pre-line text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-[1.65] text-white/75"
            style={{ ...through(0.19, 0.25, 0.28, 0.34), "--dy": "1rem" } as CSSProperties}
          >
            {waterPill.lead}
          </p>

          {/* 제목. 가운데에 섰다가(0.17 → 0.23) 오른쪽 자막 자리로 날아갑니다(0.32 → 0.42).
              자막 ①은 이 제목과 나머지 문장으로 이루어지고, 0.55부터 떠납니다. */}
          <FlyTitle
            title={waterPill.title}
            rest={rest}
            body={first.body}
            from={0.32}
            to={0.42}
            restFrom={0.43}
            restTo={0.49}
            ghostClassName="text-[clamp(2.2rem,5.4vw,4.4rem)] font-bold leading-[1.2] tracking-[-0.035em]"
            wrapperClassName="cue-through absolute top-1/2 right-6 flex w-[min(90vw,44rem)] -translate-y-1/2 flex-col items-end text-right lg:right-[8vw]"
            wrapperStyle={{ ...through(0.17, 0.23, 0.55, 0.61), "--dy": "1.5rem" } as CSSProperties}
            className="pointer-events-none"
          />

          {/* 자막 ②·③. 왼쪽에 섭니다. */}
          {others.map((c) => (
            <div
              key={c.title}
              className="cue-through pointer-events-none absolute top-1/2 left-6 flex w-[min(90vw,44rem)] -translate-y-1/2 flex-col items-start gap-3 text-left lg:left-[8vw]"
              style={{ ...through(c.at[0], c.at[1], c.at[2], c.at[3]), "--dy": "2rem" } as CSSProperties}
            >
              <p className="text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold leading-[1.22] tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
                {c.title}
              </p>
              {c.body && (
                <p className="whitespace-pre-line text-[clamp(1rem,1.4vw,1.2rem)] font-medium leading-[1.65] text-white/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                  {c.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
