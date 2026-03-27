import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data: admin, error } = await supabase
      .from("deskon_admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // Plain text password comparison (no bcrypt in edge runtime)
    if (admin.password !== password) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // Simple base64 token with expiry (24 hours)
    const exp = Date.now() + 24 * 60 * 60 * 1000;
    const payload = { email: admin.email, name: admin.name, exp };
    const token = Buffer.from(JSON.stringify(payload)).toString("base64");

    return NextResponse.json({
      token,
      admin: { email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
