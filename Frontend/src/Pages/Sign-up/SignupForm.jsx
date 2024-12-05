import React, {useEffect} from "react";
import "./SignupForm.css";
import { useLocation, useNavigate } from "react-router-dom";

function SignupForm() {
  const location = useLocation()
  const navigate = useNavigate();

  const selectedRole = location.state?.selectedRole;
  
  useEffect(() => {
    if (!selectedRole) {
      navigate('/signup');
    }
  }, [selectedRole, navigate]);

  return (
    <div className="signup-form">
      <h1>Sign up as {selectedRole}</h1>
      <p>
        By signing up, you agree to the{" "}
        <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
      </p>
      <form>
        <div className="form-group">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="signup-button">Sign up</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="#">Log in</a>
      </p>
    </div>
  );
}

export default SignupForm;
