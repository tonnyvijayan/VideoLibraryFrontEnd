import "./TopNavBar.css";
import { Link } from "react-router-dom";
import stock from "./assets/stock.svg";
import menu from "./assets/menu.svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import closeSvg from "./assets/close-button.svg";

import { useVideoManagement } from "../../hooks/useVideoManagement";
import { useToast } from "../../hooks/useToast";

export const TopNavBar = () => {
  const showToast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  const { isOpen, setIsOpen } = useVideoManagement();

  const logOutHandler = async () => {
    try {
      await axiosPrivate.get("/user/logout");
      setAuthState("");
      navigate("/");
      showToast("Logged Out", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const showMenuHandler = () => {
    console.log(isOpen);
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
      <div>{JSON.stringify(authState)}</div>

      {/* <div>{JSON.stringify(state.watchLater)}</div> */}
      <div className="finview-navigation-container">
        {authState ? (
          <button
            onClick={logOutHandler}
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
              SignIn
            </Link>
            <Link
              to="/signup"
              className="navigation-buttons bg-cl-white cl-blue "
            >
              SignUp
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
