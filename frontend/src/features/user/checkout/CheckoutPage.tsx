'use client';

import { useCart } from '@/context/cart';
import { CheckoutProductCard } from './components/card/CheckoutProductCard';
import { Navbar } from '@/components/navbar/Navbar';
import { CheckoutSummaryCard } from './components/card/CheckoutSummaryCard';
import { useRouter } from 'next/navigation';

export const CheckoutPage = () => {
  const router = useRouter();
  const { checkoutData } = useCart();

  if (checkoutData.length < 1) {
    router.push('/');
  }

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
