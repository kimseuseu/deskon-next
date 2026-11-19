import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";
import { FaqList, type Faq } from "@/components/support/FaqList";
import { createAdminClient } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "자주 묻는 질문 · 구독 · 렌탈 · 배송 · 견적",
  description:
    "아오보 구독과 렌탈의 차이, 최소 계약 기간, 장비 고장 대응, 배송 지역, 견적 받는 방법, 쓰던 장비 매입까지. 아오보에 자주 들어오는 질문과 답을 모았습니다.",
  alternates: { canonical: "/support/faq" },
};

/* 서버에서 그립니다. 예전에는 화면이 열린 뒤 /api/faqs 를 불러서 검색 로봇이 받는 첫 문서에 질문과 답이 없었습니다.
   5분마다 다시 읽고, 관리자가 고치면 /api/faqs 가 이 페이지를 바로 갱신합니다. */
export const revalidate = 300;

async function getFaqs(): Promise<Faq[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const { data, error } = await createAdminClient()
      .from("deskon_faqs")
      .select("id, question, answer")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("[faq] fetch failed", error);
      return [];
    }
    return (data ?? []) as Faq[];
  } catch (err) {
    console.error("[faq] fetch failed", err);
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <PageHero eyebrow="FAQ" title="자주 묻는 질문" description="아오보에 자주 들어오는 질문과 답입니다." />

      <section className="bg-white text-tx">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:py-36">
          {faqs.length === 0 ? (
            <p className="rounded-[24px] bg-tg py-20 text-center text-[15px] font-medium text-tx-3">등록된 질문이 아직 없습니다.</p>
          ) : (
            <FaqList faqs={faqs} />
          )}

          <Reveal className="mt-16 text-center">
            <p className="text-[17px] font-medium text-tx-2">원하는 답변을 찾지 못하셨나요?</p>
            <Link
              href="/support/contact"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98]"
            >
              직접 문의하기
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
