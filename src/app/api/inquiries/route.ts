import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { mapInquiry } from "@/lib/deskon-data";
import { notifyNewInquiry } from "@/lib/kakao";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase-admin";
import { detailsToMessage, parseInquiryDetails, summarizeDetails } from "@/data/inquiry";

/** details(jsonb) 컬럼이 아직 없을 때 PostgREST/Postgres가 내는 오류 */
function isMissingDetailsColumn(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  if (error.code === "42703" || error.code === "PGRST204") return true;
  return /details/.test(error.message ?? "") && /column|schema cache/i.test(error.message ?? "");
}

/** 명함 주소는 우리 Cloudinary 계정의 https 주소만 받습니다. */
function isAllowedImageUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`inquiries:${getClientIp(req)}`, 5, 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const {
      name,
      company,
      phone,
      email,
      inquiry_type,
      service_category,
    } = body;
    let { message } = body as { message?: unknown };

    /* 단계형 견적 문의의 상세. 모양이 맞지 않으면 버립니다(옛 폼은 보내지 않음). */
    const details = parseInquiryDetails(body.details);
    if (details) {
      if (details.businessCard && !isAllowedImageUrl(details.businessCard.url)) {
        details.businessCard = null;
      }
      if (details.memo && details.memo.length > 2000) {
        details.memo = details.memo.slice(0, 2000);
      }
      /* 메모를 비워도 message 가 비지 않게 요약으로 채웁니다. */
      if (typeof message !== "string" || !message.trim()) {
        message = detailsToMessage(details);
      }
    }

    if (!name || !phone || !inquiry_type || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "필수 항목을 입력해 주세요." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const baseRow = {
      name,
      company: company || null,
      phone,
      email: email || null,
      inquiry_type,
      service_category: service_category || null,
      message,
    };

    let insert = await supabase
      .from("deskon_inquiries")
      .insert(details ? { ...baseRow, details } : baseRow)
      .select("*")
      .single();

    /* supabase-inquiry-details.sql 을 아직 실행하지 않은 운영 DB: details 없이 다시 저장합니다. */
    if (insert.error && details && isMissingDetailsColumn(insert.error)) {
      console.warn("deskon_inquiries.details 컬럼이 없어 상세 없이 저장합니다. supabase-inquiry-details.sql 을 실행하세요.");
      insert = await supabase
        .from("deskon_inquiries")
        .insert({ ...baseRow, message: details ? `${message}\n\n${detailsToMessage(details)}` : message })
        .select("*")
        .single();
    }

    const { data, error } = insert;

    if (error) {
      console.error("Insert inquiry error:", error);
      return NextResponse.json(
        { error: "문의 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    // 관리자 카카오톡으로 알림 — 실패해도 문의 접수에는 영향 없음
    await notifyNewInquiry({
      name,
      company,
      phone,
      inquiry_type,
      service_category: details?.field.label ?? service_category,
      message,
      summary: details ? summarizeDetails(details).filter((r) => r.label !== "분야") : undefined,
      business_card_url: details?.businessCard?.url ?? null,
    });

    return NextResponse.json({ data: mapInquiry(data) }, { status: 201 });
  } catch (err) {
    console.error("Inquiry POST error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("deskon_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch inquiries error:", error);
      return NextResponse.json(
        { error: "문의 목록 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: (data ?? []).map(mapInquiry) });
  } catch (err) {
    console.error("Inquiry GET error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
