import type { Metadata } from "next";
import { Noto_Sans_KR, Syne, Instrument_Serif } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/seo/MetaPixel";
import NaverAnalytics from "@/components/seo/NaverAnalytics";
import SplashScreen from "@/components/SplashScreen";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// Only /about/ci still renders Syne (brand-typeface specimen)
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

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
  telephone: "010-9929-5363",
  email: "mbc8447289@naver.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "서해대로 111 킴샵그룹",
    addressLocality: "중구",
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
    <html lang="ko" className={`${notoSansKR.variable} ${syne.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-primary">
        <SplashScreen />
        {children}
        <MetaPixel />
        <NaverAnalytics />
      </body>
    </html>
  );
}
