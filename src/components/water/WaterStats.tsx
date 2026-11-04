import CountUp from "@/components/motion/CountUp";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { waterStats } from "@/data/water-story";

/**
 * 숫자 넷. 화면에 들어오면 0에서 올라갑니다. 연도는 세지 않습니다.
 */
export function WaterStats() {
  return (
    <section className="bg-white text-tx" aria-label="현장 기록 요약">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
            {waterStats.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {waterStats.lead}
          </p>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-24 lg:grid-cols-4" gap={0.12}>
          {waterStats.items.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.04em] text-tx">
                {s.plain ? String(s.value) : <CountUp value={s.value} />}
                {s.unit && <span className="ml-1 text-[0.45em] font-semibold text-tb">{s.unit}</span>}
              </p>
              <p className="mt-4 text-[17px] font-semibold text-tx">{s.label}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-tx-3">{s.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
