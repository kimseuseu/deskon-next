"use client";

import { useEffect, useState } from "react";
import type { Banner } from "@/types";
import { Badge, Button, Card, CardTitle, EmptyState, ErrorState, PageHeader, Toggle, inputClass, labelClass } from "@/components/admin/ui";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    titleEn: "",
    tag: "",
    description: "",
    descriptionEn: "",
    linkUrl: "",
    badge: "",
    isActive: true,
    sortOrder: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/banners?includeInactive=true");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "배너 목록을 불러오지 못했습니다.");
        return;
      }
      const list = Array.isArray(data) ? data : data.data || [];
      setBanners(list);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBanners();
  }, []);

  const resetForm = () => {
    setFormData({
      imageUrl: "",
      title: "",
      titleEn: "",
      tag: "",
      description: "",
      descriptionEn: "",
      linkUrl: "",
      badge: "",
      isActive: true,
      sortOrder: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openEditForm = (banner: Banner) => {
    setFormData({
      imageUrl: banner.imageUrl || "",
      title: banner.title || "",
      titleEn: banner.titleEn || "",
      tag: banner.tag || "",
      description: banner.description || "",
      descriptionEn: banner.descriptionEn || "",
      linkUrl: banner.linkUrl || "",
      badge: banner.badge || "",
      isActive: banner.isActive,
      sortOrder: banner.sortOrder,
    });
    setEditingId(banner.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };

      let res: Response;
      if (editingId) {
        res = await fetch(`/api/banners/${editingId}`, { method: "PUT", headers, body: JSON.stringify(formData) });
      } else {
        res = await fetch("/api/banners", { method: "POST", headers, body: JSON.stringify(formData) });
      }

      if (res.ok) {
        resetForm();
        void fetchBanners();
      } else {
        alert(editingId ? "배너 수정에 실패했습니다." : "배너 추가에 실패했습니다.");
      }
    } catch {
      alert("서버에 연결할 수 없습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string) => {
    const banner = banners.find((b) => b.id === id);
    if (!banner) return;

    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });

      if (res.ok) {
        setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)));
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 배너를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });

      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const activeCount = banners.filter((b) => b.isActive).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="배너 관리"
        description="메인 페이지 배너를 관리합니다."
        actions={
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
            배너 추가
          </Button>
        }
        stats={
          loading
            ? undefined
            : [
                { label: "전체", value: banners.length },
                { label: "활성", value: activeCount, tone: "accent" },
                { label: "비활성", value: banners.length - activeCount },
              ]
        }
      />

      {error && <ErrorState message={error} onRetry={fetchBanners} />}

      {showForm && (
        <Card>
          <CardTitle>{editingId ? "배너 수정" : "새 배너 추가"}</CardTitle>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-title" className={labelClass}>
                  제목 (한글)
                </label>
                <input id="b-title" type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} placeholder="배너 제목" className={inputClass} />
              </div>
              <div>
                <label htmlFor="b-titleEn" className={labelClass}>
                  제목 (영문)
                </label>
                <input id="b-titleEn" type="text" value={formData.titleEn} onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))} placeholder="Banner Title" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="b-desc" className={labelClass}>
                설명
              </label>
              <input id="b-desc" type="text" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} placeholder="배너 설명" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="b-image" className={labelClass}>
                  이미지 URL *
                </label>
                <input id="b-image" type="text" value={formData.imageUrl} onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="/images/banner.jpg" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="b-link" className={labelClass}>
                  링크 URL
                </label>
                <input id="b-link" type="text" value={formData.linkUrl} onChange={(e) => setFormData((prev) => ({ ...prev, linkUrl: e.target.value }))} placeholder="/products/1" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="b-tag" className={labelClass}>
                  태그
                </label>
                <input id="b-tag" type="text" value={formData.tag} onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))} placeholder="NEW" className={inputClass} />
              </div>
              <div>
                <label htmlFor="b-badge" className={labelClass}>
                  배지
                </label>
                <input id="b-badge" type="text" value={formData.badge} onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))} placeholder="BEST" className={inputClass} />
              </div>
              <div>
                <label htmlFor="b-sort" className={labelClass}>
                  정렬 순서
                </label>
                <input id="b-sort" type="number" value={formData.sortOrder} onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button variant="ghost" onClick={resetForm}>
                취소
              </Button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-tb px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-tb-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "저장 중" : editingId ? "수정 저장" : "배너 추가"}
              </button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy aria-label="불러오는 중">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(25,31,40,0.04)]">
              <div className="skeleton aspect-[16/9] rounded-none" />
              <div className="space-y-2 p-5">
                <div className="skeleton h-3.5 w-1/2" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : banners.length === 0 ? (
        <Card padded={false}>
          <EmptyState
            title="등록된 배너가 없습니다"
            description="배너를 추가하면 메인 페이지 상단에 섭니다."
            action={
              <Button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                배너 추가
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {banners.map((banner) => (
            <div key={banner.id} className={`overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(25,31,40,0.04)] transition-opacity duration-150 ${banner.isActive ? "" : "opacity-70"}`}>
              <div className="relative aspect-[16/9] bg-tg">
                {banner.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- 관리자 미리보기, 임의 주소
                  <img src={banner.imageUrl} alt={banner.title ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-[12px] font-medium text-tx-3">이미지 없음</div>
                )}
                <div className="absolute left-3 top-3 flex gap-1.5">
                  <Badge tone={banner.isActive ? "green" : "gray"}>{banner.isActive ? "활성" : "비활성"}</Badge>
                  {banner.tag && <Badge tone="blue">{banner.tag}</Badge>}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-[15px] font-semibold text-tx">{banner.title || "(제목 없음)"}</h3>
                {banner.description && <p className="mt-1 line-clamp-2 text-[13px] font-medium text-tx-3">{banner.description}</p>}
                {banner.linkUrl && <p className="mt-2 truncate font-mono text-[11px] font-medium text-tx-3">{banner.linkUrl}</p>}

                <div className="mt-4 flex items-center justify-between border-t border-tg pt-4">
                  <Toggle on={banner.isActive} onChange={() => toggleActive(banner.id)} label={`${banner.title ?? "배너"} 활성`} />
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEditForm(banner)}>
                      수정
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(banner.id)}>
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
