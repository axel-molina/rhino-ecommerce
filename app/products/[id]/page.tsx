import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { products } from "@/data/Products";

export async function generateStaticParams() {
  // Genera un array de objetos con los IDs que quieres pre-renderizar
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product} />;
}
