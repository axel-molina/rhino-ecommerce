import { useEffect, useState, ChangeEvent } from "react";
// Store
import useProductsStore from "@/store/useProducts.store";
// Hooks
import { useToast } from "@/hooks/use-toast";
// Enum
import Status from "@/models/enum/Status.enum";

export const useAddProductFormHook = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imagesAux, setImagesAux] = useState<string[]>([]);
  const {
    status,
    setStatus,
    fetchProducts,
    newProduct,
    setNewProduct,
    resetNewProduct,
  } = useProductsStore();
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

  const handleFilesChange = (
    e: ChangeEvent<HTMLInputElement>,
    type?: "add" | "edit"
  ) => {
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

    const imagesArray: string[] = type === "edit" ? newProduct.images : [];
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
      setNewProduct({ ...newProduct, images: [] });
      setImagesPreview([]);
      setImagesAux([]);
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setNewProduct({ ...newProduct, images: imagesAux });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesAux]);

  useEffect(() => {
    resetNewProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    imagesPreview,
    handleRemoveImage,
    handleFilesChange,
    handleChangeInput,
    handleChangeArray,
  };
};
