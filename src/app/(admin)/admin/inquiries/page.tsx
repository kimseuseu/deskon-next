"use client";

import { useEffect, useState } from "react";
import type { Inquiry } from "@/types";

const statusTabs = [
  { key: "all", label: "전체" },
  { key: "new", label: "신규" },
  { key: "in-progress", label: "진행중" },
  { key: "resolved", label: "완료" },
] as const;

const statusLabel: Record<Inquiry["status"], string> = {
  new: "신규",
  "in-progress": "진행중",
  resolved: "완료",
};

const statusStyle: Record<Inquiry["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [adminNotes, setAdminNotes] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("deskon_admin_token");
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch("/api/inquiries", { headers });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setInquiries(list);
    } catch {
      // Keep empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filtered =
    activeTab === "all"
      ? inquiries
      : inquiries.filter((inq) => inq.status === activeTab);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const updateStatus = async (id: number, status: Inquiry["status"]) => {
    try {
      const token = localStorage.getItem("deskon_admin_token");
      const note = adminNotes[id] ?? inquiries.find((i) => i.id === id)?.adminNote;
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status, adminNote: note }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) =>
            inq.id === id
              ? { ...inq, status, adminNote: note || inq.adminNote, updatedAt: new Date().toISOString() }
              : inq
          )
        );
      } else {
        alert("상태 변경에 실패했습니다.");
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">문의 관리</h1>
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
        <h1 className="text-2xl font-bold text-primary font-paperlogy">문의 관리</h1>
        <p className="text-muted text-sm mt-1">총 {inquiries.length}건의 문의</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const count =
            tab.key === "all"
              ? inquiries.length
              : inquiries.filter((i) => i.status === tab.key).length;
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
                <th className="text-left px-6 py-3 text-muted font-medium">ID</th>
                <th className="text-left px-6 py-3 text-muted font-medium">이름</th>
                <th className="text-left px-6 py-3 text-muted font-medium">회사</th>
                <th className="text-left px-6 py-3 text-muted font-medium hidden md:table-cell">연락처</th>
                <th className="text-left px-6 py-3 text-muted font-medium">유형</th>
                <th className="text-left px-6 py-3 text-muted font-medium">상태</th>
                <th className="text-left px-6 py-3 text-muted font-medium hidden lg:table-cell">일시</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <>
                  <tr
                    key={inq.id}
                    onClick={() => toggleExpand(inq.id)}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-muted">{inq.id}</td>
                    <td className="px-6 py-4 font-medium text-primary">{inq.name}</td>
                    <td className="px-6 py-4 text-gray-600">{inq.company || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{inq.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{inq.inquiryType}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[inq.status]}`}>
                        {statusLabel[inq.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted hidden lg:table-cell">{formatDate(inq.createdAt)}</td>
                  </tr>
                  {expandedId === inq.id && (
                    <tr key={`${inq.id}-detail`} className="border-b border-gray-50 bg-gray-50/30">
                      <td colSpan={7} className="px-6 py-5">
                        <div className="space-y-4 max-w-2xl">
                          {/* Message */}
                          <div>
                            <p className="text-xs font-medium text-muted mb-1">문의 내용</p>
                            <p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                              {inq.message || "내용 없음"}
                            </p>
                          </div>

                          {/* Contact info */}
                          <div className="flex flex-wrap gap-4 text-xs text-muted">
                            {inq.email && <span>Email: {inq.email}</span>}
                            {inq.phone && <span>Tel: {inq.phone}</span>}
                          </div>

                          {/* Admin note */}
                          <div>
                            <p className="text-xs font-medium text-muted mb-1">관리자 메모</p>
                            <textarea
                              rows={2}
                              value={adminNotes[inq.id] ?? inq.adminNote ?? ""}
                              onChange={(e) =>
                                setAdminNotes((prev) => ({ ...prev, [inq.id]: e.target.value }))
                              }
                              placeholder="메모를 입력하세요..."
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                          </div>

                          {/* Status buttons */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted mr-2">상태 변경:</span>
                            {(["new", "in-progress", "resolved"] as Inquiry["status"][]).map(
                              (s) => (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(inq.id, s)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    inq.status === s
                                      ? "bg-accent text-white"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                >
                                  {statusLabel[s]}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted">
                    문의가 없습니다.
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
