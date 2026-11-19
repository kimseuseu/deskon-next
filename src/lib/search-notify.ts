import { after } from "next/server";
import { postPath, submitToIndexNow } from "@/lib/indexnow";
import { pingWebSub, waitForFreshFeed } from "@/lib/websub";

/**
 * 글을 발행 · 수정 · 삭제했을 때 검색엔진에 알리는 곳.
 * - 네이버 · 빙: IndexNow 로 글 주소와 목록(/blog)을 보냅니다. 새 글이 목록 맨 위에 올라오기 때문입니다.
 * - 구글: 피드가 새 내용으로 바뀐 것을 확인한 뒤 WebSub 허브에 알립니다.
 *
 * 응답을 보낸 뒤에 실행합니다(저장 응답이 검색엔진 때문에 늦어지지 않게).
 */
export function notifyPostChanged(slug: string) {
  after(async () => {
    await Promise.all([
      submitToIndexNow([postPath(slug), "/blog"]),
      waitForFreshFeed().then(() => pingWebSub()),
    ]);
  });
}
