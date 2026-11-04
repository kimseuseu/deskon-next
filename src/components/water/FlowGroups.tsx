import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { waterScope } from "@/data/water-story";

/* 카드마다 다른 빛. 토스의 «대출 · 카드 · 보험» 카드처럼 바탕이 조금씩 다릅니다. */
const GLOW = [
  "from-[#1f3b7a] via-[#17223d] to-tk-2",
  "from-[#173a5e] via-[#162436] to-tk-2",
  "from-[#2a2f6b] via-[#1b1f3a] to-tk-2",
  "from-[#1c4a4e] via-[#172a2f] to-tk-2",
];

/**
 * 네 가지 흐름. 토스 메인의 «수많은 대출 · 카드 · 보험 앞에서» 자리입니다.
 *
 * 제목 안에 흐름 이름이 알약으로 서고, 그 밑에 빛이 다른 카드 넷이 한 줄로
 * 섭니다. 카드 안에는 흐린 유리판 위에 그 흐름이 하는 일이 줄줄이 적혀 있고,
 * 카드 밑에 두 줄 설명이 따릅니다. 어두운 통로의 끝이라 바탕은 어둡습니다.
 */
export function FlowGroups() {
  const { headline, groups } = waterScope;
  return (
    <section className="bg-tk text-white" aria-label={waterScope.title}>
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.45] tracking-[-0.03em] text-balance">
            {headline.before}{" "}
            {headline.pills.map((w) => (
              <span
                key={w}
                className="mx-0.5 inline-block translate-y-[-0.06em] rounded-full bg-white/12 px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb-soft"
              >
                {w}
              </span>
            ))}
            {headline.after}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.1}>
          {groups.map((g, i) => (
            <StaggerItem key={g.name}>
              <div className={`relative isolate aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-b ${GLOW[i % GLOW.length]} p-5 lg:p-6`}>
                {/* 빛. 카드 위쪽에서 번집니다. */}
                <div aria-hidden className="absolute -top-1/3 left-1/2 -z-10 h-[70%] w-[120%] -translate-x-1/2 rounded-full bg-tb/25 blur-3xl" />
                {/* 유리판. 흐름이 하는 일. */}
                <div className="rounded-[20px] border border-white/10 bg-white/8 p-4 backdrop-blur-md lg:p-5">
                  <p className="text-[12px] font-semibold text-white/50">{g.short} 분석 중…</p>
                  <p className="mt-1 text-[18px] font-bold tracking-[-0.02em]">{g.name}</p>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 rounded-xl bg-white/8 px-3 py-2 text-[13px] font-semibold text-white/85">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-tb-soft" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/support/contact"
                  aria-label={`${g.name} 문의하기`}
                  className="absolute right-5 bottom-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/30 lg:right-6 lg:bottom-6"
                >
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <p className="mt-5 whitespace-pre-line text-[16px] font-semibold leading-[1.6] text-white/80">{g.blurb}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
