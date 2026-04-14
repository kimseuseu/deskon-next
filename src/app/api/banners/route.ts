import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapBanner, serializeBannerInput } from "@/lib/deskon-data";
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
    let query = supabase.from("deskon_banners").select("*");

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query.order("sort_order", { ascending: true });

    if (error) {
      console.error("Fetch banners error:", error);
      return NextResponse.json(
        { error: "배너 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: (data ?? []).map(mapBanner) });
  } catch (err) {
    console.error("Banners GET error:", err);
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
      .from("deskon_banners")
      .insert(serializeBannerInput(body))
      .select("*")
      .single();

    if (error) {
      console.error("Insert banner error:", error);
      return NextResponse.json(
        { error: "배너 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: mapBanner(data) }, { status: 201 });
  } catch (err) {
    console.error("Banner POST error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
