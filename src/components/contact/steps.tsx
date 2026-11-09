"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import {
  DURATION_OPTIONS,
  INQUIRY_FIELDS,
  REGION_OPTIONS,
  type InquiryDetails,
  type InquiryDraft,
  type InquiryField,
} from "@/data/inquiry";
import BusinessCardUpload from "./BusinessCardUpload";
import { summaryRows } from "./SummaryCard";
import { Chip, EASE, Field, GroupLabel, OptionCard, Pill, StepHead, Stepper, inputClass, inputErrorClass } from "./ui";

export type Errors = Partial<Record<string, string>>;
export type Patch = (patch: Partial<InquiryDraft>) => void;

interface StepProps {
  draft: InquiryDraft;
  set: Patch;
  errors: Errors;
}

/* ── ① 어떤 일인지 ─────────────────────────────────────────────────────── */
export function FieldStep({ draft, set, errors, onPick }: StepProps & { onPick: (field: InquiryField) => void }) {
  return (
    <>
      <StepHead title="어떤 일을 맡겨 주실 건가요?" lead="분야를 고르면 그 현장에 필요한 것만 여쭤봅니다." />
      {errors.field && (
        <p role="alert" className="mb-4 text-[13px] font-medium text-red-600">
          {errors.field}
        </p>
      )}
      <div role="radiogroup" aria-label="서비스 분야" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INQUIRY_FIELDS.map((f) => (
          <OptionCard
            key={f.slug}
            selected={draft.field === f.slug}
            onSelect={() => {
              set({ field: f.slug });
              onPick(f);
            }}
            mark={f.mark}
            title={f.label}
            titleEn={f.labelEn}
            description={f.description}
          />
        ))}
      </div>
    </>
  );
}

/* ── ② 행사 · 현장 정보 ───────────────────────────────────────────────── */
export function EventStep({ draft, set, errors, field }: StepProps & { field: InquiryField }) {
  return (
    <>
      <StepHead title="어떤 현장인가요?" lead={"모르는 항목은 비워 두셔도 됩니다.\n담당자가 통화로 여쭤봅니다."} />
      <div className="flex flex-col gap-7">
        <Field id="eventName" label="행사 · 현장 이름" error={errors.eventName}>
          <input
            id="eventName"
            type="text"
            value={draft.eventName}
            onChange={(e) => set({ eventName: e.target.value })}
            placeholder="예) 2026 인천 푸드페스타, OO물류센터 2층"
            aria-invalid={Boolean(errors.eventName)}
            aria-describedby={errors.eventName ? "eventName-error" : undefined}
            className={`${inputClass} ${errors.eventName ? inputErrorClass : ""}`}
          />
        </Field>

        <div>
          <GroupLabel error={errors.region}>지역</GroupLabel>
          <div role="radiogroup" aria-label="지역" className="flex flex-wrap gap-2">
            {REGION_OPTIONS.map((o) => (
              <Chip key={o.value} role="radio" selected={draft.region === o.value} onToggle={() => set({ region: o.value })} label={o.label} />
            ))}
          </div>
          <input
            type="text"
            value={draft.place}
            onChange={(e) => set({ place: e.target.value })}
            placeholder="상세 장소 (선택) 예) 송도 달빛축제공원"
            aria-label="상세 장소"
            className={`${inputClass} mt-3`}
          />
        </div>

        <div>
          <GroupLabel optional>일정</GroupLabel>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-tx-3">시작일</span>
              <input type="date" value={draft.start} onChange={(e) => set({ start: e.target.value })} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-tx-3">종료일</span>
              <input type="date" value={draft.end} min={draft.start || undefined} onChange={(e) => set({ end: e.target.value })} className={inputClass} />
            </label>
          </div>
          <div role="radiogroup" aria-label="기간" className="mt-3 flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((o) => (
              <Chip
                key={o.value}
                role="radio"
                selected={draft.duration === o.value}
                onToggle={() => set({ duration: draft.duration === o.value ? "" : o.value })}
                label={o.label}
              />
            ))}
          </div>
        </div>

        {field.scale && (
          <div>
            <GroupLabel error={errors.scale}>{field.scale.label}</GroupLabel>
            <div role="radiogroup" aria-label={field.scale.label} className="flex flex-wrap gap-2">
              {field.scale.options.map((o) => (
                <Chip key={o.value} role="radio" selected={draft.scale === o.value} onToggle={() => set({ scale: o.value })} label={o.label} />
              ))}
            </div>
          </div>
        )}

        {field.count && (
          <div>
            <GroupLabel>{field.count.label}</GroupLabel>
            <Stepper
              value={draft.count ?? field.count.initial}
              onChange={(n) => set({ count: n })}
              min={field.count.min}
              max={field.count.max}
              step={field.count.step}
              unit={field.count.unit}
              label={field.count.label}
            />
          </div>
        )}
      </div>
    </>
  );
}

