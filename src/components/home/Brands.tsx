"use client";

import Link from "next/link";
import Image from "next/image";
import { brands, type Brand } from "@/data/brands";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Mark({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <span className="inline-flex h-14 items-center rounded-2xl bg-white px-5">
        <Image src={brand.logo} alt={`${brand.name} ${brand.nameKo}`} width={299} height={100} className="h-7 w-auto" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-14 items-center rounded-2xl bg-white px-5 text-[22px] font-bold tracking-[0.02em] text-tx">
      {brand.name}
    </span>
  );
}

/** 여섯 브랜드. 카드가 작은 데서 커지며 차례로 섭니다. */
export default function Brands() {
  const reduce = useReducedMotion();
  return (
    <section id="brands" className="scroll-mt-16 bg-white text-tx">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-tg-2 pb-8">
          <Reveal>
            <p className="eyebrow">Group Brands</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.15] text-balance">현장마다, 전문 브랜드</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs whitespace-pre-line pb-1 text-[15px] font-medium leading-[1.7] text-tx-2">
              {"사무실부터 물류센터, 행사장, 공사장까지.\n여섯 개의 브랜드가 각자의 현장을 책임집니다."}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {brands.map((b, i) => (
            <motion.div
              key={b.slug}
              className="h-full"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.1, ease: EASE }}
            >
              <Link
                href={b.href}
                className="group flex h-full flex-col rounded-[28px] bg-tg p-6 transition-colors duration-300 hover:bg-tg-2 lg:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <Mark brand={b} />
                  <span className="font-serif text-[15px] italic text-tb">{b.no}</span>
                </div>
                <p className="mt-7 font-paperlogy text-[19px] font-semibold leading-snug tracking-[-0.02em]">{b.domain}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.specialties.slice(0, 3).map((s) => (
                    <span key={s.name} className="rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-tx-2">
                      {s.name}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-8">
                  <span className="text-[14px] font-semibold text-tx-3">{b.nameKo}</span>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-tb transition-colors duration-200 group-hover:bg-tb group-hover:text-white"
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
