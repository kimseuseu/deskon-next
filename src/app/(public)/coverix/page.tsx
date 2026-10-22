import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { CoverixHero, CoverixMaterials } from "@/components/brand/CoverixBrand";
import { getBrand } from "@/data/brands";

const brand = getBrand("coverix")!;

export const metadata: Metadata = {
  title: "COVERIX — 이동식 장비 맞춤 커버 · 점검 · 자산관리 구독",
  description:
    "덮고, 살피고, 오래 씁니다. 롤테이너 맞춤 커버 제작, 전국 순회 무료 점검과 용접 · 바퀴 수리, 자산관리 구독까지. AOVO 그룹 브랜드 COVERIX.",
  openGraph: {
    title: "COVERIX — 덮고, 살피고, 오래 씁니다 | 아오보",
    description: "롤테이너를 비롯한 이동식 장비의 맞춤 커버, 정기 점검 · 수리, 자산관리 구독을 소개합니다.",
    images: [{ url: "/images/brands/coverix-hero.webp" }],
  },
};

export default function Page() {
  return (
    <BrandPage brand={brand} hero={<CoverixHero brand={brand} />}>
      <CoverixMaterials />
    </BrandPage>
  );
}
