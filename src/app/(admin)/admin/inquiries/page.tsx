"use client";

import { useEffect, useState } from "react";
import type { Inquiry } from "@/types";
import { INQUIRY_STATUSES, INQUIRY_STATUS_LABEL, INQUIRY_STATUS_TONE, fieldLabel, summarizeDetails } from "@/data/inquiry";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  FilterTabs,
  PageHeader,
  ResponsiveList,
  SkeletonRows,
  formatDateTime,
  inputClass,
  shortId,
  td,
  th,
  type Tone,
} from "@/components/admin/ui";

type TabKey = "all" | Inquiry["status"];

const statusTabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "전체" },
  ...INQUIRY_STATUSES.map(({ key, label }) => ({ key, label })),
];

const statusLabel: Record<Inquiry["status"], string> = INQUIRY_STATUS_LABEL;
const statusTone: Record<Inquiry["status"], Tone> = INQUIRY_STATUS_TONE;

/** f_auto,q_auto 변환을 뺀 원본 주소 */
function originalUrl(url: string) {
  return url.replace("/image/upload/f_auto,q_auto/", "/image/upload/");
}

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "문의 목록을 불러오지 못했습니다.");
        return;
      }
      const list = Array.isArray(data) ? data : data.data || [];
      setInquiries(list);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchInquiries();
  }, []);

  const filtered = activeTab === "all" ? inquiries : inquiries.filter((inq) => inq.status === activeTab);
  const countOf = (key: TabKey) => (key === "all" ? inquiries.length : inquiries.filter((i) => i.status === key).length);

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    setSaving(id);
    try {
      const note = adminNotes[id] ?? inquiries.find((i) => i.id === id)?.adminNote;
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote: note }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status, adminNote: note || inq.adminNote, updatedAt: new Date().toISOString() } : inq))
        );
      } else {
        alert("상태 변경에 실패했습니다.");
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    } finally {
      setSaving(null);
    }
  };

  const fieldOf = (inq: Inquiry) => fieldLabel(inq.details?.field.slug ?? inq.serviceCategory);

  return (
    <div className="space-y-5">
      <PageHeader
        title="문의 관리"
        description="문의 폼과 견적 요청으로 들어온 연락입니다. 줄을 누르면 내용과 명함이 펼쳐집니다."
        stats={
          loading
            ? undefined
            : [
                { label: "전체", value: inquiries.length },
                { label: "신규", value: countOf("new"), tone: countOf("new") > 0 ? "accent" : "default" },
                { label: "확인", value: countOf("confirmed") },
                { label: "진행중", value: countOf("in-progress") },
                { label: "완료", value: countOf("resolved") },
                { label: "반려", value: countOf("rejected") },
              ]
        }
      />

      {error && <ErrorState message={error} onRetry={fetchInquiries} />}

      <FilterTabs tabs={statusTabs.map((t) => ({ ...t, count: loading ? undefined : countOf(t.key) }))} active={activeTab} onChange={setActiveTab} />

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <SkeletonRows rows={6} cols={5} />
        ) : (
          <ResponsiveList
            items={filtered}
            keyOf={(inq) => inq.id}
            onRowClick={(inq) => toggleExpand(inq.id)}
            expanded={(inq) => expandedId === inq.id}
            empty={
              <EmptyState
                title={activeTab === "all" ? "아직 문의가 없습니다" : `${statusLabel[activeTab as Inquiry["status"]]} 상태인 문의가 없습니다`}
                description="사이트의 견적 문의 폼으로 들어온 요청이 여기에 섭니다."
              />
            }
            head={
              <>
                <th className={th}>이름</th>
                <th className={th}>분야</th>
                <th className={th}>현장</th>
                <th className={`${th} hidden lg:table-cell`}>연락처</th>
                <th className={th}>상태</th>
                <th className={`${th} hidden xl:table-cell`}>접수</th>
              </>
            }
            row={(inq) => (
              <>
                <td className={td}>
                  <p className="font-semibold text-tx">{inq.name}</p>
                  {inq.company && <p className="text-[12px] font-medium text-tx-3">{inq.company}</p>}
                </td>
                <td className={td}>
                  <span className="text-tx-2">{fieldOf(inq) || "-"}</span>
                  <p className="text-[12px] font-medium text-tx-3">{inq.inquiryType}</p>
                </td>
                <td className={`${td} max-w-[16rem]`}>
                  <p className="truncate text-tx-2">{inq.details?.event.name ?? (inq.message ? inq.message.split("\n")[0] : "-")}</p>
                  {inq.details?.businessCard && <p className="text-[12px] font-semibold text-tb">명함 첨부</p>}
                </td>
                <td className={`${td} hidden tabular-nums text-tx-2 lg:table-cell`}>{inq.phone}</td>
                <td className={td}>
                  <Badge tone={statusTone[inq.status] ?? "gray"}>{statusLabel[inq.status] ?? inq.status}</Badge>
                </td>
                <td className={`${td} hidden whitespace-nowrap tabular-nums text-tx-3 xl:table-cell`}>{formatDateTime(inq.createdAt)}</td>
              </>
            )}
            card={(inq) => (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-tx">
                    {inq.name}
                    {inq.company && <span className="ml-1.5 text-[13px] font-medium text-tx-3">{inq.company}</span>}
                  </p>
                  <p className="mt-0.5 truncate text-[13px] font-medium text-tx-2">
                    {[fieldOf(inq), inq.details?.event.name].filter(Boolean).join(" / ") || inq.inquiryType}
                  </p>
                  <p className="mt-1 text-[12px] font-medium tabular-nums text-tx-3">{formatDateTime(inq.createdAt)}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Badge tone={statusTone[inq.status] ?? "gray"}>{statusLabel[inq.status] ?? inq.status}</Badge>
                  {inq.details?.businessCard && <span className="text-[12px] font-semibold text-tb">명함</span>}
                </div>
              </div>
            )}
            detail={(inq) => (
              <InquiryDetail
                inq={inq}
                note={adminNotes[inq.id] ?? inq.adminNote ?? ""}
                onNote={(v) => setAdminNotes((prev) => ({ ...prev, [inq.id]: v }))}
                onStatus={(s) => updateStatus(inq.id, s)}
                saving={saving === inq.id}
              />
            )}
          />
        )}
      </Card>
    </div>
  );
}

