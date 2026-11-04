import type { Metadata } from "next";
import { WaterPage } from "@/components/water/WaterPage";
import { water } from "@/data/facility";
import { waterProjects } from "@/data/water-story";

export const metadata: Metadata = {
  title: "급배수설비공사 · 행사장 급수 · 배수 · 오폐수 처리대행 · 현장 기록",
  description:
    "아오보 급배수설비공사. 급수차와 수도계량기 인입부터 1톤 물탱크 운용, 싱크대 설치, 배수 집수, 오 · 폐수와 음식물 처리대행까지. 2019년부터 축제, 요리대회, 골프 투어, 크리스마스 마켓 현장에서 찍은 급배수 기록을 보세요.",
  alternates: { canonical: "/water" },
  openGraph: {
    title: "아오보 급배수설비 · 물이 나와야 행사가 시작됩니다 | 아오보",
    description: water.summary,
    images: [{ url: waterProjects.items[0].cover.src }],
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
