'use client';

import { ProductResData } from '@/data/product/dto';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react';

interface ICartContext {
  cartData: ProductResData[];
  checkoutData: ProductResData[];
  addToCart: (data: ProductResData) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => void;
}

const CartContext = createContext<ICartContext>({
  cartData: [],
  checkoutData: [],
  addToCart: () => {},
  removeFromCart: () => {},
  checkoutCart: () => {}
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartData, setCartData] = useState<ProductResData[]>([]);
  const [checkoutData, setCheckoutData] = useState<ProductResData[]>([]);
  const addToCart = (data: ProductResData) => {
    setCartData((prevState) => {
      const findIdx = prevState.findIndex((item) => item.id === data.id);
      if (findIdx !== -1) {
        return [...prevState];
      }
      return [...prevState, data];
    });
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
          addToCart,
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

export const useCart = () => {
  return useContext(CartContext);
};
