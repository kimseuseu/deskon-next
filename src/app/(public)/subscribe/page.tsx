import type { Metadata } from "next";
import DivisionPage from "@/components/division/DivisionPage";
import { getDivision } from "@/data/divisions";

const division = getDivision("subscribe")!;

export const metadata: Metadata = {
  title: "구독서비스",
  description:
    "쓸 때만 비용, 멈추면 0원. 사무용 체어부터 롤테이너, 파랫트, 주방집기, 냉난방기까지 — 정기 점검이 포함된 종량형 장비 구독. AOVO 그룹 구독서비스.",
  openGraph: {
    title: "구독서비스 — 쓸 때만 비용, 멈추면 0원 | 아오보",
    description:
      "매달 정액으로 장비를 운영하고, 사용이 멈추면 비용도 멈춥니다. 초기 비용 ZERO, 3개월 주기 정기 점검 포함.",
    images: [{ url: division.heroImage }],
  },
};

export default function Page() {
  return <DivisionPage division={division} />;
}
