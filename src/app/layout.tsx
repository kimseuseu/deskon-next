import type { Metadata } from "next";
import { Noto_Sans_KR, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import MetaPixel from "@/components/seo/MetaPixel";

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
    default: "AOVO | 산업용품 통합 운영 플랫폼",
    template: "%s | AOVO",
  },
  description:
    "구독 · 공유 · 렌탈 · 리뉴얼 · 매입 — 산업용품을 가장 효율적으로 운영하는 방법. 쓰는 만큼만, 낭비 없이.",
  icons: {
    icon: "/images/ex_aovo_symbol.png",
    apple: "/images/ex_aovo_symbol.png",
  },
  keywords: [
    "산업용품",
    "구독",
    "렌탈",
    "공유",
    "리뉴얼",
    "매입",
    "물류장비",
    "AOVO",
    "아오보",
  ],
  authors: [{ name: "AOVO" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "AOVO",
    title: "AOVO | 산업용품 통합 운영 플랫폼",
    description:
      "구독 · 공유 · 렌탈 · 리뉴얼 · 매입 — 산업용품을 가장 효율적으로 운영하는 방법",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AOVO (아오보)",
  legalName: "mbc",
  url: "https://aovo.kr",
  telephone: "02-2683-4459",
  address: {
    "@type": "PostalAddress",
    streetAddress: "금오로 679(옥길동)",
    addressLocality: "광명시",
    addressRegion: "경기도",
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
      </body>
    </html>
  );
}
