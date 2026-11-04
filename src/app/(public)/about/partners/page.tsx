import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { COMPANY } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const programACards = [
  {
    title: "이런 분들에게 추천합니다",
    items: [
      { label: "부동산 중개업소", desc: "사무실 이전 고객을 자주 만나는 중개사" },
      { label: "인테리어 업체", desc: "사무공간 시공 시 가구 수요 연결" },
      { label: "건물 관리사무소", desc: "입주 기업에 가구 서비스 안내" },
      { label: "사무실 이전 업체", desc: "이사와 함께 새 가구 필요 고객 소개" },
    ],
  },
  {
    title: "소개 절차",
    steps: [
      { num: "01", label: "고객 발굴", desc: "사무실 집기/가구가 필요한 고객을 확인합니다" },
      { num: "02", label: "아오보 소개", desc: "고객 연락처를 아오보 그룹에 전달합니다" },
      { num: "03", label: "상담 및 계약", desc: "아오보 그룹이 직접 고객을 상담하고 계약합니다" },
      { num: "04", label: "리워드 정산", desc: "계약 성사 후 D+7일 이내 파트너 리워드를 정산합니다" },
    ],
  },
  {
    title: "리워드 구조",
    details: [
      { stat: "협의", label: "계약 금액 기반 리워드" },
      { stat: "무제한", label: "소개 횟수 제한 없음" },
      { stat: "D+7", label: "계약 후 7일 이내 정산" },
      { stat: "전담", label: "파트너 전담 매니저 배정" },
    ],
  },
  {
    title: "이런 경우를 상상해 보세요",
    scenario:
      "부동산 중개사 A씨는 사무실 임대 계약을 마친 고객에게 아오보 그룹을 소개했습니다. 고객은 사무가구 패키지 500만 원 계약을 체결했고, A씨는 별도 영업 없이 파트너 리워드를 D+7일 이내에 지급받았습니다. 소개만 했을 뿐인데 추가 수익이 발생한 것입니다.",
  },
];

const programBCards = [
  {
    title: "이런 업장에 적합합니다",
    items: [
      { label: "대형마트", desc: "고객 장보기용 카트, 롤테이너 대여" },
      { label: "물류센터", desc: "입출고 작업용 장비 공유" },
      { label: "창고 / 공장", desc: "내부 운반 장비 수요 해결" },
      { label: "유통센터 / 시장", desc: "상인 및 고객 대상 장비 대여" },
    ],
  },
  {
    title: "운영 방식",
    steps: [
      { num: "01", label: "파트너 신청", desc: "온라인 또는 전화로 파트너를 신청합니다" },
      { num: "02", label: "현장 실사", desc: "아오보 그룹이 업장을 방문하여 배치 계획을 수립합니다" },
      { num: "03", label: "장비 설치", desc: "물류장비와 QR 시스템을 설치합니다" },
      { num: "04", label: "운영 및 정산", desc: "이용료 발생 시 매월 파트너 리워드를 정산합니다" },
    ],
  },
  {
    title: "수익 구조",
    details: [
      { stat: "0원", label: "초기 비용 (장비 무상 제공)" },
      { stat: "매월", label: "이용료 기반 리워드 정산" },
      { stat: "자동", label: "아오보 앱으로 자동 관리" },
      { stat: "무관리", label: "장비 유지보수 아오보 부담" },
    ],
  },
  {
    title: "아오보 그룹이 제공하는 것",
    provisions: [
      "롤테이너, 카트, 스태커 등 물류장비 무상 제공",
      "QR 코드 기반 대여 시스템 구축",
      "아오보 앱을 통한 실시간 이용 현황 관리",
      "장비 유지보수 및 교체",
      "이용자 보험 적용",
    ],
  },
];

