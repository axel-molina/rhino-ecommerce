"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
// Services
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
// Models
import { Product } from "@/models/interfaces/Product.interface";
import { limitCharacters } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const ProductsGrid = () => {
  const { result: featuredProducts, loading } = useGetFeaturedProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Remeras Rhino
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link href={`/detalles/${product.slug}`}>
              <div className="h-64 relative overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  width={400}
                  height={400}
                />
              </div>
            </Link>
            <div className="p-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {limitCharacters(product?.productName, 29)}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent>{product?.productName}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-lg font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href={`/detalles/${product.slug}`}>Ver</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
