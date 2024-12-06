import { create } from "zustand";
import { supabase } from "@/utils/supabase/client";
// Models
import { Product } from "@/models/interface/Product.interface";
import StatusEnum from "@/models/enum/Status.enum";

const useProductsStore = create((set) => ({
  products: [] as Product[],
  product: null as Product | null,
  loading: false,
  error: null,
  status: null | StatusEnum,
  newProduct: {
    name: "",
    price: 0,
    description: "",
    stock: 0,
    color: [],
    size: [],
    images: [],
  } as Product,
  setStatus: (status: StatusEnum | null) => set({ status }),
  setNewProduct: (newProduct: Product) => set({ newProduct }),

  // Traer productos
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Traer producto
  fetchProduct: async (id: string) => {
    set({ loading: true, error: null, status: null });
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      set({ product: data[0], loading: false });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  // Agrgar producto
  addProduct: async (product: Product) => {
    set({ loading: true, error: null, status: null });
    try {
      const { error } = await supabase.from("products").insert(product);
      if (error) throw error;
      set({ loading: false, status: StatusEnum.successAddProduct });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
        status: StatusEnum.errorAddProduct,
      });
    }
  },

  // Eliminar producto
  deleteProduct: async (id: string) => {
    set({ loading: true, error: null, status: null });
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      set({ loading: false, status: StatusEnum.successDeleteProduct });
      // Quitar del array de producto
      set((state) => {
        const index = state.products.findIndex((p) => p.id === id);
        state.products.splice(index, 1);
        return { products: state.products };
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
        status: StatusEnum.errorDeleteProduct,
      });
    }
  },

  // Editar producto
  editProduct: async (product: Product) => {
    set({ loading: true, error: null, status: null });
    try {
      const { error } = await supabase
        .from("products")
        .update(product)
        .eq("id", product.id);
      if (error) throw error;
      set({ loading: false, status: StatusEnum.successEditProduct });
      // Actualizar el producto en el array
      set((state) => {
        const index = state.products.findIndex((p) => p.id === product.id);
        state.products[index] = product;
        return { products: state.products };
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
        status: StatusEnum.errorEditProduct,
      });
    }
  },
}));
export default useProductsStore;
