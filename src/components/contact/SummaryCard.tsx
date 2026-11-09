"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { summarizeDetails, type InquiryDetails, type InquiryDraft } from "@/data/inquiry";
import { EASE } from "./ui";

/**
 * 오른쪽에 붙어 따라오는 «요청서». 고를 때마다 줄이 하나씩 자리를 잡습니다.
 * 확인 단계와 완료 화면도 같은 줄 목록을 씁니다(rows).
 */
export function summaryRows(details: InquiryDetails | null, draft: InquiryDraft) {
  const rows = details ? summarizeDetails(details) : [];
  if (draft.phone.trim()) {
    rows.push({
      label: "연락처",
      value: draft.contactFromCard
        ? `${draft.phone} (이름·회사는 명함에서)`
        : [draft.name.trim(), draft.company.trim(), draft.phone.trim()].filter(Boolean).join(" / "),
    });
  }
  if (draft.email.trim()) rows.push({ label: "이메일", value: draft.email.trim() });
  if (draft.businessCard) rows.push({ label: "명함", value: "첨부함" });
  return rows;
}

export default function SummaryCard({ details, draft }: { details: InquiryDetails | null; draft: InquiryDraft }) {
  const reduce = useReducedMotion();
  const rows = summaryRows(details, draft);
  const memo = details?.memo;

  return (
    <aside className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[18px] font-bold tracking-[-0.02em] text-tx">요청서</h3>
        <span className="text-[12px] font-medium text-tx-3">고르는 대로 채워집니다</span>
      </div>

      <motion.dl layout className="mt-5 flex flex-col divide-y divide-tg-2">
        <AnimatePresence initial={false}>
          {rows.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="py-6 text-center text-[14px] font-medium text-tx-3"
            >
              아직 고른 항목이 없습니다.
            </motion.div>
          )}
          {rows.map((row) => (
            <motion.div
              key={row.label}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.24, ease: EASE }}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <dt className="shrink-0 text-[13px] font-medium text-tx-3">{row.label}</dt>
              <dd className="text-right text-[14px] font-semibold leading-[1.5] text-tx">{row.value}</dd>
            </motion.div>
          ))}
          {memo && (
            <motion.div
              key="memo"
              layout={!reduce}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="py-3"
            >
              <dt className="text-[13px] font-medium text-tx-3">메모</dt>
              <dd className="mt-1 whitespace-pre-line text-[14px] font-medium leading-[1.6] text-tx-2">{memo}</dd>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.dl>

      <div className="mt-6 rounded-[20px] bg-tg px-5 py-4">
        <p className="text-[13px] font-medium text-tx-3">급하신가요</p>
        <a href={`tel:${COMPANY.phone}`} className="mt-0.5 block text-[18px] font-bold tracking-[-0.02em] text-tx transition-colors hover:text-tb">
          {COMPANY.phone}
        </a>
        <p className="mt-0.5 text-[12px] font-medium text-tx-3">평일 09:00 - 18:00</p>
      </div>
    </aside>
  );
}
