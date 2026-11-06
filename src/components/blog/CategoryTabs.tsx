import Link from "next/link";
import { categoryHref, type PostCategory } from "@/lib/blog";

/**
 * 목록 위의 분류 탭. 줄 전체 아래 얇은 선 하나, 고른 탭에만 파란 밑줄이 섭니다.
 * 좁은 화면에서는 가로로 넘겨 봅니다.
 */
export default function CategoryTabs({
  categories,
  active,
}: {
  categories: PostCategory[];
  active?: string;
}) {
  if (categories.length === 0) return null;
  const tab =
    "relative inline-flex items-center gap-1.5 whitespace-nowrap py-3 text-[15px] font-semibold transition-colors duration-200";
  const on = "text-tx";
  const off = "text-tx-2 hover:text-tx";
  const underline = <span aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-tb" />;

  return (
    <nav aria-label="글 분류" className="border-b border-tg-2">
      <ul className="-mb-px flex gap-7 overflow-x-auto">
        <li>
          <Link href="/blog" className={`${tab} ${active ? off : on}`} aria-current={active ? undefined : "page"}>
            전체
            {!active && underline}
          </Link>
        </li>
        {categories.map((c) => {
          const current = c.slug === active;
          return (
            <li key={c.slug}>
              <Link href={categoryHref(c)} className={`${tab} ${current ? on : off}`} aria-current={current ? "page" : undefined}>
                {c.name}
                {typeof c.count === "number" && (
                  <span className={`text-[12px] ${current ? "text-tx-3" : "text-tx-3/70"}`}>{c.count}</span>
                )}
                {current && underline}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
