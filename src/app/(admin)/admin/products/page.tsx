"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  FilterTabs,
  PageHeader,
  ResponsiveList,
  SkeletonRows,
  Toggle,
  inputClass,
  shortId,
  td,
  th,
} from "@/components/admin/ui";

const categories = ["전체", "의자", "책상", "파티션", "수납", "소파", "기타"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products?includeInactive=true");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "상품 목록을 불러오지 못했습니다.");
        return;
      }
      const list = Array.isArray(data) ? data : data.data || [];
      setProducts(list);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "전체" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleStatus = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const activeCount = products.filter((p) => p.isActive).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="상품 관리"
        description="사이트에 보이는 상품과 가격을 관리합니다."
        actions={
          <Button href="/admin/products/new">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
            상품 추가
          </Button>
        }
        stats={
          loading
            ? undefined
            : [
                { label: "전체", value: products.length },
                { label: "판매 중", value: activeCount },
                { label: "숨김", value: products.length - activeCount },
              ]
        }
      />

      {error && <ErrorState message={error} onRetry={fetchProducts} />}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs
          tabs={categories.map((c) => ({ key: c, label: c, count: loading ? undefined : c === "전체" ? products.length : products.filter((p) => p.category === c).length }))}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <label className="relative block md:w-72">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-tx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="search" placeholder="상품명 검색" value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-10`} aria-label="상품명 검색" />
        </label>
      </div>

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <SkeletonRows rows={6} cols={5} />
        ) : (
          <ResponsiveList
            items={filtered}
            keyOf={(p) => p.id}
            empty={
              <EmptyState
                title={search ? "검색 결과가 없습니다" : "등록된 상품이 없습니다"}
                description={search ? "다른 이름으로 찾아보세요." : "첫 상품을 등록하면 사이트 상품 목록에 바로 섭니다."}
                action={!search ? <Button href="/admin/products/new">상품 추가</Button> : undefined}
              />
            }
            head={
              <>
                <th className={th}>상품</th>
                <th className={th}>카테고리</th>
                <th className={th}>가격</th>
                <th className={th}>공개</th>
                <th className={`${th} text-right`}>동작</th>
              </>
            }
            row={(product) => (
              <>
                <td className={td}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-tg">
                      {product.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element -- 관리자 썸네일, 임의 주소
                        <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-tx">{product.name}</span>
                        {product.badge && <Badge tone="blue">{product.badge}</Badge>}
                      </div>
                      <p className="font-mono text-[11px] font-medium text-tx-3">{shortId(product.id)}</p>
                    </div>
                  </div>
                </td>
                <td className={td}>
                  <Badge>{product.category}</Badge>
                </td>
                <td className={`${td} tabular-nums text-tx-2`}>{product.priceDisplay || "-"}</td>
                <td className={td}>
                  <Toggle on={product.isActive} onChange={() => toggleStatus(product.id)} label={`${product.name} 공개`} />
                </td>
                <td className={`${td} text-right`}>
                  <div className="flex items-center justify-end gap-1">
                    <Button size="sm" variant="ghost" title="준비 중">
                      수정
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}>
                      삭제
                    </Button>
                  </div>
                </td>
              </>
            )}
            card={(product) => (
              <div className="flex items-start gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-tg">
                  {product.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element -- 관리자 썸네일, 임의 주소
                    <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[15px] font-semibold text-tx">{product.name}</span>
                    {product.badge && <Badge tone="blue">{product.badge}</Badge>}
                  </div>
                  <p className="mt-0.5 text-[13px] font-medium text-tx-2">
                    {product.category} · {product.priceDisplay || "가격 미정"}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Toggle on={product.isActive} onChange={() => toggleStatus(product.id)} label={`${product.name} 공개`} />
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" title="준비 중">
                        수정
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}>
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </Card>
    </div>
  );
}
