import { Metadata } from "next";
import RecycleLanding from "./RecycleLanding";

export const metadata: Metadata = {
  title: "순환서비스 | AOVO",
  description:
    "사용이 끝난 장비를 수거·재생·재배치하는 순환경제 서비스. ESG 경영 지원, 자산 처분 비용 절감, 환경 인증까지.",
  openGraph: {
    title: "순환서비스 — ESG 기반 장비 순환경제 | AOVO",
    description:
      "버리지 말고 순환하세요. 3단계 품질 검수를 거쳐 장비를 재생하고, ESG 인증을 지원합니다.",
  },
};

export default function Page() {
  return <RecycleLanding />;
}
