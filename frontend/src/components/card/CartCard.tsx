import { ProductResData } from '@/data/product/dto';
import { AppButton } from '../button/Button';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart';
import { toast } from 'sonner';
import styles from './styles.module.css';
import Image from 'next/image';

interface CartCardProps {
  data: ProductResData;
}

export const CartCard = ({ data }: CartCardProps) => {
  const { removeFromCart } = useCart();
  const handleRemoveItem = () => {
    toast.success('Item removed successfully');
    removeFromCart(data.id);
  };
  return (
    <div
      key={data.id}
      className="flex flex-row flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap justify-between w-[80%] md:w-[80%] lg:w-200 xl:w-200 h-fit  pe-8 px-8 pt-8 pb-8 me-8 mx-8 mb-8 rounded shadow"
    >
      <div className="flex  flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <div className="flex flex-row gap-5 items-center w-[90%] md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="flex flex-row items-center w-100">
            <Image
              src={data.image_path}
              alt={data.title}
              width={200}
              height={200}
              className="w-60 h-60 rounded-tl rounded-bl"
            />
          </div>
        </div>
        <div
          className={`flex flex-col justify-center gap-3 w-[50%] ${styles['padding-1']}`}
        >
          <div>
            <span className="line-clamp-4">{data.title}</span>
            <span>
              <span className="font-bold">Stock</span> : {String(data.stock)}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>{data.category}</span>
          </div>
        </div>
        <div
          className={`flex flex-row gap-5 justify-start items-center ${styles['padding-1']}`}
        >
          <div>
            <span>{data.price}</span>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-center ${styles['remove-item-btn-wrapper']}`}
      >
        <AppButton variant="outline" onClick={handleRemoveItem}>
          <Trash2 />
        </AppButton>
      </div>
    </div>
  );
};
