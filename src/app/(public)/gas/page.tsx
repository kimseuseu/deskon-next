import type { Metadata } from "next";
import { GasPage } from "@/components/facility/GasPage";
import { gas } from "@/data/facility";

export const metadata: Metadata = {
  title: "가스설비공사 · 업소용 가스기기 · 배관 · 안전검사 대행",
  description:
    "아오보 가스설비공사. 업소용 가스기기 판매부터 실내 · 야외 설치, 배관공사, 가스 안전검사와 안전필증 대행까지 한 번에 상담하세요.",
  alternates: { canonical: "/gas" },
  openGraph: {
    title: "아오보 가스설비공사 · 안전한 가스, 든든한 오늘 | 아오보",
    description: gas.summary,
    images: [{ url: gas.image }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: gas.nameFull,
  serviceType: gas.categories,
  provider: { "@type": "Organization", name: "아오보", url: "https://www.aovo.kr/" },
  areaServed: "KR",
  url: "https://www.aovo.kr/gas",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GasPage />
    </>
  );
}
