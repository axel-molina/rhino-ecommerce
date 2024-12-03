import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
// Components
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Product } from "@/models/interface/Product.interface";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
// Enum
import Status from "@/models/enum/Status.enum";
// Hooks
import { useToast } from "@/hooks/use-toast";
// Services
import useProductsStore from "@/store/useProducts.store";
// Assets
import uploadImages from "../assets/subir-imagen.png";
import { CarouselPreviewImages } from "./CarouselPreviewImages";

interface IAddProductForm {
  setNewProduct: React.Dispatch<React.SetStateAction<Product>>;
  newProduct: Product;
  type: "add" | "edit";
}

export const AddProductForm = ({
  type,
  newProduct,
  setNewProduct,
}: IAddProductForm) => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imagesAux, setImagesAux] = useState<string[]>([]);
  const { status, setStatus } = useProductsStore();
  const { toast } = useToast();

  const handleChangeArray = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const array = value.split(",").map((item) => item.trim());
    setNewProduct({ ...newProduct, [name]: array });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Validación de que se seleccione al menos una imagen
    if (!files?.length && !imagesPreview?.length) {
      toast({
        title: "Error",
        description: "Selecciona al menos una imagen para tu producto.",
      });
      return;
    }

    // Validación de maximo de 4 imágenes
    if (files?.length > 4) {
      toast({
        title: "Error",
        description: "No puedes subir más de 4 imágenes.",
      });
      return;
    }

    // Validación de tamaño de imagen, hasta 5mb
    if (files?.length) {
      const fileSize = files[0].size;
      if (fileSize > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "El tamaño de la imagen no puede ser superior a 5mb.",
        });
        return;
      }
    }

    const imagesArray: string[] = [];
    const reader = new FileReader();

    const loadFile = (index: number) => {
      if (index >= files.length) {
        setImagesAux((prevImages) => [...prevImages, ...imagesArray]);
        setNewProduct({ ...newProduct, images: imagesAux });
        return;
      }
      reader.readAsDataURL(files[index]);
      reader.onload = () => {
        setImagesPreview((prevImages) => [
          ...prevImages,
          reader.result as string,
        ]);
        imagesArray.push(reader.result as string);
        loadFile(index + 1);
      };
    };

    loadFile(0);
  };

  console.log("images preview: ", imagesPreview);
  console.log("images form: ", newProduct.images);
  console.log("setImagesAux: ", imagesAux);

  const handleRemoveImage = (image: string) => {
    const imagesArray = newProduct.images.filter((img) => img !== image);
    setNewProduct({ ...newProduct, images: imagesArray });
    setImagesPreview(imagesArray);
  };

  useEffect(() => {
    if (status === Status.successAddProduct) {
      toast({
        title: "Producto creado",
        description: "El producto ha sido creado exitosamente",
      });
      setStatus(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
            <CarouselPreviewImages
              newProduct={newProduct}
              handleRemoveImage={handleRemoveImage}
            />
          )}
        </Form>
      </div>
      <Toaster />
    </div>
  );
};
