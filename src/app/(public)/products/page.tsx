"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";

const mockProducts: Product[] = [
  // 물류장비
  { id: 1, category: "물류장비", name: "롤테이너 RT-500", description: "500L 대용량 접이식 롤테이너, 물류 센터 및 창고 필수 장비", features: ["접이식", "잠금장치", "내구성 강화", "500L"], priceMonthly: 45000, priceDisplay: "월 45,000원", imageUrl: "/images/aovo-lineup.webp", badge: "인기", isActive: true, sortOrder: 1, createdAt: "", updatedAt: "" },
  { id: 2, category: "물류장비", name: "표준 파렛트 PP-1200", description: "1200x1000mm 표준 규격 플라스틱 파렛트, 세척 및 재사용 가능", features: ["플라스틱", "경량", "세척 가능", "1200x1000"], priceMonthly: 15000, priceDisplay: "월 15,000원", imageUrl: "/images/aovo-banner2.webp", badge: "", isActive: true, sortOrder: 2, createdAt: "", updatedAt: "" },
  { id: 3, category: "물류장비", name: "핸드카트 HC-300", description: "접이식 핸드카트 300kg, 고무바퀴 장착으로 소음 최소화", features: ["접이식", "300kg", "고무바퀴", "소음 저감"], priceMonthly: 12000, priceDisplay: "월 12,000원", imageUrl: "/images/aovo-banner3.webp", badge: "", isActive: true, sortOrder: 3, createdAt: "", updatedAt: "" },

  // 사무가구
  { id: 4, category: "사무가구", name: "L자형 사무용 책상 세트", description: "L자형 책상+3단 서랍장 세트, 케이블홀 포함 깔끔한 배선 정리", features: ["L자형", "서랍 3단", "케이블홀", "스크래치 방지"], priceMonthly: 35000, priceDisplay: "월 35,000원", imageUrl: "/images/office-furniture.webp", badge: "신규", isActive: true, sortOrder: 4, createdAt: "", updatedAt: "" },
  { id: 5, category: "사무가구", name: "인체공학 메쉬 의자 프로", description: "메쉬 등판, 요추 지지대, 4D 팔걸이 장착 프리미엄 사무용 의자", features: ["메쉬 등판", "요추지지", "4D 팔걸이", "틸트 잠금"], priceMonthly: 49000, priceDisplay: "월 49,000원", imageUrl: "/images/aovo-ergo-side.webp", badge: "BEST", isActive: true, sortOrder: 5, createdAt: "", updatedAt: "" },
  { id: 6, category: "사무가구", name: "스탠딩 전동 데스크 1400", description: "전동 높이 조절 데스크 1400mm, 메모리 기능 3단계 프리셋", features: ["전동 높이조절", "메모리 3단계", "1400mm", "충돌 방지"], priceMonthly: 55000, priceDisplay: "월 55,000원", imageUrl: "/images/auth-office/1.webp", badge: "", isActive: true, sortOrder: 6, createdAt: "", updatedAt: "" },
  { id: 7, category: "사무가구", name: "패브릭 파티션 1200", description: "사무 공간 분리용 패브릭 파티션 1200mm, 다양한 색상 선택", features: ["1200mm", "패브릭", "자립형", "연결 가능"], priceMonthly: 18000, priceDisplay: "월 18,000원", imageUrl: "/images/auth-office/2.webp", badge: "", isActive: true, sortOrder: 7, createdAt: "", updatedAt: "" },

  // 주방집기
  { id: 8, category: "주방집기", name: "업소용 냉장고 CR-1000", description: "1000L 스테인리스 업소용 냉장고, 에너지효율 1등급", features: ["1000L", "에너지 1등급", "스테인리스", "디지털 온도제어"], priceMonthly: 120000, priceDisplay: "월 120,000원", imageUrl: "/images/auth-office/3.webp", badge: "", isActive: true, sortOrder: 8, createdAt: "", updatedAt: "" },
  { id: 9, category: "주방집기", name: "업소용 식기세척기 DW-500", description: "분당 60접시 처리 가능한 고속 업소용 식기세척기", features: ["60접시/분", "고온 살균", "스테인리스", "절수형"], priceMonthly: 85000, priceDisplay: "월 85,000원", imageUrl: "/images/aovo-banner4.webp", badge: "", isActive: true, sortOrder: 9, createdAt: "", updatedAt: "" },
  { id: 10, category: "주방집기", name: "인덕션 레인지 4구", description: "업소용 4구 인덕션 레인지, 개별 온도 조절 및 타이머 기능", features: ["4구", "개별 온도조절", "타이머", "과열 방지"], priceMonthly: 65000, priceDisplay: "월 65,000원", imageUrl: "/images/auth-office/4.webp", badge: "신규", isActive: true, sortOrder: 10, createdAt: "", updatedAt: "" },

  // 의료장비
  { id: 11, category: "의료장비", name: "전동 병원침대 EB-200", description: "3모터 전동 병원침대, 높이/등판/무릎 개별 조절", features: ["3모터", "높이조절", "사이드레일", "캐스터 잠금"], priceMonthly: 180000, priceDisplay: "월 180,000원", imageUrl: "/images/chair-subscription.webp", badge: "", isActive: true, sortOrder: 11, createdAt: "", updatedAt: "" },
  { id: 12, category: "의료장비", name: "휠체어 WC-100 경량형", description: "알루미늄 프레임 경량 휠체어, 접이식 설계로 보관 편리", features: ["알루미늄", "접이식", "11kg 경량", "팔걸이 탈착"], priceMonthly: 25000, priceDisplay: "월 25,000원", imageUrl: "/images/certa.webp", badge: "", isActive: true, sortOrder: 12, createdAt: "", updatedAt: "" },
  { id: 13, category: "의료장비", name: "산소 농축기 OC-5L", description: "5L/분 의료용 산소 농축기, 저소음 설계 가정/병원 겸용", features: ["5L/분", "저소음", "순도 93%", "리모컨"], priceMonthly: 95000, priceDisplay: "월 95,000원", imageUrl: "/images/aovo-banner1.webp", badge: "인기", isActive: true, sortOrder: 13, createdAt: "", updatedAt: "" },

  // IT기기
  { id: 14, category: "IT기기", name: "노트북 LG 그램 15인치", description: "비즈니스용 LG 그램 15인치, i7/16GB/512GB SSD", features: ["15인치", "i7", "16GB RAM", "512GB SSD"], priceMonthly: 75000, priceDisplay: "월 75,000원", imageUrl: "/images/office-equipment.webp", badge: "", isActive: true, sortOrder: 14, createdAt: "", updatedAt: "" },
  { id: 15, category: "IT기기", name: "A3 컬러 복합기 MF-3000", description: "A3 컬러 인쇄/스캔/팩스 복합기, 네트워크 및 양면인쇄 지원", features: ["A3 컬러", "양면인쇄", "네트워크", "스캔/팩스"], priceMonthly: 89000, priceDisplay: "월 89,000원", imageUrl: "/images/aovo-jns1018.webp", badge: "", isActive: true, sortOrder: 15, createdAt: "", updatedAt: "" },
  { id: 16, category: "IT기기", name: "27인치 QHD 모니터", description: "27인치 QHD IPS 모니터, USB-C 연결 및 피벗/높이 조절", features: ["27인치 QHD", "IPS", "USB-C", "피벗"], priceMonthly: 32000, priceDisplay: "월 32,000원", imageUrl: "/images/aovo-jns901.webp", badge: "", isActive: true, sortOrder: 16, createdAt: "", updatedAt: "" },

  // 행사장비
  { id: 17, category: "행사장비", name: "빔프로젝터 PJ-5000", description: "5000안시 고휘도 빔프로젝터, 대형 세미나/행사장용", features: ["5000안시", "풀HD", "무선 연결", "키스톤 보정"], priceMonthly: 150000, priceDisplay: "월 150,000원", imageUrl: "/images/aovo-living.webp", badge: "", isActive: true, sortOrder: 17, createdAt: "", updatedAt: "" },
  { id: 18, category: "행사장비", name: "접이식 연회 테이블 1800", description: "1800mm 접이식 연회 테이블, 행사/전시/세미나용", features: ["1800mm", "접이식", "경량", "높이조절"], priceMonthly: 8000, priceDisplay: "일 8,000원", imageUrl: "/images/office-furniture.webp", badge: "", isActive: true, sortOrder: 18, createdAt: "", updatedAt: "" },
  { id: 19, category: "행사장비", name: "무선 마이크 세트 WM-200", description: "듀얼 채널 무선 핸드마이크 세트, 최대 100m 수신 거리", features: ["듀얼채널", "무선 100m", "핸드마이크 2개", "충전식"], priceMonthly: 35000, priceDisplay: "월 35,000원", imageUrl: "/images/aovo-spider-hero.webp", badge: "", isActive: true, sortOrder: 19, createdAt: "", updatedAt: "" },
  { id: 20, category: "행사장비", name: "이동식 에어컨 AC-5000", description: "산업용 이동식 에어컨 5HP, 냉방 면적 60m2", features: ["5HP", "냉방 60m2", "이동식", "배수 자동"], priceMonthly: 200000, priceDisplay: "월 200,000원", imageUrl: "/images/auth-office/1.webp", badge: "인기", isActive: true, sortOrder: 20, createdAt: "", updatedAt: "" },
];

