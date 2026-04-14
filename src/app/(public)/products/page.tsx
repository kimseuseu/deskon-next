"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";

const categoryIcon: Record<string, string> = {
  물류장비: "📦",
  사무가구: "🪑",
  주방기기: "🍽️",
  의료장비: "🏥",
  IT기기: "💻",
  행사장비: "🎪",
};

const categoryToServiceType: Record<
  string,
  "subscribe" | "sharing" | "rental" | "recycle" | "buyback"
> = {
  물류장비: "subscribe",
  사무가구: "rental",
  주방기기: "rental",
  의료장비: "rental",
  IT기기: "rental",
  행사장비: "sharing",
};

export default function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("q") ?? "";
  });
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const json = await res.json();

        if (!cancelled) {
          setProducts(Array.isArray(json) ? json : json.data || []);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
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
  }, []);

  const categories = useMemo(
    () => [
      { slug: "all", label: "전체" },
      ...Array.from(new Set(products.map((product) => product.category))).map(
        (category) => ({
          slug: category,
          label: category,
        })
      ),
    ],
    [products]
  );

  const filtered = useMemo(() => {
    return products
      .filter((product) => activeCategory === "all" || product.category === activeCategory)
      .filter((product) => {
        if (!search) {
          return true;
        }

        const query = search.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      })
      .sort((left, right) => left.sortOrder - right.sortOrder);
  }, [activeCategory, products, search]);

  const handleAddItem = (product: Product) => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl ?? null,
      quantity: 1,
      serviceType: categoryToServiceType[product.category] ?? "rental",
    });

    setAddedIds((current) => new Set(current).add(product.id));
    window.setTimeout(() => {
      setAddedIds((current) => {
        const next = new Set(current);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream">
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
            필요한 장비를 찾아보세요. 구독, 렌탈, 공유까지 한 곳에서 살펴볼 수 있습니다.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.slug
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-surface text-muted hover:bg-gray-200"
                  }`}
                >
                  {category.slug !== "all" && (
                    <span className="mr-1">
                      {categoryIcon[category.slug] ?? "📦"}
                    </span>
                  )}
                  {category.label}
                </button>
              ))}
            </div>

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
                placeholder="상품명 또는 설명으로 검색"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-surface text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
              />
            </div>
          </div>

          {(activeCategory !== "all" || search) && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted">
              <span>
                {filtered.length}개 상품
                {activeCategory !== "all" && (
                  <span className="ml-1 text-accent font-medium">
                    · {activeCategory}
                  </span>
                )}
                {search && (
                  <span className="ml-1 text-accent font-medium">
                    · &quot;{search}&quot;
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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 transition-opacity duration-300">
            <div className="text-5xl mb-4 opacity-40">🔎</div>
            <p className="text-muted text-lg mb-2">검색 결과가 없습니다.</p>
            <p className="text-sm text-muted/70 mb-4">
              다른 키워드나 카테고리로 다시 검색해 보세요.
            </p>
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
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 animate-slide-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                    {product.imageUrl ? (
                      product.imageUrl.startsWith("/") ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-5xl opacity-60">
                        {categoryIcon[product.category] ?? "📦"}
                      </div>
                    )}
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

                <div className="p-5">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-paperlogy font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-surface text-muted px-2 py-0.5 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="font-paperlogy font-bold text-accent text-lg">
                      {product.priceDisplay ?? "견적 문의"}
                    </span>
                    <button
                      onClick={() => handleAddItem(product)}
                      disabled={addedIds.has(product.id)}
                      className={`flex items-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 duration-150 ${
                        addedIds.has(product.id)
                          ? "bg-green-500"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {addedIds.has(product.id) ? "추가됨" : "견적에 추가"}
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
