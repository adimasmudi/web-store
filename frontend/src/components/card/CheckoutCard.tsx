import { ProductResData } from '@/data/product/dto';

interface CheckoutCardProps {
  productData: ProductResData;
}

export const CheckoutCard = ({ productData }: CheckoutCardProps) => {
  return (
    <div className="grid xl:grid-cols-12 gap-4 shadow">
      <img
        src={productData.image_path}
        alt="product-img"
        className="size-[78px] rounded-md xl:col-span-2"
      />
      <div className="flex flex-col gap-2 xl:col-span-7">
        <p className="line-clamp-1 text-lg font-semibold">
          {productData.title}
        </p>
        <p className="line-clamp-1 text-gray-600 text-sm">
          Price: <span className="font-semibold">{productData.price}</span>
        </p>
        <p className="text-gray-600 text-sm">
          Amount bought: <span className="font-semibold">{1}</span>
        </p>
      </div>
      <p className="ms-auto font-bold xl:col-span-3">
        {String(productData.price)}
      </p>
    </div>
  );
};
