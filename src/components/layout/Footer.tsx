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
  { label: "물류장비 유통", href: "/wholesale/logistics" },
  { label: "주방집기 유통", href: "/wholesale/kitchen" },
];

const supportLinks = [
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
  { label: "문의하기", href: "/support/contact" },
  {
    label: "카카오 채널",
    href: "https://pf.kakao.com/_KxmnZn",
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
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Image
                src="/images/ex_aovo_symbol.png"
                alt="AOVO"
                width={32}
                height={32}
                className="w-8 h-8 brightness-0 invert"
              />
              <span className="font-paperlogy text-lg font-bold tracking-tight">
                AOVO
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              산업용품 통합 운영 플랫폼
            </p>
            <p className="mt-2 text-xs text-white/30 leading-relaxed max-w-xs">
              구독, 공유, 렌탈, 순환, 유통까지
              <br />
              산업 자산의 모든 라이프사이클을 관리합니다.
            </p>
          </div>

          {/* Link Columns */}
          <FooterColumn title="구독 · 공유" links={subscriptionLinks} />
          <FooterColumn title="렌탈 · 순환 · 유통" links={serviceLinks} />
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
                href="tel:02-2683-4459"
                className="hover:text-accent transition-colors"
              >
                02-2683-4459
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
