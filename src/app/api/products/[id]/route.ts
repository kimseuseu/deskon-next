import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapProduct, serializeProductPatch } from "@/lib/deskon-data";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const includeInactive =
      req.nextUrl.searchParams.get("includeInactive") === "true";

    if (includeInactive) {
      const session = await getAdminSession();

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const supabase = createAdminClient();
    let query = supabase
      .from("deskon_products")
      .select("*")
      .eq("id", id);

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return NextResponse.json(
        { error: "상품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: mapProduct(data) });
  } catch (err) {
    console.error("Product GET error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

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
      .from("deskon_products")
      .update(serializeProductPatch(body))
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update product error:", error);
      return NextResponse.json(
        { error: "상품 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapProduct(data) });
  } catch (err) {
    console.error("Product PUT error:", err);
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

    const { data, error } = await supabase
      .from("deskon_products")
      .update({ is_active: false })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Soft delete product error:", error);
      return NextResponse.json(
        { error: "상품 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapProduct(data) });
  } catch (err) {
    console.error("Product DELETE error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
