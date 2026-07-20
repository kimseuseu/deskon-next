import { MetadataRoute } from "next";

const BASE_URL = "https://www.aovo.kr";

// 그룹 포털 구조: 홈 + 5개 사업분야 소개 + 그룹소개 + 고객지원 + 법적 고지.
// 구 서비스 상세/커머스 경로는 상위 페이지로 리다이렉트되며 사이트맵에서 제외.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: { url: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    // Main
    { url: "", priority: 1.0, changeFrequency: "weekly" },

    // Divisions
    { url: "/subscribe", priority: 0.9, changeFrequency: "weekly" },
    { url: "/sharing", priority: 0.9, changeFrequency: "weekly" },
    { url: "/rental", priority: 0.9, changeFrequency: "weekly" },
    { url: "/recycle", priority: 0.9, changeFrequency: "weekly" },
    { url: "/buyback", priority: 0.9, changeFrequency: "weekly" },

    // Brands
    { url: "/iden", priority: 0.7, changeFrequency: "monthly" },
    { url: "/vetix", priority: 0.7, changeFrequency: "monthly" },
    { url: "/indrix", priority: 0.7, changeFrequency: "monthly" },
    { url: "/dkorea", priority: 0.7, changeFrequency: "monthly" },

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
