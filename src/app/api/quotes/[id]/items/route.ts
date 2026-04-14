import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapQuoteItems } from "@/lib/deskon-data";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(
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
    const { data, error } = await supabase
      .from("deskon_quotes")
      .select("items")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "견적을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: mapQuoteItems(id, data.items) });
  } catch (err) {
    console.error("Quote items GET error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
