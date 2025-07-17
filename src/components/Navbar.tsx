import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="space-x-4 font-bold text-slate-100 uppercase">
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-500" : "")}
        to="/"
      >
        Inicio
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-500" : "")}
        to="/favorites"
      >
        Favoritos
      </NavLink>
    </nav>
  );
}

export default Navbar;
