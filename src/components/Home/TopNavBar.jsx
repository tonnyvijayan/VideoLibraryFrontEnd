import "./TopNavBar.css";
import { Link } from "react-router-dom";
import stock from "./assets/stock.svg";
import menu from "./assets/menu.svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";

export const TopNavBar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();

  const logOutHandler = async () => {
    try {
      await axios.get("/user/logout", {
        withCredentials: true,
      });
      setAuthState("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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

        <button className="menu-button">
          <img src={menu} />
        </button>
      </div>
    </nav>
  );
};
