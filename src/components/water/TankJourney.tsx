"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { controlBox } from "@/data/facility";
import { waterCompare, waterJourney } from "@/data/water-story";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * 물탱크 여정. 토스 메인의 «토스쇼핑» 세 패널과 같은 문법입니다.
 *
 * 왼쪽에 둥근 액자 하나가 화면에 붙어 있고, 오른쪽 글이 세 번 바뀝니다.
 * 액자 안에는 패널마다 물건 하나만 섭니다. 겹치는 카드도, 흐린 배경도 없습니다.
 *
 *   1  탱크 한 통        탱크를 놓고 가는 일. 렌탈이 끝나는 자리.
 *   2  한 벌             물이 돌게 하는 일. 같은 탱크에 펌프·호스·싱크대가 붙는다.
 *   3  배수 컨트롤 박스  한 벌의 배수 끝에 붙는 상자.
 *
 * 어느 패널인지는 오른쪽 글이 화면 가운데 띠에 들어왔는지로 잽니다.
 * 전화기에서는 액자를 붙이지 않고, 패널마다 글 위에 그 물건을 둡니다.
 */
export function TankJourney() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tr = { duration: reduce ? 0 : 0.7, ease: EASE };

  const panels = [
    {
      key: "rental",
      label: waterCompare.left.title,
      title: "탱크를 놓고 가는 일.",
      lead: "물탱크 렌탈은 탱크를 내려놓으면 끝납니다.",
      rows: waterCompare.left.rows,
      muted: true,
      visual: (
        <Image src={waterJourney.tank.src} alt={waterJourney.tank.alt} width={391} height={598} className="h-[72%] w-auto drop-shadow-[0_30px_40px_rgba(25,31,40,0.22)]" />
      ),
    },
    {
      key: "aovo",
      label: waterCompare.right.title,
      title: "물이 돌게 하는 일.",
      lead: "탱크만으로는 싱크대에서 한 방울도 나오지 않습니다.\n펌프와 호스, 싱크대까지 한 벌이어야 물이 돕니다.",
      rows: waterCompare.right.rows,
      muted: false,
      visual: (
        <Image src={waterJourney.set.src} alt={waterJourney.set.alt} width={884} height={497} className="w-[86%] drop-shadow-[0_30px_40px_rgba(25,31,40,0.22)]" />
      ),
    },
    {
      key: "box",
      label: controlBox.productName,
      title: controlBox.title,
      lead: controlBox.lead,
      rows: controlBox.features.map((f) => `${f.title}. ${f.description}`),
      muted: false,
      visual: (
        <div className="absolute inset-0">
          <Image src={controlBox.image} alt={controlBox.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-white text-tx" aria-label="물탱크 여정">
      {/* 앞 장면의 격자가 여기까지 이어지다가 흰 바탕으로 풀립니다. */}
      <div aria-hidden className="tw-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[52svh]" />
      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 px-6 lg:grid-cols-12 lg:gap-x-12">
        {/* 액자. 넓은 화면에서만 붙습니다. */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative aspect-[4/5] w-full max-h-[78svh] overflow-hidden rounded-[32px] bg-tg">
              {/* 위쪽에서 내려오는 부드러운 빛. 물건이 바닥에 선 것처럼 보입니다. */}
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(255,255,255,0.9),rgba(255,255,255,0)_60%)]" />
              {panels.map((pn, i) => (
                <motion.div
                  key={pn.key}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.96 }}
                  transition={tr}
                  className="absolute inset-0 grid place-items-center"
                  aria-hidden={i !== active}
                >
                  {pn.visual}
                </motion.div>
              ))}
              {/* 액자 아래 띠. 지금 패널의 이름. */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/85 px-6 py-4 backdrop-blur-md">
                <span className="text-[13px] font-semibold text-tx-3">{panels[active].label}</span>
                <span className="flex gap-1.5" aria-hidden>
                  {panels.map((pn, i) => (
                    <span key={pn.key} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-tb" : "w-1.5 bg-tg-2"}`} />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 글. 패널마다 한 화면, 같은 틀. */}
        <div className="lg:col-span-6">
          {panels.map((pn, i) => (
            <Panel key={pn.key} index={i} onEnter={setActive}>
              {/* 전화기: 물건을 글 위에 둡니다. */}
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[24px] bg-tg lg:hidden">
                <div className="absolute inset-0 grid place-items-center">{pn.visual}</div>
              </div>
              <p className="text-[14px] font-semibold text-tb">{pn.label}</p>
              <h2 className="mt-3 text-[clamp(1.7rem,2.6vw,2.4rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">{pn.title}</h2>
              <p className="mt-4 whitespace-pre-line text-[16px] font-medium leading-[1.7] text-tx-2">{pn.lead}</p>
              <ul className="mt-7 space-y-3">
                {pn.rows.map((r) => (
                  <li key={r} className={`flex items-start gap-3 text-[15.5px] leading-snug ${pn.muted ? "font-medium text-tx-3" : "font-semibold text-tx"}`}>
                    <span
                      aria-hidden
                      className={`mt-[0.2em] grid h-5 w-5 shrink-0 place-items-center rounded-full text-[12px] ${
                        pn.muted ? "bg-tg text-tx-3" : "bg-tb-soft text-tb"
                      }`}
                    >
                      {pn.muted ? "–" : "✓"}
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ index, onEnter, children }: { index: number; onEnter: (i: number) => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);
  return (
    <div ref={ref} className="flex min-h-[100svh] flex-col justify-center py-20 lg:pl-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
