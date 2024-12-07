/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import Image from "next/image";
import { SheetContent, Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
// Assets
import LikeIcon from "@/assets/icons/me-gusta.png";
import CartIcon from "@/assets/icons/carrito-de-compras.png";
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://t3.ftcdn.net/jpg/04/37/20/96/360_F_437209681_ZiV2FR8HuWgio4FOuKgVdynNWTcKlHtB.jpg"
            alt="Rhino Legacy"
            width={60}
            height={60}
          />
          <span className="text-2xl font-bold text-gray-900">Rhino Legacy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/likes" className="text-gray-600 hover:text-gray-900">
                <Image src={LikeIcon} alt="Cart" width={24} height={24} />
              </Link>
            </li>
            <li>
              <Link
                href="/carrito"
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
                href="/likes"
                className="text-lg font-medium text-gray-600 hover:text-gray-900"
              >
                Me gusta
              </Link>
              <Link
                href="/carrito"
                className="text-lg font-medium text-gray-600 hover:text-gray-900"
              >
                Carrito
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
