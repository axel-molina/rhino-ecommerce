import { Image } from "./Image.interface";
import { Category } from "./Category.interface";
import { Size } from "./Size.interface";

// Interface para un producto
export interface Product {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  stock: number;
  price: number;
  color: string;
  isFeatured: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: Image[];
  category: Category;
  sizes: Size[];
}
