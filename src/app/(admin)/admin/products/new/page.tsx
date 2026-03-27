"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    setSpecs((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: val } : s))
    );
  };

  const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);

  const removeSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log("Product data:", data);
    alert("상품 데이터가 콘솔에 출력되었습니다.");
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/products")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">상품 추가</h1>
          <p className="text-muted text-sm mt-1">새 상품 정보를 입력하세요.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-primary">기본 정보</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>카테고리 *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>배지</label>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="예: NEW, BEST, HOT"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>상품명 (한글) *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="AOVO 이그제큐티브 체어"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>상품명 (영문)</label>
              <input
                type="text"
                name="nameEn"
                value={form.nameEn}
                onChange={handleChange}
                placeholder="AOVO Executive Chair"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>간단 설명 *</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="상품에 대한 한 줄 설명"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>상세 설명</label>
            <textarea
              name="descriptionDetail"
              value={form.descriptionDetail}
              onChange={handleChange}
              rows={4}
              placeholder="상품에 대한 상세 설명을 입력하세요."
              className={inputClass}
            />
          </div>
        </div>

        {/* Features & Colors */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-primary">특징 및 옵션</h2>

          <div>
            <label className={labelClass}>특징 (쉼표로 구분)</label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="인체공학 설계, 메쉬 소재, 조절식 팔걸이"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>색상 (쉼표로 구분)</label>
            <input
              type="text"
              name="colors"
              value={form.colors}
              onChange={handleChange}
              placeholder="블랙, 그레이, 화이트"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>키워드 (쉼표로 구분)</label>
            <input
              type="text"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              placeholder="사무용의자, 인체공학, 메쉬체어"
              className={inputClass}
            />
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-primary">가격 및 이미지</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>월 렌탈료 (숫자)</label>
              <input
                type="number"
                name="priceMonthly"
                value={form.priceMonthly}
                onChange={handleChange}
                placeholder="45000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>가격 표시 텍스트</label>
              <input
                type="text"
                name="priceDisplay"
                value={form.priceDisplay}
                onChange={handleChange}
                placeholder="월 45,000원"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>이미지 URL</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-primary">사양 (Specifications)</h2>
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              항목 추가
            </button>
          </div>

          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  placeholder="항목명 (예: 무게)"
                  className={`flex-1 ${inputClass}`}
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  placeholder="값 (예: 12kg)"
                  className={`flex-1 ${inputClass}`}
                />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-accent hover:bg-accent-light rounded-xl transition-colors"
          >
            상품 등록
          </button>
        </div>
      </form>
    </div>
  );
}
