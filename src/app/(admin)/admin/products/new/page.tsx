"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardTitle, ErrorState, PageHeader, inputClass, labelClass } from "@/components/admin/ui";

interface SpecPair {
  key: string;
  value: string;
}

const categoryOptions = [
  { value: "", label: "카테고리 선택" },
  { value: "의자", label: "의자" },
  { value: "책상", label: "책상" },
  { value: "파티션", label: "파티션" },
  { value: "수납", label: "수납" },
  { value: "소파", label: "소파" },
  { value: "기타", label: "기타" },
];

export default function ProductNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    category: "",
    name: "",
    nameEn: "",
    description: "",
    descriptionDetail: "",
    features: "",
    colors: "",
    priceMonthly: "",
    priceDisplay: "",
    badge: "",
    imageUrl: "",
    keywords: "",
  });

  const [specs, setSpecs] = useState<SpecPair[]>([{ key: "", value: "" }]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: val } : s)));
  };

  const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);

  const removeSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const specifications: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) specifications[s.key.trim()] = s.value.trim();
    });

    const data = {
      ...form,
      priceMonthly: form.priceMonthly ? Number(form.priceMonthly) : undefined,
      features: form.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: form.colors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      keywords: form.keywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      specifications,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || "상품 등록에 실패했습니다.");
        setSubmitting(false);
        return;
      }

      router.push("/admin/products");
    } catch {
      setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="상품 추가" description="사이트 상품 목록에 새 상품을 올립니다." back={{ href: "/admin/products", label: "상품 목록" }} />

      {error && (
        <div className="mb-5">
          <ErrorState message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardTitle>기본 정보</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className={labelClass}>
                  카테고리 *
                </label>
                <select id="category" name="category" value={form.category} onChange={handleChange} required className={inputClass}>
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="badge" className={labelClass}>
                  배지
                </label>
                <input id="badge" type="text" name="badge" value={form.badge} onChange={handleChange} placeholder="예: NEW, BEST, HOT" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  상품명 (한글) *
                </label>
                <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="AOVO 이그제큐티브 체어" className={inputClass} />
              </div>
              <div>
                <label htmlFor="nameEn" className={labelClass}>
                  상품명 (영문)
                </label>
                <input id="nameEn" type="text" name="nameEn" value={form.nameEn} onChange={handleChange} placeholder="AOVO Executive Chair" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                간단 설명 *
              </label>
              <input id="description" type="text" name="description" value={form.description} onChange={handleChange} required placeholder="상품에 대한 한 줄 설명" className={inputClass} />
            </div>

            <div>
              <label htmlFor="descriptionDetail" className={labelClass}>
                상세 설명
              </label>
              <textarea
                id="descriptionDetail"
                name="descriptionDetail"
                value={form.descriptionDetail}
                onChange={handleChange}
                rows={4}
                placeholder="상품에 대한 상세 설명을 입력하세요."
                className={inputClass}
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>특징 및 옵션</CardTitle>
          <div className="space-y-4">
            <div>
              <label htmlFor="features" className={labelClass}>
                특징 (쉼표로 구분)
              </label>
              <input id="features" type="text" name="features" value={form.features} onChange={handleChange} placeholder="인체공학 설계, 메쉬 소재, 조절식 팔걸이" className={inputClass} />
            </div>
            <div>
              <label htmlFor="colors" className={labelClass}>
                색상 (쉼표로 구분)
              </label>
              <input id="colors" type="text" name="colors" value={form.colors} onChange={handleChange} placeholder="블랙, 그레이, 화이트" className={inputClass} />
            </div>
            <div>
              <label htmlFor="keywords" className={labelClass}>
                키워드 (쉼표로 구분)
              </label>
              <input id="keywords" type="text" name="keywords" value={form.keywords} onChange={handleChange} placeholder="사무용의자, 인체공학, 메쉬체어" className={inputClass} />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>가격 및 이미지</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="priceMonthly" className={labelClass}>
                  월 렌탈료 (숫자)
                </label>
                <input id="priceMonthly" type="number" name="priceMonthly" value={form.priceMonthly} onChange={handleChange} placeholder="45000" className={inputClass} />
              </div>
              <div>
                <label htmlFor="priceDisplay" className={labelClass}>
                  가격 표시 텍스트
                </label>
                <input id="priceDisplay" type="text" name="priceDisplay" value={form.priceDisplay} onChange={handleChange} placeholder="월 45,000원" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="imageUrl" className={labelClass}>
                이미지 URL
              </label>
              <input id="imageUrl" type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputClass} />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle
            aside={
              <Button size="sm" variant="ghost" onClick={addSpec}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
                항목 추가
              </Button>
            }
          >
            사양
          </CardTitle>
          <div className="space-y-2.5">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" value={spec.key} onChange={(e) => handleSpecChange(index, "key", e.target.value)} placeholder="항목명 (예: 무게)" className={inputClass} aria-label={`사양 ${index + 1} 항목명`} />
                <input type="text" value={spec.value} onChange={(e) => handleSpecChange(index, "value", e.target.value)} placeholder="값 (예: 12kg)" className={inputClass} aria-label={`사양 ${index + 1} 값`} />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-tx-3 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
                    aria-label="사양 항목 지우기"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => router.push("/admin/products")}>
            취소
          </Button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-tb px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-tb-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "등록 중" : "상품 등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
