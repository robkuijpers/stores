export interface Product {
  id?: string;
  name?: string;
  code?: string;
  category?: string;
  description?: string;
  rating?: number;
  images?: string[];
}
export interface Category {
  id: string;
  name: string;
}
