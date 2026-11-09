"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Inquiry } from "@/types";
import { fieldLabel } from "@/data/inquiry";
import { Badge, Card, CardTitle, EmptyState, ErrorState, PageHeader, SkeletonCards, SkeletonRows, formatDateTime, type Tone } from "@/components/admin/ui";

interface DashboardStats {
  products: number;
  inquiries: number;
  newInquiries: number;
  quotes: number;
  banners: number;
}

const statusTone: Record<Inquiry["status"], Tone> = { new: "blue", "in-progress": "amber", resolved: "green" };
const statusLabel: Record<Inquiry["status"], string> = { new: "신규", "in-progress": "진행중", resolved: "완료" };

const quickLinks = [
  { href: "/admin/products/new", title: "상품 추가", desc: "새 상품을 등록합니다", external: false },
  { href: "/admin/inquiries", title: "문의 확인", desc: "새로 들어온 문의를 봅니다", external: false },
  { href: "/admin/posts/new", title: "현장 노트 쓰기", desc: "블로그 글을 올립니다", external: false },
  { href: "/admin/banners", title: "배너 관리", desc: "메인 배너를 바꿉니다", external: false },
  { href: "http://w.aovo.kr", title: "후이즈메일", desc: "웹메일로 갑니다", external: true },
  { href: "/api/kakao/authorize", title: "카카오 알림 연동", desc: "새 문의를 카톡으로 받습니다", external: false, plain: true },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, inquiries: 0, newInquiries: 0, quotes: 0, banners: 0 });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, inquiriesRes, quotesRes, bannersRes] = await Promise.all([
        fetch("/api/products?includeInactive=true").then((r) => r.json()).catch(() => []),
        fetch("/api/inquiries").then((r) => r.json()).catch(() => []),
        fetch("/api/quotes").then((r) => r.json()).catch(() => []),
        fetch("/api/banners?includeInactive=true").then((r) => r.json()).catch(() => []),
      ]);

      const productsList = Array.isArray(productsRes) ? productsRes : productsRes.data || [];
      const inquiriesList: Inquiry[] = Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes.data || [];
      const quotesList = Array.isArray(quotesRes) ? quotesRes : quotesRes.data || [];
      const bannersList = Array.isArray(bannersRes) ? bannersRes : bannersRes.data || [];

      setStats({
        products: productsList.length,
        inquiries: inquiriesList.length,
        newInquiries: inquiriesList.filter((i) => i.status === "new").length,
        quotes: quotesList.length,
        banners: bannersList.filter((b: { isActive?: boolean }) => b.isActive).length,
      });

      setRecentInquiries(inquiriesList.slice(0, 5));
    } catch {
      setError("현황을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const statCards = [
    { label: "총 상품", value: stats.products, href: "/admin/products" },
    { label: "문의", value: stats.inquiries, hint: `신규 ${stats.newInquiries}건`, href: "/admin/inquiries", accent: stats.newInquiries > 0 },
    { label: "견적 요청", value: stats.quotes, href: "/admin/quotes" },
    { label: "활성 배너", value: stats.banners, href: "/admin/banners" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="대시보드" description="오늘의 문의와 상품, 배너 현황입니다." />

      {error && <ErrorState message={error} onRetry={fetchData} />}

      {loading ? (
        <SkeletonCards />
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {statCards.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-[20px] bg-white p-5 shadow-[0_1px_2px_rgba(25,31,40,0.04)] transition-colors duration-150 hover:bg-tb-soft/60"
            >
              <p className="text-[13px] font-medium text-tx-3">{s.label}</p>
              <p className={`mt-2 text-[28px] font-bold tabular-nums leading-none tracking-[-0.02em] ${s.accent ? "text-tb" : "text-tx"}`}>{s.value}</p>
              {s.hint && <p className="mt-2 text-[12px] font-semibold text-tx-2">{s.hint}</p>}
            </Link>
          ))}
        </div>
      )}

      <Card padded={false}>
        <div className="px-5 pt-5 sm:px-6">
          <CardTitle
            aside={
              <Link href="/admin/inquiries" className="text-[13px] font-semibold text-tb transition-colors duration-150 hover:text-tb-deep">
                전체 보기
              </Link>
            }
          >
            최근 문의
          </CardTitle>
        </div>
        {loading ? (
          <SkeletonRows rows={4} cols={4} />
        ) : recentInquiries.length === 0 ? (
          <EmptyState title="아직 문의가 없습니다" description="문의 폼으로 들어온 요청이 여기에 섭니다." />
        ) : (
          <ul className="divide-y divide-tg">
            {recentInquiries.map((inq) => (
              <li key={inq.id}>
                <Link href="/admin/inquiries" className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-tg/60 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-tx">
                      {inq.name}
                      {inq.company && <span className="ml-1.5 font-medium text-tx-3">{inq.company}</span>}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] font-medium text-tx-3">
                      {[inq.inquiryType, fieldLabel(inq.details?.field.slug ?? inq.serviceCategory), inq.details?.event.name].filter(Boolean).join(" / ")}
                    </p>
                  </div>
                  <Badge tone={statusTone[inq.status] ?? "gray"}>{statusLabel[inq.status] ?? inq.status}</Badge>
                  <span className="hidden text-[13px] font-medium tabular-nums text-tx-3 sm:inline">{formatDateTime(inq.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <section>
        <h2 className="mb-3 text-[15px] font-bold text-tx">바로가기</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((q) => {
            const cls =
              "group flex items-center justify-between gap-3 rounded-[20px] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(25,31,40,0.04)] transition-colors duration-150 hover:bg-tb-soft/60";
            const inner = (
              <>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-tx">{q.title}</p>
                  <p className="mt-0.5 text-[12px] font-medium text-tx-3">{q.desc}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-tx-3 transition-colors duration-150 group-hover:text-tb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </>
            );
            if (q.external) {
              return (
                <a key={q.href} href={q.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              );
            }
            if (q.plain) {
              return (
                <a key={q.href} href={q.href} className={cls}>
                  {inner}
                </a>
              );
            }
            return (
              <Link key={q.href} href={q.href} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
