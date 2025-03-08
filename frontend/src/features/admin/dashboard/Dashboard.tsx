import { Navbar } from '@/components/navbar/Navbar';
import { ProductList } from './components/productList/ProductList';

export const DashboardPage = () => {
  return (
    <div>
      <Navbar type="admin" />
      <div className="w-full flex flex-row justify-center items-center">
        <ProductList />
      </div>
    </div>
  );
};
