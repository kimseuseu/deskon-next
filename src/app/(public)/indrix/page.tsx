import { redirect } from "next/navigation";

// 2026-10-22 브랜드 정리로 사라진 페이지. 옛 주소는 그룹 브랜드 목록으로 보냅니다.
export default function Page() {
  redirect("/#brands");
}
