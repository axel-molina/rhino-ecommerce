import Link from 'next/link';
import { Instagram } from 'lucide-react';
import Muscle from '@/assets/musculo.png';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  {
    id: 1,
    name: 'Classic White Tee',
    price: 19.99,
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Vintage Black T-Shirt',
    price: 24.99,
    imageUrl:
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Graphic Print Tee',
    price: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=60',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative h-[600px] flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-lg">
              Sin excusas
            </h1>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-white text-indigo-700 hover:bg-gray-100 hover:scale-105 transform transition-transform duration-200"
              >
                <Link href="/products">
                  Seguinos
                  <Instagram className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button asChild className="mt-4 w-full">
                    <Link href={`/products/${product.id}`}>View Product</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
