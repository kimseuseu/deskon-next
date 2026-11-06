import Link from "next/link";

/** 이전 · 다음 두 단추와 "3 / 12" 자리 표시. 페이지가 하나면 아무것도 그리지 않습니다. */
export default function Pagination({
  page,
  totalPages,
  category,
}: {
  page: number;
  totalPages: number;
  category?: string;
}) {
  if (totalPages <= 1) return null;
  const href = (p: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const q = params.toString();
    return q ? `/blog?${q}` : "/blog";
  };
  const btn =
    "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors duration-200";
  const on = "bg-tg text-tx hover:bg-tg-2";
  const off = "pointer-events-none bg-tg/60 text-tx-3";

  return (
    <nav aria-label="페이지" className="flex items-center justify-between gap-4">
      <Link href={href(page - 1)} aria-disabled={page <= 1} className={`${btn} ${page > 1 ? on : off}`}>
        <span aria-hidden>←</span> 이전
      </Link>
      <p className="text-[14px] font-semibold text-tx-3">
        <span className="text-tx">{page}</span> / {totalPages}
      </p>
      <Link href={href(page + 1)} aria-disabled={page >= totalPages} className={`${btn} ${page < totalPages ? on : off}`}>
        다음 <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
