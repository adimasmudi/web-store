import { Navbar } from '@/components/navbar/Navbar';
import { Table } from './components/table/Table';

export const DashboardPage = () => {
  return (
    <div>
      <Navbar type="admin" />
      <Table />
    </div>
  );
};
