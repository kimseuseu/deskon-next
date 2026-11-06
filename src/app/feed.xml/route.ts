import { getFeedPosts } from "@/lib/blog";

/**
 * RSS 2.0 피드. 네이버 서치어드바이저 → 요청 → RSS 제출에 이 주소를 넣습니다.
 *
 * 네이버 기준에 맞춘 것:
 * - 글마다 본문 전체를 content:encoded 에 싣습니다(이미지 링크 포함).
 * - 본문 안의 상대 주소(/images/..)는 모두 https://www.aovo.kr 절대 주소로 바꿉니다. 피드의 모든 URL 은 소유확인한 도메인이어야 합니다.
 * - 최신 20편만 실어 본문 크기 제한에 걸리지 않게 합니다.
 *
 * 발행된 글이 하나도 없으면 item 이 비어 네이버가 "형식이 올바르지 않습니다" 로 거절합니다. 첫 글을 발행한 뒤 제출하세요.
 * 글 데이터는 5분 캐시(태그 blog-posts)이고, 관리자가 글을 저장하면 즉시 새로 만들어집니다.
 */

const BASE = "https://www.aovo.kr";
const TITLE = "아오보 블로그";
const DESCRIPTION =
  "행사장 급배수와 가스기기 임대, 사무용 가구 구독과 렌탈, 중고 자산 매입. 아오보가 현장에서 배운 것을 씁니다.";

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** CDATA 안에 "]]>" 가 오면 섹션이 끝나므로 쪼개서 넣습니다. */
const cdata = (s: string) => `<![CDATA[${s.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;

/** src="/images/a.jpg", href="/blog/x" 같은 상대 주소를 절대 주소로. */
const absolutize = (html: string) => html.replace(/\b(src|href)="\/(?!\/)/g, `$1="${BASE}/`);

export async function GET() {
  const posts = await getFeedPosts(20);
  const lastBuild = posts[0] ? new Date(posts[0].modified) : new Date();

  const items = posts
    .map((p) => {
      const url = `${BASE}/blog/${encodeURIComponent(p.slug)}`;
      const categories = p.categories.map((c) => `<category>${escapeXml(c.name)}</category>`).join("");
      const ext = p.image?.url.split("?")[0].split(".").pop()?.toLowerCase();
      const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : null;
      const enclosure = p.image && mime ? `<enclosure url="${escapeXml(p.image.url)}" type="${mime}" length="0" />` : "";
      const cover = p.image ? `<figure><img src="${escapeXml(p.image.url)}" alt="${escapeXml(p.image.alt)}" /></figure>\n` : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(p.author)}</dc:creator>
      <description>${escapeXml(p.excerpt)}</description>
      <content:encoded>${cdata(cover + absolutize(p.contentHtml))}</content:encoded>
      ${categories}${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
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
