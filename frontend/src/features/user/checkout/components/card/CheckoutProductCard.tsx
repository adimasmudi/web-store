import { CheckoutCard } from '@/components/card/CheckoutCard';
import { ProductResData } from '@/data/product/dto';
import { Card } from '@/shadcn/components/ui/card';
import styles from './styles.module.css';

interface CheckoutProductCardProps {
  products: ProductResData[];
}
export const CheckoutProductCard = ({ products }: CheckoutProductCardProps) => {
  return (
    <Card className={styles['padding-1']}>
      <div className="flex gap-2 mb-4">
        <p className="font-bold line-clamp-1">List Of Products</p>
      </div>
      <div className="flex flex-col gap-5">
        {products.map((product) => {
          return <CheckoutCard key={product.id} productData={product} />;
        })}
      </div>
      <hr className="my-5" />
    </Card>
  );
};
