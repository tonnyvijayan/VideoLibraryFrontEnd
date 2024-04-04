import "./SideNavBar.css";

import { Link } from "react-router-dom";

export const SideNavBar = () => {
  const menuValue = true;
  return (
    <nav
      //   className="finview-nav-site"
      className="nav-site"
      style={menuValue ? { display: "flex" } : { display: "" }}
    >
      <div className="finview-nav-site-list">
        <span>Categories</span>
        <Link to="/">Home</Link>

        <Link to="/investing">Investing</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/options">Options</Link>
        <Link to="/economy">Economy</Link>
      </div>
      <div className="finview-nav-site-list">
        <span>Account</span>
        <Link to="/playlist">PlayList</Link>
        <Link to="/history">History</Link>
        <Link to="/watchlater">Watch Later</Link>
      </div>
    </nav>
  );
};
