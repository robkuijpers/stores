export interface Image {
  name: string;
  type: string;
  size: number;
  base64: string;
}
export interface Product {
  id?: string;
  name?: string;
  code?: string;
  category?: string;
  description?: string;
  rating?: number;
  images?: Image[];
}
export interface Category {
  id: string;
  name: string;
}
