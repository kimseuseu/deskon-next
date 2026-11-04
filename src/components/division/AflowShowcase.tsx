"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STEPS = [
  { no: "01", title: "홈 & 주변 거점", desc: "가까운 스테이션과 이용 가능 장비를 한눈에" },
  { no: "02", title: "QR 스캔", desc: "장비의 QR 코드에 카메라를 맞추면 끝" },
  { no: "03", title: "요금 확인 & 대여", desc: "요금제를 고르면 예상 요금이 바로 계산" },
  { no: "04", title: "이용 & 반납", desc: "실시간 요금 확인, 반납도 버튼 하나로" },
] as const;

/* 전화기 목업. 원래 랜딩의 A-flow 앱 화면 넷입니다. */
function PhoneMockup({ activeScreen }: { activeScreen: number }) {
  const screens = [
    // Screen 0: Home
    <div key="home" className="flex h-full flex-col p-4" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold" style={{ color: "#0F172A" }}>안녕하세요, 사용자님</p>
          <div className="mt-0.5 flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            <p className="text-[9px]" style={{ color: "#64748B" }}>GREEN</p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <span className="text-[10px]">🔔</span>
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
            <span className="text-sm text-white">📷</span>
          </div>
          <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>QR 스캔</p>
          <p className="mt-0.5 text-[8px]" style={{ color: "#94A3B8" }}>장비 QR을 스캔</p>
          <div className="mt-1 flex items-center gap-0.5">
            <p className="text-[9px] font-semibold" style={{ color: "#2563EB" }}>스캔하기</p>
            <span className="text-[8px]" style={{ color: "#2563EB" }}>→</span>
          </div>
        </div>
        <div className="flex-1 rounded-2xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
            <span className="text-sm text-white">📍</span>
          </div>
          <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>주변 거점</p>
          <p className="mt-0.5 text-[8px]" style={{ color: "#94A3B8" }}>가장 가까운 거점</p>
          <div className="mt-1 flex items-center gap-0.5">
            <p className="text-[9px] font-semibold" style={{ color: "#059669" }}>지도 보기</p>
            <span className="text-[8px]" style={{ color: "#059669" }}>→</span>
          </div>
        </div>
      </div>

      <div className="mb-3 flex rounded-2xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
        {[
          { num: "3", label: "주변 거점", color: "#0F172A" },
          { num: "12", label: "이용 가능", color: "#22C55E" },
          { num: "7", label: "총 이용", color: "#0F172A" },
        ].map((s, i) => (
          <div key={s.label} className="flex-1 text-center" style={{ borderLeft: i > 0 ? "1px solid #E2E8F0" : "none" }}>
            <p className="text-sm font-bold" style={{ color: s.color }}>{s.num}</p>
            <p className="text-[8px]" style={{ color: "#94A3B8" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 text-[10px] font-bold" style={{ color: "#0F172A" }}>가까운 거점</p>
      {[
        { name: "광명물류센터 A동", dist: "350m", count: 5 },
        { name: "시흥배송센터", dist: "1.2km", count: 7 },
      ].map((st) => (
        <div key={st.name} className="mb-1.5 flex items-center gap-3 rounded-xl p-2.5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "#EFF6FF" }}>
            <span className="text-sm">📍</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold" style={{ color: "#0F172A" }}>{st.name}</p>
            <p className="text-[8px]" style={{ color: "#94A3B8" }}>{st.dist} · {st.count}대 이용 가능</p>
          </div>
          <span className="text-[10px]" style={{ color: "#94A3B8" }}>›</span>
        </div>
      ))}

      <div className="mt-auto flex justify-around pt-3" style={{ borderTop: "1px solid #E2E8F0" }}>
        {[
          { icon: "🏠", label: "홈", active: true },
          { icon: "📷", label: "스캔" },
          { icon: "📋", label: "이용내역" },
          { icon: "👤", label: "마이" },
        ].map((tab) => (
          <div key={tab.label} className="text-center">
            <div className={`text-base ${tab.active ? "opacity-100" : "opacity-30"}`}>{tab.icon}</div>
            <p className="mt-0.5 text-[7px]" style={{ color: tab.active ? "#2563EB" : "#94A3B8" }}>{tab.label}</p>
          </div>
        ))}
      </div>
    </div>,

    // Screen 1: QR Scan
    <div key="qr" className="relative flex h-full flex-col items-center justify-center" style={{ backgroundColor: "#0F172A" }}>
      <div className="relative mb-6 h-44 w-44">
        <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-[3px] border-t-[3px]" style={{ borderColor: "#2563EB" }} />
        <div className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-[3px] border-t-[3px]" style={{ borderColor: "#2563EB" }} />
        <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-[3px] border-l-[3px]" style={{ borderColor: "#2563EB" }} />
        <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-[3px] border-r-[3px]" style={{ borderColor: "#2563EB" }} />
        <div className="absolute left-2 right-2 h-0.5 animate-[scanMove_2s_ease-in-out_infinite] rounded-full" style={{ backgroundColor: "#2563EB", top: "50%", boxShadow: "0 0 8px #2563EB" }} />
      </div>
      <p className="mb-1 text-sm font-semibold text-white">QR 코드를 스캔하세요</p>
      <p className="text-[11px]" style={{ color: "#64748B" }}>장비에 부착된 QR 코드에 카메라를 맞춰주세요</p>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="rounded-full px-4 py-2" style={{ backgroundColor: "#1E293B" }}>
          <p className="text-[10px] text-white/60">직접 입력</p>
        </div>
      </div>
    </div>,

    // Screen 2: Rental confirm
    <div key="confirm" className="flex h-full flex-col" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <p className="text-xs font-bold" style={{ color: "#0F172A" }}>대여 확인</p>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4 rounded-2xl p-5 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "#EFF6FF" }}>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-sm font-bold" style={{ color: "#0F172A" }}>철제 롤테이너</p>
          <p className="text-[10px]" style={{ color: "#94A3B8" }}>RT-0042 · 광명 A동</p>
        </div>

        <div className="mb-4 flex gap-1.5">
          {[
            { label: "시간제", active: true },
            { label: "일일(8h)", active: false },
            { label: "주간", active: false },
          ].map((p) => (
            <div
              key={p.label}
              className="flex-1 rounded-xl py-2 text-center"
              style={{
                backgroundColor: p.active ? "#2563EB" : "#FFFFFF",
                border: p.active ? "none" : "1px solid #E2E8F0",
              }}
            >
              <p className="text-[10px] font-semibold" style={{ color: p.active ? "#FFFFFF" : "#64748B" }}>{p.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <div className="mb-2 flex justify-between">
            <span className="text-[10px]" style={{ color: "#94A3B8" }}>기본료</span>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>5,000원</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-[10px]" style={{ color: "#94A3B8" }}>시간당</span>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>1,500원/h</span>
          </div>
          <div className="flex justify-between pt-2" style={{ borderTop: "1px solid #F1F5F9" }}>
            <span className="text-[10px] font-bold" style={{ color: "#0F172A" }}>예상 요금 (4시간)</span>
            <span className="text-xs font-bold" style={{ color: "#2563EB" }}>11,000원</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="w-full rounded-xl py-3 text-center" style={{ backgroundColor: "#2563EB" }}>
          <p className="text-sm font-bold text-white">대여 시작하기</p>
        </div>
      </div>
    </div>,

    // Screen 3: Active rental
    <div key="active" className="flex h-full flex-col" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E2E8F0" }}>
        <p className="text-xs font-bold" style={{ color: "#0F172A" }}>이용 중</p>
      </div>
      <div className="flex-1 p-4">
        <div className="relative mb-4 rounded-2xl">
          <div className="absolute -inset-0.5 animate-pulse rounded-2xl" style={{ border: "2px solid #2563EB", opacity: 0.4 }} />
          <div className="relative rounded-2xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #DBEAFE" }}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ backgroundColor: "#F0FDF4" }}>
                <div className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#22C55E" }} />
                <span className="text-[9px] font-bold" style={{ color: "#22C55E" }}>이용 중</span>
              </div>
              <span className="ml-auto text-[10px] font-bold" style={{ color: "#0F172A" }}>철제 롤테이너</span>
            </div>

            <div className="mb-3 text-center">
              <p className="text-[9px]" style={{ color: "#94A3B8" }}>이용 시간</p>
              <p className="text-2xl font-bold tabular-nums tracking-tight" style={{ color: "#0F172A" }}>02:34:15</p>
            </div>

            <div className="flex items-center justify-between rounded-xl p-3" style={{ backgroundColor: "#EFF6FF" }}>
              <div>
                <p className="text-[9px]" style={{ color: "#64748B" }}>현재 요금</p>
                <p className="text-base font-bold" style={{ color: "#2563EB" }}>8,500원</p>
              </div>
              <div className="text-right">
                <p className="text-[9px]" style={{ color: "#64748B" }}>스테이션</p>
                <p className="text-[10px] font-semibold" style={{ color: "#0F172A" }}>광명 A동</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl py-3 text-center" style={{ backgroundColor: "#0F172A" }}>
          <p className="text-sm font-bold text-white">반납하기</p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="relative mx-auto" style={{ width: 280, height: 560 }}>
      {/* 어두운 전화기 틀. 장식 테두리는 없습니다. */}
      <div className="absolute inset-0 rounded-[44px] bg-tk shadow-[0_24px_60px_rgba(25,31,40,0.18)]" />
      <div className="absolute inset-[3px] overflow-hidden rounded-[41px]">
        <div className="absolute inset-0 bg-[#F8FAFC]" />
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />
        {/* Screen content */}
        <div className="absolute inset-0 top-6 bottom-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0"
            >
              {screens[activeScreen]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 z-10 h-1 w-32 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

/* ── Section: A-flow app showcase (sharing division) ── */
export default function AflowShowcase() {
  const [screen, setScreen] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!autoPlay || reduce) return;
    const id = setInterval(() => setScreen((prev) => (prev + 1) % STEPS.length), 3800);
    return () => clearInterval(id);
  }, [autoPlay, reduce]);

  return (
    <section className="overflow-hidden bg-tg text-tx">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
        {/* 글과 단계 */}
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.3] tracking-[-0.03em] text-balance">
              주머니 속의{" "}
              <span className="mx-0.5 inline-block rounded-full bg-white px-[0.55em] py-[0.08em] text-[0.82em] font-bold text-tb">스테이션</span>,
              <br />
              에이플로우
            </h2>
            <p className="mt-5 max-w-md whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
              {"장비에 붙은 QR 코드를 스캔하면 대여가 시작됩니다.\n서류도, 보증금도 없이 대여부터 반납, 정산까지 앱 하나로 끝납니다."}
            </p>
          </Reveal>

          {/* 화면 단계. 고른 단계가 흰 카드로 떠오릅니다. */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-2" role="tablist" aria-label="에이플로우 앱 화면">
              {STEPS.map((s, i) => {
                const active = screen === i;
                return (
                  <button
                    key={s.no}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setScreen(i);
                      setAutoPlay(false);
                    }}
                    className={`group flex w-full items-center gap-4 rounded-[20px] px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tb ${
                      active ? "bg-white shadow-[0_12px_40px_rgba(25,31,40,0.06)]" : "hover:bg-white/60"
                    }`}
                  >
                    <span className="flex-1">
                      <span className={`block text-[17px] font-bold tracking-[-0.02em] transition-colors duration-200 ${active ? "text-tx" : "text-tx-2"}`}>
                        {s.title}
                      </span>
                      <span className={`mt-1 block text-[14px] font-medium leading-relaxed transition-colors duration-200 ${active ? "text-tx-2" : "text-tx-3"}`}>
                        {s.desc}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`text-tb transition-[transform,opacity] duration-200 ${
                        active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8">
              <span className="inline-flex rounded-full bg-tb-soft px-3 py-1 text-[13px] font-semibold text-tb">A-flow app, coming soon</span>
            </p>
          </Reveal>
        </div>

        {/* 전화기 */}
        <div className="lg:col-span-6">
          <Reveal direction="none" duration={1.1}>
            <div className="relative flex justify-center py-6">
              {/* 파란 빛이 뒤에서 번집니다. */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tb/10 blur-3xl"
              />
              <PhoneMockup activeScreen={screen} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
