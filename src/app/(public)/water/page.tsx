import type { Metadata } from "next";
import { WaterPage } from "@/components/water/WaterPage";
import { water } from "@/data/facility";
import { waterFaq, waterProjects } from "@/data/water-story";

/* 검색어 «행사장 급배수»가 제목 맨 앞에 옵니다. 네이버 웹 검색은 title 과 본문의 그 말을 봅니다. */
export const metadata: Metadata = {
  title: "행사장 급배수 설치 · 급수 · 배수 · 오폐수 처리대행",
  description:
    "행사장 급배수 전문 아오보. 축제, 요리대회, 골프 대회, 크리스마스 마켓 식음 부스에 급수차 · 수도계량기 인입, 1톤 물탱크 운용, 싱크대 설치, 배수 집수, 오 · 폐수와 음식물 처리대행까지 한 팀이 맡습니다. 2019년부터 찍은 현장 기록을 보세요.",
  keywords: ["행사장 급배수", "행사 급수", "야외 행사 급배수 설치", "행사장 싱크대 설치", "물탱크 급수", "오폐수 처리대행"],
  alternates: { canonical: "/water" },
  openGraph: {
    title: "행사장 급배수, 물이 나와야 행사가 시작됩니다 | 아오보",
    description: water.summary,
    images: [{ url: waterProjects.items[0].cover.src }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${water.nameFull} (행사장 급배수)`,
  description:
    "행사장 급배수 설치 서비스. 축제, 요리대회, 골프 대회 식음 부스에 급수 인입, 1톤 물탱크 운용, 싱크대 설치, 배수 집수, 오 · 폐수 처리대행까지 한 팀이 맡습니다.",
  serviceType: water.categories,
  provider: { "@type": "Organization", name: "아오보", url: "https://www.aovo.kr/" },
  areaServed: "KR",
  url: "https://www.aovo.kr/water",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: waterFaq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\n/g, " ") },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <WaterPage />
    </>
  );
}
