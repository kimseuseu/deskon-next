"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
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
  { id: 8, category: "buyback", name: "업소용 냉장고 CR-1000", description: "1000L 업소용 냉장고", features: ["1000L", "에너지효율1등급", "스테인리스"], priceMonthly: undefined, priceDisplay: "견적 문의", imageUrl: undefined, badge: "", isActive: true, sortOrder: 8, createdAt: "", updatedAt: "" },
  { id: 9, category: "rental", name: "이동식에어컨 AC-5000", description: "산업용 이동식에어컨 5HP", features: ["5HP", "냉방면적 60㎡", "이동식"], priceMonthly: 150000, priceDisplay: "월 150,000원", imageUrl: undefined, badge: "", isActive: true, sortOrder: 9, createdAt: "", updatedAt: "" },
  { id: 10, category: "rental", name: "서빙로봇 SR-100", description: "자율주행 서빙로봇", features: ["자율주행", "4단 트레이", "음성안내"], priceMonthly: 290000, priceDisplay: "월 290,000원", imageUrl: undefined, badge: "신규", isActive: true, sortOrder: 10, createdAt: "", updatedAt: "" },
];

const categoryEmoji: Record<string, string> = {
  subscribe: "🔄",
  sharing: "🤝",
  rental: "📦",
  recycle: "♻️",
  buyback: "🏭",
};

const serviceTypes = [
  { value: "subscribe", label: "구독" },
  { value: "sharing", label: "공유" },
  { value: "rental", label: "렌탈" },
  { value: "recycle", label: "순환" },
  { value: "buyback", label: "매입" },
] as const;

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState<
    "subscribe" | "sharing" | "rental" | "recycle" | "buyback"
  >("subscribe");

  const product = mockProducts.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl ?? null,
      quantity,
      serviceType,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-accent transition-colors">
            홈
          </Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-accent transition-colors">
            상품 카탈로그
          </Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square bg-surface rounded-3xl flex items-center justify-center overflow-hidden">
              <span className="text-8xl opacity-50">
                {categoryEmoji[product.category] ?? "📦"}
              </span>
              {product.badge && (
                <span className="absolute top-5 right-5 bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.badge && (
              <span className="inline-block w-fit bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}

            <h1 className="font-paperlogy text-3xl md:text-4xl font-bold text-primary mb-3">
              {product.name}
            </h1>

            <p className="text-muted text-lg mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                주요 특징
              </h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="bg-surface rounded-2xl p-5 mb-6">
              <p className="text-sm text-muted mb-1">이용 가격</p>
              <p className="font-paperlogy text-3xl font-bold text-accent">
                {product.priceDisplay ?? "견적 문의"}
              </p>
            </div>

            {/* Service Type Selector */}
            <div className="mb-6">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                서비스 유형
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => setServiceType(st.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      serviceType === st.value
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface text-muted hover:bg-gray-200"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                수량
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-surface text-primary hover:bg-gray-200 flex items-center justify-center transition-colors font-bold text-lg"
                >
                  -
                </button>
                <span className="w-12 text-center font-paperlogy font-bold text-xl text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-surface text-primary hover:bg-gray-200 flex items-center justify-center transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Quote Button */}
            <button
              onClick={handleAdd}
              className="w-full bg-accent hover:bg-accent-light text-white font-paperlogy font-bold text-lg py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              견적에 추가
            </button>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border-t border-gray-100 pt-12"
        >
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-8">
            상세 사양
          </h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-white">
                  <td className="px-6 py-4 font-medium text-primary bg-gray-50/50 w-1/3">
                    카테고리
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {product.category}
                  </td>
                </tr>
                <tr className="border-b border-white">
                  <td className="px-6 py-4 font-medium text-primary bg-gray-50/50">
                    상품명
                  </td>
                  <td className="px-6 py-4 text-muted">{product.name}</td>
                </tr>
                <tr className="border-b border-white">
                  <td className="px-6 py-4 font-medium text-primary bg-gray-50/50">
                    주요 특징
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {product.features.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-primary bg-gray-50/50">
                    이용 가격
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {product.priceDisplay ?? "견적 문의"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>
      </section>
    </div>
  );
}
