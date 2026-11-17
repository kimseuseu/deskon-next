"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  EMPTY_DRAFT,
  INQUIRY_FIELD_MAP,
  QUOTE_INQUIRY_TYPE,
  buildInquiryDetails,
  type InquiryDraft,
  type InquiryField,
} from "@/data/inquiry";
import StepIndicator, { type StepMeta } from "./StepIndicator";
import SummaryCard from "./SummaryCard";
import { ContactStep, DetailsStep, DoneScreen, EventStep, FieldStep, ReviewStep, type Errors } from "./steps";
import { EASE, Pill } from "./ui";

/*
  단계형 견적 문의. 분야 → 현장 → 요청 → 연락처 → 확인 → 완료.
  «기타 문의»는 현장 단계를 건너뜁니다. 단계는 앞뒤 방향이 있는 슬라이드로 바뀌고,
  오른쪽 요청서(넓은 화면)가 고르는 대로 채워집니다.
*/

const ALL_STEPS: StepMeta[] = [
  { key: "field", label: "분야" },
  { key: "event", label: "현장 정보" },
  { key: "details", label: "세부 요청" },
  { key: "contact", label: "연락처" },
  { key: "review", label: "확인" },
];

const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(stepKey: string, draft: InquiryDraft, field: InquiryField | null): Errors {
  const e: Errors = {};
  switch (stepKey) {
    case "field":
      if (!draft.field) e.field = "분야를 하나 골라 주세요.";
      break;
    case "event":
      if (!draft.eventName.trim()) e.eventName = "행사나 현장 이름을 적어 주세요. 가칭도 괜찮습니다.";
      if (!draft.region) e.region = "지역을 골라 주세요.";
      if (field?.scale && !draft.scale) e.scale = "하나 골라 주세요.";
      break;
    case "details":
      if (field?.slug === "other") {
        if (!draft.memo.trim()) e.memo = "문의 내용을 적어 주세요.";
      } else if (draft.options.length === 0 && !draft.memo.trim()) {
        e.options = "하나 이상 고르거나 메모를 적어 주세요.";
      }
      break;
    case "contact": {
      const phone = draft.phone.replace(/\s/g, "");
      if (!phone) e.phone = "연락받을 전화번호를 적어 주세요.";
      else if (!PHONE_RE.test(phone)) e.phone = "전화번호 형식을 확인해 주세요. 예) 010-1234-5678";
      const fromCard = draft.contactFromCard && Boolean(draft.businessCard);
      if (!fromCard) {
        if (!draft.name.trim()) e.name = "이름을 적어 주세요.";
        if (!draft.company.trim()) e.company = "회사나 단체 이름을 적어 주세요.";
      }
      if (draft.email.trim() && !EMAIL_RE.test(draft.email.trim())) e.email = "이메일 형식을 확인해 주세요.";
      if (!draft.privacyAgreed) e.privacy = "개인정보 수집과 이용에 동의해 주세요.";
      break;
    }
  }
  return e;
}

type Status = "idle" | "submitting" | "error" | "done";

