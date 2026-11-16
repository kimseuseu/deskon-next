"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { AdminPost } from "@/lib/post-input";
import type { StatRange, ViewStatsResponse } from "@/lib/post-stats";
import { PostViewsDetail, RangeTabs, ViewsOverview } from "@/components/admin/PostStats";
import { Badge, Button, Card, EmptyState, ErrorState, FilterTabs, PageHeader, ResponsiveList, SkeletonRows, formatDateTime, td, th } from "@/components/admin/ui";

type Filter = "all" | "published" | "draft";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  /* 조회 통계. 글 목록과 따로 불러오고, 실패하거나 아직 켜지지 않았어도 목록은 그대로 보입니다. */
  const [range, setRange] = useState<StatRange>(30);
  const [stats, setStats] = useState<ViewStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [openStatsId, setOpenStatsId] = useState<string | null>(null);

  const loadStats = useCallback(async (days: StatRange) => {
    setStatsLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/stats?days=${days}`, { cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { data?: ViewStatsResponse; error?: string };
      if (!res.ok || !json.data) {
        setStatsError(json.error ?? "조회 통계를 불러오지 못했습니다.");
        return;
      }
      setStatsError(null);
      setStats(json.data);
    } catch {
      setStatsError("조회 통계를 불러오지 못했습니다.");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats(range);
  }, [range, loadStats]);

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

  const ready = stats?.ready ? stats : null;
  /** 발행돼 사이트에 보이는 글만 조회수가 있습니다. 나머지는 줄표. */
  const isLive = (p: AdminPost) => p.status === "published" && !isScheduled(p);
  const viewsOf = (p: AdminPost, key: "total" | "period") =>
    ready && isLive(p) ? (ready.posts[p.id]?.[key] ?? 0).toLocaleString("ko-KR") : "-";
  const statsButton = (p: AdminPost) =>
    ready && isLive(p) ? (
      <Button size="sm" variant="ghost" aria-expanded={openStatsId === p.id} onClick={() => setOpenStatsId((id) => (id === p.id ? null : p.id))}>
        통계
      </Button>
    ) : null;

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

      {stats?.ready === false ? (
        <Card>
          <p className="text-[15px] font-bold text-tx">조회 통계가 아직 켜지지 않았습니다</p>
          <p className="mt-1 text-[13px] font-medium leading-[1.7] text-tx-3">
            저장소의 supabase-post-views.sql 을 Supabase SQL Editor 에서 한 번 실행하면, 그때부터 글별 조회수와 유입 경로가 여기에 쌓입니다.
          </p>
        </Card>
      ) : (
        <section aria-label="조회 통계" className="space-y-3">
          <RangeTabs value={range} onChange={setRange} disabled={statsLoading && !ready} />
          {statsError && <ErrorState message={statsError} onRetry={() => loadStats(range)} />}
          {ready ? (
            <ViewsOverview stats={ready} refreshing={statsLoading} />
          ) : (
            !statsError && (
              <Card>
                <div className="space-y-4" aria-busy aria-label="조회 통계를 불러오는 중">
                  <div className="skeleton h-4 w-28" />
                  <div className="skeleton h-8 w-56" />
                  <div className="skeleton h-[150px] w-full" />
                </div>
              </Card>
            )
          )}
        </section>
      )}

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
          <SkeletonRows rows={5} cols={5} />
        ) : (
          <ResponsiveList
            items={visible}
            keyOf={(p) => p.id}
            expanded={(p) => openStatsId === p.id && Boolean(ready)}
            detail={(p) => (ready ? <PostViewsDetail stats={ready} postId={p.id} title={p.title} /> : null)}
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
                <th className={`${th} text-right`}>조회</th>
                <th className={`${th} hidden text-right lg:table-cell`}>최근 {range}일</th>
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
                  <td className={`${td} text-right font-semibold tabular-nums text-tx`}>{viewsOf(p, "total")}</td>
                  <td className={`${td} hidden text-right tabular-nums text-tx-2 lg:table-cell`}>{viewsOf(p, "period")}</td>
                  <td className={`${td} hidden whitespace-nowrap tabular-nums text-tx-3 lg:table-cell`}>{formatDateTime(p.publishedAt)}</td>
                  <td className={`${td} hidden whitespace-nowrap tabular-nums text-tx-3 xl:table-cell`}>{formatDateTime(p.updatedAt)}</td>
                  <td className={`${td} text-right`}>
                    <div className="flex items-center justify-end gap-1">
                      {statsButton(p)}
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
                      {ready && isLive(p) && (
                        <span className="mt-1 block tabular-nums text-tx-2">
                          조회 {viewsOf(p, "total")} · 최근 {range}일 {viewsOf(p, "period")}
                        </span>
                      )}
                    </span>
                    <div className="flex gap-1">
                      {statsButton(p)}
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
