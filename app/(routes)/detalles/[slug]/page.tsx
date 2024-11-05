"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetProductBySlug } from "@/api/getProductBySlug";
import { Spinner } from "@/components/ui/spinner";
import { Size } from "@/models/interfaces/Size.interface";

export default function Details() {
  const params = useParams();
  const { slug } = params;

  const { result: product, loading, error } = useGetProductBySlug(slug);

  const router = useRouter();
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentQuantity = Number(e.target.value);
    if (!size) {
      alert("Primero elija un talle");
      return;
    }
    if (currentQuantity > size.stock) {
      alert("No hay stock disponible");
    } else {
      setQuantity(currentQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    // Here you would typically add the item to a cart state or context
    // For now, we'll just simulate it by navigating to the cart page
    alert(`Added ${quantity} ${product.name}(s) in size ${size} to cart!`);
    router.push("/cart");
  };

  useEffect(() => {
    setQuantity(1);
  }, [size]);

  const content = loading ? (
    <Spinner />
  ) : error ? (
    "Error"
  ) : !product || product.length === 0 ? (
    "Product not found"
  ) : null;

  if (content) {
    return (
      <div className="flex justify-center items-center h-screen">
        {content}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative mr-4">
          <Carousel>
            <CarouselContent>
              {product?.images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                    alt={image.name}
                    className="w-full h-full object-cover aspect-square rounded-xl overflow-hidden bg-gray-100"
                    width={400}
                    height={400}
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.productName}
            </h1>
            <p className="mt-3 text-3xl font-bold text-indigo-600">
              ${product?.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Descripción</h2>
            <p className="mt-2 text-gray-600 text-base leading-relaxed">
              {product?.description}
            </p>
          </div>

          {product?.sizes.length > 0 ? (
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="size"
                      className="text-sm font-medium text-gray-700"
                    >
                      Talle
                    </label>
                    <Select onValueChange={setSize}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar talle" />
                      </SelectTrigger>
                      <SelectContent>
                        {product?.sizes.map((size) => (
                          <SelectItem key={size.id} value={size}>
                            {size.talle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="text-sm font-medium text-gray-700"
                    >
                      Cantidad
                    </label>
                    <Input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Añadir al carrito
                    </Button>
                    <Button variant="outline" size="lg">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>No hay stock disponible</div>
          )}
        </div>
      </div>
    </div>
  );
}
