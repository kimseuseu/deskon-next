import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";
import { BLOG_CACHE_TAG, type PostRow } from "@/lib/blog";
import { fromRow, parsePostInput, toRowPatch } from "@/lib/post-input";

/** 관리자 전용. 초안을 포함한 모든 글. */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { data, error } = await createAdminClient()
      .from("deskon_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("[admin/posts] list failed", error);
      return NextResponse.json({ error: "글 목록을 불러오지 못했습니다." }, { status: 500 });
    }
    return NextResponse.json({ data: (data as PostRow[]).map(fromRow) });
  } catch (err) {
    console.error("[admin/posts] list error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = parsePostInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const { data, error } = await createAdminClient()
      .from("deskon_posts")
      .insert(toRowPatch(parsed.value))
      .select("*")
      .single();
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "같은 주소(슬러그)의 글이 이미 있습니다. 주소를 바꿔 주세요." }, { status: 409 });
      }
      console.error("[admin/posts] insert failed", error);
      return NextResponse.json({ error: "글을 저장하지 못했습니다." }, { status: 500 });
    }
    revalidateTag(BLOG_CACHE_TAG, "max");
    return NextResponse.json({ data: fromRow(data as PostRow) }, { status: 201 });
  } catch (err) {
    console.error("[admin/posts] insert error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
