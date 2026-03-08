import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
      location.pathname === path
        ? "bg-white text-indigo-600 shadow-md"
        : "text-gray-200 hover:bg-white/20 hover:text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg px-10 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link
        to="/"
        className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition"
      >
        Placement Tracker
      </Link>

      {/* Menu */}
      <div className="flex gap-4">

        <Link
          to="/"
          className={linkStyle("/")}
        >
          Home
        </Link>

        <Link
          to="/add"
          className={linkStyle("/add")}
        >
          Add Placement
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;