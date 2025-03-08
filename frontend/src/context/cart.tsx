'use client';

import { ProductResData } from '@/data/product/dto';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

interface ICartContext {
  cartData: ProductResData[];
  checkoutData: ProductResData[];
  addToCart: (data: ProductResData) => void;
  removeFromCart: (id: string) => void;
  checkoutCart: () => void;
  reset: () => void;
}

const CartContext = createContext<ICartContext>({
  cartData: [],
  checkoutData: [],
  addToCart: () => {},
  removeFromCart: () => {},
  checkoutCart: () => {},
  reset: () => {}
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

  const reset = () => {
    setCheckoutData([]);
    setCartData([]);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cartData');
    const storedCheckout = localStorage.getItem('checkoutData');

    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }

    if (storedCheckout) {
      setCheckoutData(JSON.parse(storedCheckout));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
  }, [checkoutData]);

  return (
    <CartContext.Provider
      value={useMemo(
        () => ({
          cartData,
          checkoutData,
          addToCart,
          removeFromCart,
          checkoutCart,
          reset
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
