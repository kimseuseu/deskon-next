import Link from "next/link";
import PostImage from "@/components/blog/PostImage";
import { formatPostDate, type PostSummary } from "@/lib/blog";

/**
 * 현장 노트 목록의 글 묶음. 세 가지 모두 같은 열 체계를 씁니다.
 *   [ 메타 140px | 글 | (썸네일) ]
 *  - FeaturePost: 1페이지 맨 위 한 편. 컨테이너 폭 사진 아래에 메타 · 제목 · 요약이 세 열로 섭니다.
 *  - PostListRow: 그 아래 글들. 메타 · 제목과 요약 · 썸네일이 한 줄.
 *  - PostRow: 상세 페이지 "함께 읽기"의 작은 줄.
 * 사진이 없는 글은 파란 바탕에 제목만 둡니다.
 */

const META_COL = "lg:grid-cols-[140px_minmax(0,1fr)]";

function Meta({ post }: { post: PostSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-tx-3 lg:flex-col lg:items-start lg:gap-y-1.5">
      {post.categories[0] && <span className="text-tb">{post.categories[0].name}</span>}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
    </p>
  );
}

export function FeaturePost({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] bg-tg sm:aspect-[16/9] lg:aspect-[2/1]">
          {post.image ? (
            <PostImage src={post.image.url} alt={post.image.alt || post.title} sizes="(min-width: 1280px) 1200px, 100vw" priority />
          ) : (
            <div className="flex h-full items-end bg-tb p-8 text-white">
              <span className="font-paperlogy text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.03em]">
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className={`mt-6 grid gap-5 lg:mt-8 ${META_COL} lg:gap-x-10`}>
          <Meta post={post} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-x-12">
            <h2 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.2] text-tx text-balance transition-colors duration-200 group-hover:text-tb">
              {post.title}
            </h2>
            <div className="flex flex-col gap-5">
              <p className="line-clamp-3 text-[16px] font-medium leading-[1.75] text-tx-2">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-tx">
                읽기
                <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PostListRow({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group py-8 lg:py-10">
      <Link href={href} className={`grid gap-4 ${META_COL} lg:gap-x-10`}>
        <Meta post={post} />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-x-12">
          <div>
            <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-tx transition-colors duration-200 group-hover:text-tb lg:text-[22px]">
              {post.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 text-[15px] font-medium leading-[1.7] text-tx-2">{post.excerpt}</p>
          </div>
          {/* 사진이 없는 글은 썸네일 자리를 비워 둡니다(제목을 되풀이하지 않습니다). */}
          {post.image && (
            <div className="img-zoom relative -order-1 aspect-[4/3] overflow-hidden rounded-[20px] bg-tg lg:order-none">
              <PostImage src={post.image.url} alt={post.image.alt || post.title} sizes="(min-width: 1024px) 220px, 100vw" />
            </div>
          )}
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
