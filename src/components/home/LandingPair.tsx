"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { featured } from "@/data/navigation";
import { gas, water } from "@/data/facility";

const covers: Record<string, { src: string; alt: string }> = {
  [water.href]: { src: "/images/water/hero-poster.webp", alt: water.imageAlt },
  [gas.href]: { src: gas.image, alt: gas.imageAlt },
};

/** 행사장 설비 랜딩 둘. 큰 사진 카드 두 장이 나란히 섭니다. */
export default function LandingPair() {
  return (
    <section className="bg-white text-tx">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-tg-2 pb-8">
          <Reveal>
            <p className="eyebrow">Water & Gas</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.15] text-balance">
              행사장의 물과 불,
              <br />
              아오보가 직접 설치합니다.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs whitespace-pre-line pb-1 text-[15px] font-medium leading-[1.7] text-tx-2">
              {"급배수설비와 가스기기 임대.\n현장 사진으로 기록한 두 이야기입니다."}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16" gap={0.14} amount={0.3}>
          {featured.map((item, i) => {
            const cover = covers[item.href];
            return (
              <StaggerItem key={item.href} direction={i === 0 ? "right" : "left"}>
                <Link
                  href={item.href}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[32px] bg-tk text-white"
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tk/85 via-tk/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 lg:p-8">
                    <div>
                      <p className="font-paperlogy text-[26px] font-semibold tracking-[-0.03em] lg:text-[30px]">{item.label}</p>
                      <p className="mt-1.5 text-[15px] font-medium text-white/80">{item.desc}</p>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-colors duration-200 group-hover:bg-tb"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
