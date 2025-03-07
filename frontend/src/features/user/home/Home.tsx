import { Navbar } from '@/components/navbar/Navbar';
import { Button } from '@/shadcn/components/ui/button';

export const HomePage = () => {
  return (
    <div>
      <Navbar type="user" />
      <h1>User Side</h1>
      <Button>This is Button</Button>
    </div>
  );
};
