import './Login.css';

const LoginForm = () => {
    return (
      <div class="parent-container">
        <div class="login-form">
          <h1>Login</h1>
          <p>Enter your credentials to access your account</p>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" class="login-button">Login</button>
          </form>
          <div class="signup-link">
      <p>Don't have an account? <a href="signup-form">Sign up here</a></p>
    </div>
  </div>
</div>
    );
  };
  
  export default LoginForm;
  