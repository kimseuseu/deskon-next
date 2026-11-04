"use client";

import { useState, useEffect } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";

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
  const [renderedAt] = useState(() => Date.now());

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
    const diff = renderedAt - new Date(dateStr).getTime();
    return diff < 14 * 24 * 60 * 60 * 1000;
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Notice"
        title="공지사항"
        description="AOVO 그룹의 최신 소식을 확인하세요."
      />

      {/* Notice List */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-36">
          {loading ? (
            <p className="py-20 text-center text-[15px] font-medium text-tx-3">불러오는 중...</p>
          ) : notices.length === 0 ? (
            <p className="rounded-[24px] bg-tg py-20 text-center text-[15px] font-medium text-tx-3">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            <Stagger className="space-y-3" gap={0.06} amount={0.05}>
              {notices.map((notice) => (
                <StaggerItem key={notice.id}>
                  <article
                    className={`group flex cursor-pointer flex-col gap-3 rounded-[24px] p-6 transition-colors duration-200 sm:flex-row sm:items-center sm:gap-6 lg:px-7 ${
                      notice.is_pinned ? "bg-tb-soft hover:bg-tb-soft/70" : "bg-tg hover:bg-tg-2/70"
                    }`}
                  >
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${
                          notice.category === "공지" ? "bg-tb text-white" : "bg-white text-tb"
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.is_pinned && (
                        <span className="inline-flex rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-tb">고정</span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <h3 className="truncate text-[16px] font-semibold text-tx transition-colors group-hover:text-tb lg:text-[17px]">
                        {notice.title}
                      </h3>
                      {isNew(notice.created_at) && (
                        <span className="inline-flex shrink-0 rounded-full bg-tb px-1.5 py-0.5 text-[10px] font-bold leading-none text-white" aria-label="새 글">
                          N
                        </span>
                      )}
                    </div>
                    <time dateTime={notice.created_at} className="shrink-0 text-[14px] font-medium text-tx-3 sm:text-right">
                      {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                    </time>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </>
  );
}
