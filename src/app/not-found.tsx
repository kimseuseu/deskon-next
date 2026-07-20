import Link from "next/link";
import Image from "next/image";
import { divisions } from "@/data/divisions";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper px-6">
      {/* Top bar */}
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center lg:px-4">
        <Link href="/" aria-label="AOVO 홈" className="flex items-center gap-2.5">
          <Image
            src="/images/aovo_symbol.svg"
            alt=""
            aria-hidden
            width={435}
            height={540}
            className="h-6 w-auto"
          />
          <Image
            src="/images/aovo_wordmark.svg"
            alt="AOVO"
            width={119}
            height={42}
            className="h-[26px] w-auto"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center pb-24 lg:px-4">
        <p className="eyebrow text-muted">Page Not Found</p>
        <h1 className="mt-6 font-serif text-[clamp(6rem,18vw,13rem)] italic leading-none text-accent-deep/90">
          404
        </h1>
        <h2 className="mt-4 font-paperlogy text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-[-0.01em] text-primary">
          페이지를 찾을 수 없습니다<span className="text-gold">.</span>
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          아래에서 가려던 곳을 다시 찾아보세요.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-primary px-8 py-3.5 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-cream transition-colors duration-400 hover:bg-accent-deep"
          >
            홈으로 돌아가기
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/support/contact"
            className="inline-flex items-center gap-3 border border-primary/25 px-8 py-3.5 font-paperlogy text-[13px] font-semibold tracking-[0.12em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary hover:text-cream"
          >
            문의하기
          </Link>
        </div>

        {/* Division quick index */}
        <nav aria-label="사업분야" className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8">
          {divisions.map((d) => (
            <Link key={d.slug} href={d.href} className="group flex items-baseline gap-2 py-1">
              <span className="font-serif text-[11px] italic text-accent-deep">{d.no}</span>
              <span className="font-paperlogy text-sm font-medium text-muted transition-colors duration-300 group-hover:text-primary">
                {d.nameFull}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
