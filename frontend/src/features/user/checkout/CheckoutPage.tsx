'use client';

import { useCart } from '@/context/cart';
import { CheckoutProductCard } from './components/card/CheckoutProductCard';
import { Navbar } from '@/components/navbar/Navbar';
import { CheckoutSummaryCard } from './components/card/CheckoutSummaryCard';

export const CheckoutPage = () => {
  const { checkoutData } = useCart();

  return (
    <div>
      <Navbar type="user" />
      <div className="flex flex-row justify-between">
        <div>
          <CheckoutProductCard products={checkoutData} />
        </div>
        <div>
          <CheckoutSummaryCard products={checkoutData} />
        </div>
      </div>
    </div>
  );
};
