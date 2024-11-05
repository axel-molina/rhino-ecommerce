import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rhino Legacy - Sin excusas!",
  description:
    "Ecommerce de remeras Rhino Legacy. ¡Disfruta de nuestra oferta de t-shirts únicos y cómodos que reflejan tu personalidad!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />
          {/* Main */}
          <main className="flex-grow">{children}</main>
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
