"use client";

import { useState } from "react";
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

const mockQuotes: QuoteRequest[] = [
  {
    id: "q1",
    quoteNumber: "QR-2025-001",
    companyName: "테크스타트",
    contactName: "김민수",
    phone: "010-1234-5678",
    email: "minsu@techstart.kr",
    address: "서울시 강남구 테헤란로 123",
    deliveryDate: "2025-02-01",
    message: "신규 사무실 오픈에 맞춰 전체 가구를 렌탈하고 싶습니다.",
    status: "pending",
    totalItems: 3,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "q2",
    quoteNumber: "QR-2025-002",
    companyName: "디자인랩",
    contactName: "이영희",
    phone: "010-2345-6789",
    email: "yh@designlab.co",
    deliveryDate: "2025-02-15",
    message: "기존 가구 교체를 위한 견적 요청입니다.",
    status: "reviewed",
    totalItems: 2,
    createdAt: "2025-01-14T14:00:00Z",
  },
  {
    id: "q3",
    quoteNumber: "QR-2025-003",
    companyName: "코워킹스페이스 해브",
    contactName: "정현우",
    phone: "010-5678-9012",
    email: "hw@have.space",
    address: "서울시 마포구 와우산로 456",
    message: "확장 공간에 추가 가구가 필요합니다.",
    status: "quoted",
    totalItems: 4,
    createdAt: "2025-01-13T09:00:00Z",
  },
  {
    id: "q4",
    quoteNumber: "QR-2025-004",
    companyName: "에듀플러스",
    contactName: "한지민",
    phone: "010-6789-0123",
    status: "pending",
    totalItems: 2,
    createdAt: "2025-01-12T16:00:00Z",
  },
];

const mockItems: Record<string, QuoteRequestItem[]> = {
  q1: [
    { id: "i1", quoteRequestId: "q1", productName: "AOVO 이그제큐티브 체어", quantity: 20, serviceType: "렌탈", rentalMonths: 12 },
    { id: "i2", quoteRequestId: "q1", productName: "스탠딩 전동 데스크 1400", quantity: 20, serviceType: "렌탈", rentalMonths: 12 },
    { id: "i3", quoteRequestId: "q1", productName: "패브릭 파티션 1200", quantity: 10, serviceType: "렌탈", rentalMonths: 12 },
  ],
  q2: [
    { id: "i4", quoteRequestId: "q2", productName: "AOVO 메쉬 체어 프로", quantity: 15, serviceType: "렌탈", rentalMonths: 6 },
    { id: "i5", quoteRequestId: "q2", productName: "3단 사무 캐비닛", quantity: 15, serviceType: "렌탈", rentalMonths: 6 },
  ],
  q3: [
    { id: "i6", quoteRequestId: "q3", productName: "AOVO 태스크 체어", quantity: 30, serviceType: "렌탈", rentalMonths: 12 },
    { id: "i7", quoteRequestId: "q3", productName: "스탠딩 전동 데스크 1200", quantity: 30, serviceType: "렌탈", rentalMonths: 12 },
    { id: "i8", quoteRequestId: "q3", productName: "개인 락커 4인용", quantity: 8, serviceType: "렌탈", rentalMonths: 12 },
    { id: "i9", quoteRequestId: "q3", productName: "모니터암 듀얼", quantity: 30, serviceType: "렌탈", rentalMonths: 12 },
  ],
  q4: [
    { id: "i10", quoteRequestId: "q4", productName: "AOVO 태스크 체어", quantity: 100, serviceType: "렌탈", rentalMonths: 24, notes: "학원 강의실용" },
    { id: "i11", quoteRequestId: "q4", productName: "케이블 트레이", quantity: 50, serviceType: "구매" },
  ],
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function QuotesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeTab === "all"
      ? mockQuotes
      : mockQuotes.filter((q) => q.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary font-paperlogy">견적 관리</h1>
        <p className="text-muted text-sm mt-1">총 {mockQuotes.length}건의 견적 요청</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const count =
            tab.key === "all"
              ? mockQuotes.length
              : mockQuotes.filter((q) => q.status === tab.key).length;
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
                    onClick={() => setExpandedId((prev) => (prev === quote.id ? null : quote.id))}
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
                                  {(mockItems[quote.id] || []).map((item) => (
                                    <tr key={item.id} className="border-b border-gray-50 last:border-0">
                                      <td className="px-4 py-2 font-medium text-gray-700">{item.productName}</td>
                                      <td className="px-4 py-2 text-gray-600">{item.quantity}</td>
                                      <td className="px-4 py-2 text-gray-600">{item.serviceType}</td>
                                      <td className="px-4 py-2 text-gray-600">
                                        {item.rentalMonths ? `${item.rentalMonths}개월` : "-"}
                                      </td>
                                      <td className="px-4 py-2 text-gray-500">{item.notes || "-"}</td>
                                    </tr>
                                  ))}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
