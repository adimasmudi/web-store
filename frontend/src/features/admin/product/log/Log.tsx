import { Navbar } from '@/components/navbar/Navbar';
import { LogList } from './components/logList/LogList';

export const LogPage = () => {
  return (
    <div>
      <Navbar type="admin" />
      <div className="bg-app_broken_white h-dvh">
        <LogList />
      </div>
    </div>
  );
};
