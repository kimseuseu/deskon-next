import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapProduct, serializeProductInput } from "@/lib/deskon-data";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  try {
    const includeInactive =
      req.nextUrl.searchParams.get("includeInactive") === "true";

    if (includeInactive) {
      const session = await getAdminSession();

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const supabase = createAdminClient();
    let query = supabase.from("deskon_products").select("*");

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Fetch products error:", error);
      return NextResponse.json(
        { error: "상품 목록 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: (data ?? []).map(mapProduct) });
  } catch (err) {
    console.error("Products GET error:", err);
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
      .from("deskon_products")
      .insert(serializeProductInput(body))
      .select("*")
      .single();

    if (error) {
      console.error("Insert product error:", error);
      return NextResponse.json(
        { error: "상품 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapProduct(data) }, { status: 201 });
  } catch (err) {
    console.error("Product POST error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
