"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminPost } from "@/lib/post-input";

type Filter = "all" | "published" | "draft";

function formatDate(iso: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const json = (await res.json().catch(() => ({}))) as { data?: AdminPost[]; error?: string };
      if (!res.ok) {
        setError(json.error ?? "글 목록을 불러오지 못했습니다.");
        return;
      }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">블로그 글</h1>
          <p className="text-muted text-sm mt-1">www.aovo.kr/blog 에 실리는 글을 씁니다.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          새 글
        </Link>
      </div>

      <div className="flex gap-1">
        {(
          [
            ["all", "전체"],
            ["published", "발행"],
            ["draft", "초안"],
          ] as [Filter, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === key ? "bg-primary text-white" : "text-gray-600 bg-white hover:bg-gray-100"
            }`}
          >
            {label} <span className={filter === key ? "text-white/60" : "text-muted"}>{counts[key]}</span>
          </button>
        ))}
      </div>

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error} {error.includes("목록") && "supabase-posts.sql 이 운영 DB에 실행됐는지 확인해 주세요."}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-16 text-center">
          <p className="text-sm font-medium text-primary">{filter === "all" ? "아직 글이 없습니다." : "해당하는 글이 없습니다."}</p>
          {filter === "all" && (
            <Link href="/admin/posts/new" className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
              첫 글 쓰기
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
              <tr>
                <th className="px-5 py-3">제목</th>
                <th className="px-3 py-3 w-36">분류</th>
                <th className="px-3 py-3 w-24">상태</th>
                <th className="px-3 py-3 w-40">발행</th>
                <th className="px-3 py-3 w-40">수정</th>
                <th className="px-3 py-3 w-28" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.map((p) => {
                const scheduled = p.status === "published" && p.publishedAt && new Date(p.publishedAt).getTime() > now;
                return (
                  <tr key={p.id} className="hover:bg-gray-50/60">
                    <td className="px-5 py-3">
                      <Link href={`/admin/posts/${p.id}`} className="font-medium text-primary hover:text-accent transition-colors">
                        {p.title || "(제목 없음)"}
                      </Link>
                      <div className="mt-0.5 text-xs text-muted font-mono">/blog/{p.slug}</div>
                    </td>
                    <td className="px-3 py-3 text-gray-700">{p.category}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                          scheduled
                            ? "bg-amber-100 text-amber-700"
                            : p.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {scheduled ? "예약" : p.status === "published" ? "발행" : "초안"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-600 tabular-nums">{formatDate(p.publishedAt)}</td>
                    <td className="px-3 py-3 text-gray-600 tabular-nums">{formatDate(p.updatedAt)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {p.status === "published" && !scheduled && (
                          <a
                            href={`/blog/${encodeURIComponent(p.slug)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            보기
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => remove(p)}
                          className="px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
