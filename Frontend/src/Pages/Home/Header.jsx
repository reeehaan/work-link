import React from 'react';
import './Header.css';


const Header = () => {

  return (
    <header className="header">
      <div className="logo">Work<span>Link</span></div>
      <nav className="nav">
        <ul>
          <li onClick={()=> window.location.href="hire-pro"}>Hire a pro</li>
          <li onClick={()=> window.location.href="find-job"}>Find job</li>
          <li onClick={()=> window.location.href="why-worklink"}>Why WorkLink</li>
          <li onClick={()=> window.location.href="Whats-new"}>What’s new</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn" onClick={()=> window.location.href="login-form"}>Log in</button>
        <button className="signup-btn" onClick={()=> window.location.href="signup-form"}>Sign up</button>
      </div>
    </header>
  );
}

export default Header;
