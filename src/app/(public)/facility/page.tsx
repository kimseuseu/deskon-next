import { redirect } from "next/navigation";

// 설비공사 랜딩은 /gas, /water 두 페이지로 나뉘었습니다. 옛 주소는 가스로 보냅니다.
export default function Page() {
  redirect("/gas");
}
