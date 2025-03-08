import { ProductResData } from '@/data/product/dto';
import { AppButton } from '../button/Button';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart';

interface CartCardProps {
  data: ProductResData;
}

export const CartCard = ({ data }: CartCardProps) => {
  const { removeFromCart } = useCart();
  const handleRemoveItem = () => {
    removeFromCart(data.id);
  };
  return (
    <div
      key={data.id}
      className="flex flex-row justify-between w-200 h-fit bg-white pe-8 px-8 pt-8 pb-8 me-8 mx-8 mb-8 shadow"
    >
      <div className="flex flex-row gap-5 items-center w-1/2">
        <div className="flex flex-row items-center w-100">
          <img src={data.image_path} alt={data.title} className="w-60 h-60" />
        </div>
        <div className="flex flex-col gap-3 max-w-80">
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
      </div>
      <div className="flex flex-row gap-5 justify-around items-center w-1/2">
        <div>
          <span>{data.price}</span>
        </div>
      </div>
      <div>
        <AppButton variant="outline" onClick={handleRemoveItem}>
          <Trash2 />
        </AppButton>
      </div>
    </div>
  );
};
