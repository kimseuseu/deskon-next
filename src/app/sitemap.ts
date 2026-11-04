import { MetadataRoute } from "next";

const BASE_URL = "https://www.aovo.kr";

/**
 * 사이트맵. 2026-11 토스풍 리디자인 기준의 실제 페이지 25개만 싣습니다.
 *   홈 1 · 사업분야 5 · 설비 랜딩 3(/gas, /gas/rental, /water) · 브랜드 6 · 그룹소개 5 · 고객지원 3 · 법적 고지 2
 * 구 서비스 상세/커머스 경로(/subscribe/chair, /products, /quote, /facility, /indrix …)는
 * 상위 페이지로 리다이렉트되므로 싣지 않습니다. 새 페이지를 만들면 여기에 한 줄 더합니다.
 */
const REDESIGNED_AT = "2026-11-04";

export default function sitemap(): MetadataRoute.Sitemap {
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

    // Support
    { url: "/support/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/support/notice", priority: 0.7, changeFrequency: "weekly" },
    { url: "/support/faq", priority: 0.7, changeFrequency: "monthly" },

    // Legal
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
