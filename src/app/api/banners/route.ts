import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_banners")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Fetch banners error:", error);
      return NextResponse.json({ error: "배너 조회에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Banners GET error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("deskon_banners")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("Insert banner error:", error);
      return NextResponse.json({ error: "배너 등록에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Banner POST error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
