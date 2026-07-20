import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { getBrand } from "@/data/brands";

const brand = getBrand("vetix")!;

export const metadata: Metadata = {
  title: "VETIX — 전기시설 · 데이터센터 · UPS/산업용 배터리",
  description:
    "멈추지 않는 전원의 조건, VETIX. UPS·산업용 배터리의 중고 매입과 검증 판매, 정밀 성능테스트, 구독서비스까지. AOVO 그룹 브랜드.",
  openGraph: {
    title: "VETIX — 멈추지 않는 전원의 조건 | 아오보",
    description: "데이터센터·전기시설의 UPS와 산업용 배터리를 매입·판매·성능테스트·구독으로 운영합니다.",
  },
};

export default function Page() {
  return <BrandPage brand={brand} />;
}
