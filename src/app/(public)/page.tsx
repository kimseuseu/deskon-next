import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import DivisionIndex from "@/components/home/DivisionIndex";
import Brands from "@/components/home/Brands";
import Stats from "@/components/home/Stats";
import LandingPair from "@/components/home/LandingPair";
import HomeIntro from "@/components/home/HomeIntro";
import ContactCTA from "@/components/home/ContactCTA";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "아오보",
  alternateName: ["AOVO", "AOVO Group", "아오보 그룹"],
  url: "https://www.aovo.kr/",
};

/**
 * 홈. 스크롤로 읽는 그룹 포털. 급배수 스토리와 다른 문법이고, 장면마다 들어오는 방식이 다릅니다.
 *   1. 첫 장면    풀페이지 영상. 스크롤하면 세 편이 차례로 바뀌고 끝에 어두워진다.
 *   2. 선언       둥근 흰 판이 어두운 첫 장면 위로 밀려 올라오고, 명세서의 세 줄이 지워지며 합계가 0원에 선다.
 *   3. 설비 랜딩  급배수와 가스기기 카드 둘이 양옆에서 들어온다.
 *   4. 다섯 분야  머리 밑의 선이 그어지고, 카드가 헤더 밑에 붙어 차례로 덮인다.
 *   5. 여섯 브랜드 카드가 작은 데서 커지며 차례로 선다.
 *   6. 숫자       어두운 띠 위의 장부. 줄마다 선이 그어지고 숫자가 센다.
 *   7. 아오보는   회사를 한 문단의 사실 문장으로 말하고, 여섯 곳으로 가는 문을 둔다.
 *   8. 맺음       제목이 줄 단위로 가려졌다 올라온다.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Hero />
      <Manifesto />
      <LandingPair />
      <DivisionIndex />
      <Brands />
      <Stats />
      <HomeIntro />
      <ContactCTA />
    </>
  );
}
