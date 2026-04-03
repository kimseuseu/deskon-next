"use client";

import { useState, useEffect } from "react";

interface Notice {
  id: string;
  category: string;
  title: string;
  created_at: string;
  is_pinned: boolean;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((json) => {
        setNotices(json.data || []);
      })
      .catch(() => {
        setNotices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Consider a notice "new" if created within the last 14 days
  const isNew = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return diff < 14 * 24 * 60 * 60 * 1000;
  };

  return (
    <>
      {/* Hero */}
      <section data-hero-dark className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-gray-900 to-primary overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/20 mb-6">
            Notice
          </span>
          <h1 className="font-paperlogy text-4xl md:text-5xl font-bold text-white mb-4">
            공지사항
          </h1>
          <p className="text-gray-400 text-lg">
            AOVO의 최신 소식을 확인하세요
          </p>
        </div>
      </section>

      {/* Notice List */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-muted">불러오는 중...</div>
          ) : notices.length === 0 ? (
            <div className="text-center py-20 text-muted animate-fade-in" style={{ animation: "fadeIn 0.6s ease-out, scaleIn 0.5s ease-out", transformOrigin: "center" }}>
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-surface border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-muted">
                <div className="col-span-2">분류</div>
                <div className="col-span-7">제목</div>
                <div className="col-span-3 text-right">날짜</div>
              </div>

              {/* Rows */}
              {notices.map((notice, idx) => (
                <div
                  key={notice.id}
                  className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-5 border-b border-gray-50 last:border-0 hover:bg-surface/50 transition-all duration-300 cursor-pointer group animate-slide-up ${
                    notice.is_pinned ? "border-l-4 border-l-accent" : ""
                  }`}
                  style={{ animationDelay: `${idx * 60}ms`, animationFillMode: "both" }}
                >
                  <div className="sm:col-span-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      notice.category === "공지"
                        ? "bg-accent/10 text-accent"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {notice.category}
                    </span>
                  </div>
                  <div className="sm:col-span-7 flex items-center gap-2">
                    {notice.is_pinned && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent text-white leading-none">
                        고정
                      </span>
                    )}
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                      {notice.title}
                    </span>
                    {isNew(notice.created_at) && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none ring-pulse">
                        N
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-3 text-sm text-muted sm:text-right">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
