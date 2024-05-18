import "./SignUp.css";
import axios from "../axios/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

export const SignUp = () => {
  const showToast = useToast();
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputFieldHandler = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async () => {
    const { username, email, password } = userData;
    try {
      if (username && email && password) {
        const newUser = await axios.post("/user/createuser", {
          name: username,
          email: email,
          password: password,
        });
        if (newUser.status === 201) {
          navigate("/");
          showToast("Account created", "success");
        }
      } else {
        showToast("All fields are required", "fail");
      }
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "fail");
    }
  };

  return (
    <div className="signup-form-container">
      <div className="register-form">
        <h3 className="register-heading">Sign Up</h3>
        <div className="register-icon-container">
          <a
            className="register-icons"
            href="https://www.gmail.com"
            target="_blank"
          >
            <img
              className="register-log-icons"
              src="https://pluspng.com/img-png/google-logo-png-open-2000.png"
              alt="Google"
            />
          </a>
          <a
            className="register-icons"
            href="https://www.facebook.com"
            target="_blank"
          >
            <img
              className="register-log-icons"
              src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-512.png"
              alt="Facebook"
            />
          </a>

          <a
            className="register-icons"
            href="https://www.linkedin.com"
            target="_blank"
          >
            <img
              className="register-log-icons"
              src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/linkedin_circle-512.png"
              alt="Linkedin"
            />
          </a>
        </div>
        <div className="register-input-container">
          <input
            className="register-detail-input"
            type="text"
            placeholder="Username"
            name="username"
            onChange={inputFieldHandler}
          />
          <input
            className="register-detail-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={inputFieldHandler}
          />
          <input
            className="register-detail-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={inputFieldHandler}
          />
        </div>

        <div className="register-input-container">
          <button
            type="submit"
            value="Register"
            className="register-button"
            onClick={formSubmitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
