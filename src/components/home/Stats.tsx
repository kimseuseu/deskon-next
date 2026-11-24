import CountUp from "@/components/motion/CountUp";
import GrowLine from "@/components/motion/GrowLine";
import { groupStats, network } from "@/data/divisions";
import { COMPANY } from "@/lib/constants";

const [companies, assets, satisfaction, hubs] = groupStats;

/* 장부의 줄. 업력이 맨 위, 거점 줄에만 배송 기준을 덧붙입니다. */
const ROWS: { value: number; suffix: string; label: string; note?: string }[] = [
  { value: COMPANY.years, suffix: "년", label: "업력" },
  companies,
  assets,
  { ...hubs, note: network.sla },
  satisfaction,
];

/**
 * 숫자로 보는 아오보. 어두운 띠 위의 장부 한 장입니다.
 *
 * 숫자는 가운데 조금 오른쪽의 세로축에 오른쪽 끝을 맞춰 서고, 이름은 그 축 오른편에 섭니다.
 * 줄마다 화면에 들어오면 위의 선이 그어지고 숫자가 0에서 올라갑니다.
 * 고정 장면이 아니라 보통 구역이라, 휴대폰과 동작 줄이기에서는 끝 모습 그대로 섭니다.
 * 세는 숫자는 화면 읽기와 검색에 0으로 읽히지 않게 실제 값을 따로 둡니다.
 */
export default function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-tk text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <h2 id="stats-title" className="text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.25] text-balance">
          숫자로 보는 아오보
        </h2>

        <dl className="mt-12 lg:mt-20">
          {ROWS.map((r, i) => (
            <div key={r.label}>
              <GrowLine className="bg-white/15" delay={i * 0.06} />
              <div className="grid grid-cols-[minmax(0,11fr)_minmax(0,9fr)] items-baseline gap-x-5 py-7 sm:gap-x-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-14 lg:py-10">
                <dt className="col-start-2 row-start-1">
                  <span className="block text-[17px] font-semibold tracking-[-0.01em] text-white/90 lg:text-[22px]">{r.label}</span>
                  {r.note && <span className="mt-2 block text-[14px] font-medium leading-[1.5] text-balance text-white/55 lg:text-[15px]">{r.note}</span>}
                </dt>
                <dd className="col-start-1 row-start-1 justify-self-end whitespace-nowrap font-paperlogy text-[clamp(2.4rem,7.2vw,6.25rem)] font-light leading-none tracking-[-0.035em] tabular-nums">
                  <span className="sr-only">
                    {r.value.toLocaleString("ko-KR")}
                    {r.suffix}
                  </span>
                  <span aria-hidden>
                    <CountUp value={r.value} />
                    <span className="ml-[0.08em] text-[0.42em] font-normal tracking-normal text-accent-light">{r.suffix}</span>
                  </span>
                </dd>
              </div>
            </div>
          ))}
          <GrowLine className="bg-white/15" delay={ROWS.length * 0.06} />
        </dl>
      </div>
    </section>
  );
}
