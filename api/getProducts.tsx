import { supabase } from "@/utils/supabase/client";

export async function getProducts() {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}
