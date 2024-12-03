import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardSendCart } from "./components/CardSendCart";
import { CardResumeCart } from "./components/CardResumeCart";

export default function Cart() {
  const cantidadDeProductos = 2;

  if (cantidadDeProductos === 0) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center mt-12">
        No hay productos en el carrito
        <Link href="/">
          <Button variant="default" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
        Finalizar pedido
      </h1>
      <div>
        {/* Product lista de carrito */}
        <div
          className={`relative mr-4 ${
            cantidadDeProductos > 4 ? "overflow-y-scroll h-96" : ""
          }`}
        >
          <CardResumeCart />
        </div>
        {/* Precio total */}
        <CardSendCart />
      </div>
    </div>
  );
}
