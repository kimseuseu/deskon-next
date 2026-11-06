import Link from "next/link";
import { categoryHref, type PostCategory } from "@/lib/blog";

/** 목록 위의 분류 칩. 고른 것은 파랗게, 나머지는 흰 알약으로 섭니다. */
export default function CategoryChips({
  categories,
  active,
}: {
  categories: PostCategory[];
  active?: string;
}) {
  if (categories.length === 0) return null;
  const base =
    "inline-flex items-center rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-200";
  const on = "bg-tx text-white";
  const off = "bg-tg text-tx-2 hover:bg-tg-2 hover:text-tx";
  return (
    <nav aria-label="글 분류" className="flex flex-wrap gap-2">
      <Link href="/blog" className={`${base} ${active ? off : on}`} aria-current={active ? undefined : "page"}>
        전체
      </Link>
      {categories.map((c) => {
        const current = c.slug === active;
        return (
          <Link
            key={c.slug}
            href={categoryHref(c)}
            className={`${base} ${current ? on : off}`}
            aria-current={current ? "page" : undefined}
          >
            {c.name}
            {typeof c.count === "number" && (
              <span className={`ml-1.5 text-[12px] ${current ? "text-white/60" : "text-tx-3"}`}>{c.count}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
