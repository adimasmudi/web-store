'use client';

import { useRouter } from 'next/navigation';
import { AppButton } from '../button/Button';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/cart';
import { ShoppingCart } from 'lucide-react';
import styles from './styles.module.css';

interface NavbarProps {
  type: 'user' | 'admin';
}
export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();

  const { cartData } = useCart();

  return (
    <nav
      className={`bg-white shadow p-10 w-full sticky top-0 z-10 ${styles['navbar']}`}
    >
      <div className="flex items-center justify-between p-48">
        <div>
          <h2>Web Store</h2>
        </div>
        <div className="flex flex-row justify-end gap-5">
          {type === 'admin' ? (
            <div className="flex flex-row items-center gap-2">
              <Link href="/admin">Products</Link>
              <Link href="/admin/product/log">Logs</Link>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center relative">
                <Link href="/cart">
                  <ShoppingCart className="cursor-pointer" />
                </Link>
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