/* ── ③ 세부 요청 ──────────────────────────────────────────────────────── */
export function DetailsStep({ draft, set, errors, field }: StepProps & { field: InquiryField }) {
  const toggle = (value: string) =>
    set({ options: draft.options.includes(value) ? draft.options.filter((v) => v !== value) : [...draft.options, value] });
  const isOther = field.slug === "other";
  return (
    <>
      <StepHead
        title={isOther ? "무엇을 도와드릴까요?" : "필요한 것을 모두 골라 주세요."}
        lead={isOther ? "문의 성격을 고르고 내용을 적어 주세요." : "여러 개 골라도 됩니다.\n목록에 없는 것은 메모에 적어 주세요."}
      />
      <div className="flex flex-col gap-7">
        <div>
          <GroupLabel error={errors.options}>{field.options.label}</GroupLabel>
          <div role="group" aria-label={field.options.label} className="flex flex-wrap gap-2">
            {field.options.items.map((o) => (
              <Chip key={o.value} selected={draft.options.includes(o.value)} onToggle={() => toggle(o.value)} label={o.label} hint={o.hint} />
            ))}
          </div>
        </div>
        <Field id="memo" label="메모" optional={!isOther} error={errors.memo} hint={isOther ? undefined : "현장 사진이 있다면 통화 때 카카오 채널로 보내 주셔도 됩니다."}>
          <textarea
            id="memo"
            rows={5}
            value={draft.memo}
            onChange={(e) => set({ memo: e.target.value })}
            placeholder={field.memoPlaceholder}
            maxLength={2000}
            aria-invalid={Boolean(errors.memo)}
            className={`${inputClass} resize-none ${errors.memo ? inputErrorClass : ""}`}
          />
        </Field>
      </div>
    </>
  );
}

