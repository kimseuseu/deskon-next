import type { Metadata } from "next";
import { Noto_Sans_KR, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import MetaPixel from "@/components/seo/MetaPixel";
import NaverAnalytics from "@/components/seo/NaverAnalytics";
import SplashScreen from "@/components/SplashScreen";

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
  metadataBase: new URL("https://www.aovo.kr"),
  applicationName: "아오보",
  title: {
    default: "아오보 | 비즈니스 자산 통합 운영 플랫폼",
    template: "%s | 아오보",
  },
  description:
    "구독 · 공유 · 렌탈 · 자산연대 · 유통 — 비즈니스 장비를 가장 효율적으로 운영하는 방법. 쓰는 만큼만, 낭비 없이.",
  icons: {
    icon: "/images/ex_aovo_symbol.png",
    apple: "/images/ex_aovo_symbol.png",
  },
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
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "아오보",
  alternateName: ["AOVO", "AOVO Group", "아오보 그룹"],
  legalName: "주식회사 킴샵",
  url: "https://www.aovo.kr/",
  logo: "https://www.aovo.kr/images/ex_aovo_symbol.png",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-primary">
        <SplashScreen />
        <CartProvider>{children}</CartProvider>
        <MetaPixel />
        <NaverAnalytics />
      </body>
    </html>
  );
}
