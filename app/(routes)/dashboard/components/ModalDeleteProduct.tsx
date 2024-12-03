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
// Assets
import { Trash } from "lucide-react";
// Store
import useProductsStore from "@/store/useProducts.store";

interface IModalDeleteProduct {
  productName: string;
  productId: number;
}

export default function ModalDeleteProduct({
  productName,
  productId,
}: IModalDeleteProduct) {
  const { deleteProduct, loading } = useProductsStore();
  // Eliminar producto
  const handleDeleteProduct = () => {
    deleteProduct(productId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="bg-red-600 p-2 rounded-md text-white">
          <Trash className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estás seguro que quieres eliminar este item?
          </AlertDialogTitle>
          <AlertDialogDescription>{productName}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>
            {loading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
