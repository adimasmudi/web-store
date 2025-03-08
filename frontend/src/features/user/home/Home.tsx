import { Navbar } from '@/components/navbar/Navbar';
import { Button } from '@/shadcn/components/ui/button';
import { ProductList } from './components/productList/ProductList';

export const HomePage = () => {
  return (
    <div>
      <Navbar type="user" />
      <ProductList />
    </div>
  );
};
