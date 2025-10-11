import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Shopcart online store",
  description: "Shopcart online store, your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-poppins antialiased">
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