function InquiryDetail({
  inq,
  note,
  onNote,
  onStatus,
  saving,
}: {
  inq: Inquiry;
  note: string;
  onNote: (v: string) => void;
  onStatus: (s: Inquiry["status"]) => void;
  saving: boolean;
}) {
  const details = inq.details;
  const rows = details ? summarizeDetails(details) : [];
  const card = details?.businessCard;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-4">
        {/* 연락처 */}
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          <div>
            <dt className="font-medium text-tx-3">전화</dt>
            <dd className="font-semibold tabular-nums text-tx">
              <a href={`tel:${inq.phone}`} className="hover:text-tb">
                {inq.phone || "-"}
              </a>
            </dd>
          </div>
          {inq.email && (
            <div>
              <dt className="font-medium text-tx-3">이메일</dt>
              <dd className="font-semibold text-tx">
                <a href={`mailto:${inq.email}`} className="hover:text-tb">
                  {inq.email}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-tx-3">접수</dt>
            <dd className="font-semibold tabular-nums text-tx">{formatDateTime(inq.createdAt)}</dd>
          </div>
          <div>
            <dt className="font-medium text-tx-3">ID</dt>
            <dd className="font-mono text-[12px] font-medium text-tx-3">{shortId(inq.id)}</dd>
          </div>
          {details?.contactFromCard && (
            <div className="basis-full">
              <Badge tone="blue">이름과 회사는 명함에서 확인</Badge>
            </div>
          )}
        </dl>

        {/* 견적 상세 */}
        {rows.length > 0 && (
          <div className="rounded-2xl bg-white p-4">
            <p className="mb-2 text-[12px] font-semibold text-tx-3">현장 · 요청 정보</p>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-3 border-b border-tg py-1.5 text-[13px] sm:block sm:border-0 sm:py-0">
                  <dt className="font-medium text-tx-3">{r.label}</dt>
                  <dd className="text-right font-semibold text-tx sm:text-left">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* 메모 · 문의 내용 */}
        <div className="rounded-2xl bg-white p-4">
          <p className="mb-1.5 text-[12px] font-semibold text-tx-3">{details ? "고객 메모" : "문의 내용"}</p>
          <p className="whitespace-pre-line text-[14px] font-medium leading-[1.65] text-tx">
            {details ? details.memo || "적은 메모가 없습니다." : inq.message || "내용 없음"}
          </p>
        </div>

        {/* 관리자 메모 · 상태 */}
        <div className="rounded-2xl bg-white p-4">
          <label htmlFor={`note-${inq.id}`} className="mb-1.5 block text-[12px] font-semibold text-tx-3">
            관리자 메모
          </label>
          <textarea
            id={`note-${inq.id}`}
            rows={2}
            value={note}
            onChange={(e) => onNote(e.target.value)}
            placeholder="통화 내용, 견적 금액, 다음 할 일"
            className={inputClass}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[12px] font-medium text-tx-3">상태</span>
            {INQUIRY_STATUSES.map(({ key, label, hint }) => (
              <Button key={key} size="sm" variant={inq.status === key ? "secondary" : "ghost"} onClick={() => onStatus(key)} disabled={saving} title={hint}>
                {label}
              </Button>
            ))}
            {saving && <span className="text-[12px] font-medium text-tx-3">저장 중</span>}
            <span className="ml-auto text-[12px] font-medium text-tx-3">메모는 상태 버튼을 누를 때 함께 저장됩니다</span>
          </div>
        </div>
      </div>

      {/* 명함 */}
      <div className="rounded-2xl bg-white p-4">
        <p className="mb-2 text-[12px] font-semibold text-tx-3">명함</p>
        {card ? (
          <a href={originalUrl(card.url)} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl bg-tg" title="원본 열기">
            {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary 주소 */}
            <img src={card.url} alt={`${inq.name} 명함`} className="aspect-[1.75] w-full object-cover transition-opacity duration-150 group-hover:opacity-90" />
            <span className="block px-3 py-2 text-[12px] font-semibold text-tb">원본 열기</span>
          </a>
        ) : (
          <div className="grid aspect-[1.75] place-items-center rounded-xl bg-tg text-[13px] font-medium text-tx-3">첨부한 명함이 없습니다</div>
        )}
      </div>
    </div>
  );
}
