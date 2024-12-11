import "./Login.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useLogOut } from "../hooks/useLogOut";

export const Login = () => {
  const axiosPrivate = useAxiosPrivate();
  const showToast = useToast();
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState({});
  const { authState, setAuthState, persist, setPersist } = useAuth();
  const location = useLocation();
  const logOut = useLogOut();
  const previousLocation = location?.state?.location;

  const inputChangeHandler = (event) => {
    setUserCredential({
      ...userCredential,
      [event.target.name]: event.target.value,
    });
  };
  const loginButtonHandler = async () => {
    try {
      const response = await axiosPrivate.post("/user/authenticateuser", {
        name: userCredential.name,
        password: userCredential.password,
      });
      if (response.status === 200) {
        setAuthState(response.data.accessToken);
        showToast("Logged In", "success");
        navigate(previousLocation || "/", { replace: true });
      }
    } catch (error) {
      showToast(error.response.data.message, "fail");
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  return (
    <>
      <div className="login-form">
        <div className="login-container">
          <div className="login-content">
            <h2>Sign In</h2>
            <div className="form-div">
              <input
                type="text"
                placeholder="User Name"
                name="name"
                className="wd-100"
                onChange={inputChangeHandler}
              />
              <input
                type="password"
                placeholder="User Password"
                name="password"
                className="wd-100"
                onChange={inputChangeHandler}
              />

              {authState ? (
                <button
                  onClick={() => {
                    logOut();
                  }}
                  className="btn"
                >
                  Logout
                </button>
              ) : (
                <button onClick={loginButtonHandler} className="btn">
                  Login
                </button>
              )}
            </div>
            <div className="persist-container">
              <input
                type="checkbox"
                id="persist"
                checked={persist}
                onChange={togglePersist}
              />
              <label htmlFor="persist"> Trust this device</label>
            </div>
            <p className="account">
              Dont have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
