import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { getBrand } from "@/data/brands";

const brand = getBrand("indrix")!;

export const metadata: Metadata = {
  title: "INDRIX — 공장 · 설비 · 생산기술",
  description:
    "생산 라인의 컨디션, INDRIX. 칠러·냉각탑·집진기·산업용 공기청정기 — 공장과 생산 현장의 핵심 설비를 공급하고 운영합니다. AOVO 그룹 브랜드.",
  openGraph: {
    title: "INDRIX — 생산 라인의 컨디션 | 아오보",
    description: "칠러, 냉각탑, 집진기, 산업용 공기청정기. 생산기술의 눈으로 설비를 고르고 운영합니다.",
  },
};

export default function Page() {
  return <BrandPage brand={brand} />;
}
