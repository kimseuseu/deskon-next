import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Header />
      <ScrollProgress />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </SmoothScroll>
  );
}
