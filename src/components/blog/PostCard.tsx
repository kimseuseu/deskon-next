import Link from "next/link";
import PostImage from "@/components/blog/PostImage";
import { formatPostDate, type PostSummary } from "@/lib/blog";

/**
 * 글 카드 둘.
 *  - lead: 목록 맨 위 한 편. 회색 판 하나에 사진과 글을 나란히 놓습니다.
 *  - grid: 그 아래 두 열. 사진 위, 글 아래.
 * 사진이 없는 글은 파란 바탕에 제목만 큼직하게 둡니다.
 */

function Meta({ post, tone = "dark" }: { post: PostSummary; tone?: "dark" | "light" }) {
  const sub = tone === "dark" ? "text-tx-3" : "text-white/60";
  const cat = tone === "dark" ? "text-tb" : "text-white";
  return (
    <p className={`flex flex-wrap items-center gap-x-3 text-[13px] font-semibold ${sub}`}>
      {post.categories[0] && <span className={cat}>{post.categories[0].name}</span>}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
    </p>
  );
}

export function LeadPostCard({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group rounded-[28px] bg-tg transition-colors duration-200 hover:bg-tg-2/70">
      <Link href={href} className="grid overflow-hidden rounded-[28px] lg:grid-cols-[1.15fr_1fr]">
        <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[28px] bg-tg-2 lg:aspect-auto lg:min-h-[420px]">
          {post.image ? (
            <PostImage src={post.image.url} alt={post.image.alt || post.title} sizes="(min-width: 1024px) 640px, 100vw" priority />
          ) : (
            <div className="flex h-full items-end bg-tb p-8 text-white">
              <span className="font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.03em]">
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between gap-10 p-7 lg:p-10">
          <div>
            <Meta post={post} />
            <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.25] text-tx text-balance transition-colors duration-200 group-hover:text-tb">
              {post.title}
            </h2>
            <p className="mt-4 line-clamp-3 text-[16px] font-medium leading-[1.75] text-tx-2">{post.excerpt}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-tx">
            읽기
            <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function PostCard({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group h-full">
      <Link href={href} className="flex h-full flex-col">
        <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-[24px] bg-tg">
          {post.image ? (
            <PostImage src={post.image.url} alt={post.image.alt || post.title} sizes="(min-width: 1024px) 560px, 100vw" />
          ) : (
            <div className="flex h-full items-end bg-tb-soft p-6">
              <span className="font-paperlogy text-[22px] font-semibold leading-[1.25] tracking-[-0.03em] text-tb">
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col px-1 pt-5">
          <Meta post={post} />
          <h3 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-tx transition-colors duration-200 group-hover:text-tb lg:text-[22px]">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-[15px] font-medium leading-[1.7] text-tx-2">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

/** 상세 페이지 아래 "함께 읽기"의 작은 줄 카드. 사진 없이 제목과 날짜만. */
export function PostRow({ post }: { post: PostSummary }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-2 rounded-[20px] bg-tg p-5 transition-colors duration-200 hover:bg-tg-2/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <span className="text-[16px] font-semibold leading-snug text-tx transition-colors duration-200 group-hover:text-tb">
          {post.title}
        </span>
        <time dateTime={post.date} className="shrink-0 text-[13px] font-semibold text-tx-3">
          {formatPostDate(post.date)}
        </time>
      </Link>
    </li>
  );
}
