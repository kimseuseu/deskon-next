import type { Metadata } from "next";
import Link from "next/link";
import PostImage from "@/components/blog/PostImage";
import { notFound } from "next/navigation";
import { PostRow } from "@/components/blog/PostCard";
import { COMPANY } from "@/lib/constants";
import { categoryHref, formatPostDate, getPostBySlug, getRelatedPosts } from "@/lib/blog";

const BASE = "https://www.aovo.kr";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "글을 찾을 수 없습니다", robots: { index: false } };

  const url = `${BASE}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      section: post.categories[0]?.name,
      images: post.image
        ? [{ url: post.image.url, alt: post.image.alt || post.title }]
        : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);
  const url = `${BASE}/blog/${post.slug}`;
  const category = post.categories[0];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.modified,
    inLanguage: "ko-KR",
    ...(post.image ? { image: [post.image.url] } : {}),
    ...(category ? { articleSection: category.name } : {}),
    author: { "@type": "Organization", name: "아오보", url: `${BASE}/` },
    publisher: {
      "@type": "Organization",
      name: "아오보",
      logo: { "@type": "ImageObject", url: `${BASE}/images/aovo_symbol.png` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "현장 노트", item: `${BASE}/blog` },
      ...(category
        ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${BASE}${categoryHref(category)}` }]
        : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="bg-white text-tx">
        {/* 머리. 읽기 폭(720px)에 맞춰 가운데에 섭니다. */}
        <header className="mx-auto max-w-[720px] px-6 pt-32 lg:pt-40">
          <nav aria-label="현재 위치" className="flex flex-wrap items-center gap-x-2 text-[14px] font-semibold text-tx-3">
            <Link href="/blog" className="transition-colors duration-200 hover:text-tx">
              현장 노트
            </Link>
            {category && (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={categoryHref(category)}
                  className="text-tb transition-colors duration-200 hover:text-tb-deep"
                >
                  {category.name}
                </Link>
              </>
            )}
          </nav>
          <h1 className="mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.2] text-tx text-balance">{post.title}</h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 text-[14px] font-semibold text-tx-3">
            <span className="text-tx-2">{post.author}</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>{post.readingMinutes}분 읽기</span>
          </p>
        </header>

        {/* 대표 사진은 본문보다 넓게. 글은 좁고 사진은 넓어야 눈이 쉽니다. */}
        {post.image && (
          <figure className="mx-auto mt-10 max-w-[1000px] px-6 lg:mt-14">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-tg lg:rounded-[28px]">
              <PostImage
                src={post.image.url}
                alt={post.image.alt || post.title}
                priority
                sizes="(min-width: 1024px) 952px, 100vw"
              />
            </div>
            {post.image.alt && (
              <figcaption className="mt-3 text-center text-[13px] font-medium text-tx-3">{post.image.alt}</figcaption>
            )}
          </figure>
        )}

        <div
          className="post-body mx-auto max-w-[720px] px-6 pt-12 lg:pt-16"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* 글 끝. 상담으로 가는 길 하나와 함께 읽을 글 몇 편. */}
        <footer className="mx-auto max-w-[720px] px-6 pb-24 lg:pb-36">
          <div className="mt-16 rounded-[24px] bg-tk p-7 text-white lg:p-9">
            <p className="text-[20px] font-semibold leading-snug tracking-[-0.02em] lg:text-[22px]">
              현장 조건을 알려주시면 견적을 바로 잡아 드립니다.
            </p>
            <p className="mt-2 text-[15px] font-medium text-white/65">
              평일 09:00 - 18:00, 전화와 카카오 채널 모두 받습니다.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[15px] font-bold text-tx transition-colors duration-200 hover:bg-white/90"
              >
                {COMPANY.phone}
              </a>
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center rounded-full bg-white/12 px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/20"
              >
                문의 남기기
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-[22px] font-semibold tracking-[-0.02em] text-tx">
                함께 읽기
              </h2>
              <ul className="mt-5 space-y-2.5">
                {related.map((p) => (
                  <PostRow key={p.id} post={p} />
                ))}
              </ul>
            </section>
          )}

          <p className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-tx-2 transition-colors duration-200 hover:text-tx"
            >
              <span aria-hidden>←</span> 현장 노트 목록
            </Link>
          </p>
        </footer>
      </article>
    </>
  );
}
