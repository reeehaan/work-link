
import './Footer.css';

 const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>WorkLink</h3>
        <p>Powerful Freelance Marketplace System with the ability to change lives (Freelancers & Clients).</p>
        <div className="socials">
          <a href="/">Instagram</a>
          <a href="/">Facebook</a>
        </div>
      </div>
      <div className="footer-links">
        <h4>For Clients</h4>
        <a href="/">Find Freelancer</a>
        <a href="/">Post a project</a>
        <a href="/">Refund Policy</a>
      </div>

      <div className="footer-links">
        <h4>For Freelancers</h4>
        <a href="/">Find Job</a>
        <a href="/">Refund Policy</a>
      </div>

      <div className="footer-links">
        <h4>Contact Us</h4>
        <p><span></span>Sri Lanka</p>
        <p><span></span>071-2066122</p>
        <p><span></span>worklink@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;