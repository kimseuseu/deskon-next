import type { Metadata } from "next";
import DivisionPage from "@/components/division/DivisionPage";
import { getDivision } from "@/data/divisions";

const division = getDivision("rental")!;

export const metadata: Metadata = {
  title: "렌탈서비스",
  description:
    "필요한 기간만큼 맞춤 렌탈. 사무가구, IT기기, 의료장비, 행사집기까지 — 설치부터 유지보수, 회수까지 전 과정을 관리합니다. AOVO 그룹 렌탈서비스.",
  openGraph: {
    title: "렌탈서비스 — 필요한 기간만큼, 맞춤으로 | 아오보",
    description:
      "1개월부터 36개월까지 자유 계약. 초기 비용 90% 절감, 전담 매니저의 원스톱 관리.",
    images: [{ url: division.heroImage }],
  },
};

export default function Page() {
  return <DivisionPage division={division} />;
}
