import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { getBrand } from "@/data/brands";

const brand = getBrand("dkorea")!;

export const metadata: Metadata = {
  title: "디코리아 — 물류센터 · 택배유통 · 3PL",
  description:
    "물류운반장비 중고 전문 쇼핑몰 디코리아. 롤테이너, 파랫트, 메쉬파랫트, 도크, 스테커까지 — 물류 현장 장비의 매입·판매·당일 렌탈을 한곳에서.",
  openGraph: {
    title: "디코리아 — 물류장비의 모든 순간 | 아오보",
    description:
      "중고 전문 감정, 당일·단기 렌탈, 매일 업데이트되는 재고. 물류운반장비 전문몰 디코리아를 소개합니다.",
    images: [{ url: "/images/logistics/hero-alt.webp" }],
  },
};

export default function Page() {
  return <BrandPage brand={brand} />;
}
