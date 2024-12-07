"use client";
// Ui
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
// Components
import { Pagination } from "@/components/Pagination";
import { ListProducts } from "./components/ListProducts";
import { AddProductForm } from "./components/AddProductForm";
// Hooks
import { useDashboardHook } from "./hooks/useDashboardHook";
import useProductsStore from "@/store/useProducts.store";

export default function Dashboard() {
  const { user, handleAddOrEditProduct, handleLogout, loading } =
    useDashboardHook();
  const { products } = useProductsStore();

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
            {products.length !== 0 && <Pagination />}
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
              <AddProductForm type="add" />
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button className="w-full" onClick={handleAddOrEditProduct}>
                {loading ? "Agregando..." : "Agregar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
