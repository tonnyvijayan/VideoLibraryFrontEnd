import "../components/TopNavBar.css";
import { Link } from "react-router-dom";
import stock from "../assets/stock.svg";
import menu from "../assets/menu.svg";

export const TopNavBar = () => {
  let login = false;

  return (
    <nav className="finview-navigation-bar">
      <div className="finview-navigation-container">
        <Link to="/" className="brand-link">
          <img src={stock} alt="stock" />

          <strong style={{ color: " #1e40af" }}>FinView</strong>
        </Link>
      </div>

      <div className="finview-navigation-container">
        {login ? (
          <button className="navigation-buttons bg-cl-blue cl-white">
            Logout
          </button>
        ) : (
          <Link to="/login" className="navigation-buttons bg-cl-blue cl-white">
            SignIn
          </Link>
        )}

        <Link to="/signup" className="navigation-buttons bg-cl-white cl-blue ">
          SignUp
        </Link>

        <button className="menu-button">
          <img src={menu} />
        </button>
      </div>
    </nav>
  );
};
