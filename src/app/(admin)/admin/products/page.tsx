"use client";

import { useState } from "react";
import Link from "next/link";

interface MockProduct {
  id: number;
  category: string;
  name: string;
  priceDisplay: string;
  isActive: boolean;
  badge?: string;
}

const categories = ["전체", "의자", "책상", "파티션", "수납", "소파", "기타"];

const mockProducts: MockProduct[] = [
  { id: 1, category: "의자", name: "AOVO 이그제큐티브 체어", priceDisplay: "월 45,000원", isActive: true, badge: "BEST" },
  { id: 2, category: "의자", name: "AOVO 태스크 체어", priceDisplay: "월 35,000원", isActive: true },
  { id: 3, category: "의자", name: "AOVO 메쉬 체어 프로", priceDisplay: "월 55,000원", isActive: true, badge: "NEW" },
  { id: 4, category: "책상", name: "스탠딩 전동 데스크 1200", priceDisplay: "월 30,000원", isActive: true },
  { id: 5, category: "책상", name: "스탠딩 전동 데스크 1400", priceDisplay: "월 35,000원", isActive: true },
  { id: 6, category: "파티션", name: "패브릭 파티션 1200", priceDisplay: "월 15,000원", isActive: false },
  { id: 7, category: "파티션", name: "유리 파티션 1500", priceDisplay: "월 25,000원", isActive: true },
  { id: 8, category: "수납", name: "3단 사무 캐비닛", priceDisplay: "월 12,000원", isActive: true },
  { id: 9, category: "수납", name: "개인 락커 4인용", priceDisplay: "월 20,000원", isActive: true },
  { id: 10, category: "소파", name: "2인 라운지 소파", priceDisplay: "월 40,000원", isActive: true },
  { id: 11, category: "기타", name: "모니터암 듀얼", priceDisplay: "월 8,000원", isActive: true },
  { id: 12, category: "기타", name: "케이블 트레이", priceDisplay: "월 5,000원", isActive: false },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(mockProducts);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "전체" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">상품 관리</h1>
          <p className="text-muted text-sm mt-1">총 {products.length}개의 상품</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          상품 추가
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="상품명으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-muted font-medium">ID</th>
                <th className="text-left px-6 py-3 text-muted font-medium">카테고리</th>
                <th className="text-left px-6 py-3 text-muted font-medium">상품명</th>
                <th className="text-left px-6 py-3 text-muted font-medium">가격</th>
                <th className="text-left px-6 py-3 text-muted font-medium">상태</th>
                <th className="text-right px-6 py-3 text-muted font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-muted">{product.id}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-primary">{product.name}</span>
                      {product.badge && (
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent text-white">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.priceDisplay}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(product.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        product.isActive ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          product.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors">
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
