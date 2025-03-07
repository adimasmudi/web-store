export type ProductReqBody = {
  title: string;
  price: number;
  category: string;
  stock?: number;
  image_path: string;
  description?: string;
};

export type ProductResData = {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image_path: string;
  stock: Number;
  created_at: string;
  updated_at: string;
};

export type GetProductsResData = {
  totalItems: number;
  numberOfPage: number;
  items: ProductResData[];
};
