import { Scene } from "@/components/film/Scene";
import { span } from "@/components/film/cue";

/**
 * 설치서비스 장면. 관 한 줄이 왼쪽에서 오른쪽으로 그어지고, 관이 닿는
 * 자리마다 설치 항목이 하나씩 섭니다. 배관공사와 호스 연결을 파는 페이지라,
 * 선이 그어지는 동작 자체가 내용입니다.
 *
 *   0.00 → 0.12  제목과 설명이 선다.
 *   0.14 → 0.86  관이 그어진다. 항목은 관이 지나는 순서대로 선다.
 *   0.88 → 0.98  손글씨 한 줄.
 */
export function PipeFilm({
  title,
  lead,
  items,
  caption,
}: {
  title: string;
  lead: string;
  items: readonly string[];
  caption: string;
}) {
  const stepGap = 0.72 / items.length;
  return (
    <Scene className="pipe" aria-label={title}>
      <div className="stage bg-paper pt-[var(--bar)]">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-10">
          <h2
            className="cue-in font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary"
            style={span(0, 0.1)}
          >
            {title}
          </h2>
          <p className="cue-in mt-4 max-w-xl text-[15px] leading-[1.9] text-muted md:text-base" style={span(0.04, 0.14)}>
            {lead}
          </p>

          <div className="relative mt-14 lg:mt-24">
            <div aria-hidden className="h-px w-full bg-line" />
            <div aria-hidden className="pipe-line cue absolute left-0 top-0 h-px w-full bg-gold" style={span(0.14, 0.86)} />

            <ol
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-7"
              style={{ gridTemplateColumns: undefined }}
            >
              {items.map((item, i) => (
                <li
                  key={item}
                  className="cue-in relative"
                  style={span(0.14 + i * stepGap, 0.24 + i * stepGap)}
                >
                  {/* 관 위의 이음새. 한 줄로 서는 넓은 화면에서만 관과 자리가 맞습니다. */}
                  <span
                    aria-hidden
                    className="absolute -top-[calc(2rem+4px)] left-0 hidden h-2 w-2 rotate-45 bg-gold lg:block"
                  />
                  <span className="block font-paperlogy text-lg font-medium leading-snug text-primary lg:text-xl">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="cue-in mt-14 font-serif text-lg italic text-accent-deep md:text-xl lg:mt-20" style={span(0.88, 0.98)}>
            {caption}
          </p>
        </div>
      </div>
    </Scene>
  );
}
