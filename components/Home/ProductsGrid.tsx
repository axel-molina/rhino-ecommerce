"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// Services
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";

// Interfaces para las imágenes
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageFormats {
  large?: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interface para la categoría
interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interface para los tamaños
interface Size {
  id: number;
  documentId: string;
  talle: string;
  Medidas: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Interface para un producto
interface Product {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  stock: number;
  price: number;
  color: string;
  isFeatured: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: Image[];
  category: Category;
  sizes: Size[];
}

// Interface para la paginación
interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Interface para la respuesta completa de la API
interface ApiResponse {
  data: Product[];
  meta: {
    pagination: Pagination;
  };
}

export const ProductsGrid = () => {
  const { result: featuredProducts, loading } = useGetFeaturedProducts();

  console.log(featuredProducts);

  if (loading) {
    return <div>Loading...</div>;
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
            <Link href={`/products/${product.id}`}>
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
              <h3 className="text-lg font-semibold text-gray-900">
                {product.productName}
              </h3>
              <p className="text-lg font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href={`/products/${product.id}`}>Ver</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
