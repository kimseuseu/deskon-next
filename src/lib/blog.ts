import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import { readingMinutes, renderMarkdown } from "@/lib/markdown";

/**
 * 블로그 데이터 계층. 글은 Supabase 의 deskon_posts 한 테이블에 있습니다(supabase-posts.sql).
 *
 * 공개 화면은 발행된 글(status=published, published_at<=now)만 읽습니다.
 * 읽기는 모두 "blog-posts" 태그로 5분 캐시되고, 관리자가 글을 저장하면
 * /api/admin/posts 가 revalidateTag 로 즉시 비웁니다.
 *
 * NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없으면 빈 결과를 돌려주고 빌드는 깨지지 않습니다.
 */

export const BLOG_CACHE_TAG = "blog-posts";
const REVALIDATE_SECONDS = 300;
export const POSTS_PER_PAGE = 12;

export const isBlogConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

/* ── 화면이 쓰는 모양 ───────────────────────────────────────────── */

export interface PostImage {
  url: string;
  alt: string;
}

export interface PostCategory {
  /** URL 에 쓰는 값. 이름을 그대로 씁니다(인코딩은 링크를 만들 때). */
  slug: string;
  name: string;
  count?: number;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  image: PostImage | null;
  categories: PostCategory[];
}

export interface Post extends PostSummary {
  contentHtml: string;
  author: string;
  readingMinutes: number;
}

export interface PostPage {
  posts: PostSummary[];
  total: number;
  totalPages: number;
  page: number;
}

/* ── DB 행 ───────────────────────────────────────────────────────── */

export interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  category: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  author_name: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const SUMMARY_COLUMNS =
  "id,slug,title,excerpt,category,cover_image_url,cover_image_alt,author_name,status,published_at,created_at,updated_at";

function toCategory(name: string): PostCategory {
  return { slug: name, name };
}

function toSummary(row: Omit<PostRow, "content_md">): PostSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.published_at ?? row.created_at,
    modified: row.updated_at,
    image: row.cover_image_url ? { url: row.cover_image_url, alt: row.cover_image_alt ?? "" } : null,
    categories: row.category ? [toCategory(row.category)] : [],
  };
}

function toPost(row: PostRow): Post {
  return {
    ...toSummary(row),
    contentHtml: renderMarkdown(row.content_md),
    author: row.author_name || "아오보",
    readingMinutes: readingMinutes(row.content_md),
  };
}

/* ── 질의 ────────────────────────────────────────────────────────── */

function publishedQuery() {
  const supabase = createAdminClient();
  return supabase
    .from("deskon_posts")
    .select(SUMMARY_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString());
}

