import "./SignUp.css";

export const SignUp = () => {
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
          />
          <input
            className="register-detail-input"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="register-detail-input"
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            className="register-detail-input"
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
          />
        </div>

        <div className="register-input-container">
          <button type="submit" value="Register" className="register-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
