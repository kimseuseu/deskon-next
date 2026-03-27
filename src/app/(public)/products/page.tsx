"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";

const mockProducts: Product[] = [
  { id: 1, category: "subscribe", name: "롤테이너 RT-500", description: "500L 대용량 롤테이너", features: ["접이식", "잠금장치", "내구성 강화"], priceMonthly: 45000, priceDisplay: "월 45,000원", imageUrl: undefined, badge: "인기", isActive: true, sortOrder: 1, createdAt: "", updatedAt: "" },
  { id: 2, category: "subscribe", name: "파랫트 PP-1200", description: "1200x1000 표준 파랫트", features: ["플라스틱", "경량", "세척 가능"], priceMonthly: 15000, priceDisplay: "월 15,000원", imageUrl: undefined, badge: "", isActive: true, sortOrder: 2, createdAt: "", updatedAt: "" },
  { id: 3, category: "rental", name: "사무용 책상 세트", description: "L자형 사무용 책상+서랍장", features: ["L자형", "서랍3단", "케이블홀"], priceMonthly: 35000, priceDisplay: "월 35,000원", imageUrl: undefined, badge: "신규", isActive: true, sortOrder: 3, createdAt: "", updatedAt: "" },
  { id: 4, category: "rental", name: "복합기 MF-3000", description: "A3 컬러 복합기 (인쇄/스캔/팩스)", features: ["A3 컬러", "양면인쇄", "네트워크"], priceMonthly: 89000, priceDisplay: "월 89,000원", imageUrl: undefined, badge: "", isActive: true, sortOrder: 4, createdAt: "", updatedAt: "" },
  { id: 5, category: "subscribe", name: "프리미엄 체어 JNS-901", description: "인체공학 사무용 의자", features: ["메쉬 등판", "요추지지", "4D 팔걸이"], priceMonthly: 49000, priceDisplay: "월 49,000원", imageUrl: undefined, badge: "BEST", isActive: true, sortOrder: 5, createdAt: "", updatedAt: "" },
  { id: 6, category: "sharing", name: "핸드카트 HC-200", description: "접이식 핸드카트 200kg", features: ["접이식", "200kg", "고무바퀴"], priceMonthly: 8000, priceDisplay: "일 8,000원", imageUrl: undefined, badge: "", isActive: true, sortOrder: 6, createdAt: "", updatedAt: "" },
  { id: 7, category: "recycle", name: "리퍼 체어 세르타 A급", description: "세르타 인증 리퍼비시 체어", features: ["A급 품질", "1년 보증", "무상 수리"], priceMonthly: 29000, priceDisplay: "월 29,000원", imageUrl: undefined, badge: "세르타", isActive: true, sortOrder: 7, createdAt: "", updatedAt: "" },
  { id: 8, category: "wholesale", name: "업소용 냉장고 CR-1000", description: "1000L 업소용 냉장고", features: ["1000L", "에너지효율1등급", "스테인리스"], priceMonthly: undefined, priceDisplay: "견적 문의", imageUrl: undefined, badge: "", isActive: true, sortOrder: 8, createdAt: "", updatedAt: "" },
  { id: 9, category: "rental", name: "이동식에어컨 AC-5000", description: "산업용 이동식에어컨 5HP", features: ["5HP", "냉방면적 60㎡", "이동식"], priceMonthly: 150000, priceDisplay: "월 150,000원", imageUrl: undefined, badge: "", isActive: true, sortOrder: 9, createdAt: "", updatedAt: "" },
  { id: 10, category: "rental", name: "서빙로봇 SR-100", description: "자율주행 서빙로봇", features: ["자율주행", "4단 트레이", "음성안내"], priceMonthly: 290000, priceDisplay: "월 290,000원", imageUrl: undefined, badge: "신규", isActive: true, sortOrder: 10, createdAt: "", updatedAt: "" },
];

const categories = [
  { slug: "all", label: "전체" },
  { slug: "subscribe", label: "구독" },
  { slug: "sharing", label: "공유" },
  { slug: "rental", label: "렌탈" },
  { slug: "recycle", label: "순환" },
  { slug: "wholesale", label: "도소매" },
];

const categoryEmoji: Record<string, string> = {
  subscribe: "🔄",
  sharing: "🤝",
  rental: "📦",
  recycle: "♻️",
  wholesale: "🏭",
};

const categoryLabel: Record<string, string> = {
  subscribe: "구독",
  sharing: "공유",
  rental: "렌탈",
  recycle: "순환",
  wholesale: "도소매",
};

export default function ProductsPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockProducts
      .filter((p) => p.isActive)
      .filter((p) => activeCategory === "all" || p.category === activeCategory)
      .filter(
        (p) =>
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [activeCategory, search]);

  const handleAddItem = (product: Product) => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl ?? null,
      quantity: 1,
      serviceType: product.category as "subscribe" | "sharing" | "rental" | "recycle" | "wholesale",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4"
          >
            상품 카탈로그
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-white/70 max-w-xl mx-auto"
          >
            필요한 장비를 찾아보세요
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface text-muted hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72 sm:ml-auto">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="상품 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-surface text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="text-muted text-lg">검색 결과가 없습니다.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="mt-4 text-accent hover:text-accent-light transition underline"
              >
                필터 초기화
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300"
                >
                  {/* Image Placeholder */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] bg-surface flex items-center justify-center overflow-hidden">
                      <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                        {categoryEmoji[product.category] ?? "📦"}
                      </span>
                      {product.badge && (
                        <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 bg-white/90 text-xs text-muted px-2 py-1 rounded-md">
                        {categoryLabel[product.category] ?? product.category}
                      </span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-5">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-paperlogy font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-surface text-muted px-2 py-0.5 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Price + Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="font-paperlogy font-bold text-accent text-lg">
                        {product.priceDisplay ?? "견적 문의"}
                      </span>
                      <button
                        onClick={() => handleAddItem(product)}
                        className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-sm hover:shadow-md"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        견적에 추가
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
