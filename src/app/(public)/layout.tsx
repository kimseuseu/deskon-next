import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ScrollProgress />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
      <CartDrawer />
    </>
  );
}