const cachedPosts = unstable_cache(
  async (page: number, perPage: number, category: string | undefined): Promise<PostPage> => {
    const empty: PostPage = { posts: [], total: 0, totalPages: 0, page };
    if (!isBlogConfigured()) return empty;
    try {
      let q = publishedQuery().order("published_at", { ascending: false });
      if (category) q = q.eq("category", category);
      const from = (page - 1) * perPage;
      const { data, count, error } = await q.range(from, from + perPage - 1);
      if (error) {
        console.error("[blog] getPosts failed", error);
        return empty;
      }
      const total = count ?? 0;
      return {
        posts: (data as Omit<PostRow, "content_md">[]).map(toSummary),
        total,
        totalPages: Math.ceil(total / perPage),
        page,
      };
    } catch (err) {
      console.error("[blog] getPosts failed", err);
      return empty;
    }
  },
  ["blog-posts-page"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

/** 발행된 글 한 페이지. 카테고리 이름으로 거를 수 있습니다. */
export function getPosts({
  page = 1,
  perPage = POSTS_PER_PAGE,
  category,
}: { page?: number; perPage?: number; category?: string } = {}): Promise<PostPage> {
  return cachedPosts(page, perPage, category ? decodeURIComponent(category) : undefined);
}

const cachedPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    if (!isBlogConfigured()) return null;
    try {
      const { data, error } = await createAdminClient()
        .from("deskon_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .maybeSingle();
      if (error) {
        console.error("[blog] getPostBySlug failed", error);
        return null;
      }
      return data ? toPost(data as PostRow) : null;
    } catch (err) {
      console.error("[blog] getPostBySlug failed", err);
      return null;
    }
  },
  ["blog-post"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

/** 글 하나. 한글 슬러그도 그대로 넘기면 됩니다. */
export function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return cachedPostBySlug(decodeURIComponent(slug));
  } catch {
    return Promise.resolve(null);
  }
}

/** RSS 용. 최신 글을 limit 편까지. */
export const getAllPostSummaries = unstable_cache(
  async (limit = 50): Promise<PostSummary[]> => {
    if (!isBlogConfigured()) return [];
    try {
      const { data, error } = await publishedQuery().order("published_at", { ascending: false }).limit(limit);
      if (error) {
        console.error("[blog] getAllPostSummaries failed", error);
        return [];
      }
      return (data as Omit<PostRow, "content_md">[]).map(toSummary);
    } catch (err) {
      console.error("[blog] getAllPostSummaries failed", err);
      return [];
    }
  },
  ["blog-posts-all"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

/** RSS 용. 본문 HTML 까지 포함한 최신 글 limit 편. 네이버는 피드에 본문 전체를 싣기를 권합니다. */
export const getFeedPosts = unstable_cache(
  async (limit = 20): Promise<Post[]> => {
    if (!isBlogConfigured()) return [];
    try {
      const { data, error } = await createAdminClient()
        .from("deskon_posts")
        .select("*")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) {
        console.error("[blog] getFeedPosts failed", error);
        return [];
      }
      return (data as PostRow[]).map(toPost);
    } catch (err) {
      console.error("[blog] getFeedPosts failed", err);
      return [];
    }
  },
  ["blog-posts-feed"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

export interface PostIndexEntry {
  slug: string;
  modified: string;
}

/** 사이트맵용. 주소와 수정일만. */
export const getPostIndex = unstable_cache(
  async (limit = 5000): Promise<PostIndexEntry[]> => {
    if (!isBlogConfigured()) return [];
    try {
      const { data, error } = await createAdminClient()
        .from("deskon_posts")
        .select("slug,updated_at")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("updated_at", { ascending: false })
        .limit(limit);
      if (error) {
        console.error("[blog] getPostIndex failed", error);
        return [];
      }
      return (data as { slug: string; updated_at: string }[]).map((r) => ({ slug: r.slug, modified: r.updated_at }));
    } catch (err) {
      console.error("[blog] getPostIndex failed", err);
      return [];
    }
  },
  ["blog-post-index"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

/** 발행된 글이 한 편 이상 있는 카테고리. 글 수가 많은 순. */
export const getCategories = unstable_cache(
  async (): Promise<PostCategory[]> => {
    if (!isBlogConfigured()) return [];
    try {
      const { data, error } = await createAdminClient()
        .from("deskon_posts")
        .select("category")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString());
      if (error) {
        console.error("[blog] getCategories failed", error);
        return [];
      }
      const counts = new Map<string, number>();
      for (const row of data as { category: string }[]) {
        if (!row.category) continue;
        counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
      }
      return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"))
        .map(([name, count]) => ({ ...toCategory(name), count }));
    } catch (err) {
      console.error("[blog] getCategories failed", err);
      return [];
    }
  },
  ["blog-categories"],
  { tags: [BLOG_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
);

export async function getCategoryBySlug(slug: string): Promise<PostCategory | null> {
  const name = decodeURIComponent(slug);
  const all = await getCategories();
  return all.find((c) => c.name === name) ?? null;
}

/** 같은 카테고리의 다른 글. 모자라면 최신 글로 채웁니다. */
export async function getRelatedPosts(post: PostSummary, count = 3): Promise<PostSummary[]> {
  const category = post.categories[0]?.name;
  const { posts } = await getPosts({ page: 1, perPage: count + 1, category });
  const related = posts.filter((p) => p.id !== post.id).slice(0, count);
  if (related.length >= count || !category) return related;
  const latest = await getPosts({ page: 1, perPage: count + 1 });
  const seen = new Set([post.id, ...related.map((p) => p.id)]);
  for (const p of latest.posts) {
    if (related.length >= count) break;
    if (!seen.has(p.id)) related.push(p);
  }
  return related;
}

/* ── 표시 도우미 ─────────────────────────────────────────────────── */

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  });
}

/** 카테고리 링크. 이름을 그대로 URL 에 넣습니다. */
export function categoryHref(category: PostCategory): string {
  return `/blog?category=${encodeURIComponent(category.slug)}`;
}
