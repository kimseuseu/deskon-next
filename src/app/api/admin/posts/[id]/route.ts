import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";
import { BLOG_CACHE_TAG, type PostRow } from "@/lib/blog";
import { fromRow, parsePostInput, toRowPatch } from "@/lib/post-input";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { data, error } = await createAdminClient().from("deskon_posts").select("*").eq("id", id).maybeSingle();
    if (error) {
      console.error("[admin/posts] get failed", error);
      return NextResponse.json({ error: "글을 불러오지 못했습니다." }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "글이 없습니다." }, { status: 404 });
    return NextResponse.json({ data: fromRow(data as PostRow) });
  } catch (err) {
    console.error("[admin/posts] get error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const parsed = parsePostInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const { data, error } = await createAdminClient()
      .from("deskon_posts")
      .update(toRowPatch(parsed.value))
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "같은 주소(슬러그)의 글이 이미 있습니다. 주소를 바꿔 주세요." }, { status: 409 });
      }
      console.error("[admin/posts] update failed", error);
      return NextResponse.json({ error: "글을 저장하지 못했습니다." }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "글이 없습니다." }, { status: 404 });
    revalidateTag(BLOG_CACHE_TAG, "max");
    return NextResponse.json({ data: fromRow(data as PostRow) });
  } catch (err) {
    console.error("[admin/posts] update error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const { error } = await createAdminClient().from("deskon_posts").delete().eq("id", id);
    if (error) {
      console.error("[admin/posts] delete failed", error);
      return NextResponse.json({ error: "글을 삭제하지 못했습니다." }, { status: 500 });
    }
    revalidateTag(BLOG_CACHE_TAG, "max");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/posts] delete error", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
