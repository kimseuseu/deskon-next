import { Metadata } from "next";
import SharingLanding from "./SharingLanding";

export const metadata: Metadata = {
  title: "공유서비스 | AOVO Group",
  description:
    "에이플로우 앱으로 QR 스캔 한 번이면 장비 대여 끝. 롤테이너, 카트, 공항카트, 스테커 등을 시간·일·주 단위로 공유하세요.",
  openGraph: {
    title: "공유서비스 — QR 스캔으로 즉시 대여 | AOVO Group",
    description:
      "에이플로우 앱 기반 QR 장비 공유 서비스. 그룹 대여, GPS 스테이션 탐색, 실시간 요금 계산.",
  },
};

export default function Page() {
  return <SharingLanding />;
}
