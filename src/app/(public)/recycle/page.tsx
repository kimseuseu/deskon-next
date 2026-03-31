import { Metadata } from "next";
import RecycleLanding from "./RecycleLanding";

export const metadata: Metadata = {
  title: "순환서비스 | AOVO",
  description:
    "전문 재정비를 거친 검증된 품질의 장비를 합리적인 가격으로 다시 만나는 순환서비스. ESG 경영 지원, 비용 절감, 환경 인증까지.",
  openGraph: {
    title: "순환서비스 — 검증된 품질, 합리적 가격 | AOVO",
    description:
      "새것처럼 관리된 장비를 합리적 가격으로. 3단계 품질 검수와 전문 재정비를 거친 검증된 장비를 제공합니다.",
  },
};

export default function Page() {
  return <RecycleLanding />;
}
