import type { Metadata } from "next";
import ContactExperience from "@/components/contact/ContactExperience";

export const metadata: Metadata = {
  title: "견적 문의",
  description:
    "행사장 급배수, 가스기기 임대, 렌탈, 구독까지. 분야와 현장 정보를 고르고 연락처를 남기면 24시간 안에 견적을 보내드립니다.",
  alternates: { canonical: "https://www.aovo.kr/support/contact" },
};

/** 단계형 견적 문의. 폼 자체는 components/contact 에 있습니다. */
export default function ContactPage() {
  return <ContactExperience />;
}