const commonBenefits = [
  {
    title: "전담 매니저",
    desc: "파트너별 전담 매니저를 배정하여 신속한 소통과 맞춤 지원을 제공합니다.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "마케팅 지원",
    desc: "파트너 업장 홍보물, 온라인 배너, 공동 프로모션 등 마케팅 자료를 제공합니다.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
      </svg>
    ),
  },
  {
    title: "교육 지원",
    desc: "파트너 직원 대상 서비스 교육, 장비 사용법 안내, 운영 매뉴얼을 제공합니다.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const SECTION_TITLE = "text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance";
const LEAD = "whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2";
const CARD_TITLE = "text-[20px] font-bold tracking-[-0.02em] text-tx";

/* ------------------------------------------------------------------ */
/*  Card renderers                                                     */
/* ------------------------------------------------------------------ */
function ItemsCard({ title, items }: { title: string; items: { label: string; desc: string }[] }) {
  return (
    <>
      <h4 className={CARD_TITLE}>{title}</h4>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-[15px] font-bold text-tx">{item.label}</p>
            <p className="mt-1 text-[14px] font-medium leading-relaxed text-tx-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function StepsCard({ title, steps }: { title: string; steps: { num: string; label: string; desc: string }[] }) {
  return (
    <>
      <h4 className={CARD_TITLE}>{title}</h4>
      <ol className="mt-6 space-y-4">
        {steps.map((s) => (
          <li key={s.num} className="flex items-start gap-3.5">
            <span aria-hidden className="mt-[0.45em] h-2.5 w-2.5 shrink-0 rounded-full bg-tb" />
            <div>
              <p className="text-[15px] font-bold text-tx">{s.label}</p>
              <p className="mt-1 text-[14px] font-medium leading-relaxed text-tx-2">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function DetailsCard({ title, details }: { title: string; details: { stat: string; label: string }[] }) {
  return (
    <>
      <h4 className={CARD_TITLE}>{title}</h4>
      <div className="mt-6 grid grid-cols-2 gap-5">
        {details.map((d) => (
          <div key={d.label}>
            <p className="text-[26px] font-bold leading-none tracking-[-0.03em] text-tb">{d.stat}</p>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{d.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ScenarioCard({ title, scenario }: { title: string; scenario: string }) {
  return (
    <>
      <h4 className={CARD_TITLE}>{title}</h4>
      <p className="mt-4 text-[15px] font-medium leading-[1.75] text-tx-2">{scenario}</p>
    </>
  );
}

function ProvisionsCard({ title, provisions }: { title: string; provisions: string[] }) {
  return (
    <>
      <h4 className={CARD_TITLE}>{title}</h4>
      <ul className="mt-6 space-y-3">
        {provisions.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-tb" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className="text-[15px] font-medium leading-relaxed text-tx-2">{p}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Render a single program card by type                               */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProgramCard({ card }: { card: any }) {
  if ("items" in card) return <ItemsCard title={card.title} items={card.items} />;
  if ("steps" in card) return <StepsCard title={card.title} steps={card.steps} />;
  if ("details" in card) return <DetailsCard title={card.title} details={card.details} />;
  if ("scenario" in card) return <ScenarioCard title={card.title} scenario={card.scenario} />;
  if ("provisions" in card) return <ProvisionsCard title={card.title} provisions={card.provisions} />;
  return null;
}

function StatTile({ stat, label, surface }: { stat: string; label: string; surface: string }) {
  return (
    <div className={`rounded-[20px] p-5 text-center ${surface}`}>
      <p className="text-[24px] font-bold leading-none tracking-[-0.03em] text-tb">{stat}</p>
      <p className="mt-2 text-[13px] font-semibold text-tx-3">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PartnersPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <PageHero
        eyebrow="Partnership Program"
        title={<>파트너와 함께<br />성장합니다</>}
        description="소개만으로 수익을, 공간만으로 수익을. 아오보 그룹의 두 가지 파트너 프로그램을 만나보세요."
      />

      {/* ========== PROGRAM A: 사무가구 파트너 리워드 ========== */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--bar)+3rem)] lg:self-start">
              <Reveal>
                <h2 className={SECTION_TITLE}>
                  고객만 소개하면
                  <br />
                  파트너 리워드 지급
                </h2>
                <p className={`mt-6 max-w-md ${LEAD}`}>
                  {"사무실 집기/가구가 필요한 고객을 아오보 그룹에 소개해 주세요.\n아오보 그룹이 직접 상담하고 계약하며, 계약 성사 시 계약 규모에 따른 파트너 리워드를 지급합니다.\n영업 부담 없이 소개만 하시면 됩니다."}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10 grid grid-cols-3 gap-3">
                <StatTile stat="협의" label="리워드" surface="bg-tg" />
                <StatTile stat="D+7" label="정산 주기" surface="bg-tg" />
                <StatTile stat="1:1" label="전담 매니저" surface="bg-tg" />
              </Reveal>
            </div>

            <Stagger className="space-y-4" gap={0.1}>
              {programACards.map((card) => (
                <StaggerItem key={card.title} className="rounded-[28px] bg-tg p-7 lg:p-8">
                  <ProgramCard card={card} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ========== PROGRAM B: 물류장비 QR 공유서비스 (reversed layout) ========== */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Stagger className="order-2 space-y-4 lg:order-1" gap={0.1}>
              {programBCards.map((card) => (
                <StaggerItem key={card.title} className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] lg:p-8">
                  <ProgramCard card={card} />
                </StaggerItem>
              ))}
            </Stagger>

            <div className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--bar)+3rem)] lg:self-start">
              <Reveal>
                <h2 className={SECTION_TITLE}>
                  내 업장에서
                  <br />
                  장비 공유 수익을
                </h2>
                <p className={`mt-6 max-w-md ${LEAD}`}>
                  {"파트너 업장에 아오보 물류장비(롤테이너, 카트, 스태커 등)를 배치하면, 방문 고객이 QR 코드로 장비를 대여합니다.\n발생하는 이용료의 일부를 파트너에게 매월 파트너 리워드로 지급합니다."}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10 grid grid-cols-3 gap-3">
                <StatTile stat="0원" label="초기 비용" surface="bg-white" />
                <StatTile stat="매월" label="정산 주기" surface="bg-white" />
                <StatTile stat="앱" label="자동 관리" surface="bg-white" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 공통 파트너 혜택 ========== */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>공통 파트너 혜택</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            {commonBenefits.map((b) => (
              <StaggerItem key={b.title} className="h-full rounded-[28px] bg-tg p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-tb">{b.icon}</div>
                <h3 className="mt-5 text-[18px] font-bold">{b.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{b.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-tk text-white" aria-label="파트너 문의">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center lg:py-36">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.2] tracking-[-0.035em] text-balance">
              지금 파트너가 되어 보세요
            </h2>
            <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-white/60">
              {"파트너 리워드든, 장비 공유 수익이든, 아오보와 함께라면 새로운 수익 채널이 열립니다.\n부담 없이 문의해 주세요."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/support/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-tb px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
              >
                파트너 문의하기
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/12 px-8 py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-white/20 active:scale-[0.98] sm:w-auto"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {COMPANY.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
