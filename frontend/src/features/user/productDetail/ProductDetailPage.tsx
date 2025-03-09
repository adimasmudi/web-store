'use client';

import { Navbar } from '@/components/navbar/Navbar';
import Image from 'next/image';
import styles from './styles.module.css';
import { AppButton } from '@/components/button/Button';
import { ShoppingCart } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { getProductById } from '@/data/product/api';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/spinner/Spinner';
import { toast } from 'sonner';
import { useCart } from '@/context/cart';
import { sendGAEvent } from '@next/third-parties/google';

const ProductDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const id = params?.id;

  const {
    data: product,
    isLoading,
    error
  } = useFetch({
    fn: getProductById,
    params: { id: id }
  });

  if (error) {
    return <p className="text-center">Something Went Wrong</p>;
  }

  sendGAEvent('event', 'user view product', { value: product?.data?.title });

  const handleClickAddToCart = () => {
    if (!product?.data) return;

    toast.success('Item added to cart successfully');
    addToCart(product?.data);
    sendGAEvent('event', 'added to cart', { value: product.data.title });
  };
  return (
    <main className="min-h-screen bg-broken-white flex flex-col">
      <Navbar type="user" />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-broken-white">
          <div className={`${styles['padding-1']} w-full`}>
            <div className="flex flex-col md:flex-row bg-white justify-center max-w-screen-xl mx-auto border rounded-lg">
              <div
                className={`w-[90%] md:w-1/2 lg:w-1/2 xl:w-1/2 justify-center items-center ${styles['padding-2']}`}
              >
                <Image
                  src={
                    product?.data?.image_path ||
                    `https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg`
                  }
                  alt="product-detail-img"
                  className="h-[31.25rem] w-full object-cover mb-5"
                  width={500}
                  height={500}
                />
              </div>
              <div className={`bg-white w-1/2 ${styles['padding-2']}`}>
                <h2
                  className={`text-primary text-3xl font-semibold mb-4 ${styles['margin-b-1']}`}
                >
                  {product?.data?.title}
                </h2>
                <div>
                  <span
                    className={`inline-block bg-none border border-cyan-500 rounded-md px-3 py-1 text-sm font-semibold text-primary mb-4 ${styles['margin-b-1']} ${styles['padding-half']}`}
                  >
                    {product?.data?.category}
                  </span>

                  <div className="flex justify-between items-center">
                    <p className="text-primary text-xl font-medium">
                      Price : {product?.data?.price}
                    </p>
                  </div>
                  <div
                    className={`text-primary text-base font-normal flex ${styles['margin-b-1']}`}
                  >
                    <p>Stock: {product?.data?.stock}</p>
                  </div>

                  <div>
                    <AppButton
                      variant="primary"
                      onClick={handleClickAddToCart}
                      className="flex gap-5 items-center p-3 rounded-md w-full justify-center mt-4"
                    >
                      <ShoppingCart />
                      <p className="text-broken-white mr-2">Add to cart</p>
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex bg-white max-w-screen-xl mx-auto border rounded-lg justify-between text-primary ${styles['margin-t-1']}`}
            >
              <div className={`w-3/4 ${styles['padding-2']}`}>
                <h2 className="text-xl font-semibold mb-4">
                  Product Description
                </h2>
                <p>{product?.data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;
