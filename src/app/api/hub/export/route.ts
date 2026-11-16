import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { INQUIRY_STATUS_LABEL, fieldLabel, parseInquiryDetails } from "@/data/inquiry";
import type { RawViewStats } from "@/lib/post-stats";
import { createAdminClient } from "@/lib/supabase-admin";

/**
 * 통합 관리자 허브(admin-hub)가 이 사이트의 관리자 정보를 통째로 받아가는 내보내기.
 * 규격: admin-hub/docs/연동-규격.md (버전 1). 읽기 전용이며 아무것도 쓰지 않습니다.
 *
 *   GET /api/hub/export
 *   Authorization: Bearer <HUB_API_TOKEN>
 *
 * 관리자 메뉴의 목록(견적 · 문의 · 상품 · 현장 노트 글 · 배너)과 공지 · FAQ 를 묶음 하나씩,
 * 현장 노트 조회수를 날짜별 지표로 보냅니다. 개인정보는 관리자 목록에 이미 보이는 범위까지만 담고,
 * 글 본문(content_md)과 비밀번호 해시 같은 것은 넣지 않습니다.
 */

/* ── 규격 모양 ───────────────────────────────────────────────────── */

type FieldValue = string | number | boolean | null;

interface ExportRow {
  id: string;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  title: string;
  amount?: number;
  adminPath?: string;
  fields: Record<string, FieldValue>;
}

interface ExportCollection {
  key: string;
  label: string;
  kind: "quote" | "inquiry" | "order" | "product" | "post" | "member" | "other";
  adminPath?: string;
  columns: { key: string; label: string }[];
  statuses: Record<string, string>;
  attentionStatuses: string[];
  rows: ExportRow[];
}

interface ExportMetric {
  key: string;
  label: string;
  unit: string;
  series: { date: string; value: number }[];
}

/* ── 작은 도우미 ─────────────────────────────────────────────────── */

type Row = Record<string, unknown>;

const str = (v: unknown): string | null => (typeof v === "string" ? v : null);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const bool = (v: unknown): boolean | null => (typeof v === "boolean" ? v : null);

/** 줄바꿈을 공백으로 바꾸고 앞 n 자만. 목록용 요약. */
function summarize(text: string | null, n = 80): string | null {
  if (!text) return null;
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (!oneLine) return null;
  return oneLine.length > n ? `${oneLine.slice(0, n)}…` : oneLine;
}

/** 운영 중인 Supabase 에 표나 함수가 아직 없을 때(SQL 미실행) 나는 오류 코드 */
function isMissingRelation(error: { code?: string } | null): boolean {
  return error?.code === "42P01" || error?.code === "PGRST202" || error?.code === "42883" || error?.code === "PGRST205";
}

function tokenOk(req: NextRequest): boolean {
  const expected = process.env.HUB_API_TOKEN ?? "";
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!expected || !given || expected.length !== given.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(given));
}

