'use client';

import { useCart } from '@/context/cart';
import { CheckoutProductCard } from './components/card/CheckoutProductCard';
import { Navbar } from '@/components/navbar/Navbar';
import { CheckoutSummaryCard } from './components/card/CheckoutSummaryCard';
import styles from './styles.module.css';

export const CheckoutPage = () => {
  const { checkoutData } = useCart();

  return (
    <div>
      <Navbar type="user" />
      <div
        className={`flex flex-row flex-wrap-reverse lg:flex-nowrap xl:flex-nowrap justify-between gap-5 ${styles['checkout-wrapper']}`}
      >
        <CheckoutProductCard products={checkoutData} />

        <CheckoutSummaryCard products={checkoutData} />
      </div>
    </div>
  );
};
