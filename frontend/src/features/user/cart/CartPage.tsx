'use client';

import { CartCard } from '@/components/card/CartCard';
import { Navbar } from '@/components/navbar/Navbar';
import { useCart } from '@/context/cart';

export const CartPage = () => {
  const { cartData } = useCart();
  return (
    <div>
      <Navbar type="user" />
      <div className="flex flex-col gap-10">
        {cartData.map((data, idx) => {
          return <CartCard key={idx} data={data} />;
        })}
      </div>
    </div>
  );
};
