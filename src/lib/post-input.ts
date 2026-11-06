import { slugify } from "@/lib/markdown";
import type { PostRow } from "@/lib/blog";

/**
 * 관리자 글 입력값 검증·정리. /api/admin/posts 가 저장 전에 거칩니다.
 * 화면(관리자 편집기)과 DB 행(PostRow)의 중간 모양입니다.
 */

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  category: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  authorName: string;
  status: "draft" | "published";
  publishedAt: string | null;
}

export interface AdminPost extends PostInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_CATEGORY = "아오보 소식";
export const SUGGESTED_CATEGORIES = ["급배수 현장", "가스기기 임대", "사무가구 구독·렌탈", "중고 자산 매입", "아오보 소식"];

const str = (v: unknown) => (typeof v === "string" ? v : "");
const trimOrNull = (v: unknown) => {
  const s = str(v).trim();
  return s ? s : null;
};

/** 화면에서 온 값을 검증해 저장 가능한 모양으로. 문제가 있으면 메시지를 돌려줍니다. */
export function parsePostInput(body: unknown): { ok: true; value: PostInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "본문이 비어 있습니다." };
  const b = body as Record<string, unknown>;

  const title = str(b.title).trim();
  if (!title) return { ok: false, error: "제목을 입력해 주세요." };
  if (title.length > 120) return { ok: false, error: "제목은 120자 이내로 적어 주세요." };

  const slug = slugify(str(b.slug).trim() || title);
  if (!slug) return { ok: false, error: "주소(슬러그)를 만들 수 없습니다. 영문이나 한글로 적어 주세요." };

  const status = b.status === "published" ? "published" : "draft";

  let publishedAt: string | null = null;
  if (b.publishedAt) {
    const d = new Date(str(b.publishedAt));
    if (Number.isNaN(d.getTime())) return { ok: false, error: "발행 시각이 올바르지 않습니다." };
    publishedAt = d.toISOString();
  }
  /* 발행 상태인데 시각이 없으면 지금으로. 초안은 비워 둡니다. */
  if (status === "published" && !publishedAt) publishedAt = new Date().toISOString();

  const coverImageUrl = trimOrNull(b.coverImageUrl);
  if (coverImageUrl && !/^(https:\/\/|\/)/.test(coverImageUrl)) {
    return { ok: false, error: "대표 이미지 주소는 https:// 로 시작해야 합니다." };
  }

  return {
    ok: true,
    value: {
      title,
      slug,
      excerpt: str(b.excerpt).trim().slice(0, 300),
      contentMd: str(b.contentMd),
      category: str(b.category).trim() || DEFAULT_CATEGORY,
      coverImageUrl,
      coverImageAlt: trimOrNull(b.coverImageAlt),
      authorName: str(b.authorName).trim() || "아오보",
      status,
      publishedAt,
    },
  };
}

export function toRowPatch(input: PostInput) {
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content_md: input.contentMd,
    category: input.category,
    cover_image_url: input.coverImageUrl,
    cover_image_alt: input.coverImageAlt,
    author_name: input.authorName,
    status: input.status,
    published_at: input.publishedAt,
  };
}

export function fromRow(row: PostRow): AdminPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    contentMd: row.content_md ?? "",
    category: row.category,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    authorName: row.author_name,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
