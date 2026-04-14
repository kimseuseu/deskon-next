import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapBanner, serializeBannerPatch } from "@/lib/deskon-data";
import { createAdminClient } from "@/lib/supabase-admin";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("deskon_banners")
      .update(serializeBannerPatch(body))
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update banner error:", error);
      return NextResponse.json(
        { error: "배너 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapBanner(data) });
  } catch (err) {
    console.error("Banner PUT error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("deskon_banners")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete banner error:", error);
      return NextResponse.json(
        { error: "배너 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Banner DELETE error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