/* ── ④ 연락처 + 명함 ──────────────────────────────────────────────────── */
export function ContactStep({ draft, set, errors, onUploadingChange }: StepProps & { onUploadingChange: (u: boolean) => void }) {
  const reduce = useReducedMotion();
  const fromCard = draft.contactFromCard && Boolean(draft.businessCard);
  return (
    <>
      <StepHead title="어디로 연락드릴까요?" lead={"전화번호는 꼭 필요합니다.\n명함을 올리면 이름과 회사는 건너뛰어도 됩니다."} />
      <div className="flex flex-col gap-7">
        <Field id="phone" label="전화번호" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="010-0000-0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
          />
        </Field>

        <div>
          <GroupLabel optional>명함</GroupLabel>
          <BusinessCardUpload value={draft.businessCard} onChange={(card) => set({ businessCard: card, contactFromCard: card ? draft.contactFromCard : false })} onUploadingChange={onUploadingChange} />
          <AnimatePresence initial={false}>
            {draft.businessCard && (
              <motion.label
                key="fromCard"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.22, ease: EASE }}
                className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl bg-tb-soft px-5 py-4"
              >
                <input
                  type="checkbox"
                  checked={draft.contactFromCard}
                  onChange={(e) => set({ contactFromCard: e.target.checked })}
                  className="h-5 w-5 shrink-0 rounded accent-tb"
                />
                <span className="text-[14px] font-semibold text-tx">이름과 회사는 명함에서 확인해 주세요</span>
              </motion.label>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="name" label="이름" error={errors.name}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={fromCard ? "" : draft.name}
              disabled={fromCard}
              onChange={(e) => set({ name: e.target.value })}
              placeholder={fromCard ? "명함에서 확인" : "홍길동"}
              aria-invalid={Boolean(errors.name)}
              className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
            />
          </Field>
          <Field id="company" label="회사 · 단체" error={errors.company}>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={fromCard ? "" : draft.company}
              disabled={fromCard}
              onChange={(e) => set({ company: e.target.value })}
              placeholder={fromCard ? "명함에서 확인" : "(주)회사명"}
              aria-invalid={Boolean(errors.company)}
              className={`${inputClass} ${errors.company ? inputErrorClass : ""}`}
            />
          </Field>
        </div>

        <Field id="email" label="이메일" optional error={errors.email} hint="견적서를 메일로 받고 싶으시면 적어 주세요.">
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={draft.email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="email@company.com"
            aria-invalid={Boolean(errors.email)}
            className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
          />
        </Field>

        <div>
          <label className={`flex cursor-pointer items-start gap-3 rounded-2xl px-5 py-4 transition-colors duration-200 ${errors.privacy ? "bg-red-50" : "bg-tg"}`}>
            <input
              type="checkbox"
              checked={draft.privacyAgreed}
              onChange={(e) => set({ privacyAgreed: e.target.checked })}
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-tb"
              aria-invalid={Boolean(errors.privacy)}
            />
            <span className="text-[14px] font-medium leading-relaxed text-tx-2">
              개인정보 수집과 이용에 동의합니다.
              <br />
              수집한 정보와 명함은 견적 상담에만 쓰고, 상담이 끝나면 지체 없이 지웁니다.
            </span>
          </label>
          {errors.privacy && (
            <p role="alert" className="mt-2 text-[13px] font-medium text-red-600">
              {errors.privacy}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* ── ⑤ 확인 ───────────────────────────────────────────────────────────── */
export function ReviewStep({
  details,
  draft,
  onEdit,
}: {
  details: InquiryDetails | null;
  draft: InquiryDraft;
  onEdit: (stepKey: string) => void;
}) {
  const rows = summaryRows(details, draft);
  const groups: { key: string; title: string; labels: string[] }[] = [
    { key: "field", title: "분야", labels: ["분야"] },
    { key: "event", title: "현장", labels: ["행사 · 현장", "장소", "일정", details?.event.scale?.label ?? "", details?.event.count?.label ?? ""] },
    { key: "details", title: "요청", labels: ["요청 항목"] },
    { key: "contact", title: "연락처", labels: ["연락처", "이메일", "명함"] },
  ].filter((g) => g.key !== "event" || details?.field.slug !== "other");

  return (
    <>
      <StepHead title="이대로 보낼까요?" lead="고친 곳이 있으면 «수정»을 눌러 돌아갑니다." />
      <div className="flex flex-col gap-3">
        {groups.map((g) => {
          const groupRows = rows.filter((r) => g.labels.includes(r.label));
          return (
            <section key={g.key} className="rounded-[20px] bg-tg p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-tx">{g.title}</h3>
                <button
                  type="button"
                  onClick={() => onEdit(g.key)}
                  className="rounded-full px-3 py-1.5 text-[13px] font-semibold text-tb transition-colors duration-200 hover:bg-white"
                >
                  수정
                </button>
              </div>
              {groupRows.length === 0 ? (
                <p className="mt-2 text-[14px] font-medium text-tx-3">적은 내용이 없습니다.</p>
              ) : (
                <dl className="mt-3 flex flex-col gap-2">
                  {groupRows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-4">
                      <dt className="shrink-0 text-[13px] font-medium text-tx-3">{r.label}</dt>
                      <dd className="text-right text-[14px] font-semibold leading-[1.5] text-tx">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {g.key === "details" && details?.memo && (
                <p className="mt-3 whitespace-pre-line rounded-2xl bg-white px-4 py-3 text-[14px] font-medium leading-[1.6] text-tx-2">{details.memo}</p>
              )}
              {g.key === "contact" && draft.businessCard && (
                <div className="mt-3 w-40 overflow-hidden rounded-xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary 주소, 작은 썸네일 */}
                  <img src={draft.businessCard.url} alt="첨부한 명함" className="aspect-[1.75] w-full object-cover" />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}

/* ── 완료 ─────────────────────────────────────────────────────────────── */
export function DoneScreen({ details, draft, onReset }: { details: InquiryDetails | null; draft: InquiryDraft; onReset: () => void }) {
  const rows = summaryRows(details, draft).filter((r) => r.label !== "명함");
  return (
    <div className="px-1 py-4 text-center sm:px-6 sm:py-8">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-tb-soft">
        <svg className="h-10 w-10 text-tb" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            style={{ strokeDasharray: 24, strokeDashoffset: 0, animation: "checkDraw 0.6s ease-out forwards" }}
          />
        </svg>
      </div>
      <h2 className="mt-6 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.25] tracking-[-0.03em] text-tx">견적 요청을 받았습니다</h2>
      <p className="mt-3 whitespace-pre-line text-[16px] font-medium leading-[1.7] text-tx-2">
        {`담당자가 확인하는 대로 ${draft.phone.trim()}으로 연락드립니다.\n보통 24시간 안에 견적을 보내드립니다.`}
      </p>

      {rows.length > 0 && (
        <dl className="mx-auto mt-8 max-w-md divide-y divide-tg-2 rounded-[20px] bg-tg px-5 text-left">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="shrink-0 text-[13px] font-medium text-tx-3">{r.label}</dt>
              <dd className="text-right text-[14px] font-semibold leading-[1.5] text-tx">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Pill href={`tel:${COMPANY.phone}`} className="w-full sm:w-auto">
          지금 전화하기 {COMPANY.phone}
        </Pill>
        <Pill variant="ghost" onClick={onReset} className="w-full sm:w-auto">
          새 문의 작성
        </Pill>
      </div>
    </div>
  );
}
