import { Navbar } from '@/components/navbar/Navbar';
import { Table } from './components/table/Table';
import { ProductList } from './components/productList/ProductList';

export const DashboardPage = () => {
  return (
    <div>
      <Navbar type="admin" />
      <ProductList />
    </div>
  );
};
