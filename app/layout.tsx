import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ShirtIcon, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartIcon from "@/assets/icons/carrito-de-compras.png";
import RhinoIcon from "@/assets/icons/rhino-logo.png";

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
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src={RhinoIcon}
                  alt="Rhino Legacy"
                  width={60}
                  height={60}
                />
                <span className="text-2xl font-bold text-gray-900">
                  Rhino Legacy
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      href="/products"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Image src={CartIcon} alt="Cart" width={24} height={24} />
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/products"
                      className="text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      Products
                    </Link>
                    <Link
                      href="/cart"
                      className="text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      Cart
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <p className="text-center text-gray-500">
                &copy; 2024 Rhino Legacy. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
