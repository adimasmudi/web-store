'use client';

import { Card } from '@/shadcn/components/ui/card';
import { AppButton } from '../button/Button';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_path: string;
  stock: number;
}

export const ProductCard = ({
  id,
  title,
  price,
  description,
  category,
  image_path,
  stock
}: ProductCardProps) => {
  return (
    <Card className="cursor-pointer">
      <div className="rounded">
        <div className="relative p-4 h-64 overflow-hidden rounded-xl bg-clip-border">
          <img
            src={image_path}
            alt={title}
            className="h-full w-full object-cover rounded-md"
          />
        </div>
        <div className="px-4 flex flex-col gap-2">
          <p className="text-slate-800 text-xl font-semibold line-clamp-2 min-h-14">
            {title}
          </p>
          <p className="text-primary text-xl font-semibold">{price}</p>
          <div className="flex flex-wrap justify-between">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <p className="line-clamp-1">{category}</p>
            </span>
            <p className="text-slate-600 font-semibold">Stock: {stock}</p>
          </div>
        </div>
        <div className="px-4 pt-4 h-14">
          <p className="text-slate-600 leading-normal font-light line-clamp-2">
            {description}
          </p>
        </div>
        {/* {props.amountSold !== undefined && (
          <div className="px-4 pt-2 flex flex-wrap justify-between">
            <p className="text-slate-600">{props.amountSold} sold</p>
            {props.distance !== undefined && props.distance !== 0 && (
              <p className="text-slate-600">{props.distance.toFixed(2)} Km</p>
            )}
          </div>
        )} */}
        <div className="p-4">
          <AppButton
            variant="primary"
            // state={props.stock > 1 ? 'Active' : 'Disabled'}
            className="rounded-md w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            // onClick={(event) => {
            //   event.stopPropagation();
            //   handleAddToCart();
            // }}
          >
            Add to Cart
          </AppButton>
        </div>
      </div>
    </Card>
  );
};
