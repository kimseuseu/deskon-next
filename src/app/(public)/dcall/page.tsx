import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { DcallHero, DcallMoments } from "@/components/brand/DcallBrand";
import { getBrand } from "@/data/brands";

const brand = getBrand("dcall")!;

export const metadata: Metadata = {
  title: "달려콜 — 긴급 현장 인력 · 시간 단위 투입",
  description:
    "전국 30분 이내 도착, 달려콜. 상하차 · 행사 설치 · 이사 정리부터 전기 · 배관 기술자까지, 작업에 맞는 사람을 시간 단위로 보내고 요청한 시간만 정산합니다. AOVO 그룹 브랜드.",
  openGraph: {
    title: "달려콜 — 전국 30분 이내 도착 | 아오보",
    description: "사람 하나가 비어서 일이 멈춘 그날 거는 전화. 긴급 현장 인력을 시간 단위로 보냅니다.",
    images: [{ url: "/images/brands/dcall-hero.webp" }],
  },
};

export default function Page() {
  return (
    <BrandPage brand={brand} hero={<DcallHero brand={brand} />}>
      <DcallMoments />
    </BrandPage>
  );
}
