import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("deskon_faqs")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update FAQ error:", error);
      return NextResponse.json({ error: "FAQ 수정에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("FAQ PUT error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("deskon_faqs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete FAQ error:", error);
      return NextResponse.json({ error: "FAQ 삭제에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ message: "삭제되었습니다." });
  } catch (err) {
    console.error("FAQ DELETE error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
