"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Inquiry } from "@/types";

interface DashboardStats {
  products: number;
  inquiries: number;
  quotes: number;
  banners: number;
}

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

const statusLabel: Record<string, string> = {
  new: "신규",
  "in-progress": "진행중",
  resolved: "완료",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, inquiries: 0, quotes: 0, banners: 0 });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("deskon_admin_token");
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchData = async () => {
      try {
        const [productsRes, inquiriesRes, quotesRes, bannersRes] = await Promise.all([
          fetch("/api/products", { headers }).then((r) => r.json()).catch(() => []),
          fetch("/api/inquiries", { headers }).then((r) => r.json()).catch(() => []),
          fetch("/api/quotes", { headers }).then((r) => r.json()).catch(() => []),
          fetch("/api/banners", { headers }).then((r) => r.json()).catch(() => []),
        ]);

        const productsList = Array.isArray(productsRes) ? productsRes : productsRes.data || [];
        const inquiriesList = Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes.data || [];
        const quotesList = Array.isArray(quotesRes) ? quotesRes : quotesRes.data || [];
        const bannersList = Array.isArray(bannersRes) ? bannersRes : bannersRes.data || [];

        setStats({
          products: productsList.length,
          inquiries: inquiriesList.length,
          quotes: quotesList.length,
          banners: bannersList.filter((b: { isActive?: boolean }) => b.isActive).length,
        });

        setRecentInquiries(inquiriesList.slice(0, 5));
      } catch {
        // Keep default stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: "총 상품",
      value: stats.products,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
    },
    {
      label: "신규 문의",
      value: stats.inquiries,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      gradient: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600",
    },
    {
      label: "대기 견적",
      value: stats.quotes,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      gradient: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
    },
    {
      label: "활성 배너",
      value: stats.banners,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18.75h19.5M2.25 6h19.5" />
        </svg>
      ),
      gradient: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-paperlogy">대시보드</h1>
          <p className="text-muted text-sm mt-1">AOVO 관리자 현황을 한눈에 확인하세요.</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-primary font-paperlogy">대시보드</h1>
        <p className="text-muted text-sm mt-1">AOVO 관리자 현황을 한눈에 확인하세요.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} bg-white rounded-2xl p-6 border border-gray-100 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
              <div className={`${stat.iconColor} opacity-80`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary font-paperlogy">최근 문의</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm text-accent hover:text-accent-light transition-colors"
          >
            전체 보기
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-3 text-muted font-medium">ID</th>
                <th className="text-left px-6 py-3 text-muted font-medium">이름</th>
                <th className="text-left px-6 py-3 text-muted font-medium">유형</th>
                <th className="text-left px-6 py-3 text-muted font-medium">상태</th>
                <th className="text-left px-6 py-3 text-muted font-medium">일시</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    문의가 없습니다.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-muted">{inq.id}</td>
                    <td className="px-6 py-3 font-medium text-primary">{inq.name}</td>
                    <td className="px-6 py-3 text-gray-600">{inq.inquiryType || "-"}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[inq.status] || "bg-gray-100 text-gray-700"}`}>
                        {statusLabel[inq.status] || inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted">{formatDate(inq.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-primary text-sm">상품 추가</p>
            <p className="text-xs text-muted">새 상품을 등록합니다</p>
          </div>
        </Link>

        <Link
          href="/admin/inquiries"
          className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-primary text-sm">문의 확인</p>
            <p className="text-xs text-muted">새로운 문의를 확인합니다</p>
          </div>
        </Link>

        <Link
          href="/admin/banners"
          className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18.75h19.5M2.25 6h19.5" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-primary text-sm">배너 관리</p>
            <p className="text-xs text-muted">메인 배너를 관리합니다</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
