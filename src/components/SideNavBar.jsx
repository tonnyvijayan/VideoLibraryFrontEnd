import "./SideNavBar.css";

import { Link } from "react-router-dom";

export const SideNavBar = () => {
  // const menuValue = false;
  return (
    <nav
      //   className="finview-nav-site"
      className="nav-site"
      // style={menuValue ? { display: "flex" } : { display: "" }}
    >
      <div className="finview-nav-site-list">
        <h2>Categories</h2>
        <Link to="/">Home</Link>
        <Link to="/investing">Investing</Link>
        <Link to="/trading">Trading</Link>
        <Link to="/options">Options</Link>
        <Link to="/economy">Economy</Link>
      </div>
      <div className="finview-nav-site-list">
        <h2>Account</h2>
        <Link to="/playlist">PlayList</Link>
        <Link to="/history">History</Link>
        <Link to="/watchlater">Watch Later</Link>
      </div>
    </nav>
  );
};
