"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";

const categoryEmoji: Record<string, string> = {
  물류장비: "📦",
  사무가구: "🪑",
  주방기기: "🍽️",
  의료장비: "🏥",
  IT기기: "💻",
  행사장비: "🎪",
};

const serviceTypes = [
  { value: "subscribe", label: "구독" },
  { value: "sharing", label: "공유" },
  { value: "rental", label: "렌탈" },
  { value: "recycle", label: "자산매입" },
  { value: "buyback", label: "유통" },
] as const;

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState<
    "subscribe" | "sharing" | "rental" | "recycle" | "buyback"
  >("subscribe");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (!cancelled) {
            setProduct(null);
          }
          return;
        }

        const json = await res.json();

        if (!cancelled) {
          setProduct(json.data ?? null);
        }
      } catch {
        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleAdd = () => {
    if (!product) {
      return;
    }

    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl ?? null,
      quantity,
      serviceType,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-paperlogy text-3xl font-bold text-primary mb-3">
            상품을 찾을 수 없습니다
          </h1>
          <p className="text-muted mb-6">
            삭제되었거나 더 이상 노출되지 않는 상품입니다.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium"
          >
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-accent transition-colors">
            홈
          </Link>
          <span>›</span>
          <Link href="/products" className="hover:text-accent transition-colors">
            상품 카탈로그
          </Link>
          <span>›</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square bg-surface rounded-3xl flex items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-8xl opacity-50">
                  {categoryEmoji[product.category] ?? "📦"}
                </span>
              )}
              {product.badge && (
                <span className="absolute top-5 right-5 bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>
          </motion.div>

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
            <p className="text-muted text-lg mb-6">
              {product.descriptionDetail ?? product.description}
            </p>

            <div className="mb-6">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                주요 특징
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface rounded-2xl p-5 mb-6">
              <p className="text-sm text-muted mb-1">이용 가격</p>
              <p className="font-paperlogy text-3xl font-bold text-accent">
                {product.priceDisplay ?? "견적 문의"}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                서비스 유형
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setServiceType(item.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      serviceType === item.value
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface text-muted hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-paperlogy font-semibold text-primary text-sm mb-3 uppercase tracking-wider">
                수량
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="w-10 h-10 rounded-full bg-surface text-primary hover:bg-gray-200 flex items-center justify-center transition-colors font-bold text-lg"
                >
                  -
                </button>
                <span className="w-12 text-center font-paperlogy font-bold text-xl text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((current) => current + 1)}
                  className="w-10 h-10 rounded-full bg-surface text-primary hover:bg-gray-200 flex items-center justify-center transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-accent hover:bg-accent-light text-white font-paperlogy font-bold text-lg py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              견적에 추가
            </button>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border-t border-gray-100 pt-12"
        >
          <h2 className="font-paperlogy text-2xl font-bold text-primary mb-8">
            상세 정보
          </h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-white">
                  <td className="px-6 py-4 font-medium text-primary bg-gray-50/50 w-1/3">
                    카테고리
                  </td>
                  <td className="px-6 py-4 text-muted">{product.category}</td>
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
