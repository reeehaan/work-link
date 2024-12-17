import styles from './Header.module.css'; 


const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Work<span>Link</span></div>
      <nav className={styles.nav}>
        <ul>
          <li onClick={()=> window.location.href="hire-pro"}>Hire a pro</li>
          <li onClick={()=> window.location.href="find-job"}>Find job</li>
          <li onClick={()=> window.location.href="why-worklink"}>Why WorkLink</li>
          <li onClick={()=> window.location.href="Whats-new"}>What’s new</li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <button className={styles.loginBtn} onClick={()=> window.location.href="login-form"}>Log in</button>
        <button className={styles.signupBtn} onClick={()=> window.location.href="signup-form"}>Sign up</button>
      </div>
    </header>
  );
}

export default Header;
