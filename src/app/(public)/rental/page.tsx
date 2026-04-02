import { Metadata } from "next";
import RentalLanding from "./RentalLanding";

export const metadata: Metadata = {
  title: "렌탈서비스 | AOVO Group",
  description:
    "프로젝트·시즌 단위 장비 렌탈. 사무가구, 주방집기, IT기기, 의료장비, 이동식에어컨 등을 설치부터 회수까지 원스톱 관리합니다.",
  openGraph: {
    title: "렌탈서비스 — 프로젝트 맞춤 장비 렌탈 | AOVO Group",
    description:
      "초기 투자 없이 필요한 기간만큼 장비를 렌탈하세요. 전문 설치·유지보수·회수까지 포함.",
  },
};

export default function Page() {
  return <RentalLanding />;
}
