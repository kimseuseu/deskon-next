import type { Metadata } from "next";
import DivisionPage from "@/components/division/DivisionPage";
import { getDivision } from "@/data/divisions";

const division = getDivision("recycle")!;

export const metadata: Metadata = {
  title: "자산연대서비스",
  description:
    "새것처럼, 다시. 3단계 품질 인증을 거친 재정비 장비를 신품 대비 최대 60% 절감된 가격으로. ESG 경영을 함께 실현하는 AOVO 그룹 자산연대서비스.",
  openGraph: {
    title: "자산연대서비스 — 새것처럼, 다시 | 아오보",
    description:
      "입고 검수, 전문 재정비, 품질 인증의 순환 프로세스. 비용 절감과 ESG를 동시에.",
    images: [{ url: division.heroImage }],
  },
};

export default function Page() {
  return <DivisionPage division={division} />;
}
