import Link from "next/link";
import { AovoSymbol } from "./AovoSymbol";

type Tone = "dark" | "light";
type Size = "sm" | "md" | "lg";

/* 락업의 글자 크기. 심볼은 글자보다 한 뼘 큰 1.1em으로 서서 마크가 먼저 읽히고,
   획을 굵혀 글자와 무게를 맞춥니다. 심볼과 글자 사이는 0.4em. */
const SIZES: Record<Size, { font: string; gap: string }> = {
  sm: { font: "text-[22px]", gap: "gap-[0.45em]" },
  md: { font: "text-[30px]", gap: "gap-[0.4em]" },
  lg: { font: "text-[48px]", gap: "gap-[0.45em]" },
};

/**
 * 로고 락업. 심볼은 인라인 SVG(AovoSymbol)로 획을 굵혀 그리고,
 * 워드마크는 Paperlogy 세미볼드로 씁니다. 양식은 둘뿐입니다.
 *   dark  흰 바탕: 파란 심볼 + 먹색 글자
 *   light 어두운 바탕: 둘 다 흰색
 *   group 푸터에서만, 같은 산세리프 가는 굵기 회색으로 «Group»을 답니다.
 */
export function LogoMark({
  tone = "dark",
  size = "md",
  group = false,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  /** 워드마크 뒤에 가는 회색 «Group»을 답니다. 푸터 전용. */
  group?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={`inline-flex items-center ${s.font} ${s.gap} ${className}`}>
      <AovoSymbol className={`h-[1.1em] w-auto -translate-y-[0.02em] ${tone === "dark" ? "text-tb" : "text-white"}`} />
      <span className={`font-paperlogy font-semibold leading-none tracking-[-0.02em] ${tone === "dark" ? "text-tx" : "text-white"}`}>AOVO</span>
      {group && (
        <span className={`ml-[0.05em] font-paperlogy text-[0.78em] font-light leading-none tracking-[-0.01em] ${tone === "dark" ? "text-tx-3" : "text-white/55"}`}>
          Group
        </span>
      )}
    </span>
  );
}

/** 홈으로 가는 로고 링크. */
export default function Logo({
  tone = "dark",
  size = "md",
  group = false,
  className = "",
  onClick,
}: {
  tone?: Tone;
  size?: Size;
  group?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/" aria-label="AOVO 홈" onClick={onClick} className={`inline-flex shrink-0 items-center ${className}`}>
      <LogoMark tone={tone} size={size} group={group} />
    </Link>
  );
}
