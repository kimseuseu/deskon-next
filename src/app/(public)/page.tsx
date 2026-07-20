import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Manifesto from "@/components/home/Manifesto";
import DivisionIndex from "@/components/home/DivisionIndex";
import Brands from "@/components/home/Brands";
import Stats from "@/components/home/Stats";
import BrandStrip from "@/components/home/BrandStrip";
import ContactCTA from "@/components/home/ContactCTA";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "아오보",
  alternateName: ["AOVO", "AOVO Group", "아오보 그룹"],
  url: "https://www.aovo.kr/",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <Marquee />
      <Manifesto />
      <DivisionIndex />
      <Brands />
      <Stats />
      <BrandStrip />
      <ContactCTA />
    </>
  );
}
