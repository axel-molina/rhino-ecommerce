"use client";

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const products = [
  { 
    id: 1, 
    name: 'Classic White Tee', 
    price: 19.99, 
    description: 'A timeless classic that never goes out of style. This comfortable white t-shirt is perfect for any casual occasion.',
    features: [
      'Premium cotton material',
      'Regular fit',
      'Crew neck',
      'Machine washable',
      'Pre-shrunk fabric'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60'
  },
  // ... rest of the products array stays the same
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    
    // Here you would typically add the item to a cart state or context
    // For now, we'll just simulate it by navigating to the cart page
    alert(`Added ${quantity} ${product.name}(s) in size ${size} to cart!`);
    router.push('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
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

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Features</h2>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="size" className="text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <Select onValueChange={setSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="2xl">2XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
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
                    Add to Cart
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