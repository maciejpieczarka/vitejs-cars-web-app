import MainNavigation from '../components/MainNavigation';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <header className=" border-b flex justify-between items-center px-10 py-4">
        <h1 className="text-lg font-black">Maciej Pieczarka</h1>
        <MainNavigation />
      </header>

      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
