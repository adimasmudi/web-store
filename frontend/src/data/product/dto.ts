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
