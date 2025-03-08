import { ProductResData } from '@/data/product/dto';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';

interface ICartContext {
  cartData: ProductResData[];
  checkoutData: ProductResData[];
  addToChart: (data: ProductResData) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => void;
}

const CartContext = createContext<ICartContext>({
  cartData: [],
  checkoutData: [],
  addToChart: () => {},
  removeFromCart: () => {},
  checkoutCart: () => {}
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartData, setCartData] = useState<ProductResData[]>([]);
  const [checkoutData, setCheckoutData] = useState<ProductResData[]>([]);
  const addToChart = (data: ProductResData) => {
    setCartData((prevState) => [...prevState, data]);
  };
  const removeFromCart = (id: string) => {
    setCartData((prevState) => {
      return prevState.filter((dt) => dt.id != id);
    });
  };
  const checkoutCart = () => {
    setCheckoutData(cartData);
    setCartData([]);
  };
  return (
    <CartContext.Provider
      value={useMemo(
        () => ({
          cartData,
          checkoutData,
          addToChart,
          removeFromCart,
          checkoutCart
        }),
        [cartData, checkoutData]
      )}
    >
      {children}
    </CartContext.Provider>
  );
};
