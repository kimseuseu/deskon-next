import type { Metadata } from "next";
import { GasPage } from "@/components/facility/GasPage";
import { gas } from "@/data/facility";

export const metadata: Metadata = {
  title: "가스기기 임대 · 간택기 · 회전국솥 · 그리들 · 행사 간식 기기",
  description:
    "아오보 가스기기 임대. 간택기, 낮은렌지, 회전국솥, 취반기, 그리들, 가스튀김기, 떡볶이판까지 행사 기간만큼 빌리세요. 운송 · 설치 · 가스 연결 · 안전점검 · 철거까지 한 번에.",
  alternates: { canonical: "/gas" },
  openGraph: {
    title: "아오보 가스기기 임대 · 사지 말고, 행사 기간만큼 빌리세요 | 아오보",
    description: gas.summary,
    images: [{ url: gas.image }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: gas.nameFull,
  serviceType: [...gas.categories, "가스 배관공사", "가스 안전검사 대행"],
  provider: { "@type": "Organization", name: "아오보", url: "https://www.aovo.kr/" },
  areaServed: "KR",
  url: "https://www.aovo.kr/gas",
  offers: { "@type": "Offer", url: "https://www.aovo.kr/gas/rental", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GasPage />
    </>
  );
}
