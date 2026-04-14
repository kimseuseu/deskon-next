"use client";

import { useEffect, useState } from "react";
import type { Banner } from "@/types";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
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
    try {
      const res = await fetch("/api/banners?includeInactive=true");
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setBanners(list);
    } catch {
      // Keep empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
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
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      let res: Response;
      if (editingId) {
        res = await fetch(`/api/banners/${editingId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/banners", {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        resetForm();
        fetchBanners();
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });

      if (res.ok) {
        setBanners((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
        );
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 배너를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">배너 관리</h1>
          <p className="text-muted text-sm mt-1">로딩 중...</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">배너 관리</h1>
          <p className="text-muted text-sm mt-1">메인 페이지 배너를 관리합니다.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          배너 추가
        </button>
      </div>

      {/* Banner Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-primary">
            {editingId ? "배너 수정" : "새 배너 추가"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">제목 (한글)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="배너 제목"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">제목 (영문)</label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))}
                  placeholder="Banner Title"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">설명</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="배너 설명"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이미지 URL *</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="/images/banner.jpg"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">링크 URL</label>
                <input
                  type="text"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, linkUrl: e.target.value }))}
                  placeholder="/products/1"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">태그</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                  placeholder="NEW"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">배지</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                  placeholder="BEST"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">정렬 순서</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-light rounded-xl transition-colors disabled:opacity-50"
              >
                {submitting ? "저장 중..." : editingId ? "수정" : "추가"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banner cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Image preview */}
            <div className="aspect-[16/9] bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18.75h19.5M2.25 6h19.5" />
                  </svg>
                  <span className="text-xs opacity-50">배너 이미지</span>
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                    banner.isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {banner.isActive ? "활성" : "비활성"}
                </span>
              </div>

              {banner.tag && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-accent text-white">
                    {banner.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-medium text-primary text-sm">{banner.title}</h3>
                {banner.description && (
                  <p className="text-xs text-muted mt-1 line-clamp-2">{banner.description}</p>
                )}
              </div>

              {banner.linkUrl && (
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.242a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
                  </svg>
                  <span className="truncate">{banner.linkUrl}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {/* Toggle */}
                <button
                  onClick={() => toggleActive(banner.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    banner.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      banner.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditForm(banner)}
                    className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted">
            등록된 배너가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
