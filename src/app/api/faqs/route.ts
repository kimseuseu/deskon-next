import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_faqs")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Fetch FAQs error:", error);
      return NextResponse.json(
        { error: "FAQ 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("FAQs GET error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("deskon_faqs")
      .insert(body)
      .select("*")
      .single();

    if (error) {
      console.error("Insert FAQ error:", error);
      return NextResponse.json(
        { error: "FAQ 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    /* 자주 묻는 질문 페이지는 서버에서 그려 5분 동안 보관합니다. 고치면 바로 다시 그리게 합니다. */
    revalidatePath("/support/faq");
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("FAQ POST error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
