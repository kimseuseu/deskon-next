import type { CSSProperties } from "react";

/**
 * 스크롤로 쳐지는 제목. 토스 메인의 «상품 판매와 |청산» 자리입니다.
 *
 * 글자마다 제 번호(--i)가 있고, 장면 진행도(--p)에 글자 수(--n)를 곱한 값이
 * 번호를 지나면 또렷해집니다. 아직 안 친 글자는 흐리게 남아 있어 전체 길이가
 * 보이고, 지금 치는 글자 뒤에 파란 캐럿이 섭니다(globals.css의 .ty-char).
 *
 *   from, to   장면 진행도에서 타자가 시작하고 끝나는 구간.
 */
export function Typewriter({
  lines,
  from = 0,
  to = 1,
  className = "",
}: {
  lines: string[];
  from?: number;
  to?: number;
  className?: string;
}) {
  const chars = lines.map((l) => [...l]);
  const n = chars.reduce((a, l) => a + l.length, 0);
  let k = 0;
  return (
    <span className={`ty ${className}`} style={{ "--n": n, "--from": from, "--to": to } as CSSProperties} aria-label={lines.join(" ")}>
      {chars.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.map((ch, ci) => {
            const i = k++;
            return (
              <span key={ci} className="ty-char" style={{ "--i": i } as CSSProperties}>
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
