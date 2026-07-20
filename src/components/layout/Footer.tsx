import Link from "next/link";
import Image from "next/image";
import { divisions } from "@/data/divisions";
import { brands } from "@/data/brands";

const aboutLinks = [
  { label: "개요", href: "/about" },
  { label: "회사 연혁", href: "/about/history" },
  { label: "CI 소개", href: "/about/ci" },
  { label: "오시는 길", href: "/about/location" },
  { label: "파트너 계약", href: "/about/partners" },
];

const supportLinks = [
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
  { label: "문의하기", href: "/support/contact" },
  { label: "카카오 채널", href: "http://pf.kakao.com/_qxkxnRX", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Upper */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-14 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <p className="font-serif text-lg italic text-gold">From ownership to operation</p>
            <p className="mt-4 max-w-sm font-paperlogy text-[26px] font-light leading-[1.35] tracking-[-0.01em]">
              소유에서 운영으로,
              <br />
              비즈니스 장비의 패러다임을 바꿉니다.
            </p>

            <a href="tel:010-9929-5363" className="group mt-10 inline-block">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-white/55">
                Contact
              </span>
              <span className="mt-1 block font-paperlogy text-3xl font-semibold text-cream transition-colors duration-300 group-hover:text-gold">
                010-9929-5363
              </span>
              <span className="mt-1 block text-xs text-white/60">평일 09:00 – 18:00</span>
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-14">
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Divisions
              </h3>
              <ul className="mt-5 space-y-3">
                {divisions.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={d.href}
                      className="group inline-flex items-baseline gap-2.5 text-sm text-white/70 transition-colors duration-200 hover:text-cream"
                    >
                      <span className="font-serif text-[11px] italic text-gold/70 transition-colors group-hover:text-gold">
                        {d.no}
                      </span>
                      {d.nameFull}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Brands
              </h3>
              <ul className="mt-5 space-y-3">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={b.href}
                      className="group inline-flex items-baseline gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-cream"
                    >
                      {b.name}
                      <span className="text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                        {b.nameKo}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                About
              </h3>
              <ul className="mt-5 space-y-3">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                Support
              </h3>
              <ul className="mt-5 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 transition-colors duration-200 hover:text-cream"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors duration-200 hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="mx-auto max-w-[1440px] overflow-hidden px-6 lg:px-10">
        <Image
          src="/images/aovo_wordmark_gold.svg"
          alt=""
          aria-hidden
          width={595}
          height={212}
          className="w-full translate-y-[12%] opacity-[0.16]"
          sizes="100vw"
        />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-6 py-7 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1 text-xs leading-relaxed text-white/60">
              <p>
                <span className="font-medium text-white/75">주식회사 킴샵</span>
                <span className="mx-2 text-white/15">|</span>대표: 김영식
                <span className="mx-2 text-white/15">|</span>사업자등록번호: 302-88-01373
              </p>
              <p>통신판매업신고번호: 제2019-인천중구-0276호</p>
              <p>
                인천광역시 중구 항동 서해대로 111 킴샵그룹
                <span className="mx-2 text-white/15">|</span>
                <a href="tel:010-9929-5363" className="transition-colors hover:text-gold">010-9929-5363</a>
                <span className="mx-2 text-white/15">|</span>
                <a href="mailto:mbc8447289@naver.com" className="transition-colors hover:text-gold">mbc8447289@naver.com</a>
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs text-white/65">
              <Link href="/terms" className="transition-colors hover:text-cream">이용약관</Link>
              <Link href="/privacy" className="transition-colors hover:text-cream">개인정보처리방침</Link>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-white/45">
            © {new Date().getFullYear()} AOVO Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
