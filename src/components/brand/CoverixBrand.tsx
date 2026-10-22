"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Brand } from "@/data/brands";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 커버릭스. 사이트에 색이 없습니다. 안개 같은 회색, 먹색 글자, 그리고
 * 남색 커버를 씌운 롤테이너 사진 한 장. 첫 화면은 워드마크 하나로 끝나고,
 * 스크롤하면 워드마크는 뒤처지고 제품은 앞질러 갑니다. 그 두 속도를
 * 그대로 옮깁니다.
 */
export function CoverixHero({ brand }: { brand: Brand }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "15vh"]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-9vh"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f6f6f5] pt-28 lg:pt-32">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.p
          aria-hidden
          style={{ y: wordY }}
          className="rise select-none text-center font-paperlogy text-[clamp(4.2rem,17vw,16rem)] font-extralight leading-[0.95] tracking-[-0.04em] text-[#1a1a1a]"
        >
          COVERIX
        </motion.p>
        <motion.div style={{ y: productY }} className="rise relative z-10 -mt-[10vw] flex justify-center" >
          <Image
            src="/images/brands/coverix/product.webp"
            alt="남색 맞춤 커버를 씌운 롤테이너"
            width={1400}
            height={2104}
            priority
            sizes="(min-width: 1024px) 34vw, 70vw"
            className="h-auto w-[min(70vw,30rem)]"
          />
        </motion.div>
      </div>

      <div className="relative z-20 -mt-6 bg-[#f6f6f5]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 pb-20 pt-8 lg:grid-cols-12 lg:px-10 lg:pb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.02em] text-[#1a1a1a]">
                {brand.domain}
              </h1>
              <p className="mt-3 font-paperlogy text-xl font-light text-[#52524c]">{brand.tagline}</p>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-[#3a3a36]">{brand.description}</p>
            </Reveal>
          </div>
          <div className="flex items-start lg:col-span-5 lg:justify-end">
            <Reveal delay={0.1} direction="none">
              <div className="flex flex-wrap gap-3">
                <a
                  href={brand.siteUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#1a1a1a] px-8 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#3a3a36]"
                >
                  coverix.kr
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center border border-[#1a1a1a]/30 px-8 py-4 font-paperlogy text-[13px] font-semibold tracking-[0.08em] text-[#1a1a1a] transition-colors duration-300 hover:border-[#1a1a1a]"
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

/** 원단 넷과 점검 등급 넷. 색은 여전히 없습니다. */
export function CoverixMaterials() {
  return (
    <>
      <section className="border-t border-[#e5e5e2] bg-[#f6f6f5]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.2] tracking-[-0.02em] text-[#1a1a1a]">
              원단은 현장이 고릅니다
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#52524c]">
              같은 롤테이너라도 병원과 식품공장과 세탁 공정이 요구하는 표면이 다릅니다. 네 가지에서 고릅니다.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" gap={0.08}>
            {fabrics.map((f) => (
              <StaggerItem key={f.en} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ededec]">
                  <Image
                    src={f.image}
                    alt={`${f.name} 표면`}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                  />
                  {/* 손을 올리면 설명이 아래에서 올라옵니다. */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1a1a1a]/90 p-4 text-[13px] leading-relaxed text-white/85 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 motion-reduce:translate-y-0">
                    {f.body}
                  </div>
                </div>
                <p className="mt-4 text-[11px] font-medium tracking-[0.16em] text-[#9b9a94]">{f.en}</p>
                <h3 className="mt-1 font-paperlogy text-lg font-medium text-[#1a1a1a]">{f.name}</h3>
                <p className="mt-1 text-[13px] text-[#52524c]">{f.fit}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-[#e5e5e2] bg-[#ededec]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-32">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-paperlogy text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.2] tracking-[-0.02em] text-[#1a1a1a]">
                점검은 등급으로 남습니다
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.9] text-[#52524c]">
                전국을 순회하며 장비마다 점수를 매기고, 어디를 먼저 손봐야 하는지 리포트에 적습니다.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image src="/images/brands/coverix/inspection-report.webp" alt="점검 리포트" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-8 lg:grid-cols-4 lg:border-l lg:border-[#1a1a1a]/15 lg:pl-12" gap={0.12}>
            {grades.map((g) => (
              <StaggerItem key={g.grade}>
                <p className="font-paperlogy text-[clamp(4rem,8vw,7rem)] font-extralight leading-none tracking-[-0.04em] text-[#1a1a1a]">{g.grade}</p>
                <p className="mt-3 text-[12px] tracking-[0.1em] text-[#9b9a94]">{g.range}</p>
                <p className="mt-1 font-paperlogy text-lg font-medium text-[#1a1a1a]">{g.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#52524c]">{g.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
