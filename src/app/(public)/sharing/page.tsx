import type { Metadata } from "next";
import DivisionPage from "@/components/division/DivisionPage";
import AflowShowcase from "@/components/division/AflowShowcase";
import { getDivision } from "@/data/divisions";

const division = getDivision("sharing")!;

export const metadata: Metadata = {
  title: "공유서비스",
  description:
    "QR 스캔 한 번으로 3초 만에 물류장비를 대여하세요. 전국 스테이션 24시간 무인 운영, 서류·보증금 없는 후불 정산. AOVO 그룹 공유서비스.",
  openGraph: {
    title: "공유서비스 — 스캔 한 번으로, 3초 만에 | 아오보",
    description:
      "에이플로우(A-flow) 앱으로 롤테이너, 카트, 스테커를 필요한 시간만큼. 사용한 만큼만 지불합니다.",
    images: [{ url: division.heroImage }],
  },
};

export default function Page() {
  return (
    <DivisionPage division={division}>
      <AflowShowcase />
    </DivisionPage>
  );
}
