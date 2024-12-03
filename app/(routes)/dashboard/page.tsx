"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// service
import { supabase } from "@/utils/supabase/client";
import useProductsStore from "@/store/useProducts.store";
// Components
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ListProducts } from "./components/ListProducts";
import { AddProductForm } from "./components/AddProductForm";
import Status from "@/models/enum/Status.enum";
import { Product } from "@/models/interface/Product.interface";

export default function Dashboard() {
  const { addProduct, loading, status } = useProductsStore();
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    color: [],
    size: [],
    images: [],
  });

  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleAddProduct = () => {
    addProduct(newProduct);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setUser(data.session.user);
      } else {
        router.push("/login");
      }
    });
  }, [router]);

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
  }, [status]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between bg-gray-200 items-center p-4 flex-wrap">
        <h1>Bienvenido, {user.email}</h1>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list" className="w-[90%] mt-4 m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="add">Agregar</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Lista de productos</CardTitle>
              <CardDescription>
                Realiza modificaciones a tus productos aquí.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Lista de productos */}
              <ListProducts />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Agregar producto</CardTitle>
              <CardDescription>
                Agrega tu producto nuevo a la lista.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Formulario Agregar Producto */}
              <AddProductForm
                setNewProduct={setNewProduct}
                newProduct={newProduct}
                type="add"
              />
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button className="w-full" onClick={handleAddProduct}>
                {loading ? "Agregando..." : "Agregar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