const categories = [
  { slug: "all", label: "전체" },
  { slug: "물류장비", label: "물류장비" },
  { slug: "사무가구", label: "사무가구" },
  { slug: "주방집기", label: "주방집기" },
  { slug: "의료장비", label: "의료장비" },
  { slug: "IT기기", label: "IT기기" },
  { slug: "행사장비", label: "행사장비" },
];

const categoryIcon: Record<string, string> = {
  "물류장비": "🚛",
  "사무가구": "🪑",
  "주방집기": "🍳",
  "의료장비": "🏥",
  "IT기기": "💻",
  "행사장비": "🎪",
};

/* Map product categories to the cart's serviceType union */
const categoryToServiceType: Record<string, "subscribe" | "sharing" | "rental" | "recycle" | "buyback"> = {
  "물류장비": "subscribe",
  "사무가구": "rental",
  "주방집기": "rental",
  "의료장비": "rental",
  "IT기기": "rental",
  "행사장비": "sharing",
};

export default function ProductsPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  // URL의 ?q= 파라미터로 검색어 초기화
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setSearch(q);
  }, []);

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
      serviceType: categoryToServiceType[product.category] ?? "rental",
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            상품 카탈로그
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto animate-fade-in-delay">
            필요한 장비를 찾아보세요. 구독, 렌탈, 공유까지 한 곳에서.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-surface text-muted hover:bg-gray-200"
                  }`}
                >
                  {cat.slug !== "all" && (
                    <span className="mr-1">{categoryIcon[cat.slug]}</span>
                  )}
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
                placeholder="상품명 또는 설명으로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-surface text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Active filter indicator */}
          {(activeCategory !== "all" || search) && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted">
              <span>
                {filtered.length}개 상품
                {activeCategory !== "all" && (
                  <span className="ml-1 text-accent font-medium">
                    &middot; {categories.find((c) => c.slug === activeCategory)?.label}
                  </span>
                )}
                {search && (
                  <span className="ml-1 text-accent font-medium">
                    &middot; &quot;{search}&quot;
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="text-accent hover:text-accent/80 underline transition"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 transition-opacity duration-300">
            <div className="text-5xl mb-4 opacity-40">🔍</div>
            <p className="text-muted text-lg mb-2">검색 결과가 없습니다.</p>
            <p className="text-sm text-muted/70 mb-4">다른 키워드나 카테고리로 다시 검색해보세요.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearch("");
              }}
              className="text-accent hover:text-accent/80 transition underline font-medium"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Product Image */}
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-5xl opacity-60">
                          {categoryIcon[product.category] ?? "📦"}
                        </span>
                      </div>
                    )}
                    {/* Bottom gradient overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs text-muted px-2 py-1 rounded-md">
                      {product.category}
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
                      className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-sm hover:shadow-md active:scale-95 duration-150"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      견적에 추가
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
