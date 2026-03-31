import Link from "next/link";
import Image from "next/image";

const subscriptionLinks = [
  { label: "롤테이너", href: "/subscribe/rolltainer" },
  { label: "파랫트", href: "/subscribe/pallet" },
  { label: "인테이너", href: "/subscribe/intainer" },
  { label: "이사바구니", href: "/subscribe/movingbox" },
  { label: "카트 공유", href: "/sharing/cart" },
  { label: "행사장장비", href: "/sharing/event" },
];

const serviceLinks = [
  { label: "사무가구 렌탈", href: "/rental/furniture" },
  { label: "IT기기 렌탈", href: "/rental/it" },
  { label: "물류장비 순환", href: "/recycle/logistics" },
  { label: "사무가구 순환", href: "/recycle/furniture" },
  { label: "사무가구 매입", href: "/buyback/furniture" },
  { label: "물류장비 매입", href: "/buyback/logistics" },
];

const supportLinks = [
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
  { label: "문의하기", href: "/support/contact" },
  {
    label: "카카오 채널",
    href: "http://pf.kakao.com/_qxkxnRX",
    external: true,
  },
];

const companyLinks = [
  { label: "개요", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "CI 소개", href: "/about/ci" },
  { label: "오시는 길", href: "/about/location" },
  { label: "파트너 계약", href: "/about/partners" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="font-paperlogy text-sm font-semibold text-white tracking-wide mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/45 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-white/45 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-end gap-2 mb-4">
              <Image
                src="/images/ex_aovo_symbol.png"
                alt="AOVO"
                width={28}
                height={35}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
              <span style={{ fontFamily: "var(--font-syne), sans-serif" }} className="text-2xl font-bold text-white tracking-tight leading-none pb-[1px]">
                AOVO
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              산업용품 통합 운영 플랫폼
            </p>

            {/* Phone CTA */}
            <a
              href="tel:010-9929-5363"
              className="mt-5 inline-flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <span className="block font-paperlogy text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  010-9929-5363
                </span>
                <span className="block text-xs text-white/40 mt-0.5">평일 09:00 - 18:00</span>
              </div>
            </a>

            <p className="mt-4 text-xs text-white/30 leading-relaxed max-w-xs">
              구독, 공유, 렌탈, 순환, 매입까지
              <br />
              산업 자산의 모든 라이프사이클을 관리합니다.
            </p>
          </div>

          {/* Link Columns */}
          <FooterColumn title="구독 · 공유" links={subscriptionLinks} />
          <FooterColumn title="렌탈 · 순환 · 매입" links={serviceLinks} />
          <FooterColumn title="고객지원" links={supportLinks} />
          <FooterColumn title="회사소개" links={companyLinks} />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-white/10" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xs text-white/30 leading-relaxed space-y-0.5">
            <p>
              <span className="text-white/45 font-medium">mbc</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;대표: 강귀원&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호:
              108-12-35112
            </p>
            <p>
              경기도 광명시 금오로 679&nbsp;&nbsp;|&nbsp;&nbsp;
              <a
                href="tel:010-9929-5363"
                className="hover:text-accent transition-colors"
              >
                010-9929-5363
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link
              href="/terms"
              className="hover:text-accent transition-colors duration-200"
            >
              이용약관
            </Link>
            <span className="text-white/15">|</span>
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors duration-200"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-white/20">
          &copy; {new Date().getFullYear()} AOVO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
