import React from "react";
import Image from "next/image";
// Components
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
// Assets
import uploadImages from "../assets/subir-imagen.png";
import { CarouselPreviewImages } from "./CarouselPreviewImages";
// Custom Hooks
import { useAddProductFormHook } from "../hooks/useAddProductFormHook";
// Store
import useProductsStore from "@/store/useProducts.store";

interface IAddProductForm {
  type: "add" | "edit";
}

export const AddProductForm = ({ type }: IAddProductForm) => {
  // Store
  const { newProduct, setNewProduct } = useProductsStore();
  // Custom Hook
  const {
    imagesPreview,
    handleRemoveImage,
    handleFilesChange,
    handleChangeInput,
    handleChangeArray,
  } = useAddProductFormHook();

  return (
    <div>
      <div className="columns-1 md:columns-2 gap-10">
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
            {newProduct.image !== "" && type === "edit" ? (
              <div className="flex flex-column items-center gap-2">
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() => {
                    setNewProduct({ ...newProduct, images: "" });
                  }}
                >
                  Eliminar imagen
                </Button>
                <Image
                  src={newProduct.images}
                  width={100}
                  height={100}
                  alt="image"
                ></Image>
              </div>
            ) : (
              <div className="relative w-full h-10 bg-blue-500 rounded-md border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <input
                  id="image"
                  type="file"
                  multiple
                  accept="image/*"
                  max={4}
                  onChange={(e) => handleFilesChange(e)}
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
            )}
            <p className="text-gray-400 text-sm">Máximo de 4 imágenes</p>
          </Label>
          {/* Preview Image */}
          {imagesPreview?.length > 0 && (
            <CarouselPreviewImages handleRemoveImage={handleRemoveImage} />
          )}
        </Form>
      </div>
      <Toaster />
    </div>
  );
};
