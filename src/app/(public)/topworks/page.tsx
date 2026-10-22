import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { TopworksHero, TopworksPlate } from "@/components/brand/TopworksBrand";
import { getBrand } from "@/data/brands";

const brand = getBrand("topworks")!;

export const metadata: Metadata = {
  title: "TOPWORKS — 마차 · 포장마차 · 업소용 특수집기 주문제작",
  description:
    "상상이 현실이 되는 곳, TOPWORKS. 이동식 마차와 포장마차, 깡통테이블, 통닭기계, 업소용 스테인리스 집기를 1대부터 주문제작하고 단기임대합니다. AOVO 그룹 브랜드.",
  openGraph: {
    title: "TOPWORKS — 상상이 현실이 되는 곳 | 아오보",
    description: "시중에 없는 상업용 · 전시 · 행사용 특수집기를 자체 공장에서 만들어 설치합니다.",
    images: [{ url: "/images/brands/topworks-hero.webp" }],
  },
};

export default function Page() {
  return (
    <BrandPage brand={brand} hero={<TopworksHero brand={brand} />}>
      <TopworksPlate />
    </BrandPage>
  );
}
