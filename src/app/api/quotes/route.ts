import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, contact_name, phone, email, address, delivery_date, message, items } = body;

    if (!company || !contact_name || !phone) {
      return NextResponse.json(
        { error: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_quotes")
      .insert({
        company,
        contact_name,
        phone,
        email: email || null,
        address: address || null,
        delivery_date: delivery_date || null,
        message: message || null,
        items: items || [],
      })
      .select()
      .single();

    if (error) {
      console.error("Insert quote error:", error);
      return NextResponse.json({ error: "견적 요청 등록에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Quote POST error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch quotes error:", error);
      return NextResponse.json({ error: "견적 목록 조회에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Quote GET error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
