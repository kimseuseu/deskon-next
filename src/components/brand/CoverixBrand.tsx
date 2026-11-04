"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Brand } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 커버릭스. 흰 바탕, 굵은 워드마크 하나, 그리고 남색 커버를 씌운
 * 롤테이너 사진 한 장. 스크롤하면 워드마크는 뒤처지고 제품은 앞질러 갑니다.
 * 그 두 속도는 그대로 두고, 글자와 모양만 토스 문법으로 바꿨습니다.
 */

/** 리드 문단은 문장 하나가 한 줄입니다. 카피는 그대로, 줄만 나눕니다. */
const lines = (s: string) => s.replace(/\.\s+/g, ".\n");

export function CoverixHero({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "15vh"]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-9vh"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-28 text-tx lg:pt-32">
      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.p
          aria-hidden
          style={{ y: wordY }}
          className="rise select-none text-center text-[clamp(3.4rem,13vw,11.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-tx"
        >
          COVERIX
        </motion.p>
        <motion.div style={{ y: productY }} className="rise relative z-10 -mt-[7vw] flex justify-center">
          <Image
            src="/images/brands/coverix/product.webp"
            alt="남색 맞춤 커버를 씌운 롤테이너"
            width={1400}
            height={2104}
            priority
            sizes="(min-width: 1024px) 28vw, 56vw"
            className="h-auto w-[min(56vw,23rem)]"
          />
        </motion.div>
      </div>

      <div className="relative z-20 -mt-4 bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 pb-20 pt-6 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance text-tx">
                {brand.domain}
              </h1>
              <p className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-tb">{brand.tagline}</p>
              <p className="mt-5 max-w-xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">{lines(brand.description)}</p>
            </Reveal>
          </div>
          <div className="flex items-start lg:col-span-5 lg:justify-end">
            <Reveal delay={0.1} direction="none">
              <div className="flex flex-wrap gap-3">
                <a
                  href={brand.siteUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
                >
                  coverix.kr
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center justify-center rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98]"
                >
                  상담 문의
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const fabrics = [
  { name: "생활방수 원단", en: "WATER-REPELLENT", fit: "물류 · 상시 사용", body: "남색 기본. 먼지와 물기를 막고, 반복해서 씌우고 벗겨도 형태가 남습니다.", image: "/images/brands/coverix/material-water-resistant.webp" },
  { name: "방수 · 방유 원단", en: "OIL-REPELLENT", fit: "식품 · 케이터링", body: "국물과 기름이 튀어도 스미지 않습니다. 식재료와 조리 기구를 옮기는 자리에 씁니다.", image: "/images/brands/coverix/material-oil-resistant.webp" },
  { name: "투명 PVC", en: "CLEAR PVC", fit: "세탁물 · 식품 공정", body: "벗기지 않고 안을 봅니다. 무엇이 실렸는지 확인해야 하는 자리에 씁니다.", image: "/images/brands/coverix/material-clear-pvc.webp" },
  { name: "고강도 원단", en: "HEAVY-DUTY", fit: "공장 · 산업 현장", body: "두껍고 질깁니다. 분진과 부딪힘이 있는 현장에서 오래 버팁니다.", image: "/images/brands/coverix/material-heavy-duty.webp" },
];

const grades = [
  { grade: "A", range: "90 - 100", label: "양호", body: "지금 상태를 유지하면 됩니다. 정기 점검만으로 관리됩니다." },
  { grade: "B", range: "70 - 89", label: "보통", body: "일부만 손보면 성능이 올라갑니다. 다음 방문에 함께 처리합니다." },
  { grade: "C", range: "50 - 69", label: "주의", body: "즉시 개선이 필요한 항목이 있습니다. 리포트에 우선순위를 적어 드립니다." },
  { grade: "D", range: "50 미만", label: "위험", body: "안전과 효율이 함께 떨어진 상태입니다. 긴급 조치나 장비 교체를 권합니다." },
];

/** 원단 넷과 점검 등급 넷. 회색 판 위의 흰 카드, 흰 판 위의 회색 카드. */
export function CoverixMaterials() {
  return (
    <>
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
              원단은 현장이 고릅니다
            </h2>
            <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
              {"같은 롤테이너라도 병원과 식품공장과 세탁 공정이 요구하는 표면이 다릅니다.\n네 가지에서 고릅니다."}
            </p>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.08}>
            {fabrics.map((f) => (
              <StaggerItem key={f.en} className="group rounded-[28px] bg-white p-3 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-tg">
                  <Image
                    src={f.image}
                    alt={`${f.name} 표면`}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-3 pb-3 pt-5">
                  <h3 className="text-[18px] font-bold tracking-[-0.02em]">{f.name}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-tb">{f.fit}</p>
                  <p className="mt-3 text-[14px] font-medium leading-relaxed text-tx-2">{f.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white text-tx">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance">
                점검은 등급으로 남습니다
              </h2>
              <p className="mt-4 max-w-md whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
                전국을 순회하며 장비마다 점수를 매기고, 어디를 먼저 손봐야 하는지 리포트에 적습니다.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] bg-tg">
                <Image src="/images/brands/coverix/inspection-report.webp" alt="점검 리포트" fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7" gap={0.1}>
            {grades.map((g) => (
              <StaggerItem key={g.grade} className="rounded-[24px] bg-tg p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[clamp(2.6rem,4.5vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-tb">{g.grade}</p>
                  <p className="text-[13px] font-semibold text-tx-3">{g.range}</p>
                </div>
                <p className="mt-4 text-[18px] font-bold">{g.label}</p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{g.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