/** 이 사이트의 관리자 주소. NEXT_PUBLIC_SITE_URL 이 있으면 그것, 없으면 요청이 들어온 주소. */
function adminUrlOf(req: NextRequest): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
  if (configured) return `${configured}/admin`;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}/admin`;
}

/* ── 표 읽기 ─────────────────────────────────────────────────────── */

type Admin = ReturnType<typeof createAdminClient>;

/** PostgREST 는 한 번에 최대 1,000줄만 주므로 끝까지 이어 받습니다. 표가 없으면 빈 배열. */
async function selectAll(supabase: Admin, table: string, columns: string, orderBy: string): Promise<Row[]> {
  const PAGE = 1000;
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .order(orderBy, { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) {
      if (isMissingRelation(error)) {
        console.warn(`[hub/export] ${table} 표가 없어 빈 묶음으로 보냅니다.`);
        return [];
      }
      throw new Error(`${table}: ${error.message}`);
    }
    const page = (data ?? []) as unknown as Row[];
    rows.push(...page);
    if (page.length < PAGE) return rows;
  }
}

/** 현장 노트 조회 통계. supabase-post-views.sql 을 아직 실행하지 않았으면 null. */
async function loadViewStats(supabase: Admin): Promise<RawViewStats | null> {
  const { data, error } = await supabase.rpc("deskon_post_view_stats", { p_days: 365 });
  if (error) {
    if (isMissingRelation(error)) return null;
    throw new Error(`deskon_post_view_stats: ${error.message}`);
  }
  return (data as RawViewStats | null) ?? null;
}

const createdAtOf = (row: Row, fallback: string) => str(row.created_at) ?? fallback;

/* ── 묶음 만들기 ─────────────────────────────────────────────────── */

const QUOTE_STATUSES = { pending: "대기", reviewed: "검토", quoted: "견적완료", accepted: "수락", declined: "거절" };

function quotesCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "quotes",
    label: "견적 요청",
    kind: "quote",
    adminPath: "/admin/quotes",
    columns: [
      { key: "company", label: "회사" },
      { key: "contactName", label: "담당자" },
      { key: "phone", label: "연락처" },
      { key: "email", label: "이메일" },
      { key: "deliveryDate", label: "납품 희망일" },
      { key: "items", label: "품목" },
      { key: "rentalMonths", label: "개월" },
    ],
    statuses: QUOTE_STATUSES,
    attentionStatuses: ["pending"],
    rows: rows.map((q) => {
      const items = Array.isArray(q.items) ? (q.items as unknown[]).map((it) => (it && typeof it === "object" ? (it as Row) : {})) : [];
      const itemSummary = items
        .map((it) => {
          const name = str(it.productName) ?? "상품명 미정";
          const qty = num(it.quantity);
          return qty !== null ? `${name} ${qty}` : name;
        })
        .join(", ");
      const months = [...new Set(items.map((it) => num(it.rentalMonths)).filter((m): m is number => m !== null))];
      const company = str(q.company) ?? "";
      const contact = str(q.contact_name) ?? "";
      return {
        id: String(q.id),
        createdAt: createdAtOf(q, now),
        status: str(q.status) ?? "pending",
        title: [company, contact].filter(Boolean).join(" / "),
        adminPath: "/admin/quotes",
        /* 데스크온 견적에는 금액 칸이 없어 amount 는 넣지 않습니다(0 으로 넣으면 결산에 0원이 잡힘). */
        fields: {
          company,
          contactName: contact,
          phone: str(q.phone),
          email: str(q.email),
          deliveryDate: str(q.delivery_date),
          items: itemSummary || null,
          rentalMonths: months.length === 0 ? null : months.length === 1 ? months[0] : months.join(", "),
        },
      };
    }),
  };
}

function inquiriesCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "inquiries",
    label: "문의",
    kind: "inquiry",
    adminPath: "/admin/inquiries",
    columns: [
      { key: "name", label: "이름" },
      { key: "company", label: "회사" },
      { key: "phone", label: "연락처" },
      { key: "type", label: "유형" },
      { key: "field", label: "분야" },
      { key: "event", label: "현장" },
      { key: "message", label: "내용 요약" },
    ],
    statuses: INQUIRY_STATUS_LABEL,
    attentionStatuses: ["new"],
    rows: rows.map((i) => {
      const details = parseInquiryDetails(i.details);
      const name = str(i.name) ?? "";
      const field = fieldLabel(details?.field.slug ?? str(i.service_category)) || null;
      const type = str(i.inquiry_type);
      return {
        id: String(i.id),
        createdAt: createdAtOf(i, now),
        status: str(i.status) ?? "new",
        title: [name, field ?? type].filter(Boolean).join(" · "),
        adminPath: "/admin/inquiries",
        fields: {
          name,
          company: str(i.company),
          phone: str(i.phone),
          type,
          field,
          event: details?.event.name ?? null,
          message: summarize(details?.memo ?? str(i.message)),
        },
      };
    }),
  };
}

function productsCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "products",
    label: "상품",
    kind: "product",
    adminPath: "/admin/products",
    columns: [
      { key: "category", label: "분류" },
      { key: "price", label: "월 요금" },
      { key: "priceUnit", label: "단위" },
    ],
    statuses: { active: "판매중", inactive: "숨김" },
    attentionStatuses: [],
    rows: rows.map((p) => ({
      id: String(p.id),
      createdAt: createdAtOf(p, now),
      updatedAt: str(p.updated_at) ?? undefined,
      status: (bool(p.is_active) ?? true) ? "active" : "inactive",
      title: str(p.name) ?? "",
      adminPath: "/admin/products",
      fields: {
        category: str(p.category),
        price: num(p.price),
        priceUnit: str(p.price_unit),
      },
    })),
  };
}

function postsCollection(rows: Row[], now: string, views: Map<string, number> | null): ExportCollection {
  return {
    key: "posts",
    label: "현장 노트 글",
    kind: "post",
    adminPath: "/admin/posts",
    columns: [
      { key: "category", label: "분류" },
      { key: "author", label: "작성자" },
      { key: "publishedAt", label: "발행일" },
      { key: "views", label: "조회수" },
    ],
    statuses: { draft: "임시", published: "발행" },
    attentionStatuses: [],
    rows: rows.map((p) => {
      const id = String(p.id);
      return {
        id,
        createdAt: createdAtOf(p, now),
        updatedAt: str(p.updated_at) ?? undefined,
        status: str(p.status) ?? "draft",
        title: str(p.title) ?? "",
        adminPath: `/admin/posts/${id}`,
        fields: {
          category: str(p.category),
          author: str(p.author_name),
          publishedAt: str(p.published_at),
          views: views ? (views.get(id) ?? 0) : null,
        },
      };
    }),
  };
}

function bannersCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "banners",
    label: "배너",
    kind: "other",
    adminPath: "/admin/banners",
    columns: [
      { key: "description", label: "설명" },
      { key: "linkUrl", label: "링크" },
      { key: "sortOrder", label: "정렬" },
      { key: "isActive", label: "활성" },
    ],
    statuses: { active: "활성", inactive: "비활성" },
    attentionStatuses: [],
    rows: rows.map((b) => ({
      id: String(b.id),
      createdAt: createdAtOf(b, now),
      status: (bool(b.is_active) ?? true) ? "active" : "inactive",
      title: str(b.title) ?? "",
      adminPath: "/admin/banners",
      fields: {
        description: str(b.description),
        linkUrl: str(b.link_url),
        sortOrder: num(b.sort_order),
        isActive: bool(b.is_active) ?? true,
      },
    })),
  };
}

/* 공지와 FAQ 는 관리자 메뉴에는 없고 API(/api/notices, /api/faqs)로만 다룹니다. 그래도 사이트 자료이므로 함께 보냅니다. */
function noticesCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "notices",
    label: "공지사항",
    kind: "other",
    columns: [
      { key: "category", label: "분류" },
      { key: "isPinned", label: "고정" },
      { key: "views", label: "조회" },
    ],
    statuses: {},
    attentionStatuses: [],
    rows: rows.map((n) => ({
      id: String(n.id),
      createdAt: createdAtOf(n, now),
      title: str(n.title) ?? "",
      fields: {
        category: str(n.category),
        isPinned: bool(n.is_pinned) ?? false,
        views: num(n.views),
      },
    })),
  };
}

function faqsCollection(rows: Row[], now: string): ExportCollection {
  return {
    key: "faqs",
    label: "자주 묻는 질문",
    kind: "other",
    columns: [
      { key: "category", label: "분류" },
      { key: "sortOrder", label: "정렬" },
      { key: "isActive", label: "활성" },
    ],
    statuses: { active: "활성", inactive: "비활성" },
    attentionStatuses: [],
    rows: rows.map((f) => ({
      id: String(f.id),
      createdAt: createdAtOf(f, now),
      status: (bool(f.is_active) ?? true) ? "active" : "inactive",
      title: str(f.question) ?? "",
      fields: {
        category: str(f.category),
        sortOrder: num(f.sort_order),
        isActive: bool(f.is_active) ?? true,
      },
    })),
  };
}

/** 글별 누적 조회수와 날짜별 합계 지표. 통계 표가 없으면 둘 다 비웁니다. */
function viewsOf(stats: RawViewStats | null): { perPost: Map<string, number> | null; metrics: ExportMetric[] } {
  if (!stats) return { perPost: null, metrics: [] };
  const perPost = new Map<string, number>();
  for (const t of stats.totals ?? []) perPost.set(String(t.postId), (perPost.get(String(t.postId)) ?? 0) + t.views);
  const byDay = new Map<string, number>();
  for (const d of stats.daily ?? []) byDay.set(d.day, (byDay.get(d.day) ?? 0) + d.views);
  const series = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, value]) => ({ date, value }));
  return {
    perPost,
    metrics: [{ key: "post_views", label: "현장 노트 조회수", unit: "회", series }],
  };
}

/* ── 응답 ────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  if (!tokenOk(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  try {
    const supabase = createAdminClient();
    const now = new Date().toISOString();

    const [quotes, inquiries, products, posts, banners, notices, faqs, stats] = await Promise.all([
      selectAll(supabase, "deskon_quotes", "id,company,contact_name,phone,email,delivery_date,items,status,created_at", "created_at"),
      /* details(jsonb) 는 supabase-inquiry-details.sql 을 아직 실행하지 않은 운영 DB 에는 없으므로 열을 지정하지 않고 읽습니다. */
      selectAll(supabase, "deskon_inquiries", "*", "created_at"),
      selectAll(supabase, "deskon_products", "id,category,name,price,price_unit,is_active,created_at,updated_at", "created_at"),
      /* 본문(content_md)은 크고 허브에 필요 없어 빼고 읽습니다. */
      selectAll(supabase, "deskon_posts", "id,title,category,author_name,status,published_at,created_at,updated_at", "updated_at"),
      selectAll(supabase, "deskon_banners", "id,title,description,link_url,is_active,sort_order,created_at", "created_at"),
      selectAll(supabase, "deskon_notices", "id,title,category,is_pinned,views,created_at", "created_at"),
      selectAll(supabase, "deskon_faqs", "id,question,category,sort_order,is_active,created_at", "created_at"),
      loadViewStats(supabase),
    ]);

    const views = viewsOf(stats);

    return NextResponse.json(
      {
        format: "admin-hub-export",
        version: 1,
        site: { name: "데스크온", adminUrl: adminUrlOf(req) },
        generatedAt: now,
        collections: [
          quotesCollection(quotes, now),
          inquiriesCollection(inquiries, now),
          productsCollection(products, now),
          postsCollection(posts, now, views.perPost),
          bannersCollection(banners, now),
          noticesCollection(notices, now),
          faqsCollection(faqs, now),
        ],
        metrics: views.metrics,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[hub/export] failed", err);
    return NextResponse.json(
      { error: "내보내기에 실패했습니다. 서버 로그를 확인해 주세요." },
      { status: 500, headers: { "cache-control": "no-store" } },
    );
  }
}
