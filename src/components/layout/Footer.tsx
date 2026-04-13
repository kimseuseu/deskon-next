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
  { label: "물류장비 자산연대", href: "/recycle/logistics" },
  { label: "사무가구 자산연대", href: "/recycle/furniture" },
  { label: "사무가구 유통", href: "/buyback/furniture" },
  { label: "물류장비 유통", href: "/buyback/logistics" },
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
                className="link-underline text-sm text-white/65 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="link-underline text-sm text-white/65 hover:text-accent transition-colors duration-200"
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
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "both" }}>
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
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              비즈니스 자산 통합 운영 플랫폼
            </p>

            {/* Phone CTA */}
            <a
              href="tel:010-9929-5363"
              className="mt-5 inline-flex items-center gap-3 group"
            >
              <div className="ring-pulse w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <span className="block font-paperlogy text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  010-9929-5363
                </span>
                <span className="block text-xs text-white/65 mt-0.5">평일 09:00 - 18:00</span>
              </div>
            </a>

            <p className="mt-4 text-xs text-white/60 leading-relaxed max-w-xs">
              구독, 공유, 렌탈, 자산연대, 유통까지
              <br />
              산업 자산의 모든 라이프사이클을 관리합니다.
            </p>
          </div>

          {/* Link Columns */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <FooterColumn title="구독 · 공유" links={subscriptionLinks} />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            <FooterColumn title="렌탈 · 자산연대 · 유통" links={serviceLinks} />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
            <FooterColumn title="고객지원" links={supportLinks} />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
            <FooterColumn title="회사소개" links={companyLinks} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-white/10" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xs text-white/60 leading-relaxed space-y-0.5">
            <p>
              <span className="text-white/65 font-medium">주식회사 킴샵</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;대표: 김영식&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호: 302-88-01373
            </p>
            <p>
              통신판매업신고번호: 제2019-인천중구-0276호
            </p>
            <p>
              주소: 인천광역시 중구 항동 서해대로 111 킴샵그룹&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="tel:010-9929-5363" className="hover:text-accent transition-colors">010-9929-5363</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="mailto:mbc8447289@naver.com" className="hover:text-accent transition-colors">mbc8447289@naver.com</a>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/60">
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
