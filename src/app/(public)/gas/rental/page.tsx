import type { Metadata } from "next";
import { RentalCatalog } from "@/components/facility/RentalCatalog";
import { ClosingCta } from "@/components/facility/ClosingCta";
import { gas, water } from "@/data/facility";
import { products } from "@/data/gasRental";

const BASE = "https://www.aovo.kr";

export const metadata: Metadata = {
  title: "가스기기 임대 라인업 · 간택기 · 낮은렌지 · 회전국솥 · 그리들 · 가스튀김기 · 떡볶이판",
  description:
    "아오보가 빌려 드리는 업소용 가스기기 전체 목록. 간택기, 낮은렌지, 탕렌지, 중화렌지, 린나이 회전국솥과 취반기, 그리들, 가스튀김기, 떡볶이판과 군고구마 기계까지 행사 기간만큼 임대합니다.",
  alternates: { canonical: "/gas/rental" },
  openGraph: {
    title: `아오보 가스기기 임대 라인업 ${products.length}종 | 아오보`,
    description: "운송 · 설치 · 가스 연결 · 안전점검 · 철거까지 한 번에. 메뉴만 알려주시면 기기 구성을 잡아 드립니다.",
    images: [{ url: gas.image }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "아오보 가스기기 임대 라인업",
  url: `${BASE}/gas/rental`,
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      brand: { "@type": "Brand", name: p.maker },
      ...(p.model ? { model: p.model } : {}),
      image: `${BASE}${p.image}`,
      url: `${BASE}/gas/rental#${p.id}`,
      offers: {
        "@type": "Offer",
        businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "아오보" },
      },
    },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RentalCatalog />
      <ClosingCta work={gas} sibling={water} />
    </>
  );
}
