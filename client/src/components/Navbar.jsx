import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// NavBar that is always visible on the top.
const Navbar = ({ user, logout }) => {
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          <h1 className="sm:text-2xl uppercase font-semibold text-primary tracking-widest">
            Tasks App
          </h1>
        </div>
        <div className="navbar-end sm:gap-1">
          <ThemeToggle />
          <div className="text-center text-sm">
            <p>{`Hello ${user?.name || "User"}!`}</p>
            {user ? (
              <Link
                to="/"
                onClick={logout}
                className="link link-hover link-accent"
              >
                Logout
              </Link>
            ) : (
              <Link to="/" className="link link-hover link-accent">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
