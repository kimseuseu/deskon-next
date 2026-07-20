import type { Metadata } from "next";
import DivisionPage from "@/components/division/DivisionPage";
import { getDivision } from "@/data/divisions";

const division = getDivision("buyback")!;

export const metadata: Metadata = {
  title: "유통서비스",
  description:
    "자산의 마지막까지 가치 있게. 사무가구, 물류장비, 업소용집기를 전문 감정 기반의 투명한 가격으로 매입·유통합니다. 전국 무료 방문 수거, AOVO 그룹 유통서비스.",
  openGraph: {
    title: "유통서비스 — 자산의 마지막까지, 가치 있게 | 아오보",
    description:
      "이전·리모델링·폐업 장비의 매입과 유통. 문의부터 정산까지 4단계로 끝냅니다.",
    images: [{ url: division.heroImage }],
  },
};

export default function Page() {
  return <DivisionPage division={division} />;
}
