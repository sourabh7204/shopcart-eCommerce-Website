// import type { Metadata } from "next";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { ClerkProvider } from "@clerk/nextjs";

// export const metadata: Metadata = {
//   title: {
//     template: "%s - Shopcart online store",
//     default: "Shopcart online store",
//   },
//   description: "Shopcart online store, Your one stop shop for all your needs",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <div className="flex flex-col px-[50px]">
//         <Header />
//         <main className="flex-1">{children}</main>
//         <Footer />
//       </div>
//     </ClerkProvider>
//   );
// }
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white text-gray-900 min-h-screen flex flex-col">
          {/* Full-width Header */}
          <Header />

          {/* Full-width Main Content */}
          <main className="flex-1 w-full">{children}</main>

          {/* Full-width Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
