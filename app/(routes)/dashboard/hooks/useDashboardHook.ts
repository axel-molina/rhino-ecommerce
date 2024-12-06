import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// service
import { supabase } from "@/utils/supabase/client";
// Store
import useProductsStore from "@/store/useProducts.store";
// Models
import Status from "@/models/enum/Status.enum";
// Hooks
import { useToast } from "@/hooks/use-toast";

export const useDashboardHook = () => {
  const { toast } = useToast();
  const { addProduct, loading, status, newProduct, setNewProduct } =
    useProductsStore();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  // Validaciones
  const validateProduct = () => {
    setError("");
    if (!newProduct.name || !newProduct.name === "") {
      setError("El nombre del producto es obligatorio");
      return false;
    }
    if (!newProduct.price) {
      setError("El precio del producto es obligatorio");
      return false;
    }
    if (newProduct.images.length === 0) {
      setError("Debes agregar al menos una imagen");
      return false;
    }
    if (newProduct.price > 100000000) {
      setError("El precio del producto no puede ser mayor a 100.000.000");
      return false;
    }
    return true;
  };

  // Agregar producto
  const handleAddProduct = () => {
    if (validateProduct()) {
      addProduct(newProduct);
    }
  };

  // Logout
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setUser(data.session.user);
      } else {
        router.push("/login");
      }
    });
  }, [router]);

  // Reset de estado cuando se agrega un producto exitosamente
  useEffect(() => {
    if (status === Status.successAddProduct) {
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        color: [],
        size: [],
        images: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Mensajes de error por validaciones
  useEffect(() => {
    if (error !== "") {
      toast({
        title: "Error",
        description: error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return { user, handleAddProduct, handleLogout, loading, error };
};
