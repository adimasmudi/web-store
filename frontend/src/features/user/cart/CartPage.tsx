'use client';

import { AppButton } from '@/components/button/Button';
import { CartCard } from '@/components/card/CartCard';
import { Navbar } from '@/components/navbar/Navbar';
import { useCart } from '@/context/cart';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import styles from './styles.module.css';

export const CartPage = () => {
  const router = useRouter();
  const { cartData, checkoutCart } = useCart();

  const handleCheckout = () => {
    checkoutCart();
    toast.success('Chekcout item success');
    router.push('/checkout');
  };
  return (
    <div>
      <Navbar type="user" />
      <div className="flex flex-col items-center gap-10">
        {cartData.map((data, idx) => {
          return <CartCard key={idx} data={data} />;
        })}
      </div>
      {cartData.length > 0 && (
        <div
          className={`flex flex-row justify-end sticky bottom-8 ${styles['checkout-item-btn-wrapper']}`}
        >
          <AppButton variant="primary" onClick={handleCheckout}>
            Checkout
          </AppButton>
        </div>
      )}
    </div>
  );
};
