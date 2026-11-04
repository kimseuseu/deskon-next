import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { COMPANY } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

const infoItems = [
  {
    label: "주소",
    value: COMPANY.address,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    label: "전화",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone}`,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    label: "팩스",
    value: COMPANY.fax,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12Zm-2.25 0h.008v.008H16.5V12Z" />
      </svg>
    ),
  },
  {
    label: "이메일",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "영업시간",
    value: "평일 09:00 - 18:00",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const directions = [
  {
    label: "지하철",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: [
      "서울 지하철 7호선 철산역 하차 → 2번 출구 → 버스 환승 (약 15분)",
      "서울 지하철 1호선 금천구청역 하차 → 마을버스 환승 (약 20분)",
    ],
  },
  {
    label: "버스",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: [
      "간선버스: 금오로 방면 정류장 하차 후 도보 약 5분",
      "마을버스: 옥길동 방면 운행 노선 이용",
    ],
  },
  {
    label: "자가용",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    lines: [
      "서해안고속도로 광명IC → 금오로 방면 우회전 → 약 10분 소요",
      "내비게이션에 \"인천광역시 제물포구 항동 서해대로 111 킴샵그룹\" 입력",
      "건물 내 주차장 이용 가능",
    ],
  },
];

export default function LocationPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Location"
        title="오시는 길"
        description="인천 제물포구 서해대로 111, AOVO 본사를 방문해 주세요."
      />

      {/* Map + Info */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <div className="grid gap-4 lg:grid-cols-5">
            <Reveal className="min-h-[450px] overflow-hidden rounded-[28px] bg-tg lg:col-span-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.5!2d126.8603!3d37.4372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI2JzE0LjAiTiAxMjbCsDUxJzM3LjEiRQ!5e0!3m2!1sko!2skr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 450 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AOVO Group 본사 위치 - 인천광역시 제물포구 항동 서해대로 111 킴샵그룹"
                className="block h-full w-full"
              />
            </Reveal>

            <Stagger className="rounded-[28px] bg-tg p-7 lg:col-span-2 lg:p-8" gap={0.08}>
              <StaggerItem>
                <h2 className="text-[22px] font-bold tracking-[-0.02em]">연락처 정보</h2>
              </StaggerItem>
              <div className="mt-7 space-y-5">
                {infoItems.map((item) => (
                  <StaggerItem key={item.label} className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-tb">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-tx-3">{item.label}</p>
                      {"href" in item && item.href ? (
                        <a href={item.href} className="mt-0.5 block break-all text-[16px] font-semibold text-tx transition-colors hover:text-tb">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[16px] font-semibold text-tx">{item.value}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </div>
              <StaggerItem className="mt-8">
                <a
                  href={COMPANY.kakaoChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
                >
                  카카오톡 상담
                </a>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">찾아오시는 방법</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            {directions.map((dir) => (
              <StaggerItem key={dir.label} className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-tb-soft text-tb">{dir.icon}</div>
                <h3 className="mt-5 text-[18px] font-bold">{dir.label}</h3>
                <ul className="mt-3 space-y-2.5">
                  {dir.lines.map((line, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] font-medium leading-relaxed text-tx-2">
                      <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-tb" />
                      {line}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Address summary */}
          <Reveal className="mt-4 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)] md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tb-soft text-tb">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-tx-3">방문 주소</p>
                <p className="mt-0.5 text-[16px] font-semibold text-tx">{COMPANY.address}</p>
              </div>
            </div>
            <a
              href="https://map.kakao.com/link/to/AOVO,37.4372,126.8603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] md:w-auto"
            >
              카카오맵에서 길찾기
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
