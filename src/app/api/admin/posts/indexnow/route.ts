import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getPostIndex } from "@/lib/blog";
import { postPath, submitToIndexNow } from "@/lib/indexnow";
import { pingWebSub } from "@/lib/websub";

/** 글과 함께 다시 알릴 사이트 주요 페이지. 글이 링크하는 랜딩과 목록입니다. */
const SITE_PATHS = ["/", "/blog", "/water", "/gas", "/gas/rental", "/subscribe", "/rental", "/recycle", "/buyback"];

/**
 * 관리자 전용. 공개 중인 글 전부와 주요 페이지를 검색엔진(IndexNow)에 한꺼번에 다시 알리고,
 * 구글이 듣는 WebSub 허브에도 피드를 다시 읽어 가라고 알립니다.
 * 새 글은 저장할 때 자동으로 알리므로, 이 경로는 처음 한 번이나 색인이 빠졌을 때만 씁니다.
 */
export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await getPostIndex();
  const paths = [...SITE_PATHS, ...posts.map((p) => postPath(p.slug))];
  const [results, websub] = await Promise.all([submitToIndexNow(paths), pingWebSub()]);

  return NextResponse.json({ data: { submitted: paths, results, websub, skipped: results.length === 0 } });
}
