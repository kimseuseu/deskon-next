import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { LeadPostCard, PostCard } from "@/components/blog/PostCard";
import CategoryChips from "@/components/blog/CategoryChips";
import Pagination from "@/components/blog/Pagination";
import {
  getCategories,
  getCategoryBySlug,
  getPosts,
  isBlogConfigured,
} from "@/lib/blog";

const BASE = "https://www.aovo.kr";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "행사장 급배수와 가스기기 임대, 사무용 가구 구독과 렌탈, 중고 자산 매입까지. 아오보가 현장에서 배운 것을 씁니다.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${BASE}/feed.xml` },
  },
  openGraph: {
    title: "아오보 블로그",
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
  /* 첫 페이지의 첫 글만 크게. 분류를 고르거나 뒤 페이지로 가면 모두 같은 크기입니다. */
  const showLead = page === 1 && !category && posts.length > 0;
  const lead = showLead ? posts[0] : null;
  const rest = showLead ? posts.slice(1) : posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={activeCategory ? activeCategory.name : "현장에서 배운 것을 씁니다"}
        description={
          activeCategory
            ? `${activeCategory.name} 분류의 글 ${activeCategory.count ?? posts.length}편`
            : "급배수와 가스기기, 사무용 가구와 중고 자산.\n견적을 내고 설치하고 걷어 오며 알게 된 것들."
        }
      />

      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 lg:pb-36">
          <CategoryChips categories={categories} active={category} />

          {posts.length === 0 ? (
            <EmptyState configured={isBlogConfigured()} filtered={!!category} />
          ) : (
            <div className="mt-10 space-y-10 lg:mt-12 lg:space-y-14">
              {lead && <LeadPostCard post={lead} />}
              {rest.length > 0 && (
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
              <Pagination page={page} totalPages={totalPages} category={category} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState({ configured, filtered }: { configured: boolean; filtered: boolean }) {
  return (
    <div className="mt-10 rounded-[24px] bg-tg px-6 py-20 text-center">
      <p className="text-[17px] font-semibold text-tx">
        {filtered ? "이 분류에는 아직 글이 없습니다." : "아직 올라온 글이 없습니다."}
      </p>
      <p className="mt-2 text-[15px] font-medium text-tx-3">
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
