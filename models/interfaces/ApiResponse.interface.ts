import { Product } from "./Product.interface";
import { Pagination } from "./Pagination.interface";

// Interface para la respuesta completa de la API
export interface ApiResponse {
  data: Product[];
  meta: {
    pagination: Pagination;
  };
}
