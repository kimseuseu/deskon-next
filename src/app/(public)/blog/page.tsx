import type { Metadata } from "next";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FeaturePost, PostListRow } from "@/components/blog/PostCard";
import CategoryTabs from "@/components/blog/CategoryTabs";
import Pagination from "@/components/blog/Pagination";
import {
  getCategories,
  getCategoryBySlug,
  getPosts,
  isBlogConfigured,
} from "@/lib/blog";

/**
 * 현장 노트 목록(/blog). 주소는 /blog 그대로 두고 이름만 «현장 노트»입니다(네이버에 제출된 주소).
 * 머리글은 왼쪽 정렬, 분류는 밑줄 탭, 글은 [메타 | 글 | 썸네일] 열 체계의 줄 목록입니다.
 */

const BASE = "https://www.aovo.kr";
const LEAD =
  "현장에서 배운 것을 씁니다. 급배수와 가스기기, 사무용 가구와 중고 자산을 견적 내고 설치하고 걷어 오며 알게 된 것들입니다.";

export const metadata: Metadata = {
  title: "현장 노트",
  description:
    "행사장 급배수와 가스기기 임대, 사무용 가구 구독과 렌탈, 중고 자산 매입까지. 아오보가 현장에서 배운 것을 씁니다.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${BASE}/feed.xml` },
  },
  openGraph: {
    title: "아오보 현장 노트",
    description: "행사장 급배수와 가스기기 임대, 사무용 가구 구독과 렌탈. 아오보가 현장에서 배운 것을 씁니다.",
    url: `${BASE}/blog`,
    type: "website",
  },
};

type Search = { page?: string; category?: string };

export default async function BlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { page: pageParam, category } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const [result, categories, activeCategory] = await Promise.all([
    getPosts({ page, category }),
    getCategories(),
    category ? getCategoryBySlug(category) : Promise.resolve(null),
  ]);

  const { posts, totalPages } = result;
  /* 첫 페이지의 첫 글만 크게. 분류를 고르거나 뒤 페이지로 가면 모두 줄 목록입니다. */
  const showLead = page === 1 && !category && posts.length > 0;
  const lead = showLead ? posts[0] : null;
  const rest = showLead ? posts.slice(1) : posts;

  return (
    <>
      <section className="bg-white pt-32 pb-10 lg:pt-40 lg:pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal direction="none" duration={0.6}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.08] tracking-[-0.035em] text-tx">
              {activeCategory ? activeCategory.name : "현장 노트"}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[56ch] text-[17px] font-medium leading-[1.7] text-tx-2">
              {activeCategory ? `${activeCategory.name} 분류의 글 ${activeCategory.count ?? posts.length}편` : LEAD}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:pb-36">
          <CategoryTabs categories={categories} active={category} />

          {posts.length === 0 ? (
            <EmptyState configured={isBlogConfigured()} filtered={!!category} />
          ) : (
            <div className="mt-10 lg:mt-14">
              {lead && <FeaturePost post={lead} />}
              {rest.length > 0 && (
                <Stagger className={lead ? "mt-14 lg:mt-20" : ""} gap={0.07}>
                  {rest.map((post) => (
                    <StaggerItem key={post.id} className="border-t border-tg-2 first:border-t-0">
                      <PostListRow post={post} />
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
              <div className="mt-14 lg:mt-20">
                <Pagination page={page} totalPages={totalPages} category={category} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState({ configured, filtered }: { configured: boolean; filtered: boolean }) {
  return (
    <div className="mt-10 rounded-[24px] bg-tg px-7 py-16 lg:px-10 lg:py-20">
      <p className="text-[17px] font-semibold text-tx">
        {filtered ? "이 분류에는 아직 글이 없습니다." : "아직 올라온 글이 없습니다."}
      </p>
      <p className="mt-2 max-w-[56ch] text-[15px] font-medium text-tx-3">
        {configured
          ? "관리자에서 첫 글을 발행하면 여기에 바로 실립니다."
          : "데이터베이스(Supabase) 연결 정보가 아직 설정되지 않았습니다."}
      </p>
      {filtered && (
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center rounded-full bg-tx px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-tk-2"
        >
          전체 글 보기
        </Link>
      )}
    </div>
  );
}
