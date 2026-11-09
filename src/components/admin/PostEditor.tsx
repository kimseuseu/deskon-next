"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { renderMarkdown, slugify, countChars } from "@/lib/markdown";
import { uploadImage } from "@/lib/cloudinary-upload";
import { DEFAULT_CATEGORY, SUGGESTED_CATEGORIES, type AdminPost, type PostInput } from "@/lib/post-input";
import { Badge, Button, Card, ErrorState, inputClass, labelClass } from "@/components/admin/ui";

/**
 * 글 편집기. 왼쪽에 마크다운, 오른쪽에 미리보기(실제 글 화면과 같은 .post-body 스타일).
 * 사진은 Cloudinary 로 바로 올라가고, 본문에 마크다운 한 줄로 꽂힙니다.
 */

type Form = Omit<PostInput, "publishedAt"> & { publishedAt: string };

/** ISO → datetime-local 입력값(서울 시각) */
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function initialForm(post?: AdminPost): Form {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    contentMd: post?.contentMd ?? "",
    category: post?.category ?? DEFAULT_CATEGORY,
    coverImageUrl: post?.coverImageUrl ?? null,
    coverImageAlt: post?.coverImageAlt ?? null,
    authorName: post?.authorName ?? "아오보",
    status: post?.status ?? "draft",
    publishedAt: toLocalInput(post?.publishedAt ?? null),
  };
}

