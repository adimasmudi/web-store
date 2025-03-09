import { getProductById } from '@/data/product/api';

const getProductData = async (id: string) => {
  const res = await getProductById({ id });
  return res.data;
};

export { getProductData };
