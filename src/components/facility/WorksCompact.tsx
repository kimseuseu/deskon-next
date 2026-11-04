import { gas, inspection } from "@/data/facility";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** 문장 끝에서 줄을 바꿉니다. 한 문장이 한 줄입니다. */
const lines = (text: string) => text.replace(/\.\s+/g, ".\n");

/**
 * 시공. 이 페이지의 주인공은 임대라서, 배관공사와 검사대행은 맨 아래에
 * 한 화면 안으로 접어 둡니다. 임대 기기도 가스설비이고 같은 팀이 시공까지
 * 한다는 사실만 전하면 됩니다. 자세한 항목은 접힌 채로도 전부 읽힙니다.
 */
export function WorksCompact() {
  const { install } = gas;
  return (
    <section className="bg-tg text-tx" aria-label="설치 · 배관 · 검사대행">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
            설치 · 배관 · 검사대행도
            <br />
            같은 팀이 합니다
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
            {lines(install.lead)}
          </p>
          <p className="mt-3 text-[15px] font-semibold text-tb">{gas.caption}</p>
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-2" gap={0.1}>
          <StaggerItem className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
            <h3 className="text-[18px] font-bold">{install.title}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {install.items.map((item) => (
                <li key={item} className="rounded-full bg-tg px-3.5 py-1.5 text-[14px] font-semibold text-tx">
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
            <h3 className="text-[18px] font-bold">{inspection.title}</h3>
            <ul className="mt-5 space-y-4">
              {inspection.items.map((item) => (
                <li key={item.title}>
                  <p className="text-[15px] font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-[14px] font-medium leading-relaxed text-tx-2">{item.description}</p>
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex rounded-full bg-tb-soft px-3 py-1 text-[13px] font-semibold text-tb">
              {inspection.document}
            </span>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
