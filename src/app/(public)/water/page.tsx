import type { Metadata } from "next";
import { WaterPage } from "@/components/facility/WaterPage";
import { water } from "@/data/facility";

export const metadata: Metadata = {
  title: "급배수설비공사 · 행사장 급수 · 배수 · 오폐수 처리대행",
  description:
    "아오보 급배수설비공사. 수도계량기 인입부터 싱크대 설치, 배수 처리, 오 · 폐수와 음식물 처리대행, 행사장 사이클 관리까지 한 번에 상담하세요.",
  alternates: { canonical: "/water" },
  openGraph: {
    title: "아오보 급배수설비공사 · 행사장의 물 흐름을 관리합니다 | 아오보",
    description: water.summary,
    images: [{ url: water.image }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: water.nameFull,
  serviceType: water.categories,
  provider: { "@type": "Organization", name: "아오보", url: "https://www.aovo.kr/" },
  areaServed: "KR",
  url: "https://www.aovo.kr/water",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WaterPage />
    </>
  );
}
