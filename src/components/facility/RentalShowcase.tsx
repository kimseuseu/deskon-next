import Image from "next/image";
import Link from "next/link";
import { categories, featuredByCategory, productsByCategory } from "@/data/gasRental";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 임대 기기 광고. 라인업 팬이 여섯 종을 훑고 지나간 뒤 필름이 멈추고,
 * 실제로 빌려 가는 기기를 네 묶음으로 읽습니다.
 *
 * 묶음마다 한 펼침면입니다. 왼쪽에 큰 문장과 맞는 현장, 오른쪽에 대표 기기
 * 두세 대의 사진. 사진은 카탈로그 컷이라 흰 바탕이고, 그 흰 타일이
 * 종이 위에서 그대로 제품 카드가 됩니다. 전체 목록은 /gas/rental로 갑니다.
 */
export function RentalShowcase() {
  return (
    <section className="border-t border-line bg-paper" aria-label="임대 기기 소개">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="max-w-3xl font-paperlogy text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-primary text-balance">
            행사에 필요한 가스기기를
            <br />
            기간만큼 빌려 드립니다<span className="text-gold">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-muted md:text-base">
            간택기부터 회전국솥, 그리들, 떡볶이판까지 아오보 임대 라인업 28종. 가격표가 아니라 메뉴에서
            시작합니다.
          </p>
        </Reveal>

        {categories.map((c) => {
          const featured = featuredByCategory(c.id);
          const total = productsByCategory(c.id).length;
          return (
            <div
              key={c.id}
              className="mt-16 grid grid-cols-1 gap-10 border-t border-primary/20 pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-12 lg:pt-12"
            >
              <Reveal className="lg:col-span-5">
                <p className="font-serif text-lg italic text-accent-deep">{c.title}</p>
                <h3 className="mt-3 font-paperlogy text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary text-balance">
                  {c.headline}
                </h3>
                <p className="mt-5 max-w-md text-[15px] leading-[1.9] text-muted">{c.lead}</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  <span className="mr-3 font-paperlogy font-medium text-primary/70">맞는 현장</span>
                  {c.fits}
                </p>
                <Link
                  href={`/gas/rental#${c.id}`}
                  className="group mt-8 inline-flex items-center gap-3 border-b border-primary/30 pb-1 font-paperlogy text-[13px] font-semibold tracking-[0.1em] text-primary transition-colors duration-300 hover:border-gold"
                >
                  {c.title} {total}종 전체 보기
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>

              <Stagger
                className={`grid grid-cols-2 gap-3 lg:col-span-7 ${featured.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
                gap={0.08}
              >
                {featured.map((p) => (
                  <StaggerItem key={p.id}>
                    <Link href={`/gas/rental#${p.id}`} className="group block">
                      <div className="relative aspect-square overflow-hidden border border-line bg-white">
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-3 font-paperlogy text-[15px] font-medium leading-snug text-primary">
                        {p.name}
                      </p>
                      <p className="mt-1 text-[13px] leading-snug text-muted">
                        {p.maker}
                        <span className="mx-2 text-line">|</span>
                        {p.tagline}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          );
        })}
      </div>
    </section>
  );
}
