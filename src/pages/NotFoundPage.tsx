import { NavLink } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-950 text-white">
      <h1 className="text-8xl font-black">404</h1>
      <h2 className="text-2xl">Nie odnaleziono strony</h2>
      <NavLink className="mt-4 border-b inline-flex gap-2 items-center" to="/">
        <FaArrowLeft />
        Powróć do strony głównej
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
