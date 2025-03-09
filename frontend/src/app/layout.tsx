import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './main.css';
import { CartProvider } from '@/context/cart';
import { Toaster } from '@/shadcn/components/ui/sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Webstore | Order Anywhere, Anytime',
  description:
    'Webstore is an app for ordering thing from the comfort of your home.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
