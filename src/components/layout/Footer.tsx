import Link from "next/link";
import { divisions } from "@/data/divisions";
import { brands } from "@/data/brands";
import { featured } from "@/data/navigation";
import { COMPANY } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

const aboutLinks = [
  { label: "개요", href: "/about" },
  { label: "회사 연혁", href: "/about/history" },
  { label: "CI 소개", href: "/about/ci" },
  { label: "오시는 길", href: "/about/location" },
  { label: "파트너 계약", href: "/about/partners" },
];

const supportLinks = [
  { label: "현장 노트", href: "/blog" },
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
  { label: "문의하기", href: "/support/contact" },
  { label: "카카오 채널", href: COMPANY.kakaoChannel, external: true },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

const linkClass = "text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white";

/**
 * 바닥. 옛 사이트처럼 어둡게 끝나고 큰 워드마크가 깔리되, 금색 자리는 파랑이 잇고
 * 글은 토스의 간격으로 섭니다.
 */
export default function Footer() {
  return (
    <footer className="bg-tk text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-10 lg:px-10 lg:pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo tone="light" size="lg" group />
            <p className="mt-6 font-serif text-lg italic text-tb-soft">From ownership to operation</p>
            <p className="mt-3 max-w-sm font-paperlogy text-[24px] font-medium leading-[1.4] tracking-[-0.02em]">
              소유에서 운영으로.
              <br />
              비즈니스 장비의 기준을 바꿉니다.
            </p>
            <a href={`tel:${COMPANY.phone}`} className="group mt-10 inline-block">
              <span className="block text-[13px] font-medium text-white/50">대표 번호</span>
              <span className="mt-1 block text-[28px] font-bold tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-tb-soft">
                {COMPANY.phone}
              </span>
              <span className="mt-0.5 block text-[13px] font-medium text-white/50">평일 09:00 - 18:00</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-14">
            <Column title="사업분야">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link href={d.href} className={`${linkClass} inline-flex items-baseline gap-2.5`}>
                    <span className="font-serif text-[12px] italic text-tb-soft/70">{d.no}</span>
                    {d.nameFull}
                  </Link>
                </li>
              ))}
              {featured.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="text-[14px] font-semibold text-tb-soft transition-colors duration-200 hover:text-white">
                    {f.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="브랜드">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={b.href} className={`${linkClass} inline-flex items-baseline gap-1.5`}>
                    {b.name}
                    <span className="text-[12px] text-white/40">{b.nameKo}</span>
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="그룹소개">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="고객지원">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </Column>
          </div>
        </div>
      </div>

      {/* 큰 워드마크. 옛 바닥의 금색 워드마크 자리를 파랑이 잇습니다. */}
      <div className="mx-auto max-w-[1440px] overflow-hidden px-6 lg:px-10" aria-hidden>
        <p className="translate-y-[18%] font-paperlogy text-[clamp(5rem,21vw,19rem)] font-bold leading-none tracking-[-0.05em] text-tb/[0.18]">
          AOVO
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-6 py-7 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1 text-[12px] font-medium leading-relaxed text-white/50">
              <p>
                <span className="font-semibold text-white/75">{COMPANY.legalName}</span>
                <span className="mx-2 text-white/15">|</span>대표 {COMPANY.ceo}
                <span className="mx-2 text-white/15">|</span>사업자등록번호 {COMPANY.bizNumber}
              </p>
              <p>통신판매업신고번호 {COMPANY.salesReportNumber}</p>
              <p>
                {COMPANY.address}
                <span className="mx-2 text-white/15">|</span>
                <a href={`tel:${COMPANY.phone}`} className="transition-colors hover:text-white">
                  {COMPANY.phone}
                </a>
                <span className="mx-2 text-white/15">|</span>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">
                  {COMPANY.email}
                </a>
              </p>
            </div>
            <div className="flex items-center gap-5 text-[13px] font-semibold text-white/70">
              <Link href="/terms" className="transition-colors hover:text-white">
                이용약관
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-white">
                개인정보처리방침
              </Link>
            </div>
          </div>
          <p className="mt-5 text-[12px] font-medium text-white/40">© {new Date().getFullYear()} AOVO Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
