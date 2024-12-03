import { useState } from "react";
// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddProductForm } from "./AddProductForm";
// Models
import { Product } from "@/models/interface/Product.interface";
import Status from "@/models/enum/Status.enum";
// Assets
import { Pencil } from "lucide-react";
// Services
import useProductsStore from "@/store/useProducts.store";
// Hooks
import { useToast } from "@/hooks/use-toast";

export default function ModalEditProduct({ product }: Product) {
  const [productToEdit, setProductToEdit] = useState(product);
  const { toast } = useToast();
  const { status, editProduct, setStatus } = useProductsStore();

  const handleEditProduct = () => {
    editProduct(productToEdit);
  };

  

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="bg-green-500 p-2 rounded-md text-white">
          <Pencil className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar item</AlertDialogTitle>
          <AlertDialogDescription>
            Cambia los datos del producto
          </AlertDialogDescription>
          <AddProductForm
            newProduct={productToEdit}
            setNewProduct={setProductToEdit}
            type="edit"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditProduct}>
            Editar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
