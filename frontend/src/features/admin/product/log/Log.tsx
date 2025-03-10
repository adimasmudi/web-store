import { Navbar } from '@/components/navbar/Navbar';
import { LogList } from './components/logList/LogList';

export const LogPage = () => {
  return (
    <div>
      <Navbar type="admin" />
      <div className="w-full flex flex-row justify-center items-center">
        <LogList />
      </div>
    </div>
  );
};
