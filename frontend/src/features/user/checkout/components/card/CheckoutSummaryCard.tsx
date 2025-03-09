import { AppButton } from '@/components/button/Button';
import { useCart } from '@/context/cart';
import { ProductResData } from '@/data/product/dto';
import { Card } from '@/shadcn/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import styles from './styles.module.css';

interface CheckoutSummaryCardProps {
  products: ProductResData[];
}
export const CheckoutSummaryCard = ({ products }: CheckoutSummaryCardProps) => {
  const router = useRouter();
  const { reset } = useCart();

  const handlePayment = () => {
    toast.success('Payment Success');
    reset();
    router.push('/');
  };

  return (
    <Card
      className={`w-full lg:w-100 xl:w-100 sticky top-5 ${styles['padding-1']}`}
    >
      <p className="font-bold mb-4">Order Summary</p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="text-gray-600 text-sm">
            Sub-Total ({products.length} products)
          </p>
          <p className="text-gray-600 text-sm font-semibold">
            {String(
              products.reduce((sum, product) => sum + Number(product.price), 0)
            )}
          </p>
        </div>

        <hr className="my-3" />

        <AppButton variant="primary" onClick={handlePayment}>
          Continue to Payment
        </AppButton>
      </div>
    </Card>
  );
};
