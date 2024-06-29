import "./TopNavBar.css";
import stock from "./assets/stock.svg";
import menu from "./assets/menu.svg";
import closeSvg from "./assets/close-button.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useVideoManagement } from "../../hooks/useVideoManagement";
import { useLogOut } from "../../hooks/useLogOut";

export const TopNavBar = () => {
  const { authState } = useAuth();
  const { isOpen, setIsOpen } = useVideoManagement();
  const logOut = useLogOut();

  const showMenuHandler = () => {
    setIsOpen((setIsOpen) => !setIsOpen);
  };

  return (
    <nav className="finview-navigation-bar">
      <div className="finview-navigation-container">
        <Link to="/" className="brand-link">
          <img src={stock} alt="stock" />

          <strong style={{ color: " #1e40af" }}>FinView</strong>
        </Link>
      </div>
      <div className="finview-navigation-container">
        {authState ? (
          <button
            onClick={() => {
              logOut();
            }}
            className="navigation-buttons bg-cl-blue cl-white"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link
              to="/login"
              className="navigation-buttons bg-cl-blue cl-white"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="navigation-buttons bg-cl-white cl-blue "
            >
              Sign Up
            </Link>
          </div>
        )}

        <button className="menu-button" onClick={showMenuHandler}>
          <img src={isOpen ? closeSvg : menu} />
        </button>
      </div>
    </nav>
  );
};
