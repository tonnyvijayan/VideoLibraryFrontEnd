import { useAuth } from "../../hooks/useAuth";
import { useLogOut } from "../../hooks/useLogOut";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import "./SideNavBar.css";

import { Link } from "react-router-dom";

export const SideNavBar = () => {
  const { isOpen } = useVideoManagement();
  const { authState } = useAuth();
  const logOut = useLogOut();
  return (
    <nav className={`nav-site ${isOpen ? "show-menu" : ""}`}>
      <div className="finview-nav-site-list">
        <h2>Categories</h2>
        <Link to="/">Home</Link>
        <Link to="/investing">Investing</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/economy">Economy</Link>
      </div>
      <div className="finview-nav-site-list">
        <h2>Account</h2>
        <Link to="/playlist">PlayList</Link>
        <Link to="/watchlater">Watch Later</Link>
        {authState ? (
          <Link
            onClick={() => {
              logOut();
            }}
          >
            Sign Out
          </Link>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
};
