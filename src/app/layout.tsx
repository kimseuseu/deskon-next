import type { Metadata } from "next";
import { Syne, Instrument_Serif } from "next/font/google";
/* 사이트 서체는 Pretendard 하나. 조각 서체(unicode-range)라 화면에 선 글자가 든 조각만 받아 옵니다. */
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import MetaPixel from "@/components/seo/MetaPixel";
import NaverAnalytics from "@/components/seo/NaverAnalytics";
import { Analytics } from "@vercel/analytics/next";

// Only /about/ci still renders Syne (brand-typeface specimen)
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* 액센트 한 줄에만 쓰는 세리프 이탤릭 (eyebrow, 제목 속 낱말 하나) */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

/* 서치콘솔 소유확인 토큰. 콘솔에서 'HTML 태그' 방식을 고르면 나오는
   content="..." 안의 값만 넣습니다. 비어 있으면 메타태그를 출력하지 않습니다.
   구글: search.google.com/search-console → 설정 → 소유권 확인 → HTML 태그
   네이버: searchadvisor.naver.com → 사이트 등록 → HTML 태그 */
const NAVER_SITE_VERIFICATION = "a12d2de23ab7215c30420533d512a5cdc80ec4e2";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aovo.kr"),
  applicationName: "아오보",
  title: {
    default: "아오보 | 비즈니스 자산 통합 운영 플랫폼",
    template: "%s | 아오보",
  },
  description:
    "구독 · 공유 · 렌탈 · 자산연대 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법. 쓰는 만큼만, 낭비 없이.",
  // favicon/apple icon은 src/app/icon.png, apple-icon.png 파일 컨벤션으로 자동 연결
  keywords: [
    "아오보",
    "AOVO",
    "아오보 그룹",
    "비즈니스 장비",
    "구독",
    "렌탈",
    "공유",
    "자산연대",
    "유통",
    "물류장비",
  ],
  authors: [{ name: "아오보" }],
  verification: {
    google: "NiGOhBH2a5FS8UyOpRiL5rEzug_ammIvkwgmlDxwmg8",
    ...(NAVER_SITE_VERIFICATION
      ? { other: { "naver-site-verification": NAVER_SITE_VERIFICATION } }
      : {}),
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.aovo.kr/",
    siteName: "아오보",
    title: "아오보 | 비즈니스 자산 통합 운영 플랫폼",
    description:
      "구독 · 공유 · 렌탈 · 자산연대 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "아오보 | 비즈니스 자산 통합 운영 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "아오보 | 비즈니스 자산 통합 운영 플랫폼",
    description:
      "구독 · 공유 · 렌탈 · 자산연대 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법",
    images: ["/images/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "아오보",
  alternateName: ["AOVO", "AOVO Group", "아오보 그룹"],
  legalName: "주식회사 킴샵",
  url: "https://www.aovo.kr/",
  logo: "https://www.aovo.kr/images/aovo_symbol.png",
  telephone: "02-2683-4459",
  email: "mbc8447289@naver.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "서해대로 111 킴샵그룹",
    addressLocality: "제물포구",
    addressRegion: "인천광역시",
    addressCountry: "KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${syne.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        {/* 스크롤 필름(/gas, /water)의 정지 화면 — 스크립트가 없을 때만 */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-css-tags -- noscript 전용 정지 화면 */}
          <link rel="stylesheet" href="/film-static.css" />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-tx">
        {children}
        <MetaPixel />
        <NaverAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
