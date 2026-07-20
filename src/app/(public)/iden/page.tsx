import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import IdenCraft from "@/components/brand/IdenCraft";
import { getBrand } from "@/data/brands";

const brand = getBrand("iden")!;

export const metadata: Metadata = {
  title: "IDEN — 기업 인사총무 · 사무환경",
  description:
    "일하는 공간의 기준, IDEN. 사무가구와 OA기기의 판매·유통·렌탈·구독까지 — 기업 인사총무가 찾는 사무환경 운영을 책임집니다. AOVO 그룹 브랜드.",
  openGraph: {
    title: "IDEN — 일하는 공간의 기준 | 아오보",
    description: "사무환경의 판매·유통·렌탈·구독을 한곳에서. AOVO 그룹의 사무환경 브랜드 IDEN.",
  },
};

export default function Page() {
  return (
    <BrandPage brand={brand}>
      <IdenCraft />
    </BrandPage>
  );
}
