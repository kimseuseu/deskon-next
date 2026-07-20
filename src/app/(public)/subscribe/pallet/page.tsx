import { redirect } from "next/navigation";

// 구 서비스 상세 페이지 — 그룹 포털 전환으로 상위 소개 페이지로 이동
export default function Page() {
  redirect("/subscribe");
}
