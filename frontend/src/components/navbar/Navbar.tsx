'use client';

import { useRouter } from 'next/navigation';
import { AppButton } from '../button/Button';

interface NavbarProps {
  type: 'user' | 'admin';
}
export const Navbar = ({ type }: NavbarProps) => {
  const router = useRouter();
  return (
    <nav className="bg-white shadow p-10 w-full">
      <div className=" flex items-center justify-between p-48">
        <div>
          <h2>Web Store</h2>
        </div>
        <div className="flex flex-row justify-end gap-2">
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
