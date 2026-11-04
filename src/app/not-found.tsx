import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { divisions } from "@/data/divisions";

/** 404. 흰 바탕 가운데에 큰 숫자, 한 줄 설명, 알약 버튼 둘, 분야 알약 다섯. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white px-6 text-tx">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center lg:px-4">
        <Logo size="md" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="text-[clamp(5rem,16vw,11rem)] font-bold leading-none tracking-[-0.05em] text-tb">404</p>
        <h1 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em]">페이지를 찾을 수 없습니다.</h1>
        <p className="mt-4 max-w-md whitespace-pre-line text-[17px] font-medium leading-[1.7] text-tx-2">
          {"요청하신 페이지가 없거나 옮겨졌을 수 있습니다.\n아래에서 가려던 곳을 다시 찾아보세요."}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full bg-tb px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-tb-deep active:scale-[0.98] sm:w-auto"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/support/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-tg px-7 py-3.5 text-[16px] font-semibold text-tx transition-colors duration-200 hover:bg-tg-2 active:scale-[0.98] sm:w-auto"
          >
            상담 문의하기
          </Link>
        </div>

        <nav aria-label="사업분야" className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={d.href}
              className="rounded-full bg-tg px-4 py-2 text-[14px] font-semibold text-tx-2 transition-colors duration-200 hover:bg-tb-soft hover:text-tb"
            >
              {d.nameFull}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
