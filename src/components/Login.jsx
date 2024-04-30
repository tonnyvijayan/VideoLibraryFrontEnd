import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  let [login, setLogin] = useState(false);
  const logoutButtonHandler = () => {
    setLogin(false);
  };
  const loginButtonHandler = () => {
    console.log("clicked");
    setLogin(false);
    console.log(login);
  };
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
                name="userName"
                className="wd-100"
              />
              <input
                type="password"
                placeholder="User Password"
                name="password"
                className="wd-100"
              />

              {login ? (
                <button onClick={logoutButtonHandler} className="btn">
                  Logout
                </button>
              ) : (
                <button onClick={loginButtonHandler} className="btn">
                  Login
                </button>
              )}
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
