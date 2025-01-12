import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* About Section */}
        <div className={styles.footerSection}>
          <h4>About Us</h4>
          <ul>
            <li><a href="/about">About WorkLink</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className={styles.footerSection}>
          <h4>Services</h4>
          <ul>
            <li><a href="/freelancers">Freelancers</a></li>
            <li><a href="/clients">Clients</a></li>
            <li><a href="/enterprises">Enterprises</a></li>
            <li><a href="/solutions">Solutions</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className={styles.footerSection}>
          <h4>Legal</h4>
          <ul>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/dispute">Dispute Resolution</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialMediaIcons}>
            <a href="https://www.facebook.com/Upwork" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com/Upwork" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/upwork" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/upwork" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <span>&copy; 2025 WorkLink Global Inc. All rights reserved.</span>
          <div className={styles.languageSelector}>
            <span>Language:</span>
            <select>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
