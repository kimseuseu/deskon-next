import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapInquiry, serializeInquiryUpdate } from "@/lib/deskon-data";
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
      .from("deskon_inquiries")
      .update(serializeInquiryUpdate(body))
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update inquiry error:", error);
      return NextResponse.json(
        { error: "문의 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapInquiry(data) });
  } catch (err) {
    console.error("Inquiry PUT error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
