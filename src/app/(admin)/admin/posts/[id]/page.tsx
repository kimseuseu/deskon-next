"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import type { AdminPost } from "@/lib/post-input";
import { Button, ErrorState } from "@/components/admin/ui";

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
        <ErrorState message={error} />
        <Button variant="ghost" href="/admin/posts">
          글 목록으로
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-4" aria-busy aria-label="불러오는 중">
        <div className="skeleton h-7 w-40" />
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="skeleton h-28 rounded-[20px]" />
            <div className="skeleton h-[480px] rounded-[20px]" />
          </div>
          <div className="skeleton h-64 rounded-[20px]" />
        </div>
      </div>
    );
  }

  return <PostEditor post={post} />;
}
