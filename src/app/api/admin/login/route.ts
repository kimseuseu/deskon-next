import { compare, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSessionToken,
  setAdminSessionCookie,
} from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해 주세요." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data: admin, error } = await supabase
      .from("deskon_admins")
      .select("email, name, password_hash")
      .eq("email", email)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const isLegacyPlainText = !admin.password_hash.startsWith("$2");
    const isMatch = isLegacyPlainText
      ? admin.password_hash === password
      : await compare(password, admin.password_hash);

    if (!isMatch) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      admin: { email: admin.email, name: admin.name },
    });

    if (isLegacyPlainText) {
      await supabase
        .from("deskon_admins")
        .update({ password_hash: await hash(password, 10) })
        .eq("email", admin.email);
    }

    setAdminSessionCookie(
      response,
      createAdminSessionToken({
        email: admin.email,
        name: admin.name,
      })
    );

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