export default function QuoteWizard() {
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_DRAFT);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(0);

  const field = draft.field ? INQUIRY_FIELD_MAP[draft.field] : null;
  const steps = useMemo(() => (field?.slug === "other" ? ALL_STEPS.filter((s) => s.key !== "event") : ALL_STEPS), [field]);
  const stepKey = steps[index]?.key ?? "field";
  const details = useMemo(() => buildInquiryDetails(draft), [draft]);

  const set = useCallback((patch: Partial<InquiryDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    /* 고치는 즉시 그 칸의 오류는 지웁니다. */
    setErrors((prev) => {
      if (Object.keys(prev).length === 0) return prev;
      const next = { ...prev };
      for (const k of Object.keys(patch)) {
        delete next[k];
        if (k === "privacyAgreed") delete next.privacy;
        if (k === "options" || k === "memo") {
          delete next.options;
          delete next.memo;
        }
      }
      return next;
    });
  }, []);

  /* 분야를 바꾸면 그 분야에 맞는 기본값으로 현장·요청 항목을 되돌립니다. 연락처는 둡니다. */
  const onPickField = (f: InquiryField) => {
    setDraft((d) =>
      d.field === f.slug
        ? d
        : { ...d, field: f.slug, scale: "", count: f.count ? f.count.initial : null, options: [] }
    );
    setErrors({});
  };

  /* 단계가 바뀌면 카드 머리가 보이게 올립니다. */
  useEffect(() => {
    if (prevIndex.current === index) return;
    prevIndex.current = index;
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 72 || top > window.innerHeight * 0.5) {
      window.scrollTo({ top: window.scrollY + top - 96, behavior: reduce ? "auto" : "smooth" });
    }
  }, [index, reduce]);

  const go = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(Math.max(0, Math.min(steps.length - 1, next)));
  };

  const handleNext = () => {
    const e = validate(stepKey, draft, field);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    if (stepKey === "review") {
      void submit();
      return;
    }
    go(index + 1, 1);
  };

  const handleBack = () => go(index - 1, -1);

  const jumpTo = (key: string) => {
    const i = steps.findIndex((s) => s.key === key);
    if (i >= 0) go(i, i < index ? -1 : 1);
  };

  const submit = async () => {
    if (!details || !field) return;
    setStatus("submitting");
    setSubmitError(null);
    const fromCard = draft.contactFromCard && Boolean(draft.businessCard);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fromCard ? "명함 확인" : draft.name.trim(),
          company: fromCard ? "" : draft.company.trim(),
          phone: draft.phone.trim(),
          email: draft.email.trim(),
          inquiry_type: QUOTE_INQUIRY_TYPE,
          service_category: field.slug,
          message: draft.memo.trim(),
          details,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "문의를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
      setStatus("done");
      requestAnimationFrame(() => {
        const el = cardRef.current;
        if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 120, behavior: reduce ? "auto" : "smooth" });
      });
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "문의를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setSubmitError(null);
    setStatus("idle");
    setDirection(-1);
    setIndex(0);
  };

  const panelVariants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 36 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.26, ease: EASE } },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -24, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as [number, number, number, number] } }),
  };

  const isLast = stepKey === "review";
  const nextDisabled = status === "submitting" || (stepKey === "contact" && uploading);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
      <div ref={cardRef} className="rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(25,31,40,0.06)] sm:p-8 lg:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? (
            <motion.div
              key="done"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <DoneScreen details={details} draft={draft} onReset={reset} />
            </motion.div>
          ) : (
            <motion.div key="form" initial={false} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <StepIndicator steps={steps} current={index} onJump={(i) => go(i, -1)} />

              <div className="mt-8 min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div key={stepKey} custom={direction} variants={panelVariants} initial="enter" animate="center" exit="exit">
                    {stepKey === "field" && <FieldStep draft={draft} set={set} errors={errors} onPick={onPickField} />}
                    {stepKey === "event" && field && <EventStep draft={draft} set={set} errors={errors} field={field} />}
                    {stepKey === "details" && field && <DetailsStep draft={draft} set={set} errors={errors} field={field} />}
                    {stepKey === "contact" && <ContactStep draft={draft} set={set} errors={errors} onUploadingChange={setUploading} />}
                    {stepKey === "review" && <ReviewStep details={details} draft={draft} onEdit={jumpTo} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence initial={false}>
                {submitError && (
                  <motion.div
                    key="submit-error"
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-[14px] font-medium text-red-700"
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-3 border-t border-tg-2 pt-6">
                {index > 0 && (
                  <Pill variant="ghost" onClick={handleBack} disabled={status === "submitting"}>
                    이전
                  </Pill>
                )}
                <Pill onClick={handleNext} disabled={nextDisabled} className="flex-1 sm:flex-none sm:min-w-[11rem]">
                  {status === "submitting" ? "보내는 중" : isLast ? "견적 요청 보내기" : stepKey === "contact" && uploading ? "명함 올리는 중" : "다음"}
                  {!isLast && status !== "submitting" && !(stepKey === "contact" && uploading) && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    </svg>
                  )}
                </Pill>
                <span className="ml-auto hidden text-[13px] font-medium tabular-nums text-tx-3 sm:inline">
                  {index + 1} / {steps.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:sticky lg:top-24 lg:block">
        <SummaryCard details={details} draft={draft} />
      </div>
    </div>
  );
}
