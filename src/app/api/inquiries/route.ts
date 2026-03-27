import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, inquiry_type, service_category, message } = body;

    if (!name || !phone || !inquiry_type || !message) {
      return NextResponse.json(
        { error: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_inquiries")
      .insert({
        name,
        company: company || null,
        phone,
        email: email || null,
        inquiry_type,
        service_category: service_category || null,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert inquiry error:", error);
      return NextResponse.json({ error: "문의 등록에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch inquiries error:", error);
      return NextResponse.json({ error: "문의 목록 조회에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Inquiry GET error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
