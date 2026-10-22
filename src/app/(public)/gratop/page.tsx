import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { GratopHero, GratopDeal } from "@/components/brand/GratopBrand";
import { getBrand } from "@/data/brands";

const brand = getBrand("gratop")!;

export const metadata: Metadata = {
  title: "GRATOP — 바닥보양재 · 매트 도매 · 소매 · 임대 · 주문제작",
  description:
    "밟히는 바닥은 전부 덮습니다, GRATOP. 바닥보양재, 고무롤매트, 인조잔디, 야자매트를 면적만큼 주문제작하고 소매로 팔고 기간만큼 임대합니다. AOVO 그룹 브랜드.",
  openGraph: {
    title: "GRATOP — 밟히는 바닥은 전부 덮습니다 | 아오보",
    description: "행사장, 공사장, 전시장의 바닥을 자재로 지킵니다. 도매 · 소매 · 임대 · 주문제작.",
    images: [{ url: "/images/brands/gratop-hero.webp" }],
  },
};

export default function Page() {
  return (
    <BrandPage brand={brand} hero={<GratopHero brand={brand} />}>
      <GratopDeal />
    </BrandPage>
  );
}
