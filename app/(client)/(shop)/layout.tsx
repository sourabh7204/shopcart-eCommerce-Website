import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, your one-stop shop for all your needs",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Header />

      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </ClerkProvider>
  );
}
