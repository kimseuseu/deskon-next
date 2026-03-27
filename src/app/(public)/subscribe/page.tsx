import { Metadata } from "next";
import SubscribeLanding from "./SubscribeLanding";

export const metadata: Metadata = {
  title: "구독서비스 | AOVO",
  description:
    "월 구독으로 사무용 의자, 롤테이너, 파렛트, 인테이너, 이사바구니, 주방집기, 냉난방기를 필요한 만큼 사용하세요. 미사용 시 반납하면 비용이 멈춥니다.",
  openGraph: {
    title: "구독서비스 — 쓴 만큼만, 필요한 만큼만 | AOVO",
    description:
      "장비를 사지 않고 구독하세요. 필요할 때 배치, 불필요할 때 반납. 유지보수 포함, 자산 부담 제로.",
  },
};

export default function Page() {
  return <SubscribeLanding />;
}
