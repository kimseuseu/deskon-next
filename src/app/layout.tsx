import type { Metadata } from "next";
import { Noto_Sans_KR, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import MetaPixel from "@/components/seo/MetaPixel";
import NaverAnalytics from "@/components/seo/NaverAnalytics";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AOVO | 비즈니스 자산 통합 운영 플랫폼",
    template: "%s | AOVO Group",
  },
  description:
    "구독 · 공유 · 렌탈 · 순환 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법. 쓰는 만큼만, 낭비 없이.",
  icons: {
    icon: "/images/ex_aovo_symbol.png",
    apple: "/images/ex_aovo_symbol.png",
  },
  keywords: [
    "비즈니스 장비",
    "구독",
    "렌탈",
    "공유",
    "순환",
    "유통",
    "물류장비",
    "AOVO",
    "아오보",
  ],
  authors: [{ name: "AOVO Group" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "AOVO Group",
    title: "AOVO | 비즈니스 자산 통합 운영 플랫폼",
    description:
      "구독 · 공유 · 렌탈 · 순환 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AOVO Group (아오보 그룹)",
  legalName: "주식회사 킴샵",
  url: "https://www.aovo.kr",
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
    <html lang="ko" className={`${notoSansKR.variable} ${syne.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-primary">
        <CartProvider>{children}</CartProvider>
        <MetaPixel />
        <NaverAnalytics />
      </body>
    </html>
  );
}
