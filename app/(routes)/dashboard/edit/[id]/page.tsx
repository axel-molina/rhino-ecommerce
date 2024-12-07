/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
// Ui
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
// Components
import { Button } from "@/components/ui/button";
import { CarouselPreviewImages } from "../../components/CarouselPreviewImages";
// Assets
import uploadImages from "../../assets/subir-imagen.png";
// Services
import useProductsStore from "@/store/useProducts.store";
//Hooks
import { useToast } from "@/hooks/use-toast";
import { useDashboardHook } from "../../hooks/useDashboardHook";
import { useAddProductFormHook } from "../../hooks/useAddProductFormHook";
// Enums
import Status from "@/models/enum/Status.enum";

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { toast } = useToast();
  const { fetchProduct, newProduct, status, setStatus } = useProductsStore();
  const {
    handleChangeInput,
    handleChangeArray,
    handleFilesChange,
    handleRemoveImage,
  } = useAddProductFormHook();
  const { handleAddOrEditProduct } = useDashboardHook();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (status === Status.successDeleteProduct) {
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente",
      });
      setStatus(null);
    }
    if (status === Status.successEditProduct) {
      toast({
        title: "Producto editado",
        description: "El producto ha sido editado exitosamente",
      });
      setStatus(null);
      router.push(`/dashboard`);
    }
  }, [status]);

  return (
    <div>
      <div className="columns-1 md:columns-2 gap-10 m-8">
        <Form>
          <Label htmlFor="name">
            Nombre
            <Input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Nombre del producto"
              value={newProduct.name}
              onChange={(e) => handleChangeInput(e)}
            />
          </Label>
          <Label htmlFor="price">
            Precio
            <Input
              required
              id="price"
              name="price"
              type="number"
              placeholder="Precio del producto"
              value={newProduct.price}
              onChange={(e) => handleChangeInput(e)}
            />
          </Label>
          <Label htmlFor="description">
            Descripción
            <Input
              id="description"
              name="description"
              required
              type="text"
              placeholder="Descripción del producto"
              value={newProduct.description}
              onChange={(e) => handleChangeInput(e)}
            />
          </Label>
          <Label htmlFor="stock">
            Stock
            <Input
              id="stock"
              type="number"
              name="stock"
              required
              placeholder="Cantidad de productos disponibles"
              value={newProduct.stock}
              onChange={(e) => handleChangeInput(e)}
            />
          </Label>
          <Label htmlFor="Color">
            Colores
            <Input
              id="color"
              name="color"
              required
              type="text"
              placeholder="Color disponible para el producto"
              value={newProduct.color}
              onChange={(e) => handleChangeArray(e)}
            />
          </Label>
          <Label htmlFor="size">
            Tamaños
            <Input
              id="size"
              name="size"
              required
              type="text"
              placeholder="Tamaño disponible para el producto"
              value={newProduct.size}
              onChange={(e) => handleChangeArray(e)}
            />
          </Label>
          <Label htmlFor="image">
            Imagen
            <div className="relative w-full h-10 bg-blue-500 rounded-md border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <input
                id="image"
                type="file"
                multiple
                accept="image/*"
                max={4}
                onChange={(e) => handleFilesChange(e, "edit")}
                className="hidden"
              />
              <Image
                src={uploadImages}
                alt="subir imagen"
                className="absolute left-1/2 transform -translate-x-1/2 top-2 w-6 h-6"
                width={100}
                height={100}
              />
            </div>
            <p className="text-gray-400 text-sm">Máximo de 4 imágenes</p>
          </Label>
          {/* Preview Image */}
          {newProduct.images?.length > 0 && (
            <CarouselPreviewImages handleRemoveImage={handleRemoveImage} />
          )}
        </Form>
      </div>
      <div className="flex justify-end mr-4 ml-4 gap-4">
        <Button
          className="w-full"
          onClick={() => handleAddOrEditProduct("edit")}
        >
          Editar
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => router.push(`/dashboard`)}
        >
          Cancelar
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
