'use client';

import { Card } from '@/shadcn/components/ui/card';
import { AppButton } from '../button/Button';
import { CartProvider, useCart } from '@/context/cart';
import { ProductResData } from '@/data/product/dto';

interface ProductCardProps {
  data: ProductResData;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const { cartData, addToCart } = useCart();
  const handleAddToCart = () => {
    console.log('here', cartData);
    addToCart(data);
    console.log('here', cartData);
  };
  return (
    <Card className="cursor-pointer">
      <div className="rounded">
        <div className="relative p-4 h-64 overflow-hidden rounded-xl bg-clip-border">
          <img
            src={data.image_path}
            alt={data.title}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="px-4 flex flex-col gap-2">
          <p className="text-slate-800 text-xl font-semibold line-clamp-2 min-h-14">
            {data.title}
          </p>
          <p className="text-primary text-xl font-semibold">{data.price}</p>
          <div className="flex flex-wrap justify-between">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <p className="line-clamp-1">{data.category}</p>
            </span>
            <p className="text-slate-600 font-semibold">
              Stock: {String(data.stock)}
            </p>
          </div>
        </div>
        <div className="px-4 pt-4 h-14">
          <p className="text-slate-600 leading-normal font-light line-clamp-2">
            {data.description}
          </p>
        </div>
        <div className="p-4">
          <AppButton
            variant="primary"
            state={Number(data.stock) > 1 ? 'Active' : 'Disabled'}
            className="rounded-md w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleAddToCart();
            }}
          >
            Add to Cart
          </AppButton>
        </div>
      </div>
    </Card>
  );
};
