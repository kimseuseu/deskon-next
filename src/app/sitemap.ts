import { MetadataRoute } from "next";
import { getPostIndex } from "@/lib/blog";

const BASE_URL = "https://www.aovo.kr";

/**
 * 사이트맵. 2026-11 토스풍 리디자인 기준의 실제 페이지 25개만 싣습니다.
 *   홈 1 · 사업분야 5 · 설비 랜딩 3(/gas, /gas/rental, /water) · 브랜드 6 · 그룹소개 5 · 고객지원 3 · 법적 고지 2
 * 구 서비스 상세/커머스 경로(/subscribe/chair, /products, /quote, /facility, /indrix …)는
 * 상위 페이지로 리다이렉트되므로 싣지 않습니다. 새 페이지를 만들면 여기에 한 줄 더합니다.
 * 블로그 글(Supabase deskon_posts)은 끝에 붙입니다(글마다 마지막 수정일 그대로).
 *
 * 빌드 때 한 번 굳히면 새 글이 사이트맵에 안 실리므로 요청마다 만듭니다.
 * 글 목록 자체는 blog-posts 태그로 5분 캐시되고 관리자가 저장하면 즉시 갱신됩니다.
 */
export const dynamic = "force-dynamic";

const REDESIGNED_AT = "2026-11-04";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* 리디자인으로 전 페이지가 바뀌었으므로 마지막 수정일을 그 날짜로 둡니다. */
  const now = new Date(REDESIGNED_AT).toISOString();

  const pages: { url: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    // Main
    { url: "", priority: 1.0, changeFrequency: "weekly" },

    // Divisions
    { url: "/subscribe", priority: 0.9, changeFrequency: "weekly" },
    { url: "/sharing", priority: 0.9, changeFrequency: "weekly" },
    { url: "/rental", priority: 0.9, changeFrequency: "weekly" },
    { url: "/recycle", priority: 0.9, changeFrequency: "weekly" },
    { url: "/buyback", priority: 0.9, changeFrequency: "weekly" },

    // 설비 랜딩 (헤더 강조 메뉴 둘 + 임대 카탈로그)
    { url: "/water", priority: 0.9, changeFrequency: "monthly" },
    { url: "/gas", priority: 0.9, changeFrequency: "monthly" },
    { url: "/gas/rental", priority: 0.8, changeFrequency: "weekly" },

    // Brands
    { url: "/iden", priority: 0.7, changeFrequency: "monthly" },
    { url: "/dkorea", priority: 0.7, changeFrequency: "monthly" },
    { url: "/dcall", priority: 0.7, changeFrequency: "monthly" },
    { url: "/coverix", priority: 0.7, changeFrequency: "monthly" },
    { url: "/topworks", priority: 0.7, changeFrequency: "monthly" },
    { url: "/gratop", priority: 0.7, changeFrequency: "monthly" },

    // About
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about/history", priority: 0.6, changeFrequency: "monthly" },
    { url: "/about/ci", priority: 0.5, changeFrequency: "yearly" },
    { url: "/about/location", priority: 0.6, changeFrequency: "monthly" },
    { url: "/about/partners", priority: 0.7, changeFrequency: "monthly" },

    // Blog
    { url: "/blog", priority: 0.8, changeFrequency: "daily" },

    // Support
    { url: "/support/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/support/notice", priority: 0.7, changeFrequency: "weekly" },
    { url: "/support/faq", priority: 0.7, changeFrequency: "monthly" },

    // Legal
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const posts = await getPostIndex();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.modified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
