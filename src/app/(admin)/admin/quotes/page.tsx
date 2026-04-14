"use client";

import { useEffect, useState } from "react";
import type { QuoteRequest, QuoteRequestItem } from "@/types";

const statusTabs = [
  { key: "all", label: "전체" },
  { key: "pending", label: "대기" },
  { key: "reviewed", label: "검토" },
  { key: "quoted", label: "견적완료" },
  { key: "accepted", label: "수락" },
  { key: "declined", label: "거절" },
] as const;

const statusLabel: Record<QuoteRequest["status"], string> = {
  pending: "대기",
  reviewed: "검토",
  quoted: "견적완료",
  accepted: "수락",
  declined: "거절",
};

const statusStyle: Record<QuoteRequest["status"], string> = {
  pending: "bg-gray-100 text-gray-700",
  reviewed: "bg-blue-100 text-blue-700",
  quoted: "bg-amber-100 text-amber-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [quoteItems, setQuoteItems] = useState<Record<string, QuoteRequestItem[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/quotes");
        const data = await res.json();

        if (Array.isArray(data)) {
          setQuotes(data);
        } else if (data.data) {
          setQuotes(data.data);
          if (data.items) {
            setQuoteItems(data.items);
          }
        }
      } catch {
        // Keep empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const fetchItems = async (quoteId: string) => {
    if (quoteItems[quoteId]) return;

    try {
      const res = await fetch(`/api/quotes/${quoteId}/items`);
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.data || [];
        setQuoteItems((prev) => ({ ...prev, [quoteId]: items }));
      }
    } catch {
      // Silently fail for items
    }
  };

  const handleExpand = (quoteId: string) => {
    const newId = expandedId === quoteId ? null : quoteId;
    setExpandedId(newId);
    if (newId) {
      fetchItems(newId);
    }
  };

  const filtered =
    activeTab === "all"
      ? quotes
      : quotes.filter((q) => q.status === activeTab);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">견적 관리</h1>
          <p className="text-muted text-sm mt-1">로딩 중...</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary font-paperlogy">견적 관리</h1>
        <p className="text-muted text-sm mt-1">총 {quotes.length}건의 견적 요청</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const count =
            tab.key === "all"
              ? quotes.length
              : quotes.filter((q) => q.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-accent text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-muted font-medium">견적번호</th>
                <th className="text-left px-6 py-3 text-muted font-medium">회사명</th>
                <th className="text-left px-6 py-3 text-muted font-medium">담당자</th>
                <th className="text-left px-6 py-3 text-muted font-medium">품목수</th>
                <th className="text-left px-6 py-3 text-muted font-medium">상태</th>
                <th className="text-left px-6 py-3 text-muted font-medium hidden md:table-cell">요청일</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote) => (
                <>
                  <tr
                    key={quote.id}
                    onClick={() => handleExpand(quote.id)}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-primary">{quote.quoteNumber}</td>
                    <td className="px-6 py-4 text-gray-700">{quote.companyName}</td>
                    <td className="px-6 py-4 text-gray-600">{quote.contactName}</td>
                    <td className="px-6 py-4 text-gray-600">{quote.totalItems}건</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[quote.status]}`}>
                        {statusLabel[quote.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted hidden md:table-cell">{formatDate(quote.createdAt)}</td>
                  </tr>
                  {expandedId === quote.id && (
                    <tr key={`${quote.id}-detail`} className="border-b border-gray-50 bg-gray-50/30">
                      <td colSpan={6} className="px-6 py-5">
                        <div className="space-y-4 max-w-3xl">
                          {/* Contact info */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                              <span className="text-muted block">연락처</span>
                              <span className="text-gray-700">{quote.phone}</span>
                            </div>
                            {quote.email && (
                              <div>
                                <span className="text-muted block">이메일</span>
                                <span className="text-gray-700">{quote.email}</span>
                              </div>
                            )}
                            {quote.address && (
                              <div>
                                <span className="text-muted block">주소</span>
                                <span className="text-gray-700">{quote.address}</span>
                              </div>
                            )}
                            {quote.deliveryDate && (
                              <div>
                                <span className="text-muted block">희망 납기</span>
                                <span className="text-gray-700">{quote.deliveryDate}</span>
                              </div>
                            )}
                          </div>

                          {quote.message && (
                            <div>
                              <p className="text-xs font-medium text-muted mb-1">요청 메시지</p>
                              <p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                                {quote.message}
                              </p>
                            </div>
                          )}

                          {/* Items table */}
                          <div>
                            <p className="text-xs font-medium text-muted mb-2">요청 품목</p>
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-4 py-2 text-muted font-medium">상품명</th>
                                    <th className="text-left px-4 py-2 text-muted font-medium">수량</th>
                                    <th className="text-left px-4 py-2 text-muted font-medium">유형</th>
                                    <th className="text-left px-4 py-2 text-muted font-medium">기간</th>
                                    <th className="text-left px-4 py-2 text-muted font-medium">비고</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(quoteItems[quote.id] || []).length === 0 ? (
                                    <tr>
                                      <td colSpan={5} className="px-4 py-3 text-center text-muted">
                                        품목 정보가 없습니다.
                                      </td>
                                    </tr>
                                  ) : (
                                    (quoteItems[quote.id] || []).map((item) => (
                                      <tr key={item.id} className="border-b border-gray-50 last:border-0">
                                        <td className="px-4 py-2 font-medium text-gray-700">{item.productName}</td>
                                        <td className="px-4 py-2 text-gray-600">{item.quantity}</td>
                                        <td className="px-4 py-2 text-gray-600">{item.serviceType}</td>
                                        <td className="px-4 py-2 text-gray-600">
                                          {item.rentalMonths ? `${item.rentalMonths}개월` : "-"}
                                        </td>
                                        <td className="px-4 py-2 text-gray-500">{item.notes || "-"}</td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted">
                    견적 요청이 없습니다.
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
