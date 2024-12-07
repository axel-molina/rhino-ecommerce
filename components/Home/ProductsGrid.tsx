/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Models
import { Product } from "@/models/interfaces/Product.interface";
// Utils
import { limitCharacters } from "@/lib/utils";
// Components
import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
// Store
import useProductsStore from "@/store/useProducts.store";

export const ProductsGrid = () => {
  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts(1, 10);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p>Error al cargar los productos</p>
      </div>
    );
  }
  if (products.length === 0)
    return (
      <div className="flex justify-center items-center mt-10">
        <p>No hay productos disponibles</p>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Remeras Rhino
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products &&
          products?.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link href={`/detalles/${product.id}`}>
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
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
                        {limitCharacters(product?.name, 29)}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent>{product?.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-lg font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href={`/detalles/${product.id}`}>Ver</Link>
                </Button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
