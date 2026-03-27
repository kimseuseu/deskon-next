"use client";

import { useState } from "react";
import type { Banner } from "@/types";

const mockBanners: Banner[] = [
  {
    id: 1,
    imageUrl: "/images/banner-01.jpg",
    title: "AOVO 프리미엄 오피스 체어",
    titleEn: "AOVO Premium Office Chair",
    tag: "NEW",
    description: "인체공학 설계로 장시간 편안한 업무 환경을 제공합니다.",
    linkUrl: "/products/1",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 2,
    imageUrl: "/images/banner-02.jpg",
    title: "사무실 가구 렌탈 서비스",
    titleEn: "Office Furniture Rental Service",
    description: "초기 비용 부담 없이 프리미엄 사무 가구를 이용하세요.",
    badge: "BEST",
    linkUrl: "/rental",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 3,
    imageUrl: "/images/banner-03.jpg",
    title: "스타트업 패키지 특가",
    titleEn: "Startup Package Special",
    tag: "EVENT",
    description: "스타트업을 위한 합리적인 사무 가구 패키지를 만나보세요.",
    linkUrl: "/subscription-startup",
    isActive: false,
    sortOrder: 3,
  },
];

export default function BannersPage() {
  const [banners, setBanners] = useState(mockBanners);

  const toggleActive = (id: number) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("이 배너를 삭제하시겠습니까?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">배너 관리</h1>
          <p className="text-muted text-sm mt-1">메인 페이지 배너를 관리합니다.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          배너 추가
        </button>
      </div>

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
                  <button className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors">
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
      </div>
    </div>
  );
}
