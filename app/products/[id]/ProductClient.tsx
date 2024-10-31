"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
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
import { products } from "@/data/Products";
import Image from "next/image";
import {
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselContent,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl: string;
}

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const router = useRouter();
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative mr-4">
          <Carousel
            opts={{
              loop: true,
              autoplay: true,
              interval: 3000, // 3 segundos
            }}
          >
            <CarouselContent>
              <CarouselItem key={product.id}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square rounded-xl overflow-hidden bg-gray-100"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square rounded-xl overflow-hidden bg-gray-100"
                  width={400}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square rounded-xl overflow-hidden bg-gray-100"
                  width={400}
                  height={400}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-3 text-3xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="size"
                    className="text-sm font-medium text-gray-700"
                  >
                    Size
                  </label>
                  <Select onValueChange={setSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <Input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
        </div>
      </div>
    </div>
  );
}
