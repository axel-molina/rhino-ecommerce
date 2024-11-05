// Components
import { Banner } from "@/components/Home/Banner";
import { ProductsGrid } from "@/components/Home/ProductsGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Banner */}
        <Banner />
        {/* Products Grid */}
        <ProductsGrid />
      </main>
    </div>
  );
}
