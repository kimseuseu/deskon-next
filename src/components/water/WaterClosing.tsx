import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { gas, water } from "@/data/facility";
import { waterClosing, waterFaq } from "@/data/water-story";
import { getAllPostSummaries } from "@/lib/blog";
import { COMPANY } from "@/lib/constants";

/** 현장 노트 중 급배수 분류의 최신 글. 글과 랜딩이 서로를 가리켜야 검색이 둘을 한 묶음으로 봅니다. */
async function waterNotes(limit = 2) {
  const posts = await getAllPostSummaries(30);
  return posts.filter((p) => p.categories.some((c) => c.name.includes("급배수"))).slice(0, limit);
}

/**
 * 맺음. 스크럽 ③이 해 뜨는 장면으로 끝나므로 맺음은 밝습니다.
 * 가운데에 제목과 알약 버튼 둘, 그 밑에 약속 셋, 자주 묻는 질문 넷, 현장 노트 링크.
 * 두 랜딩은 서로를 가리키므로, 가스기기 임대로 가는 길을 함께 둡니다.
 */
export async function WaterClosing() {
  const phone = water.phone ?? COMPANY.phone;
  const { cta } = water;
  const notes = await waterNotes();
  return (
    <section className="bg-white text-tx" aria-label="상담">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <Reveal className="text-center">
          <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">{waterClosing.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">{waterClosing.lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
            >
              {water.callLabel ?? "전화 상담"}
              <span className="font-medium text-white/85">{phone}</span>
            </a>
            <Link
              href="/support/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-tg px-8 py-4 text-[17px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
            >
              {water.inquiryLabel ?? "설치 문의하기"}
            </Link>
          </div>
          <p className="mt-4 text-[13px] font-medium text-tx-3">{waterClosing.hours}</p>
        </Reveal>

        <Stagger className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-24" gap={0.1}>
          {cta.promises.map((p) => (
            <StaggerItem key={p.title} className="rounded-[24px] bg-tg p-6 text-center">
              <p className="text-[18px] font-bold">{p.title}</p>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{p.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* 자주 묻는 질문. 답은 정의 문장으로 시작합니다. 접지 않고 다 펼쳐 둡니다(검색이 읽습니다). */}
        <Reveal delay={0.05} className="mx-auto mt-20 max-w-3xl lg:mt-28">
          <h3 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold leading-[1.25] tracking-[-0.03em]">{waterFaq.title}</h3>
          <dl className="mt-6 divide-y divide-tg-2 border-y border-tg-2">
            {waterFaq.items.map((f) => (
              <div key={f.q} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <dt className="text-[16px] font-bold leading-[1.45] text-tx">{f.q}</dt>
                <dd className="whitespace-pre-line text-[15px] font-medium leading-[1.7] text-tx-2">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {notes.length > 0 && (
          <Reveal delay={0.05} className="mx-auto mt-14 max-w-3xl">
            <p className="text-[13px] font-semibold text-tx-3">현장 노트</p>
            <ul className="mt-3 divide-y divide-tg-2 border-y border-tg-2">
              {notes.map((n) => (
                <li key={n.id}>
                  <Link href={`/blog/${n.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="text-[16px] font-semibold leading-[1.45] text-tx transition-colors group-hover:text-tb">{n.title}</span>
                    <span aria-hidden className="shrink-0 text-tx-3 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-14 text-center">
          <Link
            href={gas.href}
            className="group inline-flex items-center gap-2 text-[16px] font-semibold text-tx-3 transition-colors hover:text-tx"
          >
            {gas.nameFull} 보기
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
