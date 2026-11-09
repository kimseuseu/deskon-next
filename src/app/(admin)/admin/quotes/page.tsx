"use client";

import { useEffect, useState } from "react";
import type { QuoteRequest, QuoteRequestItem } from "@/types";
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  FilterTabs,
  PageHeader,
  ResponsiveList,
  SkeletonRows,
  formatDate,
  td,
  th,
  type Tone,
} from "@/components/admin/ui";

type TabKey = "all" | QuoteRequest["status"];

const statusTabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "pending", label: "대기" },
  { key: "reviewed", label: "검토" },
  { key: "quoted", label: "견적완료" },
  { key: "accepted", label: "수락" },
  { key: "declined", label: "거절" },
];

const statusLabel: Record<QuoteRequest["status"], string> = {
  pending: "대기",
  reviewed: "검토",
  quoted: "견적완료",
  accepted: "수락",
  declined: "거절",
};

const statusTone: Record<QuoteRequest["status"], Tone> = {
  pending: "gray",
  reviewed: "blue",
  quoted: "amber",
  accepted: "green",
  declined: "red",
};

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [quoteItems, setQuoteItems] = useState<Record<string, QuoteRequestItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "견적 목록을 불러오지 못했습니다.");
        return;
      }

      if (Array.isArray(data)) {
        setQuotes(data);
      } else if (data.data) {
        setQuotes(data.data);
        if (data.items) {
          setQuoteItems(data.items);
        }
      }
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchQuotes();
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
      void fetchItems(newId);
    }
  };

  const filtered = activeTab === "all" ? quotes : quotes.filter((q) => q.status === activeTab);
  const countOf = (key: TabKey) => (key === "all" ? quotes.length : quotes.filter((q) => q.status === key).length);

  return (
    <div className="space-y-5">
      <PageHeader
        title="견적 관리"
        description="품목 단위로 들어온 견적 요청입니다. 줄을 누르면 요청 품목이 펼쳐집니다."
        stats={
          loading
            ? undefined
            : [
                { label: "전체", value: quotes.length },
                { label: "대기", value: countOf("pending"), tone: countOf("pending") > 0 ? "accent" : "default" },
                { label: "견적완료", value: countOf("quoted") },
                { label: "수락", value: countOf("accepted") },
              ]
        }
      />

      {error && <ErrorState message={error} onRetry={fetchQuotes} />}

      <FilterTabs tabs={statusTabs.map((t) => ({ ...t, count: loading ? undefined : countOf(t.key) }))} active={activeTab} onChange={setActiveTab} />

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <SkeletonRows rows={5} cols={5} />
        ) : (
          <ResponsiveList
            items={filtered}
            keyOf={(q) => q.id}
            onRowClick={(q) => handleExpand(q.id)}
            expanded={(q) => expandedId === q.id}
            empty={<EmptyState title="견적 요청이 없습니다" description="상품 페이지에서 들어온 품목 견적이 여기에 섭니다." />}
            head={
              <>
                <th className={th}>견적번호</th>
                <th className={th}>회사명</th>
                <th className={th}>담당자</th>
                <th className={th}>품목</th>
                <th className={th}>상태</th>
                <th className={`${th} hidden lg:table-cell`}>요청일</th>
              </>
            }
            row={(q) => (
              <>
                <td className={`${td} font-mono text-[13px] font-semibold text-tx`}>{q.quoteNumber}</td>
                <td className={`${td} font-semibold text-tx`}>{q.companyName}</td>
                <td className={`${td} text-tx-2`}>{q.contactName}</td>
                <td className={`${td} tabular-nums text-tx-2`}>{q.totalItems}건</td>
                <td className={td}>
                  <Badge tone={statusTone[q.status]}>{statusLabel[q.status]}</Badge>
                </td>
                <td className={`${td} hidden tabular-nums text-tx-3 lg:table-cell`}>{formatDate(q.createdAt)}</td>
              </>
            )}
            card={(q) => (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[12px] font-semibold text-tx-3">{q.quoteNumber}</p>
                  <p className="mt-0.5 truncate text-[15px] font-semibold text-tx">{q.companyName}</p>
                  <p className="mt-0.5 text-[13px] font-medium text-tx-2">
                    {q.contactName} · {q.totalItems}건
                  </p>
                  <p className="mt-1 text-[12px] font-medium tabular-nums text-tx-3">{formatDate(q.createdAt)}</p>
                </div>
                <Badge tone={statusTone[q.status]}>{statusLabel[q.status]}</Badge>
              </div>
            )}
            detail={(quote) => (
              <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                <dl className="grid grid-cols-2 gap-3 text-[13px] sm:grid-cols-4">
                  <div>
                    <dt className="font-medium text-tx-3">연락처</dt>
                    <dd className="font-semibold tabular-nums text-tx">{quote.phone}</dd>
                  </div>
                  {quote.email && (
                    <div>
                      <dt className="font-medium text-tx-3">이메일</dt>
                      <dd className="break-all font-semibold text-tx">{quote.email}</dd>
                    </div>
                  )}
                  {quote.address && (
                    <div>
                      <dt className="font-medium text-tx-3">주소</dt>
                      <dd className="font-semibold text-tx">{quote.address}</dd>
                    </div>
                  )}
                  {quote.deliveryDate && (
                    <div>
                      <dt className="font-medium text-tx-3">희망 납기</dt>
                      <dd className="font-semibold text-tx">{quote.deliveryDate}</dd>
                    </div>
                  )}
                </dl>

                {quote.message && (
                  <div className="rounded-2xl bg-white p-4">
                    <p className="mb-1.5 text-[12px] font-semibold text-tx-3">요청 메시지</p>
                    <p className="whitespace-pre-line text-[14px] font-medium leading-[1.65] text-tx">{quote.message}</p>
                  </div>
                )}

                <div className="overflow-hidden rounded-2xl bg-white">
                  <p className="px-4 pt-4 text-[12px] font-semibold text-tx-3">요청 품목</p>
                  {(quoteItems[quote.id] || []).length === 0 ? (
                    <p className="px-4 py-4 text-[13px] font-medium text-tx-3">품목 정보가 없습니다.</p>
                  ) : (
                    <>
                      <table className="mt-2 hidden w-full text-[13px] sm:table">
                        <thead>
                          <tr className="border-b border-tg text-left text-[12px] font-semibold text-tx-3">
                            <th className="px-4 py-2">상품명</th>
                            <th className="px-4 py-2">수량</th>
                            <th className="px-4 py-2">유형</th>
                            <th className="px-4 py-2">기간</th>
                            <th className="px-4 py-2">비고</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-tg">
                          {(quoteItems[quote.id] || []).map((item) => (
                            <tr key={item.id}>
                              <td className="px-4 py-2.5 font-semibold text-tx">{item.productName}</td>
                              <td className="px-4 py-2.5 tabular-nums text-tx-2">{item.quantity}</td>
                              <td className="px-4 py-2.5 text-tx-2">{item.serviceType}</td>
                              <td className="px-4 py-2.5 tabular-nums text-tx-2">{item.rentalMonths ? `${item.rentalMonths}개월` : "-"}</td>
                              <td className="px-4 py-2.5 text-tx-3">{item.notes || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ul className="mt-2 divide-y divide-tg sm:hidden">
                        {(quoteItems[quote.id] || []).map((item) => (
                          <li key={item.id} className="px-4 py-3 text-[13px]">
                            <p className="font-semibold text-tx">{item.productName}</p>
                            <p className="mt-0.5 text-tx-2">
                              {item.quantity}개 · {item.serviceType}
                              {item.rentalMonths ? ` · ${item.rentalMonths}개월` : ""}
                            </p>
                            {item.notes && <p className="mt-0.5 text-tx-3">{item.notes}</p>}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          />
        )}
      </Card>
    </div>
  );
}
