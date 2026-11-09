"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminPost } from "@/lib/post-input";
import { Badge, Button, Card, EmptyState, ErrorState, FilterTabs, PageHeader, ResponsiveList, SkeletonRows, formatDateTime, td, th } from "@/components/admin/ui";

type Filter = "all" | "published" | "draft";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { data?: AdminPost[]; error?: string };
      if (!res.ok) {
        setError(json.error ?? "글 목록을 불러오지 못했습니다.");
        return;
      }
      setError(null);
      setPosts(json.data ?? []);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const remove = async (post: AdminPost) => {
    if (!confirm(`"${post.title}" 글을 삭제할까요? 되돌릴 수 없습니다.`)) return;
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== post.id));
    else alert("삭제에 실패했습니다.");
  };

  const now = Date.now();
  const visible = posts.filter((p) => (filter === "all" ? true : p.status === filter));
  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };
  const isScheduled = (p: AdminPost) => p.status === "published" && Boolean(p.publishedAt) && new Date(p.publishedAt as string).getTime() > now;
  const statusOf = (p: AdminPost) =>
    isScheduled(p) ? { label: "예약", tone: "amber" as const } : p.status === "published" ? { label: "발행", tone: "green" as const } : { label: "초안", tone: "gray" as const };

  return (
    <div className="space-y-5">
      <PageHeader
        title="현장 노트 글"
        description="www.aovo.kr/blog 에 실리는 글을 씁니다."
        actions={
          <Button href="/admin/posts/new">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
            새 글
          </Button>
        }
        stats={
          loading
            ? undefined
            : [
                { label: "전체", value: counts.all },
                { label: "발행", value: counts.published },
                { label: "초안", value: counts.draft, tone: counts.draft > 0 ? "accent" : "default" },
              ]
        }
      />

      <FilterTabs
        tabs={[
          { key: "all" as Filter, label: "전체", count: loading ? undefined : counts.all },
          { key: "published" as Filter, label: "발행", count: loading ? undefined : counts.published },
          { key: "draft" as Filter, label: "초안", count: loading ? undefined : counts.draft },
        ]}
        active={filter}
        onChange={setFilter}
      />

      {error && (
        <ErrorState
          message={`${error}${error.includes("목록") ? " supabase-posts.sql 이 운영 DB에 실행됐는지 확인해 주세요." : ""}`}
          onRetry={load}
        />
      )}

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <SkeletonRows rows={5} cols={4} />
        ) : (
          <ResponsiveList
            items={visible}
            keyOf={(p) => p.id}
            empty={
              <EmptyState
                title={filter === "all" ? "아직 글이 없습니다" : "해당하는 글이 없습니다"}
                description={filter === "all" ? "첫 글을 쓰면 현장 노트 목록에 바로 섭니다." : undefined}
                action={filter === "all" ? <Button href="/admin/posts/new">첫 글 쓰기</Button> : undefined}
              />
            }
            head={
              <>
                <th className={th}>제목</th>
                <th className={th}>분류</th>
                <th className={th}>상태</th>
                <th className={`${th} hidden lg:table-cell`}>발행</th>
                <th className={`${th} hidden xl:table-cell`}>수정</th>
                <th className={th} />
              </>
            }
            row={(p) => {
              const s = statusOf(p);
              return (
                <>
                  <td className={`${td} max-w-[26rem]`}>
                    <Link href={`/admin/posts/${p.id}`} className="block truncate font-semibold text-tx transition-colors duration-150 hover:text-tb">
                      {p.title || "(제목 없음)"}
                    </Link>
                    <p className="mt-0.5 truncate font-mono text-[11px] font-medium text-tx-3">/blog/{p.slug}</p>
                  </td>
                  <td className={`${td} text-tx-2`}>{p.category}</td>
                  <td className={td}>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </td>
                  <td className={`${td} hidden whitespace-nowrap tabular-nums text-tx-3 lg:table-cell`}>{formatDateTime(p.publishedAt)}</td>
                  <td className={`${td} hidden whitespace-nowrap tabular-nums text-tx-3 xl:table-cell`}>{formatDateTime(p.updatedAt)}</td>
                  <td className={`${td} text-right`}>
                    <div className="flex items-center justify-end gap-1">
                      {p.status === "published" && !isScheduled(p) && (
                        <Button size="sm" variant="ghost" href={`/blog/${encodeURIComponent(p.slug)}`} external>
                          보기
                        </Button>
                      )}
                      <Button size="sm" variant="danger" onClick={() => remove(p)}>
                        삭제
                      </Button>
                    </div>
                  </td>
                </>
              );
            }}
            card={(p) => {
              const s = statusOf(p);
              return (
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/admin/posts/${p.id}`} className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[15px] font-semibold text-tx">{p.title || "(제목 없음)"}</p>
                      <p className="mt-0.5 truncate font-mono text-[11px] font-medium text-tx-3">/blog/{p.slug}</p>
                    </Link>
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-tx-3">
                    <span>
                      {p.category} · {formatDateTime(p.publishedAt)}
                    </span>
                    <div className="flex gap-1">
                      {p.status === "published" && !isScheduled(p) && (
                        <Button size="sm" variant="ghost" href={`/blog/${encodeURIComponent(p.slug)}`} external>
                          보기
                        </Button>
                      )}
                      <Button size="sm" variant="danger" onClick={() => remove(p)}>
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        )}
      </Card>
    </div>
  );
}
