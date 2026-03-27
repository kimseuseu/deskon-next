import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_notices")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch notices error:", error);
      return NextResponse.json({ error: "공지사항 조회에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Notices GET error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("deskon_notices")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("Insert notice error:", error);
      return NextResponse.json({ error: "공지사항 등록에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Notice POST error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
