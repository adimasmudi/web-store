'use client';

import { useRouter } from 'next/navigation';
import { AppButton } from '../button/Button';
import Link from 'next/link';
import { useCart } from '@/context/cart';
import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  type: 'user' | 'admin';
}
export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();

  const { cartData } = useCart();

  return (
    <nav className="bg-white shadow p-10 w-full">
      <div className=" flex items-center justify-between p-48">
        <div>
          <h2>Web Store</h2>
        </div>
        <div className="flex flex-row justify-end gap-2">
          {type === 'admin' ? (
            <div>
              <Link href="/admin">Products</Link>
              <Link href="/admin/product/log">Logs</Link>
            </div>
          ) : (
            <div className="flex flex-col justify-end">
              <div className="flex items-center justify-center relative">
                <ShoppingCart
                  className="cursor-pointer"
                  onClick={() => {
                    router.push('/cart');
                  }}
                />
                {cartData.length > 0 && (
                  <div className="absolute -inset-y-3 inset-x-4 flex justify-center items-center bg-navy w-5 h-5 rounded-full text-sm">
                    <span className="text-white">{cartData.length}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <AppButton
            variant="primary"
            onClick={() => {
              router.push(type === 'user' ? 'admin' : '/');
            }}
          >
            Switch to {type === 'user' ? 'admin' : 'user'}
          </AppButton>
        </div>
      </div>
    </nav>
  );
};