export default function PostEditor({ post }: { post?: AdminPost }) {
  const router = useRouter();
  const [form, setForm] = useState<Form>(() => initialForm(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState<"cover" | "body" | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const bodyFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  /* 제목을 치는 동안 주소를 따라 만듭니다. 주소를 직접 고치면 멈춥니다. */
  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugTouched]);

  const previewHtml = useMemo(() => (tab === "preview" ? renderMarkdown(form.contentMd) : ""), [tab, form.contentMd]);
  const chars = useMemo(() => countChars(form.contentMd), [form.contentMd]);

  const insertAtCursor = (text: string) => {
    const el = bodyRef.current;
    if (!el) {
      set("contentMd", `${form.contentMd}\n${text}\n`);
      return;
    }
    const start = el.selectionStart ?? form.contentMd.length;
    const end = el.selectionEnd ?? start;
    const before = form.contentMd.slice(0, start);
    const after = form.contentMd.slice(end);
    const sep = before && !before.endsWith("\n") ? "\n\n" : "";
    const next = `${before}${sep}${text}\n\n${after}`;
    set("contentMd", next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = before.length + sep.length + text.length + 2;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleUpload = async (target: "cover" | "body", file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(target);
    try {
      const { url } = await uploadImage(file);
      if (target === "cover") {
        set("coverImageUrl", url);
      } else {
        const name = file.name.replace(/\.[^.]+$/, "");
        insertAtCursor(`![${name}](${url})`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "사진을 올리지 못했습니다.");
    } finally {
      setUploading(null);
    }
  };

  const save = async (status: "draft" | "published") => {
    setSaving(true);
    setError(null);
    const payload: PostInput = {
      ...form,
      status,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
    };
    try {
      const res = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { data?: AdminPost; error?: string };
      if (!res.ok || !json.data) {
        setError(json.error ?? "저장에 실패했습니다.");
        return;
      }
      setSavedAt(new Date().toLocaleTimeString("ko-KR"));
      setForm((f) => ({ ...f, status: json.data!.status, publishedAt: toLocalInput(json.data!.publishedAt), slug: json.data!.slug }));
      if (!post) router.replace(`/admin/posts/${json.data.id}`);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!post) return;
    if (!confirm("이 글을 삭제할까요? 되돌릴 수 없습니다.")) return;
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/posts");
    else setError("삭제에 실패했습니다.");
  };

  const published = form.status === "published";

  return (
    <div className="space-y-5">
      {/* 머리 */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin/posts" className="inline-flex items-center gap-1 text-[13px] font-semibold text-tx-3 transition-colors duration-150 hover:text-tx">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
            글 목록
          </Link>
          <div className="mt-1 flex items-center gap-2.5">
            <h1 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-tx sm:text-[24px]">{post ? "글 수정" : "새 글"}</h1>
            <Badge tone={published ? "green" : "gray"}>{published ? "발행됨" : "초안"}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedAt && <span className="mr-1 text-[12px] font-medium tabular-nums text-tx-3">{savedAt} 저장됨</span>}
          {post && published && (
            <Button variant="ghost" href={`/blog/${encodeURIComponent(form.slug)}`} external>
              사이트에서 보기
            </Button>
          )}
          <Button variant="ghost" onClick={() => save("draft")} disabled={saving}>
            {published ? "초안으로 내리기" : "초안 저장"}
          </Button>
          <Button onClick={() => save("published")} disabled={saving}>
            {saving ? "저장 중" : published ? "수정 반영" : "발행"}
          </Button>
        </div>
      </header>

      {error && <ErrorState message={error} />}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* 본문 */}
        <div className="space-y-4">
          <Card>
            <div className="space-y-4">
              <div>
                <label htmlFor="post-title" className={labelClass}>
                  제목 <span className="font-medium text-tx-3">(검색어가 그대로 들어가게)</span>
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="예) 행사장 급수 비용, 하루 5톤 기준으로 계산해 보면"
                  className={`${inputClass} text-[16px] font-semibold`}
                  maxLength={120}
                />
              </div>
              <div>
                <label htmlFor="post-slug" className={labelClass}>
                  주소 <span className="font-medium text-tx-3">www.aovo.kr/blog/</span>
                </label>
                <input
                  id="post-slug"
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  onBlur={() => set("slug", slugify(form.slug))}
                  placeholder="event-water-supply-cost"
                  className={`${inputClass} font-mono`}
                />
                <p className="mt-1.5 text-[12px] font-medium text-tx-3">영문-하이픈을 권합니다. 한글도 되지만 공유할 때 주소가 길어집니다.</p>
              </div>
            </div>
          </Card>

          <Card padded={false}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-tg px-4 py-2.5">
              <div className="flex gap-1 rounded-full bg-tg p-1" role="tablist" aria-label="본문 보기">
                {(["write", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${
                      tab === t ? "bg-white text-tx shadow-[0_1px_2px_rgba(25,31,40,0.06)]" : "text-tx-2 hover:text-tx"
                    }`}
                  >
                    {t === "write" ? "쓰기" : "미리보기"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[12px] font-medium tabular-nums ${chars < 1500 ? "text-amber-600" : "text-tx-3"}`}>
                  {chars.toLocaleString()}자{chars < 1500 ? " (1,500자 이상 권장)" : ""}
                </span>
                <input
                  ref={bodyFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    void handleUpload("body", e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
                <Button size="sm" variant="ghost" onClick={() => bodyFileRef.current?.click()} disabled={uploading === "body"}>
                  {uploading === "body" ? "올리는 중" : "사진 넣기"}
                </Button>
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                ref={bodyRef}
                value={form.contentMd}
                onChange={(e) => set("contentMd", e.target.value)}
                placeholder={"## 소제목\n\n본문을 마크다운으로 씁니다. 빈 줄로 문단을 나누고, 사진은 위의 [사진 넣기]로.\n\n- 목록\n- 목록\n\n> 인용\n\n유튜브 주소를 한 줄에 적으면 영상이 들어갑니다."}
                className="block min-h-[560px] w-full resize-y rounded-b-[20px] px-5 py-4 font-mono text-[14px] leading-[1.7] text-tx placeholder:text-tx-3 focus:outline-none"
                spellCheck={false}
              />
            ) : (
              <div className="min-h-[560px] px-6 py-6">
                {form.contentMd.trim() ? (
                  <div className="post-body mx-auto max-w-[720px]" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                ) : (
                  <p className="text-[14px] font-medium text-tx-3">본문이 비어 있습니다.</p>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* 옆 칸: 발행·분류·요약·대표 사진 */}
        <aside className="space-y-4">
          <Card>
            <div className="space-y-4">
              <div>
                <label htmlFor="post-published-at" className={labelClass}>
                  발행 시각 <span className="font-medium text-tx-3">(비우면 발행 누른 때)</span>
                </label>
                <input id="post-published-at" type="datetime-local" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={inputClass} />
                <p className="mt-1.5 text-[12px] font-medium text-tx-3">미래 시각을 넣고 발행하면 그때부터 보입니다.</p>
              </div>
              <div>
                <label htmlFor="post-category" className={labelClass}>
                  분류
                </label>
                <input id="post-category" type="text" list="post-category-options" value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass} />
                <datalist id="post-category-options">
                  {SUGGESTED_CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="post-author" className={labelClass}>
                  글쓴이
                </label>
                <input id="post-author" type="text" value={form.authorName} onChange={(e) => set("authorName", e.target.value)} className={inputClass} />
              </div>
            </div>
          </Card>

          <Card>
            <label htmlFor="post-excerpt" className={labelClass}>
              요약 <span className="font-medium text-tx-3">(검색 결과 설명문, 카드에 표시)</span>
            </label>
            <textarea
              id="post-excerpt"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={4}
              maxLength={300}
              placeholder="한두 문장. 검색어를 넣어 주세요."
              className={`${inputClass} resize-none`}
            />
            <p className={`mt-1.5 text-[12px] font-medium tabular-nums ${form.excerpt.length > 180 ? "text-amber-600" : "text-tx-3"}`}>{form.excerpt.length}/180자 권장</p>
          </Card>

          <Card>
            <span className={labelClass}>대표 사진</span>
            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-tg">
              {form.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- 관리자 미리보기, 임의 주소
                <img src={form.coverImageUrl} alt={form.coverImageAlt ?? ""} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center text-[12px] font-medium text-tx-3">목록 카드와 공유 썸네일에 쓰입니다</div>
              )}
            </div>
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                void handleUpload("cover", e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <div className="mt-3 flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={() => coverFileRef.current?.click()} disabled={uploading === "cover"}>
                {uploading === "cover" ? "올리는 중" : form.coverImageUrl ? "사진 바꾸기" : "사진 올리기"}
              </Button>
              {form.coverImageUrl && (
                <Button variant="danger" onClick={() => set("coverImageUrl", null)}>
                  지우기
                </Button>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <input type="url" value={form.coverImageUrl ?? ""} onChange={(e) => set("coverImageUrl", e.target.value || null)} placeholder="또는 https:// 사진 주소 붙여 넣기" className={inputClass} aria-label="대표 사진 주소" />
              <input type="text" value={form.coverImageAlt ?? ""} onChange={(e) => set("coverImageAlt", e.target.value || null)} placeholder="사진 설명(캡션·대체 텍스트)" className={inputClass} aria-label="대표 사진 설명" />
            </div>
          </Card>

          {post && (
            <Button variant="danger" className="w-full" onClick={remove}>
              글 삭제
            </Button>
          )}
        </aside>
      </div>
    </div>
  );
}
