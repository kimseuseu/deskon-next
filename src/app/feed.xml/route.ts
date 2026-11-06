import { getAllPostSummaries } from "@/lib/blog";

/**
 * RSS 2.0 피드. 네이버 서치어드바이저 → 요청 → RSS 제출에 이 주소를 넣습니다.
 * 글 데이터는 5분 캐시(태그 blog-posts)이고, 관리자가 글을 저장하면 즉시 새로 만들어집니다.
 */

const BASE = "https://www.aovo.kr";
const TITLE = "아오보 블로그";
const DESCRIPTION =
  "행사장 급배수와 가스기기 임대, 사무용 가구 구독과 렌탈, 중고 자산 매입. 아오보가 현장에서 배운 것을 씁니다.";

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const posts = await getAllPostSummaries(50);
  const lastBuild = posts[0] ? new Date(posts[0].modified) : new Date();

  const items = posts
    .map((p) => {
      const url = `${BASE}/blog/${encodeURIComponent(p.slug)}`;
      const categories = p.categories.map((c) => `<category>${escapeXml(c.name)}</category>`).join("");
      const ext = p.image?.url.split("?")[0].split(".").pop()?.toLowerCase();
      const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : null;
      const enclosure = p.image && mime ? `<enclosure url="${escapeXml(p.image.url)}" type="${mime}" length="0" />` : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      ${categories}${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${BASE}/blog</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE}/images/aovo_symbol.png</url>
      <title>${escapeXml(TITLE)}</title>
      <link>${BASE}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
