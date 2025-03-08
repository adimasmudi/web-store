'use client';

import { Navbar } from '@/components/navbar/Navbar';
import { ProductList } from './components/productList/ProductList';

export const HomePage = () => {
  return (
    <div>
      <Navbar type="user" />
      <ProductList />
    </div>
  );
};
