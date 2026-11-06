import { marked, type Tokens } from "marked";

/**
 * 블로그 본문 마크다운 → HTML.
 * 서버(글 화면)와 브라우저(관리자 미리보기) 양쪽에서 같은 결과가 나오도록 순수 함수로만 씁니다.
 *
 * 지원: 제목(##, ###), 문단, 굵게·기울임, 링크, 이미지, 목록, 인용, 표, 코드, 가로줄, 유튜브 임베드.
 * 유튜브: 한 줄에 영상 주소만 적으면 플레이어로 바뀝니다.
 */

const YOUTUBE_RE =
  /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})(?:[?&][^\s]*)?$/;

marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    image({ href, title, text }: Tokens.Image) {
      const alt = escapeAttr(text ?? "");
      const caption = title ?? text;
      const img = `<img src="${escapeAttr(href)}" alt="${alt}" loading="lazy" />`;
      return caption ? `<figure>${img}<figcaption>${escapeHtml(caption)}</figcaption></figure>` : `<figure>${img}</figure>`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      /* 문단이 유튜브 주소 한 줄이면 임베드로 */
      if (tokens.length === 1) {
        const only = tokens[0];
        const raw = only.type === "link" ? (only as Tokens.Link).href : only.type === "text" ? (only as Tokens.Text).text : "";
        const m = raw.trim().match(YOUTUBE_RE);
        if (m) {
          return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n`;
        }
      }
      return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    },
    link({ href, title, tokens }: Tokens.Link) {
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !/aovo\.kr/.test(href);
      const t = title ? ` title="${escapeAttr(title)}"` : "";
      const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a href="${escapeAttr(href)}"${t}${rel}>${inner}</a>`;
    },
  },
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

/**
 * 본문 HTML 정리. 관리자가 쓴 글이지만 스크립트와 인라인 이벤트, javascript: 링크는 떼어 냅니다.
 * 유튜브 임베드(iframe)는 위 렌더러가 만든 것만 남습니다(youtube-nocookie.com).
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe\b(?![^>]*src="https:\/\/www\.youtube-nocookie\.com\/embed\/)[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, "")
    .trim();
}

export function renderMarkdown(md: string): string {
  const html = marked.parse(md ?? "", { async: false });
  return sanitizeHtml(html);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** 마크다운 본문의 글자 수(공백 제외). 읽기 시간 계산용. */
export function countChars(md: string): number {
  return stripHtml(renderMarkdown(md)).replace(/\s/g, "").length;
}

/** 한국어 글은 분당 500자 안팎으로 읽습니다. 최소 1분. */
export function readingMinutes(md: string): number {
  return Math.max(1, Math.round(countChars(md) / 500));
}

/**
 * 제목에서 글 주소를 만듭니다. 한글은 그대로 두고, 공백과 특수문자는 하이픈으로.
 * 영문 슬러그를 권하지만(짧은 주소), 한글도 동작합니다.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
