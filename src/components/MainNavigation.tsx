import { NavLink } from 'react-router';

export default function MainNavigation() {
  return (
    <nav className="flex items-center gap-4">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        Strona główna
      </NavLink>

      <NavLink
        to="/cars"
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        Auta
      </NavLink>
    </nav>
  );
}
