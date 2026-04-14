import { Category } from "./category";
export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  category: Category;
  quantity?: number;
}
