/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// Utils
import { limitCharacters, formatArrayToString } from "@/lib/utils";
// Store
import useProductsStore from "@/store/useProducts.store";
// Models
import { Product } from "@/models/interface/Product.interface";
import Status from "@/models/enum/Status.enum";
// Icons
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";

export const ListProducts = () => {
  const { toast } = useToast();
  const { products, loading, error, status, setStatus, fetchProducts } =
    useProductsStore();

  const router = useRouter();

  const goToEditProduct = (id: number) => {
    router.push(`/dashboard/edit/${id}`);
  };

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
    }
  }, [status]);

  useEffect(() => {
    fetchProducts(1, 10);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>Aún no tienes productos agregados.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Tamaños</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead>
            <Pencil className="h-4 w-4" />
          </TableHead>
          <TableHead>
            <Trash className="h-4 w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      {products.map((product: Product) => (
        <TableBody key={product?.id}>
          <TableRow>
            <TableCell className="font-medium">{product?.id}</TableCell>
            <TableCell>{limitCharacters(product?.name, 24)}</TableCell>
            <TableCell>{limitCharacters(product?.description, 26)}</TableCell>
            <TableCell>{product?.stock}</TableCell>
            <TableCell>
              {limitCharacters(formatArrayToString(product?.color), 15)}
            </TableCell>
            <TableCell>
              {limitCharacters(formatArrayToString(product?.size), 15)}
            </TableCell>
            <TableCell className="text-right">${product?.price}</TableCell>
            <TableCell onClick={() => goToEditProduct(product?.id)}>
              <div className="flex justify-center items-center bg-green-500 p-2 rounded-md text-white">
                <Pencil className="h-4 w-4" />
              </div>
            </TableCell>
            <TableCell>
              <ModalDeleteProduct
                productId={product?.id}
                productName={product?.name}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
      <Toaster />
    </Table>
  );
};
