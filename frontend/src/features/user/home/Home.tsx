'use client';

import { Navbar } from '@/components/navbar/Navbar';
import { Button } from '@/shadcn/components/ui/button';
import { ProductList } from './components/productList/ProductList';
import { CartProvider } from '@/context/cart';

export const HomePage = () => {
  return (
    <div>
      <CartProvider>
        <Navbar type="user" />
        <ProductList />
      </CartProvider>
    </div>
  );
};
