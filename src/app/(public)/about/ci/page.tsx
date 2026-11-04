import Image from "next/image";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";

const brandColors = [
  { name: "Primary", hex: "#0a0a0f", desc: "브랜드의 신뢰감과 전문성을 상징합니다.", textLight: true },
  { name: "Accent", hex: "#b8977e", desc: "따뜻한 프리미엄 감성을 전달합니다.", textLight: true },
  { name: "Gold", hex: "#c8a96a", desc: "품격과 가치를 나타냅니다.", textLight: true },
  { name: "Cream", hex: "#fafaf8", desc: "깨끗하고 정돈된 배경을 제공합니다.", textLight: false },
];

const brandValues = [
  { title: "효율", desc: "불필요한 비용 없이, 꼭 필요한 만큼만" },
  { title: "신뢰", desc: "10년 이상의 장비 운영 노하우" },
  { title: "지속", desc: "순환경제를 통한 지속가능한 비즈니스" },
  { title: "혁신", desc: "소유에서 운영으로, 패러다임 전환" },
];

const SECTION_TITLE = "text-[clamp(1.75rem,3.6vw,2.9rem)] font-bold leading-[1.25] tracking-[-0.03em] text-balance";
const CAPTION = "mt-5 text-[13px] font-semibold";
const SPECIMEN_CARD = "rounded-[24px] bg-tg p-7 lg:p-8";
const SPECIMEN_LABEL = "inline-flex rounded-full bg-tb-soft px-3 py-1 text-[13px] font-semibold text-tb";

export default function CIPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Brand Identity"
        title="CI 소개"
        description="AOVO 브랜드의 시각적 아이덴티티를 소개합니다."
      />

      {/* Symbol Mark */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>심볼 마크</h2>
          </Reveal>

          <Stagger className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2 lg:mt-16" gap={0.1}>
            <StaggerItem className="flex min-h-[260px] flex-col items-center justify-center rounded-[28px] bg-tg p-10">
              <Image src="/images/ex_aovo_symbol.png" alt="AOVO 심볼 마크" width={120} height={120} />
              <p className={`${CAPTION} text-tx-3`}>Symbol Mark</p>
            </StaggerItem>
            <StaggerItem className="flex min-h-[260px] flex-col items-center justify-center rounded-[28px] bg-tk p-10">
              <Image src="/images/ex_aovo_symbol.png" alt="AOVO 심볼 마크 화이트" width={120} height={120} className="brightness-0 invert" />
              <p className={`${CAPTION} text-white/60`}>Symbol Mark (Dark BG)</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Logo */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>로고</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            <StaggerItem className="flex min-h-[250px] flex-col items-center justify-center rounded-[28px] bg-white p-10 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
              <Image src="/images/aovologo.png" alt="AOVO 로고 컬러" width={240} height={80} className="object-contain" />
              <p className={`${CAPTION} text-tx-3`}>Color Logo</p>
            </StaggerItem>
            <StaggerItem className="flex min-h-[250px] flex-col items-center justify-center rounded-[28px] bg-white p-10 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
              <Image src="/images/aovologo_black.png" alt="AOVO 로고 블랙" width={240} height={80} className="object-contain" />
              <p className={`${CAPTION} text-tx-3`}>Black Logo (Light BG)</p>
            </StaggerItem>
            <StaggerItem className="flex min-h-[250px] flex-col items-center justify-center rounded-[28px] bg-tk p-10">
              <Image src="/images/aovologo_white.png" alt="AOVO 로고 화이트" width={240} height={80} className="object-contain" />
              <p className={`${CAPTION} text-white/60`}>White Logo (Dark BG)</p>
            </StaggerItem>
          </Stagger>

          {/* Text Logos */}
          <Stagger className="mt-4 grid gap-4 md:grid-cols-2" gap={0.1}>
            <StaggerItem className="flex min-h-[200px] flex-col items-center justify-center rounded-[28px] bg-white p-10 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
              <Image src="/images/aovo_text.png" alt="AOVO 텍스트 로고" width={200} height={60} className="object-contain" />
              <p className={`${CAPTION} text-tx-3`}>Text Logo</p>
            </StaggerItem>
            <StaggerItem className="flex min-h-[200px] flex-col items-center justify-center rounded-[28px] bg-white p-10 shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
              <Image src="/images/aovo_text_thin.png" alt="AOVO 텍스트 로고 (Thin)" width={200} height={60} className="object-contain" />
              <p className={`${CAPTION} text-tx-3`}>Text Logo (Thin)</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CI Examples */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>CI 활용 예시</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            {[1, 2, 3].map((n) => (
              <StaggerItem key={n}>
                <figure className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] bg-tg">
                  <Image src={`/images/ci${n}.png`} alt={`AOVO CI 활용 예시 ${n}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>브랜드 컬러</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.1}>
            {brandColors.map((color) => (
              <StaggerItem key={color.name} className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <div className="flex h-32 items-end p-5" style={{ backgroundColor: color.hex }}>
                  <span className={`text-[13px] font-semibold ${color.textLight ? "text-white/80" : "text-tx-3"}`}>{color.hex}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[18px] font-bold">{color.name}</h3>
                  <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-tx-2">{color.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-white text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>타이포그래피</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" gap={0.1}>
            <StaggerItem className={SPECIMEN_CARD}>
              <span className={SPECIMEN_LABEL}>Logo Typeface</span>
              <h3 style={{ fontFamily: "var(--font-syne), sans-serif" }} className="mt-5 text-[48px] font-bold leading-none text-tx">
                Syne
              </h3>
              <p style={{ fontFamily: "var(--font-syne), sans-serif" }} className="mt-3 text-[20px] font-semibold tracking-wider text-tx-2">
                AOVO
              </p>
              <p className="mt-4 text-[14px] font-medium leading-relaxed text-tx-2">텍스트 로고에 사용되는 메인 서체입니다.</p>
            </StaggerItem>
            <StaggerItem className={SPECIMEN_CARD}>
              <span className={SPECIMEN_LABEL}>Primary Display</span>
              <h3 className="mt-5 text-[48px] font-bold leading-none tracking-[-0.03em] text-tx">Paperlogy</h3>
              <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-tx-2">비즈니스 자산 통합 운영 플랫폼</p>
              <p className="mt-4 text-[14px] font-medium leading-relaxed text-tx-2">헤드라인, 타이틀, 강조 텍스트에 사용됩니다.</p>
            </StaggerItem>
            <StaggerItem className={SPECIMEN_CARD}>
              <span className={SPECIMEN_LABEL}>Body Text</span>
              <h3 className="mt-5 text-[48px] font-bold leading-none tracking-[-0.03em] text-tx">Noto Sans KR</h3>
              <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-tx-2">본문 텍스트와 UI 요소에 활용됩니다.</p>
              <p className="mt-4 text-[14px] font-medium leading-relaxed text-tx-2">가독성을 최우선으로 선택된 서체입니다.</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Brand Values */}
      <section className="bg-tg text-tx">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
          <Reveal className="text-center">
            <h2 className={SECTION_TITLE}>브랜드 가치</h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" gap={0.1}>
            {brandValues.map((val) => (
              <StaggerItem key={val.title} className="rounded-[28px] bg-white p-7 text-center shadow-[0_12px_40px_rgba(25,31,40,0.06)]">
                <h3 className="text-[22px] font-bold tracking-[-0.02em] text-tb">{val.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-tx-2">{val.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
