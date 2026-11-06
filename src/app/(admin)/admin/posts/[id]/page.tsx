"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PostEditor from "@/components/admin/PostEditor";
import type { AdminPost } from "@/lib/post-input";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<AdminPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`, { cache: "no-store" });
        const json = (await res.json().catch(() => ({}))) as { data?: AdminPost; error?: string };
        if (cancelled) return;
        if (!res.ok || !json.data) setError(json.error ?? "글을 불러오지 못했습니다.");
        else setPost(json.data);
      } catch {
        if (!cancelled) setError("서버에 연결할 수 없습니다.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="space-y-4">
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
        <Link href="/admin/posts" className="text-sm text-accent hover:underline">
          ← 글 목록
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return <PostEditor post={post} />;
}
